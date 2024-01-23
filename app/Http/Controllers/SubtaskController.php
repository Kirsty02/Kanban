<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Subtask;
use Illuminate\Support\Facades\Log; 

class SubtaskController extends Controller
{
    public function index($taskId)
    {
        $subtasks = Subtask::where('task_id', $taskId)->get();
        return response()->json($subtasks);
    }
    public function update(Request $request, $subtaskId)
    {
        Log::info('Raw isCompleted value from request: ' . $request->input('isCompleted'));
        Log::info('Request data:', $request->all());
        $subtask = Subtask::findOrFail($subtaskId);

        // Directly assigning the value from the request
        $subtask->isCompleted = $request->input('isCompleted');


        $subtask->save();

        return response()->json($subtask);
       
    }


    
}
