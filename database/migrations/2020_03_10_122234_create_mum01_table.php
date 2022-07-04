﻿<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateMum01Table extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mum01', function (Blueprint $table) {
            $table->increments('user_no')->comment("帳號編號");
            $table->string('crmm_id', 10)->comment("顧客編號");
            $table->string('user_id', 30)->comment("帳號ID");
            $table->string('user_pass', 100)->comment("密碼");
            $table->string('user_nm', 30)->comment("姓名");
            $table->string('user_email', 50)->nullable()->comment("E-mail");
            $table->string('user_remark', 100)->nullable()->comment("備註");
            $table->string('user_status', 1)->comment("帳號狀態");
            $table->string('created_id', 33)->comment("建立人員");
            $table->string('updated_id', 33)->comment("修改人員");
            $table->timestamps();
            $table->softDeletes();
        });

        // mssql 無法執行此功能
        if (env('DB_CONNECTION') != 'sqlsrv')
            DB::statement("ALTER TABLE `mum01` comment '帳號管理'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mum01');
    }
}
