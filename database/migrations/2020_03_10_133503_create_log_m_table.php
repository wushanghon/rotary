<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateLogMTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('log_m', function (Blueprint $table) {
            $table->increments('log_no')->comment("操作編號");
            $table->string('user_id', 30)->comment("帳號ID");
            $table->string('log_type', 30)->comment("操作狀態");
            $table->string('pg_id', 50)->comment("程式ID");
            $table->string('table_nm', 30)->comment("資料表");
            $table->longText('data_old')->comment("原本的資料");
            $table->longText('data_new')->comment("修改後的資料");
            $table->string('created_id', 33)->comment("建立人員");
            $table->string('updated_id', 33)->comment("修改人員");
            $table->timestamps();
        });

        // mssql 無法執行此功能
        if (env('DB_CONNECTION') != 'sqlsrv')
            DB::statement("ALTER TABLE `log_m` comment '操作紀錄檔'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('log_m');
    }
}
