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

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'column_id' => 'required|integer',
            'status' => 'required|string',
            'board_id' => 'required|integer',
        ]);

        $task = Task::create($validatedData);
        return response()->json($task, 201);
    }

    public function update(Request $request, $taskId)
    {
        $task = Task::findOrFail($taskId);

        $validatedData = $request->validate([
            'title' => 'string|max:255',
            'description' => 'string|max:255',
            'column_id' => 'integer',
            'status' => 'string',
            'board_id' => 'integer',
        ]);

        $task->update($validatedData);
        return response()->json($task);
    }

    public function destroy($taskId)
    {
        $task = Task::findOrFail($taskId);
        $task->delete();

        return response()->json(['message' => 'task deleted successfully']);
    }






}