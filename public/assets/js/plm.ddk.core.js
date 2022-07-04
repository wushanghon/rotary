var DDK = {
	active:function(){
		DDK.isRwd = DDK.checkRwd();
		DDK.Mutual.init();
//		if(DDK.isMobile == true) DDK.orientationEvent = FxHHenableOrientationEvent();
//		FxAddEventListener(window , 'resize' , function(){DDK.isRwd = DDK.checkRwd();DDK.blert('onresize RWD:'+DDK.isRwd);} , false)
	},
	blert:function (info){
		//if(window.console) console.log(info);
		//if(!window.console) alert(info);
	},
	checkRwd:function (){
		var ele = document.getElementById('pingForRwd').getElementsByTagName('P')[0];
		if(window.getComputedStyle){
			var judge = window.getComputedStyle(ele,null).getPropertyValue('float');
			if(judge == 'left'){
				return false;
			} else {
				return true;
			}
		} else {
			return false;
		}
	}
	,
	/**不使用
	clearContentInLineStyle : function (_ele){
		var tag_ary = ['p' , 'span' , 'a' , 'div' , 'img'];
		var s_ary , _s;
		var _style = '';
		for(var i = 0;i<tag_ary.length;i++){
			//s_ary = $(_ele).find(tag_ary[i]).attr('style').split(';');
			if($(_ele).find(tag_ary[i]).attr('style')){
				s_ary = $(_ele).find(tag_ary[i]).attr('style').toLowerCase().split(';');
				for(var j = 0;j<s_ary.length;j++){
					_s = s_ary[j];
					if(_s.indexOf('font-size') == -1 && _s.indexOf('line-height') == -1){
						_style += _s + ';'
					}
				}
			}
			
			$(_ele).find(tag_ary[i]).attr('style' , _style);
			if(tag_ary[i] == 'img') $(_ele).find(tag_ary[i]).attr('style' , 'width:100%;');
		}
	},*/
	/**
	於內文頁中清除多餘的格式,只保留顏色設定
	*/
	insertTableFloatFix : function (_ele){
		var tag_ary = $(_ele).find('table');
		$('<div class="clearFloat"></div>').insertAfter(tag_ary);
	}
	,
	claerContentStyle : function (jq_ary){
		var _ary = jq_ary;
		var _e , tmp , style_ary , style_str;
		for(var i = 0;i<_ary.length;i++){
			_e = _ary[i];
			if($(_e).attr('style')){
				tmp = FxReplace($(_e).attr('style').toLowerCase() , ' ' , '' , 'all');
				style_ary = tmp.split(';');
				style_str = '';
				for(var j = 0;j<style_ary.length;j++){
					tmp = style_ary[j].split(':');
					if(tmp[0] == 'color') style_str+= tmp[0] + ':' + tmp[1] + ';';//只保留顏色設定
				}
				$(_e).attr('style' , style_str);
			}
		}
	}
	,
//	isIE8 : (function(){//http://stackoverflow.com/questions/5574842/best-way-to-check-for-ie-less-than-9-in-javascript-without-library
//    	var undef , v = 3 , div = document.createElement('div') , all = div.getElementsByTagName('i');
//
//		while (
//			div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
//			all[0]
//		);
//
//		return v > 4 ? v : undef;
//
//	}()),
//	parentElement:function (currentElement , tagName){
//		var _p = currentElement;
//		tagName = tagName.toUpperCase();
//		for(var i = 0;;i++){
//			if(_p.tagName.toUpperCase() == tagName){
//				return _p;
//			} else {
//				_p = _p['parentElement'];
//			}
//			if(_p.tagName.toUpperCase() == 'HTML'){
//				//視為尋找失敗
//				return 'undefined';
//			}
//		}
//	}
//	,
//	multiLineTextEditing:function(ele , _h){
//		var run_edit;
//		var doneClass = $(ele).attr('class').split(' ')[1];
//		$(ele).removeClass(doneClass);
//		var edit = function(){
//			var text = $(ele).text().split('...').join('');
//			text = text.substring(0 , text.length - 2) + '...';
//			$(ele).text(text);
//			//console.log($(ele).height() + ' / ' + _h);
//			if($(ele).height() <= _h) {
//				$(ele).addClass(doneClass);
//				clearInterval(run_edit);
//			}
//		}
//		run_edit = setInterval(edit , 1);
//		
//	}
//	,
	findYouTubeIdByUrl : function(_url){
		var _s , _ary;
		if(_url.indexOf('?') == -1){
			return _url.substring(_url.lastIndexOf('/') + 1 , _url.length);//舊時期
		} else {
			_s = _url.substring(_url.indexOf('?') + 1 , _url.length);
			_ary = _s.split('&');
			for(var i = 0;i<_ary.length;i++){
				if(_ary[i].split('=')[0] == 'v'){
					return _ary[i].split('=')[1];
				}
			}
		}
	},
//	orientationEvent:null,
	isRwd:null,
	isMobile: FxUserAgent().isMobile,
	/*全站共用性功能*/
	Mutual: {
		init:function(){
			var theme_ary = $('section .theme');
			var wait;
			wait = setInterval(function(){
				if(FxHasAttribute($('body')[0] , 'style') == true) return;
				for(var i = 0;i<theme_ary.length;i++){
					
					DDK.Mutual.needPreloadImage(theme_ary[i]);//檢查圖檔預載
					DDK.Mutual.needAnimateValue(theme_ary[i]);//是否有文字動畫
					DDK.Mutual.needAnimatePercentageBar(theme_ary[i]);//是否有bootstrap progress bar
				}
				
				clearInterval(wait);
			},50);
			if($('section.spotScreen').length == 1) DDK.Mutual.needSpotScreen($('section.spotScreen'));//檢查主圖範圍
		}
		,
		/**
		!設定主圖區塊的範圍調整.
		>_jq jQuery Object|HTML 的選取參照.
		*/
		needSpotScreen:function(_jq){
			if($(_jq).attr('style') == undefined) return;
			
			var _url = $(_jq)[0].style.backgroundImage;
			_url = _url.substring(_url.indexOf('"') + 1 , _url.lastIndexOf('"'));
			var _img = document.createElement('IMG');
			var setSpotScreen = function(_h){
				$(_jq).removeClass('backgroundSizeing').css({'height':'inherit'});//恢復原始尺寸
				var contentHeight = $(_jq)[0].clientHeight;//取得目前的內容高度
				(contentHeight > _h) ? $(_jq).css({'height':contentHeight + 'px' , 'background-size':'cover'}) /*內容較高,以圖檔高度為縮放固定邊*/: $(_jq).css({'height':_h + 'px' , 'background-size':'contain'}) /*圖檔較高,以圖檔寬度為縮放固定邊*/;
				$(_jq).addClass('backgroundSizeing');
			}
			FxAddEventListener(_img , 'load' , function(e){
				var _t = e.currentTarget;
				setSpotScreen(_t.clientHeight);
				
				$(_jq).addClass('backgroundSizeing');
				
				FxAddEventListener(window , 'resize' , function(){
					
					setSpotScreen(_t.clientHeight);
					
				} , false);
			} , false);
			$(_img).attr('src' , _url).addClass('spotScreenImage').insertAfter(_jq);
			
		}
		,
		/**
		!設定圖檔的預載.
		>_jq jQuery Object|HTML 的選取參照.
		*/
		needPreloadImage:function(_jq){
			if($(_jq).find('.preloadImg').length == 0) return;
			var _ary = $(_jq).find('.preloadImg img');
			var parentTagName = $(_ary[0]).parent()[0].tagName;
			FxCheckMultiImgLoad({
				img_ary : _ary , 
				interval : 'load',
				update : true,
				delay : 50,
				eachEnd : function(img , success){
					$(img.parentElement).removeClass('preloadImg');
				},
				end :  function(success_ary , fail_ary){
					FxFotoCaption({
						imageList : success_ary , 
						update : true , 
						contenter : parentTagName , 
						formatter : 'shrink'
					})/*持續更新圖檔並取得FxFotoCaption 的回傳值*/
				}
			})();
		}
		,
		/**
		!設定數字動畫.
		>_jq jQuery Object|HTML 的選取參照.
		*/
		needAnimateValue:function(_jq){
			if($(_jq).find('.stackValue').length == 0)return;
			
			var s_ary = $(_jq).find('.stackValue');
			var ani_ary = [];
			//var tmp;
			//var from , to , symbol , symbolAlign;
			for(var i = 0;i<s_ary.length;i++){
				ani_ary.push(DDK.Mutual.doAnimateValue(s_ary[i]));
//				tmp = $(s_ary[i]).find('.animateValue');
//				from = Number($(tmp).attr('data-value-start'));
//				to = Number($(tmp).attr('data-value-end'));
//				symbol = $(tmp).attr('data-symbol');
//				symbolAlign = $(tmp).attr('data-symbol-aligin');
//				tmp.text((symbolAlign == 'start') ? symbol + accounting.formatNumber(from) : accounting.formatNumber(from) + symbol);
//				tmp.delay(i*500).prop('number' , from/*起始值*/).animateNumber({
//					number: to,
//					numberStep: function(now, tween) {
//						var target = $(tween.elem);
//						target.text((symbolAlign == 'start') ? symbol + accounting.formatNumber(now) : accounting.formatNumber(now) + symbol);
//					}
//				} , 700);
			}
			FxAddEventListener(window , 'scroll' , function(){
				var winHeight = $(window).height();
				for(var i = 0;i<ani_ary.length;i++){
					if(Math.abs($(ani_ary[i].wrapperTarget).offset().top - document.body.scrollTop) < winHeight && $(ani_ary[i].wrapperTarget).hasClass('valueAnimated') == false){
						$(ani_ary[i].wrapperTarget).addClass('valueAnimated');
						ani_ary[i].doAnimate();
					}
				}
			} , false);
		}
		,
		doAnimateValue:function(_jq){
			return {
				wrapperTarget:_jq,
				doAnimate:function(){
					var tmp = $(this.wrapperTarget).find('.animateValue');
					var from = Number($(tmp).attr('data-value-start'));
					var to = Number($(tmp).attr('data-value-end'));
					var symbol = $(tmp).attr('data-symbol');
					var symbolAlign = $(tmp).attr('data-symbol-aligin');
					tmp.text((symbolAlign == 'start') ? symbol + accounting.formatNumber(from) : accounting.formatNumber(from) + symbol);
					tmp.delay(500).prop('number' , from/*起始值*/).animateNumber({
						number: to,
						numberStep: function(now, tween) {
							var target = $(tween.elem);
							target.text((symbolAlign == 'start') ? symbol + accounting.formatNumber(now) : accounting.formatNumber(now) + symbol);
						}
					} , 700);
				}
			}
		}
		,
		/**
		!設定動畫進度條.
		>_jq jQuery Object|HTML 的選取參照.
		*/
		needAnimatePercentageBar:function(_jq){
			if($(_jq).find('.progress-bar.animateHorizBar').length == 0)return;
			var s_ary = $(_jq).find('.progress-bar.animateHorizBar');
			var ani_ary = [];
			//var tmp;
			//var from , to , symbol , symbolAlign;
			//<div class="progress-bar animateHorizBar" data-value-start="17" data-value-end="100" data-symbol="%" data-symbol-aligin="end"><span class="pt-1 pl-2 pb-1 pr-2 count hideItem"><!-- 由JS執行 -->&nbsp;</span></div>
			for(var i = 0;i<s_ary.length;i++){
				ani_ary.push(DDK.Mutual.doAnimatePercentageBar(s_ary[i]));
//				tmp = s_ary[i];
//				from = Number($(tmp).attr('data-value-start'));
//				to = Number($(tmp).attr('data-value-end'));
//				symbol = $(tmp).attr('data-symbol');
//				symbolAlign = $(tmp).attr('data-symbol-aligin');
//				if(from < 10){
//					$(tmp).css({'width':from + '%'}).find('.count').css({'left':0 , 'right':'auto'});
//				} else {
//					$(tmp).css({'width':from + '%'});
//				}
//				
//				$(tmp).find('.count').removeClass('hideItem').text((symbolAlign == 'start') ? symbol + from : from + symbol);
//				$(tmp).delay(1000).prop('number' , from/*起始值*/).animateNumber({
//					number: to,
//					numberStep: function(now, tween) {
//						var target = $(tween.elem).find('.count');
//						var bar = $(tween.elem);
//						bar.css({'width':now + '%'});
//						target.text((symbolAlign == 'start') ? symbol + Math.floor(now) : Math.floor(now) + symbol);
//						if(bar.width() > target.offset().left + target.width()){
//							target.removeAttr('style');
//						}
//					}
//				});
			}
			FxAddEventListener(window , 'scroll' , function(){
				var winHeight = $(window).height();
				for(var i = 0;i<ani_ary.length;i++){
					if(Math.abs($(ani_ary[i].wrapperTarget).offset().top - document.body.scrollTop) < winHeight && $(ani_ary[i].wrapperTarget).hasClass('percentageBarAnimated') == false){
						$(ani_ary[i].wrapperTarget).addClass('percentageBarAnimated');
						ani_ary[i].doAnimate();
					}
				}
			} , false);
		}
		,
		doAnimatePercentageBar:function(_jq){
			return {
				wrapperTarget:_jq,
				doAnimate:function(){
					var tmp = this.wrapperTarget;
					var from = Number($(tmp).attr('data-value-start'));
					var to = Number($(tmp).attr('data-value-end'));
					var symbol = $(tmp).attr('data-symbol');
					var symbolAlign = $(tmp).attr('data-symbol-aligin');
					if(from < 10){
						$(tmp).css({'width':from + '%'}).find('.count').css({'left':0 , 'right':'auto'});
					} else {
						$(tmp).css({'width':from + '%'});
					}
					
					$(tmp).find('.count').removeClass('hideItem').text((symbolAlign == 'start') ? symbol + from : from + symbol);
					$(tmp).delay(500).prop('number' , from/*起始值*/).animateNumber({
						number: to,
						numberStep: function(now, tween) {
							var target = $(tween.elem).find('.count');
							var bar = $(tween.elem);
							bar.css({'width':now + '%'});
							target.text((symbolAlign == 'start') ? symbol + Math.floor(now) : Math.floor(now) + symbol);
							if(bar.width() > target.offset().left + target.width()){
								target.removeAttr('style');
							}
						}
					});
				}
			};
		}
	},
	index: {/*首頁功能*/},	
	
};
DDK.active();