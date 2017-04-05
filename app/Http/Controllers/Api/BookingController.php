<?php

namespace App\Http\Controllers\Api;

use App\Models\Company;
use App\Models\Stand;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

/**
 * Book a stand.
 *
 * Class BookingController
 * @package App\Http\Controllers\Api
 */
class BookingController extends Controller
{
    public function postBookingStand($standId, Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string',
            'phone' => 'required|string',
            'email' => 'required|string', // should be email
            'address' => 'required|string',
            'logo_url' => 'required|string',
            'file_url' => 'required|string',
            'admin_email' => 'required|string', // should be email
        ]);

        $company = null;
        $transaction = false;

        // Critical concurrent part
        try {
            \DB::beginTransaction();
            $transaction = true;
            $stand = Stand::findOrFail($standId);

            // If stand is busy
            if ($stand->companies()->count()) {
                return response()->json([
                    'status' => 'invalid',
                    'error' => 'This stand already booked!'
                ], 403);
            }

            $company = Company::create($request->all());
            $stand->companies()->attach($company, [
                'file_url' => $request->get('file_url')
            ]);
            \DB::commit();
            $transaction = false;
        } finally {
            if ($transaction) {
                \DB::rollBack();
                $transaction = null;
            }
        }

        return response()->json($company);
    }
}
