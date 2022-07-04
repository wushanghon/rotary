<?php

namespace App\Http\Controllers\Admin\Chiliman;

use App\Http\Controllers\Controller;
use App\Service\Admin\Chiliman\CodeCService;
use App\Service\Admin\Chiliman\LogService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Libraries\Chiliman\BackEndPermission;

class LogController extends Controller
{
    protected $url;
    protected $viewPrefix;
    protected $pg_id;
    protected $rules;
    protected $LogService;
    protected $CodeCService;
    protected $logTypeList;

    public function __construct(
        LogService $LogService,
        CodeCService $CodeCService
    ) {
        $this->url = '/admin/log_m';
        $this->viewPrefix = 'admin.log_m';
        $this->pg_id = 'log_m';

        $this->rules = [
            'crmm_id' => ['required', 'max:10'],
            'user_id' => ['required', 'max:100'],
        ];

        $this->LogService = $LogService;
        $this->CodeCService = $CodeCService;

        //取得代碼檔
        $this->logTypeList = $this->CodeCService->queryByCodeType('logType');
    }

    /**
     * Display a listing of the resource.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //檢查權限
        $isCanUsed = BackEndPermission::checkUserPermission($this->pg_id);

        //非法操作，踢回上一頁
        if (!$isCanUsed) {
            return redirect()->back();
        }

        $input = $request->except(['_token', 'page']);

        $logType = '';
        if ($request->filled('logType')) {
            $logType = $input['logType'];
        }

        $crmm_id = '';
        if ($request->filled('crmm_id')) {
            $crmm_id = $input['crmm_id'];
        }

        $user_id = '';
        if ($request->filled('user_id')) {
            $user_id = $input['user_id'];
        }

        $datalist = $this->LogService->getAll($request, $input);

        $binding = [
            'datalist' => $datalist,
            'logTypeList' => $this->logTypeList,
            'logType' => $logType,
            'crmm_id' => $crmm_id,
            'user_id' => $user_id,
        ];

        return view($this->viewPrefix . '.index', $binding);
    }

    /**
     * Show the form for creating a new resource.
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $binding = [
            'logTypeList' => $this->logTypeList,
        ];

        return view($this->viewPrefix . '.create', $binding);
    }

    /**
     * Store a newly created resource in storage.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $request->all();
        $created_id = session()->get('user_id');

        $validator = Validator::make($input, $this->rules);
        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        } else {
            $this->LogService->store($input, $created_id);

            return redirect($this->url);
        }
    }

    /**
     * Show the form for editing the specified resource.
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request)
    {
        $input = $request->all();
        $data = $this->LogService->get($input['key']);

        if (!is_null($data)) {
            $binding = [
                'data' => $data,
                'logTypeList' => $this->logTypeList,
            ];

            return view($this->viewPrefix . '.edit', $binding);
        } else {
            return redirect();
        }
    }

    /**
     * Update the specified resource in storage.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $input = $request->all();
        $created_id = session()->get('user_id');

        $validator = Validator::make($input, $this->rules);
        if ($validator->fails()) {
            return redirect($this->url)->withErrors($validator);
        } else {
            $this->LogService->update($input, $created_id);

            return redirect($this->url);
        }
    }

    /**
     * Remove the specified resource from storage.
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $input = $request->all();

        $this->LogService->destroy($input['key']);

        return redirect($this->url)->withInput();
    }
}
