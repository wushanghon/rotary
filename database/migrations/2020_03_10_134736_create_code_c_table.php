<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateCodeCTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('code_c', function (Blueprint $table) {
            $table->string('code_type', 30)->comment("代碼種類");
            $table->string('code_type_desc', 30)->comment("代碼種類說明文字");
            $table->string('code_id', 30)->comment("代碼ID");
            $table->string('code_desc', 30)->comment("代碼顯示文字");
            $table->string('code_dsp', 2)->comment("是否顯示");
            $table->integer('code_sort')->comment("顯示順序");
            $table->string('created_id', 33)->comment("建立人員");
            $table->string('updated_id', 33)->comment("修改人員");
            $table->timestamps();

            $table->primary(['code_type', 'code_id']);
        });

        // mssql 無法執行此功能
        if (env('DB_CONNECTION') != 'sqlsrv')
            DB::statement("ALTER TABLE `code_c` comment '代碼管理'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('code_c');
    }
}
