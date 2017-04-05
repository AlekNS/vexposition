<?php

namespace App\Http\Controllers\Api\Resource;

use App\Models\Event;
use Illuminate\Http\Request;

/**
 * Event Exposition Resource.
 *
 * Class EventController
 * @package App\Http\Controllers\Api\Resource
 */
class EventController extends ResourceController
{
    protected function getValidationRules()
    {
        return [
            'name' => 'required|string|uniqie:events',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'location_city' => 'required|string',
            'location_address' => 'required|string',
            'location_lat' => 'required|numeric',
            'location_lng' => 'required|numeric',
            'img_url' => 'required|string'
        ];
    }

    /**
     * @api {get} /resource/event Get list of events
     * @apiVersion 0.0.1
     * @apiGroup Booking
     * @apiName GetEvents
     * @apiDescription Get paginated list of events.
     *
     * @apiParam {Number} page Request by page.
     * @apiParam {Number} rows Rows in page.
     *
     */
    public function index(Request $request)
    {
        $request->offsetSet('limit', $request->get('limit', 200));
        return $this->baseIndex($request, Event::query());
    }

    /**
     * @api {get} /resource/event/:id Get event by id
     * @apiVersion 0.0.1
     * @apiGroup Booking
     * @apiName GetEventById
     * @apiDescription Get one event by id.
     *
     */
    public function show(Event $event)
    {
        return $event->toArray();
    }
}
