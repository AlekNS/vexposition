<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/booking/{standId}', 'BookingController@postBookingStand');
Route::post('/upload/{uploadType}', 'UploadController@postUploadImage');

Route::group([
    'prefix' => '/resource',
    'namespace' => 'Resource'
], function (\Illuminate\Routing\Router $router) {
    $router->resource('/event', 'EventController', [
        'only' => ['index', 'show']
    ]);
    $router->resource('/event/{event}/stand', 'StandController', [
        'only' => ['index', 'show']
    ]);
});
