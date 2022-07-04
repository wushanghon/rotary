<?php

/**
 * Created by PhpStorm.
 * User: user
 * Date: 2021/2/27
 * Time: 下午 10:35
 */

namespace Libraries\Chiliman;

/**
 * 後台程式共用的Repository抽象物件(複合key)
 * 繼承 BackendRepositoryAbstract
 * 覆寫 複合key不同的method
 * Class BackendRepositoryMutiAbstract
 * @package Libraries\Chiliman
 */
abstract class BackendRepositoryMutiAbstract extends BackendRepositoryAbstract
{
    protected $keys = [];

    /**
     * 設定keys的陣列，要依照順序(view.index)
     * 多key一定要執行這個method
     * @param $keys
     */
    public function setKeys($keys)
    {
        $this->keys = is_array($keys) ? $keys : func_get_args();
    }

    /**
     * 檢查是否有設定keys
     * @return bool
     */
    private function hasKeys()
    {
        return (count($this->keys) > 0) ? true : false;
    }

    public function get($ids)
    {
        if (!$this->hasKeys()) dd('BackendRepositoryMutiAbstract:請先設定keys');

        $orm = $this->baseEntity::whereRaw('1=1');
        $pram = explode('－', $ids);

        if (count($pram) != count($this->keys)) dd('BackendRepositoryMutiAbstract:參數數量不符');

        for ($i = 0; $i < count($pram); $i++) {
            $orm->where($this->keys[$i], $pram[$i]);
        }

        $data = $orm->first();

        return $data;
    }

    public function update($ids, array $input)
    {
        if (!$this->hasKeys()) dd('BackendRepositoryMutiAbstract:請先設定keys');

        $data = $this->get($ids);
        $data->fill($input);
        $data->save();

        return $data;
    }

    public function destroy($ids)
    {
        if (!$this->hasKeys()) dd('BackendRepositoryMutiAbstract:請先設定keys');

        $pram = explode('－', $ids);

        if (count($pram) != count($this->keys)) dd('BackendRepositoryMutiAbstract:參數數量不符');

        $orm = $this->baseEntity::whereRaw('1=1');

        for ($i = 0; $i < count($pram); $i++) {
            $orm->where($this->keys[$i], $pram[$i]);
        }

        $orm->delete();

        return;
    }
}
