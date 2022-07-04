<?php

namespace App\Repository\Admin\Chiliman;

use App\Models\Chiliman\mum03;
use App\Models\Chiliman\mus01;
use App\Models\Chiliman\mus02;
use App\Models\Chiliman\treeview_m;
use Illuminate\Support\Facades\DB;

class BackEndTreeViewRepository
{
    public function __construct()
    {
    }

    //取得樹狀選單
    public static function GetTreeCont($crmm_id, $user_no)
    {
        $InLevel = -1;

        if ($user_no != "") {
            //Step 1. 進行資料檢核若有缺項目則寫入treeview
            $gp_id = BackEndTreeViewRepository::InitUserTree($crmm_id, $user_no);

            //Step 2. 取得結構
            $TreeViewHTML = BackEndTreeViewRepository::GetSubItem(0, true, $gp_id, $InLevel);
        }

        return $TreeViewHTML;
    }

    public static function InitUserTree($crmm_id, $user_no)
    {
        //取得gp_id(使用者所屬產品)
        $MUS01 = DB::table('mus01')
            ->select('gp_id')
            ->where('user_no', '=', $user_no)
            ->get();

        $gp_id = $MUS01[0]->gp_id;

        return $gp_id;
    }

    public static function GetSubItem($wPG_PREV, $IsEnd, $gp_id, $InLevel, $Type = 'HTML')
    {
        $spwhere = '';
        $InLevel++;
        $nullStr = (env('DB_CONNECTION') != 'sqlsrv') ? 'ifnull' : 'isnull'; // mssql 要使用 isnull 的字眼

        $SubItemAry = DB::table('treeview_m AS a')
            ->select(
                DB::raw("CASE a.tree_type WHEN 'D' THEN a.tree_nm ELSE b.pg_nm END AS pg_nm"),
                'a.tree_type',
                'a.tree_id',
                'b.pg_path',
                'b.target',
                'a.pg_id',
                'a.prev_tree_id',
                'a.sort_no',
                DB::raw("'0' as PGtype"),
                DB::raw($nullStr . "(b.pg_icon, 'mdi mdi-file-outline') as pgIcon"),
                DB::raw($nullStr . "(a.tree_icon, 'far fa-folder') as FolderIcon")
            )->leftjoin('mum03 AS b', 'a.pg_id', 'b.pg_id')
            ->leftjoin(
                DB::raw("(
                    SELECT
                        prev_tree_id
                        , count(*) as CNT
                    FROM treeview_m
                    WHERE gp_id = '" . $gp_id . "'
                        AND tree_type = 'P'
                    GROUP BY prev_tree_id
                ) AS f"),
                'a.tree_id',
                'f.prev_tree_id'
            )->whereRaw("NOT (a.tree_type = 'D' and f.CNT <= 0)")
            ->where([
                'a.gp_id' => $gp_id,
                'a.prev_tree_id' => $wPG_PREV
            ])->orderby('a.sort_no', 'asc')
            ->get();

        $RowCount = count($SubItemAry);
        $i = 1;
        $HTML = '';

        switch ($Type) {
                //顯示Treeview使用
            case 'HTML':
                foreach ($SubItemAry as $SubItem) {
                    $i++;
                    if ($SubItem->tree_type == "P") {
                        //功能項目
                        $HTML .= '<li>';
                        $HTML .= '<a href="' . $SubItem->pg_path . '" class="waves-effect waves-light" target="' . $SubItem->target . '"><i class="' . $SubItem->pgIcon . '"></i><span>' . $SubItem->pg_nm . '</span></a>';
                        $HTML .= '</li>';
                    } else {
                        //資料夾
                        $HTML .= '<li class="has_sub">';
                        $HTML .= '<a href="javascript:void(0);" class="waves-effect waves-light"><i class="' . $SubItem->FolderIcon . '"></i><span>' . $SubItem->pg_nm . '</span> <span class="float-right"><i class="mdi mdi-chevron-right"></i></span></a>';
                        $HTML .= '<ul class="list-unstyled">';
                    }

                    if (trim($SubItem->tree_type) == "D") {
                        //往下遞迴查詢資料
                        $HTML .= BackEndTreeViewRepository::GetSubItem($SubItem->tree_id, $i == $RowCount, $gp_id, $InLevel);
                        $HTML .= '</ul></li>';
                    }
                }
                break;
                //編輯treeview使用
            case 'JSON':
                foreach ($SubItemAry as $SubItem) {
                    $i++;
                    if ($SubItem->tree_type == "P") {
                        $PARENT_UID = $SubItem->prev_tree_id;
                        $HTML .= '{"data":{"SERIAL_UID":"' . $SubItem->tree_id . '","LABEL":"' . $SubItem->pg_nm . '","PARENT_UID":"' . $PARENT_UID . '","INDEX":"' . $SubItem->sort_no . '","PG_ID":"' . $SubItem->pg_id . '"},"type":"file"},';
                    } else {
                        $PARENT_UID = $SubItem->prev_tree_id;
                        $HTML .= '{"data":{"gp_id":"' . $gp_id . '", "SERIAL_UID":"' . $SubItem->tree_id . '","LABEL":"' . $SubItem->pg_nm . '","PARENT_UID":"' . $PARENT_UID . '","INDEX":"' . $SubItem->sort_no . '","PG_ID":"' . $SubItem->pg_id . '"},"type":"default"},';
                    }
                    if (trim($SubItem->tree_type) == "D") {
                        $HTML .= BackEndTreeViewRepository::GetSubItem($SubItem->tree_id, $i == $RowCount, $gp_id, $InLevel, $Type);
                    }
                }
                break;
        }

        return $HTML;
    }
}
