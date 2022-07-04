<?php

namespace Database\Seeders;

use App\Models\Chiliman\mum01;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class MUM01TableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        mum01::truncate();

        $dataArray = [
            [
                'crmm_id' => '99912345',
                'user_id' => 'admin',
                'user_pass' => Hash::make('24427841'),
                'user_nm' => '系統開發人員',
                'user_email' => 'admin@chiliman.com.tw',
                'user_remark' => 'admin',
            ],
        ];

        foreach ($dataArray as $key => $var) {
            $data = new mum01();
            $data->fill($var);
            $data->user_status = '1';
            $data->created_id = $data->updated_id = 'admin';
            $data->save();
        }
    }
}
