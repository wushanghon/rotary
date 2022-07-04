<?php

/**
 * Created by PhpStorm.
 * User: user
 * Date: 2021/2/23
 * Time: 上午 01:21
 */

namespace Libraries\Chiliman;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Arr;

/**
 * Trait 使用特性說明
 * Trait 是為類似 PHP 的單繼承語言而準備的一種代碼復用機制。
 * Trait 為了減少單繼承語言的限制，使開發人員能夠自由地在不同層次結構內獨立的類中復用 method。
 * Trait 和 Class 組合的語義定義了一種減少複雜性的方式，避免傳統多繼承和 Mixin 類相關典型問題。
 * Trait 和 Class 相似，但僅僅旨在用細粒度和一致的方式來組合功能。
 * 無法通過 trait 自身來實例化。
 * 它為傳統繼承增加了水平特性的組合；也就是說，應用的幾個 Class 之間不需要繼承。
 * 可定義屬性
 * 可被子類複寫方法，而且參數可以不同
 * **/
const PERMISSION_UPDATE = 'update';
const PERMISSION_EDIT = 'edit';
const PERMISSION_STORE = 'store';
const PERMISSION_CREATE = 'create';
const PERMISSION_DESTROY = 'destroy';
const REFER_URL = 'refererUrl';
const BASE_URL = 'baseUrl';
const NO_INI_MESSAGE = 'BackendControllerTrait:請先執行initial';
const NO_PREMISSION_MESSAGE = '權限不足';
/**
 * Trait BackendControllerTrait
 * @package Libraries\Chiliman
 */
trait BackendControllerTrait
{
    protected $PERMISSION_UPDATE = PERMISSION_UPDATE;
    protected $PERMISSION_EDIT = PERMISSION_EDIT;
    protected $PERMISSION_STORE = PERMISSION_STORE;
    protected $PERMISSION_CREATE = PERMISSION_CREATE;
    protected $PERMISSION_DESTROY = PERMISSION_DESTROY;
    protected $BASE_URL = BASE_URL;
    protected $REFER_URL = REFER_URL;
    protected $url = '';
    protected $viewPrefix = '';
    protected $pg_id = '';
    protected $binding = [];
    protected $baseService;

    private $isInitialed = false;

    abstract  public function queryCode();

    /**
     * 初始化參數
     * @param string $url           :程式的URL
     * @param string $viewPrefix    :view的位置
     * @param string $pg_id         :程式ID
     */
    protected function initial(string $url, string $viewPrefix, string $pg_id)
    {
        $this->url = $url;
        $this->viewPrefix = $viewPrefix;
        $this->pg_id = $pg_id;
        $this->binding = Arr::add($this->binding, $this->BASE_URL, $this->url);
        $this->isInitialed = true;
    }

    protected function setService($baseService)
    {
        $this->baseService = $baseService;
    }

    protected function bindingWith(string $key, $mixValue)
    {
        $this->binding = Arr::add($this->binding, $key, $mixValue);
    }

    public function index(Request $request)
    {
        if (!$this->isInitialed) dd(NO_INI_MESSAGE);

        //檢查權限
        $this->checkPermission();
        $this->queryCode();

        //處理搜尋條件
        $this->disposeSearchConditions($request);

        //處理變數，session變數一律在controller取得，可增加service的再利用彈性
        $crmm_id = Session::get('crmm_id');

        //讀取資料
        $datalist = $this->baseService->query($request, true);
        $this->binding = Arr::add($this->binding, 'datalist', $datalist);

        //回傳view
        return view($this->viewPrefix . '.index', $this->binding);
    }

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function store(Request $request)
    {
        if (!$this->isInitialed) dd(NO_INI_MESSAGE);

        $this->checkPermissionBy($this->PERMISSION_STORE);

        $input = $request->all();

        $this->baseService->store($input, Session::get('user_id'));

        return redirect(Session::get($this->REFER_URL));
    }

    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function update(Request $request, $id)
    {
        if (!$this->isInitialed) dd(NO_INI_MESSAGE);

        $this->checkPermissionBy($this->PERMISSION_UPDATE);

        $input = $request->all();

        $this->baseService->update($id, $input, Session::get('user_id'));

        return redirect(Session::get($this->REFER_URL));
    }

    /**
     * Show the form for creating a new resource.
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function create()
    {
        if (!$this->isInitialed) dd(NO_INI_MESSAGE);

        $this->checkPermissionBy($this->PERMISSION_CREATE);

        $this->queryCode();

        //回傳view
        return view($this->viewPrefix . '.create', $this->binding);
    }

    /**
     * Show the form for editing the specified resource.
     * @param $id
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function edit($id)
    {
        if (!$this->isInitialed) dd(NO_INI_MESSAGE);

        $this->checkPermissionBy($this->PERMISSION_EDIT);
        $this->queryCode();

        //讀取頁面資料
        $data = $this->baseService->get($id);

        $this->binding = Arr::add($this->binding, 'data', $data);

        //回傳view
        return view($this->viewPrefix . '.edit', $this->binding);
    }

    /**
     * @param string $id
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function destroy($id)
    {
        if (!$this->isInitialed) dd(NO_INI_MESSAGE);

        $this->checkPermissionBy($this->PERMISSION_DESTROY);

        $this->baseService->destroy($id);

        return redirect(Session::get($this->REFER_URL));
    }

    /**
     * 檢查權限設定，並且把REFER_URL 存入session
     * @return \Illuminate\Http\RedirectResponse
     */
    private function checkPermission()
    {
        $isCanUsed = BackEndPermission::checkUserPermission($this->pg_id);
        if (!$isCanUsed) { //非法操作，踢回上一頁
            dd(NO_PREMISSION_MESSAGE);
        }

        //處理新增修改後，回到index頁面的page參數保留
        Session::put(REFER_URL, $_SERVER['REQUEST_URI']);
    }

    /**
     * 檢查是否有權限可以動作,防止有心人惡意做非法操作
     * @param string $_action
     * @return bool
     */
    private function checkPermissionBy(string $_action)
    {
        //加入返回的url以及page參數,減少view需要修改的細節
        $hasPermission = false;

        switch ($_action) {
            case $this->PERMISSION_CREATE:
                $this->bindingWith(REFER_URL, Session::get(REFER_URL));
                $hasPermission = (Session::get('g_add') == 'Y') ? true : false;
                break;
            case $this->PERMISSION_STORE:
                $hasPermission = (Session::get('g_add') == 'Y') ? true : false;
                break;
            case $this->PERMISSION_EDIT:
                //加入返回的url以及page參數,減少view需要修改的細節
                $this->bindingWith(REFER_URL, Session::get(REFER_URL));
                $hasPermission = true;
                break;
            case PERMISSION_UPDATE:
                $hasPermission =  (Session::get('g_mod') == 'Y') ? true : false;
                break;
            case PERMISSION_DESTROY:
                $hasPermission =  (Session::get('g_del') == 'Y') ? true : false;
                break;
            default:
                $hasPermission =  false;
                break;
        }

        if (!$hasPermission) {
            dd('權限不足');
            //redirect(Session::get($this->REFER_URL));
        }
    }

    /**處理index頁搜尋條件
     * @param $request
     */
    private function disposeSearchConditions($request)
    {
        $input = $request->except('_token', '_method', 'page', 'key');

        $_searchCondition = '';

        foreach ($input as $key => $val) {
            $this->binding = ($request->filled($key)) ? Arr::add($this->binding, $key, $val) : Arr::add($this->binding, $key, '');
            $_searchCondition .= '&' . $key . '=' . $val;
        }

        //給javascript 的 searchCondition
        $this->binding = (strlen($_searchCondition) > 0) ? Arr::add($this->binding, '_searchCondition', $_searchCondition)
            : Arr::add($this->binding, '_searchCondition', '');
    }
}
