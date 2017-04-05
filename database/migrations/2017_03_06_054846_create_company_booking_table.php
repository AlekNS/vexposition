<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCompanyBookingTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('company_booking', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('company_id')->unsigned();
            $table->integer('stand_id')->unsigned();
            $table->boolean('is_admin_notified')->default(false);
            $table->string('file_url', 256)->default('');
            $table->dateTime('created_at')->default(\DB::raw('CURRENT_TIMESTAMP'));

            $table->unique(['stand_id', 'company_id']);
            $table->foreign('stand_id')->references('id')->on('stands');
            $table->foreign('company_id')->references('id')->on('companies');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('company_booking');
    }
}
