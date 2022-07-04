<?php

/**
 * Created by PhpStorm.
 * User: user
 * Date: 2020/11/25
 * Time: 下午 05:49
 */

namespace App\Repository\Admin\Chiliman;

use App\Models\Chiliman\mum02;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Libraries\Chiliman\BackendRepositoryAbstract;

class Mum02Repository extends BackendRepositoryAbstract
{
    public function __construct()
    {
        $this->setEntity(mum02::class);
        $this->setNumberOfRow(10);
    }

    public function query(Request $request, bool $paginate)
    {
        $table = $this->baseEntity::whereRaw('1=1');

        $input = $request->except(['_token', '_method', 'page', 'key']);

        foreach ($input as $key => $val) {
            if ($request->filled($key)) {
                switch ($key) {
                    case '等於的欄位': //依需求修改
                        $table->where($key, '=', $val);
                        break;
                    default: //like
                        $table->where($key, 'like', '%' . $val . '%');
                        break;
                }
            }
        }

        $table->orderBy('created_at', 'desc');

        if ($paginate == true) {
            $datalist = $table->paginate($this->numberOfRow);
        } else {
            $datalist = $table->get();
        }

        return $datalist;
    }

    //查詢列表，排除System角色
    public function queryPublic(Request $request, bool $paginate)
    {
        $table = $this->baseEntity::whereRaw('1=1');

        $input = $request->except(['_token', '_method', 'page', 'key']);

        $table->where('gp_id', '<>', 'System');

        foreach ($input as $key => $val) {
            if ($request->filled($key)) {
                switch ($key) {
                    case '等於的欄位': //依需求修改
                        $table->where($key, '=', $val);
                        break;
                    default: //like
                        $table->where($key, 'like', '%' . $val . '%');
                        break;
                }
            }
        }

        $table->orderBy('created_at', 'desc');

        if ($paginate == true) {
            $datalist = $table->paginate($this->numberOfRow);
        } else {
            $datalist = $table->get();
        }

        return $datalist;
    }

    //其他
    public function queryGroup()
    {
        $data = DB::table('mum02')
            ->select('gp_id', 'gp_nm')
            ->get();

        return $data;
    }


    //查詢System之外的群組
    public function queryGroupPublic()
    {
        $data = DB::table('mum02')
            ->select('gp_id', 'gp_nm')
            ->where('gp_id', '<>', 'System')
            ->get();

        return $data;
    }
}
