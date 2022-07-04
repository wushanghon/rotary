<?php

namespace App\Models\Chiliman;

use Illuminate\Database\Eloquent\Model;

class log_m extends Model
{
    protected $table = 'log_m';
    protected $primaryKey = 'log_no';

    protected $fillable = [
        'user_id',
        'log_type',
        'pg_id',
        'table_nm',
        'data_old',
        'data_new',
        'created_id',
        'updated_id',
    ];
}
