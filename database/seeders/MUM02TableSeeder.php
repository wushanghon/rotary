<?php

namespace Database\Seeders;

use App\Models\Chiliman\mum02;
use Illuminate\Database\Seeder;

class MUM02TableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        mum02::truncate();

        $dataArray = [
            [
                'gp_id' => 'System',
                'gp_nm' => '系統建置維護群組',
                'gp_remark' => '系統建構人員用，可維護所有單元資料',
            ],
            [
                'gp_id' => 'Admin',
                'gp_nm' => '系統管理員',
                'gp_remark' => '系統管理員，可維護所有單元資料，除MUM02，MUM03',
            ],
        ];

        foreach ($dataArray as $key => $var) {
            $data = new mum02();
            $data->fill($var);
            $data->created_id = $data->updated_id = 'admin';
            $data->save();
        }
    }
}
