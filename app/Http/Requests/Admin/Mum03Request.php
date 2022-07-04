<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class Mum03Request extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        //表單請求類別也包含了 authorize 方法。在這個方法中，你可以確認使用者是否真的有權限可以更新特定資料。
        //舉個例子，當一個使用者嘗試更新部落格文章的評論時，可以先判斷這是否是他的評論？
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'pg_id' => 'required|max:50|string',
            'pg_nm' => 'required|max:50|string',
            'pg_path' => 'required|max:100|string',
            'remark' => 'max:100|string',
        ];
    }

//    public function messages()
//    {
//        return [
//            'pg_nm.required' => ':attribute 格式不正確',
//        ];
//    }

    public function attributes()
    {
        return [
            'pg_id' => trans('mum03.pg_id'),
            'pg_nm' => trans('mum03.pg_nm'),
            'pg_path' => trans('mum03.pg_path'),
            'remark' => trans('mum03.remark'),
        ];
    }
}
