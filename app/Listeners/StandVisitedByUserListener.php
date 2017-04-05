<?php

namespace App\Listeners;

use App\Events\StandRequested;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

/**
 * For make visitor statistics.
 *
 * Class StandVisitedByUserListener
 * @package App\Listeners
 */
class StandVisitedByUserListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
    }

    /**
     * Handle the event.
     *
     * @param  StandRequested $event
     * @return void
     */
    public function handle(StandRequested $event)
    {
        if (!auth()->guest()) {
            // @TODO: Should be move it out into a service.
            \DB::table('stand_visitors')->insert([
                'user_id' => auth()->user()->id,
                'stand_id' => $event->getStandId()
            ]);
        }
    }
}
