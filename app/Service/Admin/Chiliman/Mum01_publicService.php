<?php

namespace App\Service\Admin\Chiliman;

use Illuminate\Http\Request;

class Mum01_publicService extends Mum01Service
{
    protected $repository;
    protected $mus01Service;

    /**
     * @param Request $request
     * @param bool $paginate
     * @return mixed
     */
    public function query(Request $request, bool $paginate = false)
    {
        if (!$this->isInitialed) dd($this->Not_Set_Message);

        $data = $this->baseRepository->queryPublic($request, $paginate);

        return $data;
    }
}
