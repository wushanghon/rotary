<?php

namespace App\Models\Chiliman;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class mum01 extends Model
{
    protected $table = 'mum01';
    protected $primaryKey = 'user_no';

    protected $fillable = [
        'crmm_id',
        'user_id',
        'user_pass',
        'user_nm',
        'user_email',
        'user_remark',
        'user_status',
        'created_id',
        'updated_id',
    ];

    //軟刪除
    use SoftDeletes;
    protected $dates = ['deleted_at'];
}
