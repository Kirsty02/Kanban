<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Board extends Model
{
    // Define the attributes that are mass assignable
    protected $fillable = ['name', 'user_id'];

    // Other model properties and methods
}
