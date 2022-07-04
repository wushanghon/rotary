<?php

namespace Database\Seeders;

use App\Models\Chiliman\code_c;
use Illuminate\Database\Seeder;

class CodeCTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        code_c::truncate();
        $dataArray = [];

        /*************** 目標視窗 Start ***************/

        $dataArray = array_merge($dataArray, [
            [
                'code_type' => 'targetType',
                'code_type_desc' => '目標視窗',
                'code_id' => '_self',
                'code_desc' => '在原視窗開啟',
                'code_sort' => 1,
            ],
            [
                'code_type' => 'targetType',
                'code_type_desc' => '目標視窗',
                'code_id' => '_blank',
                'code_desc' => '在新視窗開啟',
                'code_sort' => 2,
            ],
        ]);

        /*************** 目標視窗 End ***************/

        /*************** 是否代碼 Start ***************/

        $dataArray = array_merge($dataArray, [
            [
                'code_type' => 'YN',
                'code_type_desc' => '是否代碼',
                'code_id' => 'Y',
                'code_desc' => '是',
                'code_sort' => 1,
            ],
            [
                'code_type' => 'YN',
                'code_type_desc' => '是否代碼',
                'code_id' => 'N',
                'code_desc' => '否',
                'code_sort' => 2,
            ],
        ]);

        /*************** 是否代碼 End ***************/

        /*************** 啟用代碼 Start ***************/

        $dataArray = array_merge($dataArray, [
            [
                'code_type' => '10',
                'code_type_desc' => '啟用代碼',
                'code_id' => '1',
                'code_desc' => '啟用',
                'code_sort' => 1,
            ],
            [
                'code_type' => '10',
                'code_type_desc' => '啟用代碼',
                'code_id' => '0',
                'code_desc' => '不啟用',
                'code_sort' => 2,
            ],
        ]);

        /*************** 是否代碼 End ***************/

        foreach ($dataArray as $key => $var) {
            $data = new code_c();
            $data->fill($var);
            $data->code_dsp = 'Y';
            $data->created_id = $data->updated_id = 'admin';
            $data->save();
        }
    }
}
