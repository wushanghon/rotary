<?php

/**
 * Created by PhpStorm.
 * User: user
 * Date: 2021/2/27
 * Time: 下午 10:35
 */

namespace Libraries\Chiliman;

use Illuminate\Http\Request;

const NOT_SET_ENTITY = 'BackendRepositoryAbstract:請先執行setEntity';
/**
 * 後台程式共用的Repository抽象物件(單key)
 * Class BackendRepositoryAbstract
 * @package Libraries\Chiliman
 */
abstract class BackendRepositoryAbstract implements BackendRepositoryInterface
{
    public $isInitialed = false;
    protected $baseEntity;
    protected $numberOfRow = 20;
    protected $orderByFields = [];

    /**
     * 設定基本model class(entity)
     * @param $baseEntity
     */
    protected function setEntity($baseEntity)
    {
        $this->baseEntity = $baseEntity;
        $this->isInitialed = true;
    }

    /**
     * 設定每頁顯示筆數
     * @param $number
     */
    protected function setNumberOfRow($number)
    {
        $this->numberOfRow = $number;
    }

    /**
     * 指定排序欄位與排序方式，會依照呼叫的順序增加排序欄位
     * @param String $fieldName
     * @param String $type : asc|desc
     */
    public function orderBy(String $fieldName, String $type = 'asc')
    {
        $obj = [
            'field' => $fieldName,
            'type'  => $type
        ];

        array_push($this->orderByFields, $obj);
    }

    /**
     * 基本查詢
     * @param Request $request
     * @param bool $paginate
     * @return mixed
     */
    public function query(Request $request, bool $paginate)
    {
        if (!$this->isInitialed) dd(NOT_SET_ENTITY);

        $table = $this->baseEntity::whereRaw('1=1');

        $input = $request->except(['_token', '_method', 'page', 'key']);

        foreach ($input as $key => $val) {
            if ($request->filled($key)) {
                switch ($key) {
                    case '等於的欄位': //依需求修改
                        $table->where($key, '=', $val);
                        break;
                    default: //like
                        $table->where($key, 'like', '%' . $val . '%');
                        break;
                }
            }
        }

        if (count($this->orderByFields) == 0) {
            //預設排序會使用建立資料的時間由新到舊排序
            $table->orderBy('created_at', 'desc');
        } else {
            //如果有指定排序欄位與順序，會在這邊處理
            foreach ($this->orderByFields as $row) {
                $table->orderBy($row['field'], $row['type']);
            }
        }

        if ($paginate == true) {
            $datalist = $table->paginate($this->numberOfRow);
        } else {
            $datalist = $table->get();
        }

        return $datalist;
    }

    /**
     * 寫入資料
     * @param array $input
     * @return mixed
     */
    public function store(array $input)
    {
        if (!$this->isInitialed) dd(NOT_SET_ENTITY);

        $data = new $this->baseEntity;
        $data->fill($input);
        $data->save();

        return $data;
    }

    public function get($id)
    {
        if (!$this->isInitialed) dd(NOT_SET_ENTITY);

        return $this->baseEntity::find($id);
    }

    public function update($id, array $input)
    {
        if (!$this->isInitialed) dd(NOT_SET_ENTITY);

        $data = $this->baseEntity::findOrFail($id);
        $data->fill($input);
        $data->save();

        return $data;
    }

    public function destroy($ids)
    {
        if (!$this->isInitialed) dd(NOT_SET_ENTITY);

        $ids = is_array($ids) ? $ids : func_get_args();

        $deletedRows = $this->baseEntity::destroy($ids);

        return $deletedRows;
    }
}
