<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateTreeviewMTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('treeview_m', function (Blueprint $table) {
            $table->string('gp_id', 30)->comment("群組ID");
            $table->integer('tree_id')->comment("目錄ID");
            $table->string('tree_nm', 20)->comment("目錄名稱");
            $table->string('tree_type', 1)->comment("目錄種類");
            $table->integer('prev_tree_id')->comment("上層目錄ID");
            $table->string('pg_id', 50)->comment("程式ID");
            $table->integer('sort_no')->comment("排序");
            $table->string('tree_icon', 50)->comment("ICON圖示");
            $table->string('created_at', 30)->comment("建立日期");
            $table->string('updated_at', 30)->comment("修改日期");

            $table->unique(['gp_id', 'tree_id']);
        });

        // mssql 無法執行此功能
        if (env('DB_CONNECTION') != 'sqlsrv')
            DB::statement("ALTER TABLE `treeview_m` comment '目錄清單'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('treeview_m');
    }
}
