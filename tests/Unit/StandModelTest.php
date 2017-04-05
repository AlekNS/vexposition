<?php

namespace Tests\Unit;

use App\Models\Company;
use App\Models\Stand;
use App\Models\User;
use Tests\TestCase;

class StandModelTest extends TestCase
{
    public function testModelPriceAttribute()
    {
        $stand = new Stand(['price_usd' => 123.3]);
        $this->assertEquals($stand->price, '$123.30');
    }

    public function testBusyStandPrice()
    {
        $stand = new Stand(['price_usd' => 123.3, 'img_url' => '']);

        $stand->companies = [
            new Company(['name' => 'Company 1'])
        ];

        $array = $stand->toArray();
        $this->assertArrayNotHasKey('price', $array);
        $this->assertArrayNotHasKey('price_usd', $array);
    }

    public function testNoPrivateDataForGuestUser()
    {
        $stand = new Stand(['img_url' => '']);

        $stand->companies = [
            new Company(['name' => 'Company 1'])
        ];

        $array = $stand->toArray();
        $this->assertArrayNotHasKey('owner', $array);
    }

    public function testViewingOfPrivateDataForAuthUser()
    {
        $user = new User(['name' => 'User']);
        $this->be($user);

        $stand = new Stand(['img_url' => '']);

        $stand->companies = [
            new Company(['name' => 'Company 1', 'logo_url' => ''])
        ];
        $array = $stand->toArray();

        $this->assertArrayHasKey('owner', $array);
    }
}
