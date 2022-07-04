<?php

namespace App\Service\Admin\Chiliman;

use App\Repository\Admin\Chiliman\LogRepository;

class LogService
{
    protected $LogRepository;

    public function __construct(LogRepository $LogRepository)
    {
        $this->LogRepository = $LogRepository;
    }

    //取得搜尋資料
    public function getAll($request, $input)
    {
        $data = $this->LogRepository->getAll($request, $input);

        return $data;
    }

    //取得單筆資料
    public function get($no)
    {
        $data = $this->LogRepository->get($no);

        return $data;
    }

    //新增資料
    public function store($input, $updated_id)
    {
        $data = $this->LogRepository->store($input, $updated_id);

        return $data;
    }

    //更新資料
    public function update($input, $updated_id)
    {
        $data = $this->LogRepository->update($input, $updated_id);

        return $data;
    }

    //刪除資料
    public function destroy($no)
    {
        $data = $this->LogRepository->destroy($no);

        return $data;
    }

    //新增資料
    public function storeAutoLog($input, $oriDataArray, $log_type)
    {
        $data = $this->LogRepository->storeAutoLog($input, $oriDataArray, $log_type);

        return $data;
    }

    //寫入其他記錄
    public function storeOtherLog($log_type, $pg_id, $table_nm)
    {
        $data = $this->LogRepository->storeOtherLog($log_type, $pg_id, $table_nm);

        return $data;
    }

    //取得上次登入時間-給登入首頁用
    public function getLastLogin($user_id)
    {
        $data = $this->LogRepository->getLastLogin($user_id);

        return $data;
    }

    //取得操作記錄-給登入首頁用
    public function getUserLog($user_id)
    {
        $data = $this->LogRepository->getUserLog($user_id);

        return $data;
    }
}
