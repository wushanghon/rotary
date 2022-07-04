<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateMum02Table extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mum02', function (Blueprint $table) {
            $table->string('gp_id', 50)->comment("角色群組ID");
            $table->string('gp_nm', 50)->comment("角色群組名稱");
            $table->string('gp_remark', 100)->nullable()->comment("備註");
            $table->string('created_id', 33)->comment("建立人員");
            $table->string('updated_id', 33)->comment("修改人員");
            $table->timestamps();

            $table->primary('gp_id');
        });

        // mssql 無法執行此功能
        if (env('DB_CONNECTION') != 'sqlsrv')
            DB::statement("ALTER TABLE `mum02` comment '角色管理'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mum02');
    }
}
