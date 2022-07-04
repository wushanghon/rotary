<?php

namespace App\Service\Admin\Chiliman;

use App\Repository\Admin\Chiliman\Mum03Repository;
use App\Repository\Admin\Chiliman\Mus02Repository;
use Illuminate\Http\Request;
use Libraries\Chiliman\BackendServiceInterface;

class Mum03Service implements BackendServiceInterface
{
    protected $repository;
    protected $Mus02Repository;

    public function __construct()
    {
        $this->repository = new Mum03Repository();
        $this->Mus02Repository = new Mus02Repository();
    }

    //取得搜尋資料
    public function query(Request $request, bool $paginate = false)
    {
        $data = $this->repository->query($request, $paginate);

        return $data;
    }

    //取得單筆資料
    public function get($no)
    {
        $data = $this->repository->get($no);

        return $data;
    }

    //新增資料
    public function store(array $input, string $updated_id)
    {
        //處理角色對應資料
        $gp_id_array = (isset($input['gp_id'])) ? $input['gp_id'] : [];
        $this->Mus02Repository->deleteAndInsert($input['pg_id'], $gp_id_array, $updated_id);

        //畫面上沒有的欄位在這裡處理
        $input['created_id'] = $updated_id;
        $input['updated_id'] = $updated_id;

        $data = $this->repository->store($input);

        return $data;
    }

    //更新資料
    public function update($id, array $input, string $updated_id)
    {
        //處理角色對應資料
        $gp_id_array = (isset($input['gp_id'])) ? $input['gp_id'] : [];
        $this->Mus02Repository->deleteAndInsert($input['pg_id'], $gp_id_array, $updated_id);

        //畫面上沒有的欄位在這裡處理
        $input['updated_id'] = $updated_id;
        $data = $this->repository->update($id, $input);

        return $data;
    }

    //刪除資料
    public function destroy($no)
    {
        $data = $this->repository->destroy($no);

        return $data;
    }
}
