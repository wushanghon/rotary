<?php

namespace App\Models\Chiliman;

use Illuminate\Database\Eloquent\Model;

class file_t extends Model
{
    protected $table = 'file_t';
    protected $primaryKey = 'file_no';

    protected $fillable = [
        'original_name',
        'file_name',
        'file_path',
        'file_extension',
        'created_id',
        'updated_id',
    ];
}
