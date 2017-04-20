<?php

namespace App\Http\Controllers\Api\Resource;

use App\Models\Event;
use App\Models\Stand;
use Illuminate\Http\Request;

/**
 * Exposition Stand Resource.
 *
 * Class StandController
 * @package App\Http\Controllers\Api\Resource
 */
class StandController extends ResourceController
{
    protected function getValidationRules()
    {
        return [
            'name' => 'required|string',
            'event_id' => 'required|integer',
            'img_url' => 'required|string',
            'price_usd' => 'required|numeric',
            'description' => 'required|string',
        ];
    }

    /**
     * @api {get} /resource/event/:eventId/stand Get list of stands by eventId
     * @apiVersion 0.0.1
     * @apiGroup Booking
     * @apiName GetStands
     * @apiDescription Get list of stands by eventId.
     *
     * @apiParam {Number} page Request by page.
     * @apiParam {Number} rows Rows in page.
     *
     */
    public function index(Request $request, Event $event)
    {
        $query = Stand::query();
        $query->whereEventId($event->id);

        $result = $this->baseIndex($request, $query);

        // hide private info
        $result['rows'] = collect($result['rows'])->map(function ($stand) {
            $result = $stand->toArray();
            $result['owner'] = [];
            return $result;
        });

        return $result;
    }

    /**
     * @api {get} /resource/event/:eventId/stand/:standId Get stand by event and stand ids
     * @apiVersion 0.0.1
     * @apiGroup Booking
     * @apiName GetStand
     * @apiDescription Get Stand by event and stand ids
     *
     */
    public function show(Request $request, Event $event, Stand $stand)
    {
        $stand = $event->stands()->findOrFail($stand->id);

        if (!\Auth::guest()) {
            event(new \App\Events\StandRequested($stand->id));
        }

        $stand->load('companies');
        return $stand;
    }
}
