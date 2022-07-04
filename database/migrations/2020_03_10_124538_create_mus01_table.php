<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateMus01Table extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mus01', function (Blueprint $table) {
            $table->integer('user_no')->comment("帳號編號");
            $table->string('gp_id', 50)->comment("角色ID");
            $table->string('created_id', 33)->comment("建立人員");
            $table->string('updated_id', 33)->comment("修改人員");
            $table->timestamps();
            $table->softDeletes();

            $table->primary('user_no');
        });

        // mssql 無法執行此功能
        if (env('DB_CONNECTION') != 'sqlsrv')
            DB::statement("ALTER TABLE `mus01` comment '帳號角色設定檔'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mus01');
    }
}
