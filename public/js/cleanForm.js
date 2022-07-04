    function cleanupForm(e){/*處理事件,也可拉出去給個名子寫為獨立的函數,只需將e 傳入即可*/
        var Constant = {
            ELE_FORM:'form',
            CUSTOM_FORM_NAME:'data-cleanup-form-name',
            CUSTOM_FORM_ID:'data-cleanup-form-id',
            INPUT_NORMAL_SELECTOR:
'input[type="text"],input[type="email"],input[type="number"],input[type="search"],input[type="url"],input[type="range"],input[type="date"],input[type="datetime-local"],input[type="file"],input[type="month"],input[type="week"],input[type="time"]',
            INPUT_RADIO_SELECTOR:':input[type="radio"]',
            INPUT_CHECKBOX_SELECTOR:':input[type="checkbox"]',
            INPUT_SPECIAL_SELECTOR:'input[type="color"]',
            TEXTAREA_SELECTOR:'textarea',
            SELECT_BOX_SELECTOR:'select',
            INPUT__SELECTOR:'input:not([type="submit"]):not([type="reset"]):not([type="hidden"]):not([type="button"])'
            
        };
        //var _t = e.currentTarget;//按鈕本身
        var _t = e;//按鈕本身
        var 
        _form/*按鈕歸屬的<form>*/ , 
        _inputNormalAry/*單行文字輸入欄位*/ , 
        _areaAry/*多行文字欄位*/ , 
        _radioAry/*radio 欄位*/ , 
        _checkboxAry/*checkbox*/ , 
        _selectBoxAry/*單複選下拉選項*/ , 
        _inputSpecialAry/*特殊的文字輸入欄位*/;
        var isAllow = function(e){
            var chk = false;
            if(($(e).attr('type') == undefined) == false && $(e).prop('tagName').toLowerCase() == 'input'){
                if($(e).attr('type') == 'hidden') return false;
            }
            if(($(e).attr('data-force-cleanup') == undefined) == true){//沒有data-force-cleanup　屬性
                 return true;
            } else {
                if(Boolean(Number($(e).attr('data-force-cleanup'))) == true) return false;
            }
        };
        var cleanupSimpleTextVal = function(){
            for(var i = 0;i<this.length;i++) if(isAllow(this[i]) == true) $(this[i]).val('');
            
        };
        var cleanupInputSelection = function(){
            for(var i = 0;i<this.length;i++) if(isAllow(this[i]) == true) $(this[i]).prop('checked' , false);
        };
        var cleanupSelectBox = function(){
            if(isAllow(this) == true) $(this).prop('selectedIndex' , -1);//只有<select> 直接回傳為父系的<select>
        };
        var removeValueAttribute = function(){
            for(var i = 0;i<this.length;i++) if(isAllow(this[i]) == true) $(this[i]).removeAttr('value');
        }
        if($(_t).closest(Constant.ELE_FORM).length == 1){//按鈕在<form> 內
            _form = $(_t).closest(Constant.ELE_FORM)[0];
        } else if($(_t).closest(Constant.ELE_FORM).length == 0){//按鈕在<form>　外
            if(($(_t).attr(Constant.CUSTOM_FORM_NAME) == undefined) == false){//透過指定的name
                _form = $('[name="' + $(_t).attr(Constant.CUSTOM_FORM_NAME) + '"]')[0];
            } else if(($(_t).attr(Constant.CUSTOM_FORM_ID) == undefined) == false){//透過指定的id
                _form = $('[id="' + $(_t).attr(Constant.CUSTOM_FORM_ID) + '"]')[0];
            } else {//找不到要操作的<form>
                alert('錯誤：找不到要操作的<form>');
            }
        }
        
        _inputNormalAry = $(_form).find(Constant.INPUT_NORMAL_SELECTOR);
        _inputSpecialAry = $(_form).find(Constant.INPUT_SPECIAL_SELECTOR);
        _areaAry = $(_form).find(Constant.TEXTAREA_SELECTOR);
        _radioAry = $(_form).find(Constant.INPUT_RADIO_SELECTOR);
        _checkboxAry = $(_form).find(Constant.INPUT_CHECKBOX_SELECTOR);
        _selectBoxAry = $(_form).find(Constant.SELECT_BOX_SELECTOR);
        $([_inputNormalAry , _areaAry]).each(cleanupSimpleTextVal);
        $(_inputSpecialAry).each(removeValueAttribute);
        $([_radioAry , _checkboxAry]).each(cleanupInputSelection);
        $(_selectBoxAry).each(cleanupSelectBox);
    }