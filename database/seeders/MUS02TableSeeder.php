<?php

namespace Database\Seeders;

use App\Models\Chiliman\mus02;
use Illuminate\Database\Seeder;

class MUS02TableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        mus02::truncate();
        $dataArray = [];

        /*************** System 群組 Start ***************/

        $dataArray = array_merge($dataArray, [
            [
                'gp_id' => 'System',
                'pg_id' => 'sample',
                'g_query' => 'Y',
                'g_add' => 'Y',
                'g_mod' => 'Y',
                'g_del' => 'Y',
            ],
            [
                'gp_id' => 'System',
                'pg_id' => 'fast',
                'g_query' => 'Y',
                'g_add' => 'Y',
                'g_mod' => 'Y',
                'g_del' => 'Y',
            ],
            [
                'gp_id' => 'System',
                'pg_id' => 'mutiSample',
                'g_query' => 'Y',
                'g_add' => 'Y',
                'g_mod' => 'Y',
                'g_del' => 'Y',
            ],
            [
                'gp_id' => 'System',
                'pg_id' => 'sample_upload',
                'g_query' => 'Y',
                'g_add' => 'Y',
                'g_mod' => 'Y',
                'g_del' => 'Y',
            ],
            [
                'gp_id' => 'System',
                'pg_id' => 'setView',
                'g_query' => 'Y',
                'g_add' => 'Y',
                'g_mod' => 'Y',
                'g_del' => 'Y',
            ],
            [
                'gp_id' => 'System',
                'pg_id' => 'change_password',
                'g_query' => 'Y',
                'g_add' => 'Y',
                'g_mod' => 'Y',
                'g_del' => 'Y',
            ],
            [
                'gp_id' => 'System',
                'pg_id' => 'code_c',
                'g_query' => 'Y',
                'g_add' => 'Y',
                'g_mod' => 'Y',
                'g_del' => 'Y',
            ],
            [
                'gp_id' => 'System',
                'pg_id' => 'menu_set',
                'g_query' => 'Y',
                'g_add' => 'Y',
                'g_mod' => 'Y',
                'g_del' => 'Y',
            ],
            [
                'gp_id' => 'System',
                'pg_id' => 'mum01',
                'g_query' => 'Y',
                'g_add' => 'Y',
                'g_mod' => 'Y',
                'g_del' => 'Y',
            ],
            [
                'gp_id' => 'System',
                'pg_id' => 'mum02',
                'g_query' => 'Y',
                'g_add' => 'Y',
                'g_mod' => 'Y',
                'g_del' => 'Y',
            ],
            [
                'gp_id' => 'System',
                'pg_id' => 'mum03',
                'g_query' => 'Y',
                'g_add' => 'Y',
                'g_mod' => 'Y',
                'g_del' => 'Y',
            ],
            [
                'gp_id' => 'System',
                'pg_id' => 'mum01_public',
                'g_query' => 'Y',
                'g_add' => 'Y',
                'g_mod' => 'Y',
                'g_del' => 'Y',
            ],
            [
                'gp_id' => 'System',
                'pg_id' => 'mum02_public',
                'g_query' => 'Y',
                'g_add' => 'Y',
                'g_mod' => 'Y',
                'g_del' => 'Y',
            ],
            [
                'gp_id' => 'System',
                'pg_id' => 'logs',
                'g_query' => 'Y',
                'g_add' => 'Y',
                'g_mod' => 'Y',
                'g_del' => 'Y',
            ],
        ]);

        /*************** System 群組 End ***************/

        /*************** Admin 群組 Start ***************/

        $dataArray = array_merge($dataArray, [
            [
                'gp_id' => 'Admin',
                'pg_id' => 'mum01_public',
                'g_query' => 'Y',
                'g_add' => 'Y',
                'g_mod' => 'Y',
                'g_del' => 'Y',
            ],
            [
                'gp_id' => 'Admin',
                'pg_id' => 'mum02_public',
                'g_query' => 'Y',
                'g_add' => 'Y',
                'g_mod' => 'Y',
                'g_del' => 'Y',
            ],
            [
                'gp_id' => 'Admin',
                'pg_id' => 'change_password',
                'g_query' => 'Y',
                'g_add' => 'Y',
                'g_mod' => 'Y',
                'g_del' => 'Y',
            ],
        ]);

        /*************** Admin 群組 End ***************/

        foreach ($dataArray as $key => $var) {
            $data = new mus02();
            $data->fill($var);
            $data->created_id = $data->updated_id = 'admin';
            $data->save();
        }
    }
}
