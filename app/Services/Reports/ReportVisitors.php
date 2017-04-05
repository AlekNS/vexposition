<?php

namespace App\Services\Reports;

use DB;
use Mail;

use App\Models\Company;
use App\Models\Event;
use App\Models\Stand;

/**
 * Service for sending visitors report.
 * (Finally the company admin receives a report by mail about the users of the stand after the event is over.)
 *
 * Class ReportVisitors
 * @package App\Services\Reports
 */
class ReportVisitors
{
    public function __construct()
    {
    }

    /**
     * Initiate sending.
     */
    public function sendToCompanies()
    {
        // Collect all stands, that wasn't marked as processed.
        // Some optimization: Using events.is_notified to skip processed events.
        $report = DB::table('companies')
            ->select('events.id as event_id', 'companies.id as company_id', 'stands.id as stand_id')
            ->join('company_booking', function ($query) {
                $query->where('companies.id', '=', DB::raw('company_booking.company_id'));
                $query->where('company_booking.is_admin_notified', '=', false);
            })
            ->join('stands', 'stands.id', '=', 'company_booking.stand_id')
            ->join('events', function ($query) {
                $query->where('events.end_date', '<', DB::raw('now()'));
                $query->where('events.id', '=', DB::raw('stands.event_id'));
                $query->where('is_notified', '=', false);
            })
            ->groupBy(['events.id', 'companies.id', 'stands.id'])
            ->get()
            ->groupBy('event_id');

        foreach ($report as $eventId => $reps) {
            $event = Event::findOrFail($eventId);

            // @TODO: Should be use chunk processing.
            // May be used group by companies for batch sending.
            foreach ($reps as $rep) {
                // Gather information about stand visitors.
                $visitors = DB::table('stand_visitors')
                    ->join('users', 'users.id', '=', 'stand_visitors.user_id')
                    ->select('users.*', 'stand_id', 'stand_visitors.created_at as visited_at')
                        ->where('stand_id', $rep->stand_id)
                        ->get();

                $company = Company::findOrFail($rep->company_id);
                $stand = Stand::findOrFail($rep->company_id);
                if (count($visitors) > 0) {
                    $this->sendStandReport($event, $company, $stand, $visitors);
                // } else {
                // @TODO: Notify Company admin when no visitors available for stand.
                // $this->sendEmptyReport($event, $company);
                }

                // Mark processed
                DB::table('company_booking')->update([
                    'is_admin_notified' => true
                ], [
                    'id' => $rep->stand_id
                ]);
            }

            // Mark as whole event was processed
            DB::table('events')->update([
                'is_notified' => true
            ], [
                'id' => $rep->event_id
            ]);
        }
    }

    /**
     * Send visitors report for company per one stand.
     *
     * @param Event $event
     * @param Company $company
     * @param Stand $stand
     * @param $visitors
     */
    private function sendStandReport(Event $event, Company $company, Stand $stand, $visitors)
    {
        if (count($visitors) == 0) {
            return;
        }

        // @TODO: To improve mailing performance should be used command with queue.
        Mail::send('emails.visitor-report', [
            'company' => $company,
            'event' => $event,
            'stand' => $stand,
            'visitors' => $visitors
        ], function ($m) use ($company) {
            $m->to($company->admin_email);
            $m->subject('Stand Visitors report');
        });
    }
}
