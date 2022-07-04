<?php

namespace App\Repository\Admin\Chiliman;

use App\Models\Chiliman\treeview_m;
use Illuminate\Support\Facades\DB;

class MenuSetRepository
{
    public function __construct()
    {
    }

    public function getAll($request, $input)
    {
        $table = DB::table('mum02');

        if (count($input) > 1) {
            foreach ($input as $key => $val) {
                if ($request->filled($key)) {
                    $table->where($key, 'like', '%' . $val . '%');
                }
            }
        }

        $data = $table->orderBy('gp_id')
            ->paginate(10);

        return $data;
    }

    public function update($input, $updated_id)
    {
        $TreeViewJsonDecode = json_decode($input['TreeViewJsonCode']);
        $gp_id = $input['gp_id'];

        //更新樹狀結構
        foreach ($TreeViewJsonDecode as $key => $column) {
            if ($column->data->PARENT_UID != '-1') {
                $data = treeview_m::where('gp_id', $gp_id)
                    ->where('tree_id', $column->data->SERIAL_UID)
                    ->update([
                        'prev_tree_id'  => $column->data->PARENT_UID,
                        'sort_no'       => $column->data->INDEX,
                        'tree_nm'       => $column->data->LABEL,
                    ]);
            }
        }

        //移除無項目資料夾
        DB::table('treeview_m')
            ->where('gp_id', $gp_id)
            ->whereRaw("
                    tree_id IN(
                        (
                            SELECT * FROM(
                                SELECT tree_id FROM treeview_m WHERE 1 = 1
                                    AND gp_id = '" . $gp_id . "'
                                    AND tree_type = 'D'
                                    AND tree_id NOT IN (
                                        SELECT prev_tree_id FROM treeview_m WHERE 1 = 1
                                        AND gp_id = '" . $gp_id . "'
                                        GROUP BY prev_tree_id
                                    )
                            ) AS STRA
                        )
                    )
                ")
            ->delete();

        return $data;
    }

    public function addNewFolder($input, $updated_id)
    {
        $gp_id = $input['gp_id'];
        $tree_nm = !empty($input['LABEL']) ? $input['LABEL'] : '未命名目錄';
        $prev_tree_id = !empty($input['PARENT_UID']) ? $input['PARENT_UID'] : 0;
        $nullStr = (env('DB_CONNECTION') != 'sqlsrv') ? 'ifnull' : 'isnull'; // mssql 要使用 isnull 的字眼

        if ($prev_tree_id === '-1') {
            $prev_tree_id = 0;
        }

        $Select = DB::table('treeview_m')
            ->select(
                DB::raw("'" . $gp_id . "' AS gp_id"),
                DB::raw($nullStr . "(max(" . $nullStr . "(tree_id, 0)), 0) + 1 AS tree_id"),
                DB::raw("'" . $tree_nm . "' AS tree_nm"),
                DB::raw("'D' AS tree_type"),
                DB::raw("'" . $prev_tree_id . "' AS prev_tree_id"),
                DB::raw("'' AS pg_id"),
                DB::raw("'0' AS sort_no"),
                DB::raw("'fas fa-folder' AS tree_icon"),
                DB::raw("'" . now() . "' AS created_at"),
                DB::raw("'" . now() . "' AS updated_at")
            )->where('gp_id', '=', $gp_id);

        $bindings = $Select->getBindings();

        $insertQuery = ' INSERT INTO treeview_m (gp_id, tree_id, tree_nm, tree_type, prev_tree_id, pg_id, sort_no, tree_icon, created_at, updated_at) ' . $Select->toSql();

        $data = DB::insert($insertQuery, $bindings);

        return $data;
    }

    public function getid($input)
    {
        $gp_id = $input['gp_id'];

        $TreeviewM = DB::table('treeview_m')
            ->select('tree_id')
            ->where('gp_id', '=', $gp_id)
            ->orderBy('tree_id', 'desc')
            ->take(1)
            ->first();

        $data = (isset($TreeviewM)) ? $TreeviewM->tree_id : 1;

        return $data;
    }

    /**
     * 複製群組資料夾排序資料
     * @param $gp_id
     * @return bool
     */
    public function duplicateBy($newgp_id, $origp_id)
    {
        DB::statement('INSERT INTO treeview_m select
                        ?
                        ,tree_id
                        ,tree_nm
                        ,tree_type
                        ,prev_tree_id
                        ,pg_id
                        ,sort_no
                        ,tree_icon
                        ,created_at
                        ,updated_at
                        FROM treeview_m
                        WHERE gp_id = ?', [$newgp_id, $origp_id]);

        return true;
    }

    public function deleteBy($gp_id)
    {
        return treeview_m::where('gp_id', $gp_id)->delete();
    }
}
