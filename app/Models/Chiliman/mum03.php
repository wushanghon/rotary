<?php

namespace App\Models\Chiliman;

use Illuminate\Database\Eloquent\Model;

class mum03 extends Model
{
    protected $table = 'mum03';
    protected $primaryKey = 'pg_id';
    public $incrementing = false;

    protected $fillable = [
        'pg_id',
        'pg_nm',
        'pg_path',
        'remark',
        'pg_icon',
        'target',
        'created_id',
        'updated_id',
    ];
}
