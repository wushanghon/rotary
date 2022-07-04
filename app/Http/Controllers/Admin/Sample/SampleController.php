<?php

namespace App\Http\Controllers\Admin\Sample;

use App\Http\Requests\Sample\SampleRequest;
use App\Service\Admin\Chiliman\CodeCService;
use App\Service\Admin\Sample\SampleService;
use Libraries\Chiliman\BackendControllerAbstract;

class SampleController extends BackendControllerAbstract
{
    //自訂變數
    protected $service;
    protected $codeCService;

    public function __construct(SampleService $service, CodeCService $codeCService)
    {
        $url = '/admin/sample';                     //程式的 route
        $viewPrefix = 'admin.sample.sample';        // view 的前綴名稱
        $pg_id = 'sample';                          //程式ID，會用來判斷使用者是否有執行的權限

        $this->initial($url, $viewPrefix, $pg_id);  //初始化 BackendControllerAbstract
        $this->service = $service;
        $this->setService($this->service);          //設定 service 物件

        /**
         * 如果沒有設定view，則預設的view分別如下
         * 列表頁：index  新增頁：createAndEdit  修改頁：createAndEdit
         *
         * 如需自行指定，可以將下面的程式註解取消，自行指定view的檔案名稱 ex: edit.blade.php 則指定為edit
         */
        // $this->setIndexView('index');     //指定列表頁
        // $this->setEditView('edit');       //指定修改頁
        // $this->setCreateView('create');   //指定新增頁

        /**
         * 如需要使用到其他的Service請在此建立
         */
        $this->codeCService = $codeCService;
    }

    /**
     * 此處用來查詢view需要的所有變數
     * 此方法會在執行父物件（BackendControllerAbstract）的 magicIndex, create, edit三個方法的時候被叫用
     * 如需查看處理後的變數，請執行dd($this->binding);
     * 如果沒有查詢代碼的需求，也可以不用實作這個方法
     */
    public function queryCode()
    {
        $targetTypeList = $this->codeCService->queryByCodeType('targetType');

        $this->bindingWith('targetTypeList', $targetTypeList);
    }

    /**
     * 將輸入資料的驗證程式抽出，改由SampleRequest 來檢查
     * 如果不想驗證輸入資料，可以直接取消這個方法的實作，強烈建議您不要這麼做，這會造成程式的安全漏洞
     * @param SampleRequest $request
     * @return mixed
     */
    public function index(SampleRequest $request)
    {
        return parent::magicIndex($request);
    }

    /**
     * 如果有特殊需求，將以下方法的註解取消，實作create方法覆寫父元件的create即可
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    // public function create()
    // {
    //    return parent::create();
    // }

    /**
     * 將輸入資料的驗證程式抽出，改由SampleRequest 來檢查
     * 如果不想驗證輸入資料，可以直接取消這個方法的實作，強烈建議您不要這麼做，這會造成程式的安全漏洞
     * @param SampleRequest $request
     * @return mixed
     */
    public function store(SampleRequest $request)
    {
        return parent::magicStore($request);
    }

    /**
     * 示範需要帶入參數的資料查詢，例如：需要先查出縣市代碼，再透過縣市代碼，讀取區域代碼的資料查詢
     * 若無上述需求，可以直接調用  parent::edit($id);
     * 或者直接省略，不實作這個方法即可
     * @param $id
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function edit($id)
    {
        //呼叫父元件的權限與資料查詢處理
        parent::iniEdit($id);

        /**
         * 可在此處撰寫額外的資料查詢自訂的程序
         * 例如：
         * $targetTypeList = $this->codeCService->queryByCodeType('targetType');
         * $this->bindingWith('targetTypeList', $targetTypeList);
         */

        //呼叫父元件的回傳視圖
        return parent::retrunViewWithData('edit');
    }

    /**
     * 將輸入資料的驗證程式抽出，改由SampleRequest 來檢查
     * 如果不想驗證輸入資料，可以直接取消這個方法的實作，強烈建議您不要這麼做，這會造成程式的安全漏洞
     * @param SampleRequest $request
     * @param $id
     * @return mixed
     */
    public function update(SampleRequest $request, $id)
    {
        return parent::magicUpdate($request, $id);
    }

    /**
     * 如果有特殊需求，將以下方法的註解取消，實作destroy方法覆寫父元件的destroy即可
     * 刪除一筆資料
     * @param string $id
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    // public function destroy($id)
    // {
    //    return parent::destroy($id);
    // }
}
