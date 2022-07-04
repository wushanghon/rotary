<?php

namespace Database\Seeders;

use App\Models\Chiliman\treeview_m;
use Illuminate\Database\Seeder;

class TreeViewMTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        treeview_m::truncate();
        $dataArray = [];

        /*************** System 群組 Start ***************/

        $dataArray = array_merge($dataArray, [
            [
                'gp_id' => 'System',
                'tree_id' => '1',
                'tree_nm' => '權限維護',
                'tree_type' => 'D',
                'prev_tree_id' => 0,
                'pg_id' => '',
                'sort_no' => 1,
                'tree_icon' => 'fas fa-cog',
            ],
            [
                'gp_id' => 'System',
                'tree_id' => '2',
                'tree_nm' => '系統維護',
                'tree_type' => 'D',
                'prev_tree_id' => 0,
                'pg_id' => '',
                'sort_no' => 2,
                'tree_icon' => 'fas fa-th',
            ],
            [
                'gp_id' => 'System',
                'tree_id' => '3',
                'tree_nm' => '帳號管理',
                'tree_type' => 'P',
                'prev_tree_id' => 1,
                'pg_id' => 'mum01',
                'sort_no' => 3,
                'tree_icon' => '',
            ],
            [
                'gp_id' => 'System',
                'tree_id' => '4',
                'tree_nm' => '群組管理',
                'tree_type' => 'P',
                'prev_tree_id' => 1,
                'pg_id' => 'mum02',
                'sort_no' => 4,
                'tree_icon' => '',
            ],
            [
                'gp_id' => 'System',
                'tree_id' => '5',
                'tree_nm' => '程式維護',
                'tree_type' => 'P',
                'prev_tree_id' => 1,
                'pg_id' => 'mum03',
                'sort_no' => 5,
                'tree_icon' => '',
            ],
            [
                'gp_id' => 'System',
                'tree_id' => '6',
                'tree_nm' => '代碼管理',
                'tree_type' => 'P',
                'prev_tree_id' => 2,
                'pg_id' => 'code_c',
                'sort_no' => 6,
                'tree_icon' => '',
            ],
            [
                'gp_id' => 'System',
                'tree_id' => '7',
                'tree_nm' => '目錄管理',
                'tree_type' => 'P',
                'prev_tree_id' => 1,
                'pg_id' => 'menu_set',
                'sort_no' => 7,
                'tree_icon' => '',
            ],
            [
                'gp_id' => 'System',
                'tree_id' => '8',
                'tree_nm' => '變更密碼',
                'tree_type' => 'P',
                'prev_tree_id' => 0,
                'pg_id' => 'change_password',
                'sort_no' => 8,
                'tree_icon' => '',
            ],
            [
                'gp_id' => 'System',
                'tree_id' => '9',
                'tree_nm' => 'Log Viewer',
                'tree_type' => 'P',
                'prev_tree_id' => 2,
                'pg_id' => 'logs',
                'sort_no' => 9,
                'tree_icon' => '',
            ],
            [
                'gp_id' => 'System',
                'tree_id' => '14',
                'tree_nm' => '範例程式',
                'tree_type' => 'P',
                'prev_tree_id' => 0,
                'pg_id' => 'sample',
                'sort_no' => 14,
                'tree_icon' => '',
            ],
            [
                'gp_id' => 'System',
                'tree_id' => '15',
                'tree_nm' => '多KEY範例',
                'tree_type' => 'P',
                'prev_tree_id' => 0,
                'pg_id' => 'mutiSample',
                'sort_no' => 15,
                'tree_icon' => '',
            ],
            [
                'gp_id' => 'System',
                'tree_id' => '16',
                'tree_nm' => '自訂視圖範例',
                'tree_type' => 'P',
                'prev_tree_id' => 0,
                'pg_id' => 'setView',
                'sort_no' => 16,
                'tree_icon' => '',
            ],
        ]);

        /*************** System 群組 End ***************/

        /*************** Admin 群組 Start ***************/

        $dataArray = array_merge($dataArray, [
            [
                'gp_id' => 'Admin',
                'tree_id' => '10',
                'tree_nm' => '權限管理',
                'tree_type' => 'D',
                'prev_tree_id' => 0,
                'pg_id' => '',
                'sort_no' => 10,
                'tree_icon' => 'fas fa-cog',
            ],
            [
                'gp_id' => 'Admin',
                'tree_id' => '11',
                'tree_nm' => '帳號管理',
                'tree_type' => 'P',
                'prev_tree_id' => 10,
                'pg_id' => 'mum01_public',
                'sort_no' => 11,
                'tree_icon' => '',
            ],
            [
                'gp_id' => 'Admin',
                'tree_id' => '12',
                'tree_nm' => '角色管理',
                'tree_type' => 'P',
                'prev_tree_id' => 10,
                'pg_id' => 'mum02_public',
                'sort_no' => 12,
                'tree_icon' => '',
            ],
            [
                'gp_id' => 'Admin',
                'tree_id' => '13',
                'tree_nm' => '變更密碼',
                'tree_type' => 'P',
                'prev_tree_id' => 0,
                'pg_id' => 'change_password',
                'sort_no' => 13,
                'tree_icon' => '',
            ],
        ]);

        /*************** Admin 群組 End ***************/

        foreach ($dataArray as $key => $var) {
            $data = new treeview_m();
            $data->fill($var);
            $data->save();
        }
    }
}
