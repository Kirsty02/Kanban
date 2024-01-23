<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Column; 

class ColumnController extends Controller
{
    public function index($boardId)
    {
        $columns = Column::where('board_id', $boardId)->get();
        return response()->json($columns);
    }

    public function show($column_id)
    {
        try {
            $column = Column::findOrFail($column_id);

            return response()->json($column, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Column not found'], 404);
        }
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'board_id' => 'required|integer',
        ]);

        $column = Column::create($validatedData);
        return response()->json($column, 201);
    }

}
