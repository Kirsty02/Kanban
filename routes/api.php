<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BoardController;
use App\Http\Controllers\ColumnController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\SubtaskController;
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
Route::get('/boards/{board}/columns', [ColumnController::class, 'index']);
Route::get('/columns/{column}/tasks', [TaskController::class, 'index']);
Route::get('/tasks/{task}/subtasks', [SubtaskController::class, 'index']);

Route::get('/columns/{column_id}', [ColumnController::class, 'show']);


Route::patch('/tasks/{task}/updateColumn', [TaskController::class, 'updateColumn']);
Route::patch('/subtasks/{subtask}', [SubtaskController::class, 'update']);

Route::post('/boards', [BoardController::class, 'store']);
Route::post('/columns', [ColumnController::class, 'store']);
Route::post('/tasks', [TaskController::class, 'store']);
Route::post('/subtasks', [SubtaskController::class, 'store']);


Route::delete('/boards/{board}', [BoardController::class, 'destroy']);



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
