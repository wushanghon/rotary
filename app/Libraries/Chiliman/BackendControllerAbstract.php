<?php

/**
 * Created by PhpStorm.
 * User: user
 * Date: 2021/2/23
 * Time: 上午 01:21
 */

namespace Libraries\Chiliman;

use App\Models\Chiliman\blank;
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
const NO_INI_MESSAGE = 'BackendControllerAbstract:請先執行initial';
const NO_PERMISSION_MESSAGE = '權限不足';
/**
 * abstract BackendControllerAbstract
 * @package Libraries\Chiliman
 */
abstract class BackendControllerAbstract
{
    const PERMISSION_UPDATE = PERMISSION_UPDATE;
    const PERMISSION_EDIT = PERMISSION_EDIT;
    const PERMISSION_STORE = PERMISSION_STORE;
    const PERMISSION_CREATE = PERMISSION_CREATE;
    const PERMISSION_DESTROY = PERMISSION_DESTROY;
    const REFER_URL = REFER_URL;
    const BASE_URL = BASE_URL;
    const NO_INI_MESSAGE = NO_INI_MESSAGE;
    const NO_PERMISSION_MESSAGE = NO_PERMISSION_MESSAGE;

    protected $url = '';
    protected $viewPrefix = '';
    protected $pg_id = '';
    protected $binding = [];
    protected $baseService;
    protected $indexView = 'index';
    protected $createView = 'createAndEdit';
    protected $editView = 'createAndEdit';

    private $isInitialed = false;

    abstract public function queryCode();

    /**
     * 初始化參數
     * @param string $url :程式的URL
     * @param string $viewPrefix :view的位置
     * @param string $pg_id :程式ID
     */
    protected function initial(string $url, string $viewPrefix, string $pg_id)
    {
        $this->url = $url;
        $this->viewPrefix = $viewPrefix;
        $this->pg_id = $pg_id;
        $this->binding = Arr::add($this->binding, BASE_URL, $this->url);
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

    protected function setIndexView($viewName)
    {
        $this->indexView = $viewName;
    }

    protected function setCreateView($viewName)
    {
        $this->createView = $viewName;
    }

    protected function setEditView($viewName)
    {
        $this->editView = $viewName;
    }

    public function __call($name, $arguments)
    {
        /*
         * 因為 index, srote, update 三個method會帶入不同型態（Request, 以及繼承FormRequest的自定義物件）的參數導致的錯誤
         * 透過＿＿call來帶入參數，就可以解決
         */
        switch ($name) {
            case 'index':
                return $this->magicIndex($arguments[0]);
            case 'store':
                return $this->magicStore($arguments[0]);
            case 'update':
                return $this->magicUpdate($arguments[0], $arguments[1]);
            case 'default':
                dd('__call default');
                break;
        }
    }

    protected function magicIndex(Request $request)
    {
        if (!$this->isInitialed) dd(NO_INI_MESSAGE);

        //檢查權限
        $this->checkPermission();
        $this->queryCode();

        //處理搜尋條件
        $this->disposeSearchConditions($request);

        //處理變數，session變數一律在controller取得，可增加service的再利用彈性

        //讀取資料
        $datalist = $this->baseService->query($request, true);

        $this->binding = Arr::add($this->binding, 'datalist', $datalist);

        //回傳view
        return $this->retrunViewWithData($this->indexView);
    }

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    protected function magicStore(Request $request)
    {
        if (!$this->isInitialed) dd(NO_INI_MESSAGE);

        $this->checkPermissionBy(PERMISSION_STORE);

        $input = $request->all();

        $this->baseService->store($input, Session::get('user_id'));

        return redirect(Session::get(REFER_URL));
    }

    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    protected function magicUpdate(Request $request, $id)
    {
        if (!$this->isInitialed) dd(NO_INI_MESSAGE);

        $this->checkPermissionBy(PERMISSION_UPDATE);

        $input = $request->all();

        $this->baseService->update($id, $input, Session::get('user_id'));

        return redirect(Session::get(REFER_URL));
    }

    /**
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function create()
    {
        if (!$this->isInitialed) dd(NO_INI_MESSAGE);

        $this->iniCreate();

        //回傳view
        return $this->retrunViewWithData($this->createView);
    }

    public function iniCreate()
    {
        $this->checkPermissionBy(PERMISSION_CREATE);
        $this->queryCode();

        $data = new blank();

        $this->bindingWith('data', $data);
        $this->bindingWith('method', 'post');
    }

    /**
     * @param $id
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function edit($id)
    {
        if (!$this->isInitialed) dd(NO_INI_MESSAGE);

        $this->iniEdit($id);

        //回傳view
        return $this->retrunViewWithData($this->editView);
    }

    public function iniEdit($id)
    {
        $this->checkPermissionBy(PERMISSION_EDIT);
        $this->queryCode();
        $this->bindingWith('method', 'put');

        //讀取頁面資料
        $data = $this->baseService->get($id);

        $this->binding = Arr::add($this->binding, 'data', $data);
    }

    /**
     * @param string $id
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function destroy($id)
    {
        if (!$this->isInitialed) dd(NO_INI_MESSAGE);

        $this->checkPermissionBy(PERMISSION_DESTROY);
        $this->baseService->destroy($id);

        return redirect(Session::get(REFER_URL));
    }


    /**
     * 檢查權限設定，並且把REFER_URL 存入session
     * @return \Illuminate\Http\RedirectResponse
     */
    protected function checkPermission()
    {
        $isCanUsed = BackEndPermission::checkUserPermission($this->pg_id);
        if (!$isCanUsed) { //非法操作，踢回上一頁
            dd(NO_PERMISSION_MESSAGE . ' @checkPermission');
        }

        //處理新增修改後，回到index頁面的page參數保留
        Session::put(REFER_URL, $_SERVER['REQUEST_URI']);
    }

    /**
     * 檢查是否有權限可以動作,防止有心人惡意做非法操作
     * @param string $action
     */
    protected function checkPermissionBy(string $action)
    {
        //加入返回的url以及page參數,減少view需要修改的細節
        switch ($action) {
            case PERMISSION_CREATE:
                $this->bindingWith(REFER_URL, Session::get(REFER_URL));
                $hasPermission = (Session::get('g_add') == 'Y') ? true : false;
                break;
            case PERMISSION_STORE:
                $hasPermission = (Session::get('g_add') == 'Y') ? true : false;
                break;
            case PERMISSION_EDIT:
                //加入返回的url以及page參數,減少view需要修改的細節
                $this->bindingWith(REFER_URL, Session::get(REFER_URL));
                $hasPermission = true;
                break;
            case PERMISSION_UPDATE:
                $hasPermission = (Session::get('g_mod') == 'Y') ? true : false;
                break;
            case PERMISSION_DESTROY:
                $hasPermission = (Session::get('g_del') == 'Y') ? true : false;
                break;
            default:
                $hasPermission = false;
                break;
        }

        if (!$hasPermission) {
            dd(NO_PERMISSION_MESSAGE . ' @' . $action);
        }
    }

    /**處理index頁搜尋條件
     * @param $request
     */
    protected function disposeSearchConditions($request)
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

    /**
     * @param String $viewName
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    protected function retrunViewWithData(String $viewName)
    {
        return view($this->viewPrefix . '.' . $viewName, $this->binding);
    }
}
