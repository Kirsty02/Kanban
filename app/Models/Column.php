<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Column extends Model
{


    protected $table = 'columns';
    protected $fillable = ['name', 'board_id'];
    public $timestamps = false;

    // Define the relationship with the Board model
    public function board()
    {
        return $this->belongsTo(Board::class, 'board_id', 'board_id');
    }
    public function tasks()
    {
        return $this->hasMany(Task::class, 'column_id', 'column_id');
    }
}