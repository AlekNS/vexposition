<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->runSeedInTransaction(EventsTableSeeder::class);
        $this->runSeedInTransaction(CompaniesTableSeeder::class);
        $this->runSeedInTransaction(UsersTableSeeder::class);
    }

    private function runSeedInTransaction($class)
    {
        \DB::transaction(function () use ($class) {
            $this->call($class);
        });
    }
}
