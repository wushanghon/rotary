<?php

namespace App\Http\Controllers\Admin\Chiliman;

use App\Http\Requests\Admin\Mum02Request;
use App\Service\Admin\Chiliman\Mum02Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Libraries\Chiliman\BackendControllerAbstract;

class Mum02Controller extends BackendControllerAbstract
{
    protected $service;

    public function __construct(Mum02Service $service)
    {
        $url = '/admin/mum02';
        $viewPrefix = 'admin.mum02';
        $pg_id = 'mum02';

        $this->initial($url, $viewPrefix, $pg_id);
        $this->setService($service);
        $this->setIndexView('index');
        $this->setEditView('edit');
        $this->setCreateView('create');

        //service 在此定義
        $this->service = $service;
    }

    public function queryCode()
    {
        // TODO: Implement queryCode() method.
    }

    public function index(Request $request)
    {
        return parent::index($request);
    }

    public function store(Mum02Request $request)
    {
        $this->checkPermissionBy(parent::PERMISSION_STORE);

        $input = $request->all();

        $this->service->store($input, Session::get('user_id'));

        return redirect(Session::get(parent::REFER_URL));
    }

    public function update(Mum02Request $request, string $id)
    {
        $this->checkPermissionBy(parent::PERMISSION_UPDATE);

        $input = $request->except(['user_pass']);

        //寫入資料
        $this->service->update($id, $input, Session::get('user_id'));

        return redirect(Session::get(parent::REFER_URL));
    }

    /**
     * 顯示複製角色權限畫面
     * @param $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector|\Illuminate\View\View
     */
    public function copygroup($id)
    {
        $this->checkPermissionBy(parent::PERMISSION_EDIT);

        $gp_id = $id;
        $data = $this->service->getForCopyGroup($gp_id);

        if (!is_null($data)) {
            $this->bindingWith('data', $data);
            $this->bindingWith('origp_id', $gp_id);
            $this->bindingWith('current_url', $_SERVER['REQUEST_URI']);

            return view($this->viewPrefix . '.copygroup', $this->binding);
        } else {
            return redirect(); //參數錯誤或資料不存在
        }
    }

    /**
     * 複製角色權限
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function duplicate(Request $request)
    {
        $input = $request->all();

        $updated_id = session()->get('user_id');

        $this->service->duplicate($input, $updated_id);

        return redirect($this->url);
    }
}
