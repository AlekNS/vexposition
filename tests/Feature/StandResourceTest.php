<?php

namespace Tests\Feature;

use App\Models\Stand;
use App\Models\User;
use Tests\TestCase;

/**
 * @codeCoverageIgnore
 */
class StandResourceTest extends TestCase
{
    /**
     * @return \Illuminate\Foundation\Testing\TestResponse
     */
    private function getStands()
    {
        $events = $this->get('/api/resource/event')->decodeResponseJson();
        return $this->get('/api/resource/event/' . $events['rows'][0]['id'] . '/stand');
    }

    public function testStandList()
    {
        $this->getStands()
            ->assertStatus(200)
            ->assertJsonStructure([
                'total',
                'rows'
            ]);
    }

    protected function getSingleStand()
    {
        $stand = Stand::with('companies')->first();
        return $this->get('/api/resource/event/' . $stand->event_id . '/stand/' . $stand->id)
            ->assertStatus(200)->decodeResponseJson();
    }

    public function testBookingStandSingleForGuest()
    {
        $response = $this->getSingleStand();

        $this->assertArrayNotHasKey('price', $response);
        $this->assertArrayNotHasKey('price_usd', $response);
        $this->assertArrayNotHasKey('owner', $response);
    }

    public function testBookingStandSingleForUser()
    {
        $this->be(User::all()->first());

        $response = $this->getSingleStand();

        $this->assertArrayNotHasKey('price', $response);
        $this->assertArrayNotHasKey('price_usd', $response);
        $this->assertArrayHasKey('owner', $response);
    }
}
