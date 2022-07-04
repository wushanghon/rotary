<?php

namespace App\Repository\Admin\Chiliman;

use App\Models\Chiliman\log_m;
use App\Models\Chiliman\mum03;
use Illuminate\Support\Facades\DB;

class LogRepository
{
    public function __construct()
    {
    }

    public function getAll($request, $input)
    {
        $table = DB::table('log_m')
            ->leftJoin('code_c as c1', function ($join) {
                $join->on('log_m.log_type', '=', 'c1.code_id')
                    ->where('c1.code_type', '=', 'log_type');
            })->leftJoin('mum03', function ($join) {
                $join->on('log_m.pg_id', '=', 'mum03.pg_id');
            })->select(
                'log_m.*',
                'c1.code_desc as log_type_desc',
                'mum03.pg_nm'
            );

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
        $data = log_m::findOrFail($no);

        return $data;
    }

    public function store($input, $updated_id)
    {
        $data = new log_m;
        $data->fill($input);
        $data->created_id = $updated_id;
        $data->updated_id = $updated_id;
        $data->save();

        return $data;
    }

    public function update($input, $updated_id)
    {
        $data = log_m::findOrFail($input['key']);
        $data->fill($input);
        $data->updated_id = $updated_id;
        $data->save();

        return $data;
    }

    public function destroy($no)
    {
        return log_m::destroy($no);
    }

    public function storeAutoLog($input, $oriDataArray, $log_type)
    {
        //取得pg_id
        //用url去mum03取得pg_id

        $path = explode('/', \Request::path()); //字串分割成陣列
        $path = array_slice($path, 0, count($path) - 1); //把最後一個去掉
        $path = '/' . implode("/", $path); //把陣列組成字串
        $mum03 = mum03::where('pg_path', $path)->first(); //從mum03取出
        $pg_id = $mum03->toarray()['pg_id'];
        $user_id = session()->get('user_id');
        $table_nm = get_class($input);
        $table_nm = str_replace('App\\Entity\\', '', $table_nm);

        $data = new log_m;
        $data->user_id = $user_id;
        $data->log_type = $log_type;
        $data->created_id = $user_id;
        $data->updated_id = $user_id;
        $data->pg_id = $pg_id;
        $data->table_nm = $table_nm;
        $data->data_old = json_encode($oriDataArray, true);
        $data->data_new = json_encode($input->toArray(), true);
        $data->save();

        return $data;
    }

    //寫入其他記錄
    public function storeOtherLog($log_type, $pg_id, $table_nm)
    {
        $user_id = session()->get('user_id');

        $data = new log_m;
        $data->user_id = $user_id;
        $data->log_type = $log_type;
        $data->created_id = $user_id;
        $data->updated_id = $user_id;
        $data->pg_id = $pg_id;
        $data->table_nm = $table_nm;
        $data->data_old = '';
        $data->data_new = '';
        $data->save();

        return $data;
    }

    //取得上次登入時間-給登入首頁用
    public function getLastLogin($user_id)
    {
        $data = log_m::where('user_id', $user_id)
            ->where('log_type', 'login')
            ->orderBy('created_at', 'desc')
            ->first();

        return $data;
    }

    //取得操作記錄-給登入首頁用
    public function getUserLog($user_id)
    {
        $table = DB::table('log_m')
            ->leftJoin('user_role_union', function ($join) {
                $join->on('log_m.user_id', '=', 'user_role_union.user_id');
            })->leftJoin('role_m', function ($join) {
                $join->on('role_m.role_no', '=', 'user_role_union.role_no');
            })->leftJoin('code_c as c1', function ($join) {
                $join->on('log_m.log_type', '=', 'c1.code_id')
                    ->where('c1.code_type', '=', 'log_type');
            })->leftJoin('code_c as c2', function ($join) {
                $join->on('role_m.roleType', '=', 'c2.code_id')
                    ->where('c2.code_type', '=', 'roleType');
            })->leftJoin('mum03', function ($join) {
                $join->on('log_m.pg_id', '=', 'mum03.pg_id');
            })->where('log_m.user_id', '=', $user_id)
            ->orderby('log_m.created_at', 'desc')
            ->limit(20)
            ->select(
                'log_m.*',
                'role_m.roleName',
                'c1.code_desc as log_type_desc',
                'c2.code_desc as role_type_desc',
                'mum03.pg_nm'
            );

        $data = $table->get();

        return $data;
    }
}
