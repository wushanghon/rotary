<?php

namespace App\Service\Admin\Chiliman;

use App\Repository\Admin\Chiliman\Mus01Repository;

class Mus01Service
{
    protected $Mus01Repository;

    public function __construct()
    {
        $this->Mus01Repository = new Mus01Repository;
    }

    //取得搜尋資料
    public function getAll($request, $_input)
    {
        $_data = $this->Mus01Repository->getAll($request, $_input);

        return $_data;
    }

    //取得單筆資料
    public function get($_no)
    {
        $_data = $this->Mus01Repository->get($_no);

        return $_data;
    }

    //新增資料
    public function store($_input, $_updated_id)
    {
        $_data = $this->Mus01Repository->store($_input, $_updated_id);

        return $_data;
    }

    //更新資料
    public function update($_input, $_updated_id)
    {
        $_data = $this->Mus01Repository->update($_input, $_updated_id);

        return $_data;
    }

    //刪除資料
    public function destroy($_input)
    {
        $_data = $this->Mus01Repository->destroy($_input);

        return $_data;
    }
}
