<?php
namespace Libraries\Chiliman;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\File;

class S3FileHelper {

    function __construct() {
    }

    function __destruct() {

    }

    //上傳檔案到S3
    public static function UploadFileToS3($file,$pg_id,$crmm_id)
    {
        if (isset($file)) {
            $_file = $file;
            $_ext = $_file->getClientOriginalExtension();

            //$_name = uniqid() . '.' . $_ext;

            //設定儲存的S3路徑規則  /public/crmm_id/pg_id/*.*
            //$_s3Path = '/public/' . $crmm_id . '/' . $pg_id;
            if (!empty($crmm_id)){
                $_s3Path = '/public/' . $crmm_id . '/' . $pg_id;
            }else{
                $_s3Path = '/public/' . $pg_id;
            }

            $_oriFileUrl = Storage::disk('s3')->putFile($_s3Path, $file, 'public');

            //實際圖檔路徑寫入 file_t 方便統一管理與統計檔案使用量
            //再把 file_t.fileT_No 回寫到資料表中
            $_fileType = $_ext;
            $_fileSize = Storage::disk('s3')->size($_oriFileUrl);

            $data=[
                'crmm_id' =>$crmm_id,
                'fileT_name' =>$_oriFileUrl,
                'fileType' =>$_fileType,
                'fileSize' =>$_fileSize,
            ];

        }else{
            $data = [];
        }

        return $data;
    }

    /****
     * @param $filepath
     * @param $pg_id
     * @param $crmm_id
     * @return array
     *
     */
    public static function UploadFileToS3WithFilePath( $filepath,$pg_id,$crmm_id)
    {
        if (isset($filepath)) {

            //設定儲存的S3路徑規則  /public/crmm_id/pg_id/*.*
            if (!empty($crmm_id)){
                $_s3Path = '/public/' . $crmm_id . '/' . $pg_id;
            }else{
                $_s3Path = '/public/' . $pg_id;
            }

            $_oriFileUrl = Storage::disk('s3')->putFile($_s3Path, new file($filepath), 'public');
            $_pathArray=explode("/",$filepath);
            $_fileName=array_pop($_pathArray);
            $_nameArray=explode(".",$_fileName);
            $_ext=array_pop($_nameArray);
            $localFilePath='public/'.$_fileName;
            Storage::delete($localFilePath); //刪除本機縮圖暫存檔

            //實際圖檔路徑寫入 file_t 方便統一管理與統計檔案使用量
            //再把 file_t.fileT_No 回寫到資料表中
            $_fileType = $_ext;
            $_fileSize = Storage::disk('s3')->size($_oriFileUrl);

            $data=[
                'crmm_id' =>$crmm_id,
                'fileT_name' =>$_oriFileUrl,
                'fileType' =>$_fileType,
                'fileSize' =>$_fileSize,
            ];

        }else{
            $data = [];
        }

        return $data;
    }

    //刪除S3檔案
    public static function DeleteFileFromS3($fileUrl){
        Storage::disk('s3')->delete($fileUrl);
        return;
    }


}
