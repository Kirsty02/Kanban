<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Subtask;

class SubtaskController extends Controller
{
    public function index($task_id)
    {
        // Retrieve all subtasks
        $subtasks = Subtask::where('task_id', $task_id)->get();
        return response()->json($subtasks);
    }

    
}
