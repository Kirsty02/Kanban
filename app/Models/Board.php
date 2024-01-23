<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Board extends Model
{
    // Define the attributes that are mass assignable
    protected $fillable = ['name', 'user_id'];
    protected $primaryKey = 'board_id';

    public function columns()
    {
        return $this->hasMany(Column::class, 'board_id', 'board_id');
    }

    // Other model properties and methods
}
