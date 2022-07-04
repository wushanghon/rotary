<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(MUM01TableSeeder::class);
        $this->call(MUM02TableSeeder::class);
        $this->call(MUM03TableSeeder::class);
        $this->call(MUS01TableSeeder::class);
        $this->call(MUS02TableSeeder::class);
        $this->call(TreeViewMTableSeeder::class);
        $this->call(CodeCTableSeeder::class);
    }
}
