<?php

namespace App\Repository\Admin\Chiliman;

use App\Models\Chiliman\mum03;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Libraries\Chiliman\BackendRepositoryAbstract;
use Libraries\Chiliman\BackendRepositoryInterface;

class Mum03Repository extends BackendRepositoryAbstract implements BackendRepositoryInterface
{
    public function __construct()
    {
        $this->setEntity(mum03::class);
        $this->setNumberOfRow(10);
    }

    public function query(Request $request, bool $paginate)
    {
        $table = mum03::whereRaw('1=1');

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

    //    public function get( $no)
    //    {
    //        $data = DB::table('mum03')
    //            -> where('pg_id', '=', $no)
    //            -> get();
    //        return $data[0];
    //    }
    //
    //    public function store(array $input)
    //    {
    //        $data = new mum03;
    //        $data->fill($input);
    //        $data->save();
    //        return $data;
    //    }

    //    public function update( $id, array $input)
    //    {
    //        $data = mum03::findOrFail($id);
    //        $data->fill($input);
    //        $data->save();
    //        return $data;
    //    }

    //    public function destroy( $no)
    //    {
    //        return mum03::destroy($no);
    //    }
}
