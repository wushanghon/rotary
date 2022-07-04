<?php

namespace App\Repository\Admin\Chiliman;

use App\Models\Chiliman\mus01;
use Illuminate\Support\Facades\DB;

class Mus01Repository
{
    public function __construct()
    {
    }

    public function getAll($request, $input)
    {
        $table = DB::table('mus01');

        if (count($input) > 1) {
            //這邊會根據搜尋的條件欄位而修改
            foreach ($input as $key => $val) {
                if ($request->filled($key)) {
                    $table->where($key, 'like', '%' . $val . '%');
                }
            }
        }

        $data = $table
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return $data;
    }

    public function get($no)
    {
        $data = DB::table('mus01')
            ->where('user_no', '=', $no)
            ->get();

        return $data;
    }

    public function store($input, $updated_id)
    {
        $data = new mus01;
        $data->fill($input);
        $data->created_id = $updated_id;
        $data->updated_id = $updated_id;
        $data->save();

        return $data;
    }

    public function update($input, $updated_id)
    {
        //用user_no去取出原本的
        $data = mus01::where('user_no', $input['user_no'])->first();
        $data->fill($input);
        $data->updated_id = $updated_id;
        $data->save();

        return $data;
    }

    public function destroy($input)
    {
        //用user_no去取出原本的
        $data = mus01::where('user_no', $input['user_no'])->first();
        $data->delete();
    }
}
