<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Service\Admin\Chiliman\LoginService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{
    protected $LoginService;

    public function __construct(LoginService $LoginService)
    {
        $this->LoginService = $LoginService;
    }

    public function signInPage()
    {
        return view('admin.login.login');
    }

    public function signInPageWithId(Request $request, $CrmmId)
    {
        $CustomerNameAry = $this->LoginService->getCustomerName($CrmmId);
        $CustomerName = '';

        if (count($CustomerNameAry) > 0)
            $CustomerName = $CustomerNameAry->customerName;

        $binding = [
            'CrmmId' => $CrmmId,
            'CustomerName' => $CustomerName,
        ];

        return view('admin.login.loginWithId', $binding);
    }

    public function signInProcess(Request $request)
    {
        $input = request()->all();
        $CrmmId = $input['CrmmId'];
        $account = $input['account'];
        $password = $input['password'];

        //有勾選記住帳號，就把客戶編號跟帳號存到Cookie，時效3天
        if (isset($input['rememberAccount'])) {
            Cookie::queue('rememberAccount', 'Y', 4320);
            Cookie::queue('account', $account, 4320);
            Cookie::queue('CrmmId', $CrmmId, 4320);
        } else { //刪除cookie
            Cookie::queue(Cookie::forget('rememberAccount'));
            Cookie::queue(Cookie::forget('account'));
            Cookie::queue(Cookie::forget('CrmmId'));
        }

        $rules = [
            // 'CrmmId' => ['required', 'max:10'],
            'account' => ['required', 'max:30'],
            'password' => ['required', 'min:6'],
        ];
        $validator = Validator::make($input, $rules);

        if ($validator->fails()) {
            return redirect('/admin/login')->withErrors($validator)->withInput();
        } else {
            $data = $this->LoginService->signInProcess($request, $input);

            if (!$data) {
                $errorMessage = [
                    'msg' => [trans('common.loginError')],
                ];

                return redirect('/admin/login')->withErrors($errorMessage)->withInput();
            } else {
                $isCorrect = Hash::check($password, $data->user_pass);
                if (!$isCorrect) {
                    $errorMessage = [
                        'msg' => [trans('common.loginError')],
                    ];

                    return redirect('/admin/login')->withErrors($errorMessage)->withInput();
                } else {
                    session()->put('user_id', $data->user_id);
                    session()->put('gp_id', $data->gp_id);
                    session()->put('user_nm', $data->user_nm);
                    session()->put('user_no', $data->user_no);
                    session()->put('crmm_id', $data->crmm_id);

                    //寫入登入記錄
                    $this->LoginService->storeLoginLog();

                    return redirect('/admin/dashboard');
                }
            }
        }
    }

    public function signOut()
    {
        session()->flush();

        return redirect('/admin/login');
    }
}
