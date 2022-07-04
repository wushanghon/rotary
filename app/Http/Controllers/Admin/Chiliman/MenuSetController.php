<?php

namespace App\Http\Controllers\Admin\Chiliman;

use App\Http\Controllers\Controller;
use App\Service\Admin\Chiliman\MenuSetService;
use App\Service\Admin\Chiliman\BackEndTreeViewService;
use Illuminate\Http\Request;
use Libraries\Chiliman\BackEndPermission;

class MenuSetController extends Controller
{
    protected $url;
    protected $viewPrefix;
    protected $pg_id;
    protected $MenuSetService;
    protected $BackEndTreeViewService;
    protected $BackEndPermission;

    public function __construct(
        MenuSetService $MenuSetService,
        BackEndTreeViewService $BackEndTreeViewService,
        BackEndPermission $BackEndPermission
    ) {
        $this->url = '/admin/menu_set';
        $this->viewPrefix = 'admin.menu_set';
        $this->pg_id = 'menu_set';

        $this->MenuSetService = $MenuSetService;
        $this->BackEndTreeViewService = $BackEndTreeViewService;
        $this->BackEndPermission = $BackEndPermission;
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\View\View
     */
    public function index(Request $request)
    {
        //檢查權限
        $isCanUsed = $this->BackEndPermission->checkUserPermission($this->pg_id);

        //非法操作，踢回上一頁
        if (!$isCanUsed) {
            return redirect()->back();
        }

        $input = $request->except(['_token', 'page']);

        //讀取資料
        $datalist = $this->MenuSetService->getAll($request, $input);

        $binding = [
            'datalist'  => $datalist,
        ];

        return view($this->viewPrefix . '.index', $binding);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector|\Illuminate\View\View
     */
    public function edit(Request $request)
    {
        $input = $request->all();
        $TreeViewJson = '{"data":{"SERIAL_UID":"0","LABEL":"' . $input['key'] . '","PARENT_UID":"-1","INDEX":"0","PG_ID":""},"type":"default"},';
        $TreeViewJson .= $this->BackEndTreeViewService->GetSubItem(0, true, $input['key'], '-1', 'JSON');
        $TreeViewJson = '[' . substr($TreeViewJson, 0, -1) . ']';

        if (!is_null($TreeViewJson)) {
            $binding = [
                'TreeViewJson'  => $TreeViewJson,
                'gp_id'         => $input['key'],
            ];
            return view($this->viewPrefix . '.edit', $binding);
        } else {
            return redirect();
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function update(Request $request)
    {
        $input = $request->all();
        $created_id = session()->get('user_id');

        $data = $this->MenuSetService->update($input, $created_id);

        return redirect($this->url);
    }

    /**
     * @param Request $request
     */
    public function addnewfolder(Request $request)
    {
        $input = $request->all();
        $created_id = session()->get('user_id');

        //新增資料夾
        $data = $this->MenuSetService->addNewFolder($input, $created_id);

        //取得資料夾序號
        $dataid = $this->MenuSetService->getid($input);

        echo '{"NEW_ID":"' . $dataid . '"}';
        exit();
    }
}
