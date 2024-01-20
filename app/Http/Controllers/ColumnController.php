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
            // Find the column by column_id
            $column = Column::findOrFail($column_id);

            // You can customize the response format as needed
            return response()->json($column, 200);
        } catch (\Exception $e) {
            // Handle any exceptions or errors here
            return response()->json(['error' => 'Column not found'], 404);
        }
    }

}
