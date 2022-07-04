<?php

namespace Database\Seeders;

use App\Models\Chiliman\mus01;
use Illuminate\Database\Seeder;

class MUS01TableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        mus01::truncate();

        $dataArray = [
            [
                'user_no' => '1',
                'gp_id' => 'System',
            ],
        ];

        foreach ($dataArray as $key => $var) {
            $data = new mus01();
            $data->fill($var);
            $data->created_id = $data->updated_id = 'admin';
            $data->save();
        }
    }
}
