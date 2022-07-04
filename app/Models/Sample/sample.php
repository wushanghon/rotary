<?php

namespace App\Models\Sample;

use Illuminate\Database\Eloquent\Model;

class sample extends Model
{
    protected $table = 'sample';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'name',
        'image',
        'created_id',
        'updated_id',
    ];
}
