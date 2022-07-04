<?php

namespace App\Http\Controllers\Admin\Chiliman;

use App\Http\Requests\Admin\Mum03Request;
use App\Service\Admin\Chiliman\CodeCService;
use App\Service\Admin\Chiliman\Mum02Service;
use App\Service\Admin\Chiliman\Mum03Service;
use App\Service\Admin\Chiliman\Mus02Service;
use App\Service\Admin\Chiliman\TreeviewMService;
use Illuminate\Http\Request;
use Libraries\Chiliman\BackendControllerAbstract;

class Mum03Controller extends BackendControllerAbstract
{
    //use BackendControllerTrait;//共用變數，共用method引用這個，減少controller重複撰寫的code
    //自訂變數
    protected $mum03Service;
    protected $codeCService;
    protected $mum02Service;
    protected $mus02Service;
    protected $targetTypeList;

    public function __construct(
        Mum03Service $mum03Service,
        CodeCService $codeCService,
        Mum02Service $mum02Service,
        Mus02Service $mus02Service
    ) {
        $url = '/admin/mum03';
        $viewPrefix = 'admin.mum03';
        $pg_id = 'mum03';

        $this->initial($url, $viewPrefix, $pg_id);
        $this->setService($mum03Service);
        $this->setIndexView('index');
        $this->setCreateView('create');
        $this->setEditView('edit');

        //service 在此定義
        $this->mum03Service = $mum03Service;
        $this->codeCService = $codeCService;
        $this->mum02Service = $mum02Service;
        $this->mus02Service = $mus02Service;
    }

    public function queryCode()
    {
        //如需讀取代碼統一在此處撰寫
        $targetTypeList = $this->codeCService->queryByCodeType('targetType');
        $mum02List = $this->mum02Service->query(new Request()); //讀取角色(群組)資料

        $this->bindingWith('mum02List', $mum02List);
        $this->bindingWith('targetTypeList', $targetTypeList);
    }

    public function index(Request $request)
    {
        return parent::index($request);
    }

    /**
     * 新增程式資料，同時更新指定群組的目錄選單
     * @param Mum03Request $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function store(Mum03Request $request)
    {
        //寫入程式指定群組的選單目錄資料
        $input = $request->all();
        $PG_ID = $input['pg_id'];
        $GP_ID_Array = isset($input['gp_id']) == true ? $input['gp_id'] : [];

        $treeViewService = new TreeviewMService();
        $treeViewService->storeWith($PG_ID, $GP_ID_Array, session()->get('user_id'));

        return parent::store($request);
    }

    /**
     * @param string $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function edit($id)
    {
        //呼叫父元件的權限與資料查詢處理
        parent::iniEdit($id);

        /**
         * 可在此處撰寫額外的資料查詢自訂的程序
         */
        $mus02Data = $this->mus02Service->queryBy($id);
        $this->bindingWith('mus02Data', $mus02Data);

        //呼叫父元件的回傳視圖
        return parent::retrunViewWithData('edit');
    }

    /**
     * 更新程式資料，同時更新指定群組的目錄選單
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function update(Request $request, $id)
    {
        $input = $request->all();

        //刪除沒有權限的群組選單資料 treeview_m
        $treeViewService = new TreeviewMService();

        $PG_ID = $input['pg_id'];
        $PG_NM = $input['pg_nm'];
        $GP_ID_Array = isset($input['gp_id']) == true ? $input['gp_id'] : [];

        $treeViewService->updateByGroups($PG_ID, $PG_NM, $GP_ID_Array, session()->get('user_id'));

        return parent::update($request, $id);
    }

    public function destroy($id)
    {
        //刪除該程式在目錄中的所有資料
        $treeViewService = new TreeviewMService();
        $treeViewService->deleteByPG_ID($id);

        return parent::destroy($id);
    }
}
