<?php
/**
 * Created by PhpStorm.
 * User: user
 * Date: 2021/2/23
 * Time: 上午 03:19
 */

namespace Libraries\Chiliman;

use Illuminate\Http\Request;

/**
 * 介面（Interface）使用特性說明
 * 當「多個類別（Class）」之間有共同的方法（function），
 * 但方法實做的方式有差異，可以將這些共用「方法」寫成「介面（Interface）」，
 * 讓其他的「子類別（Class）」去實做這個介面
 * 不可宣告屬性
 * 不可定義常數
 * 不可實作方法
 * 子類別可繼承多個介面
 */

/**
 * Interface BackendServiceInterface
 * @package Libraries\Chiliman
 */
interface BackendServiceInterface
{
    public function query(Request $request, bool $paginate = false);

    public function get($id);

    public function store(array $input, string $updated_id);

    public function update($id, array $input, string $updated_id);

    public function destroy($id);
}
