<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BoardController;
use App\Http\Controllers\ColumnController;
use App\Http\Controllers\TaskController;
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
Route::get('/boards', [BoardController::class, 'index']);
Route::get('/boards/{board}/columns', 'ColumnController@index');
Route::get('/columns/{column}/tasks', 'TaskController@index');

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
