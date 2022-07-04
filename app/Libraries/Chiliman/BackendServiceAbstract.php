<?php
/**
 * Created by PhpStorm.
 * User: user
 * Date: 2021/2/23
 * Time: 上午 11:12
 */

namespace Libraries\Chiliman;

use Illuminate\Http\Request;

/**
 * 抽象類別（Abstract Class）使用特性說明
 * 當「多個類別（Class）」之間有共同的方法（function）或屬性（attribute）時，
 * 可以將這些共用的地方寫成「抽象類別（Abstract Class）」，讓其他的「子類別（Class）」去繼承
 * 可定義常數
 * 可宣告屬性
 * 可定義抽象方法
 * 可實作方法
 * 可被子類別複寫方法
 * Class BackendServiceAbstract
 * @package Libraries\Chiliman
 */
abstract class BackendServiceAbstract implements BackendServiceInterface
{
    //可以定義常數
    const NOT_SET_MESSAGE = 'BackendServiceAbstract:請先執行setRepository';

    // 可以定義 屬性
    public $baseRepository;
    public $isInitialed = false;

    //可以定義抽象方法
    //實作方法，可被複寫

    protected function setRepository($baseRepository)
    {
        $this->baseRepository = $baseRepository;
        $this->isInitialed = true;
    }

    /**
     * @param Request $request
     * @param bool $paginate
     * @return mixed
     */
    public function query(Request $request, bool $paginate = false)
    {
        if (!$this->isInitialed) dd(self::NOT_SET_MESSAGE);

        $data = $this->baseRepository->query($request, $paginate);

        return $data;
    }

    /**
     * @param int $id
     * @return mixed
     */
    public function get($id)
    {
        if (!$this->isInitialed) dd(self::NOT_SET_MESSAGE);

        $data = $this->baseRepository->get($id);

        return $data;
    }

    /**
     * @param array $input
     * @param string $updated_id
     * @return mixed
     */
    public function store(array $input, string $updated_id)
    {
        if (!$this->isInitialed) dd(self::NOT_SET_MESSAGE);

        //畫面上沒有的欄位在這裡處理
        $input['created_id'] = $updated_id;
        $input['updated_id'] = $updated_id;

        $data = $this->baseRepository->store($input);

        return $data;
    }

    /**
     * @param $id
     * @param array $input
     * @param string $updated_id
     * @return mixed
     */
    public function update($id, array $input, string $updated_id)
    {
        if (!$this->isInitialed) dd(self::NOT_SET_MESSAGE);

        //畫面上沒有的欄位在這裡處理
        $input['updated_id'] = $updated_id;

        $data = $this->baseRepository->update($id, $input);

        return $data;
    }

    /**
     * 刪除資料
     * @param int $id
     * @return mixed
     */
    public function destroy($id)
    {
        if (!$this->isInitialed) dd(self::NOT_SET_MESSAGE);

        $data = $this->baseRepository->destroy($id);

        return $data;
    }
}
