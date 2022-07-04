<?php

namespace App\Repository\Admin\Chiliman;

use App\Models\Chiliman\treeview_m;

class TreeviewMRepository
{
    public function __construct()
    {
    }

    public function destroy(String $gpid, array $pg_ids)
    {
        return treeview_m::whereIn('pg_id', $pg_ids)
                    ->where('gp_id', '=', $gpid)
                    ->delete();
    }

    public function store(array $input)
    {
        $data = new treeview_m;
        $data->fill($input);
        $data->save();

        return $data;
    }

    public function getBy(String $pg_id, String $gp_id)
    {
        return treeview_m::where('pg_id', $pg_id)
                    ->where('gp_id', $gp_id)
                    ->first();
    }

    public function deleteByGroups(String $PG_ID, array $GP_IDs)
    {
        return treeview_m::where('pg_id', $PG_ID)
                    ->whereNotIn('gp_id', $GP_IDs)
                    ->delete();
    }

    public function deleteByPG_ID(String $PG_ID)
    {
        return treeview_m::where('pg_id', $PG_ID)->delete();
    }
}
