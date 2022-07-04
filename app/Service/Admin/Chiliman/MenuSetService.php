<?php

namespace App\Service\Admin\Chiliman;

use App\Repository\Admin\Chiliman\MenuSetRepository;

class MenuSetService
{
    protected $MenuSetRepository;
    protected $pg_id;

    public function __construct()
    {
        $this->MenuSetRepository = new MenuSetRepository();
        $this->pg_id = 'menu_set';
    }

    //取得搜尋資料
    public function getAll($request, $input)
    {
        $data = $this->MenuSetRepository->getAll($request, $input);

        return $data;
    }

    //更新資料
    public function update($input, $user)
    {
        $data = $this->MenuSetRepository->update($input, $user);

        return $data;
    }

    //新增資料夾
    public function addNewFolder($input, $user)
    {
        $data = $this->MenuSetRepository->addNewFolder($input, $user);

        return $data;
    }

    //取序號
    public function getid($input)
    {
        $data = $this->MenuSetRepository->getid($input);

        return $data;
    }

    /**
     * 複製群組資料夾排序資料
     * @param $new_gp_id
     * @param $ori_gp_id
     * @return bool
     */
    public function duplicateBy($new_gp_id, $ori_gp_id)
    {
        $this->MenuSetRepository->duplicateBy($new_gp_id, $ori_gp_id);

        return true;
    }

    public function deleteBy($gp_id)
    {
        return $this->MenuSetRepository->deleteBy($gp_id);
    }
}
