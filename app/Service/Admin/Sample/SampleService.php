<?php

namespace App\Service\Admin\Sample;

use App\Repository\Admin\Sample\SampleRepository;
use Illuminate\Http\Request;
use Libraries\Chiliman\BackendServiceAbstract;

class SampleService extends BackendServiceAbstract
{
    private $repository;
    /**
     * SampleService constructor.
     */
    public function __construct()
    {
        $this->repository = new SampleRepository();
        $this->setRepository($this->repository);
    }

    /**
     * 查詢資料
     * 如果沒有特殊的查詢條件，可以將此方法註解掉或刪除
     * @param Request $request
     * @param bool $paginate
     * @return mixed
     */
    public function query(Request $request, bool $paginate = false)
    {
        // 如果需要指定排序欄位與方式，可以複寫 query方法
        // 並且透過調用 $this->repository->orderBy('欄位名稱','排序方式' ) 來依序增加排序條件
        // 之後再調用 父元件的 query 方法即可
        // $this->repository->orderBy('created_at','asc');
        // $this->repository->orderBy('brandName','asc');

        //如有不存在view的指定查詢欄位，請取消下面一行的註解，並修改成指定的欄位名稱與參數即可
        //$request->merge(['yourFieldName' => 'value']);
        return parent::query($request, $paginate);
    }

    /**
     * 寫入資料
     * 此處可以複寫父元件的store方法，如果沒有特殊邏輯，可以不實作此方法
     * @param array $input
     * @param string $updated_id
     * @return mixed
     */
    public function store(array $input, string $updated_id)
    {
        //如果需要寫入的欄位資料，不存在view的輸入欄位，或有特殊邏輯，請在此處撰寫
        //例如，判斷某個欄位如果是空值，就寫入預設的數值，如下程式碼所示
        $input['brandFile'] = (isset($input['i-want-this-file'])) ? $input['i-want-this-file'] : '';

        return parent::store($input, $updated_id);
    }

    /**
     * 更新資料
     * 此處可以複寫父元件的update方法，如果沒有特殊邏輯，可以不實作此方法
     * @param $id
     * @param array $input
     * @param string $updated_id
     * @return mixed
     */
    public function update($id, array $input, string $updated_id)
    {
        //如果需要更新的欄位資料，不存在view的輸入欄位，或有特殊邏輯，請在此處撰寫
        //例如要指定某個欄位寫入隨機數值
        //$input['brandFile']=rand(0,100);
        return parent::update($id, $input, $updated_id);
    }

    /**
     * 刪除資料
     * 此處可以複寫父元件的destroy方法，如果沒有特殊邏輯，可以不實作此方法
     * @param int $id
     * @return mixed
     */
    public function destroy($id)
    {
        //如需在刪除資料前先刪除檔案，或其他商業邏輯處理，可以在此處撰寫
        //例如刪除檔案，與檔案紀錄
        $data = $this->get($id);

        //刪除資料
        return parent::destroy($id);
    }

    //不在BackendServiceAbstract的其他方法，可自行任意增加需要的方法
    /**
     * 使用crmm_id查詢多筆資料
     * @param string $crmm_id
     * @return mixed
     */
    public function queryByCrmmId(string $crmm_id)
    {
        $data = $this->repository->queryByCrmmId($crmm_id);

        return $data;
    }
}
