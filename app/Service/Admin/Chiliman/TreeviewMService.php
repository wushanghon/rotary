<?php

namespace App\Service\Admin\Chiliman;

use App\Repository\Admin\Chiliman\TreeviewMRepository;

class TreeviewMService
{
    protected $treeviewMRepository;

    public function __construct()
    {
        $this->treeviewMRepository = new TreeviewMRepository();
    }

    /**
     * 刪除指定群組的程式權限時，需要移除相關目錄
     * @param String $gp_id
     * @param array $pg_ids
     * @return mixed
     */
    public function destroy($gp_id, $pg_ids)
    {
        $data = $this->treeviewMRepository->destroy($gp_id, $pg_ids);

        return $data;
    }

    public function store(array $input)
    {
        return $this->treeviewMRepository->store($input);
    }

    public function storeWith(String $pg_id, array $GP_ID_Array, String $created_id)
    {
        $menuSetService = new MenuSetService();

        foreach ($GP_ID_Array as $key) {
            $menuSet = ['gp_id' => $key];
            $tree_id = $menuSetService->getid($menuSet);

            $treeview_m = [
                'gp_id' => $key,
                'tree_id' => ++$tree_id,
                'tree_nm' => $pg_id, //資料夾名稱不需要填資料
                'tree_type' => 'P',
                'prev_tree_id' => 0,
                'pg_id' => $pg_id,
                'sort_no' => 999,
                'tree_icon' => '',
            ];

            $this->treeviewMRepository->store($treeview_m);
        }
    }

    /**
     * 將程式移出群組的時候要一併刪除目錄
     * @param String $PG_ID
     * @param array $GP_IDs
     * @return mixed
     */
    public function deleteByGroups(String $PG_ID, array $GP_IDs)
    {
        return $this->treeviewMRepository->deleteByGroups($PG_ID, $GP_IDs);
    }

    /**
     * 移除群組，新增群組
     * @param String $pg_id
     * @param String $pg_nm
     * @param array $gp_ids
     * @param String $created_id
     * @return bool
     */
    public function updateByGroups(String $pg_id, String $pg_nm, array $gp_ids, String $created_id)
    {
        $this->deleteByGroups($pg_id, $gp_ids); //刪除取消勾選的群組
        $this->storeNotIn($pg_id, $pg_nm,  $gp_ids,  $created_id); //寫入新勾選的群組

        return true;
    }

    /**
     * 寫入還不存在的群組資料到選單資料表中
     * @param String $pg_id
     * @param String $pg_nm
     * @param array $gp_ids
     * @param String $created_id
     */
    public function storeNotIn(String $pg_id, String $pg_nm,  array $gp_ids, String $created_id)
    {
        foreach ($gp_ids as $gp_id) { //逐筆比對
            $treeview_m = $this->getBy($pg_id, $gp_id); //讀出就資料

            if (!isset($treeview_m)) { //如果不存在就新增一筆
                $menuSetService = new MenuSetService();
                $menuSet = ['gp_id' => $gp_id];
                $tree_id = $menuSetService->getid($menuSet);

                $treeview_m = [
                    'gp_id' => $gp_id,
                    'tree_id' => ++$tree_id,
                    'tree_nm' => $pg_nm, //資料夾名稱不需要填資料
                    'tree_type' => 'P',
                    'prev_tree_id' => 0,
                    'pg_id' => $pg_id,
                    'sort_no' => 999,
                    'tree_icon' => '',
                ];

                $this->treeviewMRepository->store($treeview_m);
            }
        }
    }

    /**
     * 讀取資料
     * @param String $pg_id
     * @param String $gp_id
     * @return mixed
     */
    public function getBy(String $pg_id, String $gp_id)
    {
        return $this->treeviewMRepository->getBy($pg_id, $gp_id);
    }

    /**
     * 刪除程式時，需要把相關的目錄都移除
     * @param String $PG_ID
     * @return mixed
     */
    public function deleteByPG_ID(String $PG_ID)
    {
        return $this->treeviewMRepository->deleteByPG_ID($PG_ID);
    }
}
