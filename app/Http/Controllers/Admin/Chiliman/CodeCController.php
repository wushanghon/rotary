<?php

namespace App\Http\Controllers\Admin\Chiliman;

use App\Http\Requests\Admin\CodeCRequest;
use App\Service\Admin\Chiliman\CodeCService;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Session;
use Libraries\Chiliman\BackendControllerAbstract;

class CodeCController extends BackendControllerAbstract
{
    //use BackendControllerTrait;//共用變數，共用method引用這個，減少controller重複撰寫的code
    //自訂變數
    protected $service;

    public function __construct(CodeCService $service)
    {
        $url = '/admin/code_c';
        $viewPrefix = 'admin.code_c';
        $pg_id = 'code_c';

        $this->initial($url, $viewPrefix, $pg_id);
        $this->setService($service);
        $this->setIndexView('index');
        $this->setCreateView('create');
        $this->setEditView('edit');

        //定義其他service
        $this->service = $service;
    }

    public function queryCode()
    {
        $code_typeList = $this->service->queryCodeType();

        $this->binding = Arr::add($this->binding, 'code_typeList', $code_typeList);
    }

    public function index(Request $request)
    {
        return parent::index($request);
    }

    public function create()
    {
        return parent::create();
    }

    public function store(CodeCRequest $request)
    {
        $this->checkPermissionBy(parent::PERMISSION_STORE);

        $input = $request->all();

        $this->service->store($input, Session::get('user_id'));

        return redirect(Session::get(parent::REFER_URL));
    }

    public function update(CodeCRequest $request, $id)
    {
        $this->checkPermissionBy(parent::PERMISSION_UPDATE);

        $input = $request->all();

        $this->service->update($id, $input, Session::get('user_id'));

        return redirect(Session::get(parent::REFER_URL));
    }
}
