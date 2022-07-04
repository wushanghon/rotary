<?php

/**
 * Created by PhpStorm.
 * User: user
 * Date: 2020/11/25
 * Time: 下午 07:18
 */

namespace App\Repository\Admin\Chiliman;

use App\Models\Chiliman\mum02;
use App\Models\Chiliman\mus02;
use Illuminate\Support\Facades\DB;

class Mus02Repository
{
    public function getAll()
    {
        return mum02::get();
    }

    public function store($input, $updated_id)
    {
        $data = new mus02;
        $data->fill($input);
        $data->created_id = $updated_id;
        $data->updated_id = $updated_id;
        $data->save();

        return $data;
    }

    /**
     * 新增程式與角色對應
     * @param $pg_id
     * @param $gp_id
     * @param $updated_id
     * @return mus02
     */
    protected function storeWith(string $pg_id, string $gp_id, string $updated_id)
    {
        $data = new mus02;
        $data->pg_id = $pg_id;
        $data->gp_id = $gp_id;
        $data->g_query = 'Y';
        $data->g_add = 'Y';
        $data->g_mod = 'Y';
        $data->g_del = 'Y';
        $data->created_id = $updated_id;
        $data->updated_id = $updated_id;
        $data->save();

        return $data;
    }

    public function deleteAndInsert(string $pg_id, array $gp_id_Array, string $updated_id)
    {
        mus02::where('pg_id', $pg_id)->delete();

        foreach ($gp_id_Array as $value) {
            $this->storeWith($pg_id, $value, $updated_id);
        }
    }

    public function update($input, $updated_id)
    {
        $data = mus02::where([
                'gp_id' => $input['gp_id'],
                'pg_id' => $input['pg_id'],
            ])->first();

        $data->fill($input);
        $data->updated_id = $updated_id;
        $data->save();

        return $data;
    }

    public function duplicateBy($gp_id, $origp_id)
    {
        //直接寫select insert
        $sql = 'INSERT INTO mus02 SELECT ?
                        ,pg_id
                        ,g_query
                        ,g_add
                        ,g_mod
                        ,g_del
                        ,created_id
                        ,updated_id
                        ,created_at
                        ,updated_at
                        FROM mus02
                        WHERE gp_id=?';

        $param = [$gp_id, $origp_id];

        DB::statement($sql, $param);

        return true;
    }

    /**
     * 讀取指定pg_id的所有關聯資料
     * @param $pg_id
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function queryBy($pg_id)
    {
        return mus02::with('mum02')
                ->where('pg_id', $pg_id)
                ->get();
    }

    /**
     * 批次刪除不在gp_ids指定的資料
     * @param $pg_id
     * @param $gp_ids
     * @return bool
     */
    public function deleteNotIn($pg_id, $gp_ids)
    {
        return mus02::where('pg_id', $pg_id)
                ->whereNotIN('gp_id', $gp_ids)
                ->delete();
    }

    /**
     * 資料不存在的作新增
     * @param $pg_id
     * @param $gp_ids
     * @param $gp_id_notInMus02 MUS02已有的群組
     * @param $account 登入帳號
     */
    public function insertNotExist($pg_id, $gp_ids, $gp_id_notInMus02, $account)
    {
        //取得需要新增的群組資料
        $mum02 = mum02::whereIn('gp_id', $gp_ids)
            ->whereNotIn('gp_id', $gp_id_notInMus02)
            ->get();

        //寫入新增的群組
        $dataList = [];

        foreach ($mum02 as $data) {
            array_push($dataList, [
                'gp_id' => $data->gp_id,
                'pg_id' => $pg_id,
                'g_query' => 'Y',
                'g_add' => 'Y',
                'g_mod' => 'Y',
                'g_del' => 'Y',
                'created_id' => $account,
                'updated_id' => $account,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s"),
            ]);
        }

        DB::table('mus02')->insert($dataList);

        return;
    }

    public function deleteBy($gp_id)
    {
        return mus02::where('gp_id', $gp_id)->delete();
    }

    public function destroy($gpid, $pgid = [])
    {
        if (count($pgid) == 0) {
            mus02::where('gp_id', '=', $gpid)
                ->delete();
        } else {
            mus02::whereIn('pg_id', $pgid)
                ->where('gp_id', '=', $gpid)
                ->delete();
        }
    }

    //用 gp_id 取出有設定的
    public function queryByGroupWithSet($gp_id)
    {
        $data = DB::table('mus02')
            ->leftjoin('mum03', 'mus02.pg_id', '=', 'mum03.pg_id')
            ->where('gp_id', '=', $gp_id)
            ->orderBy('mus02.pg_id', 'asc')
            ->get();

        return $data;
    }

    //用 gp_id 取出還沒設定的
    public function queryByGroupWithoutSet($gp_id)
    {
        $data = DB::table('mum03')
            ->select('pg_id', 'pg_nm', 'remark')
            ->whereNotIn('pg_id', function ($query) use ($gp_id) {
                $query->select('pg_id')
                    ->from('mus02')
                    ->where('gp_id', '=', $gp_id);
            })->orderBy('pg_id', 'asc')
            ->get();

        return $data;
    }

    //用 gp_id 取出還沒設定的 排除 mum02, mum03, code_d
    public function queryByGroupWithoutSet_Admin($gp_id)
    {
        $data = DB::table('mum03')
            ->select('pg_id', 'pg_nm', 'remark')
            ->whereNotIn('pg_id', ['mum01', 'mum02', 'mum03', 'code_c', 'logs'])
            ->whereNotIn('pg_id', function ($query) use ($gp_id) {
                $query->select('pg_id')
                    ->from('mus02')
                    ->where('gp_id', '=', $gp_id);
            })->orderBy('pg_id', 'asc')
            ->get();

        return $data;
    }

    public function get($no)
    {
        $data = DB::table('mus02')
            ->where('gp_id', '=', $no)
            ->get();

        return $data;
    }
}
