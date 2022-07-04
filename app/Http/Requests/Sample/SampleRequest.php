<?php

namespace App\Http\Requests\Sample;

//use http\Env\Request;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Request as HttpRequest;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;

class SampleRequest extends FormRequest
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
     * 可依據request method 撰寫不同的驗證規則
     * 完整的Laravel 8 formRequest 驗證規則官方文件請見 https://laravel.com/docs/8.x/validation#available-validation-rules
     * @return array
     */
    public function rules()
    {
        switch (HttpRequest::method()) {
            case 'POST'://新增頁－輸入驗證規則
                return [
                    'name' => 'required|max:2|string', //|unique:brand',
                ];
            case 'PUT'://修改頁－輸入驗證規則
                return [
                    'name' => 'required|max:4|string', //|unique:brand',
                ];
            case 'GET'://列表頁－查詢條件驗證規則
                return [
                    'name' => 'max:4|string',
                ];
            default:
                return [];
        }
    }

    /**
     * 驗證失敗後跳轉的畫面
     * @param Validator $validator
     * @throws ValidationException
     */
    protected function failedValidation(Validator $validator)
    {
        switch (HttpRequest::method()) {
            case 'GET':
                throw (new ValidationException($validator))
                    ->errorBag($this->errorBag)
                    ->redirectTo($this->path());
            default:
                throw (new ValidationException($validator))
                    ->errorBag($this->errorBag)
                    ->redirectTo($this->getRedirectUrl());
        }
    }

    /**
     *  轉換 input.name 成為指定的顯示名稱
     */
    public function attributes()
    {
        return [
            'name' => trans('sample.name'),
        ];
    }

    /**
     * 可自訂訊息格式
     * @return array
     * 詳細設定方式可參考 /resources/lang/zh-tw/validation.php
     */
    public function messages()
    {
        return [
            //'name.required' => ':attribute 一定要輸入資料喔！',
            //'name.string' => ':attribute 只能是文字或數字喔！',
        ];
    }
}
