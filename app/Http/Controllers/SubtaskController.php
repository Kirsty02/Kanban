<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Subtask;

class SubtaskController extends Controller
{
    public function index($taskId)
    {
        $subtasks = Subtask::where('task_id', $taskId)->get();
        return response()->json($subtasks);
    }
    public function update(Request $request, $subtaskId)
    {
        $subtask = Subtask::findOrFail($subtaskId);
        $subtask->isCompleted = $request->input('isCompleted');
        $subtask->save();

        return response()->json($subtask);
    }


    
}
