<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task; 

class TaskController extends Controller
{
    public function index($columnId)
    {
        $tasks = Task::with('subtasks')->where('column_id', $columnId)->get();
        return response()->json($tasks);
    }

    public function updateColumn(Request $request, Task $task) {
        $validatedData = $request->validate([
            'column_id' => 'required|exists:columns,column_id', // Validate column_id
        ]);
    
        $task->column_id = $validatedData['column_id'];
        $task->save();
    
        return response()->json($task->load('column')); // Return updated task with column
    }


}