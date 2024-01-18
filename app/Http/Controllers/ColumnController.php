<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Column; 

class ColumnController extends Controller
{
    public function index($boardId)
    {
        $columns = Column::with('tasks')->where('board_id', $boardId)->get();
        return response()->json($columns);
    }
}
