<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateMum03Table extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mum03', function (Blueprint $table) {
            $table->string('pg_id', 50)->comment("程式ID");
            $table->string('pg_nm', 50)->comment("程式名稱");
            $table->string('pg_path', 100)->comment("程式路徑");
            $table->string('remark', 100)->nullable()->comment("備註說明");
            $table->string('pg_icon', 50)->comment("程式圖示");
            $table->string('target', 30)->comment("目標視窗");
            $table->string('created_id', 33)->comment("建立人員");
            $table->string('updated_id', 33)->comment("修改人員");
            $table->timestamps();

            $table->primary('pg_id');
        });

        // mssql 無法執行此功能
        if (env('DB_CONNECTION') != 'sqlsrv')
            DB::statement("ALTER TABLE `mum03` comment '程式管理'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mum03');
    }
}
