<?php

namespace App\Models\Chiliman;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class mus01 extends Model
{
    protected $table = 'mus01';
    protected $primaryKey = 'user_no';

    protected $fillable = [
        'user_no',
        'gp_id',
        'created_id',
        'updated_id',
    ];

    //軟刪除
    use SoftDeletes;
    protected $dates = ['deleted_at'];
}
