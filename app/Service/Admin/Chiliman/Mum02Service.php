<?php

/**
 * Created by PhpStorm.
 * User: user
 * Date: 2020/11/25
 * Time: 下午 05:45
 */

namespace App\Service\Admin\Chiliman;

use App\Repository\Admin\Chiliman\Mum02Repository;
use Libraries\Chiliman\BackendServiceAbstract;

class Mum02Service extends BackendServiceAbstract
{
    protected $repository;
    protected $Mus02Service;
    protected $MenuSetService;

    public function __construct()
    {
        $this->repository = new Mum02Repository();
        $this->setRepository($this->repository);

        //定義service
        $this->Mus02Service = new Mus02Service();
        $this->MenuSetService = new MenuSetService();
    }

    public function destroy($id)
    {
        if ($id == 'System' || $id == 'Admin') return 0;

        //刪除關聯資料
        $this->Mus02Service->deleteBy($id);
        $this->MenuSetService->deleteBy($id);

        return parent::destroy($id);
    }

    /**
     * 複製角色與權限
     * @param $input
     * @param $updated_id
     * @return bool
     */
    public function duplicate($input, $updated_id)
    {
        //建立群組
        $gp_id = $input['gp_id'];
        $origp_id = $input['origp_id'];
        $input['$updated_id'] = $updated_id;
        $this->repository->store($input);

        //複製權限
        $this->Mus02Service->duplicateBy($gp_id, $origp_id);

        //複製資料夾設定
        $this->MenuSetService->duplicateBy($gp_id, $origp_id);

        return true;
    }

    public function getForCopyGroup($gp_id)
    {
        $data = $this->repository->get($gp_id);
        $data['gp_id'] = $data['gp_id'] . '-copy';

        return $data;
    }

    /**
     * 查詢群組清單
     * @return mixed
     */
    public function queryGroup()
    {
        $_data = $this->repository->queryGroup();

        return $_data;
    }

    /**
     * 查詢群組清單  排除System
     * @return mixed
     */
    public function queryGroupPublic()
    {
        $_data = $this->repository->queryGroupPublic();

        return $_data;
    }
}
