<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Task extends Model
{

    protected $primaryKey = 'task_id';
    public $timestamps = false;

    protected $fillable = ['title', 'description', 'column_id', 'status', 'board_id'];

    public function board()
    {
        return $this->belongsToThrough(Board::class, Column::class);
    }
    public function column()
    {
        return $this->belongsTo(Column::class, 'column_id', 'column_id');
    }
    public function subtasks()
    {
        return $this->hasMany(Subtask::class, 'task_id', 'task_id');
    }

    // other relationships and methods...
}
