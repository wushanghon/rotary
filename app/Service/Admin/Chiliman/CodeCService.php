<?php

namespace App\Service\Admin\Chiliman;

use App\Repository\Admin\Chiliman\CodeCRepository;
use Libraries\Chiliman\BackendServiceAbstract;

class CodeCService extends BackendServiceAbstract
{
    protected $repository;

    public function __construct()
    {
        $this->repository = new CodeCRepository();
        $this->setRepository($this->repository);
    }

    public function queryCodeType()
    {
        $data = $this->repository->queryCodeType();

        return $data;
    }

    public function queryByCodeType($codeType, $code_dsp = 'Y', $exclude = null)
    {
        $data = $this->repository->queryByCodeType($codeType, $code_dsp, $exclude);

        return $data;
    }
}
