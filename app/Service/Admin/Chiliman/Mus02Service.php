<?php

/**
 * Created by PhpStorm.
 * User: user
 * Date: 2020/11/25
 * Time: 下午 07:16
 */

namespace App\Service\Admin\Chiliman;

use App\Repository\Admin\Chiliman\Mus02Repository;

class Mus02Service
{
    protected $repository;

    public function __construct()
    {
        $this->repository = new Mus02Repository();
    }

    public function getAll()
    {
        return $this->repository->getAll();
    }

    public function duplicateBy($gp_id, $origp_id)
    {
        return $this->repository->duplicateBy($gp_id, $origp_id);
    }

    public function queryBy($pg_id)
    {
        return $this->repository->queryBy($pg_id);
    }

    /**
     * 批次刪除新增群組與程式的關聯
     * @param $pg_id
     * @param $gp_ids 畫面上有勾選的群組
     * @param $account 登入帳號
     * @return bool
     */
    public function deleteAndInsert($pg_id, $gp_ids, $account)
    {
        //讀取舊資料
        $oriData = $this->queryBy($pg_id);
        //dd(array_pluck($oriData,'gp_id'));

        //比對存在與否
        //無勾選，但有舊資料的作刪除
        $this->repository->deleteNotIn($pg_id, $gp_ids);

        //有勾選，但資料不存在的作新增
        $gp_id_notInMus02 = array_pluck($oriData, 'gp_id');
        $this->repository->insertNotExist($pg_id, $gp_ids, $gp_id_notInMus02, $account);
        //有更選，但資料存在的不作任何異動

        return true;
    }

    public function deleteBy($pg_id)
    {
        return $this->repository->deleteBy($pg_id);
    }

    //取得單筆資料
    public function get($no)
    {
        $data = $this->repository->get($no);

        return $data;
    }

    //新增資料
    public function store($input, $updated_id)
    {
        $data = $this->repository->store($input, $updated_id);

        return $data;
    }

    //更新資料
    public function update($input, $updated_id)
    {
        $data = $this->repository->update($input, $updated_id);

        return $data;
    }

    //刪除資料
    public function destroy($gp_id, $pg_id = [])
    {
        $data = $this->repository->destroy($gp_id, $pg_id);

        return $data;
    }

    //用 gp_id 取出有設定的
    public function queryByGroupWithSet($gp_id)
    {
        $data = $this->repository->queryByGroupWithSet($gp_id);

        return $data;
    }

    //用 gp_id 取出還沒設定的
    public function queryByGroupWithoutSet($gp_id)
    {
        $data = $this->repository->queryByGroupWithoutSet($gp_id);

        return $data;
    }
}
