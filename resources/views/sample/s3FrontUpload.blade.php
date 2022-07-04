<!DOCTYPE html>
<html lang="zh-Hant">

<head>
    <meta http-equiv="Content-Language" content="zh-tw">
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,minimal-ui">

    <title>S3上傳</title>
    <script language="javascript" type="text/javascript" src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    <script src="https://sdk.amazonaws.com/js/aws-sdk-2.1118.0.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
</head>

<body>
    <div class="m-2" style="max-width: 500px">
        <form id="theForm" method="POST" enctype="multipart/form-data" >
            <input id="theFile" name="file" type="file"/>
            <button id="theButton" type="submit">上傳</button>
        </form>
        上傳完成後可<a id="download" href="" target="_blank">點此處下載</a>
        <div class="progress">
            <div class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
    </div>
</body>
<script language="javascript">
    $(function() {
        $('#theForm').on('submit', sendFile);
    });

    function sendFile(e) {
        e.preventDefault();

        var theFormFile = $('#theFile').get()[0].files[0];

        $('#download').attr('href', '');
        changeProgress(0);

        // 透過後端取得預先簽章url來上傳檔案
        getPreSignedUrlByApi(uploadProcess);

        {{--
        // 透過前端取得預先簽章url來上傳檔案
        getPreSignedUrlByJs(uploadProcess);
        --}}
        return false;
    };

    // 透過後端取得預先簽章url
    function getPreSignedUrlByApi(callback)
    {
        var theFormFile = $('#theFile').get()[0].files[0];

        // 取得上傳url
        $.ajax({
            type: 'POST',
            url: "/api/sample/s3FrontUpload/getUploadPresignedUrl",
            data: {fileName : theFormFile.name}
        })
        .success(function(res) {
            callback(res.uploadPreSignedUrl, res.downloadPresignedUrl);
        })
        .error(function() {
            alert('取得s3上傳url失敗');
        });
    }

    {{--
    // 用PHP註解避免key出現在測試網站上
    // 使用前端套件產生預先簽章url(不建議使用,因為要把key放前端)
    function getPreSignedUrlByJs(callback)
    {
        var theFormFile = $('#theFile').get()[0].files[0];
        var name = theFormFile.name;
        var lastDot = name.lastIndexOf('.');
        var ext = name.substring(lastDot + 1);
        var newName = Date.now() + '.' + ext;

        var s3 = new AWS.S3({
            accessKeyId: "{{env('AWS_ACCESS_KEY_ID')}}", //AWS IAM KEY
            secretAccessKey: "{{env('AWS_SECRET_ACCESS_KEY')}}" //AWS IAM SECRET
        });

        var uploadPreSignedUrl = s3.getSignedUrl('putObject', {
            Bucket: "{{env('AWS_BUCKET')}}", //S3 儲存槽
            Key: 'frontend-upload/' + newName , //S3檔案放置路徑及檔名
            ACL: 'public-read', //檔案權限設定(可根據需求調整)
            ContentType: 'binary/octet-stream',
            Expires: 60 //連結有效時間(秒)
            /* then add all the rest of your parameters to AWS puttObect here */
        });

        var downloadPresignedUrl = s3.getSignedUrl('getObject', {
            Bucket: "{{env('AWS_BUCKET')}}",
            Key: 'frontend-upload/' + newName,
            Expires: 3600
            /* and all the rest of your parameters to AWS getObect here */
        });

        callback(uploadPreSignedUrl, downloadPresignedUrl);
    }
    --}}

    // 使用預先簽章url來上傳檔案
    function uploadProcess(uploadPreSignedUrl, downloadPresignedUrl)
    {
        var theFormFile = $('#theFile').get()[0].files[0];

        $.ajax({
            xhr: function() {
                // 更新進度條
                var xhr = new window.XMLHttpRequest();
                xhr.upload.addEventListener("progress", function(evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = (evt.loaded / evt.total) * 100;
                        // Place upload progress bar visibility code here
                        changeProgress(Math.round(percentComplete));
                    }
                }, false);
                return xhr;
            },
            type: 'PUT',
            url: uploadPreSignedUrl,
            // Content type must much with the parameter you signed your URL with
            contentType: 'binary/octet-stream',
            // this flag is important, if not set, it will try to send data as a form
            processData: false,
            // the actual file is sent raw
            data: theFormFile
        })
        .success(function() {
            alert('檔案上傳成功');
            // 更新檔案下載路徑
            $('#download').attr('href', downloadPresignedUrl);
        })
        .error(function() {
            alert('檔案上傳失敗');
        });
    }

    // 更新進度條
    function changeProgress(value)
    {
        $('.progress-bar').css('width', value+'%').attr('aria-valuenow', value).html(value + '%');
    }

</script>

</html>
