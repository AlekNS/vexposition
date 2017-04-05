<?php

namespace Tests\Feature;

use Tests\TestCase;

/**
 * @codeCoverageIgnore
 */
class EventResourceTest extends TestCase
{
    /**
     * @return \Illuminate\Foundation\Testing\TestResponse
     */
    private function getEvents()
    {
        return $this->get('/api/resource/event');
    }

    public function testEventList()
    {
        return $this->getEvents()
            ->assertStatus(200)
            ->assertJsonStructure([
                'total',
                'rows'
            ]);
    }

    public function testEventSingle()
    {
        $events = $this->getEvents()->decodeResponseJson();
        $this->get('/api/resource/event/' . $events['rows'][0]['id'])
            ->assertStatus(200)
            ->assertJsonStructure([
                'id',
                'name'
            ]);
    }
}
