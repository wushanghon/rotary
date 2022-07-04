<?php

/**
 * Created by PhpStorm.
 * User: user
 * Date: 2020/11/25
 * Time: 下午 05:45
 */

namespace App\Service\Admin\Chiliman;

use Illuminate\Http\Request;

/**
 *  繼承Mum02Service
 *  複寫query
 *  複寫queryGroup
 */
class Mum02_publicService extends Mum02Service
{

    /**
     * @param Request $request
     * @param bool $paginate
     * @return mixed
     */
    public function query(Request $request, bool $paginate = false)
    {
        if (!$this->isInitialed) dd($this->NOT_SET_MESSAGE);

        $data = $this->repository->queryPublic($request, $paginate);

        return $data;
    }

    /**
     * 查詢群組清單
     * @return mixed
     */
    public function queryGroup()
    {
        $_data = $this->repository->queryGroupPublic();

        return $_data;
    }
}
