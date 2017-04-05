<?php

namespace App\Events;

use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;

/**
 * Event when Stand data is requested.
 *
 * Class StandRequested
 * @package App\Events
 */
class StandRequested
{
    use Dispatchable, SerializesModels;

    private $standId;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($standId)
    {
        $this->standId = intval($standId);
    }

    public function getStandId()
    {
        return $this->standId;
    }
}
