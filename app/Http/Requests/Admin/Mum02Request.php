<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class Mum02Request extends FormRequest
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
            'gp_id' => 'required|max:50',
            'gp_nm' => 'required|max:50',
            'gp_remark' => 'required|max:100',
        ];
    }

//    public function messages()
//    {
//        return [
//            'brandEmail.email' => ':attribute 格式不正確',
//        ];
//    }

    public function attributes()
    {
        return [
            'gp_id' => trans('mum02.gp_id'),
            'gp_nm' => trans('mum02.gp_nm'),
            'gp_remark' => trans('mum02.gp_remark'),
        ];
    }

}
