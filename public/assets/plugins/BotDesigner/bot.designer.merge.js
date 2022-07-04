/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */

/*
var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
if(!MutationObserver) alert('不支援MutationObserver');
*/
var DDK = {
	/**
	201906 重大更新:
	1.牌卡模組新增"訊息"或"資料"的值可使用下拉選單或單行輸入.
	2.牌卡模組新增"訊息"或"資料"的值若用下拉選單時,要載入特定的關鍵字作為其選項內容(<script ... type="text/template" id="fancyCardsExtendsData").
	3.牌卡模組新增"訊息"或"資料"欄位可選擇性啟用.
	*/
	active:function(){
		(arguments.length == 1) ? DDK.Mutual.init(arguments[0]) /*有特別傳入設定檔*/ : DDK.Mutual.init();//啟動1
		DDK.Mutual.SyncTask.activateSyncTask();//啟動2-1
		DDK.Mutual.InVerifiTask.activateVerifiTask();//啟動2-2
		DDK.DataImport.init();//啟動3
		DDK.ModuleKit.init();//啟動4
		DDK.OptionsUICaptain.init();//啟動5
		
	}
	,
	Mutual:{},
	ModuleKit:{/*樣板操作介面功能設定,有TextModual(純文字) , ImageModual(單張圖) , ImageCardsModual(只有圖片的牌卡"image_carousel") , FancyCardsModual(夾雜文字與圖片的排卡"carousel")*/},
	DataExport:{/*資料輸出功能,有TextModual(純文字) , ImageModual(單張圖) , ImageCardsModual(只有圖片的牌卡"image_carousel") , FancyCardsModual(夾雜文字與圖片的排卡"carousel")*/},
	DataImport:{/*資料匯入功能,有TextModual(純文字) , ImageModual(單張圖) , ImageCardsModual(只有圖片的牌卡"image_carousel") , FancyCardsModual(夾雜文字與圖片的排卡"carousel")*/},
	Equalizer:{/*定義不同形態的欄位內容如何同步到畫面*/},
	Verification:{/*驗證欄位*/}
};

DDK.Mutual = {
	ConstantStatic:{
		SYNC_INTERVAL:50,
		VERIFI_INTERVAL:50,
		HINT_BOX_CLASS_NAME:'hintBox',
		CONFIRM_BOX_CLASS_NAME:'confirmBox',
		WAIT_BOX_CLASS_NAME:'waitBox',
		SWITCHER_NAME:'template-type',
		ALLOW_CONSOLE:false,
		APPLICATION_POLICY:{
			/*... 未來還有其他的 ...*/
			Module:{/*模組設定*/
				fancyCards:{
					buttons:{/*牌卡按鈕設定*/
						message:{
							enabled:true/*是否啟用訊息 true 啟用(預設值)，false 停用*/,
							valueUIType:'input'/*輸入欄位型態 'input' 單行文字欄位(預設值)，'select' 下拉選項，若是此型態需提供欄位內容JSON , 若無視為'input'*/
						},
						/*網址按鈕為固定啟用，不開放設定*/
						postback:{
							enabled:true/*是否啟用資料 true 啟用(預設值)，false 停用*/,
							valueUIType:'input'/*輸入欄位型態 'input' 單行文字欄位(預設值)，'select' 下拉選項，若是此型態需提供欄位內容JSON , 若無視為'input'*/
						},
					}
				}
			}
		}
	}
	,
	DynamicValue:{
		syncTaskArray:null/*同步作業的任務陣列*/,
		run_syncTask:null/*同步作業的Interval id*/,
		inVerifiArray:null/*驗證作業的任務陣列*/,
		run_inVerifiTask:null/*驗證作業的Interval id*/,
		hintBox:null/*提醒文字方塊*/,
		confirmBox:null/*確認文字方塊*/,
		waitBox:null/*等待文字方塊*/,
		applicationPolicy:null/*應用程式設定檔,會因為啟動時有無傳入設定而改變*/
	}
	,
	EventType:{
		ConstantStatic:{
			CLICK:'click',
			RADIO_CHANGE:'change'
		}
	}
	,
	init:function(){
		DDK.Mutual.DynamicValue.applicationPolicy = JSON.parse(JSON.stringify(DDK.Mutual.ConstantStatic.APPLICATION_POLICY));//先取得設定檔預設值
		DDK.Mutual.DynamicValue.syncTaskArray = [];
		DDK.Mutual.DynamicValue.inVerifiArray = [];
		DDK.Mutual.DynamicValue.hintBox = $('.' + DDK.Mutual.ConstantStatic.HINT_BOX_CLASS_NAME)[0];
		DDK.Mutual.DynamicValue.confirmBox = $('.' + DDK.Mutual.ConstantStatic.CONFIRM_BOX_CLASS_NAME)[0];
		DDK.Mutual.DynamicValue.waitBox = $('.' + DDK.Mutual.ConstantStatic.WAIT_BOX_CLASS_NAME)[0];
		FxAddEventListener(
			$(DDK.Mutual.DynamicValue.hintBox).find('.closeX , .closeBtn') , 
			DDK.Mutual.EventType.ConstantStatic.CLICK,
			function(e){
				DDK.Mutual.hintBox(false);
			}
			,
			false
		);
		if(arguments.length == 1){//有設定檔傳入,進行同步
			var _config = arguments[0];
			//--牌卡模組設定檔同步 begin
			if(
				document.getElementById(DDK.OptionsUICaptain.ConstantStatic.FANCY_CARDS_EXTENDS_DATA) && 
				document.getElementById(DDK.OptionsUICaptain.ConstantStatic.FANCY_CARDS_EXTENDS_DATA).innerHTML != ''
			){//有牌卡模組的擴充資料,配合同步設定檔內容
				try {//若設定檔有指定欄位就同步設定檔的變更,沒有就視同保留
					if(_config.Module.fancyCards.buttons.message.enabled != undefined) DDK.Mutual.DynamicValue.applicationPolicy.Module.fancyCards.buttons.message.enabled = _config.Module.fancyCards.buttons.message.enabled;//牌卡模組的訊息欄位啟用
					if(_config.Module.fancyCards.buttons.message.valueUIType != undefined) DDK.Mutual.DynamicValue.applicationPolicy.Module.fancyCards.buttons.message.valueUIType = _config.Module.fancyCards.buttons.message.valueUIType;//牌卡模組的訊息欄位種類
					
					if(_config.Module.fancyCards.buttons.postback.enabled != undefined) DDK.Mutual.DynamicValue.applicationPolicy.Module.fancyCards.buttons.postback.enabled = _config.Module.fancyCards.buttons.postback.enabled;//牌卡模組的資料欄位啟用
					if(_config.Module.fancyCards.buttons.postback.valueUIType != undefined) DDK.Mutual.DynamicValue.applicationPolicy.Module.fancyCards.buttons.postback.valueUIType = _config.Module.fancyCards.buttons.postback.valueUIType;//牌卡模組的資料欄位種類
				} catch(e) {  
					
				}
			}
			//--牌卡模組設定檔同步 end
		}
	}
	,
	reCall:function(){
		if(DDK.Mutual.DynamicValue.run_syncTask != null) clearInterval(DDK.Mutual.DynamicValue.run_syncTask);
		DDK.Mutual.DynamicValue.run_syncTask = null;
		DDK.Mutual.DynamicValue.syncTaskArray = null;
		//
		if(DDK.Mutual.DynamicValue.run_inVerifiTask != null) clearInterval(DDK.Mutual.DynamicValue.run_inVerifiTask);
		DDK.Mutual.DynamicValue.run_inVerifiTask = null;
		DDK.Mutual.DynamicValue.inVerifiArray = null;
		DDK.Mutual.DynamicValue.hintBox = null;
		DDK.Mutual.DynamicValue.confirmBox = null;
		DDK.Mutual.DynamicValue.waitBox = null;
		DDK.Mutual.DynamicValue.applicationPolicy = null;
	}
	,
	/**
	!送出操作模組後的JSON 資料,會先進行欄位的總驗證.
	>formInstance HTML Element|要附加JSON 資料的表單物件,若驗證無誤會在表單內追加name="templateType" 的欄位與name="jsonValue" 的欄位.
	@回傳 Object|{ret:Boolean|true 為驗證成功,false 為驗證失敗 , newForm:FormData|若驗證成功回傳的加工過的表單物件}.
	*/
	fireData:function(formInstance){
		
		var tmp;
		var alerts_ary = [];//暫存需要跳出的提示內容
		var run_alerts;//interval id
		var alertsIndex = 0;//提示內容逐一輸出時的索引值
		var alertsChk = 1;//驗證必填欄位是否填寫內容無誤,每當有欄位填寫錯誤時其值減1.
		var disabledCount = $(DDK.OptionsUICaptain.DynamicValue.botApp).find('section.' + DDK.OptionsUICaptain.DynamicValue.currentModuleName + ' .basicBubble .propsWrapper[data-card-disabled="1"][data-io="1"]').length;//檢查有多少棄用的牌卡(所屬的模組需為啟動)
		var _module = $('input[name="' + DDK.Mutual.ConstantStatic.SWITCHER_NAME + '"]:checked').val();
		var taskObj , isNotDisabled , _form , effectedModule , _JSON;
		if(_module != undefined){
			//-- 驗證欄位 begin
			for(var i = 0;i<DDK.Mutual.DynamicValue.inVerifiArray.length;i++) {
				taskObj = DDK.Mutual.DynamicValue.inVerifiArray[i];
				if(Boolean(Number($(taskObj.ioFlagTarget).attr('data-io'))) == true) {//欄位所屬模組有使用
					isNotDisabled = taskObj.disabledFlagTarget != null && Boolean(Number($(taskObj.disabledFlagTarget).attr('data-card-disabled'))) == false;//檢查欄位所屬模組需檢查有無棄用且未被棄用
					if(
						isNotDisabled == true || 
						taskObj.disabledFlagTarget == null
					){//欄位所屬模組需檢查有無棄用且未被棄用或欄位不需要檢查是否棄用者
						tmp = taskObj.finalFunc();//最終檢查結果,跳過棄用欄位
						if(tmp.ret == false){//檢查欄位有誤
							alertsChk -= 1;
							alerts_ary.push(tmp.alertFunc);//存入錯誤後的提示內容
							if(DDK.Mutual.ConstantStatic.ALLOW_CONSOLE == true){
								console.log('錯誤:' + tmp.error + '\n' + '欄位:');
								console.log(DDK.Mutual.DynamicValue.inVerifiArray[i].sourceTarget);
								console.log('------------------------------');
							}
						}
					}
				}
			}
			
			if(DDK.Mutual.ConstantStatic.ALLOW_CONSOLE == true) console.log('欄位錯誤數量:' + alerts_ary.length);
			
			
			if(alertsChk < 1) {
				//alert('仍有部分欄位未填寫或需要修正,請按照紅色標記的指引逐一完成');
				DDK.Mutual.hintBox(
					true , 
					DDK.Mutual.TextScript.HINT_BOX_FOR_FINAL_VERIFICATION[0] , 
					DDK.Mutual.TextScript.HINT_BOX_FOR_FINAL_VERIFICATION[1] + 
					alerts_ary.length + ' ' + 
					DDK.Mutual.TextScript.HINT_BOX_FOR_FINAL_VERIFICATION[2] + 
					((disabledCount == 0)? '' : '<br>' +  DDK.Mutual.TextScript.HINT_BOX_FOR_CARD_DATA_DISABLED[0] + disabledCount + ' ' + DDK.Mutual.TextScript.HINT_BOX_FOR_CARD_DATA_DISABLED[1])
				);
				run_alerts = setInterval(function()
					{
						alerts_ary[alertsIndex]();
						alertsIndex += 1;
						if(alertsIndex == alerts_ary.length) clearInterval(run_alerts);
					}
					,
					DDK.Mutual.ConstantStatic.VERIFI_INTERVAL/5
				);
				return {ret:false , code:''};//驗證失敗
			}
			//-- 驗證欄位 end
			effectedModule = (
				_module == 'TextModule' || 
				_module == 'ImageModule' || 
				_module == 'ImageCardsModule' || 
				_module == 'FancyCardsModule'
			);//排除AutoMerchandiseModule
			
			_form = new FormData(formInstance);//建立一個新的表單參照
			
			if(effectedModule == true){//確認是有效的模組類型
				//--對表單追加name="templateType" 的欄位與name="jsonValue" 的欄位 begin
				_form.append('templateType', _module);
				if(_module == 'TextModule'/*一般的文字訊息*/){
					_JSON = DDK.DataExport.TextModule.exportJSON('.TextModule');
				} else if(_module == 'ImageModule'/*一般的圖片訊息*/){
					_JSON = DDK.DataExport.ImageModule.exportJSON('.ImageModule');
				} else if(_module == 'ImageCardsModule'/*只有圖片與連結的卡牌*/){
					_JSON = DDK.DataExport.ImageCardsModule.exportJSON('.ImageCardsModule');
				} else if(_module == 'FancyCardsModule'){
					_JSON = DDK.DataExport.FancyCardsModule.exportJSON('.FancyCardsModule');
				}
				_form.append('jsonValue', _JSON);
				//--對表單追加name="templateType" 的欄位與name="jsonValue" 的欄位 end
				return {
					ret:true , 
					code:((disabledCount == 0)? '' : DDK.Mutual.TextScript.HINT_BOX_FOR_CARD_DATA_DISABLED[0] + disabledCount + ' ' + DDK.Mutual.TextScript.HINT_BOX_FOR_CARD_DATA_DISABLED[1]) , 
					newForm:_form
				};
			} else {
				return {ret:false , code:''};
			}
		} else {
			//alert('至少要選一種樣板編輯完成!');
			DDK.Mutual.hintBox(true , DDK.Mutual.TextScript.HINT_BOX_FOR_NO_TEMPLATE[0]);
			return {ret:false , code:''};
		}
	}
	,
	/**
	!呼叫操作提示對話方塊(有一個確定按鈕).
	>_cmd Boolean|true 開啟,false 關閉.
	>_title String|對話方塊大標,選擇性.
	>_text String|對話方塊內文,選擇性.
	*/
	hintBox:function(_cmd , _title , _text){
		var _box = DDK.Mutual.DynamicValue.hintBox;
		if(_cmd == true){
			if($(_box).hasClass('off') == true) $(_box).removeClass('off');
			if($(_box).find('.modal-content').hasClass('animated') == true) $(_box).find('.modal-content').removeClass('animated').removeClass('bounceIn');
			$(_box).find('.modal-content').addClass('animated').addClass('bounceIn');
		} else {
			if($(_box).hasClass('off') == false) $(_box).addClass('off');
			$(_box).find('.modal-content').removeClass('animated').removeClass('bounceIn');
			$(_box).find('.modal-body h5 , .modal-body p').empty();
		}
		if(arguments.length > 1){
			$(_box).find('.modal-body h5').html(_title);
		}
		if(arguments.length > 2){
			$(_box).find('.modal-body p').html(_text);
		}
	}
	,
	/**
	!呼叫確認操作提示方塊(有取消與確認按鈕).
	>_cmd Boolean|true 開啟,false 關閉.
	>confirmFunc Function|按下確認按鈕後要執行的細節. 
	>discardFunc Function|按下取消按鈕後要執行的細節.
	>_title String|對話方塊大標,選擇性.
	>_text String|對話方塊內文,選擇性.
	*/
	confirmBox:function(_cmd , confirmFunc , discardFunc , _title , _text){
		var _box = DDK.Mutual.DynamicValue.confirmBox;
		if(_cmd == true){
			if($(_box).hasClass('off') == true) $(_box).removeClass('off');
			if($(_box).find('.modal-content').hasClass('animated') == true) $(_box).find('.modal-content').removeClass('animated').removeClass('bounceIn');
			$(_box).find('.modal-content').addClass('animated').addClass('bounceIn');
			FxAddEventListener(
				$(DDK.Mutual.DynamicValue.confirmBox).find('.sureBtn')[0] , 
				DDK.Mutual.EventType.ConstantStatic.CLICK,
				function(e){
					confirmFunc();//延遲觸發
					DDK.Mutual.confirmBox(false);
				}
				,
				false
			);
			FxAddEventListener(
				$(DDK.Mutual.DynamicValue.confirmBox).find('.closeX , .closeBtn') , 
				DDK.Mutual.EventType.ConstantStatic.CLICK,
				function(e){
					discardFunc();//延遲觸發
					DDK.Mutual.confirmBox(false);
				}
				,
				false
			);
			
		} else {
			if($(_box).hasClass('off') == false) $(_box).addClass('off');
			$(_box).find('.modal-content').removeClass('animated').removeClass('bounceIn');
			$(_box).find('.modal-body h5 , .modal-body p').empty();
			FxRemoveEachEventListener($(DDK.Mutual.DynamicValue.confirmBox).find('.sureBtn')[0]);
			FxRemoveEachEventListener($(DDK.Mutual.DynamicValue.confirmBox).find('.closeBtn')[0]);
			FxRemoveEachEventListener($(DDK.Mutual.DynamicValue.confirmBox).find('.closeX')[0]);
		}
		if(arguments.length > 2){
			$(_box).find('.modal-body h5').text(_title);
		}
		if(arguments.length > 3){
			$(_box).find('.modal-body p').text(_text);
		}
	}
	,
	/**
	!呼叫等待對話方塊.
	>_cmd Boolean|true 開啟,false 關閉.
	>_title String|對話方塊大標,選擇性.
	>_text String|對話方塊內文,選擇性.
	*/
	waitBox:function(_cmd , _title , _text){
		if(DDK.Mutual.ConstantStatic.ALLOW_CONSOLE == true)console.log(_text);
		var _box = DDK.Mutual.DynamicValue.waitBox;
		if(_cmd == true){
			if($(_box).hasClass('off') == true) $(_box).removeClass('off');
			if($(_box).find('.modal-content').hasClass('animated') == true) $(_box).find('.modal-content').removeClass('animated').removeClass('bounceIn');
			$(_box).find('.modal-content').addClass('animated').addClass('bounceIn');
		} else {
			if($(_box).hasClass('off') == false) $(_box).addClass('off');
			$(_box).find('.modal-content').removeClass('animated').removeClass('bounceIn');
			$(_box).find('.modal-body h5 , .modal-body p').empty();
		}
		if(arguments.length > 2){
			$(_box).find('.modal-body h5').text(_title);
		}
		if(arguments.length > 3){
			$(_box).find('.modal-body p').text(_text);
		}
	}
	,
	/**
	!欄位內容鏡射至目標元素同步任務.
	*/
	SyncTask:{
		/**
		!加入新的同步執行內容.
		>_taskObj Object|{sourceTarget:HTML Object|欄位元素 , sourceRoot:jQuery Object|欄位的某一層具有data-io 屬性的父系物件 , equalFunc:Function|同步內容}同步執行內容.
		*/
		addTask : function(_taskObj){
			$(_taskObj.sourceTarget).attr('data-sync-task' , 'watched');
			DDK.Mutual.DynamicValue.syncTaskArray.push(_taskObj);
		}
		,
		executeSyncTask:function(){
			if(DDK.Mutual.DynamicValue.syncTaskArray.length == 0) return;//跳出
			for(var i = 0;i<DDK.Mutual.DynamicValue.syncTaskArray.length;i++) {
				DDK.Mutual.DynamicValue.syncTaskArray[i].equalFunc();//執行內存的同步工作
			}
		}
		,
		/**
		!啟動以setInterval 連續執行的鏡射同步任務.
		*/
		activateSyncTask : function(){
			DDK.Mutual.SyncTask.executeSyncTask();

			DDK.Mutual.DynamicValue.run_syncTask = setInterval(
				DDK.Mutual.SyncTask.executeSyncTask
				,
				DDK.Mutual.ConstantStatic.SYNC_INTERVAL
			);
			
		}
		,
		/**
		!清空任務.
		*/
		emptyTasks:function(){
			DDK.Mutual.DynamicValue.syncTaskArray = [];
		}
		,
		/**
		!關閉以setInterval 連續執行的鏡射同步任務.
		*/
		discardTaskExecution : function(){
			clearInterval(DDK.Mutual.DynamicValue.run_syncTask);
		}
	}
	,
	/**
	!欄位內容驗證同步任務.
	*/
	InVerifiTask:{
		addTask : function(_taskObj){
			$(_taskObj.sourceTarget).attr('data-verifi-task' , 'watched');
			DDK.Mutual.DynamicValue.inVerifiArray.push(_taskObj);
		}
		,
		executeVerifiTask:function(){
			if(DDK.Mutual.DynamicValue.inVerifiArray.length == 0) return;//跳出
			var taskObj;
			for(var i = 0;i<DDK.Mutual.DynamicValue.inVerifiArray.length;i++) {
				taskObj = DDK.Mutual.DynamicValue.inVerifiArray[i];
				if(taskObj.disabledFlagTarget == null){//欄位不需要檢查是否棄用
					if(Boolean(Number($(taskObj.ioFlagTarget).attr('data-io'))) == true) {//欄位所屬模組有使用
						taskObj.validateFunc();//執行內存的驗證工作
						if(taskObj.alertTarget != null) taskObj.updateAlertPosition();
					} else {
						taskObj.deleteAlertTarget();//移除提示方塊
					}
				} else {//欄位需要檢查是否棄用
					if(
						Boolean(Number($(taskObj.ioFlagTarget).attr('data-io'))) == true && 
						Boolean(Number($(taskObj.disabledFlagTarget).attr('data-card-disabled'))) == false
					) {//欄位所屬模組有使用且未被設定棄用
						taskObj.validateFunc();//執行內存的驗證工作
						if(taskObj.alertTarget != null) taskObj.updateAlertPosition();
					} else {
						taskObj.deleteAlertTarget();//移除提示方塊
					}
				}
				
			}
		}
		,
		/**
		!啟動以setInterval 連續執行的欄位驗證任務.
		*/
		activateVerifiTask : function(){
			DDK.Mutual.InVerifiTask.executeVerifiTask();
			DDK.Mutual.DynamicValue.run_inVerifiTask = setInterval(
				DDK.Mutual.InVerifiTask.executeVerifiTask
				,
				DDK.Mutual.ConstantStatic.VERIFI_INTERVAL
			);
			
		}
		,
		/**
		!清空任務.
		*/
		emptyTasks:function(){
			DDK.Mutual.DynamicValue.inVerifiArray = [];
		}
		,
		/**
		!關閉以setInterval 連續執行的欄位驗證任務.
		*/
		discardTaskExecution : function(){
			clearInterval(DDK.Mutual.DynamicValue.run_inVerifiTask);
			
		}
	}
	,
	/**
	!文字常數集.
	*/
	TextScript:{
		OPEN_LABEL_URL:'是否要開啟這個網址?若您的網址在訊息在Line 推播前有需要保密,請按"取消"。',
		HINT_BOX_FOR_NO_TEMPLATE:['至少要選一種樣板編輯完成!'],
		HINT_BOX_FOR_FINAL_VERIFICATION:['欄位資料填寫錯誤或異常' , '您仍有' , '項欄位未填寫或需要修正，請用滑鼠碰觸欄位旁的紅色標記，並依據指引逐一調整。'],
		HINT_BOX_FOR_CARD_DATA_DISABLED:['您仍有將' , '張牌卡設定為棄用狀態，設定為棄用的牌卡的資料不會被送出。'],
		INPUT_TEXT_OVER_RANGE:['輸入字數不能超過','目前是','個字。'],
		INPUT_TEXT_EMPTY:['此為必填欄位。','至少要填','個字。'],
		SELECT_BOX_UNSELECTED:['此為必選欄位，請從下拉選項中挑選。'],
		INPUT_URI_FAILUE:['請確認填入的是有效的網址。'],
		SELECTED_FILE_EMPTY:['檔案未選取。請選取' , '個檔案。'],
		SELECTED_FILE_OVER_COUNT:['檔案選取數量錯誤。只能選擇' , '個檔案。'],
		SELECTED_FILE_OVER_SIZE:['選取檔案位元數過大。不能超過'  ,  'Mb。'],
		SELECTED_FILE_FORMAT_ERROR:['檔案格式不正確。僅限於' , '這' , '種檔案。'],
		SELECT_FILE_TYPE_UNKNOW:['檔案格式未知。無法辨識的檔案格式。（' , '）']
	}
};
/**
!初始化與管理選擇模板,模板數量...等操作介面.
*/
DDK.OptionsUICaptain = {
		ConstantStatic:{
			INPUT_TIP_BOX:'inputTip'/*驗證欄位用的對話框*/,
			TEMPLATE_TEXT_MODULE:'fancyTextFull'/*文字訊息的完整模板*/,
			TEMPLATE_IMAGE_MODULE:'soloMsgImageFull'/*圖片訊息的完整模板*/,
			TEMPLATE_IMAGE_CARDS_NUMBERS_BTN:'imageCardsNumbersButton'/*圖片訊息(多張)的牌卡數量選擇按鈕模板*/,
			IMAGE_CARDS_NUMBERS_COUNTS:10/*圖片訊息(多張)的牌卡數量總數*/,
			TEMPLATE_IMAGE_CARDS_SINGLE_CARD:'imageCardsSingleCard'/*圖片訊息(多張)的單張牌卡模板*/,
			TEMPLATE_IMAGE_CARDS_MODULE:'imageCardsFull'/*圖片訊息(多張)的完整模板,需組合'imageCardsNumbersButton' 與'imageCardsSingleCard' 才是模組的完整狀態*/,
			TEMPLATE_FANCY_CARDS_NUMBERS_BTN:'fancyCardsNumbersButton'/*牌卡訊息的牌卡數量選擇按鈕模板*/,
			FANCY_CARDS_NUMBERS_COUNTS:10/*牌卡訊息的牌卡數量總數*/,
			TEMPLATE_FANCY_CARDS_OPTIONS_BTN:'FancyCardsOptionsButton'/*牌卡訊息的牌卡圖片,標題...啟用按鈕模板*/,
			TEMPLATE_FANCY_CARDS_ACTIONS_MIRROR_TARGET:'FancyCardsActionsMirrorTarget'/*牌卡訊息的單張牌卡上的動作鏡射目標模板*/,
			TEMPLATE_FANCY_CARDS_ACTIONS_SETTING_BUTTON:'FancyCardsActionsSettingButton'/*牌卡訊息的單張牌卡上的動作項目設定按鈕模板*/,
			TEMPLATE_FANCY_CARDS_SINGLE_CARD:'FancyCardsSingleCard'/*牌卡訊息的單張牌卡模板,需組合'FancyCardsActionsMirrorTarget' 與'FancyCardsActionsSettingButton' 才是一張牌卡的完整狀態*/,
			TEMPLATE_FANCY_CARDS_MODULE:'fancyCardsFull'/*牌卡訊息的完整模板,需組合'FancyCardsSingleCard' 才是模組的完整狀態*/,
			TEMPLATE_IMPORTED:false,
			MODULE_WRAPPER_CLASS_NAME:'webBotDesigner'/*整個作業區*/,
			MODULE_SWITCH_BTN_NAME:'template-type'/*切換樣板的input 的name*/,
			RESTORE_PROCESSS_CLASS_NAME:'restoreProcess'/*既有資料回設動畫*/,
			RESTORE_PROCESSS_INTERVAL:450/*既有資料回設速度*/,
			BUBBLE_DISABLED_CLASS:'bubbleDisabled',
			FANCY_CARDS_EXTENDS_DATA:'fancyCardsExtendsData'/*牌卡訊息的擴充資料,可能會有"訊息"或"資料"改為下拉式選項時的資料內容*/,
			
		}
		,
		DynamicValue:{
			botApp:null/*整個Bot Designer 的最外層容器*/,
			FancyCardsModuleReady:null/*FancyCardsModule 是否初始化過,永遠只初始化一次*/,
			ImageCardsModuleReady:null/*ImageCardsModule 是否初始化過,永遠只初始化一次*/,
			ImageModuleReady:null/*ImageModule 是否初始化過,永遠只初始化一次*/,
			TextModuleReady:null/*FancyCardsModule 是否初始化過,永遠只初始化一次*/,
			run_restore_process:null/*執行既有資料將畫面回設的Interval Id*/,
			currentModuleName:null/*運作中的模板名稱*/,
			run_FancyCardsModuleSize:null/*執行更新FancyCardsModule 的板面高度最佳化*/,
			canFancyCardsModuleUpdateSize:null
		}
		,
		init:function(){
			if(DDK.OptionsUICaptain.ConstantStatic.TEMPLATE_IMPORTED == false){//永遠只執行一次,不受reCall 影響
				DDK.OptionsUICaptain.ConstantStatic.INPUT_TIP_BOX = 
				document.getElementById(DDK.OptionsUICaptain.ConstantStatic.INPUT_TIP_BOX).innerHTML;//取得id 內字串
				
				DDK.OptionsUICaptain.ConstantStatic.TEMPLATE_TEXT_MODULE = 
				document.getElementById(DDK.OptionsUICaptain.ConstantStatic.TEMPLATE_TEXT_MODULE).innerHTML;//取得id 內字串
			
				DDK.OptionsUICaptain.ConstantStatic.TEMPLATE_IMAGE_MODULE = 
				document.getElementById(DDK.OptionsUICaptain.ConstantStatic.TEMPLATE_IMAGE_MODULE).innerHTML;//取得id 內字串
				
				DDK.OptionsUICaptain.ConstantStatic.TEMPLATE_IMAGE_CARDS_NUMBERS_BTN = document.getElementById(DDK.OptionsUICaptain.ConstantStatic.TEMPLATE_IMAGE_CARDS_NUMBERS_BTN).innerHTML;/*
				取得id 內字串,
				置換標籤[##serialValue1~10##:1~10 或更多的整數值] , [##checked##:'checked'或'']
				*/
				
				DDK.OptionsUICaptain.ConstantStatic.TEMPLATE_IMAGE_CARDS_SINGLE_CARD = 
				document.getElementById(DDK.OptionsUICaptain.ConstantStatic.TEMPLATE_IMAGE_CARDS_SINGLE_CARD).innerHTML;/*
				取得id 內字串,
				置換標籤[##cardSerialValue0~9##:0~9 或更多的整數值] , [##0|1##:0或1的值],[##serialValue0~9##:0~9 或更多的整數值]
				*/
				
				DDK.OptionsUICaptain.ConstantStatic.TEMPLATE_IMAGE_CARDS_MODULE = document.getElementById(DDK.OptionsUICaptain.ConstantStatic.TEMPLATE_IMAGE_CARDS_MODULE).innerHTML;/*
				取得id 內字串,
				置換標籤[##numbersButton##:置入正確數量的按鈕] , [##singleCard##:置入正確數量的單張牌卡]
				*/
				
				DDK.OptionsUICaptain.ConstantStatic.TEMPLATE_FANCY_CARDS_NUMBERS_BTN = 
				document.getElementById(DDK.OptionsUICaptain.ConstantStatic.TEMPLATE_FANCY_CARDS_NUMBERS_BTN).innerHTML;/*
				取得id 內字串,
				置換標籤[##serialValue1~10##:1~10 或更多的整數值] , [##checked##:'checked'或'']
				*/
				
				DDK.OptionsUICaptain.ConstantStatic.TEMPLATE_FANCY_CARDS_OPTIONS_BTN = 
				document.getElementById(DDK.OptionsUICaptain.ConstantStatic.TEMPLATE_FANCY_CARDS_OPTIONS_BTN).innerHTML;/*
				取得id 內字串,
				置換標籤[##serialValue0~9##:0~9 或更多的整數值]
				*/
				
				DDK.OptionsUICaptain.ConstantStatic.TEMPLATE_FANCY_CARDS_ACTIONS_MIRROR_TARGET = 
				document.getElementById(DDK.OptionsUICaptain.ConstantStatic.TEMPLATE_FANCY_CARDS_ACTIONS_MIRROR_TARGET).innerHTML;/*
				取得id 內字串,
				置換標籤[##serialValue0~9##:0~9 或更多的整數值] , [##serialValue0~2##:0~2 的整數值]
				*/
				
				DDK.OptionsUICaptain.ConstantStatic.TEMPLATE_FANCY_CARDS_ACTIONS_SETTING_BUTTON = 
				document.getElementById(DDK.OptionsUICaptain.ConstantStatic.TEMPLATE_FANCY_CARDS_ACTIONS_SETTING_BUTTON).innerHTML;/*
				取得id 內字串,
				置換標籤[##serialValue0~9##:0~9 或更多的整數值] , [##serialValue0~2##:0~2 的整數值] , [##serialValue1~3##:1~3 的整數值]
				*/
				
				DDK.OptionsUICaptain.ConstantStatic.TEMPLATE_FANCY_CARDS_SINGLE_CARD = 
				document.getElementById(DDK.OptionsUICaptain.ConstantStatic.TEMPLATE_FANCY_CARDS_SINGLE_CARD).innerHTML;/*
				取得id 內字串,
				置換標籤[##cardSerialValue0~9##:0~9 或更多的整數值] , [##0|1##:0或1的值] , [##serialValue0~9##:0~9 或更多的整數值] , [##fancyCardsActions1MirrorTarget##:動作按鈕1 的鏡射目標] , [##fancyCardsActions2MirrorTarget##:動作按鈕2 的鏡射目標] , [##fancyCardsActions3MirrorTarget##:動作按鈕3 的鏡射目標] , [fancyCardsActions1ButtonOptions:牌卡文字標籤按鈕設定-1] , [fancyCardsActions2ButtonOptions:牌卡文字標籤按鈕設定-2] , [fancyCardsActions3ButtonOptions:牌卡文字標籤按鈕設定-3]*/
				
				DDK.OptionsUICaptain.ConstantStatic.TEMPLATE_FANCY_CARDS_MODULE = 
				document.getElementById(DDK.OptionsUICaptain.ConstantStatic.TEMPLATE_FANCY_CARDS_MODULE).innerHTML;/*
				取得id 內字串,
				置換標籤[##numbersButton##:置入正確數量的按鈕] , [##optionsButton##:置入牌卡的動作項目按鈕] , [##singleCard##:置入正確數量的單張牌卡]
				*/
				
				if(
					document.getElementById(DDK.OptionsUICaptain.ConstantStatic.FANCY_CARDS_EXTENDS_DATA) && 
					document.getElementById(DDK.OptionsUICaptain.ConstantStatic.FANCY_CARDS_EXTENDS_DATA).innerHTML != ''
				){//有牌卡的擴充資料
					DDK.OptionsUICaptain.ConstantStatic.FANCY_CARDS_EXTENDS_DATA = 
				JSON.parse(document.getElementById(DDK.OptionsUICaptain.ConstantStatic.FANCY_CARDS_EXTENDS_DATA).innerHTML);//取得id 內字串並轉為Object 形態
				} else {
					DDK.OptionsUICaptain.ConstantStatic.FANCY_CARDS_EXTENDS_DATA = null;
				}
				
				
				DDK.OptionsUICaptain.ConstantStatic.TEMPLATE_IMPORTED = true;
			}
			
			
			DDK.OptionsUICaptain.DynamicValue.botApp = $('.' + DDK.OptionsUICaptain.ConstantStatic.MODULE_WRAPPER_CLASS_NAME)[0];
			DDK.OptionsUICaptain.DynamicValue.FancyCardsModuleReady = false;
			DDK.OptionsUICaptain.DynamicValue.ImageCardsModuleReady = false;
			DDK.OptionsUICaptain.DynamicValue.ImageModuleReady = false;
			DDK.OptionsUICaptain.DynamicValue.TextModuleReady = false;
			DDK.OptionsUICaptain.DynamicValue.canFancyCardsModuleUpdateSize = true;
			//--是否有某種樣板的JSON 資料存在網頁上,須將JSON 內容回填至對應的樣板欄位內 begin
			var existData = DDK.DataImport.restoreData();
			if(existData != null){
				
				$('input[name="' + DDK.OptionsUICaptain.ConstantStatic.MODULE_SWITCH_BTN_NAME + '"][value="' + existData.trueModule + '"]').prop('checked' , true);//existData.trueModule 設定空白模板按鈕的對應
				$('input[name="' + DDK.OptionsUICaptain.ConstantStatic.MODULE_SWITCH_BTN_NAME + '"]').prop('disabled' , true);
				DDK.OptionsUICaptain.DynamicValue.canFancyCardsModuleUpdateSize = false;
				DDK.OptionsUICaptain.switchModule(existData.module , existData.isReadOnly);
				var restoreAry = DDK.ModuleKit.restoreModuleByData($('.' + DDK.OptionsUICaptain.ConstantStatic.MODULE_WRAPPER_CLASS_NAME + ' .' + existData.module) , existData.data);


				
				var processAni = $('.' + DDK.OptionsUICaptain.ConstantStatic.MODULE_WRAPPER_CLASS_NAME + ' .' + DDK.OptionsUICaptain.ConstantStatic.RESTORE_PROCESSS_CLASS_NAME);
				processAni.find('.current').text(0);
				processAni.find('.total').text(restoreAry.length);
				processAni.find('.progress-bar').css({'width':'10%'});
				processAni.removeClass('off');
				var index = 0;
				DDK.OptionsUICaptain.DynamicValue.run_restore_process = setInterval(
					function(){
						restoreAry[index].redo();
						index += 1;
						processAni.find('.current').text(index);
						processAni.find('.progress-bar').css({'width':(Math.floor((index/restoreAry.length)*100)) + '%'});
						if(index == restoreAry.length) {
							clearInterval(DDK.OptionsUICaptain.DynamicValue.run_restore_process);
							DDK.OptionsUICaptain.DynamicValue.canFancyCardsModuleUpdateSize = true;
							processAni.addClass('animated').addClass('fadeOut');
							$('input[name="' + DDK.OptionsUICaptain.ConstantStatic.MODULE_SWITCH_BTN_NAME + '"]').prop('disabled' , false);
							setTimeout(
								function(){
									processAni.removeClass('animated').removeClass('fadeOut').addClass('off');
								},
								1500
							)
						}
					}
					,
					(restoreAry.length > 20) ? DDK.OptionsUICaptain.ConstantStatic.RESTORE_PROCESSS_INTERVAL/10 : DDK.OptionsUICaptain.ConstantStatic.RESTORE_PROCESSS_INTERVAL
				);
				if(DDK.Mutual.ConstantStatic.ALLOW_CONSOLE == true) console.log(restoreAry);
				
			}
			//--是否有某種樣板的JSON 資料存在網頁上,須將JSON 內容回填至對應的樣板欄位內 end
		}
		,
		reCall:function(){
			var _ary = $(DDK.OptionsUICaptain.DynamicValue.botApp).find('[fx-event-ids]');
			for(var i = 0;i<_ary.length;i++) FxRemoveEachEventListener(_ary[i]);//清除註冊的事件
			$(DDK.OptionsUICaptain.DynamicValue.botApp).find('.fullTemplate').remove();//清除動態產生的網頁內容
			$(DDK.OptionsUICaptain.DynamicValue.botApp).find('>section').addClass('off').attr('data-io' , '0');//回到預設狀態
			DDK.OptionsUICaptain.DynamicValue.botApp = null;
			DDK.OptionsUICaptain.DynamicValue.FancyCardsModuleReady = null;
			DDK.OptionsUICaptain.DynamicValue.ImageCardsModuleReady = null;
			DDK.OptionsUICaptain.DynamicValue.ImageModuleReady = null;
			DDK.OptionsUICaptain.DynamicValue.TextModuleReady = null;
			if(DDK.OptionsUICaptain.DynamicValue.run_restore_process != null) clearInterval(DDK.OptionsUICaptain.DynamicValue.run_restore_process);
			DDK.OptionsUICaptain.DynamicValue.run_restore_process = null;
			if(DDK.OptionsUICaptain.DynamicValue.run_FancyCardsModuleSize != null) clearInterval(DDK.OptionsUICaptain.DynamicValue.run_FancyCardsModuleSize);
			DDK.OptionsUICaptain.DynamicValue.run_FancyCardsModuleSize = null;
			DDK.OptionsUICaptain.DynamicValue.currentModuleName = null;
			DDK.OptionsUICaptain.DynamicValue.canFancyCardsModuleUpdateSize = null;
			
		}
		,
		/**
		!切換要使用的模組,並在切換時進行初始化.
		>_moduleName String|每個模組的CSS 樣式名稱.
		>_readOnly Boolean|是否為唯讀模式.true 唯讀.
		*/
		switchModule:function(_moduleName , _readOnly){
			if($(DDK.OptionsUICaptain.DynamicValue.botApp).hasClass('off') == true){
				$(DDK.OptionsUICaptain.DynamicValue.botApp).removeClass('off');
			}
			var trueModuleName = _moduleName;//保留真實的模組名稱
			if(_moduleName == 'AutoMerchandiseModule') _moduleName = 'FancyCardsModule';//特殊,若為商品模組視為'FancyCardsModule'
			DDK.OptionsUICaptain.DynamicValue.currentModuleName = _moduleName;//暫存使用中的模組名稱
			var currentModule = $(DDK.OptionsUICaptain.DynamicValue.botApp).find('>section.' + _moduleName)[0];//取得對應的模組參照
			DDK.Mutual.InVerifiTask.emptyTasks();//清除所有驗證欄位的任務
			
			if(_readOnly == true) {//資料為唯讀模式
				$(currentModule).addClass('locked');//模組畫面中的設定用欄位段落隱藏
			} else {
				$(DDK.OptionsUICaptain.DynamicValue.botApp).find('>section').removeClass('locked');
			}
			if(DDK.OptionsUICaptain.DynamicValue.run_FancyCardsModuleSize != null) clearInterval(DDK.OptionsUICaptain.DynamicValue.run_FancyCardsModuleSize);
			DDK.OptionsUICaptain.DynamicValue.run_FancyCardsModuleSize = null;

			switch(_moduleName) {
				case 'FancyCardsModule':
				if(DDK.OptionsUICaptain.DynamicValue.FancyCardsModuleReady == false){
					DDK.OptionsUICaptain.activeDesignerFancyCardsModule(currentModule , _readOnly);//建構畫面,此處建立的畫面已根據設定檔作過調整
					
					var _ary = [
						['.numbersCount.cards input[type="radio"]' , DDK.OptionsUICaptain.cardsNumberSelection]/*對數量選擇按鈕加入事件*/,
						['.numbersCount.cards input[type="radio"]' , DDK.OptionsUICaptain.fancyCardsUpdateActionButtonIO]/*牌卡數量變更時,更新所有牌卡的動作按鈕的data-io 值*/,
						['.numbersCount.cards input[type="radio"]' , DDK.OptionsUICaptain.fancyCardsUpdateFileInputIO]/*牌卡數量變更時,更新所有牌卡的檔案上傳欄位的data-io 值*/,
						['.numbersCount.cards input[type="radio"]' , DDK.OptionsUICaptain.fancyCardsUpdateMainTitleIO]/*牌卡數量變更時,更新所有牌卡的大標欄位的data-io 值*/,
						['.numbersCount.cards input[type="radio"]' , DDK.OptionsUICaptain.fancyCardsUpdateSubTitleIO]/*牌卡數量變更時,更新所有牌卡的主標欄位的data-io 值*/,
						['.numbersCount.thumb input[type="radio"]' , DDK.OptionsUICaptain.fancyCardsEnableThumbnail]/*對縮圖啟用按鈕加入事件*/,
						['.numbersCount.title input[type="radio"]' , DDK.OptionsUICaptain.fancyCardsEnableTitle]/*對大標啟用按鈕加入事件*/,
						['.numbersCount.title input[type="radio"]' , DDK.OptionsUICaptain.fancyCardsUpdateMainTitleIO]/*大標啟用變更時,更新所有牌卡的大標欄位的data-io 值*/,
						['.numbersCount.actions input[type="radio"]' , DDK.OptionsUICaptain.fancyCardsSetActionButtonNumbers]/*對變更動作按鈕數量加入事件*/,
						['.numbersCount.actions input[type="radio"]' , DDK.OptionsUICaptain.fancyCardsUpdateActionButtonIO]/*動作按鈕數量變更時,更新所有牌卡的動作按鈕的data-io 值*/,
						['.fancyCardsBubble .propsWrapper .actionsGroup input[type="radio"]' , DDK.OptionsUICaptain.fancyCardsSwitchActionType]/*對動作按鈕模式的切換加入事件*/
					];
					for(var i = 0;i<_ary.length;i++) {
						FxAddEventListener(
							$(currentModule).find(_ary[i][0]) , 
							DDK.Mutual.EventType.ConstantStatic.RADIO_CHANGE,
							_ary[i][1],
							false
						);
					};//對數量選擇,縮圖,大標,動作按鈕數量,動作種類按鈕加入事件
					
					FxAddEventListener(
						$(currentModule).find('.disableCardBtn') , 
						DDK.Mutual.EventType.ConstantStatic.CLICK,
						DDK.OptionsUICaptain.cardsBeDisabled,
						false
					);//對棄用牌卡按鈕加入事件
					FxAddEventListener(
						$(currentModule).find('.swapBtn') , 
						DDK.Mutual.EventType.ConstantStatic.CLICK,
						DDK.OptionsUICaptain.arrangeCardsSerial,
						false
					);//對交換牌卡按鈕加入事件
					
					
					
					DDK.OptionsUICaptain.fancyCardsUpdateActionButtonIO({
						currentTarget:$(currentModule).find('.numbersCount.cards input[type="radio"]')[0]
					});//強制更新牌卡數量是1的時候,所有牌卡內的動作按鈕data-io 值
					DDK.OptionsUICaptain.fancyCardsUpdateFileInputIO({
						currentTarget:$(currentModule).find('.numbersCount.cards input[type="radio"]')[0]
					});//強制更新牌卡數量是1的時候,所有牌卡內的檔案上傳欄位的data-io 值
					DDK.OptionsUICaptain.fancyCardsUpdateMainTitleIO({
						currentTarget:$(currentModule).find('.numbersCount.cards input[type="radio"]')[0]
						,
						test:'switchModule'
					});//強制更新牌卡數量是1的時候,所有牌卡內的大標欄位的data-io 值
					DDK.OptionsUICaptain.fancyCardsUpdateSubTitleIO({
						currentTarget:$(currentModule).find('.numbersCount.cards input[type="radio"]')[0]
					});//強制更新牌卡數量是1的時候,所有牌卡內的主標欄位的data-io 值
					
					DDK.OptionsUICaptain.DynamicValue.FancyCardsModuleReady = true;
				}
				DDK.OptionsUICaptain.DynamicValue.run_FancyCardsModuleSize = setInterval(DDK.OptionsUICaptain.fancyCardsViewSizeUpdate , DDK.OptionsUICaptain.ConstantStatic.RESTORE_PROCESSS_INTERVAL);//更新編輯區域的高度修正
				break;
				case 'ImageCardsModule':
				if(DDK.OptionsUICaptain.DynamicValue.ImageCardsModuleReady == false){
					DDK.OptionsUICaptain.activeDesignerImageCardsModule(currentModule , _readOnly);//建構畫面
					var _ary = [
						['.numbersCount input[type="radio"]' , DDK.OptionsUICaptain.cardsNumberSelection]/*對數量選擇按鈕加入事件*/,
						['.numbersCount input[type="radio"]' , DDK.OptionsUICaptain.imageCardsUpdateActionButtonIO]/*牌卡數量變更時,更新所有牌卡的動作按鈕的data-io 值*/,
						['.numbersCount input[type="radio"]' , DDK.OptionsUICaptain.imageCardsUpdateFileInputIO]/*牌卡數量變更時,更新所有牌卡的檔案上傳欄位的data-io 值*/
					];
					for(var i = 0;i<_ary.length;i++) {
						FxAddEventListener(
							$(currentModule).find(_ary[i][0]) , 
							DDK.Mutual.EventType.ConstantStatic.RADIO_CHANGE,
							_ary[i][1],
							false
						);
					};//對數量選擇加入事件
					
					FxAddEventListener(
						$(currentModule).find('.disableCardBtn') , 
						DDK.Mutual.EventType.ConstantStatic.CLICK,
						DDK.OptionsUICaptain.cardsBeDisabled,
						false
					);//對棄用牌卡按鈕加入事件
					FxAddEventListener(
						$(currentModule).find('.swapBtn') , 
						DDK.Mutual.EventType.ConstantStatic.CLICK,
						DDK.OptionsUICaptain.arrangeCardsSerial,
						false
					);//對交換牌卡按鈕加入事件
					
					DDK.OptionsUICaptain.imageCardsUpdateActionButtonIO({
						currentTarget:$(currentModule).find('.numbersCount input[type="radio"]')[0]
					});//強制更新牌卡數量是1的時候,所有牌卡內的動作按鈕data-io 值
					DDK.OptionsUICaptain.imageCardsUpdateFileInputIO({
						currentTarget:$(currentModule).find('.numbersCount input[type="radio"]')[0]
					});//強制更新牌卡數量是1的時候,所有牌卡內的檔案上傳欄位的data-io 值
					
					DDK.OptionsUICaptain.DynamicValue.ImageCardsModuleReady = true;
				}
				break;
				case 'ImageModule':
				if(DDK.OptionsUICaptain.DynamicValue.ImageModuleReady == false){
					DDK.OptionsUICaptain.activeDesignerImageModule(currentModule , _readOnly);//建構畫面
					DDK.OptionsUICaptain.DynamicValue.ImageModuleReady = true;
				}
				break;
				case 'TextModule':
				if(DDK.OptionsUICaptain.DynamicValue.TextModuleReady == false){
					DDK.OptionsUICaptain.activeDesignerTextModule(currentModule , _readOnly);//建構畫面
					DDK.OptionsUICaptain.DynamicValue.TextModuleReady = true;
				}
				break;
				case 'AutoMerchandiseModule':
				//特殊,僅處理畫面的開啟或關閉
				
				break;
			}
			
			DDK.OptionsUICaptain.openModuleView(trueModuleName);//切換不同模組的顯示
			
		}
		,
		/**
		!開啟指定的模組畫面.
		>_moduleName String|要開啟的模組名稱.
		*/
		openModuleView:function(_moduleName){
			
			var _ary = $(DDK.OptionsUICaptain.DynamicValue.botApp).find('>section');
			if(_moduleName == 'AutoMerchandiseModule'){//特殊,僅處理畫面的開啟或關閉
				
				for(var i = 0;i<_ary.length;i++){
					$(_ary[i]).attr('data-io' , '0').addClass('off');
				}
			} else {
				
				for(var i = 0;i<_ary.length;i++){
					if($(_ary[i]).hasClass(_moduleName) == true){
						$(_ary[i]).attr('data-io' , '1').removeClass('off');
					} else {
						$(_ary[i]).attr('data-io' , '0').addClass('off');
					}
				}
			}
		}
		,
		/**
		!清除掉畫面上沒有使用的模組.
		*/
		discardUselessModule:function(){
			var _moduleName = DDK.OptionsUICaptain.DynamicValue.currentModuleName;
			var currentModule = $(DDK.OptionsUICaptain.DynamicValue.botApp).find('>section.' + _moduleName);//使用中的模組
			var moudlue_ary = $(DDK.OptionsUICaptain.DynamicValue.botApp).find('>section').not('.' + _moduleName);//以外的模組
			var activeObject_ary = $(DDK.OptionsUICaptain.DynamicValue.botApp).find('>section').not('.' + _moduleName).find('[fx-event-ids]');
			for(i = 0;i<activeObject_ary.length;i++){
				FxRemoveEachEventListener(activeObject_ary[i]);
			}
			moudlue_ary.empty();
			
		}
		,
		/**
		!清除掉模組中沒有使用的欄位.
		*/
		discardUselessDataInModule:function(){
			var _moduleName = DDK.OptionsUICaptain.DynamicValue.currentModuleName;
			if(_moduleName == 'ImageCardsModule'){
				$(DDK.OptionsUICaptain.DynamicValue.botApp).find('>section.' + _moduleName).find('[data-scope="node"][data-key="columns"][data-io="0"]').empty();
			} else if(_moduleName == 'FancyCardsModule'){
				$(DDK.OptionsUICaptain.DynamicValue.botApp).find('>section.' + _moduleName).find('[data-scope="node"][data-key="columns"][data-io="0"]').empty();
				$(DDK.OptionsUICaptain.DynamicValue.botApp).find('>section.' + _moduleName).find('[data-scope="node"][data-key="columns"][data-io="1"] [data-io="0"]').remove();
			}
			
		}
		,
		/**
		!切換棄用牌卡設定的接收函數.
		*/
		cardsBeDisabled:function(e){
			var _t = e.currentTarget;
			var _card = $(_t).closest('.basicBubble')[0];
			var bubbleMax = 0;
			var _ary = $(_card).parent().find('.basicBubble');//所有的牌卡
			for(var i = 0;i<_ary.length;i++){
				if($(_ary[i]).hasClass('off') == false) bubbleMax++;//過濾啟用中的牌卡
			}
			if(bubbleMax == 1) return;//只有一張牌卡,跳出
			if(Boolean(Number($(_t).attr('data-deactived'))) == true){//棄用中,解除棄用
				$(_t).attr('data-deactived' , '0');//使用
				$(_t).find('.labelEnabled').addClass('off');
				$(_t).find('.labelDisabled').removeClass('off');
				$(_card).find('.propsWrapper').attr('data-card-disabled' , '0');
				$(_card).find('.propsWrapper').find('input[type="text"] , input[type="file"]').prop('disabled' , false);
				$(_card).removeClass(DDK.OptionsUICaptain.ConstantStatic.BUBBLE_DISABLED_CLASS);
			} else {//使用中
				$(_t).attr('data-deactived' , '1');//棄用
				$(_t).find('.labelEnabled').removeClass('off');
				$(_t).find('.labelDisabled').addClass('off');
				$(_card).find('.propsWrapper').attr('data-card-disabled' , '1');
				$(_card).find('.propsWrapper').find('input[type="text"] , input[type="file"]').prop('disabled' , true);
				$(_card).addClass(DDK.OptionsUICaptain.ConstantStatic.BUBBLE_DISABLED_CLASS);
			}
		}
		,
		/**
		!切換牌卡左右順序的接收函數.
		*/
		arrangeCardsSerial:function(e){
			var _t = e.currentTarget;
			var _move = $(_t).attr('data-swap');
			var _card = $(_t).closest('.basicBubble')[0];
			var tmp , masterClass/*啟動置換的牌卡的class 值*/ , slaveClass/*被置換的牌卡的class 值*/ , masterShiftX/*啟動置換的牌卡的css left 值*/ , slaveShiftX/*被置換的牌卡的css left 值*/ , isMasterDisabled/*啟動置換的牌卡是否棄用中*/ , isSlaveDisabled/*被置換的牌卡是否棄用中*/ , bubbleMax/*牌卡總數*/;
			var finalFunc , restoreBtnFunc;
			var _ary = $(_card).parent().find('.basicBubble');//所有的牌卡
			bubbleMax = 0;
			for(var i = 0;i<_ary.length;i++){
				if($(_ary[i]).hasClass('off') == false) bubbleMax++;//過濾啟用中的牌卡
			}
			if(bubbleMax == 1) return;//只有一張牌卡,跳出
			masterClass = $(_card).attr('class');
			masterShiftX = Number(FxReplace($(_card).css('left') , 'px' , ''));
			isMasterDisabled = $(_card).hasClass(DDK.OptionsUICaptain.ConstantStatic.BUBBLE_DISABLED_CLASS);
			restoreBtnFunc = function(){
				
			};
			if(_move == 'prev'){//向序列0 方向移動
				tmp = $(_card).prev();
				slaveClass = $(tmp).attr('class');
				slaveShiftX = Number(FxReplace($(tmp).css('left') , 'px' , ''));
				isSlaveDisabled = $(tmp).hasClass(DDK.OptionsUICaptain.ConstantStatic.BUBBLE_DISABLED_CLASS);
				/*
				if($(_card).index() == 1){//若移動之後變成第一個
					$(_t).parent().find('.swapBtn[data-swap="next"]').removeClass('off');
					$(_t).parent().find('.swapBtn[data-swap="prev"]').addClass('off');
				} else {
					$(_t).parent().find('.swapBtn[data-swap="next"]').removeClass('off');
					$(_t).parent().find('.swapBtn[data-swap="prev"]').removeClass('off');
				}
				*/
				finalFunc = function(){
					$(tmp).attr('class' , masterClass);
					$(_card).attr('class' , slaveClass).insertBefore(tmp);
				}
				
			} else if(_move == 'next'){//向序列n 方向移動
				tmp = $(_card).next();
				slaveClass = $(tmp).attr('class');
				slaveShiftX = Number(FxReplace($(tmp).css('left') , 'px' , ''));
				isSlaveDisabled = $(tmp).hasClass(DDK.OptionsUICaptain.ConstantStatic.BUBBLE_DISABLED_CLASS);
				/*
				if($(_card).index() == bubbleMax - 2){//若移動之後變成最末一個
					$(_t).parent().find('.swapBtn[data-swap="next"]').addClass('off');
					$(_t).parent().find('.swapBtn[data-swap="prev"]').removeClass('off');
				} else {
					$(_t).parent().find('.swapBtn[data-swap="next"]').removeClass('off');
					$(_t).parent().find('.swapBtn[data-swap="prev"]').removeClass('off');
				}
				*/
				finalFunc = function(){
					$(tmp).attr('class' , masterClass);
					$(_card).attr('class' , slaveClass).insertAfter(tmp);
					
				}
			}
			
			$(_card).animate(
				{
					left:slaveShiftX + 'px'
				}, 
				330, 
				'easeInCirc',
				function(){
					finalFunc();
					DDK.OptionsUICaptain.restoreCardSwapBtn(this);
					$(this).removeAttr('style');
				}
			);
			$(tmp).animate(
				{
					left:masterShiftX + 'px'
				}, 
				330, 
				'easeOutExpo',
				function(){
					(isMasterDisabled == true) ? $(_card).addClass(DDK.OptionsUICaptain.ConstantStatic.BUBBLE_DISABLED_CLASS) : $(_card).removeClass(DDK.OptionsUICaptain.ConstantStatic.BUBBLE_DISABLED_CLASS) ;
					(isSlaveDisabled == true) ? $(tmp).addClass(DDK.OptionsUICaptain.ConstantStatic.BUBBLE_DISABLED_CLASS) : $(tmp).removeClass(DDK.OptionsUICaptain.ConstantStatic.BUBBLE_DISABLED_CLASS) ;
					$(this).removeAttr('style');
				}
			);
		}
		,
		/**
		!啟動文字訊息模組.
		>_mod HTML Object|網頁上的模組參照.
		>_readOnly Boolean|是否為唯讀模式.true 唯讀.
		*/
		activeDesignerTextModule:function(_mod , _readOnly){
			$(_mod).append(DDK.OptionsUICaptain.ConstantStatic.TEMPLATE_TEXT_MODULE);
			/* 註冊欄位內容鏡射項目 begin */
			DDK.ModuleKit.TextModule.init($(_mod).find('textarea[data-mirror-target]'))/*初始化欄位,目前只會有一個多行文字欄位需要管理*/;
            DDK.Mutual.SyncTask.addTask(
                DDK.Equalizer.mirrorFancyText(
                    $(_mod).find('textarea[data-mirror-target]')/*鏡射內容的來源欄位*/
                )/*取得鏡射的操作內容*/
            );/*加入到鏡射的執行序*/
			/* 註冊欄位內容鏡射項目 end */
			
			/* 驗證欄位 begin */
			if(_readOnly == false){
				DDK.Mutual.InVerifiTask.addTask(
					DDK.Verification.validateText(
						$(_mod).find('textarea[data-mirror-target]')/*需要檢查的文字欄位*/,
						$(_mod)
					)
				);
			}
			/* 驗證欄位 end */
		}
		,
		/**
		!啟動圖片訊息(單張)模組.
		>_mod HTML Object|網頁上的模組參照.
		>_readOnly Boolean|是否為唯讀模式.true 唯讀.
		*/
		activeDesignerImageModule:function(_mod , _readOnly){
			$(_mod).append(DDK.OptionsUICaptain.ConstantStatic.TEMPLATE_IMAGE_MODULE);
			/* 註冊欄位內容鏡射項目 begin */
			DDK.ModuleKit.ImageModule.init($(_mod).find('#ImageModule-solo-image-file'))/*初始化欄位,目前只會有一個圖檔欄位需要管理*/;
            DDK.Mutual.SyncTask.addTask(
                DDK.Equalizer.mirrorImagePreview(
                    $(_mod).find('#ImageModule-solo-image-file')/*圖檔的鏡射*/
                )/*取得鏡射的操作內容*/
            );/*加入到鏡射的執行序*/
			/* 註冊欄位內容鏡射項目 end */
			
			/* 驗證欄位 begin */
			if(_readOnly == false){
				if(DDK.DataImport.restoreData() == null){//當沒有既有資料時檢查欄位的選取狀態
					DDK.Mutual.InVerifiTask.addTask(
						DDK.Verification.validateFileSelected(
							 $(_mod).find('#ImageModule-solo-image-file')/*需要檢查的上傳檔案欄位*/,
							 $(_mod)
						)
					);
				}
			}
			/* 驗證欄位 end */
		}
		,
		/**
		!啟動圖片訊息(多張)模組.
		>_mod HTML Object|網頁上的模組參照.
		>_readOnly Boolean|是否為唯讀模式.true 唯讀.
		*/
		activeDesignerImageCardsModule:function(_mod , _readOnly){
			var _max = DDK.OptionsUICaptain.ConstantStatic.IMAGE_CARDS_NUMBERS_COUNTS;
			var numberBtnCode = '';//牌卡數量按鈕靜態模板程式碼
			/*
			DDK.OptionsUICaptain.ConstantStatic.TEMPLATE_IMAGE_CARDS_NUMBERS_BTN;
			置換標籤[##serialValue1~10##:1~10 或更多的整數值] , [##checked##:'checked'或'']
			*/
			
			var singleCardCode = '';//單張牌卡靜態模板程式碼
			/*
			DDK.OptionsUICaptain.ConstantStatic.TEMPLATE_IMAGE_CARDS_SINGLE_CARD;
			置換標籤[##cardSerialValue0~9##:0~9 或更多的整數值] , [##0|1##:0或1的值],[##serialValue0~9##:0~9 或更多的整數值]
			*/
			var scode = '';//整個模組的靜態程式碼
			/*
			DDK.OptionsUICaptain.ConstantStatic.TEMPLATE_IMAGE_CARDS_MODULE;
			置換標籤[##numbersButton##:置入正確數量的按鈕] , [##singleCard##:置入正確數量的單張牌卡]
			*/
			var existData = DDK.DataImport.restoreData();//是否有既有資料
			//--組裝樣板原始碼 begin
			for(var i = 0;i<_max;i++){
				if(i == 0){
					numberBtnCode += FxReplace(
						DDK.OptionsUICaptain.ConstantStatic.TEMPLATE_IMAGE_CARDS_NUMBERS_BTN,
						[
							{_pattern:'##checked##' , _fill:'checked'}/*預設啟動一張牌卡*/,
							{_pattern:'##serialValue1~10##' , _fill:(i+1)}
						]
					);//牌卡數量按鈕
					singleCardCode += FxReplace(
						DDK.OptionsUICaptain.ConstantStatic.TEMPLATE_IMAGE_CARDS_SINGLE_CARD,
						[
							{_pattern:'##0|1##' , _fill:1},
							
							{_pattern:'##serialValue0~9##' , _fill:i},
							{_pattern:'##cardSerialValue0~9##' , _fill:i}
							
						]
					);//牌卡
				} else {
					numberBtnCode += FxReplace(
						DDK.OptionsUICaptain.ConstantStatic.TEMPLATE_IMAGE_CARDS_NUMBERS_BTN,
						[
							{_pattern:'##checked##' , _fill:''},
							{_pattern:'##serialValue1~10##' , _fill:(i+1)}
						]
					);
					singleCardCode += FxReplace(
						DDK.OptionsUICaptain.ConstantStatic.TEMPLATE_IMAGE_CARDS_SINGLE_CARD,
						[
							{_pattern:'##0|1##' , _fill:0},
							
							{_pattern:'##serialValue0~9##' , _fill:i},
							{_pattern:'##cardSerialValue0~9##' , _fill:i + ' off'}/*預設啟動一張牌卡*/
						]
					);
				}
			}
			scode += FxReplace(
				DDK.OptionsUICaptain.ConstantStatic.TEMPLATE_IMAGE_CARDS_MODULE,
				[
					{_pattern:'##numbersButton##' , _fill:numberBtnCode},
					{_pattern:'##singleCard##' , _fill:singleCardCode}
				]
			);
			$(_mod).append(scode);//將靜態程式碼置入
			//--組裝樣板原始碼 end
			if(existData != null && existData.module == 'ImageCardsModule'){
				$(_mod).find('[data-key="columns"] .labelBtn .first').addClass('hideItem');
				$(_mod).find('[data-key="columns"] .labelBtn .redo').removeClass('hideItem');
			}
			/* 驗證欄位 begin */
			if(_readOnly == false){
				DDK.Mutual.InVerifiTask.addTask(
					DDK.Verification.validateAltText(
						$(_mod).find('input[data-key="altText"]')/*需要檢查的Alt文字欄位*/,
						$(_mod)
					)
				);
			}
			/* 驗證欄位 end */
			/* 註冊欄位內容鏡射項目 begin */
			var tmp , ioTarget;
			DDK.ModuleKit.ImageCardsModule.init($(_mod).find('[data-scope]'))/*初始化圖檔+標題+網址欄位與標題鏡射的<a>*/;
			for(var i = 0;i<_max;i++){
				DDK.Mutual.SyncTask.addTask(
					DDK.Equalizer.mirrorImagePreview(
						$(_mod).find('#ImageCardsModule-columns-' + i + '-file')/*圖檔的鏡射*/
					)/*取得鏡射的操作內容*/
				);/*加入到鏡射的執行序*/
				tmp = '.imageCardsBubble.count' + i;
				ioTarget = $(tmp + ' .propsWrapper');//確認欄位是否啟用中的參考元素
				DDK.Mutual.SyncTask.addTask(
					DDK.Equalizer.mirrorText(
						$(tmp + ' .propsWrapper .actionsGroup .uriLabel')/*動作按鈕Uri 文字欄位鏡射*/
					)/*取得鏡射的操作內容*/
				);/*加入到鏡射的執行序*/
				DDK.Mutual.SyncTask.addTask(
					DDK.Equalizer.mirrorUriData(
						$(tmp + ' .propsWrapper .actionsGroup .uriData')/*動作按鈕Uri 網址欄位鏡射*/
					)/*取得鏡射的操作內容*/
				);/*加入到鏡射的執行序*/
				
				/* 驗證欄位 begin */
				if(_readOnly == false){
					DDK.Mutual.InVerifiTask.addTask(
						DDK.Verification.validateText(
							$(tmp + ' .propsWrapper .actionsGroup .uriLabel')/*需要檢查的文字欄位*/,
							$(tmp + ' .propsWrapper .actionsGroup .uriLabel')
						)
					);
					DDK.Mutual.InVerifiTask.addTask(
						DDK.Verification.validateHyperText(
							$(tmp + ' .propsWrapper .actionsGroup .uriData')/*需要檢查的超連結文字欄位*/,
							$(tmp + ' .propsWrapper .actionsGroup .uriData')
						)
					);
					DDK.Mutual.InVerifiTask.addTask(
						DDK.Verification.validateFileSelected(
							$(_mod).find('#ImageCardsModule-columns-' + i + '-file')/*需要檢查的上傳檔案欄位*/,
							$(_mod).find('#ImageCardsModule-columns-' + i + '-file')
						)
					);
				}
				/* 驗證欄位 end */
			}
			/* 註冊欄位內容鏡射項目 end */
		}
		,
		/**
		!啟動牌卡訊息模組.
		>_mod HTML Object|網頁上的模組參照.
		>_readOnly Boolean|是否為唯讀模式.true 唯讀.
		*/
		activeDesignerFancyCardsModule:function(_mod , _readOnly){
			var _max = DDK.OptionsUICaptain.ConstantStatic.FANCY_CARDS_NUMBERS_COUNTS;
			var numberBtnCode = '';//牌卡數量按鈕靜態模板程式碼
			/*
			DDK.OptionsUICaptain.ConstantStatic.TEMPLATE_FANCY_CARDS_NUMBERS_BTN;
			置換標籤[##serialValue1~10##:1~10 或更多的整數值] , [##checked##:'checked'或'']
			*/

			var optionsBtnCode = DDK.OptionsUICaptain.ConstantStatic.TEMPLATE_FANCY_CARDS_OPTIONS_BTN;//牌卡訊息的圖片,標題...啟用選項按鈕模板程式碼
			/*
			DDK.OptionsUICaptain.ConstantStatic.TEMPLATE_FANCY_CARDS_OPTIONS_BTN
			無置換標籤
			*/
			
			var mirrorTargetCode = [];//單張牌卡上的動作鏡射目標模板程式碼
			/*
			DDK.OptionsUICaptain.ConstantStatic.TEMPLATE_FANCY_CARDS_ACTIONS_MIRROR_TARGET
			置換標籤[##serialValue0~9##:0~9 或更多的整數值] , [##serialValue0~2##:0~2 的整數值]
			*/
			
			var actionSettingBtnCode = [];//單張牌卡上的動作項目設定按鈕模板程式碼
			/*
			DDK.OptionsUICaptain.ConstantStatic.TEMPLATE_FANCY_CARDS_ACTIONS_SETTING_BUTTON
			置換標籤[##serialValue0~9##:0~9 或更多的整數值] , [##serialValue0~2##:0~2 的整數值] , [##serialValue1~3##:1~3 的整數值]
			*/
			
			var singleCardCode = '';//單張牌卡靜態模板程式碼
			/*
			DDK.OptionsUICaptain.ConstantStatic.TEMPLATE_FANCY_CARDS_SINGLE_CARD
			置換標籤[##cardSerialValue0~9##:0~9 或更多的整數值] , [##0|1##:0或1的值] , [##serialValue0~9##:0~9 或更多的整數值] , [##fancyCardsActions1MirrorTarget##:動作按鈕1 的鏡射目標] , [##fancyCardsActions2MirrorTarget##:動作按鈕2 的鏡射目標] , [##fancyCardsActions3MirrorTarget##:動作按鈕3 的鏡射目標] , [fancyCardsActions1ButtonOptions:牌卡文字標籤按鈕設定-1] , [fancyCardsActions2ButtonOptions:牌卡文字標籤按鈕設定-2] , [fancyCardsActions3ButtonOptions:牌卡文字標籤按鈕設定-3]
			*/

			var scode = '';//整個模組的靜態程式碼
			/*
			DDK.OptionsUICaptain.ConstantStatic.TEMPLATE_FANCY_CARDS_MODULE
			置換標籤[##numbersButton##:置入正確數量的按鈕] , [##optionsButton##:置入牌卡的動作項目按鈕] , [##singleCard##:置入正確數量的單張牌卡]
			*/
			var existData = DDK.DataImport.restoreData();//是否有既有資料
			//--組裝樣板原始碼 begin
			for(var i = 0;i<3;i++){
				mirrorTargetCode.push(FxReplace(
					DDK.OptionsUICaptain.ConstantStatic.TEMPLATE_FANCY_CARDS_ACTIONS_MIRROR_TARGET,
					[
						{_pattern:'##serialValue0~2##' , _fill:i},
					]
				));
				if(i == 0){
					actionSettingBtnCode.push(FxReplace(
						DDK.OptionsUICaptain.ConstantStatic.TEMPLATE_FANCY_CARDS_ACTIONS_SETTING_BUTTON,
						[
							{_pattern:'##0|1##' , _fill:1},
							{_pattern:'##serialValue0~2##' , _fill:i},
							{_pattern:'##serialValue1~3##' , _fill:(i + 1)}
						]
					));
				} else {
					actionSettingBtnCode.push(FxReplace(
						DDK.OptionsUICaptain.ConstantStatic.TEMPLATE_FANCY_CARDS_ACTIONS_SETTING_BUTTON,
						[
							{_pattern:'##0|1##' , _fill:0},
							{_pattern:'##serialValue0~2##' , _fill:i},
							{_pattern:'##serialValue1~3##' , _fill:(i + 1)}
						]
					));
				}
			}
			
			for(var i = 0;i<_max;i++){
				if(i == 0){
					numberBtnCode += FxReplace(
						DDK.OptionsUICaptain.ConstantStatic.TEMPLATE_FANCY_CARDS_NUMBERS_BTN,
						[
							{_pattern:'##checked##' , _fill:'checked'}/*預設啟動一張牌卡*/,
							{_pattern:'##serialValue1~10##' , _fill:(i+1)}
						]
					);//牌卡數量按鈕
					singleCardCode += FxReplace(
						DDK.OptionsUICaptain.ConstantStatic.TEMPLATE_FANCY_CARDS_SINGLE_CARD,
						[
							{_pattern:'##0|1##' , _fill:1},
							 
							{_pattern:'##fancyCardsActions1MirrorTarget##' , _fill:mirrorTargetCode[0]},
							{_pattern:'##fancyCardsActions2MirrorTarget##' , _fill:mirrorTargetCode[1]},
							{_pattern:'##fancyCardsActions3MirrorTarget##' , _fill:mirrorTargetCode[2]},
							
							{_pattern:'##fancyCardsActions1ButtonOptions##' , _fill:actionSettingBtnCode[0]},
							{_pattern:'##fancyCardsActions2ButtonOptions##' , _fill:actionSettingBtnCode[1]},
							{_pattern:'##fancyCardsActions3ButtonOptions##' , _fill:actionSettingBtnCode[2]},
							
						]
					);//牌卡
					singleCardCode = FxReplace(
						singleCardCode,
						[
							{_pattern:'##serialValue0~9##' , _fill:i},
							{_pattern:'##cardSerialValue0~9##' , _fill:i}
							
						]
					);//牌卡
				} else {
					numberBtnCode += FxReplace(
						DDK.OptionsUICaptain.ConstantStatic.TEMPLATE_FANCY_CARDS_NUMBERS_BTN,
						[
							{_pattern:'##checked##' , _fill:''},
							{_pattern:'##serialValue1~10##' , _fill:(i+1)}
						]
					);
					singleCardCode += FxReplace(
						DDK.OptionsUICaptain.ConstantStatic.TEMPLATE_FANCY_CARDS_SINGLE_CARD,
						[
							{_pattern:'##0|1##' , _fill:0},
							
							{_pattern:'##fancyCardsActions1MirrorTarget##' , _fill:mirrorTargetCode[0]},
							{_pattern:'##fancyCardsActions2MirrorTarget##' , _fill:mirrorTargetCode[1]},
							{_pattern:'##fancyCardsActions3MirrorTarget##' , _fill:mirrorTargetCode[2]},
							
							{_pattern:'##fancyCardsActions1ButtonOptions##' , _fill:actionSettingBtnCode[0]},
							{_pattern:'##fancyCardsActions2ButtonOptions##' , _fill:actionSettingBtnCode[1]},
							{_pattern:'##fancyCardsActions3ButtonOptions##' , _fill:actionSettingBtnCode[2]},
							
						]
					);
					singleCardCode = FxReplace(
						singleCardCode,
						[
							{_pattern:'##serialValue0~9##' , _fill:i},
							{_pattern:'##cardSerialValue0~9##' , _fill:i + ' off'}/*預設啟動一張牌卡*/
						]
					);
				}
				
			}
			scode += FxReplace(
				DDK.OptionsUICaptain.ConstantStatic.TEMPLATE_FANCY_CARDS_MODULE,
				[
					{_pattern:'##numbersButton##' , _fill:numberBtnCode},
					{_pattern:'##optionsButton##' , _fill:optionsBtnCode},
					{_pattern:'##singleCard##' , _fill:singleCardCode}
				]
			);
			$(_mod).append(scode);//將靜態程式碼置入
			//$(_mod).find('.fancyCardsBubble.count0 .propsWrapper .action-0 .labelText , .fancyCardsBubble.count0 .propsWrapper .action-0 .labelTextData').attr('data-io="1"');//第一張牌卡的動作按鈕中的"訊息"兩個欄位預設為data-io="1"
			//--組裝樣板原始碼 end
			
			//--根據設定檔產生"訊息"或"資料"的值的下拉欄位的內容 begin
			var configSetting = DDK.Mutual.DynamicValue.applicationPolicy.Module.fancyCards;//設定檔
			var extendData = DDK.OptionsUICaptain.ConstantStatic.FANCY_CARDS_EXTENDS_DATA;//擴充資料
			var messageOptions = null;//牌卡的訊息欄位下拉選項
			var postbackOptions = null;//牌卡的資料欄位下拉選項
			var _optionE , subExtendData;
			var _ary = [
				[
					(
						configSetting.buttons.message.enabled == true && 
						configSetting.buttons.message.valueUIType == 'select' && 
						extendData != null && 
						extendData.message != undefined
					)/*"訊息"欄位有資料且設定檔為'select',可以產生下拉選項*/
					,
					function(){ messageOptions = []; }
					,
					function(e){ messageOptions.push(e); }
					,
					'message'
				]
				,
				[
					(
						configSetting.buttons.postback.enabled == true && 
						configSetting.buttons.postback.valueUIType == 'select' && 
						extendData != null && 
						extendData.postback != undefined
					)/*"資料"欄位有資料且設定檔為'select',可以產生下拉選項*/
					,
					function(){ postbackOptions = []; }
					,
					function(e){ postbackOptions.push(e); }
					,
					'postback'
				]
			];//"訊息"與"資料"欄位的下拉選項產生條件
			for(var i = 0;i<_ary.length;i++){
				if(_ary[i][0] == true){//吻合產生條件
					_ary[i][1]();
					subExtendData = extendData[_ary[i][3]];
					for(var j = 0;j<subExtendData.length;j++){
						_optionE = document.createElement('OPTION');
						_optionE.textContent = subExtendData[j].label;
						_optionE.value = subExtendData[j].value;
						_ary[i][2](_optionE);
					}
				}
			}
			//--根據設定檔產生"訊息"或"資料"的值的下拉欄位的內容 end
			
			
			
			//--根據設定檔調整畫面 begin
			if(
				configSetting.buttons.message.enabled == true && 
				configSetting.buttons.message.valueUIType == 'select'
			){//當"訊息"欄位啟用且欄位型態為select 時
				$(_mod).find('.fancyCardsBubble .propsWrapper select.labelTextData').append(messageOptions);//插入牌卡中的"訊息"的值欄位的選項內容
				$(_mod).find('.fancyCardsBubble .propsWrapper input.labelTextData').remove();
			} else if(
				configSetting.buttons.message.enabled == true && 
				configSetting.buttons.message.valueUIType == 'input'
			){//當"訊息"欄位啟用且欄位型態為input 時
				$(_mod).find('.fancyCardsBubble .propsWrapper select.labelTextData').remove();//移除select 形式的欄位
			}
			
			if(
				configSetting.buttons.postback.enabled == true || 
				configSetting.buttons.postback.valueUIType == 'select'
			){//當"資料"欄位啟用且欄位型態為select 時
				$(_mod).find('.fancyCardsBubble .propsWrapper select.textData').append(postbackOptions);//插入牌卡中的"資料"的值欄位的選項內容
				$(_mod).find('.fancyCardsBubble .propsWrapper input.textData').remove();
			} else if(
				configSetting.buttons.postback.enabled == true || 
				configSetting.buttons.postback.valueUIType == 'input'
			){//當"資料"欄位啟用且欄位型態為input 時
				$(_mod).find('.fancyCardsBubble .propsWrapper select.textData').remove();//移除select 形式的欄位
			}
			
			if(configSetting.buttons.message.enabled == false){//"訊息"欄位不啟用
				$(_mod).find('.fancyCardsBubble .propsWrapper .actionsGroup .switchActions li input[value="message"]').parent().remove();//移除每張牌卡的訊息切換按鈕
				$(_mod).find('.fancyCardsBubble .propsWrapper .actionsGroup .switchActions li input[value="uri"]').each(function(){
					$(this).prop('checked' , true);//改選為預設顯示網址欄位
					//DDK.OptionsUICaptain.fancyCardsSwitchActionType({currentTarget:this});
				});
				$(_mod).find('.fancyCardsBubble .actionsCard li .message').addClass('off');//訊息鏡射欄位預設關閉
			}
			if(configSetting.buttons.postback.enabled == false){//"資料"欄位不啟用
				$(_mod).find('.fancyCardsBubble .propsWrapper .actionsGroup .switchActions li input[value="postback"]').parent().remove();//移除每張牌卡的訊息切換按鈕
				$(_mod).find('.fancyCardsBubble .actionsCard li .postback').addClass('off');//資料鏡射欄位預設關閉
			}
			if(
				configSetting.buttons.message.enabled == false || 
				configSetting.buttons.message.enabled == false && configSetting.buttons.postback.enabled == false
			){//"訊息"欄位或"訊息與資料"欄位不啟用
				$(_mod).find('.fancyCardsBubble .actionsCard li .uri').removeClass('off');//網址鏡射欄位預設開啟
			} else {
				$(_mod).find('.fancyCardsBubble .actionsCard li .uri').addClass('off');//網址鏡射欄位預設關閉
			}
			
			
			
			if(
				configSetting.buttons.message.enabled == false || 
				configSetting.buttons.postback.enabled == false
			){//"訊息"或"資料"欄位任一不啟用
				$(_mod).find('.fancyCardsBubble .propsWrapper .actionsGroup .switchActions').each(function(){//調整每張牌卡的三組切換按鈕樣式
					if($(this).find('li').length == 1){
						$(this).find('li').attr('class' , '').addClass('col-12');//只剩一個按鈕時
					} else if($(this).find('li').length == 2){//剩下兩個按鈕時
						$(this).find('li').addClass('col-6');
					}
				});
				
				if(configSetting.buttons.message.enabled == true && configSetting.buttons.postback.enabled == false){//當"網址"是最後一個標籤時
					$(_mod).find('.fancyCardsBubble .propsWrapper .actionsGroup .switchActions li input[value="uri"]').parent().removeClass('border-right').removeClass('border-left');//所有的"網址"標籤移除左右框線
				}
			}
			//--根據設定檔調整畫面 end
			
			
			if(existData != null && existData.module == 'FancyCardsModule'){
				$(_mod).find('[data-key="columns"] .labelBtn.uploadFile .first').addClass('hideItem');
				$(_mod).find('[data-key="columns"] .labelBtn.uploadFile .redo').removeClass('hideItem');
			}
			/* 驗證欄位 begin */
			if(_readOnly == false){
				DDK.Mutual.InVerifiTask.addTask(
					DDK.Verification.validateAltText(
						$(_mod).find('input[data-key="altText"]')/*需要檢查的Alt文字欄位*/
					)
				);
			}
			/* 驗證欄位 end */
			/* 註冊欄位內容鏡射項目 begin */
			var tmp , subTmp , ioTarget;
			var _validateText = DDK.Verification.validateText;//短參照
			var _mirrorText = DDK.Equalizer.mirrorText;//短參照
			DDK.ModuleKit.FancyCardsModule.init($(_mod).find('[data-scope]'))/*初始化圖檔+標題+網址欄位與標題鏡射的<a>*/;
			for(var i = 0;i<_max;i++){
				DDK.Mutual.SyncTask.addTask(
					DDK.Equalizer.mirrorImagePreview(
						$(_mod).find('#FancyCardsModule-columns-' + i + '-image-file')/*圖檔的鏡射*/
					)/*取得鏡射的操作內容*/
				);/*加入到鏡射的執行序*/
				tmp = '.fancyCardsBubble.count' + i;
				ioTarget = $(_mod).find(tmp + ' .propsWrapper');//確認欄位是否啟用中的參考元素
				DDK.Mutual.SyncTask.addTask(
					_mirrorText(
						$(_mod).find(tmp + ' .propsWrapper .mainTitle')/*大標的鏡射*/
					)/*取得鏡射的操作內容*/
				);/*加入到鏡射的執行序*/
				
				DDK.Mutual.SyncTask.addTask(
					_mirrorText(
						$(_mod).find(tmp + ' .propsWrapper .subTitle')/*主標的鏡射*/
					)/*取得鏡射的操作內容*/
				);/*加入到鏡射的執行序*/
				
				/* 驗證欄位 begin */
				if(_readOnly == false){
					DDK.Mutual.InVerifiTask.addTask(
						_validateText(
							$(_mod).find(tmp + ' .propsWrapper .mainTitle')/*需要檢查的文字欄位*/,
							$(_mod).find(tmp + ' .propsWrapper .mainTitle')
						)
					);
					DDK.Mutual.InVerifiTask.addTask(
						_validateText(
							$(_mod).find(tmp + ' .propsWrapper .subTitle')/*需要檢查的文字欄位,主標文字為必填*/,
							$(_mod).find(tmp + ' .propsWrapper .subTitle')
						)
					);
					DDK.Mutual.InVerifiTask.addTask(
						DDK.Verification.validateFileSelected(
							$(_mod).find('#FancyCardsModule-columns-' + i + '-image-file')/*需要檢查的上傳檔案欄位*/,
							$(_mod).find('#FancyCardsModule-columns-' + i + '-image-file')
						)
					);
				}
				/* 驗證欄位 end */
				
				for(var j = 0;j<3;j++){
					subTmp = '.fancyCardsBubble.count' + i + ' .propsWrapper .actionsGroup.count' + j;
					DDK.Mutual.SyncTask.addTask(
						_mirrorText(
							$(_mod).find(subTmp + ' .uriLabel')/*動作按鈕Uri 文字欄位鏡射*/
						)/*取得鏡射的操作內容*/
					);/*加入到鏡射的執行序*/
					DDK.Mutual.SyncTask.addTask(
						DDK.Equalizer.mirrorUriData(
							$(_mod).find(subTmp + ' .uriData')/*動作按鈕Uri 網址欄位鏡射*/
						)/*取得鏡射的操作內容*/
					);/*加入到鏡射的執行序*/
					//
					if(configSetting.buttons.message.enabled == true){//"訊息"欄位啟用
						DDK.Mutual.SyncTask.addTask(
							_mirrorText(
								$(_mod).find(subTmp + ' .labelText')/*動作按鈕一般文字欄位鏡射*/
							)/*取得鏡射的操作內容*/
						);/*加入到鏡射的執行序*/
						if(configSetting.buttons.message.valueUIType == 'input'){
							DDK.Mutual.SyncTask.addTask(
								_mirrorText(
									$(_mod).find(subTmp + ' .labelTextData')/*動作按鈕一般文字欄位鏡射*/
								)/*取得鏡射的操作內容*/
							);/*加入到鏡射的執行序*/
						}
					}
					//
					if(configSetting.buttons.postback.enabled == true){//"資料"欄位啟用
						DDK.Mutual.SyncTask.addTask(
							_mirrorText(
								$(_mod).find(subTmp + ' .textDataLabel')/*動作按鈕資料文字欄位鏡射*/
							)/*取得鏡射的操作內容*/
						);/*加入到鏡射的執行序*/
						if(configSetting.buttons.postback.valueUIType == 'input'){
							DDK.Mutual.SyncTask.addTask(
								_mirrorText(
									$(_mod).find(subTmp + ' .textData')/*動作按鈕資料回傳欄位鏡射*/
								)/*取得鏡射的操作內容*/
							);/*加入到鏡射的執行序*/
						}
					}
					
					
					/* 驗證欄位 begin */
					if(_readOnly == false){
						DDK.Mutual.InVerifiTask.addTask(
							_validateText(
								$(_mod).find(subTmp + ' .uriLabel')/*需要檢查的文字欄位*/,
								$(_mod).find(subTmp + ' .uriLabel')/*特殊,用欄位本身參考是否啟用中*/
							)
						);
						DDK.Mutual.InVerifiTask.addTask(
							DDK.Verification.validateHyperText(
								$(_mod).find(subTmp + ' .uriData')/*需要檢查的超連結文字欄位*/,
								$(_mod).find(subTmp + ' .uriData')/*特殊,用欄位本身參考是否啟用中*/
							)
						);
						//
						if(configSetting.buttons.message.enabled == true){//"訊息"欄位啟用
							DDK.Mutual.InVerifiTask.addTask(
								_validateText(
									$(_mod).find(subTmp + ' .labelText')/*需要檢查的文字欄位*/,
									$(_mod).find(subTmp + ' .labelText')/*特殊,用欄位本身參考是否啟用中*/
								)
							);
							DDK.Mutual.InVerifiTask.addTask(
								_validateText(
									$(_mod).find(subTmp + ' .labelTextData')/*需要檢查的文字欄位*/,
									$(_mod).find(subTmp + ' .labelTextData')/*特殊,用欄位本身參考是否啟用中*/
								)
							);
						}
						//
						if(configSetting.buttons.postback.enabled == true){//"資料"欄位啟用
							DDK.Mutual.InVerifiTask.addTask(
								_validateText(
									$(_mod).find(subTmp + ' .textDataLabel')/*需要檢查的文字欄位*/,
									$(_mod).find(subTmp + ' .textDataLabel')/*特殊,用欄位本身參考是否啟用中*/
								)
							);
							DDK.Mutual.InVerifiTask.addTask(
								_validateText(
									$(_mod).find(subTmp + ' .textData')/*需要檢查的文字欄位*/,
									$(_mod).find(subTmp + ' .textData')/*特殊,用欄位本身參考是否啟用中*/
								)
							);
						}
					}
					/* 驗證欄位 end */
				}
				
			}
			/* 註冊欄位內容鏡射項目 end */
		}
		,
		/**
		!選擇牌卡數量的數字按鈕的接收函數.
		*/
		cardsNumberSelection:function(e){
			var _t = e.currentTarget;
			var _value = Number(_t.value);
			var cards_ary = $(_t).closest('section').find('.basicBubble');
			var tmp_ary = [];
			for(var i = 0;i<cards_ary.length;i++){
				if(i<_value){//在選取數量範圍內的牌卡都顯示出來
					
					if($(cards_ary[i]).hasClass('off') == true) {
						$(cards_ary[i]).removeClass('off');
						$(cards_ary[i]).find('.propsWrapper').attr('data-io' , '1');
					}
				} else {
					if($(cards_ary[i]).hasClass('off') == false) $(cards_ary[i]).addClass('off');
					$(cards_ary[i]).find('.propsWrapper').attr('data-io' , '0');
				}
			}
			DDK.OptionsUICaptain.restoreCardSwapBtn(_t);
		}
		,
		/**
		!圖片訊息(多張)-當變更牌卡數量時,更新啟用中的牌卡的檔案上傳欄位的data-io 的值
		*/
		imageCardsUpdateFileInputIO:function(e){
			var _t = e.currentTarget;
			var _pp = $(_t).closest('section');
			
			$(_pp).find('.imageCardsBubble .propsWrapper[data-io="1"] input[type="file"]').attr('data-io' , '1');//只有啟用的卡牌的檔案上傳欄位設定data-io="1"
			$(_pp).find('.imageCardsBubble .propsWrapper[data-io="0"] input[type="file"]').attr('data-io' , '0');//未啟用的卡牌的檔案上傳欄位全數設定data-io="0"
		}
		,
		/**
		!圖片訊息(多張)-當變更牌卡數量時,更新啟用中與未啟用的牌卡的動作按鈕的data-io 的值.
		*/
		imageCardsUpdateActionButtonIO:function(e){
			var _t = e.currentTarget;
			var _pp = $(_t).closest('section');
			$(_pp).find('.imageCardsBubble .propsWrapper[data-io="1"] .actionsGroup').find('input.uriLabel , input.uriData').attr('data-io' , '1');//只有啟用的卡牌的動作按鈕群組內的欄位全數設定data-io="1"
			$(_pp).find('.imageCardsBubble .propsWrapper[data-io="0"] .actionsGroup').find('input.uriLabel , input.uriData').attr('data-io' , '0');//未啟用的卡牌的動作按鈕群組內的欄位全數設定data-io="0"
		}
		,
		restoreCardSwapBtn:function(_jq){
			var allCards = $(_jq).closest('section').find('.basicBubble').not('.basicBubble.off');//重新取得所有的牌卡
			if(allCards.length == 1){
				$(allCards).find('.swapBtn').addClass('off');
			} else {
				$(allCards).find('.swapBtn').removeClass('off');
				$(allCards[allCards.length - 1]).find('.swapBtn[data-swap="next"]').addClass('off');
				$(allCards[0]).find('.swapBtn[data-swap="prev"]').addClass('off');
			}
		}
		,
		/**
		!牌卡訊息-設定其內動作欄位的data-io 值.
		>_group jQuery Object|動作按鈕的群組元素.
		>_value String|只有'message' / 'uri' / 'postback' / ''.
		*/
		fancyCardsSetActionsDataIO:function(_group , _value){
			if(_value == 'message'){
				_group.find('input.labelText , input.labelTextData , select.labelTextData').removeClass('off').attr('data-io' , '1');//.labelTextData 可能是input 或select
				_group.find('input.uriLabel , input.uriData').addClass('off').attr('data-io' , '0');
				_group.find('input.textDataLabel , input.textData , select.textData').addClass('off').attr('data-io' , '0');//.textData 可能是input 或select
			} else if(_value == 'uri'){
				
				_group.find('input.uriLabel , input.uriData').removeClass('off').attr('data-io' , '1');
				_group.find('input.labelText , input.labelTextData , select.labelTextData').addClass('off').attr('data-io' , '0');//.labelTextData 可能是input 或select
				_group.find('input.textDataLabel , input.textData , select.textData').addClass('off').attr('data-io' , '0');//.textData 可能是input 或select
			} else if(_value == 'postback'){
				_group.find('input.textDataLabel , input.textData , select.textData').removeClass('off').attr('data-io' , '1');//.textData 可能是input 或select
				_group.find('input.labelText , input.labelTextData , select.labelTextData').addClass('off').attr('data-io' , '0');//.labelTextData 可能是input 或select
				_group.find('input.uriLabel , input.uriData').addClass('off').attr('data-io' , '0');
			} else {
				_group.find('input.labelText , input.labelTextData , select.labelTextData').addClass('off').attr('data-io' , '0');//.labelTextData 可能是input 或select
				_group.find('input.uriLabel , input.uriData').addClass('off').attr('data-io' , '0');
				_group.find('input.textDataLabel , input.textData , select.textData').addClass('off').attr('data-io' , '0');//.textData 可能是input 或select
			}
		}
		,
		/**
		!牌卡訊息-當變更牌卡數量時,更新啟用中的牌卡的大標欄位的data-io 的值
		*/
		fancyCardsUpdateMainTitleIO:function(e){
			var _t = e.currentTarget;
			var _pp = $(_t).closest('section');
			var _isTitle = Boolean(Number($(_pp).find('input[name="FancyCardsTitle"]:checked').val()));//大標的總設定
			if(_isTitle == true){//大標的總設定為啟用,檢查每一張的牌卡的data-io
				var isCard;
				var _ary = $(_pp).find('.fancyCardsBubble .propsWrapper');
				
				for(var i = 0;i<_ary.length;i++){
					isCard = Boolean(Number($(_ary[i]).attr('data-io')));
					if(isCard == true){//牌卡有啟用
						$(_ary[i]).find('.mainTitle').attr('data-io' , '1');//大標設為可用
					} else {
						$(_ary[i]).find('.mainTitle').attr('data-io' , '0');
					}
				}
				$(_pp).find('.fancyCardsBubble .propsWrapper[data-io="1"] .mainTitle').attr('data-io' , '1');//只有啟用的卡牌的大標欄位設定data-io="1"
				$(_pp).find('.fancyCardsBubble .propsWrapper[data-io="0"] .mainTitle').attr('data-io' , '0');//未啟用的卡牌的大標欄位全數設定data-io="0"
			} else {
				$(_pp).find('.fancyCardsBubble .propsWrapper .mainTitle').attr('data-io' , '0');//所有的卡牌的大標欄位全數設定data-io="0"
			}
			
		}
		,
		/**
		!牌卡訊息-當變更牌卡數量時,更新啟用中的牌卡的小標欄位的data-io 的值
		*/
		fancyCardsUpdateSubTitleIO:function(e){
			var _t = e.currentTarget;
			var _pp = $(_t).closest('section');
			$(_pp).find('.fancyCardsBubble .propsWrapper[data-io="1"] .subTitle').attr('data-io' , '1');//只有啟用的卡牌的主標欄位設定data-io="1"
			$(_pp).find('.fancyCardsBubble .propsWrapper[data-io="0"] .subTitle').attr('data-io' , '0');//未啟用的卡牌的主標欄位全數設定data-io="0"
			
		}
		,
		/**
		!牌卡訊息-當變更牌卡數量時,更新啟用中的牌卡的檔案上傳欄位的data-io 的值
		*/
		fancyCardsUpdateFileInputIO:function(e){
			var _t = e.currentTarget;
			var _pp = $(_t).closest('section');
			var isThumb = Boolean(Number($(_pp).find('input[name="FancyCardsThumb"]:checked').val()));
			if(isThumb == true){
				$(_pp).find('.fancyCardsBubble .propsWrapper[data-io="1"] input[type="file"]').attr('data-io' , '1');//只有啟用的卡牌的檔案上傳欄位設定data-io="1"
				$(_pp).find('.fancyCardsBubble .propsWrapper[data-io="0"] input[type="file"]').attr('data-io' , '0');//未啟用的卡牌的檔案上傳欄位全數設定data-io="0"
			} else {
				$(_pp).find('.fancyCardsBubble .propsWrapper input[type="file"]').attr('data-io' , '0');//所有的卡牌的檔案上傳欄位全數設定data-io="0"
			}
			
		}
		,
		/**
		!牌卡訊息-當變更牌卡數量與動作按鈕啟用數量變更時,更新啟用中與未啟用的牌卡的動作按鈕的data-io 的值.
		*/
		fancyCardsUpdateActionButtonIO:function(e){
			var _t = e.currentTarget;
			var _pp = $(_t).closest('section');
			$(_pp).find('.fancyCardsBubble .propsWrapper[data-io="1"] .actionsGroup[data-io="1"]').each(function(){
				DDK.OptionsUICaptain.fancyCardsSetActionsDataIO(
					$(this),
					$(this).find('.switchActions input[type="radio"]:checked').val()
				);
			});//只有啟用的卡牌的動作按鈕群組內的欄位依照選擇的種類設定data-io="1"
			$(_pp).find('.fancyCardsBubble .propsWrapper[data-io="0"] .actionsGroup').each(function(){
				DDK.OptionsUICaptain.fancyCardsSetActionsDataIO(
					$(this),
					''
				);
			});//未啟用的卡牌的動作按鈕群組內的欄位全數設定data-io="0"
		}
		,
		/**
		!牌卡訊息-縮圖啟用按鈕的接收函數.
		*/
		fancyCardsEnableThumbnail:function(e){
			var _t = e.currentTarget;
			var _pp = $(_t).closest('section');
			var _value = Boolean(Number(_t.value));
			var labelBtn_ary = $(_pp).find('.fancyCardsBubble .propsWrapper .labelBtn.uploadFile');//檔案上傳的<label>
			var file_ary = $(_pp).find('.fancyCardsBubble .propsWrapper input[type="file"]');//檔案上傳欄位
			var thumb_ary = $(_pp).find('.fancyCardsBubble .fancyCardsMask');//預覽圖
			var textCard_ary = $(_pp).find('.fancyCardsBubble .textCard');//主標+標題
			if(_value == true){
				labelBtn_ary.removeClass('off');
				thumb_ary.removeClass('off');
				file_ary.attr('data-io' , '1');
				textCard_ary.removeClass('onHead');
			} else {
				labelBtn_ary.addClass('off');
				thumb_ary.addClass('off');
				file_ary.attr('data-io' , '0');
				textCard_ary.addClass('onHead');
			}
		}
		,
		/**
		!牌卡訊息-大標啟用按鈕的接收函數,啟動或關閉大標的鏡射目標.
		*/
		fancyCardsEnableTitle:function(e){
			var _t = e.currentTarget;
			var _pp = $(_t).closest('section');
			var _isTitle = Boolean(Number(_t.value));
			var title_ary = $(_pp).find('.fancyCardsBubble .propsWrapper .mainTitle');//大標欄位的總設定
			if(_isTitle == true){
				title_ary.each(function(){
					$(document.getElementById($(this).attr('data-mirror-target'))).removeClass('off');//鏡射目標
				});
			} else {
				title_ary.each(function(){
					$(document.getElementById($(this).attr('data-mirror-target'))).addClass('off');//鏡射目標
				});
			}
		}
		,
		/**
		!牌卡訊息-動作數量按鈕的接收函數.
		*/
		fancyCardsSetActionButtonNumbers:function(e){
			var _t = e.currentTarget;
			var _pp = $(_t).closest('section');
			var _value = Number(_t.value);
			var mirrorGroup_ary = $(_pp).find('.fancyCardsBubble .actionsCard');//鏡射目標
			var tmp;
			for(var i = 0;i<3;i++){
				tmp = $(_pp).find('.fancyCardsBubble .propsWrapper .actionsGroup.count' + i);
				if(i < _value){
					tmp.removeClass('off').attr('data-io' , '1');//每張卡牌對應開啟數量的動作按鈕群組開啟
					mirrorGroup_ary.each(function(){
						$(this).find('li').eq(i).removeClass('off');
					});
				} else {
					tmp.addClass('off').attr('data-io' , '0');//每張卡牌對應開啟數量以外的動作按鈕群組關閉
					tmp.find(
						'input.labelText , input.labelTextData , select.labelTextData'/*訊息欄位 , .labelTextData 可能是input 或select*/ + ' , ' + 
						'input.uriLabel , input.uriData'/*網址欄位*/ + ' , ' + 
						'input.textDataLabel , input.textData , select.textData'/*資料欄位 , //.textData 可能是input 或select*/
					).attr('data-io' , '0');//動作按鈕群組中的欄位設為不啟用
					
					mirrorGroup_ary.each(function(){
						$(this).find('li').eq(i).addClass('off');
					});
				}
			}
			
			
		}
		,
		/**
		!牌卡訊息-動作模式的切換按鈕的接收函數.
		*/
		fancyCardsSwitchActionType:function(e){
			var _t = e.currentTarget;
			var _pp = $(_t).closest('.fancyCardsBubble');
			var _group = $(_t).closest('.actionsGroup');//按鈕本身所在的動作按鈕群組
			var _cardIndex = $(_group).attr('class');//取得.actionsGroup.count0~2 的數值作為對應到鏡射目標的哪一組
			_cardIndex = Number(_cardIndex.charAt(_cardIndex.length - 1));
			var _card = $(_pp).find('.actionsCard li').eq(_cardIndex);//鏡射目標群組
			var _value = _t.value;
			DDK.OptionsUICaptain.fancyCardsSetActionsDataIO(_group , _value);
			if(_value == 'message'){
				_card.find('.message').removeClass('off');
				_card.find('.uri , .postback').addClass('off');
			} else if(_value == 'uri'){
				_card.find('.uri').removeClass('off');
				_card.find('.message , .postback').addClass('off');
			} else if(_value == 'postback'){
				_card.find('.postback').removeClass('off');
				_card.find('.message , .uri').addClass('off');
			}
		}
		,
		fancyCardsViewSizeUpdate:function(){
			if(DDK.OptionsUICaptain.DynamicValue.canFancyCardsModuleUpdateSize == false) return;
			var _t = $('.' + DDK.OptionsUICaptain.DynamicValue.currentModuleName);
			var _ary = $(_t).find('.basicBubble');
			var textCardHeight , cardMaskHeight , actionsCardHeight , propsWrapperHeight , maxCardHeight;
			$(_ary).find('.textCard , .actionsCard').removeAttr('style');//清除舊的高度
			textCardHeight = $(_ary[0]).find('.textCard')[0].clientHeight;
			cardMaskHeight = $(_ary[0]).find('.fancyCardsMask')[0].clientHeight;
			actionsCardHeight = $(_ary[0]).find('.actionsCard')[0].clientHeight;
			propsWrapperHeight = $(_ary[0]).find('.propsWrapper')[0].clientHeight;
			for(var i = 1;i<_ary.length;i++){
				if($(_ary[i]).find('.textCard')[0].clientHeight > textCardHeight){
					textCardHeight = $(_ary[i]).find('.textCard')[0].clientHeight;//找出最大值
				}
			}
			$(_ary).each(function(){
				$(this).find('.textCard').css({'height':textCardHeight + 'px'});
				$(this).find('.actionsCard').css({'height':actionsCardHeight + 'px'});
			});
			maxCardHeight = _ary[0].clientHeight;
			for(var i = 1;i<_ary.length;i++){
				if(_ary[i].clientHeight > maxCardHeight) maxCardHeight = _ary[i].clientHeight;
			}
			
			$(_t).find('.fullTemplate .templateEmulator dd , .fullTemplate .templateEmulator dd .scrollerWrapper').css({'height':(maxCardHeight + 50) + 'px'});
			$(_t).find('.fullTemplate .templateEmulator dd .bg').css({'height':(cardMaskHeight + actionsCardHeight + textCardHeight + 50) + 'px'});
			/*
			'.fancyCardsMask'縮圖
			'.textCard'大標主標
			'.actionsCard'動作按鈕
			'.propsWrapper'設定欄位群組
			*/
		}
	};
/**
!樣板操作介面功能設定,有TextModule(純文字) , ImageModule(單張圖) , ImageCardsModule(只有圖片的牌卡"image_carousel") , FancyCardsModule(夾雜文字與圖片的排卡"carousel").
*/
DDK.ModuleKit = {
	ConstantStatic:{
	}
	,
	DynamicValue:{
		activeModuleArray:null/*儲存所有樣板內曾被註冊事件的HTML 元素,方便重設時一次清空*/,
//		wrapperObserver:null/*欄位父系容器元素屬性觀察者MutationObserver API*/,
//		valueDataObserver:null/*建立欄位元素屬性觀察者MutationObserver API*/,
	}
	,
	init:function(){
		DDK.ModuleKit.DynamicValue.activeModuleArray = [];
//		DDK.ModuleKit.DynamicValue.wrapperObserver = new MutationObserver(DDK.ModuleKit.watchWrapperAttributes);
//		DDK.ModuleKit.DynamicValue.valueDataObserver = new MutationObserver(DDK.ModuleKit.watchValueInputAttributes);
//		DDK.ModuleKit.TextModule.watchIOstate = DDK.ModuleKit.watchIOstate;
//		DDK.ModuleKit.ImageModule.watchIOstate = DDK.ModuleKit.watchIOstate;
//		DDK.ModuleKit.ImageCardsModule.watchIOstate = DDK.ModuleKit.watchIOstate;
//		DDK.ModuleKit.FancyCardsModule.watchIOstate = DDK.ModuleKit.watchIOstate;
	}
	,
	reCall:function(){
//		DDK.ModuleKit.DynamicValue.activeModuleArray = null;
//		DDK.ModuleKit.DynamicValue.wrapperObserver.disconnect();//中斷監看
//		DDK.ModuleKit.DynamicValue.wrapperObserver = null;
//		DDK.ModuleKit.DynamicValue.valueDataObserver.disconnect();//中斷監看
//		DDK.ModuleKit.DynamicValue.valueDataObserver = null;
		//
		for(var i = 0;i<DDK.ModuleKit.DynamicValue.activeModuleArray.length;i++) FxRemoveEachEventListener(DDK.ModuleKit.DynamicValue.activeModuleArray[i]);
		DDK.ModuleKit.DynamicValue.activeModuleArray = null;
	}
	,
	/**
	!<input type="file"> 的change 接收函數,當有選取檔案時,在元素本身的alt 屬性寫入一個時間戳記.
	*/
	fileInputSetTimeStamp:function(e){
		var _t = e.target;//這是<input type="file">
		//var _target = document.getElementById($(_t).attr('data-mirror-target'));//取得要將內容同步過去的元素
		var stamp = new Date().getTime();
		$(_t).attr('alt' , stamp);
	}
	,
	/**
	!所有鏡射目標內若有<a> 時的click 接收函數,會先詢問使用者是否需要開啟該網址才以window.open 方式開啟.
	*/
	executableLinkConfirm:function(e){
		FxEventObject(e).overwriteDefault();
		var _t = e.currentTarget;
		var r = confirm(DDK.Mutual.TextScript.OPEN_LABEL_URL);
		if(r == true){
			window.open($(_t).attr('href'));
		}
	}
	,
	/**
	!在DDK.ModuleKit 內的所有模組內有執行FxAddEventListener 的元素都透過陣列儲存,方便之後重設一次清除.
	>_object HTML Object , jQuery Object|元素選取參照.
	*/
	saveAddedEventInstance:function(_object){
		if(_object.length != undefined && _object.length > 0){
			for(var i = 0;i<_object.length;i++) DDK.ModuleKit.DynamicValue.activeModuleArray.push(_object[i]);
		}
		if(_object.length == undefined){
			DDK.ModuleKit.DynamicValue.activeModuleArray.push(_object);
		}
	}
//	,
//	/**
//	!監看指定的元素上的屬性變化.
//	>_jq jQuery Object|元素選取參照.
//	*/
//	watchIOstate:function(_jq){
//		var wrapper_ary = $(_jq).find('[data-scope="node"] , [data-scope="anonymousProps"] , [data-scope="props"]');//資料欄位外層的容器
//		var field_ary = $(_jq).find('[data-scope="keyValue"]');//資料欄位
//		for(var i = 0;i<wrapper_ary.length;i++) DDK.ModuleKit.DynamicValue.wrapperObserver.observe(wrapper_ary[i], {
//		  attributes: true //configure it to listen to attribute changes
//		});
//		if($(_jq).attr('data-io') != undefined) DDK.ModuleKit.DynamicValue.wrapperObserver.observe($(_jq)[0], {
//		  attributes: true //configure it to listen to attribute changes
//		});
//		/*for(var i = 0;i<field_ary.length;i++) DDK.ModuleKit.DynamicValue.wrapperObserver.observe(field_ary[i], {
//		  attributes: true //configure it to listen to attribute changes
//		});*/
//	}
//	,
//	/**
//	!資料欄位外層的容器的屬性發生變化.
//	>_ary Array|由new MutationObserver 拋回來,屬性發生變化的元素清單陣列.
//	*/
//	watchWrapperAttributes:function(_ary){
//		var tmp , _io;
//		for(var i = 0;i<_ary.length;i++){
//			tmp = _ary[i].target;
//			_io = Boolean(Number($(tmp).attr('data-io')));//目前只檢查這個屬性
//			if(_io == true){
//				$(tmp).removeClass('off').addClass('open');
//				//$(tmp).find('*[data-scope="keyValue"]').attr('data-io' , '1');
//			} else {
//				$(tmp).removeClass('open').addClass('off');
//				//$(tmp).find('*[data-scope="keyValue"]').attr('data-io' , '0');
//				//console.log($(tmp).find('> [data-scope="keyValue"]'));
//			}
//			
//		}
//	}
//	,
//	/**
//	!資料欄位的屬性發生變化.
//	>_ary Array|由new MutationObserver 拋回來,屬性發生變化的元素清單陣列.
//	*/
//	watchValueInputAttributes:function(_ary){
//		var tmp;
//		for(var i = 0;i<_ary.length;i++){
//			tmp = _ary[i].target;
//			//console.log(tmp);
//			//console.log($(tmp).attr('data-io'));
//		}
//	}
	,
	/**
	將資料寫回樣板內的欄位.
	>_mod jQuery Object|目前網頁上的模組參照.
	>_data Object|資料內容.
	*/
	restoreModuleByData:function(_mod , _data){
		if($(_mod).attr('class').indexOf('TextModule') > -1){//TextModule 一般的文字訊息
			
			return DDK.ModuleKit.TextModule.restoreModule(_mod , _data);
		} else if($(_mod).attr('class').indexOf('ImageModule') > -1){//ImageModule 一般的圖片訊息
			
			return DDK.ModuleKit.ImageModule.restoreModule(_mod , _data);
		} if($(_mod).attr('class').indexOf('ImageCardsModule') > -1){//ImageCardsModule 只有圖片與連結的卡牌
			
			return DDK.ModuleKit.ImageCardsModule.restoreModule(_mod , _data);
		} if($(_mod).attr('class').indexOf('FancyCardsModule') > -1){//FancyCardsModule 最複雜的卡牌
			
			return DDK.ModuleKit.FancyCardsModule.restoreModule(_mod , _data);
		}
		return false;
	}
	,
	/**
	!單純的文字訊息樣板,在顯示時須處理其內的網址文字為有效的<a>,在1.31.1 版中在[Bot項目 / 訊息 / 1.Intro](Line Bot Designer : text).
	*/
	TextModule:{
		init:function(_jq){		
		}
		,
		reCall:function(){
			
		}
		,
		/**
		將資料寫回樣板內的欄位.
		>_mod jQuery Object|目前網頁上的模組參照.
		>_data Object|資料內容.
		*/
		restoreModule:function(_mod , _data){
			var excute_ary = [];
			if(_data.text.length > 50){
				var count = 25;
				var _max = (_data.text.length%count == 0) ? _data.text.length/count : _data.text.length/count + 1;
				var scode = '';
				for(var i = 0;i<_max;i++){
					if(i == _max - 1){
						scode = _data.text.substring(0 , _data.text.length);
						excute_ary.push({/*縮圖*/
							cardRoot:$(_mod).find('[data-scope="anonymousProps"][data-io="1"]'),
							data:scode,
							redo:function(){
								$(this.cardRoot).find('textarea').val(this.data);
							}
						});
					} else {
						scode = _data.text.substring(0 , i*count);
						excute_ary.push({/*縮圖*/
							cardRoot:$(_mod).find('[data-scope="anonymousProps"][data-io="1"]'),
							data:scode,
							redo:function(){
								$(this.cardRoot).find('textarea').val(this.data);
							}
						});
					}
				}
			} else {
				excute_ary.push({/*縮圖*/
					cardRoot:$(_mod).find('[data-scope="anonymousProps"][data-io="1"]'),
					data:_data,
					redo:function(){
						$(this.cardRoot).find('textarea').val(this.data.text);
					}
				});
			}
			
			return excute_ary;
		}

	}
	,
	/**
	!只有圖片訊息樣板,在1.31.1 版中在[Bot項目 / 訊息 / 圖片訊息](Line Bot Designer : image).
	*/
	ImageModule:{
		init:function(_jq){
			FxAddEventListener(_jq , 'change' , DDK.ModuleKit.fileInputSetTimeStamp , false);
			DDK.ModuleKit.saveAddedEventInstance(_jq);//記錄有被加入事件的元素參照
		}
		,
		reCall:function(){
			
		}
		,
		/**
		將資料寫回樣板內的欄位.
		>_mod jQuery Object|目前網頁上的模組參照.
		>_data Object|資料內容.
		*/
		restoreModule:function(_mod , _data){
			var excute_ary = [];
			excute_ary.push({/*動畫屬性*/
				cardRoot:$(_mod).find('.soloImageSize').parent(),
				data:_data,
				redo:function(){
					$(this.cardRoot).find('[data-scope="keyValue"][data-key="animated"]').val(Number(this.data.animated));
				}
			});
			excute_ary.push({/*縮圖*/
				cardRoot:$(_mod).find('.soloImageSize').parent(),
				data:_data,
				redo:function(){
					$(this.cardRoot).find('#soloMsgImageTarget').attr('src' , this.data.originalContentUrl);
					DDK.Equalizer.setImageAlign($(this.cardRoot).find('#soloMsgImageTarget').parent().prop('tagName') , $(this.cardRoot).find('#soloMsgImageTarget')[0]);
				}
			});
			return excute_ary;
		}

	}
	,
	/**
	!含有圖片與一個標題的卡牌樣板,此樣板在1.31.1 版中未提供(Line Bot Designer : image_carousel).
	*/
	ImageCardsModule:{
		init:function(_jq){
			$(_jq).find('input[data-mirror-target]').each(function(){
				if($(this).attr('data-mirror-target') == '') return;//沒有指定鏡射目標,跳過
				var _inputType = $(this).attr('data-mirror-type');//鏡射的種類
				if(_inputType == 'file-image'){//圖檔
					FxAddEventListener(this , 'change' , DDK.ModuleKit.fileInputSetTimeStamp , false);
					DDK.ModuleKit.saveAddedEventInstance(this);//記錄有被加入事件的元素參照
				} else if(_inputType == 'uri-data'){//網址
					var _a = document.getElementById($(this).attr('data-mirror-target'));
					FxAddEventListener(_a , 'click' , DDK.ModuleKit.executableLinkConfirm , false);
					DDK.ModuleKit.saveAddedEventInstance(_a);//記錄有被加入事件的元素參照
				}
			});
			//FxAddEventListener(_jq , 'change' , DDK.ModuleKit.fileInputSetTimeStamp , false);
			//DDK.ModuleKit.saveAddedEventInstance(_jq);//記錄有被加入事件的元素參照
		}
		,
		reCall:function(){
			
		}
		,
		/**
		將資料寫回樣板內的欄位.
		>_mod jQuery Object|目前網頁上的模組參照.
		>_data Object|資料內容.
		*/
		restoreModule:function(_mod , _data){
			var _ary = _data.template.columns;
			var cardSetCounts = _ary.length;//使用的牌卡數量
			var excute_ary = [];
			var tmp , card;
			excute_ary.push({
				redo:function(){
					$(_mod).find('[data-scope="keyValue"][data-key="altText"]').val(_data.altText);//還原Alt Text 內容
				}
			});
			excute_ary.push({
				redo:function(){
					var tmp = $(_mod).find('.numbersCount input[value="' + cardSetCounts + '"]');//還原牌卡張數
					
					tmp.prop('checked' , true);
					DDK.OptionsUICaptain.cardsNumberSelection({currentTarget:tmp[0]});//強制驅動按鈕事件初始化使用圖檔
					
				}
			});
			for(var i = 0;i<_ary.length;i++){
				tmp = _ary[i];
				
				card = $(_mod).find('[data-key="columns"]').parent().eq(i);//牌卡參照
				excute_ary.push({/*縮圖*/
					cardRoot:card,
					data:_ary[i],
					redo:function(){
						$(this.cardRoot).find('.imageCardsMask img').attr('src' , this.data.imageUrl);
						DDK.Equalizer.setImageAlign($(this.cardRoot).find('.imageCardsMask').prop('tagName') , $(this.cardRoot).find('.imageCardsMask img')[0]);
					}
				});
				excute_ary.push({/*檔案上傳欄位*/
					cardRoot:card,
					data:_ary[i],
					redo:function(){
						$(this.cardRoot).find('.propsWrapper input[type="file"]').attr('data-io' , '1');
					}
				});
				excute_ary.push({/*按鈕文字*/
					cardRoot:card,
					data:_ary[i],
					redo:function(){
						$(this.cardRoot).find('.propsWrapper .uriLabel').val(this.data.action.label);
					}
				});
				excute_ary.push({/*按鈕網址*/
					cardRoot:card,
					data:_ary[i],
					redo:function(){
						$(this.cardRoot).find('.propsWrapper .uriData').val(this.data.action.uri);
					}
				});
			}
			return excute_ary;
		}

	}
	,
	/**
	!含有圖片與文字及文字標籤按鈕的卡牌樣板,在1.31.1 版中在[Bot項目 / 訊息 / 8.2 CTM_Cards](Line Bot Designer : carousel).
	*/
	FancyCardsModule:{
		init:function(_jq){
			$(_jq).find('input[data-mirror-target]').each(function(){
				if($(this).attr('data-mirror-target') == '') return;//沒有指定鏡射目標,跳過
				var _inputType = $(this).attr('data-mirror-type');//鏡射的種類
				if(_inputType == 'file-image'){//圖檔
					FxAddEventListener(this , 'change' , DDK.ModuleKit.fileInputSetTimeStamp , false);
					DDK.ModuleKit.saveAddedEventInstance(this);//記錄有被加入事件的元素參照
				} else if(_inputType == 'uri-data'){//網址
					var _a = document.getElementById($(this).attr('data-mirror-target'));
					FxAddEventListener(_a , 'click' , DDK.ModuleKit.executableLinkConfirm , false);
					DDK.ModuleKit.saveAddedEventInstance(_a);//記錄有被加入事件的元素參照
				}
			});
		}
		,
		reCall:function(){
			
		}
		,
		/**
		將資料寫回樣板內的欄位.
		>_mod jQuery Object|目前網頁上的模組參照.
		>_data Object|資料內容.
		*/
		restoreModule:function(_mod , _data){
			var _ary = _data.template.columns;
			var cardSetCounts = _ary.length;//使用的牌卡數量
			var actionSetCounts = _ary[0].actions.length;//動作按鈕使用的數量
			var isThumbnail = (_ary[0].thumbnailImageUrl == undefined) ? false : true;//使用圖片
			var isTitle = (_ary[0].title == undefined) ? false : true;//使用大標
			//動作按鈕,圖片與大標每張牌卡的啟用與否是同步的
			var excute_ary = [];
			var tmp , card , actionsGroup;//物件
			var _actions;
			excute_ary.push({
				redo:function(){
					$(_mod).find('[data-scope="keyValue"][data-key="altText"]').val(_data.altText);//還原Alt Text 內容
				}
			});
			excute_ary.push({
				redo:function(){
					var tmp = $(_mod).find('.numbersCount.cards input[value="' + cardSetCounts + '"]');
					tmp.prop('checked' , true);//還原卡牌張數
					DDK.OptionsUICaptain.cardsNumberSelection({currentTarget:tmp[0]});//強制驅動按鈕事件
					DDK.OptionsUICaptain.fancyCardsUpdateMainTitleIO({currentTarget:tmp[0] , test:'restoreModule'});//強制驅動按鈕事件,還原每張牌卡大標的啟用或不啟用
					DDK.OptionsUICaptain.fancyCardsUpdateSubTitleIO({currentTarget:tmp[0]});//強制驅動按鈕事件,還原每張牌卡主標的啟用或不啟用
				}
			});
			excute_ary.push({
				redo:function(){
					var tmp = $(_mod).find('.numbersCount.thumb input[value="' + Number(isThumbnail) + '"]');
					tmp.prop('checked' , true);//還原使用縮圖
					
					DDK.OptionsUICaptain.fancyCardsEnableThumbnail({currentTarget:tmp[0]});//強制驅動按鈕事件初始化使用圖檔(此時會將所有牌卡圖檔上傳欄位設為啟用)
					var file_ary = $(_mod).find('.fancyCardsBubble .propsWrapper input[type="file"]');//所有牌卡的圖檔上傳欄位
					for(var i = _data.template.columns.length;i<file_ary.length;i++){//將舊資料範圍以外的牌卡的圖檔欄位改為未啟用
						file_ary.eq(i).attr('data-io' , '0');
					}
				}
			});
			excute_ary.push({
				redo:function(){
					var tmp = $(_mod).find('.numbersCount.title input[value="' + Number(isTitle) + '"]');
					tmp.prop('checked' , true);//還原使用大標
					DDK.OptionsUICaptain.fancyCardsEnableTitle({currentTarget:tmp[0]});//強制驅動按鈕事件,開啟或關閉大標的鏡射功能
				}
			});
			excute_ary.push({
				redo:function(){
					var tmp = $(_mod).find('.numbersCount.actions input[value="' + actionSetCounts + '"]');
					tmp.prop('checked' , true);//還原動作按鈕數量
					DDK.OptionsUICaptain.fancyCardsSetActionButtonNumbers({currentTarget:tmp[0]});//強制驅動按鈕事件,設定動作按鈕數量
				}
			});

			for(var i = 0;i<_ary.length;i++){
				tmp = _ary[i];
				
				card = $(_mod).find('[data-key="columns"]').parent().eq(i);//牌卡參照
				if(_ary[i].thumbnailImageUrl != undefined){//圖片
					excute_ary.push({
						cardRoot:card,
						data:_ary[i],
						redo:function(){
							$(this.cardRoot).find('.fancyCardsMask img').attr('src' , this.data.thumbnailImageUrl);
							DDK.Equalizer.setImageAlign($(this.cardRoot).find('.fancyCardsMask').prop('tagName') , $(this.cardRoot).find('.fancyCardsMask img')[0]);
						}
					});
				}
				if(_ary[i].title != undefined){//大標
					excute_ary.push({
						cardRoot:card,
						data:_ary[i],
						redo:function(){
							$(this.cardRoot).find('.propsWrapper .mainTitle').val(this.data.title);
						}
					});
				}
				excute_ary.push({/*主標*/
					cardRoot:card,
					data:_ary[i],
					redo:function(){
						$(this.cardRoot).find('.propsWrapper .subTitle').val(this.data.text);
					}
				});
				for(var j = 0;j<actionSetCounts;j++){
					excute_ary.push({
						cardRoot:card,
						data:_ary[i].actions[j],
						groupIndex:j,
						redo:function(){
							var group = $(this.cardRoot).find('.actionsGroup').eq(this.groupIndex);
							var tmp = $(group).find('input[type="radio"][value="' + this.data.type + '"]');
							tmp.prop('checked' , true);
							DDK.OptionsUICaptain.fancyCardsSwitchActionType({currentTarget:tmp[0]});//強制驅動按鈕事件,設定每張牌卡上的每組動作按鈕模式
							if(this.data.type == 'message'){//訊息文字
								$(group).find('.labelText').val(this.data.label);
								$(group).find('.labelTextData').val(this.data.text);
							} else if(this.data.type == 'uri'){//網址
								$(group).find('.uriLabel').val(this.data.label);
								$(group).find('.uriData').val(this.data.uri);
							} else if(this.data.type == 'postback'){//資料
								$(group).find('.textDataLabel').val(this.data.label);
								$(group).find('.textData').val(this.data.data);
							}
						}
					});
				}
			}
			return excute_ary;
			
		}
	}
};
/**
!資料輸出功能,有TextModule(純文字) , ImageModule(單張圖) , ImageCardsModule(只有圖片的牌卡"image_carousel") , FancyCardsModule(夾雜文字與圖片的排卡"carousel").
*/
DDK.DataExport = {
/*重要!!
HTML 擴充屬性說明:
data-scope:
相對於在Javascript Object 中的變數型態.
	"node" 陣列的一個元素.
    "props" 一個物件.
    "anonymousProps" 一個不需要名稱的物件,即時同時有data-key 的值也不需理會.
    "keyValue" 一個有名稱(key)的值(value).
	
data-key:
文字或檔案或任何欄位的值(value)在編成Javascript Object 內容時的名稱(key).

data-io:
是否啟用,1 啟用 , 0 不啟用.

data-mirror-target:
欄位對應預覽畫面中,當內容發生異動時,需要同步的目標的id.

data-mirror-type:
欄位對應預覽畫面中,當內容發生異動時,該內容需要表現在視覺上的格式.
	"file-image" 檔案的圖檔.
    "text" 一般的文字.
    "fancy-text" 複雜的,可能有折行或其中需要轉換為網址文字表示的文字.
    "label-text" 用作標題的文字,包含Action 文字標籤按鈕的標籤.
    "uri-data" Action 文字標籤按鈕要執行的連結.
    "alert-data-text" 透過Alert 之類的方式回應給使用者的文字.
    
data-files-length:
檔案欄位需要的選定檔案數量.

data-files-filter:
檔案欄位允許選擇的副檔名種類,以逗號分隔且小寫.

data-char-min-length:
文字欄位最低的寫入字數量.

data-char-max-length:
文字欄位最大的寫入字數量.
	*/
	ConstantStatic:{
	}
	,
	DynamicValue:{
		
	}
	,
	init:function(){
		
	}
	,
	reCall:function(){
		
	}
	,
	/**
	!Line Bot Designer : text
    單純的文字訊息樣板,在顯示時須處理其內的網址文字為有效的<a>,在1.31.1 版中在[Bot項目 / 訊息 / 1.Intro]
	*/
	TextModule:{
		/**
		!輸出"Text"樣板的JSON 格式資料.
		@回傳 Object|具有基本資料內容的物件.
		*/
		exportJSON : function(_root){
			if(_root.charAt(_root.length - 1) != ' ') _root += ' ';//刻意為jQuery 的選取補一個空白
			var rowData = DDK.DataExport.TextModule.getPropsData(_root + '[data-scope="anonymousProps"][data-io="1"]')/*文字訊息內容*/;
			var final_json = JSON.stringify(rowData);
			if(DDK.Mutual.ConstantStatic.ALLOW_CONSOLE == true){
				console.log(rowData);
				console.log(final_json);
			}
			return final_json;
		}
		,
		getPropsData : function(_selector){
			var template = {
				type:'text'
			};
			var _input , valueName;
			_input = $(_selector).find('>[data-scope="keyValue"][data-io="1"]')[0];//尋找結構第一層啟用中的key value 形式欄位,只會有一個欄位
		
			valueName = $(_input).attr('data-key');
			template[valueName] = (FxHasAttribute(_input , 'data-uri-marker') == true) ? FxReplace(_input.value , FxGetAttribute(_input , 'data-uri-marker') , '')/*是否有網址字串末端的辨識符號要先移除*/ : _input.value;
			//template[valueName] = FxReplace(template[valueName] , '\n' , '\\n');
			return template;
		}
	}
	,
	/**
	!Line Bot Designer : image
    含有圖片與文字及文字標籤按鈕的卡牌樣板,在1.31.1 版中在[Bot項目 / 訊息 / 圖片訊息]
	*/
	ImageModule:{
		/**
		!輸出"image"樣板的JSON 格式資料.
		@回傳 Object|具有基本資料內容的物件.
		*/
		exportJSON : function(_root){
			if(_root.charAt(_root.length - 1) != ' ') _root += ' ';//刻意為jQuery 的選取補一個空白
			var rowData = DDK.DataExport.ImageModule.getPropsData(_root + '[data-scope="anonymousProps"][data-io="1"]')/*圖片訊息內容*/;
			var final_json = JSON.stringify(rowData);
			if(DDK.Mutual.ConstantStatic.ALLOW_CONSOLE == true){
				console.log(rowData);
				console.log(final_json);
			}
			return final_json;
		}
		,
		/**
		!取得單張圖片訊息內容資料.
		@回傳 Object|{type , ...}
		*/
		getPropsData : function(_selector){
			var template = {
				type:'image',
				previewImageUrl:''/*預覽圖片內容,沒有實質意義,預覽圖片由後端製作*/
			};
			var _input , valueName , valueType;
			var existData = DDK.DataImport.restoreData();
			_input = $(_selector).find('>[data-scope="keyValue"][data-io="1"][type="file"]')[0];//尋找結構第一層啟用中的key value 形式file 欄位,只會有一個欄位
			valueName = $(_input).attr('data-key');
			valueType = $(_input).attr('type');
			if(existData != null && existData.module == 'ImageModule' && $(_input).attr('alt') == ''){//有既有資料且沒有選擇新的圖檔
				template[valueName] = existData.data[valueName];//回填JSON 內資料
				template.previewImageUrl = existData.data.previewImageUrl;//回填JSON 內資料
			} else {
				template[valueName] = _input.name;//_input.files[0].name;
				template.previewImageUrl = _input.name;//沒有實質意義,預覽圖片由後端製作;
			}
			
			_input = $(_selector).find('>[data-scope="keyValue"][data-io="1"][type="radio"]')[0];//尋找結構第一層啟用中的key value 形式radio 欄位,只會有一個欄位
			valueName = $(_input).attr('data-key');
			template[valueName] = Boolean(Number($(_input).val()));
			return template;
		}
	}
	,
	/**
	!Line Bot Designer : image_carousel
    含有圖片與一個標題的卡牌樣板,此樣板在1.31.1 版中未提供.
	*/
	ImageCardsModule:{
		/**
		!輸出"image_carousel"樣板的JSON 格式資料.
		@回傳 Object|具有基本資料內容的物件.
		*/
		exportJSON : function(_root){
			if(_root.charAt(_root.length - 1) != ' ') _root += ' ';//刻意為jQuery 的選取補一個空白
			var rowData = {
				type:'template',
				altText:$(_root + '[data-scope="keyValue"][data-key="altText"]').val(),
				template:DDK.DataExport.ImageCardsModule.getColumnsData(_root + '[data-key="columns"][data-io="1"]')/*樣板全域設定與每張牌卡內容*/
			};
			var final_json = JSON.stringify(rowData);
			if(DDK.Mutual.ConstantStatic.ALLOW_CONSOLE == true){
				console.log(rowData);
				console.log(final_json);
			}
			return final_json;
		}
		,
		/**
		!取得牌卡型態的內容資料.
		@回傳 Object|{type , actions , columns}
		*/
		getColumnsData : function(_selector){
			var template = {
				type:'image_carousel',
				/*actions:[]似乎沒有實際用途,*/
				columns:[]/*牌卡內容*/
			};
			//var cards_ary = $(_selector);
			var cards_ary = [];
			var tmp , tmpAry , isDisabled , data , _input , valueName , valueType;
			var existData = DDK.DataImport.restoreData();
			$(_selector).each(function(){//挑選有使用但沒有被棄用的牌卡
				var tmp = $(this).closest('.basicBubble').find('.propsWrapper');
				if(
					Boolean(Number(tmp.attr('data-io'))) == true && 
					Boolean(Number(tmp.attr('data-card-disabled'))) == false
				) cards_ary.push(this);
			});
			//--取得牌卡的所有資料 begin
			//
			for(var i = 0;i<cards_ary.length;i++){
				tmp = cards_ary[i];
				
				data = {};
				//--取得牌卡的縮圖,大標,主標 begin
				tmpAry = $(tmp).find('>[data-scope="keyValue"][data-io="1"] , > .fileSelectorWrapper [data-scope="keyValue"][data-io="1"]');//尋找結構第一層啟用中的key value 形式欄位
				for(var j = 0;j<tmpAry.length;j++){
					_input = tmpAry[j];
					valueName = $(_input).attr('data-key');
					valueType = $(_input).attr('type');
					if(valueType == 'file'){/*檔案欄位*/
						if(existData != null && existData.module == 'ImageCardsModule' && $(_input).attr('alt') == ''){//有既有資料且沒有選擇新的圖檔
							//data[valueName] = existData.data.template.columns[i][valueName];//回填JSON 內資料
							data[valueName] = $('#' + $(_input).attr('data-mirror-target')).attr('src');//回填鏡射目標圖檔的src 內容
						} else {
							data[valueName] = _input.name;//_input.files[0].name;
						}
					}//只會有檔案欄位
				}
				//--取得牌卡的縮圖,大標,主標 end
				
				//--取得Action 文字標籤按鈕設定 begin
				tmpAry = $(tmp).find('[data-key="action"][data-io="1"]');//尋找牌卡的Action 文字標籤按鈕設定,理論上一張牌卡會至少有一個Action 文字標籤按鈕
				valueName = $(tmpAry[0]).attr('data-key');
				data[valueName] = DDK.DataExport.ImageCardsModule.getActionData(
					$(tmpAry[0]).find('>[data-scope="anonymousProps"][data-io="1"]')/*每一個啟用的Action 文字標籤按鈕設定*/
				)[0];//建構Action 文字標籤按鈕設定用的陣列內的第一個元素
				/*
				for(var j = 0;j<tmpAry.length;j++){
					data[valueName].push(
						
					);//每一個啟用的Action 文字標籤按鈕設定
					
				}
				*/
				//--取得Action 文字標籤按鈕設定 end
				template.columns.push(data);
				
			}
			//--取得牌卡的所有資料 end
			return template;
		}
		,
		/**
		!解析Action 文字標籤按鈕內的設定資料.
		@回傳 Array|[{type , label , text , data...}]
		*/
		getActionData : function(_jq){
			var actionType , actionData , tmp;
			var r = [];
			for(var i = 0;i<_jq.length;i++){
				tmp = _jq[i];
				actionType = $(tmp).find('[data-scope="keyValue"][data-key="type"]:checked').val();//message 或uri 或postback
				actionData = {
					type:String(actionType),
					label:String($(tmp).find('[data-scope="keyValue"][data-key="label"]').val())
				};
				if(actionType == 'message'){
					actionData.text = String($(tmp).find('[data-scope="keyValue"][data-key="text"]').val());
				} else if(actionType == 'uri'){
					actionData.uri = String($(tmp).find('[data-scope="keyValue"][data-key="uri"]').val());
				} else if(actionType == 'postback'){
					actionData.data = $(tmp).find('[data-scope="keyValue"][data-key="data"]').val();
					if($(tmp).find('[data-scope="keyValue"][data-key="text"]').val() != '') actionData.text = String($(tmp).find('[data-scope="keyValue"][data-key="text"]').val());
				}
				r.push(actionData);
			}
			
			return r;
		}
	}
	,
	/**
	Line Bot Designer : carousel
    含有圖片與文字及文字標籤按鈕的卡牌樣板,在1.31.1 版中在[Bot項目 / 訊息 / 8.2 CTM_Cards]
	*/
	FancyCardsModule:{
		/**
		!輸出"carousel"樣板的JSON 格式資料.
		@回傳 Object|具有基本資料內容的物件.
		*/
		exportJSON : function(_root){
			if(_root.charAt(_root.length - 1) != ' ') _root += ' ';//刻意為jQuery 的選取補一個空白
			var rowData = {
				type:'template',
				altText:$(_root + '[data-scope="keyValue"][data-key="altText"]').val(),
				template:DDK.DataExport.FancyCardsModule.getColumnsData(_root + '[data-key="columns"][data-io="1"]')/*樣板全域設定與每張牌卡內容*/
			};
			var final_json = JSON.stringify(rowData);
			if(DDK.Mutual.ConstantStatic.ALLOW_CONSOLE == true){
				console.log(rowData);
				console.log(final_json);
			}
			return final_json;
		}
		,
		/**
		!取得牌卡型態的內容資料.
		@回傳 Object|{type , actions , columns}
		*/
		getColumnsData : function(_selector){
			var template = {
				type:'carousel',
				actions:[]/*似乎沒有實際用途*/,
				columns:[]/*牌卡內容*/
			};
			var cards_ary = [];
			var tmp , tmpAry , data , _input , valueName , valueType;
			var existData = DDK.DataImport.restoreData();
			$(_selector).each(function(){//挑選有使用但沒有被棄用的牌卡
				var tmp = $(this).closest('.basicBubble').find('.propsWrapper');
				if(
					Boolean(Number(tmp.attr('data-io'))) == true && 
					Boolean(Number(tmp.attr('data-card-disabled'))) == false
				) cards_ary.push(this);
			});
			//--取得牌卡的所有資料 begin
			for(var i = 0;i<cards_ary.length;i++){
				tmp = cards_ary[i];
				data = {};
				//--取得牌卡的縮圖,大標,主標 begin
				tmpAry = $(tmp).find('>[data-scope="keyValue"][data-io="1"] , > .fileSelectorWrapper [data-scope="keyValue"][data-io="1"]');//尋找結構第一層啟用中的key value 形式欄位
				for(var j = 0;j<tmpAry.length;j++){
					_input = tmpAry[j];
					valueName = $(_input).attr('data-key');
					valueType = $(_input).attr('type');
					if(valueType == 'file'){/*檔案欄位*/
						data[valueName] = _input.name;//_input.files[0].name;
						if(existData != null && existData.module == 'FancyCardsModule' && $(_input).attr('alt') == ''){//有既有資料且沒有選擇新的圖檔
							//data[valueName] = existData.data.template.columns[i][valueName];//回填JSON 內該欄位原始資料
							data[valueName] = $('#' + $(_input).attr('data-mirror-target')).attr('src');//回填鏡射目標圖檔的src 內容
						} else {
							data[valueName] = _input.name;//_input.files[0].name;
						}
					} else {
						data[valueName] = String(_input.value);
					}
				}
				//--取得牌卡的縮圖,大標,主標 end
				
				//--取得Action 文字標籤按鈕設定 begin
				tmpAry = $(tmp).find('[data-key="actions"][data-io="1"]');//尋找牌卡的Action 文字標籤按鈕設定,一張牌卡至少有一種Action 是有值的
				valueName = $(tmpAry[0]).attr('data-key');
				data[valueName] = DDK.DataExport.FancyCardsModule.getActionData(
					$(tmpAry[0]).find('>[data-scope="anonymousProps"][data-io="1"]')/*每一個啟用的Action 文字標籤按鈕設定*/
				);//建構Action 文字標籤按鈕設定用的陣列
				/*
				for(var j = 0;j<tmpAry.length;j++){
					data[valueName].push(
						
					);//每一個啟用的Action 文字標籤按鈕設定
					
				}
				*/
				//--取得Action 文字標籤按鈕設定 end
				template.columns.push(data);
			}
			//--取得牌卡的所有資料 end
			return template;
		}
		,
		/**
		!解析Action 文字標籤按鈕內的設定資料.
		@回傳 Array|[{type , label , text , data...}]
		*/
		getActionData : function(_jq){
			var actionType , actionData , tmp;
			var r = [];
			for(var i = 0;i<_jq.length;i++){
				tmp = _jq[i];
				actionType = $(tmp).find('[data-scope="keyValue"][data-key="type"]:checked').val();//message 或uri 或postback
				actionData = {
					type:String(actionType),
					label:String($(tmp).find('[data-scope="keyValue"][data-key="label"][data-io="1"]').val())/*有三個標題欄位,要選取作用中的*/
				};
				if(actionType == 'message'){
					actionData.text = String($(tmp).find('[data-scope="keyValue"][data-key="text"]').val());
				} else if(actionType == 'uri'){
					actionData.uri = String($(tmp).find('[data-scope="keyValue"][data-key="uri"]').val());
				} else if(actionType == 'postback'){
					actionData.data = $(tmp).find('[data-scope="keyValue"][data-key="data"]').val();
					//if($(tmp).find('[data-scope="keyValue"][data-key="text"]').val() != '') actionData.text = String($(tmp).find('[data-scope="keyValue"][data-key="text"]').val());//postback 不輸出text 欄位
				}
				r.push(actionData);
			}
			
			return r;
		}
	}
};
/**
!資料匯入功能,有TextModule(純文字) , ImageModule(單張圖) , ImageCardsModule(只有圖片的牌卡"image_carousel") , FancyCardsModule(夾雜文字與圖片的排卡"carousel")
*/
DDK.DataImport = {
	
	ConstantStatic:{
	}
	,
	DynamicValue:{
		isReadOnly:null/*既有資料為唯獨模式*/,
		trueModuleName:null/*真實的模組名稱*/
	}
	,
	init:function(){
		DDK.DataImport.DynamicValue.isReadOnly = false;//預設值
		if(!document.getElementById('restoreImport') == true) return;//跳出
		var dataSheet = document.getElementById('restoreImport');
		DDK.DataImport.DynamicValue.isReadOnly = Boolean(Number(FxGetAttribute(dataSheet , 'data-readonly')));
		var _type = FxGetAttribute(dataSheet , 'data-module');
		var tmp = dataSheet.innerHTML;
		var tmpJSON = JSON.parse(tmp);
		DDK.DataImport.DynamicValue.trueModuleName = _type;//保留真實的模板名稱避免在辨識FancyCardsModule AutoMerchandiseModule 時混淆
		if(_type == 'TextModule'){//TextModule 一般的文字訊息
			DDK.DataImport.TextModule.data = tmp;
		} else if(_type == 'ImageModule'){//ImageModule 一般的圖片訊息
			DDK.DataImport.ImageModule.data = tmp;
		} else if(_type == 'ImageCardsModule'){//ImageCardsModule 只有圖片與連結的卡牌
			DDK.DataImport.ImageCardsModule.data = tmp;
		} else if(_type == 'FancyCardsModule' || _type == 'AutoMerchandiseModule'){//FancyCardsModule(AutoMerchandiseModule) 最複雜的卡牌
			DDK.DataImport.FancyCardsModule.data = tmp;
		}
//		if(tmpJSON.type == 'text'){//TextModule 一般的文字訊息
//			DDK.DataImport.TextModule.data = tmp;
//		} else if(tmpJSON.type == 'image'){//ImageModule 一般的圖片訊息
//			DDK.DataImport.ImageModule.data = tmp;
//		} else if(tmpJSON.type == 'template'){//ImageCardsModule 只有圖片與連結的卡牌 或 FancyCardsModule 最複雜的卡牌
//			if(tmpJSON.template.type == 'image_carousel'){//ImageCardsModule 只有圖片與連結的卡牌
//				DDK.DataImport.ImageCardsModule.data = tmp;
//			} else if(tmpJSON.template.type == 'carousel'){//FancyCardsModule 最複雜的卡牌
//				DDK.DataImport.FancyCardsModule.data = tmp;
//			}
//		}
	}
	,
	reCall:function(){
		DDK.DataImport.DynamicValue.trueModuleName = null;
		DDK.DataImport.DynamicValue.isReadOnly = null;
		DDK.DataImport.TextModule.data = null;
		DDK.DataImport.ImageModule.data = null;
		DDK.DataImport.ImageCardsModule.data = null;
		DDK.DataImport.FancyCardsModule.data = null;
	}
	,
	/**
	!回傳既有的樣板編輯資料.若沒有既有的編輯資料則回傳null.
	@回傳 Object/null|既有的樣板編輯資料或null.
	*/
	restoreData:function(){
		var _ary = ['TextModule' , 'ImageModule' , 'ImageCardsModule' , 'FancyCardsModule'];
		for(var i = 0;i<_ary.length;i++) if(DDK.DataImport[_ary[i]].data != null) return {module:_ary[i] , data:JSON.parse(DDK.DataImport[_ary[i]].data) , isReadOnly:DDK.DataImport.DynamicValue.isReadOnly , trueModule:DDK.DataImport.DynamicValue.trueModuleName};
		return null;//如果沒有既有資料.
		
	}
	,
	TextModule:{
		data:null
	},
	ImageModule:{
		data:null
	},
	ImageCardsModule:{
		data:null
	},
	FancyCardsModule:{
		data:null
	}
};
/**
!鏡射資料來源到指定的元素(所見即所得).
*/
DDK.Equalizer = {
	/**
	!將複雜的文字內容鏡射到畫面時的細節.通常包含折行與<a>
	>_jq jQuery Object|欄位的某層父系結構參照.
	@回傳 Function|執行細節.
	*/
	mirrorFancyText:function(_jq){
		var chk;
		($(_jq).attr('data-mirror-target') == '') ? chk = false : chk = true;
		if(chk == true) $(_jq).attr('data-equalizer' , 'mirrorFancyText');//有鏡射目標
		return {
			canMirror:chk,
			sourceTarget:_jq[0],
			sourceRoot:$(_jq[0]).closest('section[data-io]'),
			equalFunc:function(){
				if(this.canMirror == false) return;//沒有鏡射目標,跳出
				var _target = document.getElementById($(_jq).attr('data-mirror-target'));//取得要將內容同步過去的元素
				var _type = $(_jq).attr('data-mirror-type');//同步內容的格式
				var _uriMarker = (FxHasAttribute($(_jq)[0] , 'data-uri-marker') == true && $(_jq).attr('data-uri-marker') != '') ? $(_jq).attr('data-uri-marker') : '';//網址字串末端的辨識符號
				
				var _content = $(_jq).val();//內容
				
				if(_content == '') return;//跳出
				var htmlContent = DDK.Equalizer.formatTextContent(_content , _type , _uriMarker);//轉換成HTML 內容
				
				//var pureContent = FxReplace(_content , _uriMarker , '');//去除掉網址字串末端的辨識符號進行比對
				if($(_target).html() != htmlContent) {//目標原始碼的"文字"不等於來源的文字
					//var _ary = $(_target).find('a[fx-event-ids]');//有註冊過事件的<a>
					//if(_ary.length > 0) for(var i = 0;_ary.length;i++) FxRemoveEachEventListener(_ary[i]);//移除事件
					$(_target).empty().html(htmlContent);
					//_target.innerHTML = htmlContent;
					//_ary = $(_target).find('a');//需要註冊事件的<a>
					//if(_ary.length > 0) FxAddEventListener(_ary , 'click' , DDK.ModuleKit.executableLinkConfirm, false);
				}
				
				
			}
		};
	}
	,
	/**
	!將普通的文字內容鏡射到畫面時的細節.
	>_jq jQuery Object|欄位的某層父系結構參照.
	@回傳 Function|執行細節.
	*/
	mirrorText:function(_jq){
		var chk;
		($(_jq).attr('data-mirror-target') == '') ? chk = false : chk = true;
		if(chk == true) $(_jq).attr('data-equalizer' , 'mirrorText');//有鏡射目標
		return {
			canMirror:chk,
			sourceTarget:_jq[0],
			sourceRoot:$(_jq[0]).closest('section[data-io]'),
			equalFunc:function(){
				if(this.canMirror == false) return;//沒有鏡射目標,跳出
				var _target = document.getElementById($(_jq).attr('data-mirror-target'));//取得要將內容同步過去的元素
				var _type = $(_jq).attr('data-mirror-type');//同步內容的格式
				var _content = $(_jq).val();//內容
				if(_content == '') return;//跳出
				var htmlContent = DDK.Equalizer.formatTextContent(_content , _type);//轉換成HTML 內容
				if($(_target).html() != htmlContent) {
					$(_target).empty().append(htmlContent);
				}
				
			}
		};
	}
	,
	/**
	!將網址鏡射到畫面時的細節.
	>_jq jQuery Object|欄位的某層父系結構參照.
	@回傳 Function|執行細節.
	*/
	mirrorUriData:function(_jq){
		var chk;
		($(_jq).attr('data-mirror-target') == '') ? chk = false : chk = true;
		if(chk == true) $(_jq).attr('data-equalizer' , 'mirrorUriData');//有鏡射目標
		return {
			canMirror:chk,
			sourceTarget:_jq[0],
			sourceRoot:$(_jq[0]).closest('section[data-io]'),
			equalFunc:function(){
				if(this.canMirror == false) return;//沒有鏡射目標,跳出
				var _target = document.getElementById($(_jq).attr('data-mirror-target'));//取得要將內容同步過去的元素
				var _type = $(_jq).attr('data-mirror-type');//同步內容的格式
				var _content = $(_jq).val();//內容
				if(_content == '') return;//跳出
				/*_content = he.encode(
					_content,
					{'useNamedReferences': false}
				);//對HTML 特殊字元進行轉換*/
				if(_target.tagName.toLowerCase() != 'a'){
					//鏡射目標不是<a>
				} else {
					if(_content != '' && $(_target).attr('href') != _content) {
						$(_target).attr('href' , _content);
					}
				}
			}
		};
	}
	,
	/**
	!將<input type="file">選取的檔案內容鏡射到畫面時的細節.
	>_jq jQuery Object|欄位的某層父系結構參照.
	@回傳 Function|執行細節.
	*/
	mirrorImagePreview:function(_jq){
		var chk;
		($(_jq).attr('data-mirror-target') == '') ? chk = false : chk = true;
		if(chk == true) $(_jq).attr('data-equalizer' , 'mirrorImagePreview');//有鏡射目標
		return {
			canMirror:chk,
			sourceTarget:_jq[0],
			sourceRoot:$(_jq[0]).closest('section[data-io]'),
			equalFunc:function(){
				if(this.canMirror == false) return;//沒有鏡射目標,跳出
				var _target = document.getElementById($(_jq).attr('data-mirror-target'));//取得要將內容同步過去的元素
				var _type = $(_jq).attr('data-mirror-type');//同步內容的格式
				var _stamp = $(_jq).attr('alt');//記錄欄位選取檔案的時間戳記
				var _fileAry = $(_jq)[0].files;//欄位選取的檔案
				if(_fileAry.length == 0) return;//跳出
				if($(_target).attr('alt') != _stamp){//時間戳記不相等
					if(_type == 'file-image'){//圖檔格式的檔案
						
						DDK.Equalizer.setNewBase64Image(
							_fileAry[0] , 
							_target , 
							function(){
								DDK.Equalizer.setImageAlign(_target.parentElement.tagName , _target);//處理圖檔的縮圖
							}
						);
						
						$(_target).attr('alt' , _stamp);
					}
				}
				
			}
		};
	}
	,
	/**
	!格式化要鏡射的文字內容.
	>_ctx String|原文內容.
	>_type String|原文格式'fancy-text' , 'text' , 'label-text'.
	>_marker String|選擇性,標示在網址結尾處的特定字元.
	@回傳 String|格式化完成的字串.
	*/
	formatTextContent : function(_ctx , _type , _marker){
		var scode , tmp;
		if(_type == 'fancy-text'){//複雜的,可能有折行或其中需要轉換為網址文字表示的文字.
			
			var br = [{_pattern:'\n' , _fill:'<br>' , _mode:'all'}];
			var http = [];
			var https = [];
			_ctx = he.escape(
				_ctx/*,
				{'useNamedReferences': false}*/
			);//對HTML 特殊字元進行轉換
			if(arguments.length == 3 && arguments[2] != ''){
				if(_ctx.indexOf('http://') > -1 || _ctx.indexOf('https://') > -1){//檢查有無可視為網址的字元
					if(_ctx.indexOf('http://') > -1) http = DDK.Equalizer.packageHyperText('http://' , _ctx , _marker);
					if(_ctx.indexOf('https://') > -1) https = DDK.Equalizer.packageHyperText('https://' , _ctx , _marker);
				}
				
			}
			var replace_ary = br.concat(http , https);
			scode = FxReplace(_ctx , replace_ary);
		} else if(_type == 'text' || _type == 'label-text'){//一般的文字或標題文字.
			scode = he.escape(
				_ctx/*,
				{'useNamedReferences': false}*/
			);//對HTML 特殊字元進行轉換
		}
		return scode;
	}
	,
	/**
	!格式化要鏡射的文字中,需要用<a> 包裹的段落.
	>_header String|網址的portal 字串.
	>_ctx String|原文內容.
	>_symbol String|用來標記網址字串結尾的特定字元.
	@回傳 Array|FxReplace 大量操作用的陣列內容.
	*/
	packageHyperText : function(_header , _ctx , _symbol){
		var n = _ctx.split(_header).length - 1;//取得執行次數
		var lastPosition = 0;
		var startPosition = 0;
		var tmp;
		var url;
		var pattern = [];
		var alertText = he.escape(
				DDK.Mutual.TextScript.OPEN_LABEL_URL
			);//對HTML 特殊字元進行轉換
		for(var i = 0;i<n;i++){
			startPosition = _ctx.indexOf(_header , lastPosition);
			lastPosition = _ctx.indexOf(_symbol , startPosition) + _symbol.length;
			tmp = _ctx.substring(startPosition , lastPosition);
			url = tmp.substring(0 , tmp.length - _symbol.length);
			pattern.push({_pattern:tmp , _fill:'<a href="javascript:;" onclick="var r = confirm(\'' + alertText + '\');if(r == true) window.open(\'' + url + '\');void(0);">' + url + '</a>' , _mode:'first'});
		}
		//return FxReplace(_ctx , pattern);
		return pattern;
	}
	,
	/**
	!經由<input type="file"> 內指向的本地端檔案產生為base64 字串並指向一個<img>.
	>_file HTML files|<input type="file"> 內指向的本地端檔案.
	>_imgLoader HTML Object|<img> 的參照,其src 會被寫入轉換完成的base64 內容.
	>_afterFunc Function|在FileReader 確實載入檔案之後要執行的行為.
	*/
	setNewBase64Image:function(_file , _imgLoader , _afterFunc){
		var fileReader = new FileReader();
		var fileReaderLoadedTask = function(e){
			var base64Url = e.target.result;
			_imgLoader.src = base64Url;
			_afterFunc();
		};
		FxAddEventListener(fileReader , 'load' , fileReaderLoadedTask , false);
		fileReader.readAsDataURL(_file);
	}
	,
	/**
	!將圖檔配合父系容器作位置+尺寸最加化.
	>_parentTag String|圖檔的父系class 或標籤名稱.
	>_imgLoader HTML Object|<img> 的參照.
	*/
	setImageAlign:function(_parentTag , _imgLoader){
		$(_imgLoader).removeClass('animated').removeClass('flipInY').removeClass('flipInX');//圖片出現的特效
		$(_imgLoader).closest(_parentTag).removeClass('portraitSize').removeClass('landscapeSize');//圖片方向極限大小調整
		FxCheckMultiImgLoad({
			img_ary : [_imgLoader] , 
			interval : 'load',
			update : true,
			delay : 50,
			eachEnd : function(img , success){
				$(img).removeAttr('style').addClass('animated');
				if(img.clientWidth >= img.clientHeight){
					$(_imgLoader).closest(_parentTag).addClass('landscapeSize');
					$(img).addClass('flipInX');
				} else {
					$(_imgLoader).closest(_parentTag).addClass('portraitSize');
					$(img).addClass('flipInY');
				}
				setTimeout(function(){
					$(img).removeClass('animated').removeClass('flipInY').removeClass('flipInX');
				} , 1200);
			},
			end :  function(success_ary , fail_ary){
				FxFotoCaption({
					imageList : success_ary , 
					update : true , 
					contenter : _parentTag , 
					formatter : 'shrink'
				})/*持續更新圖檔並取得FxFotoCaption 的回傳值*/
			}
		})();
	}
};
/**
!驗證欄位.
*/
DDK.Verification = {
	ConstantStatic:{
		VALIDATE_BOX_WARNING_CLASS_NAME:'warning'/*警告的提示*/,
		VALIDATE_BOX_ERROR_CLASS_NAME:'error'/*錯誤的提式*/,
		VALIDATE_BOX_LOOP_FADEIN_CLASS_NAME:'loopAnimation'/*提示反覆閃爍的動畫*/,
	}
	,
	DynamicValue:{
		syncTaskArray:null/*同步作業的任務陣列*/,
		run_syncTask:null/*同步作業的Interval id*/,
		inVerifiArray:null/*驗證作業的任務陣列*/,
		run_inVerifiTask:null/*驗證作業的Interval id*/,
	}
	,
	/**
	!產生驗證項目使用的驗證資訊元素.
	>_boxType String|'warning' 或'error'.
	>_boxCtx String|要顯示的文字.
	@回傳 String|組合過的HTML 原始碼.
	*/
	createValidateBox : function(_boxType , _boxCtx){
		return FxReplace(
			DDK.OptionsUICaptain.ConstantStatic.INPUT_TIP_BOX , 
			[
				{_pattern:'##type##' , _fill:_boxType},
				{_pattern:'##text##' , _fill:_boxCtx}
			]
		);
	}
	,
	/**
	!檢查文字是否沒有超過指定長度.
	>_range Number|字數長度.
	>_mode String|'over'大於,'less'小於.
	>_str String|網址字串.
	@回傳 Object|{ret:Boolean|true 正確,false 錯誤 , code:String|錯誤原因字串}
	*/
	isCharLengthOutRange:function(_range , _mode , _str){
		if(_mode == 'over'){
			return (_str.length > _range) ? {ret:true , code:''} : {ret:false , code:''};
		} else if(_mode == 'less'){
			return (_str.length < _range) ? {ret:true , code:''} : {ret:false , code:''};
		}
	}
	,
	/**
	!檢查是否為可能合法的網址.
	>_header String|http:// 或https://
	>_str String|網址字串.
	@回傳 Object|{ret:Boolean|true 正確,false 錯誤 , code:String|錯誤原因字串}
	*/
	isLegitimateUri:function(_header , _str){
		var _domain_str;
		if(_str.indexOf(_header) == -1) return {ret:false , code:''};
		if(_header == 'http://'){
			_domain_str = _str.substring(7 , _str.length);
		} else if(_header == 'https://'){
			_domain_str = _str.substring(8 , _str.length);
		}
		if(_domain_str.indexOf('.') == -1) return {ret:false , code:''};
		if(_domain_str.lastIndexOf('.') == _domain_str.length - 1) return {ret:false , code:''};
		return {ret:true , code:''}
	}
	,
	/**
	!檢查欄位是否沒有值.
	>_inputElement HTML Element|<input> 或<textarea> 或<select>.
	@回傳 Object|{ret:Boolean|true 正確,false 錯誤 , code:String|錯誤原因字串}
	*/
	isEmptyValue:function(_inputElement){
		var _tagName = _inputElement.tagName.toLowerCase();
		if(_tagName == 'textarea'){
			return (_inputElement.value == '') ? {ret:true , code:''} : {ret:false , code:''};
		} else if(_tagName == 'input'){
			if(FxGetAttribute(_inputElement , 'type') == 'file'){//檔案欄位
				return (_inputElement.files.length == 0) ? {ret:true , code:''} : {ret:false , code:''};
			} else {//檔案欄位以外
				return (_inputElement.value == '') ? {ret:true , code:''} : {ret:false , code:''};
			}
		} else if(_tagName == 'select'){
			return (_inputElement.selectedIndex == 0) ? {ret:true , code:''} : {ret:false , code:''};
		}
	}
	,
	/**
	!尋找驗證項目使用的驗證資訊元素要插入時的父系元素參考.
	>_this HTML Element|欄位元素參考
	@回傳 jQuery Object|插入時的元素參考.
	*/
	getAppendWrapper:function(_this){
		var tmp = $(_this).closest('section[data-io]').find('.scrollerWrapper');
		return (tmp.length > 0) ? tmp/*如果是有橫向捲動的模組*/ : $(_this).closest('section[data-io]');
		
	}
	,
	/**
	!取得目標欄位的CSS left 與top 的值.
	>_inputContentType String|欄位內容型態.
	>_source HTML Element|目標欄位元素.
	>_root HTML Element|目標欄位的最高父系元素.
	@回傳 Object|{left:Number , top:Number}.
	*/
	getTargetInputPosition:function(_inputContentType , _source , _root){
		
		var scrollLeftFix = _root[0].scrollLeft;
		var rootOffset = $(_root).offset();
		var sourceOffset = $(_source).offset();
		var n = {
			left:sourceOffset.left - rootOffset.left + scrollLeftFix,
			top:sourceOffset.top - rootOffset.top
		};
		if(_inputContentType == 'fancy-text'){//多行式的欄位
			n.top += _source.clientHeight - 40;
			n.left += _source.clientWidth - 40;
			//定位在欄位元素的右下角
		} else if(_inputContentType == 'alt-text') {
			n.top += -40;
			n.left += 0;
			//定位在欄位元素的左上
		} else {//一定都是單行欄位
			n.top += 0;
			n.left += _source.clientWidth + 10;
			//定位在欄位元素的右側
		}
		
		return n;
	}
	,
	/**
	!檢查一般的文字欄位的字數是否異常.
	>_currentItem Object|在setInterval 中檢查的項目物件.
	>_ignoreEmpty Boolean|是否忽略欄位是空白的狀況.true 忽略,false 不忽略.
	@回傳 Object|{ret:Boolean|true 欄位無問題,false 欄位異常 , alertText:需要提示欄位異常的文字}
	*/
	detectionTextData:function(_currentItem , _ignoreEmpty){
		var _val = {
			/*position:DDK.Verification.getTargetInputPosition(_currentItem.contentType , _currentItem.sourceTarget , _currentItem.appendWrapper),*/
			charLengthOver:DDK.Verification.isCharLengthOutRange(_currentItem.charLengthMax , 'over' , _currentItem.sourceTarget.value),
			empty:DDK.Verification.isEmptyValue(_currentItem.sourceTarget),
			isSelectBox:($(_currentItem.sourceTarget).prop('tagName').toLowerCase() == 'select') ? true : false
		};//各種驗證參數
		var package = {ret:true , alertText:''};
		if(_ignoreEmpty == false){
			if(_val.empty.ret == true){
				package.ret = false;
				if(_val.isSelectBox == false){
					package.alertText = 
					DDK.Mutual.TextScript.INPUT_TEXT_EMPTY[0] + 
					DDK.Mutual.TextScript.INPUT_TEXT_EMPTY[1] + 
					_currentItem.charLengthMin + 
					DDK.Mutual.TextScript.INPUT_TEXT_EMPTY[2]/*提示文字*/
				} else {
					package.alertText = DDK.Mutual.TextScript.SELECT_BOX_UNSELECTED[0];
				}
				return package;//回傳,跳出
			}
		}
		if(_val.isSelectBox == false){
			if(_val.charLengthOver.ret == true){//若填入文字超量
				package.ret = false;
				package.alertText = 
				DDK.Mutual.TextScript.INPUT_TEXT_OVER_RANGE[0] + 
				_currentItem.charLengthMax + DDK.Mutual.TextScript.INPUT_TEXT_OVER_RANGE[2] + 
				DDK.Mutual.TextScript.INPUT_TEXT_OVER_RANGE[1] + 
				_currentItem.sourceTarget.value.length + DDK.Mutual.TextScript.INPUT_TEXT_OVER_RANGE[2]/*提示文字*/
			}
		}
		return package;
	}
	,
	/**
	!檢查網址文字欄位的值是否異常.
	>_currentItem Object|在setInterval 中檢查的項目物件.
	>_ignoreEmpty Boolean|是否忽略欄位是空白的狀況.true 忽略,false 不忽略.
	@回傳 Object|{ret:Boolean|true 欄位無問題,false 欄位異常 , alertText:需要提示欄位異常的文字}
	*/
	detectionHyperTextData:function(_currentItem , _ignoreEmpty){
		var _val = {
			/*position:DDK.Verification.getTargetInputPosition(this.contentType , this.sourceTarget , this.appendWrapper),*/
			charLengthOver:DDK.Verification.isCharLengthOutRange(_currentItem.charLengthMax , 'over' , _currentItem.sourceTarget.value),
			charLengthLess:DDK.Verification.isCharLengthOutRange(_currentItem.charLengthMin , 'less' , _currentItem.sourceTarget.value),
			uri:(_currentItem.sourceTarget.value.toLowerCase().indexOf('https://') > -1) ? DDK.Verification.isLegitimateUri(
				'https://' , 
				_currentItem.sourceTarget.value.toLowerCase()
			) : DDK.Verification.isLegitimateUri(
				'http://' , 
				_currentItem.sourceTarget.value.toLowerCase()
			),
			empty:DDK.Verification.isEmptyValue(_currentItem.sourceTarget)
		};//各種驗證參數
		var package = {ret:true , alertText:''};
		if(_ignoreEmpty == false){
			if(_val.empty.ret == true){
				package.ret = false;
				package.alertText = 
				DDK.Mutual.TextScript.INPUT_TEXT_EMPTY[0] + 
				DDK.Mutual.TextScript.INPUT_TEXT_EMPTY[1] + 
				_currentItem.charLengthMin + 
				DDK.Mutual.TextScript.INPUT_TEXT_EMPTY[2]/*提示文字*/
				return package;//回傳,跳出
			}
		}
		if(
			_val.charLengthOver.ret == true || 
			_val.charLengthLess.ret == true || 
			_val.uri.ret == false
			
		){
			package.ret = false;
			if(_val.charLengthOver.ret == true){//若填入文字超量
				if(DDK.Mutual.ConstantStatic.ALLOW_CONSOLE == true) console.log('填入文字超量');
				package.alertText = 
				DDK.Mutual.TextScript.INPUT_TEXT_OVER_RANGE[0] + 
				_currentItem.charLengthMax + 
				DDK.Mutual.TextScript.INPUT_TEXT_OVER_RANGE[2] + 
				DDK.Mutual.TextScript.INPUT_TEXT_OVER_RANGE[1] + 
				_currentItem.sourceTarget.value.length + 
				DDK.Mutual.TextScript.INPUT_TEXT_OVER_RANGE[2]/*提示文字*/
				
			} else if(_val.charLengthLess.ret == true){//字數不足
				if(DDK.Mutual.ConstantStatic.ALLOW_CONSOLE == true) console.log('字數不足');
				package.alertText = 
				DDK.Mutual.TextScript.INPUT_TEXT_EMPTY[0] + 
				DDK.Mutual.TextScript.INPUT_TEXT_EMPTY[1] + 
				_currentItem.charLengthMin + 
				DDK.Mutual.TextScript.INPUT_TEXT_EMPTY[2]/*提示文字*/;
			} else if(_val.uri.ret == false){//不含http:// 或https:// 或沒有"." 或"." 的位置不正確
				if(DDK.Mutual.ConstantStatic.ALLOW_CONSOLE == true) console.log('//不含http:// 或https:// 或沒有"." 或"." 的位置不正確');
				package.alertText = DDK.Mutual.TextScript.INPUT_URI_FAILUE[0]/*提示文字*/;
			}
		}
		return package;
	}
	,
	/**
	!檢查上傳檔案欄位的值是否異常.
	>_currentItem Object|在setInterval 中檢查的項目物件.
	>_ignoreEmpty Boolean|是否忽略欄位是空白的狀況.true 忽略,false 不忽略.
	@回傳 Object|{ret:Boolean|true 欄位無問題,false 欄位異常 , alertText:需要提示欄位異常的文字}
	*/
	detectionFileData:function(_currentItem , _ignoreEmpty){
		var _val = {
			/*position:DDK.Verification.getTargetInputPosition(this.contentType , $(this.sourceTarget.parentElement).find('label')[0] , this.appendWrapper),*/
			needSelectCount:Number($(_currentItem.sourceTarget).attr('data-files-length')),
			fileBitMax:Number($(_currentItem.sourceTarget).attr('data-bit-max-length'))*1024,
			extensionFilterArray:$(_currentItem.sourceTarget).attr('data-files-filter').split(','),
			empty:DDK.Verification.isEmptyValue(_currentItem.sourceTarget)
		};//各種驗證參數
		var file_ary = _currentItem.sourceTarget.files;
		var file = file_ary[0];
		var _tmpText , tmp;
		var isSelectedCorrectCount = (file_ary.length == _val.needSelectCount);//檔案選取數量是否正確
		var isFileFitSize = (file_ary.length == _val.needSelectCount) ? (file.size <= _val.fileBitMax) : 0;//檔案的大小(位元長度)是否未超量
		var isExtensionLegitimate = false;//檔案的副檔名有包含在合法清單中
		if(file_ary.length == _val.needSelectCount){
			tmp = file.name.toLowerCase();
			tmp = tmp.substring(tmp.lastIndexOf('.') + 1 , tmp.length);//副檔名
			for(var i = 0;i<_val.extensionFilterArray.length;i++){
				if(_val.extensionFilterArray[i] == tmp){
					isExtensionLegitimate = true;
					break;
				}
			}
		}
		var package = {ret:true , alertText:''};
		if(_ignoreEmpty == false){
			if(_val.empty.ret == true){
				package.ret = false;
				package.alertText = 
				DDK.Mutual.TextScript.SELECTED_FILE_EMPTY[0] + 
				_val.needSelectCount + 
				DDK.Mutual.TextScript.SELECTED_FILE_EMPTY[1];
				return package;//回傳,跳出
			}
		}
		/*
		console.log(isSelectedCorrectCount);
		console.log(isFileFitSize);
		console.log(isExtensionLegitimate);
		console.log(file.type);
		*/
		if(
			isSelectedCorrectCount == false || 
			isFileFitSize == false || 
			isExtensionLegitimate == false || 
			file.type == ''
		){
			package.ret = false;
			if(isSelectedCorrectCount == false){//檔案選取數量錯誤
				package.alertText = 
				DDK.Mutual.TextScript.SELECTED_FILE_OVER_COUNT[0] + 
				_val.needSelectCount + 
				DDK.Mutual.TextScript.SELECTED_FILE_OVER_COUNT[1];
			} else if(file.type == ''){//檔案格式未知
				package.alertText = 
				DDK.Mutual.TextScript.SELECT_FILE_TYPE_UNKNOW[0] + 
				_val.extensionFilterArray.join('、') + 
				DDK.Mutual.TextScript.SELECT_FILE_TYPE_UNKNOW[1];
			} else if(isExtensionLegitimate == false){//不允許的副檔名格式
				package.alertText = 
				DDK.Mutual.TextScript.SELECTED_FILE_FORMAT_ERROR[0] + 
				_val.extensionFilterArray.join('、') + 
				DDK.Mutual.TextScript.SELECTED_FILE_FORMAT_ERROR[1] + 
				_val.extensionFilterArray.length + 
				DDK.Mutual.TextScript.SELECTED_FILE_FORMAT_ERROR[2];
			} else if(isFileFitSize == false){//檔案過大
				package.alertText = 
				DDK.Mutual.TextScript.SELECTED_FILE_OVER_SIZE[0] + 
				(_val.fileBitMax / 1024 / 1024) + 
				DDK.Mutual.TextScript.SELECTED_FILE_OVER_SIZE[1];
			}
		}
		return package;
	}
	,
	/**
	!將一般的文字欄位包裝成可連續執行驗證任務內容.
	>_jq jQuery Object|欄位的某層父系元素參照.
	>_io jQuery Object|用來確認欄位是否作用中(data-io="1/0")的元素參照,可能與_jq 相同,也可能是其它的元素.
	@回傳 Object|欄位驗證執行內容與參數{
		validateFunc:Function|在setInterval 執行時的檢查細節 , 
		finalFunc:Function|在資料送出前的檢查細節 , 
		deleteAlertTarget:Function|用來移除這個驗證項目使用中的驗證資訊元素 , 
		sourceTarget:HTML Element|檢測目標欄位 , 
		ioFlagTarget:用來確認欄位是否作用中(data-io="1/0")的元素參照 , 
		appendWrapper:jQuery Object|用來插入驗證資訊的根元素 , 
		alertTarget:jQuery Object|在畫面上產生的驗證資訊元素參照 , 
		contentType:String|欄位的驗證種類 , 
		charLengthMin:欄位文字最大值 , 
		charLengthMax:欄位文字最小值
	}.
	*/
	validateText:function(_jq , _io){
		$(_jq).attr('data-verification' , 'validateText');
		return {
			sourceTarget:_jq[0],
			appendWrapper:DDK.Verification.getAppendWrapper(_jq[0]),
			disabledFlagTarget:(!$(_jq[0]).closest('.basicBubble').find('.propsWrapper').attr('data-card-disabled') == true) ? null : $(_jq[0]).closest('.basicBubble').find('.propsWrapper'),
			ioFlagTarget:_io[0],
			alertTarget:null,
			contentType:$(_jq[0]).attr('data-mirror-type'),
			charLengthMin:Number($(_jq[0]).attr('data-char-min-length')),
			charLengthMax:Number($(_jq[0]).attr('data-char-max-length')),
			/**
			!檢查輸入文字是否超量並產生提示對話框.
			*/
			validateFunc:function(){
				if($(this.sourceTarget).prop('tagName').toLowerCase() == 'select'){
					return;//欄位是select 只在最後驗證處理,跳出
				}
				if(DDK.Verification.isEmptyValue(this.sourceTarget).ret == true) {
					if($(this.alertTarget).find('.error').length == 0) this.deleteAlertTarget();//在不是最後驗證的狀態下移除對話框
					return;//沒有欄位有效值,跳出
				}
				var _detection = DDK.Verification.detectionTextData(this , true);//檢測欄位,忽略欄位沒有值
				//var position;
				if(_detection.ret == false){//資料檢查有誤
					if(this.alertTarget != null) {
						if($(this.alertTarget).find('.desc p').html() != _detection.alertText) $(this.alertTarget).find('.desc p').html(_detection.alertText);//更新文字
					} else {//還沒置入對話框
						/*
						position = DDK.Verification.getTargetInputPosition(
							this.contentType , 
							this.sourceTarget , 
							this.appendWrapper
						);//取得提示方塊出現的位置座標
						*/
						this.alertTarget = $(
							DDK.Verification.createValidateBox(
								DDK.Verification.ConstantStatic.VALIDATE_BOX_WARNING_CLASS_NAME/*提示種類*/,
								_detection.alertText
							)
						);
						$(this.appendWrapper).append($(this.alertTarget).each(function(){
							$(this).delay(1300).find('i').addClass(DDK.Verification.ConstantStatic.VALIDATE_BOX_LOOP_FADEIN_CLASS_NAME);
						}));
						this.updateAlertPosition();//更新提示方塊的座標位置
					}
				} else {
					this.deleteAlertTarget();//移除對話框
				}
			}
			,
			/**
			!輸出資料前的檢查欄位.
			@回傳 Boolean|true 正常,false 有錯誤.
			*/
			finalFunc:function(){
				var _detection = DDK.Verification.detectionTextData(this , false);//檢測欄位,不忽略欄位沒有值
				//var position;
				
				var _final = {ret:_detection.ret , alertFunc:null , error:''};
				var instance = this;
				if(_detection.ret == false){//資料檢查有誤
					/*
					position = DDK.Verification.getTargetInputPosition(
						this.contentType , 
						this.sourceTarget , 
						($(this.appendWrapper).find('.scrollerWrapper').length > 0) ? $(this.appendWrapper).find('.scrollerWrapper')如果是有橫向捲動的模組 : this.appendWrapper
					);//取得提示方塊出現的位置座標*/
					//
					_final.error = _detection.alertText;
					_final.alertFunc = function(){
						instance.deleteAlertTarget();//移除對話框
						instance.alertTarget = $(
							DDK.Verification.createValidateBox(
								DDK.Verification.ConstantStatic.VALIDATE_BOX_ERROR_CLASS_NAME/*提示種類*/,
								_detection.alertText
							)
						);
						console.log(instance.appendWrapper);
						$(instance.appendWrapper).append(instance.alertTarget);
						instance.updateAlertPosition();//更新提示方塊的座標位置
						
					};//封裝要顯示的錯誤對話方塊
					
				} else {
					this.deleteAlertTarget();//移除對話框
				}
				//--輸出驗證結果
				return _final;//欄位內容驗證
			}
			,
			/**
			!移除持有的對話框.
			*/
			deleteAlertTarget:function(){
				if(this.alertTarget != null){
					$(this.alertTarget).remove();
					this.alertTarget = null;//重設
				}
			}
			,
			/**
			!強迫對話框更新位置.
			*/
			updateAlertPosition:function(){
				var position = DDK.Verification.getTargetInputPosition(
					this.contentType , 
					this.sourceTarget , 
					/*this.appendWrapper*/
					($(this.appendWrapper).find('.scrollerWrapper').length > 0) ? $(this.appendWrapper).find('.scrollerWrapper')/*如果是有橫向捲動的模組*/ : this.appendWrapper
				);//取得提示方塊出現的位置座標
				$(this.alertTarget).css({
					'top':position.top + 'px' , 
					'left':position.left + 'px'
				});//更新提示對話框位置
			}
		};
	}
	,
	/**
	!將網址欄位包裝成可連續執行驗證任務內容.
	>_jq jQuery Object|欄位的某層父系元素參照.
	>_io jQuery Object|用來確認欄位是否作用中(data-io="1/0")的元素參照,可能與_jq 相同,也可能是其它的元素.
	@回傳 Object|欄位驗證執行內容與參數{
		validateFunc:Function|在setInterval 執行時的檢查細節 , 
		finalFunc:Function|在資料送出前的檢查細節 , 
		deleteAlertTarget:Function|用來移除這個驗證項目使用中的驗證資訊元素 , 
		sourceTarget:HTML Element|檢測目標欄位 , 
		ioFlagTarget:用來確認欄位是否作用中(data-io="1/0")的元素參照 , 
		appendWrapper:jQuery Object|用來插入驗證資訊的根元素 , 
		alertTarget:jQuery Object|在畫面上產生的驗證資訊元素參照 , 
		contentType:String|欄位的驗證種類 , 
		charLengthMin:欄位文字最大值 , 
		charLengthMax:欄位文字最小值
	}.
	*/
	validateHyperText:function(_jq , _io){
		$(_jq).attr('data-verification' , 'validateHyperText');
		return {
			sourceTarget:_jq[0],
			appendWrapper:DDK.Verification.getAppendWrapper(_jq[0]),
			disabledFlagTarget:(!$(_jq[0]).closest('.basicBubble').find('.propsWrapper').attr('data-card-disabled') == true) ? null : $(_jq[0]).closest('.basicBubble').find('.propsWrapper'),
			ioFlagTarget:_io[0],
			alertTarget:null,
			contentType:$(_jq[0]).attr('data-mirror-type'),
			charLengthMin:Number($(_jq[0]).attr('data-char-min-length')),
			charLengthMax:Number($(_jq[0]).attr('data-char-max-length')),
			/**
			!檢查輸入文字是否超量並產生提示對話框.
			*/
			validateFunc:function(){
				if(DDK.Verification.isEmptyValue(this.sourceTarget).ret == true) {
					if($(this.alertTarget).find('.error').length == 0) this.deleteAlertTarget();//在不是最後驗證的狀態下移除對話框
					return;//沒有欄位有效值,跳出
				}
				
				var _detection = DDK.Verification.detectionHyperTextData(this , true);//檢測欄位,忽略欄位沒有值
				//var position;
				if(_detection.ret == false){//資料檢查有誤
					if(this.alertTarget != null) {
						if($(this.alertTarget).find('.desc p').html() != _detection.alertText) $(this.alertTarget).find('.desc p').html(_detection.alertText);//更新文字
					} else {//還沒置入對話框
						/*position = DDK.Verification.getTargetInputPosition(
							this.contentType , 
							this.sourceTarget , 
							this.appendWrapper
						);//取得提示方塊出現的位置座標*/
						this.alertTarget = $(
							DDK.Verification.createValidateBox(
								DDK.Verification.ConstantStatic.VALIDATE_BOX_WARNING_CLASS_NAME/*提示種類*/,
								_detection.alertText
							)
						);
						$(this.appendWrapper).append($(this.alertTarget).each(function(){
							$(this).delay(1300).find('i').addClass(DDK.Verification.ConstantStatic.VALIDATE_BOX_LOOP_FADEIN_CLASS_NAME);
						}));
						this.updateAlertPosition();//更新提示方塊的座標位置
					}
				} else {
					this.deleteAlertTarget();//移除對話框
				}
			}
			,
			/**
			!輸出資料前的檢查欄位.
			@回傳 Boolean|true 正常,false 有錯誤.
			*/
			finalFunc:function(){
				var _detection = DDK.Verification.detectionHyperTextData(this , false);//檢測欄位,不忽略欄位沒有值
				//var position;
				var _final = {ret:_detection.ret , alertFunc:null , error:''};
				var instance = this;
				if(_detection.ret == false){//資料檢查有誤
					/*position = DDK.Verification.getTargetInputPosition(
						this.contentType , 
						this.sourceTarget , 
						($(this.appendWrapper).find('.scrollerWrapper').length > 0) ? $(this.appendWrapper).find('.scrollerWrapper')如果是有橫向捲動的模組 : this.appendWrapper
					);//取得提示方塊出現的位置座標*/
					//
					_final.error = _detection.alertText;
					_final.alertFunc = function(){
						instance.deleteAlertTarget();//移除對話框
						instance.alertTarget = $(
							DDK.Verification.createValidateBox(
								DDK.Verification.ConstantStatic.VALIDATE_BOX_ERROR_CLASS_NAME/*提示種類*/,
								_detection.alertText
							)
						);
						$(instance.appendWrapper).append(instance.alertTarget);
						instance.updateAlertPosition();//更新提示方塊的座標位置
					};//封裝要顯示的錯誤對話方塊
				} else {
					this.deleteAlertTarget();//移除對話框
				}
				//--輸出驗證結果
				return _final;//欄位內容驗證
			}
			,
			/**
			!移除持有的對話框.
			*/
			deleteAlertTarget:function(){
				if(this.alertTarget != null){
					$(this.alertTarget).remove();
					this.alertTarget = null;//重設
				}
			}
			,
			/**
			!強迫對話框更新位置.
			*/
			updateAlertPosition:function(){
				var position = DDK.Verification.getTargetInputPosition(
					this.contentType , 
					this.sourceTarget , 
					/*this.appendWrapper*/
					($(this.appendWrapper).find('.scrollerWrapper').length > 0) ? $(this.appendWrapper).find('.scrollerWrapper')/*如果是有橫向捲動的模組*/ : this.appendWrapper
				);//取得提示方塊出現的位置座標
				$(this.alertTarget).css({
					'top':position.top + 'px' , 
					'left':position.left + 'px'
				});//更新提示對話框位置
			}
		};
	}
	,
	/**
	!將檔案上傳欄位包裝成可連續執行驗證任務內容.
	>_jq jQuery Object|欄位的某層父系元素參照.
	>_io jQuery Object|用來確認欄位是否作用中(data-io="1/0")的元素參照,可能與_jq 相同,也可能是其它的元素.
	@回傳 Object|欄位驗證執行內容與參數{
		validateFunc:Function|在setInterval 執行時的檢查細節 , 
		finalFunc:Function|在資料送出前的檢查細節 , 
		deleteAlertTarget:Function|用來移除這個驗證項目使用中的驗證資訊元素 , 
		sourceTarget:HTML Element|檢測目標欄位 , 
		ioFlagTarget:用來確認欄位是否作用中(data-io="1/0")的元素參照 , 
		appendWrapper:jQuery Object|用來插入驗證資訊的根元素 , 
		alertTarget:jQuery Object|在畫面上產生的驗證資訊元素參照 , 
		contentType:String|欄位的驗證種類 , 
		charLengthMin:欄位文字最大值 , 
		charLengthMax:欄位文字最小值
	}.
	*/
	validateFileSelected:function(_jq , _io){
		$(_jq).attr('data-verification' , 'validateFileSelected');
		return {
			sourceTarget:_jq[0],
			appendWrapper:DDK.Verification.getAppendWrapper(_jq[0]),
			disabledFlagTarget:(!$(_jq[0]).closest('.basicBubble').find('.propsWrapper').attr('data-card-disabled') == true) ? null : $(_jq[0]).closest('.basicBubble').find('.propsWrapper'),
			ioFlagTarget:_io[0],
			alertTarget:null,
			contentType:$(_jq[0]).attr('data-mirror-type'),
			charLengthMin:Number($(_jq[0]).attr('data-char-min-length')),
			charLengthMax:Number($(_jq[0]).attr('data-char-max-length')),
			/**
			!檢查輸入文字是否超量並產生提示對話框.
			*/
			validateFunc:function(){
				if(DDK.Verification.isEmptyValue(this.sourceTarget).ret == true) {
					if($(this.alertTarget).find('.error').length == 0) this.deleteAlertTarget();//在不是最後驗證的狀態下移除對話框
					return;//圖檔上傳欄位沒有選擇檔案,跳出
				}
				var _detection = DDK.Verification.detectionFileData(this , false);//檢測欄位,忽略欄位沒有值
				
				
				//var position;
				if(_detection.ret == false){//資料檢查有誤
					if(this.alertTarget != null) {
						if($(this.alertTarget).find('.desc p').html() != _detection.alertText) $(this.alertTarget).find('.desc p').html(_detection.alertText);//更新文字
					} else {//還沒置入對話框
						/*position = DDK.Verification.getTargetInputPosition(
							this.contentType , 
							$(this.sourceTarget.parentElement.parentElement).find('label')[0] , 
							this.appendWrapper
						);//取得提示方塊出現的位置座標*/
						
						this.alertTarget = $(
							DDK.Verification.createValidateBox(
								DDK.Verification.ConstantStatic.VALIDATE_BOX_WARNING_CLASS_NAME/*提示種類*/,
								_detection.alertText
							)
						);
						$(this.appendWrapper).append($(this.alertTarget).each(function(){
							
							$(this).delay(1300).find('i').addClass(DDK.Verification.ConstantStatic.VALIDATE_BOX_LOOP_FADEIN_CLASS_NAME);
						}));
						this.updateAlertPosition();//更新提示方塊的座標位置
					}
				} else {
					this.deleteAlertTarget();//移除對話框
				}
				
			}
			,
			/**
			!輸出資料前的檢查欄位.
			@回傳 Boolean|true 正常,false 有錯誤.
			*/
			finalFunc:function(){
				var _detection = DDK.Verification.detectionFileData(this , false);//檢測欄位,不忽略欄位沒有值
				
				//var position;
				var _final = {ret:_detection.ret , alertFunc:null , error:''};
				var instance = this;
				var showErrorFunc = function(){//封裝要顯示的錯誤對話方塊
					instance.deleteAlertTarget();//移除對話框
					instance.alertTarget = $(
						DDK.Verification.createValidateBox(
							DDK.Verification.ConstantStatic.VALIDATE_BOX_ERROR_CLASS_NAME/*提示種類*/,
							_detection.alertText
						)
					);
					$(instance.appendWrapper).append(instance.alertTarget);
					instance.updateAlertPosition();//更新提示方塊的座標位置
				};
				if(DDK.DataImport.restoreData() == null){//沒有既有資料時
					if(_detection.ret == false){//資料檢查有誤
						/*position = DDK.Verification.getTargetInputPosition(
							this.contentType , 
							$(this.sourceTarget.parentElement.parentElement).find('label')[0] , 
							($(this.appendWrapper).find('.scrollerWrapper').length > 0) ? $(this.appendWrapper).find('.scrollerWrapper')如果是有橫向捲動的模組 : this.appendWrapper
						);//取得提示方塊出現的位置座標*/
						//
						_final.error = _detection.alertText;
						_final.alertFunc = showErrorFunc;
					} else {
						this.deleteAlertTarget();//移除對話框
					}
				} else {//有既有資料時
					if(DDK.Verification.isEmptyValue(this.sourceTarget).ret == false){//有選取檔案
						if(_detection.ret == false){//資料檢查有誤
							/*position = DDK.Verification.getTargetInputPosition(
								this.contentType , 
								$(this.sourceTarget.parentElement.parentElement).find('label')[0] , 
								($(this.appendWrapper).find('.scrollerWrapper').length > 0) ? $(this.appendWrapper).find('.scrollerWrapper')如果是有橫向捲動的模組 : this.appendWrapper
							);//取得提示方塊出現的位置座標*/
							//
							_final.error = _detection.alertText;
							_final.alertFunc = showErrorFunc;
						} else {
							this.deleteAlertTarget();//移除對話框
						}
					} else {//沒有選取檔案
						_final.ret = true;//改寫檢測為正確
						this.deleteAlertTarget();//移除對話框
					}
				}
				
				
				//--輸出驗證結果
				return _final;//欄位內容驗證
			}
			,
			/**
			!移除持有的對話框.
			*/
			deleteAlertTarget:function(){
				if(this.alertTarget != null){
					$(this.alertTarget).remove();
					this.alertTarget = null;//重設
				}
			}
			,
			/**
			!強迫對話框更新位置.
			*/
			updateAlertPosition:function(){
				var position = DDK.Verification.getTargetInputPosition(
					this.contentType , 
					this.sourceTarget , 
					/*this.appendWrapper*/
					($(this.appendWrapper).find('.scrollerWrapper').length > 0) ? $(this.appendWrapper).find('.scrollerWrapper')/*如果是有橫向捲動的模組*/ : this.appendWrapper
				);//取得提示方塊出現的位置座標
				$(this.alertTarget).css({
					'top':($(this.sourceTarget).offset().top - $(this.appendWrapper).offset().top) + 'px'/*檔案欄位因需隱藏,有特別調整*/,
					'left':position.left + 'px'
				});//更新提示對話框位置
			}
		};
	}
	,
	/**
	!將模組的Alt 文字欄位包裝成可連續執行驗證任務內容(目前只有'ImageCardsModule' , 'FancyCardsModule' 兩個模組會用到).
	>_jq jQuery Object|欄位的某層父系元素參照.
	>_io jQuery Object|用來確認欄位是否作用中(data-io="1/0")的某層父系元素參照.
	@回傳 Object|欄位驗證執行內容與參數{
		validateFunc:Function|在setInterval 執行時的檢查細節 , 
		finalFunc:Function|在資料送出前的檢查細節 , 
		deleteAlertTarget:Function|用來移除這個驗證項目使用中的驗證資訊元素 , 
		sourceTarget:HTML Element|檢測目標欄位 , 
		ioFlagTarget:用來確認欄位是否作用中(data-io="1/0")的元素參照 , 
		appendWrapper:jQuery Object|用來插入驗證資訊的根元素 , 
		alertTarget:jQuery Object|在畫面上產生的驗證資訊元素參照 , 
		contentType:String|欄位的驗證種類 , 
		charLengthMin:欄位文字最大值 , 
		charLengthMax:欄位文字最小值
	}.
	*/
	validateAltText:function(_jq , _io){
		$(_jq).attr('data-verification' , 'validateAltText');
		return {
			sourceTarget:_jq[0],
			appendWrapper:$(_jq[0]).closest('section[data-io]')/*只有Alt 文字欄位固定是<secion>*/,
			disabledFlagTarget:null/*只有Alt 文字欄位固定是null*/,
			ioFlagTarget:$(_jq[0]).closest('section[data-io]')/*只有Alt 文字欄位固定是<secion>*/,
			alertTarget:null,
			contentType:$(_jq[0]).attr('data-mirror-type'),
			charLengthMin:Number($(_jq[0]).attr('data-char-min-length')),
			charLengthMax:Number($(_jq[0]).attr('data-char-max-length')),
			/**
			!檢查輸入文字是否超量並產生提示對話框.
			*/
			validateFunc:function(){
				
				if(DDK.Verification.isEmptyValue(this.sourceTarget).ret == true) {
					if($(this.alertTarget).find('.error').length == 0) this.deleteAlertTarget();//在不是最後驗證的狀態下移除對話框
					return;//沒有欄位有效值,跳出
				}
				var _detection = DDK.Verification.detectionTextData(this , false);//檢測欄位,忽略欄位沒有值
				//var position;
				if(_detection.ret == false){//資料檢查有誤
					if(this.alertTarget != null) {
						if($(this.alertTarget).find('.desc p').html() != _detection.alertText) $(this.alertTarget).find('.desc p').html(_detection.alertText);//更新文字
					} else {//還沒置入對話框
						/*position = DDK.Verification.getTargetInputPosition(this.contentType , this.sourceTarget , this.appendWrapper);//取得提示方塊出現的位置座標*/
						this.alertTarget = $(
							DDK.Verification.createValidateBox(
								DDK.Verification.ConstantStatic.VALIDATE_BOX_WARNING_CLASS_NAME/*提示種類*/,
								_detection.alertText
							)
						);
						$(this.appendWrapper).append($(this.alertTarget).each(function(){
							
							$(this).delay(1300).find('i').addClass(DDK.Verification.ConstantStatic.VALIDATE_BOX_LOOP_FADEIN_CLASS_NAME);
						}));
						this.updateAlertPosition();//更新提示方塊的座標位置
					}
				} else {
					this.deleteAlertTarget();//移除對話框
				}
			}
			,
			/**
			!輸出資料前的檢查欄位.
			@回傳 Boolean|true 正常,false 有錯誤.
			*/
			finalFunc:function(){
				var _detection = DDK.Verification.detectionTextData(this , false);//檢測欄位,不忽略欄位沒有值
				//var position;
				var _final = {ret:_detection.ret , alertFunc:null , error:''};
				var instance = this;
				if(_detection.ret == false){//資料檢查有誤
					/*position = DDK.Verification.getTargetInputPosition(this.contentType , this.sourceTarget , this.appendWrapper);//取得提示方塊出現的位置座標*/
					//
					_final.error = _detection.alertText;
					_final.alertFunc = function(){
						instance.deleteAlertTarget();//移除對話框
						instance.alertTarget = $(
							DDK.Verification.createValidateBox(
								DDK.Verification.ConstantStatic.VALIDATE_BOX_ERROR_CLASS_NAME/*提示種類*/,
								_detection.alertText
							)
						);
						$(instance.appendWrapper).append(instance.alertTarget);
						instance.updateAlertPosition();//更新提示方塊的座標位置
					};//封裝要顯示的錯誤對話方塊
				} else {
					this.deleteAlertTarget();//移除對話框
				}
				//--輸出驗證結果
				return _final;//欄位內容驗證
			}
			,
			/**
			!移除持有的對話框.
			*/
			deleteAlertTarget:function(){
				if(this.alertTarget != null){
					$(this.alertTarget).remove();
					this.alertTarget = null;//重設
				}
			}
			,
			/**
			!強迫對話框更新位置.
			*/
			updateAlertPosition:function(){
				var position = DDK.Verification.getTargetInputPosition(
					this.contentType , 
					this.sourceTarget , 
					this.appendWrapper
				);//取得提示方塊出現的位置座標
				$(this.alertTarget).css({
					'top':position.top + 'px' , 
					'left':position.left + 'px'
				});//更新提示對話框位置
			}
		};
	}
};
function deployTemplate(_type/*模板種類*/){
	if(document.getElementById('restoreImport')) {
		$(document.getElementById('restoreImport')).remove();
		//--重設
		DDK.Mutual.reCall();
		DDK.DataImport.reCall();
		DDK.ModuleKit.reCall();
		DDK.OptionsUICaptain.reCall();
		//--重設
		DDK.Mutual.init();//啟動1
		DDK.Mutual.SyncTask.activateSyncTask();//啟動2-1
		DDK.Mutual.InVerifiTask.activateVerifiTask();//啟動2-2
		DDK.DataImport.init();//啟動3
		DDK.ModuleKit.init();//啟動4
		DDK.OptionsUICaptain.init();//啟動5,自動偵測是否有既有資料後呼叫DDK.OptionsUICaptain.switchModule
	}
	DDK.OptionsUICaptain.switchModule(_type , false/*一律以非唯讀模式初始化*/);
}
function discardUselessDataInTemplate(){
	DDK.Mutual.SyncTask.emptyTasks();//先執行
	DDK.Mutual.SyncTask.discardTaskExecution();//後執行
	DDK.OptionsUICaptain.discardUselessDataInModule();//先執行
	DDK.OptionsUICaptain.discardUselessModule();//後執行
}
function deployPresetTemplate(_type/*模板種類*/){
	//--重設
	DDK.Mutual.reCall();
	DDK.DataImport.reCall();
	DDK.ModuleKit.reCall();
	DDK.OptionsUICaptain.reCall();
	//--重設
	DDK.Mutual.init();//啟動1
	DDK.Mutual.SyncTask.activateSyncTask();//啟動2-1
	DDK.Mutual.InVerifiTask.activateVerifiTask();//啟動2-2
	DDK.DataImport.init();//啟動3
	DDK.ModuleKit.init();//啟動4
	DDK.OptionsUICaptain.init();//啟動5,自動偵測是否有既有資料後呼叫DDK.OptionsUICaptain.switchModule
	//DDK.OptionsUICaptain.switchModule(_type);不需要,
}
var openHint = DDK.Mutual.hintBox;
var openConfirm = DDK.Mutual.confirmBox;
var openWait = DDK.Mutual.waitBox;
function publishTemplate(_form/*共用的表單物件*/){
	return DDK.Mutual.fireData(_form);
}