<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateFileTTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('file_t', function (Blueprint $table) {
            $table->increments('file_no')->comment('檔案編號');
            $table->string('original_name', 50)->comment('原始檔名');
            $table->string('file_name', 50)->comment('檔案名稱');
            $table->string('file_path', 200)->comment('檔案路徑');
            $table->string('file_extension', 10)->comment('檔案類型');
            $table->string('created_id', 33)->comment('建立人員');
            $table->string('updated_id', 33)->comment('修改人員');
            $table->timestamps();
        });

        // mssql 無法執行此功能
        if (env('DB_CONNECTION') != 'sqlsrv')
            DB::statement("ALTER TABLE `file_t` comment '檔案主檔'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('file_t');
    }
}
