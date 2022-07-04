<?php

namespace App\Models\Chiliman;

use Illuminate\Database\Eloquent\Model;

class mum02 extends Model
{
    protected $table = 'mum02';
    protected $primaryKey = 'gp_id';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'gp_id',
        'gp_nm',
        'gp_remark',
        'created_id',
        'updated_id',
    ];
}
