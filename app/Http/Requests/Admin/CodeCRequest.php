<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class CodeCRequest extends FormRequest
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
            'code_type'      => 'required|max:30',
            'code_type_desc'  => 'required|max:30',
            'code_id'        => 'required|max:30',
            'code_desc'      => 'required|max:30',
            'code_dsp'      => 'required|max:1',
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
            'code_type'      => trans('code_c.code_type'),
            'code_type_desc'  => trans('code_c.code_type_desc'),
            'code_id'        => trans('code_c.code_id'),
            'code_desc'      => trans('code_c.code_desc'),
            'code_dsp'       => trans('code_c.code_dsp'),
        ];
    }

}
