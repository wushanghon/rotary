<?php

namespace App\Repository\Admin\Chiliman;

use App\Models\Chiliman\mum01;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Libraries\Chiliman\BackendRepositoryAbstract;

class Mum01Repository extends BackendRepositoryAbstract
{
    public function __construct()
    {
        $this->setEntity(mum01::class);
        $this->setNumberOfRow(10);
    }

    public function query(Request $request, bool $paginate = true)
    {
        $input = $request->except(['_token', '_method', 'page', 'key']);

        $table = DB::table('mum01 AS m1')
            ->leftJoin('mus01 AS s', 'm1.user_no', '=', 's.user_no')
            ->leftJoin('mum02 AS m2', 's.gp_id', '=', 'm2.gp_id')
            ->leftjoin('code_c AS c', function ($join) {
                $join->on('m1.user_status', '=', 'c.code_id')
                    ->where('c.code_type', '10');
            })->where('m1.deleted_at', '=', null)
            ->select('m1.*', 's.gp_id', 'm2.gp_nm', 'c.code_desc');

        foreach ($input as $key => $val) {
            if ($request->filled($key)) {
                switch ($key) {
                    case '等於的欄位': //依需求修改
                        $table->where('m1.' . $key, '=', $val);
                        break;
                    default: //like
                        $table->where('m1.' . $key, 'like', '%' . $val . '%');
                        break;
                }
            }
        }

        $data = $table
            ->orderBy('m1.created_at', 'desc')
            ->paginate($this->numberOfRow);

        return $data;
    }

    public function queryPublic(Request $request, bool $paginate = true)
    {
        $input = $request->except(['_token', '_method', 'page', 'key']);

        $table = DB::table('mum01 AS m1')
            ->leftJoin('mus01 AS s', 'm1.user_no', '=', 's.user_no')
            ->leftJoin('mum02 AS m2', 's.gp_id', '=', 'm2.gp_id')
            ->leftJoin('code_c AS c', function ($join) {
                $join->on('m1.user_status', '=', 'c.code_id')
                    ->where('c.code_type', '10');
            })->where('m1.deleted_at', '=', null)
            ->where('m1.user_id', '<>', 'admin')
            ->select('m1.*', 's.gp_id', 'm2.gp_nm', 'c.code_desc');

        foreach ($input as $key => $val) {
            if ($request->filled($key)) {
                switch ($key) {
                    case '等於的欄位': //依需求修改
                        $table->where('m1.' . $key, '=', $val);
                        break;
                    default: //like
                        $table->where('m1.' . $key, 'like', '%' . $val . '%');
                        break;
                }
            }
        }

        $data = $table
            ->orderBy('m1.created_at', 'desc')
            ->paginate($this->numberOfRow);

        return $data;
    }

    public function get($no)
    {
        $data = DB::table('mum01')
            ->leftJoin('mus01', 'mum01.user_no', '=', 'mus01.user_no')
            ->leftJoin('mum02', 'mum02.gp_id', '=', 'mus01.gp_id')
            ->select('mum01.*', 'mus01.gp_id', 'mum02.gp_nm')
            ->where('mum01.user_no', '=', $no)
            ->first();

        return $data;
    }

    public function destroy($ids)
    {
        mum01::where('user_no', $ids)
            ->update(['user_status' => '0']);

        return parent::destroy($ids);
    }

    //用 user_id 取出
    public function getByCrmmUser(string $user_id)
    {
        $data = DB::table('mum01')
            ->where('user_id', '=', $user_id)
            ->where('deleted_at', '=', null)
            ->get();

        return $data;
    }

    //產生新密碼
    public function getUserNewPwd($crmm_id, $user_id)
    {
        //新密碼
        $Pwd = ComFun::GetRandPass(6);
        $HashPwd = Hash::make($Pwd);

        //更新
        mum01::where('crmm_id', $crmm_id)
            ->where('user_id', $user_id)
            ->update(['user_pass' => $HashPwd]);

        return $Pwd;
    }

    //登入查詢
    public function signInProcess($request, $input)
    {
        $data = '';

        if (count($input) > 1) {
            $account = $input['account'];
            //$crmm_id = $input['CrmmId'];

            $data = DB::table('mum01')
                ->leftJoin('mus01', 'mum01.user_no', '=', 'mus01.user_no')
                ->select('mum01.*', 'mus01.gp_id')
                ->where('mum01.user_id', '=', $account)
                //-> where('mum01.crmm_id', '=', $crmm_id)
                ->where('mum01.deleted_at', '=', null)
                ->first();
        }

        return $data;
    }

    //檢查權限
    public function checkUserPermission($pg_name, $account, $crmm_id)
    {
        $data = DB::table('mum01 AS m1')
            ->select('s1.gp_id', 's2.g_query', 's2.g_add', 's2.g_mod', 's2.g_del')
            ->leftjoin('mus01 AS s1', 'm1.user_no', '=', 's1.user_no')
            ->leftjoin('mus02 AS s2', function ($join) use ($pg_name) {
                $join->on('s1.gp_id', '=', 's2.gp_id')
                    ->where('s2.pg_id', '=', $pg_name);
            })->where([
                'm1.user_id' => $account,
                'm1.crmm_id' => $crmm_id,
            ])->first();

        return $data;
    }
}
