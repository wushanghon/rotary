<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request as HttpRequest;

class ChangePasswordRequest extends FormRequest
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
        switch (HttpRequest::method()) {
            case 'POST'://新增
                return [
                    'user_pass_ori' => 'required|min:6|max:20|string',
                    'user_pass_modify' => 'required|min:6|max:20|regex:/^.*(?=.*[a-zA-Z0-9]).*$/|required_with:user_pass_modify_confirmation|string|confirmed',
                ];
        }
    }

    public function messages()
    {
        return [
            'user_pass_ori.regex' => ':attribute 格式不正確，必須至少包含一個英文字母開頭，最少８個字',
            'user_pass_modify.regex' => ':attribute 格式不正確，必須至少包含一個英文字母開頭，最少８個字',
        ];
    }

    public function attributes()
    {
        return [
            'user_pass_ori' => trans('changepassword.user_pass_ori'),
            'user_pass_modify' => trans('changepassword.user_pass_modify'),
        ];
    }

}
