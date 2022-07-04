<?php

use Illuminate\Support\Facades\Route;

/**
 * Backend Web Routes 後臺管理
 *  Here is where you can register web routes for your application. These
 * routes are loaded by the RouteServiceProvider within a group which
 * contains the "web" middleware group. Now create something great!
 */

Route::group([
    'namespace' => 'Admin',
    'prefix' => 'admin'
], function () {
    Route::get('', function () {
        return redirect('/admin/login');
    });

    Route::group(['prefix' => 'login'], function () {
        Route::get('/', 'LoginController@signInPage')->name('admin.login');
        Route::post('/sign-in', 'LoginController@signInProcess');
        Route::get('/sign-out', 'LoginController@signOut');
    });

    //除了登入登出以外的頁面全部需要檢查有沒有登入成功的紀錄，套用middleware
    Route::group([
        'middleware' => ['authAdmin', 'treeView']
    ], function () {
        Route::get('/dashboard', 'DashboardController@dashboard');

        Route::group(['namespace' => 'Chiliman'], function () {
            //Log Viewer
            Route::get('logs', '\Rap2hpoutre\LaravelLogViewer\LogViewerController@index')->middleware('logViewer');

            //登入帳號管理
            Route::resource('mum01', 'Mum01Controller');

            //登入帳號管理-for-客戶
            Route::resource('mum01_public', 'Mum01_publicController');

            //角色管理-for系統開發人員
            Route::resource('mum02', 'Mum02Controller');
            Route::resource('mum02/{gp_id}/permission', 'Mus02Controller');
            Route::get('mum02/{gp_id}/copygroup', 'Mum02Controller@copygroup');
            Route::put('mum02/{gp_id}/copygroup', 'Mum02Controller@duplicate');

            //程式管理
            Route::resource('mum03', 'Mum03Controller');

            //功能資料夾管理
            Route::group(['prefix' => 'menu_set'], function () {
                Route::match(['post', 'get'], '/', 'MenuSetController@index');
                Route::match(['post', 'get'], '/edit', 'MenuSetController@edit');
                Route::match(['post', 'get'], '/addnewfolder', 'MenuSetController@addnewfolder');
                Route::post('/update', 'MenuSetController@update');
            });

            //系統代碼管理
            Route::resource('code_c', 'CodeCController');

            //變更密碼
            Route::get('changepassword', 'ChangePasswordController@changepassword');
            Route::post('changepassword', 'ChangePasswordController@store');

            //角色管理程式-for-客戶
            Route::resource('mum02_public', 'Mum02_publicController');

            //角色權限指定-for-客戶
            Route::resource('mum02_public/{gp_id}/permission', 'Mus02_publicController', ['as' => 'prefix']);
            Route::get('mum02_public/{gp_id}/copygroup', 'Mum02_publicController@copygroup');
            Route::put('mum02_public/{gp_id}/copygroup', 'Mum02_publicController@duplicate');

            //操作記錄管理
            Route::group(['prefix' => 'log_m'], function () {
                Route::match(['post', 'get'], '/', 'LogController@index');
                Route::match(['post', 'get'], '/create', 'LogController@create');
                Route::match(['post', 'get'], '/edit', 'LogController@edit');
                Route::post('/store', 'LogController@store');
                Route::post('/update', 'LogController@update');
                Route::post('/destroy', 'LogController@destroy');
            });

            //登入後首頁
            Route::match(['post', 'get'], '/login_index', 'LoginIndexController@index');
        });

        Route::group(['namespace' => 'Sample'], function () {
            //範例程式－一般狀態
            Route::resource('/sample', 'SampleController');

            //範例程式－極簡版
            Route::resource('/fast', 'FastController');

            //範例－自定義view名稱，使用在新增與修改需要不同欄位的情境
            Route::resource('/set_view', 'SetViewController');

            //範例－簡易檔案上傳
            Route::resource('/sampleupload', 'SampleUploadController');
        });
    });
});
