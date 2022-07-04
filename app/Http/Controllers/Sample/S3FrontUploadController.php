<?php

namespace App\Http\Controllers\Sample;

use App\Http\Controllers\Controller;
use Aws\S3\S3Client;
use Aws\Credentials\CredentialProvider;
use Illuminate\Http\Request;

class S3FrontUploadController extends Controller
{
    public function __construct(
    ) {
    }

    public function index()
    {

		return view('sample.s3FrontUpload');
    }

    public function getUploadPresignedUrl(Request $request)
    {
        $input = $request->all();

        // 上傳S3檔案放置路徑及檔名
        $newFileName = uniqid() . '.' . pathinfo($input['fileName'], PATHINFO_EXTENSION);
        $filePath = 'frontend-upload/' . $newFileName;

        $s3Client = new S3Client([
            'region' => env('AWS_DEFAULT_REGION','ap-northeast-1'),
            'version' => '2006-03-01',
            'credentials' => CredentialProvider::env()
        ]);

        $cmd = $s3Client->getCommand('PutObject', [
            'Bucket' => env('AWS_BUCKET','my-bucket'),
            'Key' => $filePath,
            'ACL'        => 'public-read' //公開閱讀權限(可根據需要調整)
        ]);

        $request = $s3Client->createPresignedRequest($cmd, '+30 minutes'); //url有效時間

        // 取得上傳檔案預先簽章url
        $uploadPreSignedUrl = (string)$request->getUri();

        $downloadCmd = $s3Client->getCommand('GetObject', [
            'Bucket' => env('AWS_BUCKET','my-bucket'),
            'Key' => $filePath
        ]);

        // 取得開啟檔案預先簽章url
        // 如果是公開檔案,可以不使用預先簽章url開啟檔案,
        // 可直接用 https://儲存槽url/檔案路徑 (ex:https://laravel8-dev-bucket.s3.ap-northeast-1.amazonaws.com/frontend-upload/626252777e909.mp4)
        $downloadRequest = $s3Client->createPresignedRequest($downloadCmd, '+30 minutes');

        // Get the actual presigned-url
        $downloadPresignedUrl = (string)$downloadRequest->getUri();

        return response()->json([
            'uploadPreSignedUrl'=>$uploadPreSignedUrl,
            'newFileName' => $newFileName,
            'downloadPresignedUrl' => $downloadPresignedUrl,
        ]);
    }
}
