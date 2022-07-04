<?php

namespace App\Service\Admin\Chiliman;

use DB;
use Illuminate\Support\Facades\Storage;
use PHPExcel;
use PHPExcel_IOFactory;
use PHPExcel_Style_Color;
use PHPExcel_Style_Alignment;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\File;

class ExcelService
{
    public function __construct()
    {
    }

    function __destruct()
    {
    }

    /**
     * 提供給event專用，產生 xls檔案
     * @param string $fileName
     * @param string $title
     * @param array $datalist
     * @param array $titleAry
     * @param string $_crmm_id
     * @return string $fullS3Url ex:https://s3.ap-northeast-1.amazonaws.com/scrm.chiliman.com.tw/public/99200811/goods_m/Gd4HcQf4FqzJJvFEBWcVijEsGcXk3oMBWCDLCDIx.xls
     */
    public static function createAndSaveExcel($fileName='',$title='',$datalist=[],$titleAry=[]){

        //定義時間參數
        $excuteDate = date("Y-m-d"); //操作日期
        $excuteTime = date("H:i:s"); //操作時間

        $PHPExcel = new PHPExcel();
        $columnAry = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
            ,'AA','AB','AC','AD','AE','AF','AG','AH','AI','AJ'];
        //設定Excel詳細資料(PHPExcel_DocumentProperties)
        $PHPExcel->getProperties()->setTitle("Title") //標題
        ->setSubject("Subject") //主旨
        ->setKeywords("Keywords") //標籤
        ->setCategory("Category") //類別
        ->setDescription("Description") //註解
        ->setCreator("Creator") //作者
        ->setLastModifiedBy("LastModifiedBy"); //上次存檔者
        //指定目前要編輯的工作表
        $PHPExcel->setActiveSheetIndex(0);
        //設定工作表名稱
        $PHPExcel->getActiveSheet()->setTitle($title);
        //設定儲存格內容
        $PHPExcel->getActiveSheet()->setCellValue("A1", "匯出時間：" . $excuteDate . ' ' . $excuteTime);
        $PHPExcel->getActiveSheet()->getStyle("A1")->getFont()->setName("標楷體");
        $PHPExcel->getActiveSheet()->getStyle("A1")->getFont()->setSize("12");
        $PHPExcel->getActiveSheet()->getStyle("A1")->getFont()->setBold(true);
        $PHPExcel->getActiveSheet()->getStyle("A1")->getFont()->getColor()->setARGB(PHPExcel_Style_Color::COLOR_RED);
        //合併或分離儲存格
        $PHPExcel->getActiveSheet()->mergeCells("A1:F1");
        //設定儲存格內容
        //$PHPExcel->getActiveSheet()->setCellValue("A2", "");
        //$PHPExcel->getActiveSheet()->getStyle("A2")->getFont()->setName("標楷體");
        //$PHPExcel->getActiveSheet()->getStyle("A2")->getFont()->setSize("10");
        //$PHPExcel->getActiveSheet()->getStyle("A2")->getFont()->setBold(true);
        //$PHPExcel->getActiveSheet()->getStyle("A2")->getFont()->getColor()->setARGB(PHPExcel_Style_Color::COLOR_DARKGREEN);
        //合併或分離儲存格
        //$PHPExcel->getActiveSheet()->mergeCells("A2:E2");
        //設定儲存格內容
        $columnNum = 0;
        $rowNum = 3;

        foreach ($titleAry as $title) {
            $columnName = $columnAry[$columnNum];
            $PHPExcel->getActiveSheet()->setCellValue($columnName . $rowNum, $title);
            $PHPExcel->getActiveSheet()->getColumnDimension($columnName)->setWidth(20);
            $PHPExcel->getActiveSheet()->getStyle($columnName . $rowNum)->getFont()->setName("標楷體");
            $PHPExcel->getActiveSheet()->getStyle($columnName . $rowNum)->getFont()->setSize("10");
            $PHPExcel->getActiveSheet()->getStyle($columnName . $rowNum)->getFont()->getColor()->setARGB(PHPExcel_Style_Color::COLOR_BLUE);
            $PHPExcel->getActiveSheet()->getStyle($columnName . $rowNum)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
            $columnNum++;
        }
        //設定儲存格內容
        $columnNum = 0;
        $rowNum = 4;
        $contentAry = $datalist;

        foreach ($contentAry as $content) {
            foreach ($content as $object){
                $columnName = $columnAry[$columnNum];
                $PHPExcel->getActiveSheet()->setCellValue($columnName . $rowNum, $object);
                $PHPExcel->getActiveSheet()->getStyle($columnName . $rowNum)->getFont()->setName("標楷體");
                $PHPExcel->getActiveSheet()->getStyle($columnName . $rowNum)->getFont()->setSize("10");
                $PHPExcel->getActiveSheet()->getStyle($columnName . $rowNum)->getAlignment()
                    ->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setWrapText(true);
                $PHPExcel->getActiveSheet()->getColumnDimension($columnName)->setAutoSize(true);
                $columnNum++;
            }
            $columnNum = 0;
            $rowNum++;
        }
        //Excel 2003
        ob_end_clean();
        //todo:: 這段還有兩個問題要修正
        // 問題二：無法正確刪除儲存在主機的 暫存XLS檔案
        // 問題三：要改成呼叫fileTService，並且設定檔案的生命週期，如果無法由S3控制，就寫個排成定期去刪除S3的檔案
        $filename = $fileName . " - " . $excuteDate . '_' . $excuteTime . ".xls";
        $objWriter = PHPExcel_IOFactory::createWriter($PHPExcel, 'Excel5');
        $objWriter->save(storage_path('app/'.$filename));
        $localFilePath='/public/export';
        $s3Url=Storage::disk('s3')->putFileAs($localFilePath, new file(storage_path('app/'.$filename)), $filename);
        Storage::delete(storage_path('app/'.$filename));
        $fullS3Url=Storage::disk('s3')->url($s3Url);
        return $fullS3Url;
    }

    public static function createExcel($fileName='',$title='',$datalist=[],$titleAry=[]){
        //定義時間參數
        $excuteDate = date("Y-m-d"); //操作日期
        $excuteTime = date("H:i:s"); //操作時間

        $PHPExcel = new PHPExcel();
        $columnAry = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
            ,'AA','AB','AC','AD','AE','AF','AG','AH','AI','AJ'];
        //設定Excel詳細資料(PHPExcel_DocumentProperties)
        $PHPExcel->getProperties()->setTitle("Title") //標題
        ->setSubject("Subject") //主旨
        ->setKeywords("Keywords") //標籤
        ->setCategory("Category") //類別
        ->setDescription("Description") //註解
        ->setCreator("Creator") //作者
        ->setLastModifiedBy("LastModifiedBy"); //上次存檔者
        //指定目前要編輯的工作表
        $PHPExcel->setActiveSheetIndex(0);
        //設定工作表名稱
        $PHPExcel->getActiveSheet()->setTitle($title);
        //設定儲存格內容
        $PHPExcel->getActiveSheet()->setCellValue("A1", "匯出時間：" . $excuteDate . ' ' . $excuteTime);
        $PHPExcel->getActiveSheet()->getStyle("A1")->getFont()->setName("標楷體");
        $PHPExcel->getActiveSheet()->getStyle("A1")->getFont()->setSize("12");
        $PHPExcel->getActiveSheet()->getStyle("A1")->getFont()->setBold(true);
        $PHPExcel->getActiveSheet()->getStyle("A1")->getFont()->getColor()->setARGB(PHPExcel_Style_Color::COLOR_RED);
        //合併或分離儲存格
        $PHPExcel->getActiveSheet()->mergeCells("A1:F1");
        //設定儲存格內容
        //$PHPExcel->getActiveSheet()->setCellValue("A2", "");
        //$PHPExcel->getActiveSheet()->getStyle("A2")->getFont()->setName("標楷體");
        //$PHPExcel->getActiveSheet()->getStyle("A2")->getFont()->setSize("10");
        //$PHPExcel->getActiveSheet()->getStyle("A2")->getFont()->setBold(true);
        //$PHPExcel->getActiveSheet()->getStyle("A2")->getFont()->getColor()->setARGB(PHPExcel_Style_Color::COLOR_DARKGREEN);
        //合併或分離儲存格
        //$PHPExcel->getActiveSheet()->mergeCells("A2:E2");
        //設定儲存格內容
        $columnNum = 0;
        $rowNum = 3;

        foreach ($titleAry as $title) {
            $columnName = $columnAry[$columnNum];
            $PHPExcel->getActiveSheet()->setCellValue($columnName . $rowNum, $title);
            $PHPExcel->getActiveSheet()->getColumnDimension($columnName)->setWidth(20);
            $PHPExcel->getActiveSheet()->getStyle($columnName . $rowNum)->getFont()->setName("標楷體");
            $PHPExcel->getActiveSheet()->getStyle($columnName . $rowNum)->getFont()->setSize("10");
            $PHPExcel->getActiveSheet()->getStyle($columnName . $rowNum)->getFont()->getColor()->setARGB(PHPExcel_Style_Color::COLOR_BLUE);
            $PHPExcel->getActiveSheet()->getStyle($columnName . $rowNum)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
            $columnNum++;
        }
        //設定儲存格內容
        $columnNum = 0;
        $rowNum = 4;
        $contentAry = $datalist;

        foreach ($contentAry as $content) {
            foreach ($content as $object){
                $columnName = $columnAry[$columnNum];
                $PHPExcel->getActiveSheet()->setCellValue($columnName . $rowNum, $object);
                $PHPExcel->getActiveSheet()->getStyle($columnName . $rowNum)->getFont()->setName("標楷體");
                $PHPExcel->getActiveSheet()->getStyle($columnName . $rowNum)->getFont()->setSize("10");
                $PHPExcel->getActiveSheet()->getStyle($columnName . $rowNum)->getAlignment()
                    ->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setWrapText(true);
                $PHPExcel->getActiveSheet()->getColumnDimension($columnName)->setAutoSize(true);
                $columnNum++;
            }
            $columnNum = 0;
            $rowNum++;
        }
        //Excel 2003
        ob_end_clean();
        //$filename = mb_convert_encoding("發文對話紀錄表" . $excuteDate . $excuteTime . ".xls", "utf-8", "big5");
        $filename = $fileName . " - " . $excuteDate . '_' . $excuteTime . ".xls";
        $browserVersion = strtolower($_SERVER["HTTP_USER_AGENT"]);
        if (preg_match("/msie/", $browserVersion) || preg_match("/edge/", $browserVersion ) ||  strpos($browserVersion,'rv:11.0')) { //判断是否為IE或Edge瀏覽器
            $filename = str_replace("+", "%20", urlencode($filename)); //使用urlencode對文件名進行重新編碼
        }
        header("Content-Type: text/html; charset=utf-8");
        header("Content-Type:application/vnd.ms-excel");
        header("Content-Disposition:attachment;filename=" . $filename);
        header('Cache-Control:max-age=0');
        $objWriter = PHPExcel_IOFactory::createWriter($PHPExcel, 'Excel5');
        $objWriter->save('php://output');
    }

    public static function createMulitePageExcel( $fileName,//檔案名稱 String
                                                  $tabNameAry,//分頁名稱 array( String)
                                                  $datalistAry,//顯示資料 array(   分頁1資料List ,  分頁2資料List  )
                                                  $titleAry// 分頁顯示欄位 array( String)
    ){
        //定義時間參數
        $excuteDate = date("Y-m-d"); //操作日期
        $excuteTime = date("H:i:s"); //操作時間

        $PHPExcel = new PHPExcel();
        $columnAry = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
            "AA", "AB", "AC", "AD", "AE", "AF", "AG", "AH", "AI", "AJ", "AK", "AL", "AM", "AN", "AO", "AP", "AQ", "AR", "AS", "AT", "AU", "AV", "AW", "AX", "AY", "AZ",
            "BA", "BB", "BC", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BK", "BL", "BM", "BN", "BO", "BP", "BQ", "BR", "BS", "BT", "BU", "BV", "BW", "BX", "BY", "BZ",
        ];
        //設定Excel詳細資料(PHPExcel_DocumentProperties)
        $PHPExcel->getProperties()->setTitle("Title") //標題
        ->setSubject("Subject") //主旨
        ->setKeywords("Keywords") //標籤
        ->setCategory("Category") //類別
        ->setDescription("Description") //註解
        ->setCreator("Creator") //作者
        ->setLastModifiedBy("LastModifiedBy"); //上次存檔者

        //分頁數量
        $tabSize = count($tabNameAry);

        for ($i=0 ; $i < $tabSize ; $i++ ){

            if($i == 0){
                //指定目前要編輯的工作表
                $PHPExcel->setActiveSheetIndex($i);
                //設定工作表名稱
                $PHPExcel->getActiveSheet()->setTitle($tabNameAry[$i]);
            }else{
                $PHPExcel->createSheet();  //创建新一页 也就是Sheet2
                //指定目前要編輯的工作表
                $PHPExcel->setActiveSheetIndex($i);
                $PHPExcel->getActiveSheet()->setTitle($tabNameAry[$i]);
            }

            //設定儲存格內容
            $PHPExcel->getActiveSheet()->setCellValue("A1", "匯出時間：" . $excuteDate . ' ' . $excuteTime);
            $PHPExcel->getActiveSheet()->getStyle("A1")->getFont()->setName("新細明體");
            $PHPExcel->getActiveSheet()->getStyle("A1")->getFont()->setSize("12");
            $PHPExcel->getActiveSheet()->getStyle("A1")->getFont()->setBold(true);
            $PHPExcel->getActiveSheet()->getStyle("A1")->getFont()->getColor()->setARGB(PHPExcel_Style_Color::COLOR_RED);
            //合併或分離儲存格
            $PHPExcel->getActiveSheet()->mergeCells("A1:F1");

            $columnNum = 0;
            $rowNum = 3;


            foreach ($titleAry[$i] as $title) {

                $columnName = $columnAry[$columnNum];
                $PHPExcel->getActiveSheet()->setCellValue($columnName . $rowNum, $title);
                $PHPExcel->getActiveSheet()->getColumnDimension($columnName)->setWidth(20);
                $PHPExcel->getActiveSheet()->getStyle($columnName . $rowNum)->getFont()->setName("新細明體");
                $PHPExcel->getActiveSheet()->getStyle($columnName . $rowNum)->getFont()->setSize("10");
                $PHPExcel->getActiveSheet()->getStyle($columnName . $rowNum)->getFont()->getColor()->setARGB(PHPExcel_Style_Color::COLOR_BLUE);
                $PHPExcel->getActiveSheet()->getStyle($columnName . $rowNum)->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
                $columnNum++;
            }


            //設定儲存格內容
            $columnNum = 0;
            $rowNum = 4;
            $contentAry = $datalistAry[$i];

            foreach ($contentAry as $content) {
                foreach ($content as $object){
                    $columnName = $columnAry[$columnNum];
                    $PHPExcel->getActiveSheet()->setCellValue($columnName . $rowNum, $object);
                    $PHPExcel->getActiveSheet()->getStyle($columnName . $rowNum)->getFont()->setName("新細明體");
                    $PHPExcel->getActiveSheet()->getStyle($columnName . $rowNum)->getFont()->setSize("10");
                    $PHPExcel->getActiveSheet()->getStyle($columnName . $rowNum)->getAlignment()
                        ->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER)->setWrapText(true);
                    $PHPExcel->getActiveSheet()->getColumnDimension($columnName)->setAutoSize(true);
                    $columnNum++;
                }
                $columnNum = 0;
                $rowNum++;
            }
        }

        //Excel 2003
        ob_end_clean();
        //$filename = mb_convert_encoding("發文對話紀錄表" . $excuteDate . $excuteTime . ".xls", "utf-8", "big5");
        $filename = $fileName . " - " . $excuteDate . '_' . $excuteTime . ".xls";
        $browserVersion = strtolower($_SERVER["HTTP_USER_AGENT"]);
        if (preg_match("/msie/", $browserVersion) || preg_match("/edge/", $browserVersion ) ||  strpos($browserVersion,'rv:11.0')) { //判断是否為IE或Edge瀏覽器
            $filename = str_replace("+", "%20", urlencode($filename)); //使用urlencode對文件名進行重新編碼
        }
        header("Content-Type: text/html; charset=utf-8");
        header("Content-Type:application/vnd.ms-excel");
        header("Content-Disposition:attachment;filename=" . $filename);
        header('Cache-Control:max-age=0');
        $objWriter = PHPExcel_IOFactory::createWriter($PHPExcel, 'Excel5');
        $objWriter->save('php://output');
    }
}
