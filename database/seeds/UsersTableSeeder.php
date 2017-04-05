<?php

use App\Models\User;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class UsersTableSeeder extends Seeder
{
    const DEMO_USERS_COUNT = 10;

    public function run()
    {
        $faker = Faker::create();

        $standIds = \DB::table('company_booking')->select('stand_id')->get()->pluck('stand_id');

        for ($i = 1; $i < self::DEMO_USERS_COUNT; $i++) {
            $user = User::firstOrNew([
                'email' => "user${i}@test.com"
            ]);

            $user->password = bcrypt('123456');
            $user->name = $faker->name;
            $user->save();

            if ($i < self::DEMO_USERS_COUNT / 2) {
                for ($j = 0; $j < self::DEMO_USERS_COUNT * 5; $j++) {
                    \DB::table('stand_visitors')->insert([
                        'user_id' => $user->id,
                        'stand_id' => $standIds[rand() % count($standIds)]
                    ]);
                }
            }
        }
    }
}
