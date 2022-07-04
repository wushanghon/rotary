function changCheckboxV(count,pBoolean){// 設定checkbox的值
//count checkbox數量
//pBoolean 傳入的布林值
    if(pBoolean){
        $("#CmBtnDel, #CmBtnSave").show();
    }else{
        $("#CmBtnDel, #CmBtnSave").hide();
    }
    for(var i=0; i<count; i++){
        $("#rowNum" +i).prop("checked", pBoolean);
    }
}

function authorityAll(rowNum) {
    if ($("#rowNum" + rowNum).prop("checked")) {
        $("#g_add" + rowNum).prop("checked", true);
        $("#g_query" + rowNum).prop("checked", true);
        $("#g_mod" + rowNum).prop("checked", true);
        $("#g_del" + rowNum).prop("checked", true);
    } else {
        $("#g_add" + rowNum).prop("checked", false);
        $("#g_query" + rowNum).prop("checked", false);
        $("#g_mod" + rowNum).prop("checked", false);
        $("#g_del" + rowNum).prop("checked", false);
    }
}

function authorityItem(rowNum) {
    if( !$("#g_add" + rowNum).prop("checked") && !$("#g_query" + rowNum).prop("checked") && !$("#g_mod" + rowNum).prop("checked") && !$("#g_del" + rowNum).prop("checked")){
        $("#rowNum" + rowNum).prop("checked", false);
    }else {
        $("#rowNum" + rowNum).prop("checked", true);
    }

}