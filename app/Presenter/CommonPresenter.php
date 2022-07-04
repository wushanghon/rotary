<?php
/**
 * Created by PhpStorm.
 * User: user
 * Date: 2021/2/25
 * Time: 下午 06:55
 */

namespace App\Presenter;

use Aws\Credentials\CredentialProvider;
use Aws\S3\S3Client;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

class CommonPresenter
{
    /**
     * 取得S3上的檔案URL
     * @param $fileT_name ex:'/public/xx/filename.png'
     * @return string
     */
    public function getImageUrlFromFileName($fileT_name)
    {
        if (!is_null($fileT_name) && strlen($fileT_name) > 0) {
            return Storage::disk('s3')->url($fileT_name);
        } else {
            return '';
        }
    }

    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    //    功能簡述    : 用檔名取回完整URL / 輸出：ex:http://www.lockline.io
    //    撰寫日期    : 20190926
    //    撰寫人員    : JEFF
    //    參數說明    : fileT_name        / String    / 檔案完整名稱
    //               : defaultURL        / String    / URL
    //    2021/11/22 Modified by Nientsu:  disk 使用 FILESYSTEM_DRIVER 環境變數
    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    public function getUrlByFileName($fileT_name, $defaultURL = '')
    {
        $filePath = ltrim($fileT_name, '/');

        if (!is_null($filePath) && strlen($filePath) > 0) {
            if (Storage::disk()->exists($filePath)) {
                return Storage::disk()->url($filePath);
            } else {
                return $defaultURL;
            }
        } else {
            return $defaultURL;
        }
    }

    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    //    功能簡述    : 用檔名取回完整URL(非公開檔案) / 輸出：ex:http://www.lockline.io
    //    撰寫日期    : 20211122
    //    撰寫人員    : Nientsu
    //    參數說明    : fileT_name        / String    / 檔案完整名稱
    //               : defaultURL        / String    / URL
    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    public function getPrivateUrlByFileName($fileT_name, $defaultURL = '')
    {
        $filePath = ltrim($fileT_name, '/');

        if (!is_null($filePath) && strlen($filePath) > 0) {
            if (Storage::disk()->exists($filePath)) {

                // 因為是非公開檔案,S3需加入驗證字串
                if (env('FILESYSTEM_DRIVER', 'public') == 's3') {
                    $s3Client = new S3Client([
                        'region' => env('AWS_DEFAULT_REGION', 'ap-northeast-1'),
                        'version' => '2006-03-01',
                        'credentials' => CredentialProvider::env()
                    ]);

                    $cmd = $s3Client->getCommand('GetObject', [
                        'Bucket' => env('AWS_BUCKET', 'my-bucket'),
                        'Key' => $filePath
                    ]);

                    $request = $s3Client->createPresignedRequest($cmd, '+30 minutes');

                    // Get the actual presigned-url
                    $presignedUrl = (string)$request->getUri();

                    return $presignedUrl;
                } else {
                    return Storage::disk()->url($filePath);
                }
            } else {
                return $defaultURL;
            }
        } else {
            return $defaultURL;
        }
    }

    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    //    功能簡述    : 將日期字串YYYYMMDD轉換成YYYY/MM/DD / 輸出：YYYY/MM/DD
    //    撰寫日期    : 20211013
    //    撰寫人員    : Chiahao
    //    參數說明    : MyDateStr        / String    / 日期
    //               : SymbolStr        / String    / 符號樣式例如： / 或 -
    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    public function DspDate($MyDateStr, $SymbolStr)
    {
        switch (strlen($MyDateStr)) {
            case '6':
                return substr($MyDateStr, 0, 4) . $SymbolStr . substr($MyDateStr, 4, 2);
            case '8':
                if ($SymbolStr == 'tw')
                    return substr($MyDateStr, 0, 4) . '年' . substr($MyDateStr, 4, 2) . '月' . substr($MyDateStr, 6, 2) . '日';
                else
                    return substr($MyDateStr, 0, 4) . $SymbolStr . substr($MyDateStr, 4, 2) . $SymbolStr . substr($MyDateStr, 6, 2);
            default:
                return '';
        }
    }

    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    //    功能簡述    : 將時間字串HHmmSS轉換成HH:mm:SS / 輸出：HH:MM:SS
    //    撰寫日期    : 20211013
    //    撰寫人員    : Chiahao
    //    參數說明    : MyTimeStr        / String    / 時間
    //               : SymbolStr        / String    / 符號樣式例如：:
    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    public function DspTime($MyTimeStr, $SymbolStr)
    {
        switch (strlen($MyTimeStr)) {
            case '4':
                return substr($MyTimeStr, 0, 2) . $SymbolStr . substr($MyTimeStr, 2, 2);
                break;
            case '6':
                return substr($MyTimeStr, 0, 2) . $SymbolStr . substr($MyTimeStr, 2, 2) . $SymbolStr . substr($MyTimeStr, 4, 2);
                break;
            default:
                return '僅接受6碼或8碼的數字';
        }
    }

    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    //    功能簡述    : 判斷YN，利用Bootstrap的class d-none控制HTML標籤顯示狀態 / 輸出：ex:d-none
    //    撰寫日期    : 20190926
    //    撰寫人員    : Jeff 整理
    //    參數說明    : $YN        / String    / YN
    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    public function displaySwitch($YN)
    {
        if ($YN == 'N') {
            return 'd-none';
        }

        return '';
    }

    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    //    功能簡述    : 利用Carbon輸出指定日期格式 / 輸出：ex:2006-01-16
    //    撰寫日期    : 20200323
    //    撰寫人員    : Jeff 整理
    //    參數說明    : $timestamp        / timestamp    / 2006-01-16 14:30:00
    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    public function displayDate($timestamp)
    {
        $dt = Carbon::parse($timestamp);

        return $dt->toDateString();
    }

    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    //    功能簡述    : 利用Carbon輸出指定日期時間格式 / 輸出：ex:2006-01-16 14:30:00
    //    撰寫日期    : 20210719
    //    撰寫人員    : ChiaHao 整理
    //    參數說明    : $timestamp        / timestamp    / 2006-01-16 14:30:00.000
    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    public function displayDateTime($timestamp)
    {
        $dt = Carbon::parse($timestamp);

        return $dt->toDateTimeString();
    }

    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    //    功能簡述    : 輸出市話電話格式 / 輸出：ex:02-13246578
    //    撰寫日期    : 20210923
    //    撰寫人員    : ChiaHao 整理
    //    參數說明    : $tel_area   / string    / 市話-區碼
    //                  $tel       / string    / 市話
    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    public function displayTelephone($tel_area, $tel)
    {
        if (!empty($tel_area) && !empty($tel))
            return $tel_area . '-' . $tel;
    }

    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    //    功能簡述    : 輸出金額格式字串1000轉換成NT1,000 / 輸出：ex:1,000
    //    撰寫日期    : 20211007
    //    撰寫人員    : ChiaHao 整理
    //    參數說明    : $amount   / integer    / 金額
    //
    //'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    public function displayAmount($amount)
    {
        if (isset($amount))
            return number_format($amount);
        else
            return '0';
    }

    /**
     * @param string $value1 比對的值
     * @param $objects 要判斷的資料物件
     * @param string $fieldName 物件裡的欄位名稱
     * @return string
     */
    public function displayChecked(string $value1, $objects, string $fieldName)
    {
        for ($i = 0; $i < count($objects); $i++) {
            if ($value1 == $objects[$i][$fieldName]) {
                return 'checked';
            }
        }

        return '';
    }

    public function showData($value, $key)
    {
        return old($key, isset($value[$key]) ? $value[$key] : '');
    }
}
