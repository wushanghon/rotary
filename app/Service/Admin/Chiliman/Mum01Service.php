<?php

namespace App\Service\Admin\Chiliman;

use App\Repository\Admin\Chiliman\Mum01Repository;
use App\Service\Admin\Chiliman\Mus01Service;
use Illuminate\Support\Facades\Hash;
use Libraries\Chiliman\BackendServiceAbstract;

class Mum01Service extends BackendServiceAbstract
{
    protected $repository;
    protected $Mus01Service;

    public function __construct() {
        $this->repository = new Mum01Repository();
        $this->setRepository($this->repository);

        //定義service
        $this->Mus01Service = new Mus01Service();
    }

    //新增資料
    public function store(array $input, string $updated_id)
    {
        //處理密碼欄位加密後寫入
        $input['user_pass'] = Hash::make($input['user_pass']);

        $data = parent::store($input, $updated_id);

        //寫入帳號群組設定
        $mus01 = [
            'user_id'               => $data->user_id,
            'gp_id'                 => $input['GROUP'],
            'user_no'               => $data->user_no,
            'updated_id'            => $updated_id,
            'created_id'            => $updated_id,
        ];

        $this->Mus01Service->store($mus01, $updated_id);

        return $data;
    }

    //更新資料
    public function update($id, array $input, string $updated_id)
    {
        $data = parent::update($id, $input, $updated_id);

        //寫入帳號群組設定
        if (isset($input['GROUP'])) {
            $mus01 = [
                'user_id'           => $data->user_id,
                'gp_id'             => $input['GROUP'],
                'user_no'           => $data->user_no,
            ];

            $this->Mus01Service->update($mus01, $updated_id);
        }

        return $data;
    }

    //用 user_id 取出
    public function getByCrmmUser($user_id)
    {
        $data = $this->repository->getByCrmmUser($user_id);

        return $data;
    }
}
