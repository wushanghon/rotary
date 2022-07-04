<?php

/**
 * Created by PhpStorm.
 * User: user
 * Date: 2020/11/25
 * Time: 下午 07:16
 */

namespace App\Service\Admin\Chiliman;

class Mus02_publicService extends Mus02Service
{

    /**
     * @param String $gp_id
     * @return mixed
     */
    public function queryByGroupWithoutSet($gp_id)
    {
        $data = $this->mus02Repository->queryByGroupWithoutSet_Admin($gp_id);

        return $data;
    }
}
