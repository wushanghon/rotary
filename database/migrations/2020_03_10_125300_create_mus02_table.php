<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateMus02Table extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mus02', function (Blueprint $table) {
            $table->string('gp_id', 50)->comment("群組ID");
            $table->string('pg_id', 50)->comment("程式ID");
            $table->string('g_query', 1)->comment("查詢");
            $table->string('g_add', 1)->comment("新增");
            $table->string('g_mod', 1)->comment("修改");
            $table->string('g_del', 1)->comment("刪除");
            $table->string('created_id', 33)->comment("建立人員");
            $table->string('updated_id', 33)->comment("修改人員");
            $table->timestamps();

            $table->unique(['gp_id', 'pg_id']);
        });

        // mssql 無法執行此功能
        if (env('DB_CONNECTION') != 'sqlsrv')
            DB::statement("ALTER TABLE `mus02` comment '角色權限設定檔'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mus02');
    }
}
