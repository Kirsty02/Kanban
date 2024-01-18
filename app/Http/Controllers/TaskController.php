<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task; 

class TaskController extends Controller
{
    public function index($columnId)
    {
        $tasks = Task::where('column_id', $columnId)->get();
        return response()->json($tasks);
    }

    // other methods...
}