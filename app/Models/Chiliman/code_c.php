<?php

namespace App\Models\Chiliman;

use Illuminate\Database\Eloquent\Model;

class code_c extends Model
{
    protected $table = 'code_c';
    protected $primaryKey = ['code_type', 'code_id'];
    public $incrementing = false; //因為是多欄位的KEY，要設定成false

    //使用複合KEY欄位，要override 這個function
    protected function setKeysForSaveQuery($query)
    {
        return $query->where('code_type', $this->getAttribute('code_type'))
                    ->where('code_id', $this->getAttribute('code_id'));
    }

    protected $fillable = [
        'code_type',
        'code_type_desc',
        'code_id',
        'code_desc',
        'code_dsp',
        'code_sort',
        'created_id',
        'updated_id',
    ];
}
