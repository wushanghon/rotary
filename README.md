# Laravel8.32.1
Laravel 8 一般專案的公版

# 2021-03-15 Jeff
1. 下載後，解壓縮
2. 請執行composer install
3. 建立資料庫與登入的帳號密碼
4. 修改.env 的資料庫登入資訊
5. 完成後再執行資料表初始化的指令 php artisan migrate:refresh --seed
6. 開啟專案的測試網址例如：http://localhost/admin 
> + 登入的帳號密碼如下
> + 帳號：admin
> + 密碼：24427841

----
程式撰寫規範，請務必遵循
1. session一律在controller使用
2. session不得使用在service,增加service使用彈性
3. session不得使用在repository,增加service使用彈性
4. method命名規則
> + 讀取多筆資料一律使用query開頭的method名稱，例如queryBy()
> + 讀取單筆資料一律使用get開頭的method名稱，例如getBy()
5. Class命名規則
> + 一律以大小字母開頭，例如：MyClassControlller()
6. 變數命名規則
> + 一律以小駝峰的方式命名，例如：myString, dataList
7. 常數命名規則
> + 一律以全大寫加底線方式命名，例如：MY_BASE_URL
8. Route設定
> + /routes/backend.php 後台管理程式
> + /routes/web.php 前端網頁
> + /routes/test.php 測試用
> + /routes/api.php API
9. 範例程式
> + app/Http/Controllers/admin/sample 單KEY範例
> + app/Http/Controllers/admin/code_c 複合KEY範例
10. 以下路徑，禁止新增程式的路徑，此為公版程式放置位置
> + app/Service/Chiliman
> + app/Repository/Chiliman
> + app/Models/Chiliman
11. 新增程式放置路徑
> + Controller請放在 app/Http/Controllers/
> + Service請放在 app/Service/
> + Repository請放在 app/Repository/
12. 若有使用環境變數，請務必將新增的變數寫入.env.example

