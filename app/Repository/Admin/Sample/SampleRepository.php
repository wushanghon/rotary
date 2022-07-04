<?php

namespace App\Repository\Admin\Sample;

use App\Models\Sample\sample;
use Libraries\Chiliman\BackendRepositoryAbstract;

class SampleRepository extends BackendRepositoryAbstract
{
    public function __construct()
    {
        $this->setEntity(sample::class);
        $this->setNumberOfRow(10);
    }

    /**
     * 以下自行撰寫需要的method
     */

    /**
     * 查詢指定crmm_id的資料
     * @param string $crmm_id
     * @return mixed
     */
    public function queryByCrmmId(string $crmm_id)
    {
        return sample::where('crmm_id',$crmm_id)->get();
    }
}
