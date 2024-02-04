<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Subtask;
use App\Models\Task;
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

        $subtask = Subtask::findOrFail($subtaskId);
        
        $validatedData = $request->validate([
            'title' => 'string|max:255', 
            'isCompleted' => 'boolean',
        ]);

        $subtask->update($validatedData);
        return response()->json($subtask);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'task_id' => 'required|integer',
            'isCompleted' => 'required|boolean',
        ]);

        $subtask = Subtask::create($validatedData);
        return response()->json($subtask, 201);
    }
    
    public function destroy($subtaskId)
    {
        $subtask = Subtask::findOrFail($subtaskId);
        $subtask->delete();

        return response()->json(['message' => 'Subtask deleted successfully']);
    }



    
}
