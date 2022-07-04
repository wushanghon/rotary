<?php

namespace App\Service\Admin\Chiliman;

use App\Repository\Admin\Chiliman\BackEndTreeViewRepository;

class BackEndTreeViewService
{
    protected $BackEndTreeViewRepository;

    public function __construct(BackEndTreeViewRepository $BackEndTreeViewRepository)
    {
        $this->BackEndTreeViewRepository = $BackEndTreeViewRepository;
    }

    //取得樹狀選單(會一併修正樹狀結構資料)
    public function GetTreeCont($crmm_id, $user_no)
    {
        $data = $this->BackEndTreeViewRepository->GetTreeCont($crmm_id, $user_no);

        return $data;
    }

    //取得樹狀結構
    public function GetSubItem($PG_PREV, $IsEnd, $gp_id, $InLevel, $Type)
    {
        $data = $this->BackEndTreeViewRepository->GetSubItem($PG_PREV, $IsEnd, $gp_id, $InLevel, $Type);

        return $data;
    }
}
