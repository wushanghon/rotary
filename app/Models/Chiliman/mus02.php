<?php

namespace App\Models\Chiliman;

use Illuminate\Database\Eloquent\Model;

class mus02 extends Model
{
    protected $table = 'mus02';
    protected $keyType = 'string';
    protected $primaryKey = ['gp_id', 'pg_id'];
    public $incrementing = false;

    //使用複合KEY欄位，要override 這個function
    protected function setKeysForSaveQuery($query)
    {
        return $query->where('gp_id', $this->getAttribute('gp_id'))
                    ->where('pg_id', $this->getAttribute('pg_id'));
    }

    protected $fillable = [
        'gp_id',
        'pg_id',
        'g_query',
        'g_add',
        'g_mod',
        'g_del',
        'created_id',
        'updated_id',
    ];

    public function mum02()
    {
        return $this->hasOne(mum02::class, 'gp_id', 'gp_id');
    }
}
