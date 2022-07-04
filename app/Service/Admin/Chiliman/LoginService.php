<?php

namespace App\Service\Admin\Chiliman;

use App\Repository\Admin\Chiliman\Mum01Repository;
use App\Service\Admin\Chiliman\LogService;

class LoginService
{
    protected $LogService;
    protected $MUM01Repository;

    public function __construct(
        LogService $LogService,
        Mum01Repository $MUM01Repository
    ) {
        $this->LogService = $LogService;
        $this->MUM01Repository = $MUM01Repository;
    }

    //取得客戶編號對應的企業名稱
    public function getCustomerName($CrmmId)
    {
        $data = $this->CustomerSettingRepository->GetCustomerDataByCrmmId($CrmmId);

        return $data;
    }

    //登入查詢
    public function signInProcess($Request, $input)
    {
        $data = $this->MUM01Repository->signInProcess($Request, $input);

        return $data;
    }

    //寫入登入記錄
    public function storeLoginLog()
    {
        $data = $this->LogService->storeOtherLog('login', 'login', 'mum01');

        return $data;
    }
}
