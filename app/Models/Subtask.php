<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subtask extends Model
{
    protected $fillable = ['task_id', 'title', 'isCompleted'];
    protected $primaryKey = 'subtask_id';
    public $timestamps = false;


    public function task()
    {
        return $this->belongsTo(Task::class, 'task_id', 'task_id');
    }
}
