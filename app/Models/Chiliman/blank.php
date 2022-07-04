<?php

namespace App\Models\Chiliman;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

// 不可以刪除喔，BackendControllerAbstract的create會用到
class blank extends Model
{
    protected $table = 'blank';

    protected $fillable = [
        'id',
    ];
}
