<?php

namespace Libraries\Chiliman;

use App\Service\Admin\Chiliman\BackEndPermissionService;
use Illuminate\Support\Facades\Session;

class BackEndPermission
{
    public function __construct()
    {
    }

    public static function checkUserPermission($pg_name)
    {
        //參數
        $account = session()->get('user_id');
        $crmm_id = session()->get('crmm_id');

        //檢查權限
        $PermissionService = new BackEndPermissionService();
        $data = $PermissionService->checkUserPermission($pg_name, $account, $crmm_id);

        Session::put('g_query', $data->g_query);
        Session::put('g_add', $data->g_add);
        Session::put('g_mod', $data->g_mod);
        Session::put('g_del', $data->g_del);

        //是否有權限可以使用程式
        if ($data->g_query == '' && $data->g_add == '' && $data->g_mod == '' && $data->g_del == '') {
            return false;
        } else {
            return true;
        }
    }
}
