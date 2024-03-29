<?php

namespace App\Http\Controllers;

use App\Models\Board;
use Illuminate\Http\Request;


class BoardController extends Controller
{
    public function index()
    {
        $boards = Board::with('columns.tasks.subtasks')->get();
        return response()->json($boards);
    }

    public function show(Board $board)
    {
        return response()->json($board);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
        ]);
        // Temporarily set user_id to 1
        $validatedData['user_id'] = 1;

        $board = Board::create($validatedData);
        return response()->json($board, 201);
    }

    public function update(Request $request, Board $board)
    {
        $validatedData = $request->validate([
            'name' => 'string|max:255',
        ]);

        $board->update($validatedData);
        return response()->json($board);
    }

    public function destroy(Board $board)
    {
        $board->delete();
        return response()->json(null, 204);
    }
}
