<?php

use App\Models\Event;
use App\Models\Stand;
use App\Models\StandPrice;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Carbon\Carbon;

class EventsTableSeeder extends Seeder
{
    const DEMO_EVENT_IMAGES_COUNT = 4;
    const DEMO_STAND_IMAGES_COUNT = 6;
    const DEMO_EVENTS_COUNT = 10;
    const DEMO_STANDS_PER_EVENT_COUNT = 10;

    public function run()
    {
        $faker = Faker::create();

        for ($i = 1; $i < self::DEMO_EVENTS_COUNT; $i++) {
            $event = Event::firstOrNew([
                'name' => "Great Event $i"
            ]);

            $event->location_city = $faker->city;
            $event->location_address = $faker->address;
            $event->start_date = Carbon::now()->addDays(-rand() % 8);
            $event->end_date = Carbon::now()->addDays(20 + rand() % 8);
            $event->location_lat = 54.9829646 + (rand() % 1000) / 1e5;
            $event->location_lng = 82.864093 + (rand() % 1000) / 1e5;
            $event->img_url = 'event' . ((rand() % self::DEMO_EVENT_IMAGES_COUNT) + 1) . '.jpg';

            $event->save();

            for ($standIndex = 5; $standIndex < self::DEMO_STANDS_PER_EVENT_COUNT + rand() % self::DEMO_STANDS_PER_EVENT_COUNT; $standIndex++) {
                $stand = Stand::firstOrNew([
                    'event_id' => $event->id,
                    'name' => "A$standIndex"
                ]);

                $stand->img_url = 'stand' . ((rand() % self::DEMO_STAND_IMAGES_COUNT) + 1) . '.jpg';
                $stand->description = $faker->text();
                $stand->price_usd = 100 + (rand() % 50) * 10;

                $stand->save();
            }
        }
    }
}
