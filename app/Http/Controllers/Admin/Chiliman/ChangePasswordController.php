<?php

namespace App\Http\Controllers\Admin\Chiliman;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ChangePasswordRequest;
use App\Service\Admin\Chiliman\Mum01Service;
use App\Service\Admin\Chiliman\LogService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Libraries\Chiliman\BackEndPermission;

class ChangePasswordController extends Controller
{
    protected $url;
    protected $viewPrefix;
    protected $pg_id;
    protected $rules;
    protected $MUM01Service;
    protected $BackEndPermission;
    protected $LogService;

    public function __construct(
        Mum01Service $MUM01Service,
        BackEndPermission $BackEndPermission,
        LogService $LogService
    ) {
        $this->url = '/admin/changepassword';
        $this->viewPrefix = 'admin.changepassword';
        $this->pg_id = 'change_password';

        $this->rules = [
            'user_pass_ori'                 => ['required', 'min:6', 'max:20'],
            'user_pass_modify'              => ['required', 'same:user_pass_modify_confirmation', 'min:6', 'max:20', 'regex:/^.*(?=.*[a-zA-Z])(?=.*[0-9]).*$/'],
            'user_pass_modify_confirmation' => ['required', 'min:6', 'max:20'],
        ];

        $this->MUM01Service = $MUM01Service;
        $this->BackEndPermission = $BackEndPermission;
        $this->LogService = $LogService;
    }

    /**
     * Display a listing of the resource.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function changepassword(Request $request)
    {
        //檢查權限
        $isCanUsed = $this->BackEndPermission->checkUserPermission($this->pg_id);
        if (!$isCanUsed) { //非法操作，踢回上一頁
            return redirect()->back();
        }

        $binding = [
            'url'           => $this->url,
            'changeStatus'  => 'change',
        ];

        return view($this->viewPrefix . '.changepassword', $binding);
    }

    /**
     * Store a newly created resource in storage.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ChangePasswordRequest $request)
    {
        $input = $request->all();

        $created_id = session()->get('user_id');

        //取得登入資訊
        $user_id = session()->get('user_id');
        $crmm_id = session()->get('crmm_id');

        //取得登入
        $user = $this->MUM01Service->getByCrmmUser($user_id);

        if (count($user) == 1) {
            //轉成array
            $user_array = json_decode(json_encode($user[0], true), true);
            if ($user_array && Hash::check($input['user_pass_ori'], $user_array['user_pass'])) {
                //新密碼
                $input['user_pass_modify'] = Hash::make($input['user_pass_modify']);
                $user_array['user_pass'] = $input['user_pass_modify'];
                $user_array['key'] = $user_array['user_no'];
                $user = $this->MUM01Service->update($user_array['key'], $user_array, $created_id);

                //寫入其他記錄
                $this->LogService->storeOtherLog('changepassword', 'changepassword', 'mum01');
            }
        }

        $binding = [
            'url'           => $this->url,
            'changeStatus'  => 'success',
        ];

        return view($this->viewPrefix . '.changepassword', $binding);
    }
}
