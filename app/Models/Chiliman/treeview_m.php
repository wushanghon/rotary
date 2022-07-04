<?php

namespace App\Models\Chiliman;

use Illuminate\Database\Eloquent\Model;

class treeview_m extends Model
{
    protected $table = 'treeview_m';
    protected $primaryKey = ['gp_id', 'tree_id'];
    public $incrementing = false;

    //使用複合KEY欄位，要override 這個function
    protected function setKeysForSaveQuery($query)
    {
        return $query->where('gp_id', $this->getAttribute('gp_id'))
                    ->where('tree_id', $this->getAttribute('tree_id'));
    }

    protected $fillable = [
        'gp_id',
        'tree_id',
        'tree_nm',
        'tree_type',
        'prev_tree_id',
        'pg_id',
        'sort_no',
        'tree_icon'
    ];
}
