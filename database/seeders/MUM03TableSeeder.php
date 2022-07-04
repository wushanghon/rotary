<?php

namespace Database\Seeders;

use App\Models\Chiliman\mum03;
use Illuminate\Database\Seeder;

class MUM03TableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        mum03::truncate();

        $dataArray = [
            [
                'pg_id' => 'sample',
                'pg_nm' => '基本範例',
                'pg_path' => '/admin/sample',
                'remark' => '基本範例',
                'target' => '_self',
                'pg_icon' => 'fab fa-laravel',
            ],
            [
                'pg_id' => 'fast',
                'pg_nm' => '快速範例',
                'pg_path' => '/admin/fast',
                'remark' => '快速範例',
                'target' => '_self',
                'pg_icon' => 'fab fa-laravel',
            ],
            [
                'pg_id' => 'mutiSample',
                'pg_nm' => '多KEY範例',
                'pg_path' => '/admin/code_c',
                'remark' => '多KEY範例',
                'target' => '_self',
                'pg_icon' => 'fab fa-laravel',
            ],
            [
                'pg_id' => 'setView',
                'pg_nm' => '自訂視圖範例',
                'pg_path' => '/admin/set_view',
                'remark' => '自訂視圖範例',
                'target' => '_self',
                'pg_icon' => 'fab fa-laravel',
            ],
            [
                'pg_id' => 'sample_upload',
                'pg_nm' => '檔案上傳範例',
                'pg_path' => '/admin/sample/upload',
                'remark' => '檔案上傳範例',
                'target' => '_self',
                'pg_icon' => 'fab fa-laravel',
            ],
            [
                'pg_id' => 'change_password',
                'pg_nm' => '變更密碼',
                'pg_path' => '/admin/changepassword',
                'remark' => '變更密碼',
                'target' => '_self',
                'pg_icon' => 'fas fa-key',
            ],
            [
                'pg_id' => 'code_c',
                'pg_nm' => '代碼維護',
                'pg_path' => '/admin/code_c',
                'remark' => '系統共用代碼維護程式，僅提供程式開發人員使用',
                'target' => '_self',
                'pg_icon' => 'fas fa-file-code',
            ],
            [
                'pg_id' => 'menu_set',
                'pg_nm' => '目錄維護',
                'pg_path' => '/admin/menu_set',
                'remark' => '目錄維護',
                'target' => '_self',
                'pg_icon' => 'mdi mdi-folder-multiple',
            ],
            [
                'pg_id' => 'mum01',
                'pg_nm' => '帳號維護',
                'pg_path' => '/admin/mum01',
                'remark' => '帳號維護',
                'target' => '_self',
                'pg_icon' => 'fas fa-user-plus',
            ],
            [
                'pg_id' => 'mum02',
                'pg_nm' => '角色維護',
                'pg_path' => '/admin/mum02',
                'remark' => '角色維護',
                'target' => '_self',
                'pg_icon' => 'fas fa-users',
            ],
            [
                'pg_id' => 'mum03',
                'pg_nm' => '程式維護',
                'pg_path' => '/admin/mum03',
                'remark' => '程式維護',
                'target' => '_self',
                'pg_icon' => 'fas fa-code',
            ],
            [
                'pg_id' => 'mum01_public',
                'pg_nm' => '帳號管理',
                'pg_path' => '/admin/mum01_public',
                'remark' => '帳號管理',
                'target' => '_self',
                'pg_icon' => 'fas fa-user-plus',
            ],
            [
                'pg_id' => 'mum02_public',
                'pg_nm' => '角色管理',
                'pg_path' => '/admin/mum02_public',
                'remark' => '角色管理',
                'target' => '_self',
                'pg_icon' => 'fas fa-users',
            ],
            [
                'pg_id' => 'logs',
                'pg_nm' => 'Log Viewer',
                'pg_path' => '/admin/logs',
                'remark' => 'Log Viewer，僅提供程式開發人員使用',
                'target' => '_blank',
                'pg_icon' => 'fas fa-calendar',
            ],
        ];

        foreach ($dataArray as $key => $var) {
            $data = new mum03();
            $data->fill($var);
            $data->created_id = $data->updated_id = 'admin';
            $data->save();
        }
    }
}
