<?php

namespace App\Http\Controllers\Admin\Chiliman;

use App\Http\Requests\Admin\Mum01Request;
use App\Service\Admin\Chiliman\CodeCService;
use App\Service\Admin\Chiliman\Mum01Service;
use App\Service\Admin\Chiliman\Mum02Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Libraries\Chiliman\BackendControllerAbstract;

class Mum01Controller extends BackendControllerAbstract
{
    //use BackendControllerTrait;
    //自訂變數
    protected $mum01Service;
    protected $mum02Service;
    protected $CodeCService;

    /**
     * Mum01Controller constructor.
     * @param Mum01Service $service
     * @param Mum02Service $mum02Service
     * @param CodeCService $CodeCService
     */
    public function __construct(
        Mum01Service $service,
        Mum02Service $mum02Service,
        CodeCService $CodeCService
    ) {
        $url = '/admin/mum01';
        $viewPrefix = 'admin.mum01';
        $pg_id = 'mum01';

        $this->initial($url, $viewPrefix, $pg_id);
        $this->setService($service);
        $this->setIndexView('index');
        $this->setEditView('edit');
        $this->setCreateView('create');

        //service 在此定義
        $this->mum01Service = $service;
        $this->mum02Service = $mum02Service;
        $this->CodeCService = $CodeCService;
    }

    public function queryCode()
    {
        //如需讀取代碼統一在此處撰寫
        $validList = $this->CodeCService->queryByCodeType('10');
        $groupList = $this->mum02Service->queryGroup();

        $this->bindingWith('VALID_Ary', $validList);
        $this->bindingWith('GROUP_Ary', $groupList);
    }

    public function index(Request $request)
    {
        return parent::index($request);
    }

    public function store(Mum01Request $request)
    {
        $this->checkPermissionBy(parent::PERMISSION_STORE);

        $input = $request->all();
        $input['crmm_id'] = Session::get('crmm_id');

        //寫入資料
        $this->mum01Service->store($input, Session::get('user_id'));

        return redirect(Session::get(parent::REFER_URL));
    }

    /**
     * @param Mum01Request $request
     * @param $id
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function update(Mum01Request $request, string $id)
    {
        $this->checkPermissionBy(parent::PERMISSION_UPDATE);

        //處理特殊輸入值的處理邏輯，建議改寫到Service
        $input = $request->except(['user_pass']);

        //密碼欄位
        if (!is_null($request->input('user_pass_confirmation'))) {
            $input['user_pass'] = Hash::make($input['user_pass_confirmation']);
        }

        //寫入資料
        $this->mum01Service->update($id, $input, Session::get('user_id'));

        return redirect(Session::get(parent::REFER_URL));
    }
}
