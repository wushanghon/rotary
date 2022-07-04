<?php

namespace App\Http\Controllers\Admin\Chiliman;

use App\Http\Controllers\Controller;
use App\Service\Admin\Chiliman\MenuSetService;
use App\Service\Admin\Chiliman\Mus02Service;
use App\Service\Admin\Chiliman\TreeviewMService;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Session;
use Libraries\Chiliman\BackendControllerTrait;
use Libraries\Chiliman\BackEndPermission;

class Mus02Controller extends Controller
{
    use BackendControllerTrait;

    protected $service;
    protected $treeviewMService;
    protected $backEndPermission;
    protected $menuSetService;

    public function __construct(
        Mus02Service $service,
        TreeviewMService $treeviewMService,
        MenuSetService $menuSetService,
        BackEndPermission $backEndPermission
    ) {
        $url = $_SERVER['REQUEST_URI'];
        $viewPrefix = 'admin.mum02';
        $pg_id = 'mum02';

        $this->initial($url, $viewPrefix, $pg_id);
        $this->setService($service);

        $this->service = $service;
        $this->treeviewMService = $treeviewMService;
        $this->backEndPermission = $backEndPermission;
        $this->menuSetService = $menuSetService;
    }

    public function queryCode()
    {
        // TODO: Implement queryCode() method.
    }

    public function index($gp_id, Request $request)
    {
        //檢查權限
        $this->checkPermission();
        $this->queryCode();

        //處理搜尋條件
        $this->disposeSearchConditions($request);

        //處理變數，session變數一律在controller取得，可增加service的再利用彈性
        $crmm_id = Session::get('crmm_id');

        //讀取資料
        $datalist = $this->service->queryByGroupWithSet($gp_id);
        $this->binding = Arr::add($this->binding, 'datalist', $datalist);
        $this->bindingWith('datalist', $datalist);
        $this->bindingWith('key', $gp_id);
        $this->bindingWith('dataCount', count($datalist));
        $this->bindingWith('refererUrl', '/admin/mum02');

        return view($this->viewPrefix . '.permission_index', $this->binding);
    }

    /**
     * @param $gp_id
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function create($gp_id)
    {
        $this->checkPermissionBy($this->PERMISSION_CREATE);
        $this->queryCode();

        $datalist = $this->service->queryByGroupWithoutSet($gp_id);
        $this->bindingWith('datalist', $datalist);
        $this->bindingWith('key', $gp_id);
        $this->bindingWith('dataCount', count($datalist));

        return view($this->viewPrefix . '.permission_create', $this->binding);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function store(Request $request)
    {
        $input = request()->all();
        $created_id = session()->get('user_id');
        $key = $input['key'];
        $dataCount = $input['dataCount']; //資料筆數
        $menuSet = ['gp_id' => $key];
        $tree_id = $this->menuSetService->getid($menuSet);

        for ($i = 0; $i < $dataCount; $i++) {
            if (isset($input['rowNum' . $i])) {
                $pg_id = $input['pg_id' . $i];
                $pg_nm = $input['pg_nm' . $i];
                $g_query = isset($input['g_query' . $i]) ? 'Y' : 'N';
                $g_add = isset($input['g_add' . $i]) ? 'Y' : 'N';
                $g_mod = isset($input['g_mod' . $i]) ? 'Y' : 'N';
                $g_del = isset($input['g_del' . $i]) ? 'Y' : 'N';

                $mus02 = [
                    'gp_id' => $key,
                    'pg_id' => $pg_id,
                    'g_query' => $g_query,
                    'g_add' => $g_add,
                    'g_mod' => $g_mod,
                    'g_del' => $g_del,
                ];

                $this->service->store($mus02, $created_id);

                $treeview_m = [
                    'gp_id' => $key,
                    'tree_id' => ++$tree_id,
                    'tree_nm' => $pg_nm,
                    'tree_type' => 'P',
                    'prev_tree_id' => 0,
                    'pg_id' => $pg_id,
                    'sort_no' => 999,
                    'tree_icon' => '',
                ];

                $this->treeviewMService->store($treeview_m);
            }
        }

        return redirect($this->url)->with('key', $input['key']);
    }

    public function update(Request $request, $pg_id)
    {
        $input = $request->all();
        $created_id = session()->get('user_id');
        $key = $input['key'];
        $dataCount = $input['dataCount']; //資料筆數

        for ($i = 0; $i < $dataCount; $i++) {
            if (isset($input['rowNum' . $i])) {
                $pg_id = $input['pg_id' . $i];
                $g_query = isset($input['g_query' . $i]) ? 'Y' : 'N';
                $g_add = isset($input['g_add' . $i]) ? 'Y' : 'N';
                $g_mod = isset($input['g_mod' . $i]) ? 'Y' : 'N';
                $g_del = isset($input['g_del' . $i]) ? 'Y' : 'N';

                $mus02 = [
                    'gp_id' => $key,
                    'pg_id' => $pg_id,
                    'g_query' => $g_query,
                    'g_add' => $g_add,
                    'g_mod' => $g_mod,
                    'g_del' => $g_del,
                ];

                $this->service->update($mus02, $created_id);
            }
        }

        $url = $this->disposeUrl(3);

        return redirect($url)->with('key', $input['key']);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request)
    {
        $input = request()->all();
        $gpid = $input['key'];
        $dataCount = $input['dataCount'];
        $DelValue = [];

        for ($i = 0; $i < $dataCount; $i++) {
            if (isset($input['rowNum' . $i])) {
                $DelValue['pgid'][$i] = trim($input['pg_id' . $i]);
            }
        }

        //刪除權限操作明細檔
        $this->service->destroy($gpid, $DelValue['pgid']);

        //刪除treeview
        $this->treeviewMService->destroy($gpid, $DelValue['pgid']);

        //回執
        $url = $this->disposeUrl(1);

        return redirect($url)->with('key', $input['key']);
    }

    /**
     * 因為在建構子 取$url = $_SERVER['REQUEST_URI'];
     * 所以，刪除,或存檔的時候會多出最後面的 id
     * @param $num 指定 array_pop 次數
     * @return string
     */
    public function disposeUrl($num)
    {
        $tmp = explode("/", $this->url);

        for ($i = 1; $i <= $num; $i++) {
            array_pop($tmp);
        }

        $url = implode("/", $tmp);

        return $url;
    }
}
