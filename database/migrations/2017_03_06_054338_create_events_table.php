<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 64)->unique();
            $table->date('start_date');
            $table->date('end_date');
            $table->string('location_city', 64);
            $table->string('location_address', 128);
            $table->decimal('location_lat', 14, 10);
            $table->decimal('location_lng', 14, 10);
            $table->string('img_url', 256);
            $table->boolean('is_notified')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('events');
    }
}
