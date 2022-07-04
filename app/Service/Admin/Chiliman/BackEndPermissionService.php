<?php

namespace App\Service\Admin\Chiliman;

use App\Repository\Admin\Chiliman\Mum01Repository;

class BackEndPermissionService
{
    protected $MUM01Repository;

    public function __construct()
    {
        $this->MUM01Repository = new MUM01Repository();
    }

    //檢查權限
    public function checkUserPermission($pg_name, $account, $crmm_id)
    {
        $data = $this->MUM01Repository->checkUserPermission($pg_name, $account, $crmm_id);

        return $data;
    }
}
