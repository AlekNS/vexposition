<?php

use App\Models\Company;
use App\Models\Event;
use App\Models\Stand;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class CompaniesTableSeeder extends Seeder
{
    const DEMO_LOGOS_COUNT = 4;
    const DEMO_FILES_COUNT = 3;
    const DEMO_COMPANIES_COUNT = 40;

    public function run()
    {
        $faker = Faker::create();

        $events = Event::with('stands')->get();

        for ($i = 1; $i < self::DEMO_COMPANIES_COUNT; $i++) {
            $company = Company::firstOrNew([
                'email' => "company@company$i.com"
            ]);
            $company->admin_email = "admin@company$i.com";
            $company->name = $faker->company;
            $company->phone = $faker->tollFreePhoneNumber;
            $company->address = $faker->address;
            $company->logo_url = 'logo' . ((rand() % self::DEMO_LOGOS_COUNT) + 1) . '.jpg';

            $company->save();

            $event = $events->get(rand() % $events->count());
            $stand = $event->stands->get(rand() % $event->stands->count());

            $fields = [];
            $fields[$company->id] = [
                'file_url' => 'file' . ((rand() % self::DEMO_FILES_COUNT) + 1) . '.pdf'
            ];
            $stand->companies()->sync($fields);
        }
    }
}
