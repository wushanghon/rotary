function FxAddEventListener(HTML_OBJECT_ONE_OR_AN_ARRAY , EVENT_TYPE_STRING , EVENT_HANDLER_FUNCTION , CAPTURE_BOOLEAN){}
function FxRemoveEventListener(HTML_OBJECT_ONE_OR_AN_ARRAY , EVENT_TYPE_STRING , EVENT_HANDLER_FUNCTION , CAPTURE_BOOLEAN){}
function FxRemoveEventListenerById(REGISTED_EVENT_NUMBER_ID){}
function FxRemoveEachEventListener(HTML_OBJECT){}
function FxDispatchEvent(EVENT_TYPE , DISPATCH_DATA_OBJECT){}
function FxCleanUpRegListener(){}
function FxGetEventUid(EVENT_TYPE , EVENT_ATTRIBUTE_STRING){}
function FxRegistedEvents(){}
function FxSetAttribute(HTML_OBJECT , ATTRIBUTE_NAME , VALUE){}
function FxGetAttribute(HTML_OBJECT , ATTRIBUTE_NAME){}
function FxRemoveAttribute(HTML_OBJECT , ATTRIBUTE_NAME){}
function FxCreateAttribute(HTML_OBJECT , ATTRIBUTE_NAME , VALUE){}
function FxHasAttribute(HTML_OBJECT , ATTRIBUTE_NAME){}
(function(){
/**
版本:2.0 full(相容1.0 版本與1.0 beta 版本所有函數)
作者:王德安
更新日期:2019/01/02
改版重點:
1.改用Self Invoke (Immediately-invoked Function Expression = IIFE)模式撰寫,降低函數名稱衝突機率(https://medium.com/@vvkchandra/essential-javascript-mastering-immediately-invoked-function-expressions-67791338ddc6).
2.將之前為專案開發較為進階的事件註冊管理架構移入.
3.承上;新增 ... 作為更快速處理事件的註冊或移除.
4.新增FxFotoCaption() 作為處理圖檔在受限可視範圍內(遮照)的填滿(shrink)或縮放(scale),原本是許多官網型專案的常見需求.
*/
	
	var initTime = new Date()/*啟動時間*/;
	var eventMode = (typeof window.addEventListener != 'undefined') ? 0 : 1/*瀏覽器支援事件模式 addEventListener/removeEventListener = 0 , attachEvent/detachEvent = 1*/;
	var api_ary = []/*要對window.self 提供的函數名稱與參照*/;
	var isMobile = (function (){
		var check = false;
		(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
		return ((typeof window.orientation !== "undefined")/*增加檢查手持裝置可能額外有的函數*/ || (navigator.userAgent.indexOf('IEMobile') !== -1) == true && check == true);
	}())/*是否為手持裝置(只能抓個大概的可能性)*/;
	var isOldIE = (function(){
    	var undef , v = 3 , div = document.createElement('div') , all = div.getElementsByTagName('i');
		while (
			div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
			all[0]
		);

		return v > 4 ? v : -1;

	}());/*是否為老的IE 系列(IE9,8,7~n) http://stackoverflow.com/questions/5574842/best-way-to-check-for-ie-less-than-9-in-javascript-without-library*/
	//
	var QuickAttribute={ConstantStatic:{EXTEND_DOM_PROP_ATTRIBUTE_NAME:"FxAttributes"},VarableDynamic:{},SetAttribute:function(t,i,e){return e=String(e),0==QuickAttribute.HasAttribute(t,i)&&QuickAttribute.CreateAttribute(t,i,e),1==QuickAttribute.CanUseTagAttribute(t,"setAttribute")?t.setAttribute(i,e):t[QuickAttribute.ConstantStatic.EXTEND_DOM_PROP_ATTRIBUTE_NAME][i]=e,t},GetAttribute:function(t,i){return 1==QuickAttribute.HasAttribute(t,i)?1==QuickAttribute.CanUseTagAttribute(t,"getAttribute")?t.getAttribute(i):t[QuickAttribute.ConstantStatic.EXTEND_DOM_PROP_ATTRIBUTE_NAME][i]:void 0},CreateAttribute:function(t,i,e){return 1==QuickAttribute.CanUseTagAttribute(t,"hasAttribute")?(0==t.hasAttribute(i)&&t.setAttributeNode(document.createAttribute(i)),3==arguments.length?t.setAttribute(i,String(e)):t.setAttribute(i,"")):(1==!t[QuickAttribute.ConstantStatic.EXTEND_DOM_PROP_ATTRIBUTE_NAME]&&(t[QuickAttribute.ConstantStatic.EXTEND_DOM_PROP_ATTRIBUTE_NAME]={}),3==arguments.length?t[QuickAttribute.ConstantStatic.EXTEND_DOM_PROP_ATTRIBUTE_NAME][i]=String(e):t[QuickAttribute.ConstantStatic.EXTEND_DOM_PROP_ATTRIBUTE_NAME][i]=""),t},RemoveAttribute:function(t,i){return 1==QuickAttribute.HasAttribute(t,i)&&(1==QuickAttribute.CanUseTagAttribute(t,"removeAttribute")?t.removeAttribute(i):t[QuickAttribute.ConstantStatic.EXTEND_DOM_PROP_ATTRIBUTE_NAME][i]=void 0),t},HasAttribute:function(t,i){return 1==QuickAttribute.CanUseTagAttribute(t,"hasAttribute")?t.hasAttribute(i):1!=!t[QuickAttribute.ConstantStatic.EXTEND_DOM_PROP_ATTRIBUTE_NAME]&&1!=!t[QuickAttribute.ConstantStatic.EXTEND_DOM_PROP_ATTRIBUTE_NAME][i]},CanUseTagAttribute:function(t,i){return 1!=!t[i]}};
	api_ary.push([QuickAttribute.SetAttribute , 'FxSetAttribute']/*新*/);
	api_ary.push([QuickAttribute.GetAttribute , 'FxGetAttribute']/*新*/);
	api_ary.push([QuickAttribute.RemoveAttribute , 'FxRemoveAttribute']/*新*/);
	api_ary.push([QuickAttribute.CreateAttribute , 'FxCreateAttribute']/*新*/);
	api_ary.push([QuickAttribute.HasAttribute , 'FxHasAttribute']/*新*/);
	//
	var EventSystem={ConstantStatic:{ATTRIBUTE_LABEL:"fx-event-ids",SYMBOL:{SPLITER:",",EQUAL:"|"}},VarableDynamic:{EventRegistryArray:[]},AddEventListener:function(t,e,n,r){if(1==EventSystem.IsMultipleItems(t)){for(var i=[],s=0;s<t.length;s++)i.push(EventSystem.AddSingleEventListener(t[s],e,n,r));return i}return EventSystem.AddSingleEventListener(t,e,n,r)},AddSingleEventListener:function(t,e,n,r){var i,s,a;return e=EventSystem.FixEventTypeString(eventMode,e.toLowerCase()),EventSystem.VarableDynamic.EventRegistryArray.push({element:t,type:e,eventHolder:n,captureBoolean:r,eventMode:eventMode,add:function(){0==this.eventMode?this.element.addEventListener(this.type,this.eventHolder,this.captureBoolean):this.element.attachEvent(this.type,this.eventHolder)},remove:function(){0==this.eventMode?this.element.removeEventListener(this.type,this.eventHolder,this.captureBoolean):this.element.detachEvent(this.type,this.eventHolder)}}),s=EventSystem.VarableDynamic.EventRegistryArray.length-1,0==QuickAttribute.HasAttribute(t,EventSystem.ConstantStatic.ATTRIBUTE_LABEL)?(QuickAttribute.CreateAttribute(t,EventSystem.ConstantStatic.ATTRIBUTE_LABEL),a="",i=""):i=""==(a=QuickAttribute.GetAttribute(t,EventSystem.ConstantStatic.ATTRIBUTE_LABEL))?"":EventSystem.ConstantStatic.SYMBOL.SPLITER,a+=i+e+EventSystem.ConstantStatic.SYMBOL.EQUAL+s,QuickAttribute.SetAttribute(t,EventSystem.ConstantStatic.ATTRIBUTE_LABEL,a),EventSystem.VarableDynamic.EventRegistryArray[s].add(),s},RemoveEventListener:function(t,e,n,r){var i,s,a,v=[];a=EventSystem.IsMultipleItems(t),e=EventSystem.FixEventTypeString(eventMode,e.toLowerCase());for(var E=function(t,e){return t.element==e.element&&t.type==e.type&&t.eventHolder==e.eventHolder&&t.captureBoolean==e.captureBoolean},y=0;y<EventSystem.VarableDynamic.EventRegistryArray.length;y++)if(i=EventSystem.VarableDynamic.EventRegistryArray[y],1==a)for(var m=0;m<t.length;m++)1==E({element:t[m],type:e,eventHolder:n,captureBoolean:r},i)&&v.push(y);else 1==E({element:t,type:e,eventHolder:n,captureBoolean:r},i)&&v.push(y);if(0==v.length)return-1;if(v.length>1){s=[];for(y=0;y<v.length;y++)1==(a=EventSystem.RemoveEventListenerById(v[y]))?s.push(v[y]):s.push(-1)}else s=1==(a=EventSystem.RemoveEventListenerById(v[0]))?v[0]:-1;return s},RemoveEventListenerById:function(t){if(1==isNaN(Number(t)))return!1;t=Number(t);var e,n,r,i=EventSystem.VarableDynamic.EventRegistryArray[t];if(0==(0!=QuickAttribute.HasAttribute(i.element,EventSystem.ConstantStatic.ATTRIBUTE_LABEL)))return!1;e=QuickAttribute.GetAttribute(i.element,EventSystem.ConstantStatic.ATTRIBUTE_LABEL).split(EventSystem.ConstantStatic.SYMBOL.SPLITER),n="";for(var s=0;s<e.length;s++)r=e[s],Number(e[s].split(EventSystem.ConstantStatic.SYMBOL.EQUAL)[1])!=t&&(n+=r+EventSystem.ConstantStatic.SYMBOL.SPLITER);return n.charAt(n.length-1)==EventSystem.ConstantStatic.SYMBOL.SPLITER&&(n=n.substring(0,n.length-1)),QuickAttribute.SetAttribute(i.element,EventSystem.ConstantStatic.ATTRIBUTE_LABEL,n),i.remove(),i.eventHolder=null,""==QuickAttribute.GetAttribute(i.element,EventSystem.ConstantStatic.ATTRIBUTE_LABEL)&&QuickAttribute.RemoveAttribute(i.element,EventSystem.ConstantStatic.ATTRIBUTE_LABEL),!0},RemoveEachEventListener:function(t){if(0==QuickAttribute.HasAttribute(t,EventSystem.ConstantStatic.ATTRIBUTE_LABEL))return!1;for(var e=QuickAttribute.GetAttribute(t,EventSystem.ConstantStatic.ATTRIBUTE_LABEL).split(EventSystem.ConstantStatic.SYMBOL.SPLITER),n=0;n<e.length;n++)if(0==EventSystem.RemoveEventListenerById(Number(e[n].split(EventSystem.ConstantStatic.SYMBOL.EQUAL)[1])))return!1;return!0},ClearAllExistenceEventListener:function(){for(var t=0;t<EventSystem.VarableDynamic.EventRegistryArray.length;t++)EventSystem.RemoveEventListenerById(t);EventSystem.VarableDynamic.EventRegistryArray=[]},DispatchEvent:function(t,e){var n,r=EventSystem.GetTriggerElements(t);if(0==r.length)return!1;for(var i=0;i<r.length;i++)(n=r[i]).type==t&&n.element&&n.element.dispatchEvent(new CustomEvent(t,{detail:e}));return!0},GetEventRegistedUid:function(t,e){for(var n,r=-1,i=e.split(EventSystem.ConstantStatic.SYMBOL.SPLITER),s=0;s<i.length;s++)(n=i[s].split(EventSystem.ConstantStatic.SYMBOL.EQUAL))[0]==t&&(r=Number(n[1]));return r},GetTriggerElements:function(t){for(var e=[],n=0;n<EventSystem.VarableDynamic.EventRegistryArray.length;n++)EventSystem.VarableDynamic.EventRegistryArray[n].type==t&&e.push(EventSystem.VarableDynamic.EventRegistryArray[n]);return e},FixEventTypeString:function(t,e){return 0==t?0==e.indexOf("on")&&(e=e.substring(2,e.length)):-1==e.indexOf("on")&&(e="on"+e),e},IsMultipleItems:function(t){return 1==!t.tagName&&0==!t.length&&(Array,!0)},ReturnRegistryArray:function(){return 0==EventSystem.VarableDynamic.EventRegistryArray.length?[]:EventSystem.VarableDynamic.EventRegistryArray.slice()}};
	api_ary.push([EventSystem.AddEventListener , 'FxAddEventListener']);
	api_ary.push([EventSystem.RemoveEventListener , 'FxRemoveEventListener']);
	api_ary.push([EventSystem.RemoveEventListenerById , 'FxRemoveEventListenerById']/*新*/);
	api_ary.push([EventSystem.RemoveEachEventListener , 'FxRemoveEachEventListener']/*新*/);
	api_ary.push([EventSystem.DispatchEvent , 'FxDispatchEvent']/*新*/);
	api_ary.push([EventSystem.ClearAllExistenceEventListener , 'FxCleanUpRegListener']/*新*/);
	api_ary.push([EventSystem.GetEventRegistedUid , 'FxGetEventUid']/*新*/);
	api_ary.push([EventSystem.ReturnRegistryArray , 'FxRegistedEvents']/*新*/);
	//
	var SocialWebPost={ConstantStatic:{MATCHS:{FACEBOOK:"facebook",GOOGLE_PLUS:"google+",TWITTER:"twitter",PLURK:"plurk",SINA:"sina"},URL:{FACEBOOK:"https://www.facebook.com/sharer/sharer.php",GOOGLE_PLUS:"https://plus.google.com/share",TWITTER:"http://www.twitter.com/share",PLURK:"http://www.plurk.com/",SINA:"http://v.t.sina.com.cn/share/share.php"},OPEN_WINDOW_FEATURES:"status=no,location=no,status=no,menubar=no,toolbar=no,resizable=no,scrollbars=no"},VarableDynamic:{windowWidth:580,windowHeight:400,windowTopInit:window.screen.availHeight-30,windwoLeftInit:window.screen.availWidth-10},ShareTo:function(t,o){var a,e,n=t+"_go",i="";switch(window.encodeURIComponent?(a=encodeURIComponent(document.title),e=encodeURIComponent(o)):(a=escape(document.title),e=escape(o)),t=t.toLowerCase()){case SocialWebPost.ConstantStatic.MATCHS.FACEBOOK:i=SocialWebPost.ConstantStatic.URL.FACEBOOK+"?u="+e;break;case SocialWebPost.ConstantStatic.MATCHS.GOOGLE_PLUS:i=SocialWebPost.ConstantStatic.URL.GOOGLE_PLUS+"?url="+e;break;case SocialWebPost.ConstantStatic.MATCHS.TWITTER:i=SocialWebPost.ConstantStatic.URL.TWITTER+"?url="+e+"&text="+a;break;case SocialWebPost.ConstantStatic.MATCHS.PLURK:i=SocialWebPost.ConstantStatic.URL.PLURK+"?qualifier=shares&amp;status="+e+" ("+a+")";break;case SocialWebPost.ConstantStatic.MATCHS.SINA:i=SocialWebPost.ConstantStatic.URL.SINA+"?url="+e+"&title="+a}SocialWebPost.OpenToSocialWeb(i,n,SocialWebPost.VarableDynamic.windowWidth,SocialWebPost.VarableDynamic.windowHeight)},OpenToSocialWeb:function(t,o,a,e){var n=(SocialWebPost.VarableDynamic.windowTopInit-a)/2,i=(SocialWebPost.VarableDynamic.windwoLeftInit-e)/2;window.open(t,o,"height="+e+",width="+a+",top="+n+",left="+i+","+SocialWebPost.ConstantStatic.OPEN_WINDOW_FEATURES)}};
	api_ary.push([SocialWebPost.ShareTo , 'FxShareTo']);
	/**
	!網頁圖檔常見的作業需求.
	*/
	var WebImageThread = {
		/**
		!靜態常數集.
		*/
		ConstantStatic : {
			IMG_COMPLETE:'complete',
			IMG_DONE_ATTRIBUTE_NAME:'fx-check-loaded',
			IMG_LOAD_ERROR:'error',
			CORP_MODE:{
				SHRINK:'shrink',
				SCALE:'scale'
			}
		}
		,
		/**
		!動態變數集.
		*/
		VarableDynamic : {
			intervalTaskArray:[],
			queueArray:[]
		}
		,
		/**
		!檢查一或多個已經出現在網頁上的圖檔的載入是否完成.完成條件為IMG.complete = true ,再外加IMG 的naturalHeight + naturalWidth 需大於0.
		>_data Object|{img_ary:Array , HTML Object , jQuery Object|圖檔清單,若只有一張圖檔時也須包裝為陣列傳入 , interval:String|一個辨識名稱,選擇性 , eachEnd:Function|單張圖檔載入後呼叫的callback,呼叫時傳入兩個引數,引數1為圖檔參照,引數2為載入成功與否的Boolean值 , end:Function|當圖檔清單被認為完成時呼叫的callback,呼叫時}
		@回傳 Function|一個可以被呼叫函數,呼叫後才真正開始檢查圖檔的載入與否.
		*/
		CheckMultiImgLoad:function(_data){
			if(!_data.img_ary || _data.img_ary.length == 0 || !_data) return function(){console.log('Image List Missing')};
			if(!_data.img_ary.length) _data.img_ary = [_data.img_ary];
			if(!_data.interval) _data.interval = String('Interval_' + new Date().getTime());
			if(typeof(_data.interval) != 'string') _data.interval = String(_data.interval);
			if(!_data.eachEnd || typeof(_data.eachEnd) != 'function') _data.eachEnd = function (){};
			if(!_data.end || typeof(_data.end) != 'function') _data.end = function (){};
			if(!_data.delay || typeof(_data.delay) != 'number') _data.delay = 50;
						
			WebImageThread.VarableDynamic.intervalTaskArray.push({
				imgList:[],
				intervalId:_data.interval,
				singleImgLoaded:_data.eachEnd,
				imgLoaded:_data.end,
				intervalLoop:_data.delay,
				taskDone:false,
				checkImgLoaded:function(_ref){
					var run_interval , succes_ary , failue_ary;
					run_interval = setInterval(function(){
						var chk = 0;
						var img , isComplete , loadStatus , attr;
						for(var i = 0;i<_ref.imgList.length;i++){
							img = _ref.imgList[i];
							isComplete = img[WebImageThread.ConstantStatic.IMG_COMPLETE];
							loadStatus = Number(QuickAttribute.GetAttribute(img , WebImageThread.ConstantStatic.IMG_DONE_ATTRIBUTE_NAME));
							(isComplete == true || loadStatus == -1) ? chk += 1/*載入失敗的圖檔,也會在這個判斷中被認為成立,因瀏覽器會實作上對於載入失敗也是認定img.complete = true*/ : null;
							if(
								isComplete == true && 
								(isOldIE == -1) ? (img.naturalHeight + img.naturalWidth) > 0 : (img.clientHeight + img.clientWidth) > 0 && 
								(
									loadStatus == 0 || 
									loadStatus == -1
								) == true
							){
								
								EventSystem.RemoveEventListener(img , WebImageThread.ConstantStatic.IMG_LOAD_ERROR , WebImageThread.ImgLoadError , false);
								if(loadStatus == 0) {//只針對載入成功的
									QuickAttribute.SetAttribute(img , WebImageThread.ConstantStatic.IMG_DONE_ATTRIBUTE_NAME , 1);//載入後標記為已載入,若為loadStatus = -1 時則為載入失敗,忽略
									_ref.singleImgLoaded(img , true);//呼叫一次單張圖檔載入的callback
								}
							}
						}
						if(chk == _ref.imgList.length){
							clearInterval(run_interval);
							//console.log('Interval 中斷');
							_ref.taskDone = true;
							succes_ary = [];//載入成功的陣列
							failue_ary = [];//載入失敗的陣列,不一定有
							for(var i = 0;i<_ref.imgList.length;i++){
								attr = Number(QuickAttribute.GetAttribute(_ref.imgList[i] , WebImageThread.ConstantStatic.IMG_DONE_ATTRIBUTE_NAME)) == -1;
								if(attr == true){//分辨有無載入失敗的圖檔
									failue_ary.push(_ref.imgList[i]);
									_ref.singleImgLoaded(_ref.imgList[i] , false);//對載入失敗的圖檔呼叫一次單張圖檔載入的callback
								} else {
									succes_ary.push(_ref.imgList[i])
								}
							}
							_ref.imgLoaded(succes_ary , failue_ary);//執行一次全部圖檔載入的callback
						}
					} , _ref.intervalLoop);
				}
			});
			var count = WebImageThread.VarableDynamic.intervalTaskArray.length - 1;
			for(var i = 0;i<_data.img_ary.length;i++) {
				(QuickAttribute.HasAttribute(_data.img_ary[i]) == false) ? QuickAttribute.CreateAttribute(_data.img_ary[i] , WebImageThread.ConstantStatic.IMG_DONE_ATTRIBUTE_NAME , 0) : null;
				WebImageThread.VarableDynamic.intervalTaskArray[count].imgList.push(_data.img_ary[i]);
			}
			EventSystem.AddEventListener(WebImageThread.VarableDynamic.intervalTaskArray[count].imgList , WebImageThread.ConstantStatic.IMG_LOAD_ERROR , WebImageThread.ImgLoadError , false);//對圖檔清單註冊監聽載入失敗的事件
			return function(){
				WebImageThread.VarableDynamic.intervalTaskArray[count].checkImgLoaded(WebImageThread.VarableDynamic.intervalTaskArray[count]);//實質上的啟動監聽函數
			};
		}
		,
		/**
		!監聽圖檔載入失敗事件.
		*/
		ImgLoadError:function(e){
			var _t;
			(isOldIE == -1) ? _t = e.currentTarget : _t = FxEventObject(e).target;//需注意跨瀏覽器問題
			//console.log(_t)
			QuickAttribute.SetAttribute(_t , WebImageThread.ConstantStatic.IMG_DONE_ATTRIBUTE_NAME , '-1');
			EventSystem.RemoveEventListener(_t , WebImageThread.ConstantStatic.IMG_LOAD_ERROR , WebImageThread.ImgLoadError , false);
		}
		,
		/**
		!計算一內側矩形若要縮放使之貼齊外側矩形的寬高邊或溢出寬高邊的左與上的偏移量及寬高的尺寸.
		>_outterRectWidth Number|外側矩形的寬.
		>_outterRectHeight Number|外側矩形的高.
		>_innerRectWidth Number|內側矩形的寬.
		>_innerRectHeight Number|內側矩形的高.
		>_overflowed Boolean|true = 指定以溢出方式貼齊外側矩形並垂直水平置中 , false = 寬高不超過外側矩形寬高並垂直水平置中.
		*/
		ImgScale:function(_outterRectWidth , _outterRectHeight , _innerRectWidth , _innerRectHeight , _overflowed){
			/*var maxWidth , maxHeight , scaleWidth , scaleHeight , scale , fixWidth , fixHeight , fixTop , fixLeft;
			maxWidth = _outterRectWidth;
			maxHeight = _outterRectHeight;
			
			var result = { width: 0, height: 0, fScaleTo_outterRectWidth: true };*/
		
			if (_innerRectWidth <= 0 || _innerRectHeight <= 0 || _outterRectWidth <= 0 || _outterRectHeight <= 0) return [0 , 0 , 0 , 0];//如果缺少內側矩形寬高或外側矩形寬高四者任何一個,回傳無意義的參數並跳出
			var newWidth , newHeight , offsetLeft , offsetTop , scaleX1 , scaleX2 , scaleY1 , scaleY2 , fitScaleOnWidth/*內側矩形縮放比例可否根據外側矩形的寬邊*/;
			// scale to the target width
			scaleX1 = _outterRectWidth;
			scaleY1 = (_innerRectHeight * _outterRectWidth) / _innerRectWidth;
		
			// scale to the target height
			scaleX2 = (_innerRectWidth * _outterRectHeight) / _innerRectHeight;
			scaleY2 = _outterRectHeight;
		
			// now figure out which one we should use
			(scaleX2 > _outterRectWidth == true) ? fitScaleOnWidth = _overflowed/*如參數要求可以貼齊寬邊*/ : fitScaleOnWidth = !_overflowed;
		
			if(fitScaleOnWidth == true) {//以寬邊
				
				newWidth = Math.floor(scaleX1);
				newHeight = Math.floor(scaleY1);
				//result.fScaleTo_outterRectWidth = true;
			} else {//以高邊
				newWidth = Math.floor(scaleX2);
				newHeight = Math.floor(scaleY2);
				
				//result.fScaleTo_outterRectWidth = false;
			}

			offsetLeft = Math.floor((_outterRectWidth - newWidth) / 2);//影像在容器內的左側偏移量
			offsetTop = Math.floor((_outterRectHeight - newHeight) / 2);//影像在容器內的高度偏移量

			return [offsetTop , offsetLeft , newWidth , newHeight];
		}
		,
		/**
		!對放在具有遮照效果容器中的圖檔 , 在瀏覽器視窗尺寸有變更時(包含手持裝置的旋轉) , 更新這些圖檔相對於它們的容器所需的變形.
		>_prop Object|設定參數{
			imageList:Array , jQuery Object , HTML Selector|需要更新圖檔的清單 , 
			update:Boolean|是否持續更新圖檔的對齊 , 
			contenter:String|圖檔具有遮照效果,可取得寬高資訊的父系物件,同一批圖檔需要相同的父系物件,可以是標籤名稱也可以是class 樣式名稱,不建議使用id , 
			formatter:String|圖檔在容器內的呈現方式,'shrink' = 等比例填滿父系物件 , 'scale' = 等比例內縮進父系物件 , 
			preload:Object|選擇性,若有傳入代表其內需有{eachEnd:Function , end:Function} 兩個處理單張圖檔載入與全部圖檔載入的函數
		}.
		>_prop.formatter Function|另外一種呈現方式為直接傳入自訂的計算方式函數 , 輸入為({width:Number|圖檔的寬 , height:Number|圖檔的高} , {width:Number|父系物件的寬 , height:Number|父系物件的高}) , 輸出為四個數值[上方偏移值 , 左方偏移值 , 圖檔寬度 , 圖檔高度].
		@回傳 Number|當_prop.update = true 時,回傳一個整數作為持續更新圖檔的任務ID , 若設為false 則回傳 - 1.
		*/
		NewFotoCaption:function(_prop){
			if(!_prop) return;
			
			if(!_prop.imageList || !_prop.contenter || !_prop.formatter) return;
			if(_prop.imageList.length == 0) return;
			if(_prop.contenter == '') return;
			if(_prop.formatter == '') return;
			//if(!_prop.preload == '') _prop.preload = true;
			_prop.contenterPath = WebImageThread.FindContenter(_prop.imageList[0] , _prop.contenter);//擴充一個父系物件的關連物件運算子路徑屬性
			
			if(_prop.formatter == 'shrink'){
				_prop.formatter = WebImageThread.ShrinkFormatter;
			} else if(_prop.formatter == 'scale'){
				
				_prop.formatter = WebImageThread.ScaleFormatter;
				
			}
			
			//注意;若不是'shrink' 或'scale' 則表示_prop.formatter 是自訂的演算法函數.
			if(!_prop.preload == false){//有傳入prop.preload 物件,執行預載
				var eachImageLoad = function(img , success){
					if(success == true) {
						
						(QuickAttribute.HasAttribute(img , 'style') == true) ? QuickAttribute.SetAttribute(img , 'style' , '') : QuickAttribute.CreateAttribute(img , 'style');//先確認圖檔的style 屬性狀態並清空
						var _adj = _prop.formatter(img , img[_prop.contenterPath]);
						QuickAttribute.SetAttribute(
							img , 
							'style' , 
							'margin-top:' + _adj[0] + 'px;' + 'margin-left:' + _adj[1] + 'px;' + 'width:' + _adj[2] + 'px;' + 'height:' + _adj[3] + 'px;'
						);
					}
					if(!_prop.preload.eachEnd == false)_prop.preload.eachEnd(img , success);
				};
				WebImageThread.CheckMultiImgLoad({
					img_ary : _prop.imageList , 
					interval : 'FotoCaption_' + _prop.contenter , 
					delay : 50 , 
					eachEnd : eachImageLoad , 
					end : function (success_ary , failue_ary){
						if(!_prop.preload.end == false) _prop.preload.end(success_ary , failue_ary);
						
					}
				})();//直接執行
			} else {
				
			}
			if(_prop.update == true){//保存為持續更新項目
				_prop.enabled = true;//曾加一個辨識是否持續更新的屬性
				WebImageThread.VarableDynamic.queueArray.push(_prop);
			}
			EventSystem.AddEventListener(window , 'resize' , function(){
				setTimeout(function(){WebImageThread.WatchAllSizeChange();} , 1000);
			} , false);
			WebImageThread.WatchAllSizeChange();
			return (_prop.update == true) ? WebImageThread.VarableDynamic.queueArray.length - 1 : -1;
			
//			prop.contenterPath = DDK.mutual.fotoCaptain.findContenter(prop.imageList[0] , prop.contenter);
//			if(prop.formatter == 'shrink'){
//				prop.formatter = DDK.mutual.fotoCaptain.shrinkFormatter;
//			} else if(prop.formatter == 'scale'){
//				prop.formatter = DDK.mutual.fotoCaptain.scaleFormatter;
//			} else {
//				//使用傳入的原始資料作為formatter
//			}
//			if(prop.preload == true){//執行預載
//				FxCheckMultiImgLoad({
//					img_ary : prop.imageList , 
//					interval : 'on load call ' + prop.contenter , 
//					delay : 50 /* 檢查頻率建議50毫秒,預設也是50毫秒 */, 
//					eachEnd : function (img){
//						var ctx = img[prop.contenterPath];
//						prop.formatter(img , ctx);
//						if($(ctx).hasClass('preloadImg') == true) $(ctx).removeClass('preloadImg');//移除預載畫面
//					} , 
//					end : function (){
//						//alert('檢查完成');
//					}
//				})();
//			}
//			if(prop.update == true){//保存為更新項目
//				DDK.mutual.fotoCaptain.queue_ary.push(prop);
//			}
//			
//			if(DDK.mutual.fotoCaptain.isActive == false){
//				if(DDK.isRwd == true || DDK.isMobile == true){
//					FxAddEventListener(window , DDK.orientationEvent.u , DDK.mutual.fotoCaptain.updateAllSizeFix , false);
//				} else {
//					FxAddEventListener(window , 'resize' , DDK.mutual.fotoCaptain.updateAllSizeFix , false);
//				}
//				DDK.mutual.fotoCaptain.updateAllSizeFix();
//				DDK.mutual.fotoCaptain.isActive = true;
//			}
		}
		,
		RemoveFotoCaption:function(_id){
			if(WebImageThread.VarableDynamic.queueArray[_id]) WebImageThread.VarableDynamic.queueArray[_id].enabled = false;
		}
		,
		WatchAllSizeChange:function(){
			var run_ok;
			var ok = function (){//略為延後處理
				clearInterval(run_ok);
				//更新各類尺寸的函數
				var img_ary , queueData , formatter , contenterPath , img , ctx , adj;
				for(var i = 0;i<WebImageThread.VarableDynamic.queueArray.length;i++){
					//enabled
					queueData = WebImageThread.VarableDynamic.queueArray[i];
					if(queueData.enabled == true){//沒有被關閉
						formatter = queueData.formatter;
						img_ary = queueData.imageList;
						contenterPath = queueData.contenterPath;
						//console.log(DDK.mutual.fotoCaptain.queue_ary[i])
						for(var j = 0;j<img_ary.length;j++){
							img = img_ary[j];
							ctx = img[contenterPath];
							if(
								QuickAttribute.HasAttribute(img , WebImageThread.ConstantStatic.IMG_DONE_ATTRIBUTE_NAME) == true && 
								Boolean(Number(QuickAttribute.GetAttribute(img , WebImageThread.ConstantStatic.IMG_DONE_ATTRIBUTE_NAME))) == true
							) {//確認圖檔有下載,執行圖檔變更尺寸
								
								$(img).css({'margin-top':'auto' , 'margin-left':'auto' , 'width':'auto' , 'height':'auto'});//先重設尺寸
								adj = formatter(img , ctx);//計算圖檔變更尺寸
								//console.log(adj);
								$(img).css({'margin-top':adj[0] + 'px' , 'margin-left':adj[1] + 'px' , 'width':adj[2] + 'px' , 'height':adj[3] + 'px'})//圖檔變更尺寸
							}
						}
					}
				}
			};
			run_ok = setInterval(ok , 100);
		}
		,
		FindContenter:function(currentElement , target){
			var path = '';
			var _p = currentElement;
			var refer = {type:'' , clue:''};
			if(target.charAt(0) == '.'){
				refer.type = 'CLASS';
				refer.clue = target.substring(1 , target.length);
			} else {
				refer.type = 'TAG';
				refer.clue = target.toUpperCase();
			}
			for(var i = 0;;i++){
				if(refer.type == 'CLASS'){
					if($(_p).hasClass(refer.clue) == true){
						break;
					} else {
						_p = _p['parentElement'];//參照往上一層尋找
						path += '.parentElement';
					}
					if(_p.tagName.toUpperCase() == 'HTML'){
						//視為尋找失敗
						path = 'undefined';
						break;
					}
				} else if(refer.type == 'TAG'){
					if(_p.tagName.toUpperCase() == refer.clue){
						break;
					} else {
						_p = _p['parentElement'];//參照往上一層尋找
						path += '.parentElement';
					}
					if(_p.tagName.toUpperCase() == 'HTML'){
						//視為尋找失敗
						path = 'undefined';
						break;
					}
				}
			}
			if(path.charAt(0) == '.') path = path.substring(1 , path.length);//找到後移除第一個"."
			return path;
		}
		,
		/**
		預設格式化公式,以寬或高的某一邊貼齊父系物件的寬或高,等比縮放後填滿父系物件並垂直水平置中.
		>_img HTML Object|目標圖檔.
		>_ctx HTML Object|具有可取得寬高資訊的圖檔父系物件.
		@回傳 Array|四個數值[上方偏移值 , 左方偏移值 , 圖檔寬度 , 圖檔高度].
		*/
		ShrinkFormatter : function (_img , _ctx){
			//var _adj = FxImgShrinkToRect($(ctx).width() , $(ctx).height() , $(img).width() , $(img).height());
			//$(img).css({'margin-top': + _adj[0] + 'px' , 'margin-left': + _adj[1] + 'px' , 'width': + _adj[2] + 'px' , 'height': + _adj[3] + 'px'});
			//(FxUserAgentFeature().oldIE == -1) ? adj = FxImgShrinkToRect(contenter.clientWidth , contenter.clientHeight , rect.naturalWidth , rect.naturalHeight , fit) : adj = FxImgShrinkToRect(contenter.clientWidth , contenter.clientHeight , rect.clientWidth , rect.clientHeight , fit)
			//var adj;
			return (isOldIE == -1) ? WebImageThread.ImgScale(_ctx.clientWidth , _ctx.clientHeight , _img.naturalWidth , _img.naturalHeight , false) : WebImageThread.ImgScale(_ctx.clientWidth , _ctx.clientHeight , _img.clientWidth , _img.clientHeight , false);
			//return adj;
		}
		,
		/**
		預設格式化公式,以最大寬高不超過父系物件寬高方式,等比例縮小在父系物件內並垂直水平置中.
		>_img HTML Object|目標圖檔.
		>_ctx HTML Object|具有可取得寬高資訊的圖檔父系物件.
		@回傳 Array|四個數值[上方偏移值 , 左方偏移值 , 圖檔寬度 , 圖檔高度].
		*/
		ScaleFormatter : function (_img , _ctx){
			
			//var _adj = FxImgScaleToRect($(ctx).width() , $(ctx).height() , $(img).width() , $(img).height());
			//$(img).css({'margin-top': + _adj[0] + 'px' , 'margin-left': + _adj[1] + 'px' , 'width': + _adj[2] + 'px' , 'height': + _adj[3] + 'px'});
			//var adj;
			return (isOldIE == -1) ? WebImageThread.ImgScale(_ctx.clientWidth , _ctx.clientHeight , _img.naturalWidth , _img.naturalHeight , true) : WebImageThread.ImgScale(_ctx.clientWidth , _ctx.clientHeight , _img.clientWidth , _img.clientHeight , true);
			//return adj;
		}
	};
	api_ary.push([WebImageThread.CheckMultiImgLoad , 'FxCheckMultiImgLoad']/*功能有擴充*/);
	api_ary.push([WebImageThread.ImgScale , 'FxImgShrinkToRect']);
	api_ary.push([WebImageThread.NewFotoCaption , 'FxFotoCaption']/*新*/);
	api_ary.push([WebImageThread.RemoveFotoCaption , 'FxEjectedFotoCaption']/*新*/);
	/**
	!手持裝置擴充.
	*/
	var HandHeldThread = {
		/**
		!靜態常數集.
		*/
		ConstantStatic : {
			
		}
		,
		/**
		!動態變數集.
		*/
		VarableDynamic : {
			
		}
		
	};
	//api_ary.push();
	//
	/**
	!對於事件處理函數拋回物件(Event Object)進行跨瀏覽器處理.
	>_e Object|事件處理函數拋回物件(Event Object).
	@回傳 Object|{target:Object|e.target或e.srcElement , overwriteDefault:Function|停止元素預設行為 , stopBubble:Function|停止事件的泡沫堆疊}
	*/
	function FxEventObject(_e){
		var newE = {};
		newE.e = _e || event/*舊IE 時期的事件處理函數拋回物件*/;
		newE.target = newE.e.target || newE.e.srcElement/*舊IE 時期的事件觸發元素參考*/;
		newE.overwriteDefault = function (){
			(this.e.preventDefault) ? this.e.preventDefault() : this.e.returnValue = false;
			return this;
		};
		newE.stopBubble = function (){
			(this.e.stopPropagation) ? this.e.stopPropagation() : this.e.cancelBubble = true;
			return this;
		};
		return newE;
	}
	/**
	!跨瀏覽器從事件接收函數中,取得正確的目標元素參照 , 若是瀏覽器使用attachEvent 回傳為srcElement , 若是瀏覽器使用addEventListener 回傳為傳入的this.
	>_e Object|事件接收函數擲回的引數物件.
	>_this Object|事件接收函數中直接呼叫的this.
	@回傳 HTML Object|觸發事件的元素參照.
	*/
	function FxFindThis(_e , _this){
		var ret;
		(eventMode == 0) ? ret = _this/*IE 以外*/ : ret = _e.srcElement/*也許是IE 或8.0以下的IE*/;
		return ret;
	}
	/**
	!單一或大量文字取代.兩種引數帶入寫法(_str , _pattern , _fill , _mode[選擇性])或(_str , [{_pattern , _fill , _mode[選擇性]},...])
	>arguments[0] String|原始字串.
	>arguments[1] String , Array|若是String 用作被取代的字串 , 若是Array 為arguments[1~3]的多條件格式,使用此參數時以物件格式輸入{_pattern:String|要取代的文字 , _fill:String|新的文字 , _mode:String} , 此時_mode 依舊為選擇性且預設值為'all'.
	>arguments[2] String|新的字串.arguments[1] 為Array 時無效.
	>arguments[3] String|選擇性,'all' = 預設值,取代字串中每一個被取代的字串為新字串 , 'first' = 只尋找第一個被取代字串更新為新字串.
	@回傳 String|執行文字取代完畢後的字串副本,若無法執行文字取代回傳undefiend 作為識別.arguments[1] 為Array 時無效.
	*/
	function FxReplace(){
		var replaceMode = 1;
		var ArraySplitJoinReplace = function(_str/*原始字串*/ , _pat/*被取代的文字*/ , _fill/*新文字*/ , _mode/*取代模式,選擇性.'all'取代全部,也是預設.'first' 只對原始字串中第一次出線的被取代文字進行置換*/){/*使用陣列的內建函數執行文字取代*/
			var _ary = _str.split(_pat);
			if(_ary.length == 1) return _ary[0];//沒有可被取代的字串
			if(_mode == 0){//單一取代
				var n_ary = _ary.slice(1 , _ary.length );//複製第一個元素之後的所有元素
				return (_ary[0] + _fill/*將原始的第一個元素右方加上一次新的文字*/) + n_ary.join(_pat);//將被取代的文字寫回陣列並轉字串
			} else {
				return _ary.join(_fill);
			}
		};
		if(
			(arguments.length == 3 || arguments.length > 3) == true && 
			(typeof(arguments[0]) == 'string' && typeof(arguments[1]) == 'string' && typeof(arguments[2]) == 'string') == true
		){//單一取代模式
			if(arguments.length == 4) (arguments[3] == 'first') ? replaceMode = 0 : replaceMode = 1;/*0 全部取代,1 取代第一個*/
			return ArraySplitJoinReplace(arguments[0] , arguments[1] , arguments[2] , replaceMode);
		} else if(arguments.length == 2 && arguments[1] instanceof Array == true){//大量取代模式
			var tmp;
			var _str = arguments[0];
			for(var i = 0;i<arguments[1].length;i++){
				tmp = arguments[1][i];
				(!tmp._mode == true) ? replaceMode = 1/*沒有指定_mode*/ : (tmp._mode == 'first') ? replaceMode = 0 : replaceMode = 1;/*0 全部取代,1 取代第一個*/
				_str = ArraySplitJoinReplace(_str , tmp._pattern , tmp._fill , replaceMode);
			}
			return _str;
		} else {
			return 'undefiend';
		}
	}
	/**
	!回傳瀏覽器是否為舊系列的IE 以及是否可能是行動裝置.
	@回傳 Object|{oldIE:Number|IE9,8,7...n 回傳版本數整數,以外回傳為-1 , isMobile:Boolean|true = 可能是行動裝置}
	*/
	function FxGetBrowserSpecialFeature(){
		return {isOldIE:isOldIE , isMobile:isMobile , code:window.navigator.userAgent};
	}
	/**
	!移除HTML Object 上的行內樣式(inline-style) ,可設定例外的標籤與例外的行內樣式.
	>_tags HTML Object , Array , jQuery Object|單一或多個HTML 元素的清單.
	>_excludes Object|選擇性使用的排除條件 , 格式為{excludeTags:Array|在目標標籤內,不進行清除的標籤 , excludeStyles:Array|在行內樣式中,不予以清除的特定的樣式或樣式加上設定直['color' , 'color:#ff0022']} .
	*/
	function FxClaerInlineStyle(_tags){
		var hasExcludes = false;
		if(arguments.length == 2)hasExcludes = true;
	}
	/**
	!泡沫排序法.
	*/
	function FxBubbling(){
		
	}
	function FxTest(){
		EventSystem.VarableDynamic.EventRegistryArray[0].add()
	}
	api_ary.push([FxEventObject , 'FxEventObject']);
	api_ary.push([FxFindThis , 'FxFindThis']);
	api_ary.push([FxReplace , 'FxReplace']);
	api_ary.push([FxGetBrowserSpecialFeature , 'FxUserAgent']/*新*/);
	
	for(var i = 0;i<api_ary.length;i++) window.self[api_ary[i][1]] = api_ary[i][0];//對window.self 寫入作為外部API 的函數名稱

})();