<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStandVisitorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stand_visitors', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('stand_id')->unsigned();
            $table->integer('user_id')->unsigned();
            $table->dateTime('created_at')->default(\DB::raw('CURRENT_TIMESTAMP'));

            $table->foreign('stand_id')->references('id')->on('stands');
            $table->foreign('user_id')->references('id')->on('users');
         });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('stand_visitors');
    }
}
