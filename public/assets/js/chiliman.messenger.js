function ChilimanMessenger(){
	/*
	201907 擴充接線生除了文字訊息也可發出單張圖檔作為訊息.
	*/
return function(){
	var dataToConfig = arguments[0];
	var ClientPolicy = {
		image:2/*訊息中的圖檔對應方案:0[尚未購買],1[已購買1次直接下載權限],2[已購買無限次直接瀏覽權限]*/,
		audio:5/*訊息中的圖檔對應方案:0[尚未購買],1[已購買1次直接下載權限],2[已購買單一檔案3次直接瀏覽權限],3[已購買單一檔案5次直接瀏覽權限],4[已購買單一檔案10次直接瀏覽權限],5[已購買單一檔案無限次直接瀏覽權限-直到訊息被系統移除]*/,
		video:5/*訊息中的圖檔對應方案:0[尚未購買],1[已購買1次直接下載權限],2[已購買單一檔案3次直接瀏覽權限],3[已購買單一檔案5次直接瀏覽權限],4[已購買單一檔案10次直接瀏覽權限],5[已購買單一檔案無限次直接瀏覽權限-直到訊息被系統移除]*/,
		copyGuestText:0/*訊息中的使用者端複製文字內容方案:0[不允許複製],1[允許複製]*/,
		copyOperatorText:/*訊息中的接線生端複製文字內容方案:0[不允許複製],1[允許複製]*/0
	};
	/**
	!firebase API連接函數集.
	*/
	var FireBase = {
		/**
		!靜態常數集.
		*/
		ConstantStatic:{
			/*DATABASE_URL:'https://chiliman-be0a4.firebaseio.com/',*/
			VALUE:'value',
			CHILD_ADDED:'child_added',
			POST_IDENTIFY_TYPE:'operator'/*發送通訊資料時的身分*/
		}
		,
		/**
		!動態變數集.
		*/
		VarableDynamic:{
			initializeFireAppsArray:null,
			accessToken:null,
			apiKey:null,
			userId:null,
			cid:null,
			operatorId:null,
			operatorsRefPath:null,
			chatsRefPath:null,
			operatorDisplayName:null,
			dataConnectionPort:null,
			operqatorRouterApi:null/*接線生發送圖檔或更多功能的Server Side 端程式*/
		}
		,
		/**
		!物件重設.
		*/
		reCall:function(){
			FireBase.VarableDynamic.initializeFireAppsArray = null
		}
		,
		/**
		!被動式建構子.
		*/
		init:function(){
			this.VarableDynamic.initializeFireAppsArray = [];
			if(arguments.length == 0) return false;
			if(!arguments[0].accessToken) return false;
			if(!arguments[0].apiKey) return false;
			if(!arguments[0].cid) return false;
			if(!arguments[0].userId) return false;
			if(!arguments[0].operatorId) return false;
			if(!arguments[0].operatorDisplayName) return false;
			if(!arguments[0].operatorsPath) return false;
			if(!arguments[0].chatsPath) return false;
			if(!arguments[0].dataPort) return false;
			if(!arguments[0].operqatorHelperApi) return false;
			this.VarableDynamic.accessToken = arguments[0].accessToken;
			this.VarableDynamic.apiKey = arguments[0].apiKey;
			this.VarableDynamic.userId = arguments[0].userId;
			this.VarableDynamic.cid = arguments[0].cid;
			this.VarableDynamic.operatorId = arguments[0].operatorId;
			this.VarableDynamic.operatorsRefPath = arguments[0].operatorsPath;
			this.VarableDynamic.chatsRefPath = arguments[0].chatsPath;
			this.VarableDynamic.operatorDisplayName = arguments[0].operatorDisplayName;
			this.VarableDynamic.dataConnectionPort = arguments[0].dataPort;
			this.VarableDynamic.operqatorRouterApi = arguments[0].operqatorHelperApi;
			return true;
		}
		,
		/**
		!文字訊息腳本.
		*/
		textScripts:{
			WITHOUT_CALL_UP_SETTING:'firebase 初始化參數遺失,程式啟動失敗,請檢查您的網路狀態.',
			CORE_FUNCTION_FAILURE:'firebase API 載入失敗,請檢查您的網路狀態.'
		}
		,
		/**
		!產生新的firebas 實體.
		>_config|Object 設定檔.
		@回傳 Object|新的firebase 參照.
		*/
		newApp:function(_config){
			if(firebase){
				var tmp = this.VarableDynamic.initializeFireAppsArray.length;
				this.VarableDynamic.initializeFireAppsArray.push({
					id:tmp,
					active:function(){
						return firebase.initializeApp(_config);//firebase.initializeApp 來自firebase API 的函數
					}
				});
				return this.VarableDynamic.initializeFireAppsArray[tmp].active();
				
			} else {
				alert(FireBase.textScripts.CORE_FUNCTION_FAILURE);
			}
		}
		,
		/**
		!網路傳送函數集.
		*/
		NetBridge:{
			/**
			!送出(對firebase)接線生的回話內容.
			>_client_id String|發話對像的id(從JSON 來的CLIENT_ID).
			>_text String|發話內容.
			*/
			operatorPostData:function(_client_id , _text){
				var timestamp = new Date();
				var postData = {
					CLIENT_ID:_client_id,
					C_ID:FireBase.VarableDynamic.cid,
					OPERATOR_ID:FireBase.VarableDynamic.operatorId,
					DISPLAYNAME: FireBase.VarableDynamic.operatorDisplayName,
					TYPE:FireBase.ConstantStatic.POST_IDENTIFY_TYPE,//固定由客服人員發送
					TIME:timestamp.getTime(),
					message: {//空白的資料可以直接略過，減少傳輸成本
						//            id: "",
						type: 'text',
						text: _text
						//            fileName: "",
						//            fileSize: 0,
						//            packageId: "",
						//            stickerId: ""
					}
				};
				if(System.ConstantStatic.ALLOW_CONSOLE == true)console.log('接線生送出對話內容:' + JSON.stringify(postData));
				ChatsGroupRef.push(postData);//因為同時可能會開好幾個對話視窗，所以每次發完訊息就要更新正在跟誰對話
				OperatorRef.update({
				  onlineState: true,
				  chatWith:_client_id,
				  chatC_ID:FireBase.VarableDynamic.cid,
				  status: "I'm online."
				});//更新接線生的狀態
			}
			,
			/**
			!送出(對Server Side 程式)接線生選擇的圖檔.
			*/
			operatorPostImageFile:function(_client_id , _fileInput){
				var timestamp = new Date();
				var _form = new FormData();
				_form.append('CLIENT_ID', _client_id);
				_form.append('C_ID', FireBase.VarableDynamic.cid);
				_form.append('OPERATOR_ID', FireBase.VarableDynamic.operatorId);
				_form.append('DISPLAYNAME', FireBase.VarableDynamic.operatorDisplayName);
				_form.append('TYPE', FireBase.ConstantStatic.POST_IDENTIFY_TYPE);
				_form.append('TIME', timestamp.getTime());
				_form.append('ImageFile', _fileInput);
				var props = {
					url: FireBase.VarableDynamic.operqatorRouterApi,
					processData: false,
					contentType: false,
					method: 'POST',
					data: _form,
					complete: function( jqXHR, status){
						var callback = Number(jqXHR.responseText);
						if(callback != 0){
							Task.openConfirmModal(
								Task.textScripts.IMAGE_UPLOAD_FAILURE[0] 
								, 
								'<p>' + Task.textScripts.IMAGE_UPLOAD_FAILURE[1] + 
								'<br>' + Task.textScripts.IMAGE_UPLOAD_FAILURE[2] + jqXHR.status + 
								'</p>'
								,
								function(){/*只用確定按鈕*/}
							);
						}
					},
					error:function(jqXHR, status, error){
						
					}
				};
				$.ajax(props);
			}
		}
		
	};
	/**
	!加密用物件(http://122.116.104.164/~mobileskins/HTML-TRY/derangma/derangma.html).
	*/
	var DerAngma = {folk:function(r){return r.replace(/</g,"&lt;").replace(/>/g,"&gt;")},unfolk:function(r){return r.replace(/&lt;/g,"<").replace(/&gt;/g,">")},road:function(){var r,t,a={map:function(){var r=[["Q","E]SsgP>U-rB&{o(Q3m4;[F!JI_)<vc1*kT@8\"lAb7hu/i~zGMq5XLZ%x.KNj9R6$VytHpWYn0Dd:=|,af2ewO^}C+`#?'\\"],["A","McXWzqK0/b@4g[i5{B?P7=-<fjD(!|JxmVvoFh%yd#a$wR`}T~l&)_Nes1^,Q+pr.\"GZ29CYI>;ktES*UOH:6unL8A]3'\\"],["Z","kZ}Hl{O-SB/\"u@dXM$q!js#;,8cA`=QibW:z|nT)9EDf%JCe*wN]a3K[t4>I?Fg<7pG_6+5r&~oPvU(x.y01YVhLR^2m'\\"],["W","fjM*Di}={I8VHe3q+mKGZ)Y-gAp@~E\"L;ds1<Ou[]on`Ja4l/(7?%k!N^09R#|&,SWyzFQP:TCrw26U$h_>5bt.XcBxv'\\"],["S","P){*@/mgM>QVA,-7vxbLK[~n0cYr!4OkJ|_N^`s:H=RCo$jZF?%Xe;+(W&29Eltpa831Du6dU<fh]qTI}#ziywS\".5GB'\\"],["X","uZ~}E4wM<&Ibk#;:\"XR8mKLzsn=i_PDQ?f(A.v2B!j)Cghc%+y/Fa1^{@o69,5OqpxHU$J]T`-0rt|Y*WVN>7dSe3lG['\\"],["E","{$+#B.@UpdEYl9|,wRr(?cmzgvs4_G]^LZ%S1aXj[y3=JkHAIWtoQ/)xbM60fPDqheFn7C\"`Tu;<K}!N8O5V&:-i*~2>'\\"],["D","UjfruV}ehsK\"_:p#Ft2Cq]!+v*%D$6ZNdX~bl;<`zO/[H,7EaMQ8SI?Pox^01-TG)Bm34=y|wW>@.Jn&AkcLig(9R{Y5'\\"],["C","QFWrVHKGb6!:;Xw=x%#LJ0fh?2&[/_Yi$MSjR3+dao{l)E`,AIg~Z@9-<]B|T781D^CP\"uemyU5}pkO.tqN*n4csvz>('\\"],["R","\":ZRx]NQ!.@bJo(/|`e20#-TOY{7t%mAsH?>M}rSXk;B4^yC)Fj1fqVn9id<5g3+c_wpl8z=~IK[$,E6GvL&aWUh*DPu'\\"],["F","URd6mk-!_0s1}&j^2xq9H\"h`8fevFygYX#i;()LP?%SbQBc.uT[w{>4|:O*/tZVJ,zMKpD5l~o+G@WnC]=IAN7$Ea3<r'\\"],["V","'\\}ey9aYg-A;!=c28BZt6?{INEbPz`x+D7F_d(i@nR)3J*osmu$0hKS]<.&\"H,OVq/G4T%:Qlw|C#[1jMrkf>LpX5W~U^v"],["T","'\\l[Qb=yKg|w_Iz6YJ>W5,OhPt3s:*ND^e4V.v2]&%<-#Zn0!@p\"FM/S8cC{dXBH+i9L?)R$uEA~mU(Gao;}`qT7k1jxrf"],["G","'\\q`COFi4E8NvH9cT;X%GM&r=^~bfw-R>IQzp#(,\"e$/mJ7ZhLKkxgd!]:.B[1A)WVl@uy{DY<P5a+S?j_0|}nUo32st*6"],["B","'\\I=|GE:<h?8k/4V#m-q&D}WYNUZR~p1`jC%v[uiQAa($+6tf!x_.Mc;9^TBPrKHsbw0Sodln@ye)J3{g*5]O\"7X2FL,>z"],["Y","'\\wPu<Ib98^dl!|,`%r/gJo7RGh-1=K]q*yFWM?AnO6$)f>}aYV+.H_c[N#e3&;pZ5Sm:4s0xD2{LT(E~UkjiCQtBX\"zv@"],["H","'\\m0%zpwBUNfIoa&|*1#KDZrQl@~S}W4F_d+5;hXv7yC=qcL\"[t^J-/bYs6H$P:RkAOM!{e`j(iV)98uE2Tn>,G3x<.g]?"],["N","'\\P\"RLm}B&@D75g?4wT-cCMU8Oyhrd2^`#FQuN*,iVvX6xK;f:[z!$n_Ys/](kHb~e+{.lAJ>IpZq<SG0oEta%3W1)j|9="],["U","'\\]zK{FXWDjmEHOV&P+/0toSnvac~xhT_8%dr7M$^:l?5N3|fZ2-!pyu#Ag,be(wYqs\"}GB<IU`6@*4R[QC1.)LJ>i;=k9"],["J","'\\D9~/W3;Z1$:5sn+0eYUfpO*lQRK!xSuB@a#[|tC}7bqE8zP)c=A]`V%TNwrH?GL.{d(F_m->yo<^gX\"jI2J6v&4,hkMi"],["M","SUp!c2M(E#x<789?@G+Yt5B0K%$-Ai'\\vH_j13mkeINq*6Fw|]lC;nofa)ZW>VyzrL\"[u~gX/:}Td,&.bQD4h`{s^RO=PJ"],["I","[&e8WbygY(J_Ra\"?GLX6]nfZDSh;O:1^TrKNmiA=/)%<{I|~,'\\p+#zt-5x}sF*7C4.3k9$BMQdo!Puwj2VlvE0q`>HcU@"],["K","*,=6nur^1Bp&[QIDea~MFH(hOfx3{PGz$%t/N`4mW->qA;lg\"!Vy<i+@YC.|Tjw#RK5L'\\dE?k}oSscb08:vX]UZ2)J79_"],["O","*J/$>m-!T_FBChv16Z@`S^&oIt0+G9aR\"#z|r7PfqU;[,D2OX{Qcy(5.gn34L~N}H?=AVks:jb%w)Mu]W<pYxde'\\liEK8"],["L","F+1)Td5{/l,SNH^M7niOK:0_p-uG;BL<]a.&WR8I|kshzq@[YC6$?D32AEx*cvweyXgb(=Z%4toU#!rfP>`J9VQ\"~}'\\jm"],["P","[p{cs2bnBkJfZ,|<QLX(5Ch>DV6^'\\?m~St:zlMPx$T8!dW_uHi4}%I#Erg&=weA;`o9a10-N+F\"7GOq)]*@.jYK3/RvUy"]];if(0==arguments.length)return r[Math.ceil(Math.random()*r.length)-1];for(var t=0;t<r.length;t++)if(arguments[0].toUpperCase()==r[t][0])return r[t]},ready:function(){return[Math.round(360*Math.random()),Math.round(12*Math.random())+4]},FOCUSLIGHT:function(){var r="ABCDEFGHIJKLMNOPQRSTUVWXYZ";if(1==arguments.length){for(var t,n=u=c=d="",e=arguments[0],h="0123456789",o="",f=0,l=0;l<e.length;l++)h.indexOf(e.charAt(l))>-1&&(o+=e.charAt(l),f+=1),1==f&&(n+=e.charAt(l+1).toUpperCase()),2==f&&(u+=e.charAt(l+1).toUpperCase()),3==f&&(d+=e.charAt(l+1).toUpperCase());f=0;for(l=e.length-1;l>-1;l--)if(h.indexOf(e.charAt(l))>-1&&(f+=1),2==f){c+=e.charAt(l+1).toUpperCase();break}n=n.charAt(0),u=u.charAt(0),d=d.charAt(0),c=c.charAt(0)}else if(5==arguments.length){n=arguments[0];var i,g,s,u=arguments[1],c=arguments[2],d=arguments[3],M=arguments[4];o=""}if((i=[]).push(r.substring(0,13)),i.push(r.substring(13,r.length)),1==arguments.length?(i[1].indexOf(c)>-1?c=i[1].indexOf(c)+4:i[0].indexOf(c)>-1&&(c=i[0].indexOf(c)+4),i[0].indexOf(d)>-1?d="dual":i[1].indexOf(d)>-1&&(d="easy")):5==arguments.length&&(c=Math.floor(100*Math.random())<50?i[1].charAt(c-4):i[0].charAt(c-4),"easy"==d?d=i[1].charAt(Math.floor(Math.random()*i[1].length)):"dual"==d&&(d=i[0].charAt(Math.floor(Math.random()*i[0].length))),Math.floor(100*Math.random())<50&&(c=c.toLowerCase(),d=d.toLowerCase())),(i=[]).push(r.substring(0,9)),i.push(r.substring(9,14)),i.push(r.substring(14,22)),i.push(r.substring(22,r.length)),1==arguments.length){for(l=0;l<i.length;l++)if(i[l].indexOf(u)>-1){u=l+1;break}return t=a.map(n),[u,c,d,n,a.map(n)[1],o]}if(5==arguments.length){u=i[u-1].charAt(Math.floor(Math.random()*i[u-1].length)),Math.floor(100*Math.random())<50&&(u=u.toLowerCase()),Math.floor(100*Math.random())<50&&(n=n.toLowerCase()),t=a.map()[1].replace(/[0-9]/g,"");for(l=0;l<M.length;l++)g=Math.floor(Math.random()*t.length),s=Math.floor(4*Math.random())+3,0==l?o+=M.charAt(l)+n+t.substring(g,g+s)+"|":1==l?o+=M.charAt(l)+u+t.substring(g,g+s)+"|":2==l?o+=M.charAt(l)+d+t.substring(g,g+s)+"|":l==M.length-2?o+=M.charAt(l)+c+t.substring(g,g+s)+"|":(o+=M.charAt(l)+"|",l!=M.length-1&&(o+=t.substring(g,g+s)));return o}},SSL:function(r,t,a,n,e){return 1==r?function(){for(var r,h="",o=0;o<a;o++){r=n[o];for(var f=0;f<t;f++)h+=r.charAt(f)}if("easy"==e)return h}:2==r?function(){for(var r="",h=t-1,o=0;o<t;o++){for(var f=0;f<a;f++)r+=n[f].charAt(h);h-=1}if("easy"==e)return r}:3==r?function(){for(var r,h="",o=a-1;o>-1;o--){r=n[o];for(var f=t-1;f>-1;f--)h+=r.charAt(f)}if("easy"==e)return h}:4==r?function(){for(var r=0,h="",o=t-1;o>-1;o--){for(var f=a-1;f>-1;f--)h+=n[f].charAt(r);r+=1}if("easy"==e)return h}:void 0},addZero:function(r,t){for(r=String(r),t=String(t);t.length<r.length;)t="0"+t;return t}},n="",e="",h="";if(1==arguments.length)var o=(u=a.FOCUSLIGHT(arguments[0]))[0],f=u[1],l=u[2],i=u[3],g=u[4],s=(e=u[5],"thisisnot");else if(2==arguments.length){var u,c,d,M=a.ready(),A=(o=M[0],f=M[1],arguments[1]),p=a.map();l="dual",s="thisisnot";A.length<4&&((u=Math.floor(100*Math.random()))<50?A=s+A:A+=s),u=Math.floor(100*Math.random()),l="easy",0==(o=Math.ceil(o/90))&&(o=1),i=p[0],g=p[1]}for(var m=0;m<g.length%f;m++)g+=" ";c=0,d=[];for(m=0;m<g.length/f;m++)d.push(g.substring(c,f*(m+1))),c+=f;if(r=d[0].length,t=d.length,u=a.SSL(1,r,t,d,l),1==arguments.length){if("easy"==l){n=u(),h="",c=0;var v=String(n.length).length;for(m=0;m<e.length/v;m++)h+=n.charAt(Number(e.substring(c,v*(m+1)))),c+=v;h.indexOf(s)>-1&&(h=h.replace(s,""))}}else if(2==arguments.length&&"easy"==l){n=u();for(m=0;m<A.length;m++)e+=a.addZero(n.length,n.indexOf(A.charAt(m)));h=a.FOCUSLIGHT(i,o,f,l,e)}return h}};
	/**
	!介面共用函數集.
	*/
	var System = {
		/**
		!靜態常數集.
		*/
		ConstantStatic:{
			INSTALL_JS_FUSE_HTML_JS:'js-scode-fuse-html-min-js',
			ALLOW_CONSOLE:false
		}
		,
		/**
		!動態變數集.
		*/
		VarableDynamic:{/*動態變數集*/
			lastOnlineTimestamp:null,
			activeService:null,
			isMobile:new MobileDetect(window.navigator.userAgent)
		}
		,
		/**
		!物件重設.
		*/
		reCall:function(){
			System.VarableDynamic.lastOnlineTimestamp = Date.parse(new Date());
			System.VarableDynamic.activeService = [];
		}
		,
		/**
		!被動式建構子.
		*/
		init:function(){
			this.reCall();
			this.Event.init();
			this.UI.init();
			this.DeviceSaves.init();
			if(System.VarableDynamic.isMobile.mobile() != null){
				$('body').addClass('is-mobile');
			}
		}
		,
		/**
		!文字訊息腳本.
		*/
		textScripts:{
			BUBBLE_LENGTH_CHANGE_INTERVAL_HAD_CALL:'已喚起檢查對話框數量變更監控函數,不需重複喚起.',
			LAZY_LOAD_UPDATE_INTERVAL_HAD_CALL:'已喚起檢查延遲圖檔載入監控函數,不需重複喚起.'
		}
		,
		/**
		!工具函數集.
		*/
		Utility:{
			/**
			!比對某個屬性的值,是否有出現在陣列中.
			>_pool Array|資料來源陣列.
			>_propPath String|陣列內的元素的屬性名稱或以點連接的路徑.
			>_propValue Array,Number,Object,String...|要比對的值(任何型別).
			@回傳 Number|如果有吻合的回傳陣列的索引值,若沒有回傳-1.
			*/
			isValueInArray:function(_pool , _propPath , _propValue){
				for(var i = 0;i<_pool.length;i++){
					if(_pool[i][_propPath] == _propValue) return i;
				}
				return -1;
			}
			,
			/**
			!於執行階段新增程式碼進入網頁內,插入到指定的位置後,會以最後一個元素的方式呈現.
			>_type String|程式碼種類,只有'JS'與'CSS'.
			>_code String|程式碼.
			>_appendPlace String|選取項,要插入哪個標籤內.
			>_tagProps Object|選擇性,更多要附加在程式碼容器標籤上的屬性內容.
			*/
			installSourceCode:function(_type , _code , _appendPlace , _tagProps){
				var e;
				if(_type == 'JS'){
					e = document.createElement('SCRIPT');
					//language="javascript" type="text/javascript"
					$(e).attr('language' , 'javascript').attr('type' , 'text/javascript').html(_code);
				} else if(_type == 'CSS'){
					e = document.createElement('LINK');
					//type="text/css" rel="stylesheet"
					$(e).attr('rel' , 'stylesheet').attr('type' , 'text/css').html('<!--' + '\n' + _code + '\n' + '-->');
				}
				if(arguments.length == 4){
					for(var i in _tagProps){
						$(e).attr(i , _tagProps[i]);
					}
				}
				$(_appendPlace).append(e);
			}
		}
		,
		/**
		!視覺層級管理物件.
		*/
		UI:{
			/**
			!靜態常數集.
			*/
			ConstantStatic:{
				CHAT_TOOL_BAR_DOT_NAME:'.toolbar',
				CHAT_MESSEGE_DOT_NAME:'.chat-messages',
				CHAT_SPEAK_BAR_DOT_NAME:'.chat-footer',
				CHAT_SPEAK_PREVIEW_MESSEGE_DOT_NAME:'.preview-messages',
				CHAT_TOOL_BAR_DOT_NAME:'.toolbar',
				CHAT_TOOL_BAR_ICON_DOT_NAME:'.avatar-wrapper',
				CHAT_TOOL_BAR_GUEST_DOT_NAME:'.chat-contact-name',
				CHAT_ASIDE_AREA_DOT_NAME:'.left-sidebar',
				CHAT_USER_LIST_DOT_NAME:'.chat-list',
				CHAT_USER_LIST_TOP_ICON_DOT_NAME:'.avatar-wrapper',
				CHAT_SEARCH_INPUT_NAME:'queryUser',
				CHAT_CONTENTER_DOT_NAME:'.chat-messages',
				UI_AUTOCOMPLETE_DOT_NAME:'.ui-autocomplete',
				UI_AUTOCOMPLETE_EXTEND_CLASS:'SuspensionTextField_Extends',
				START_VIEW_HASH_ID:'#start-view',
				START_VIEW_ROLLER_DOT_NAME:'.splashRolling',
				CHAT_VIEW_HASH_ID:'#chat-view',
				DATA_CHILD_NODE_LENGTH_ATTR_NAME:'data-child-node-length'
			}
			,
			/**
			!動態變數集.
			*/
			VarableDynamic:{
				chatFooterWrapper:null,
				poolNodeLengthInterval:null,
				queryUserForm:null,
				poolArray:[],
				speakBarArray:[],
				lazyLoadTriggerInterval:null
			}
			,
			/**
			!物件重設.
			*/
			reCall:function(){
				System.UI.VarableDynamic.chatFooterWrapper = $('body ' + System.UI.ConstantStatic.CHAT_FOOTER_DOT_NAME)[0];
				System.UI.VarableDynamic.poolArray = [];
				System.UI.VarableDynamic.speakBarArray = [];
				System.UI.VarableDynamic.queryUserForm = null;
				if(System.UI.VarableDynamic.poolNodeLengthInterval != null){
					clearInterval(System.UI.VarableDynamic.poolNodeLengthInterval);
					System.UI.VarableDynamic.poolNodeLengthInterval = null;
				}
				if(System.UI.VarableDynamic.lazyLoadTriggerInterval != null){
					clearInterval(System.UI.VarableDynamic.lazyLoadTriggerInterval);
					System.UI.VarableDynamic.lazyLoadTriggerInterval = null;
				}
			}
			,
			/**
			!被動式建構子.
			*/
			init:function(){
				this.reCall();
				
			}
			,
			/**
			!以HTML 的id 屬性尋求<script language="javascript" type="text/template">內的字串.
			>html_id String|HTML id 字串.
			@回傳 String|吻合id 名稱的<script language="javascript" type="text/template"> 的HTML 內容.
			*/
			getTemplate:function(html_id){
				return document.getElementById(html_id).innerHTML;
			}
			,
			/**
			!將HTML 原始碼內容轉換為HTML Element 物件(有限制).
			>_scode String|HTML 的靜態原始碼.
			@回傳 jQuery Object|透過jQuery 選取的子物件總何.
			*/
			convertScodeToDOM:function(_scode){
				var e = document.createElement('BODY');
				$(e).html(_scode);
				return $(e).children();
			}
			,
			/**
			!將通訊池捲動到最底部.
			>_pool HTML DOM|通訊池.
			>_lastNode HTML DOM|通訊池內最後的一個訊息.
			*/
			scrollPoolToEnd:function(_pool , _lastNode){
				if(Boolean(Number($(_pool).attr('data-allow-update-scroll'))) == false) return
				$(_pool).scrollTop($(_pool).scrollTop() + $(_lastNode).offset().top + $(_lastNode).height());//每個通訊池捲動到最末端
				
			}
			,
			/**
			!產生單一使用者的通訊池(空的).
			>_altName String|使用者的別名字串.
			>_scode String|HTML 的靜態原始碼.
			@回傳 HTML DOM|單一使用者的通訊池的HTML DOM Element 物件.
			*/
			createChatPool:function(_altName , _scode){
				var e = System.UI.convertScodeToDOM(System.UI.getTemplate(_scode));
				$(e).addClass('off').find('input[name="userName"]').val(_altName);
				return e;
			}
			,
			/**
			!產生單一使用者的通訊功能列(空的).
			>_altName String|使用者的別名字串.
			>_scode String|HTML 的靜態原始碼.
			@回傳 HTML DOM|單一使用者的通訊功能列的HTML DOM Element 物件.
			*/
			createSpeakBar:function(_altName , _scode){
				var e = System.UI.convertScodeToDOM(System.UI.getTemplate(_scode));
				$(e).addClass('off').find('input[name="userName"]').val(_altName);
				return e;
			}
			,
			/**
			!產生通訊清單內,單一使用者的姓名標籤.
			>_altName String|使用者的別名字串.
			>_scode String|HTML 的靜態原始碼.
			@回傳 HTML DOM|用於加入到通訊清單,單一使用者的姓名標籤HTML DOM Element 物件.
			*/
			createListItem:function(_altName , _scode){
				var e = System.UI.convertScodeToDOM(System.UI.getTemplate(_scode));
				$(e).find('input[name="userName"]').val(_altName);
				return e;
			}
			,
			/**
			!產生單一使用者,用作複製樣本的通訊對話框(空的).
			>_altName String|使用者的別名字串.
			>_scode String|HTML 的靜態原始碼.
			@回傳 HTML DOM|單一使用者的通訊對話框的HTML DOM Element 物件.
			*/
			createCloneBubble:function(_altName , _scode){
				var e = System.UI.convertScodeToDOM(System.UI.getTemplate(_scode));
				$(e).find('input[name="userName"]').val(_altName);
				return e;
			}
			,
			/**
			!將單一使用者用作複製樣本的通訊對話框內置入對應的資訊.
			>_index Number|通訊對話框位於對話歷史記錄中的索引值.
			>_name String|使用者的別名字串.
			>_dom HTML DOM|通訊對話框物件.
			>_characterType String|通訊對話框的身份,目前只有"user"或"operator".
			>_time Number|該則通訊的通訊時間UTC 毫秒數.
			@回傳 HTML DOM|單一使用者的通訊對話框的HTML DOM Element 物件.
			*/
			createContentBubble:function(_index , _altName , _dom , _characterType , _time){
				var dateTime = new Date();
				dateTime.setTime(_time);
				var tmp = 
				(dateTime.getMonth() + 1) + '/' + 
				dateTime.getDate() + '/' + 
				dateTime.getFullYear() + ', ' + 
				dateTime.getHours() + ':' + 
				dateTime.getMinutes() + ':' + 
				dateTime.getSeconds();
				if(dateTime.getHours() > 11){
					tmp += ' PM';
				} else {
					tmp += ' AM';
				}
				if(_characterType == 'user'){
					$(_dom).find('input[name="userName"]').val(_altName);
				} else if(_characterType == 'operator'){
					$(_dom).find('input[name="operatorName"]').val(_altName);
				}
				$(_dom).find('input[name="index"]').val(_index);
				$(_dom).find('.time').text(tmp);
				
				return _dom;
			}
			,
			/**
			!將通訊對話框插入到對應使用者的通訊池內.
			>_pool HTML DOM|通訊池的參照.
			>_bubble HTML DOM|通訊對話框的參照.
			*/
			insertBubbleToChatPool:function(_pool , _bubble){
				$(_pool).find(System.UI.ConstantStatic.CHAT_MESSEGE_DOT_NAME).append(_bubble);
				
			}
			,
			/**
			!插入當通訊池上捲時有新通訊傳來的提示文字.
			>_bar HTML Object|發話通訊模組的參照.
			>_prop Object|{messegeTime Number|UTC 時間 , previewContent String|預覽的提示文字}
			*/
			insertSpeakBarPreviewMessege:function(_bar , _prop){
				var tmp = new Date(_prop.messegeTime);
				var _preBox = $(_bar).find(System.UI.ConstantStatic.CHAT_SPEAK_PREVIEW_MESSEGE_DOT_NAME);
				$(_preBox).children().text(
					'[' + tmp.getHours() + ':' + tmp.getMinutes() + ':' + tmp.getSeconds() + '] ' + _prop.previewContent
				);
				if(Boolean(Number($(_preBox).attr('data-allow-appear'))) == true && $(_preBox).hasClass('off') == true){
					$(_preBox).removeClass('off').addClass('open');
				}
			}
			,
			/**
			!將某個使用者的通訊池,插入到網頁內的通訊池父系物件內.
			>_pool HTML DOM|通訊池的參照.
			@回傳 HTML DOM|該通訊池在通訊池父系物件內的參照.
			*/
			insertChatPoolToView:function(_pool){
				var insertReference = $(System.UI.ConstantStatic.CHAT_VIEW_HASH_ID).find(System.UI.ConstantStatic.CHAT_TOOL_BAR_DOT_NAME);
				$(_pool).insertAfter(insertReference);
				System.Event.addEventListener(_pool[0] , System.EventTypes.ConstantStatic.CHILD_NODE_LENGTH_CHANGE , System.EventHandler.chatPoolNodeLengthChange , false);//監聽通訊池內的通訊框數量有變更
				System.Event.addEventListener(_pool[0] , System.EventTypes.ConstantStatic.SCROLL , System.EventHandler.checkPoolScrollPosition , false);//監聽通訊池內是否有被捲離最底部
				System.UI.VarableDynamic.poolArray.push(_pool[0]);
				return _pool[0];
			}
			,
			/**
			!將某個使用者的使用者的通訊功能列,插入到網頁內的使用者的通訊功能列父系物件內.
			>_bar HTML DOM|使用者的通訊功能列的參照.
			@回傳 HTML DOM|該使用者的通訊功能列在使用者的通訊功能列父系物件內的參照.
			*/
			insertSpeakBarToView:function(_bar){
				$(System.UI.ConstantStatic.CHAT_SPEAK_BAR_DOT_NAME).append(_bar);
				System.Event.addEventListener(_bar[0] , System.EventTypes.ConstantStatic.APPEAR_PREVIEW_MESSEGE , System.EventHandler.speakBarShowPreviewMessege , false);//監聽通訊池內是否有被捲離最底部
				System.UI.VarableDynamic.speakBarArray.push(_bar[0]);
				return _bar[0];
			}
			,
			/**
			!將某個使用者的姓名標籤,插入到網頁內的使用者的通訊清單父系物件內.
			>_list HTML DOM|使用者的姓名標籤的參照.
			>_listDivider HTML DOM|使用者的姓名標籤下方的分隔線的參照.
			>_insertPosition Number|[選擇性]0~n,標籤插入在數字所代表位置之後,若該數字無法使用,依舊插入到最末端.
			@回傳 HTML DOM|該使用者的姓名標籤在使用者的通訊清單父系物件內的參照.
			*/
			insertListItemToView:function(_list , _listDivider , _insertPosition){
				if(arguments.length == 2){
					$(System.UI.ConstantStatic.CHAT_ASIDE_AREA_DOT_NAME).find(System.UI.ConstantStatic.CHAT_USER_LIST_DOT_NAME).append(
						_list , 
						_listDivider
					);
					
				} else if(arguments.length == 3){
					var node = $(System.UI.ConstantStatic.CHAT_ASIDE_AREA_DOT_NAME).find(System.UI.ConstantStatic.CHAT_USER_LIST_DOT_NAME).children().eq(_insertPosition);
					if(node.length == 0){//插入位置無效
						$(System.UI.ConstantStatic.CHAT_ASIDE_AREA_DOT_NAME).find(System.UI.ConstantStatic.CHAT_USER_LIST_DOT_NAME).append(
							_list , 
							_listDivider
						);
					} else {
						$(_list).insertAfter(node);
						$(_listDivider).insertAfter(_list);
					}
				}
				return _list;
			}
			,
			/**
			!開啟或關閉啟動畫面.
			>_cmd Boolean|true 關閉,false 開啟.
			*/
			splashScreenOff:function(_cmd){
				if(_cmd == true){
					$(System.UI.ConstantStatic.START_VIEW_HASH_ID).removeClass('open').removeClass('d-flex').addClass('off').addClass('d-none');
				} else {
					$(System.UI.ConstantStatic.START_VIEW_HASH_ID).removeClass('off').removeClass('d-none').addClass('open').addClass('d-flex');
					$(System.UI.ConstantStatic.START_VIEW_HASH_ID + ' ' + System.UI.ConstantStatic.START_VIEW_ROLLER_DOT_NAME).removeClass('set').removeClass('rotate-center');
				}
			}
			,
			/**
			!開啟或關閉通訊池的父系物件.
			>_cmd Boolean|true 關閉,false 開啟.
			*/
			chatScreenOff:function(_cmd){
				if(_cmd == true){
					$(System.UI.ConstantStatic.CHAT_VIEW_HASH_ID).removeClass('open').removeClass('d-flex').addClass('off').addClass('d-none');
				} else {
					$(System.UI.ConstantStatic.CHAT_VIEW_HASH_ID).removeClass('off').removeClass('d-none').addClass('open').addClass('d-flex');
				}
			}
			,
			/**
			!切換暫停通訊池中可能播放中的影片或音訊.
			>_otherDoms Array|要關閉影片或音訊的通訊池清單.
			*/
			pauseMediasInPool:function(_otherDoms){
				$(_otherDoms).find('video , audio').each(function(){
					this.pause();
				});
			}
			,
			/**
			!切換通訊池.
			>_dom HTML DOM|要出現的通訊池.
			>_otherDoms Array|要關閉的通訊池清單.
			*/
			switchGuestPool:function(_dom , _otherDoms){
				$(_dom).removeClass('off').addClass('open');
				$(_otherDoms).removeClass('open').addClass('off');
				//
			}
			,
			/**
			!更新通訊池中需要註冊lazyLoad 事件的圖檔.
			>_dom HTML DOM|要出現的通訊池.
			>_otherDoms Array|要關閉的通訊池清單.
			*/
			updateLazyLoadImage:function(_dom , _otherDoms){
				//1.對要顯示的通訊池內,需要lazyLoad 且還沒實際載入影像的圖檔註冊lazyLoad監聽事件
				//2.對於設定不顯示的通訊池,將其內原本有註冊lazyLoad 但還沒觸發過事件的圖檔的lazyLoad 事件移除
				var _img , tmp , tmpEventId;
				var _lazyLoad = System.EventTypes.ConstantStatic.LAZY_LOAD;
				var _load = System.EventTypes.ConstantStatic.LOAD;
				var _eventProp;
				var _ary = $(_dom).find('img[data-lazy="0"]');//1.先撈要顯示的通訊池中需要lazyLoad 的圖檔
				for(var i = 0;i<_ary.length;i++){
					_img = _ary[i];
					//data-lazy
					if(($(_img).attr('system-event-reg') == undefined) == true || $(_img).attr('system-event-reg') == ''){//沒有註冊事件,或是曾經註冊但都移除只剩空值
						System.Event.addEventListener(_img , _lazyLoad , System.EventHandler.lazyLoadedImage , false);//監聽圖檔何時可實際載入
						tmpEventId = System.Event.addEventListener(_img , _load , System.EventHandler.afterPoolImageLoaded , false);//圖檔載入後更新通訊池捲動高度事件
						$(_img).attr('auto-remove-event-id' , tmpEventId);//設定圖檔的載入後更新捲動高度事件,永遠只執行一次
						System.Event.addEventListener(_img , _load , System.EventHandler.afterImageLoadedToBase64 , false);//圖檔載入後存為本地端base64 內容
					} else {//曾經註冊過某種事件
						_eventProp = $(_img).attr('system-event-reg');
						tmpEventId = System.Event.getEventRegId(_lazyLoad , _eventProp);//尋找lazyLoad事件
						if(tmpEventId == -1) System.Event.addEventListener(_img , _lazyLoad , System.EventHandler.lazyLoadedImage , false);//lazyLoad 事件沒有註冊,註冊lazyLoad 事件
						tmpEventId = System.Event.getEventRegId(_load , _eventProp);//尋找load 事件
						if(tmpEventId == -1){//確認load事件沒有註冊
							tmpEventId = System.Event.addEventListener(_img , _load , System.EventHandler.afterPoolImageLoaded , false);//圖檔載入後更新通訊池捲動高度事件
							$(_img).attr('auto-remove-event-id' , tmpEventId);//設定圖檔的載入後更新捲動高度事件,永遠只執行一次
						}
						System.Event.addEventListener(_img , _load , System.EventHandler.afterImageLoadedToBase64 , false);//圖檔載入後存為本地端base64 內容
					}

				}
				_ary = $(_otherDoms).find('img[data-lazy="0"]');//2.再撈不顯示的通訊池中需要lazyLoad 的圖檔
				for(var i = 0;i<_ary.length;i++){
					_img = _ary[i];
					if(($(_img).attr('system-event-reg') == undefined) == false){
						_eventProp = $(_img).attr('system-event-reg');
						tmpEventId = System.Event.getEventRegId(_lazyLoad , _eventProp);//尋找lazyLoad 事件
						if(tmpEventId != -1) System.Event.removeEventListener(tmpEventId);//確認lazyLoad事件有註冊,移除lazyLoad 事件
						tmpEventId = System.Event.getEventRegId(_load , _eventProp);//尋找load 事件
						if(tmpEventId != -1) System.Event.removeEventListener(tmpEventId);//確認load事件有註冊,移除load 事件
					}
				}
			}
			,
			/**
			!切換通訊功能列.
			>_dom HTML DOM|要出現的通訊功能列.
			>_otherDoms Array|要關閉的通訊功能列清單.
			*/
			switchGuestBar:function(_dom , _otherDoms){
				$(_dom).removeClass('off').addClass('open');
				$(_otherDoms).removeClass('open').addClass('off');
			}
			,
			/**
			!切換通訊清單的使用者.
			>_dom HTML DOM|要通訊的通訊者標籤.
			>_otherDoms Array|要顯示為未通訊的通訊者標籤陣列.
			>_animated Boolean|是(true)否(false)啟用動畫效果.
			*/
			switchCurrentGuestInList:function(_dom , _otherDoms , _animated){
				$(_dom).find('.unread-message-count').text(0);//未讀訊息數量歸零
				$(_dom).find('button').addClass('current').prop('enabled' , true);
				$(_otherDoms).each(function(){
					$(this).find('button').removeClass('current').prop('enabled' , false);
				});
				
				var tmp = [_dom[0]/*跳脫*/ , $(_dom).next()[0]/*跳脫*/];
				var _userList = $(System.UI.ConstantStatic.CHAT_ASIDE_AREA_DOT_NAME).find(System.UI.ConstantStatic.CHAT_USER_LIST_DOT_NAME);
				var finalCall = function(){
					$(tmp).each(function(){
						$(this).removeAttr('style');
					});
					$(_userList).removeAttr('style').prepend(tmp);
					
				};
				var reScrollListContenter = function(){
					if($(_userList).parent().scrollTop() != 0) {
						$(_userList).parent().stop().animate(
							{
								scrollTop:0
							}, 
							700, 
							'easeOutQuart', 
							function(){
								$(this).removeAttr('style');
							}
						);
					}
				};
				if(_animated == false){
					reScrollListContenter();
					finalCall();
				} else {
					var initTop = ((($(tmp[0]).index() - 1) * tmp[0].clientHeight) - tmp[0].clientHeight*0.5);
					var nameLabelAnimateStartCss = {
						'position':'absolute' , 
						'width':'100%' , 
						'left':0 , 
						'top':initTop + 'px'
					};
					var nameLabelAnimateEndCss = {top:0};
					$(_userList).css({'padding-top':(tmp[0].clientHeight + tmp[1].clientHeight) + 'px'});//用clientHeight 取得實際的高度
					$(tmp[1]).css(nameLabelAnimateStartCss).stop().animate(/*標籤下方的分隔線*/
						nameLabelAnimateEndCss
						, 
						( $(tmp[0]).index()*70 )
						, 
						'easeOutExpo'
					);
					$(tmp[0]).css(nameLabelAnimateStartCss).stop().animate(/*標籤本體*/
						nameLabelAnimateEndCss
						, 
						($(tmp[0]).index()*120)
						, 
						'easeOutExpo', 
						finalCall
					);
					reScrollListContenter();
				}
			}
			,
			/**
			!初始化使用者搜尋功能.
			>_data_ary Array|[{label:String|項目顯示名稱 , value:String|項目值 , hiddenValue:String|使用者別名}].
			>_selectFunc Function|autocomplete 的select 事件.
			*/
			setUserQuery:function(_data_ary , _selectFunc){
				if(System.UI.VarableDynamic.queryUserForm == null) System.UI.VarableDynamic.queryUserForm = $('input[name="' + System.UI.ConstantStatic.CHAT_SEARCH_INPUT_NAME + '"]').autocomplete({
					select: _selectFunc
					,
					change: function( e, ui ) {
						
					}
					,
					source: _data_ary
				});
				$(System.UI.ConstantStatic.UI_AUTOCOMPLETE_DOT_NAME).addClass(System.UI.ConstantStatic.UI_AUTOCOMPLETE_EXTEND_CLASS);
			}
			,
			/**
			!更新使用者搜尋功能中的下拉清單.
			>_data_ary Array|[{label:String|項目顯示名稱 , value:String|項目值 , hiddenValue:String|使用者別名}].
			*/
			updateUserQueryList:function(_data_ary){
				$('input[name="' + System.UI.ConstantStatic.CHAT_SEARCH_INPUT_NAME + '"]').autocomplete('option' , 'source' , _data_ary);
			}
			,
			/**
			!變更通訊池上方功能列的照片與名稱.
			>_imgDom HTML DOM|要更換的使用者照片<img>(複製的)元素.
			>_name String|使用者名稱.
			*/
			updateToolBarIcon:function(_imgDom , _name){
				var _toolBar = $(System.UI.ConstantStatic.CHAT_VIEW_HASH_ID + ' ' + System.UI.ConstantStatic.CHAT_TOOL_BAR_DOT_NAME);
				var _class = $(_toolBar).find(System.UI.ConstantStatic.CHAT_TOOL_BAR_ICON_DOT_NAME + ' img').attr('class');
				$(_imgDom).attr('class' , _class).attr('alt' , _name);
				$(_toolBar).find(System.UI.ConstantStatic.CHAT_TOOL_BAR_ICON_DOT_NAME + ' img').remove();//移除
				$(_toolBar).find(System.UI.ConstantStatic.CHAT_TOOL_BAR_ICON_DOT_NAME).append(_imgDom);
				$(_toolBar).find(System.UI.ConstantStatic.CHAT_TOOL_BAR_GUEST_DOT_NAME).text(_name);
			}
			,
			/**
			!變更使用者清單上方功能列的照片與名稱.
			>_imgDom HTML DOM|要更換的使用者照片<img>(複製的)元素.
			>_name String|使用者名稱.
			*/
			/*目前資料格式無提供接線生頭像圖檔.
			updateListToolBarIcon:function(_imgDom , _name){
				var _listBarIcon = $(System.UI.ConstantStatic.CHAT_ASIDE_AREA_DOT_NAME + ' ' + System.UI.ConstantStatic.CHAT_USER_LIST_TOP_ICON_DOT_NAME);
				var _class = $(_listBarIcon).find('img').attr('class');
				$(_imgDom).attr('class' , _class).attr('alt' , _name);
				$(_listBarIcon).find('img').remove();//移除
				$(_listBarIcon).append(_imgDom);
			}
			,
			*/
			/**
			!播放新訊息音效.
			>_volume Number|[選擇性]0~1 的音量.
			*/
			runNewBubbleAudioEffect:function(_volume){
				if(arguments.length == 0){
					$('#chatAudio')[0].volume = 1;
				} else {
					$('#chatAudio')[0].volume = _volume;
				}
				$('#chatAudio')[0].play();
			}
		}
		,
		/**
		!圖像管理函數集.
		*/
		Graphic:{
			/**
			!靜態常數集.
			*/
			ConstantStatic:{}
			,
			/**
			!動態變數集.
			*/
			VarableDynamic:{}
			,
			/**
			!取得圖檔的實體.
			>_url String|圖檔路徑.
			@回傳 String|原始的路徑或Base64 的格式內容.
			*/
			getContext:function(_url){
				var tmp = System.DeviceSaves.imageCache.getItemByKeyValue('fileName' , _url);
				if(tmp == null){
					return _url;//原始的圖檔URL
				} else {
					return System.DeviceSaves.imageCache.getItemValueByKey('fileBase64' , tmp);
				}
			}
			,
			/**
			!將圖檔的BitmapData 轉為Base64 字串後存於瀏覽器.
			>_img HTML DOM|圖檔<img> 實體.
			@回傳 Int|0 = 完全成功 , 1 = CORs 不允許 , 3 = 本地端已有圖檔 , 4 = 本地端存檔錯誤 , 5 = 本地端無法存檔.
			*/
			contextToBase64:function(_img){
				//console.log('準備Base64 轉換');
				if(System.DeviceSaves.VarableDynamic.canStore == false) return 5;
				var _url = $(_img).attr('src');
				
				if(System.DeviceSaves.imageCache.getItemByKeyValue('fileName' , _url) != null) return 3;//已經有該圖檔的Base64 資料
				//_props Object|{_name String|圖檔URL , _width Number|圖檔寬度 , _height Number|圖檔高度 , _base64 String|圖檔Base64 URL}
				var prop = {
					_name:_url/*圖檔原始網址*/ , 
					_width:_img.naturalWidth/*圖檔原始寬*/ , 
					_height:_img.naturalHeight/*圖檔原始高*/ , 
					_base64:System.Graphic.getBase64Data(_img , _img.width , _img.height)
				};
				if(prop._base64 == '') return 1;//CORs 不允許,轉寫失敗
				var tmp = System.DeviceSaves.imageCache.saveItem(prop);
				if(tmp == true) {
					return 0;
				} else {
					return 4;
				}
			}
			,
			/**
			!將圖檔的BitmapData 轉為Base64 格式字串(DATA URL).
			>_img HTML Object|來源圖檔.
			>_displayWidth Number|轉換時需要的影像寬度.
			>_displayHeight Number|轉換時需要的影像高度.
			@回傳 String|轉寫成功的Base64 格式字串(DATA URL),或無法轉寫回傳空字串.
			*/
			getBase64Data:function(_img , _displayWidth , _displayHeight){
				var base64_str = '';//重要,BitmapData 內容
				var _can = document.createElement('CANVAS');
				var ctx = _can.getContext('2d');
				_can.setAttribute('width' , _displayWidth);
				_can.setAttribute('height' , _displayHeight);
				try{
					ctx.drawImage(_img , 0 , 0 , _displayWidth , _displayHeight);
					base64_str = _can.toDataURL();//嘗試轉寫
				} catch(e){//轉寫失敗					
					//不作任何事
				}
				return base64_str;
			}
			,
			/**
			!轉換為具有lazyLoad 效果的<img>.
			>_img HTML DOM|來源的HTML 元素.
			>_src String|圖檔的網址.
			@回傳 HTML DOM|設定為lazyLoad 效果的<img>,並包含事件的註冊.
			*/
			setToImageLazyloadMode:function(_img , _src){
				$(_img).attr('data-lazy' , 0).attr('data-lazy-src' , _src/*先把圖檔的網址寫到其他屬性內*/).removeAttr('src'/*確保移除掉可能存在的src 屬性*/);
				return _img;
			}
		}
		,
		/**
		!事件註冊擴充函數集.
		*/
		Event:{
			/**
			!靜態常數集.
			*/
			ConstantStatic:{}
			,
			/**
			!動態變數集.
			*/
			VarableDynamic:{
				regedId:null,
				regedEvents : null
			}
			,
			/**
			!物件重設.
			*/
			reCall:function(){
				System.Event.VarableDynamic.regedId = -1;
				System.Event.VarableDynamic.regedEvents = [];
			}
			,
			/**
			!被動式建構子.
			*/
			init:function(){
				this.reCall();
			}
			,
			/**
			!註冊事件.
			>e_ref HTML DOM Object|HTML 物件參照.
			>event_str String|事件字串.
			>handler Function|事件接收函數.
			>capture Boolean|堆疊捕捉布林.
			@操作 HTML DOM Object Attribute|對指定的HTML DOM Object 寫入名為system-event-reg　的屬性。
			@回傳 Number|註冊事件的整數序號id ,0~無限.
			*/
			addEventListener:function (e_ref , event_str , handler , capture){
				System.Event.VarableDynamic.regedEvents.push({
					type:event_str , 
					element:e_ref , 
					eventHolder:handler , 
					captureBoolean:capture , 
					add:function(){
						this.element.addEventListener(this.type , this.eventHolder , this.captureBoolean);/*Javascript 原生的事件註冊函數*/
					} , 
					remove:function(){
						this.element.removeEventListener(this.type , this.eventHolder , this.captureBoolean);/*Javascript 原生的事件移除函數*/
					}
				});
				var comma;
				if(!$(e_ref).attr('system-event-reg')) $(e_ref).attr('system-event-reg' , '');
				if($(e_ref).attr('system-event-reg') == ''){
					comma = '';
				} else {
					comma = ','
				}
				System.Event.VarableDynamic.regedId += 1;
				$(e_ref).attr('system-event-reg' , $(e_ref).attr('system-event-reg') + comma + event_str + '|' + System.Event.VarableDynamic.regedId);
				System.Event.VarableDynamic.regedEvents[System.Event.VarableDynamic.regedId].add();
				return System.Event.VarableDynamic.regedId;
			}
			,
			/**
			!移除一個事件.
			>_id String|已註冊的事件id 值 , id 值直接從欲移除事件的HTML DOM Object 的system-event-reg 屬性中取得.
			@操作 HTML DOM Object Attribute|HTML DOM Object 的system-event-reg 屬性內吻合id 值的記錄會被移除.
			@回傳 Boolean|有可刪除對象且已刪除成功布林值.
			*/
			removeEventListener:function (_id){
				if(System.Event.VarableDynamic.regedEvents[_id].eventHolder != null && $(System.Event.VarableDynamic.regedEvents[_id].element).attr('system-event-reg')){
					var _ary = $(System.Event.VarableDynamic.regedEvents[_id].element).attr('system-event-reg').split(',');
					var targetId;
					var regString = '';
					for(var i = 0;i<_ary.length;i++){
						targetId = Number(_ary[i].split('|')[1]);
						if(targetId != _id) regString += _ary[i] + ',';//與要移除的事件id 不同時
					}
					if(regString.charAt(regString.length - 1) == ',') regString = regString.substring(0 , regString.length - 1);
					$(System.Event.VarableDynamic.regedEvents[_id].element).attr('system-event-reg' , regString);//將要移除的事件與事件id 移出
					System.Event.VarableDynamic.regedEvents[_id].remove();//移除該事件
					System.Event.VarableDynamic.regedEvents[_id].eventHolder = null;//將事件接收函數清空
					if($(System.Event.VarableDynamic.regedEvents[_id].element).attr('system-event-reg') == '') $(System.Event.VarableDynamic.regedEvents[_id].element).removeAttr('system-event-reg')
					return true;
				} else {
					return false;
				}
			}
			,
			/**
			!移除單一HTML DOM 物件上的所有事件.
			>e_ref HTML DOM Object|HTML 物件參照.
			@回傳 Boolean|是否全部移除完成的布林.
			*/
			removeEachEventListener:function (e_ref){
				var chk;
				var _ary = $(e_ref).attr('system-event-reg').split(',');
				for(var i = 0;i<_ary.length;i++){
					chk = System.Event.removeEventListener(Number(_ary[i].split('|')[1]));
					if(chk == false) {
						if(DDK.isConsole == true)console.log('事件編號:' + _ary[i].split('|')[1] + ' , 事件名稱:' + _ary[i].split('|')[0] + ' 移除失敗');
						return false;
					}
				}
				return true;
			}
			,
			/**
			!移除所有透過System.Event 物件註冊的事件，並對System.Event 進行重設
			*/
			killAllExistenceEventListener:function (){
				var tmp;
				for(var i = 0;i<System.Event.VarableDynamic.regedEvents.length;i++){
					if(System.Event.VarableDynamic.regedEvents[i].eventHolder != null && System.Event.VarableDynamic.regedEvents[i].element){
						tmp = System.Event.removeEventListener(i);
					}
				}
				System.Event.reCall();//重設
			}
			,
			/**
			!擴充原生的dispatchEvent 效果
			>_type String|要觸發的事件名稱.
			>_detailBall Object|要送出的detail 物件.
			@回傳 Boolean|有找到指定的事件true,找不到指定的事件false.
			*/
			dispatchEvent:function (_type , _detailBall){
				var _ary = System.Event.getTriggerElements(_type);
				if(_ary.length == 0) return false;
				for(var i = 0;i<_ary.length;i++){
					if(_ary[i].type == _type && _ary[i].element){
						_ary[i].element.dispatchEvent(new CustomEvent(_type , {detail:_detailBall}));
					}
				}
				return true;
			}
			,
			/**
			!將System.Event.VarableDynamic.regedEvents 吻合特定事件名稱的元素完整回傳.
			>_type String|尋找在System.Event.VarableDynamic.regedEvents 吻合的事件名稱.
			@回傳 Array|一個與查詢事件吻合的清單.
			*/
			getTriggerElements:function (_type){
				var _ary = [];
				for(var i = 0;i<System.Event.VarableDynamic.regedEvents.length;i++){
					if(System.Event.VarableDynamic.regedEvents[i].type == _type) _ary.push(System.Event.VarableDynamic.regedEvents[i]);
				}
				return _ary;
			}
			,
			/**
			!尋找單一HTML DOM 物件對應事件名稱的事件id.
			>_type String|欲尋找的註冊事件名稱.
			>_regs String|HTML Element 的system-event-reg 屬性內的完整字串.
			@回傳 Number|註冊事件時獲得的id , -1 為未找到.
			*/
			getEventRegId:function(_type , _regs){
				var n = -1;
				var _ary = _regs.split(',');
				var tmp;
				for(var i = 0;i<_ary.length;i++){
					tmp = _ary[i].split('|');
					if(tmp[0] == _type){
						n = Number(tmp[1]);
					}
				}
				return n;
			}
		}
		,
		/**
		!事件字串.
		*/
		EventTypes:{
			/**
			!靜態常數集.
			*/
			ConstantStatic:{
				CLICK:'click',
				KEY_UP:'keyup',
				KEY_DOWN:'keydown',
				MOUSE_DOWN:'mousedown',
				MOUSE_OVER:'mouseover',
				MOUSE_UP:'mouseup',
				TOUCH_START:'touchstart',
				TOUCH_MOVE:'touchmove',
				TOUCH_END:'touchend',
				SCROLL:'scroll',
				LOAD:'load',
				FILE_SELECT_CHANGE:'change',
				LAZY_LOAD:'lazyload'/*自訂,非原生事件*/,
				APPEAR_PREVIEW_MESSEGE:'appearPreviewMessege'/*自訂,非原生事件*/,
				CHILD_NODE_LENGTH_CHANGE:'childNodeLengthChange'/*自訂,非原生事件*/
			}	
		}
		,
		/**
		!擴充事件字串.
		*/
		ApiEventTypes:{
			/**
			!靜態常數集.
			*/
			ConstantStatic:{
				CONTENT_EXIT_POOL:'contentExitPool'/*自訂,非原生事件:當有訊息發出*/,
				IMAGE_FILE_EXIT_POOL:'imageFileExitPool'/*自訂,非原生事件:當有圖檔發出*/,
				CONTENT_INTO_POOL:'contentIntoPool'/*自訂,非原生事件:當有訊息進入*/,
				CLIENT_JOIN:'clientJoin'/*自訂,非原生事件:登入時的使用者加入*/,
				CLIENT_RUNTIME_JOIN:'clientRuntimeJoin'/*自訂,非原生事件:登入後當有新的使用者加入*/
			}	
		}
		,
		/**
		!執行觸發擴充事件的共用函數.
		*/
		ApiEventFiresMethod:{
			/**
			!依據訊息形態尋找訊息內容.
			>_chatNode Object|使用者的某個訊息節點.
			>_messageType String|目前會有'TEXT' , 'STICKER' , 'VIDEO' , 'AUDIO' , 'IMAGE' 5種.
			@回傳 String|訊息內容的文字或某種URL.
			*/
			findContentBymMessageType:function(_chatNode , _messageType){
				var _con;
				if(_messageType == 'TEXT'){//operator 裡面的text 是Text .... 全部轉大寫來比對
					_con = _chatNode.message.text;
				} if(_messageType == 'STICKER'){
					(_chatNode.message.stickerURL) ? _con = _chatNode.message.stickerURL : _con = _chatNode.message.stickerUrl;//嘗試尋找屬性名稱
				} else if(_messageType == 'VIDEO' || _messageType == 'AUDIO' || _messageType == 'IMAGE'){
					_con = _chatNode.message.fileUrl;
				}
				return _con;
			}
			,
			/**
			!觸發擴充事件的System.ApiEventTypes.ConstantStatic.CONTENT_INTO_POOL.
			>_chatNode Object|使用者的某個訊息節點.
			>_guestName String|使用者名稱.
			*/
			fireContentIntoPool:function(_chatNode , _guestName){
				var msgType = _chatNode.message.type.toUpperCase();
				System.Event.dispatchEvent(
					System.ApiEventTypes.ConstantStatic.CONTENT_INTO_POOL , 
					{
						bubbleElement:(_chatNode.message.frontExtends.bubble) ? _chatNode.message.frontExtends.bubble[0] : null,
						clientId:_chatNode.CLIENT_ID,
						clientName:_guestName,
						content:System.ApiEventFiresMethod.findContentBymMessageType(_chatNode , msgType),
						contentFrom:_chatNode.TYPE,
						contentType:msgType,
						historical:true,
						operatorId:(_chatNode.OPERATOR_ID) ? _chatNode.OPERATOR_ID : null,
						timeStamp:_chatNode.TIME
					}
				);
			}
			,
			/**
			!觸發擴充事件的System.ApiEventTypes.ConstantStatic.CLIENT_RUNTIME_JOIN 或System.ApiEventTypes.ConstantStatic.CLIENT_JOIN.
			>_dataId
			>_guestName String|使用者名稱.
			>_joinType String|''或'runtime'.
			*/
			fireClientJoin:function(_dataId , _guestName , _joinType){
				System.Event.dispatchEvent(
					(_joinType == 'runtime') ? System.ApiEventTypes.ConstantStatic.CLIENT_RUNTIME_JOIN : System.ApiEventTypes.ConstantStatic.CLIENT_JOIN , 
					{
						clientId:_dataId,
						clientName:_guestName
					}
				);
			}
			,
			/**
			!觸發擴充事件的System.ApiEventTypes.ConstantStatic.CONTENT_EXIT_POOL.
			>_guestId String|使用者id.
			>_postBar HTML Element|通訊Bar 的參照.
			>_postText String|送出的內容.
			*/
			fireContentExitPool:function(_guestId , _postBar , _postText){
				System.Event.dispatchEvent(
					System.ApiEventTypes.ConstantStatic.CONTENT_EXIT_POOL , {
						textarea:_postBar,
						content:_postText,
						clientId:_guestId,
						operatorId:FireBase.VarableDynamic.operatorId
					}
				);
			}
			,
			/**
			!觸發擴充事件的System.ApiEventTypes.ConstantStatic.IMAGE_FILE_EXIT_POOL.
			>_fileInput HTML Element|選取檔案的<input type="file"> 的參照.
			>_guestId String|使用者id.
			>_base64Src String|圖檔的base64 URL.
			*/
			fireImageFileExitPool:function(_guestId , _fileInput , _base64Src){
				System.Event.dispatchEvent(
					System.ApiEventTypes.ConstantStatic.IMAGE_FILE_EXIT_POOL , 
					{
						content:_fileInput,
						base64src:_base64Src,
						clientId:_guestId,
						operatorId:FireBase.VarableDynamic.operatorId
					}
				);
			}
			,
		}
		,
		/**
		!事件監聽函數集.
		*/
		EventHandler:{
			/**
			!監聽通訊池的對話框數量是否有變更並因變更而捲動的函數.
			*/
			chatPoolNodeLengthChange:function(e){
				if(e.currentTarget == e.detail.pool && $(e.currentTarget).hasClass('open') == true){//通訊池必須是使用中
					var _pool = e.detail.pool;
					var _lastMsg = $(_pool).find(System.UI.ConstantStatic.CHAT_CONTENTER_DOT_NAME).children().last();//通訊池中最後一個對話框
					$(_pool).scrollTop();//每個通訊池捲動到最末端
					$(_pool).stop().animate(
						{
							scrollTop:$(_pool).scrollTop() + $(_lastMsg).offset().top + $(_lastMsg).height()
						}, 
						1000, 
						'easeOutQuart', 
						function(){
							$(this).removeAttr('style');
						}
					);
	  
				}
			}
			,
			/**
			!檢查使用中的通訊池是否捲動到最下方.
			*/
			checkPoolScrollPosition:function(e){
				var _t = e.currentTarget;
				if($(_t).hasClass('off') == true) return;
				var _currentScroll = $(_t).scrollTop();
				var _poolMaxScrollEnd = $(_t).find(System.UI.ConstantStatic.CHAT_MESSEGE_DOT_NAME)[0].clientHeight - _t.clientHeight;//捲動到最底的像素數
				if(_poolMaxScrollEnd - _currentScroll >= _poolMaxScrollEnd*0.0025){//不允許其他物件執行捲動
					$(_t).attr('data-allow-update-scroll' , 0);
					System.Event.dispatchEvent(System.EventTypes.ConstantStatic.APPEAR_PREVIEW_MESSEGE , {previewMessegeAppear:true});
				} else {
					$(_t).attr('data-allow-update-scroll' , 1);
					System.Event.dispatchEvent(System.EventTypes.ConstantStatic.APPEAR_PREVIEW_MESSEGE , {previewMessegeAppear:false});
					
				}
				
				//System.UI.VarableDynamic.speakBarArray
				//System.UI.ConstantStatic.CHAT_SPEAK_BAR_DOT_NAME
				//console.log('scrollTop = ' + $(_t).scrollTop() + ' , pool clientHeight = ' + _t.clientHeight + ' , chat-messages clientHeight = ' + $(_t).find(System.UI.ConstantStatic.CHAT_MESSEGE_DOT_NAME)[0].clientHeight);
			}
			,
			/**
			!話框內的圖檔監聽因載入延遲問題,需要重新將所屬的通訊池捲動到最下方.
			*/
			afterPoolImageLoaded:function(e){
				var _t = e.currentTarget;
				var _pool = $(_t).closest('[data-child-node-length]')[0];
				var run_upadte;
				run_upadte = setInterval(
					function(){
						var isAllow = Boolean(Number($(_pool).attr('data-allow-update-scroll')));
						if(isAllow == true){
							System.UI.scrollPoolToEnd(
								_pool , 
								$(_pool).find(System.UI.ConstantStatic.CHAT_CONTENTER_DOT_NAME).children().last()/*通訊池中最後一個對話框*/
							);//每個通訊池捲動到最末端
							clearInterval(run_upadte);
							System.Event.removeEventListener($(_t).attr('auto-remove-event-id'));//只觸發一次
						}
					}
					,
					100
				);
			}
			,
			/**
			!話框內的圖檔監聽因載入延遲問題,需要重新將所屬的通訊池捲動到最下方.
			*/
			afterImageLoadedToBase64:function(e){
				var _t = e.currentTarget;
				if(($(_t).attr('data-source-url') === undefined) == false){//有需要本地端暫存的圖檔
					if(System.ConstantStatic.ALLOW_CONSOLE == true)console.log($(_t).attr('src') + ' 準備轉換Base64 , 顯示寬:' + _t.width + ' , 顯示高:' + _t.height);
					var tmp = System.Graphic.contextToBase64(_t);
					if(tmp == 0){
						if(System.ConstantStatic.ALLOW_CONSOLE == true)console.log($(_t).attr('src') + ' 轉寫Base64 完成 , 資料欄位總位元:' + Math.floor(System.DeviceSaves.imageCache.getItemByKeyValue('fileName' , $(_t).attr('src')).html().length / 1024) + 'kb');
					} else {
						if(System.ConstantStatic.ALLOW_CONSOLE == true)console.log($(_t).attr('src') + ' 略過轉寫Base64 , error code:' + tmp);
					}
				}
			}
			,
			/**
			!是否顯示發話功能模組內的預覽訊息.
			*/
			speakBarShowPreviewMessege:function(e){
				var _t = e.currentTarget;
				if($(_t).hasClass('off') == true) return;
				if(e.detail.previewMessegeAppear == true){//允許出現預覽通話
					$(_t).find(System.UI.ConstantStatic.CHAT_SPEAK_PREVIEW_MESSEGE_DOT_NAME).attr('data-allow-appear' , 1);
					//是否實際出現,由是否有新的通訊決定
				} else {//不允許出現預覽通話
					$(_t).find(System.UI.ConstantStatic.CHAT_SPEAK_PREVIEW_MESSEGE_DOT_NAME).attr('data-allow-appear' , 0);
					$(_t).find(System.UI.ConstantStatic.CHAT_SPEAK_PREVIEW_MESSEGE_DOT_NAME).removeClass('open').addClass('off');
					$(_t).find(System.UI.ConstantStatic.CHAT_SPEAK_PREVIEW_MESSEGE_DOT_NAME).children().text('');
				}
			}
			,
			/**
			!圖檔元素監聽是否進入所屬通訊池的可視範圍內.
			*/
			lazyLoadedImage:function(e){
				var _t = e.currentTarget;
				var _bubble = $(_t).closest('div.message-row')[0];//對話框
				var _top = $(_bubble).offset().top;
				var _left = $(_bubble).offset().left;
				if(
					(_top >= e.detail.top && (_top - _bubble.clientHeight) < (e.detail.top + e.detail.height)) == true && 
					(_left >= e.detail.left && (_left - _bubble.clientWidth) < (e.detail.left + e.detail.width)) == true
					/*對話框在對話池的可視範圍內*/
				){
					$(_t).attr('data-lazy' , 1);//設定為已認定可載入圖檔,不再需要lazyLoad
					System.Event.removeEventListener(
						System.Event.getEventRegId(
							System.EventTypes.ConstantStatic.LAZY_LOAD , 
							$(_t).attr('system-event-reg')
						)
					);//移除lazyLoad 事件
					$(_t).attr('src' , $(_t).attr('data-lazy-src'));//載入圖檔
					
				}
			}
			
		}
		,
		/**
		!各種自訂事件透過setInterval的偵測後觸發函數集.
		*/
		EventWatchMen:{
			/**
			!以setInterval 的方式檢查通訊池的對話框數量是否有變更.
			*/
			poolNodeLengthChange:function(){
				if(System.UI.VarableDynamic.poolNodeLengthInterval != null){
					alert(System.textScripts.BUBBLE_LENGTH_CHANGE_INTERVAL_HAD_CALL);
					return;
				}
				//
				var _pool , _lastMsg;
				/*for(var i = 0;i<System.UI.VarableDynamic.poolArray.length;i++){//設定對話框數量的初始值
					_pool = System.UI.VarableDynamic.poolArray[i];
					$(_pool).attr(System.UI.ConstantStatic.DATA_CHILD_NODE_LENGTH_ATTR_NAME , $(_pool).find(System.UI.ConstantStatic.CHAT_CONTENTER_DOT_NAME).children().length);
					

				}*/
				
				
				System.UI.VarableDynamic.poolNodeLengthInterval = setInterval(function(){
					var _oldLength , _newLength , _obj;
					for(var i = 0;i<System.UI.VarableDynamic.poolArray.length;i++){
						_pool = System.UI.VarableDynamic.poolArray[i];
						_oldLength = Number($(_pool).attr(System.UI.ConstantStatic.DATA_CHILD_NODE_LENGTH_ATTR_NAME));
						_newLength = $(_pool).find(System.UI.ConstantStatic.CHAT_CONTENTER_DOT_NAME).children().length;
						//console.log(_oldLength + ' / ' + _newLength);
						if(_oldLength != _newLength){
							_obj = {before:_oldLength , after:_newLength , update:'' , pool:System.UI.VarableDynamic.poolArray[i]};//自訂事件回擲物件
							$(_pool).attr(System.UI.ConstantStatic.DATA_CHILD_NODE_LENGTH_ATTR_NAME , _newLength);//更新對話框數量
							//console.log(System.UI.VarableDynamic.poolArray[i]);
							//console.log(_oldLength + ' / ' + _newLength);
							if(_oldLength < _newLength){
								_obj.update = 'more';
							} else if(_oldLength > _newLength){
								_obj.update = 'less';
							}
							System.Event.dispatchEvent(System.EventTypes.ConstantStatic.CHILD_NODE_LENGTH_CHANGE , _obj);//喚起事件
						}
						
						//
					}
				} , 100);
			}
			,
			/**
			!以setInterval 的方式取得通訊池的可視範圍並廣播出去.
			*/
			triggerLazyLoadImage:function(){
				
				if(System.UI.VarableDynamic.lazyLoadTriggerInterval != null){
					alert(System.textScripts.LAZY_LOAD_UPDATE_INTERVAL_HAD_CALL);
					return;
				}
				System.UI.VarableDynamic.lazyLoadTriggerInterval = setInterval(function(){/*以Interval 持續更新目前通訊池的可視範圍,藉以觸發設定為lazyLoad 的圖檔*/
					var _ary = [];
					var tmp;
					var _pool;
					var prop = {top:null , left:null , width:null , height:null};
					for(var i = 0;i<System.UI.VarableDynamic.poolArray.length;i++) if($(System.UI.VarableDynamic.poolArray[i]).hasClass('open') == true) _pool = System.UI.VarableDynamic.poolArray[i];//找到開啟中的通訊池
					prop.top = $(_pool).offset().top;
					prop.left = $(_pool).offset().left;
					prop.width = _pool.clientWidth;
					prop.height = _pool.clientHeight;
					System.Event.dispatchEvent(System.EventTypes.ConstantStatic.LAZY_LOAD , prop);//喚起事件
					//console.log(prop)
				} , 100);
				//console.log(e);
			}
			
		}
		,
		/**
		!Web Storage 實作管理物件.
		*/
		DeviceSaves:{
			/**
			!靜態常數集.
			*/
			ConstantStatic:{
				STORAGE_NAME:'chiliman_power_line_web_service_ui_for_operator',
				BUILD_ID:1545062400000,
				MASTER_DATA_WRAPPER:'section'
			}
			,
			/**
			!動態變數集.
			*/
			VarableDynamic:{
				canStore:null,
				data:null
			}
			,
			/**
			!物件重設.
			*/
			reCall:function(){
				System.DeviceSaves.VarableDynamic.canStore = null;
				System.DeviceSaves.VarableDynamic.data = null;
			}
			,
			/**
			!被動式建構子.
			*/
			init:function(){
				if (typeof(Storage) === 'undefined') {
					//裝置不支援WebStorage
					System.DeviceSaves.VarableDynamic.canStore = false;
				} else {
					System.DeviceSaves.VarableDynamic.canStore = true;
				}
				if(System.ConstantStatic.ALLOW_CONSOLE == true){
					if(System.ConstantStatic.ALLOW_CONSOLE == true)console.log('是否支援Web Storage: ' + System.DeviceSaves.VarableDynamic.canStore);
				}
				if(System.DeviceSaves.VarableDynamic.canStore == false) return;
				//
				System.DeviceSaves.VarableDynamic.data = document.createElement(System.DeviceSaves.ConstantStatic.MASTER_DATA_WRAPPER);//建立資料容器
				System.DeviceSaves.VarableDynamic.data.innerHTML = System.DeviceSaves.refine();//取回儲存的資料
				var needSave = false;
				if($(System.DeviceSaves.VarableDynamic.data).find('.metadata').length == 0){
					//沒有基本資料,寫入
					$(System.DeviceSaves.VarableDynamic.data).append(
					'<dl class="metadata" data-build="' + System.DeviceSaves.ConstantStatic.BUILD_ID + '">' + 
						'<dt>齊力樂門科技Power line Web版客服應用程式</dt>'+
						'<dd>'+
							'<p>版本:beta 1.0</p>'+
							'<p>版號:' + new Date(System.DeviceSaves.ConstantStatic.BUILD_ID).toString() + '</p>'+
							'<p>http://www.chiliman.com.tw/</p>'+
							'<p>(02)2272-2300</p>'+
							'<p>220新北市板橋區建國街22號1樓</p>'+
							'<p>齊力樂門科技有限公司為一專業之網路資訊全方位服務機構。<br>提供最新的資訊服務技術，包括時下最夯的 LINE@、Facebook 系統整合開發技術。<br>以及我們深耕多年的企業網站/App 建置、主機伺服器管理、資訊系統建置。都能在業界看到我們服務的身影!</p>'+
						'</dd>'+
					'</dl>'
					);
					needSave = true;
					if(System.ConstantStatic.ALLOW_CONSOLE == true)console.log('第一次寫入APP Metadata.');
				} else if($(System.DeviceSaves.VarableDynamic.data).find('.metadata').length == 1){
					//有基本資料
					if(new Date(Number($(System.DeviceSaves.VarableDynamic.data).find('.metadata').attr('data-build'))).getTime() < System.DeviceSaves.ConstantStatic.BUILD_ID){
						//資料有更新時
						if(System.ConstantStatic.ALLOW_CONSOLE == true)console.log('APP Metadata 更新.');
						//System.DeviceSaves.flush();
					} else if(new Date(Number($(System.DeviceSaves.VarableDynamic.data).find('.metadata').attr('data-build'))).getTime() == System.DeviceSaves.ConstantStatic.BUILD_ID){
						//資料沒有更新,且系統資料存在時
						if(System.ConstantStatic.ALLOW_CONSOLE == true)console.log('正常讀取APP Metadata.');
					}
				}
				//檢查本地端圖檔暫存資料結點 begin
				var imageCacheNodeName = 
					System.DeviceSaves.OpenDataSheet.imageCache.ConstantStatic.SHEET_WRAPPER + 
					'.' + 
					System.DeviceSaves.OpenDataSheet.imageCache.ConstantStatic.SHEET_NAME;
				if($(System.DeviceSaves.VarableDynamic.data).find(imageCacheNodeName).length == 0) {
					System.DeviceSaves.OpenDataSheet.imageCache.default();//寫入本地端圖檔暫存初始資料
					needSave = true;
				}
				System.DeviceSaves.OpenDataSheet.imageCache.dataNode = $(System.DeviceSaves.VarableDynamic.data).find(imageCacheNodeName);
				System.DeviceSaves.imageCache = System.DeviceSaves.OpenDataSheet.imageCache;//建立捷徑
				//檢查本地端圖檔暫存資料結點 end
				
				if(needSave == true) System.DeviceSaves.flush();//寫入資料
				
				
				//$(System.DeviceSaves.OpenDataSheet.imageCache.dataNode).html('');
				//System.DeviceSaves.flush();
				
				
				
				
				if(System.ConstantStatic.ALLOW_CONSOLE == true)console.log(System.DeviceSaves.VarableDynamic.data);
			}
			,
			/**
			!存入WebStorage.
			*/
			flush:function(){
				window.localStorage.setItem(System.DeviceSaves.ConstantStatic.STORAGE_NAME, System.DeviceSaves.VarableDynamic.data.innerHTML);
			}
			,
			/**
			!取出WebStorage 的內容.
			@回傳 String|存入的字串內容.
			*/
			refine:function(){
				return window.localStorage.getItem(System.DeviceSaves.ConstantStatic.STORAGE_NAME);
			}
			,
			/**
			!寫入資料到模板字串中.
			>_template String|模板字串,模板中需要有對應資料的屬性名的置換標記.
			>_data Object|資料,例如:_data.name <i>##name##</i>.
			@回傳 String|置換完成後的字串.
			*/
			insertData:function(_template , _data){
				for(var i in _data){
					_template = _template.split('##' + i + '##').join(_data[i]);
				}
				return _template;
			}
			,
			/**
			!可存檔資訊管理物件集.
			*/
			OpenDataSheet:{
				/**
				!本地端Base64 暫存物件集.
				*/
				imageCache:{
					dataNode:null/*存檔結點參照*/,
					/**
					!靜態常數集.
					*/
					ConstantStatic:{
						SHEET_WRAPPER:'ul',
						SHEET_NAME:'imageCache',
						DATA_LABEL:['uid' , 'fileName' , 'fileWidth' , 'fileHeight' , 'fileBase64'],
						NODE_WRAPPER:
						'<li data-index="##data-index##">'+
							'<i class="uid">##uid##</i>'+
							'<i class="fileName">##_name##</i>'+
							'<i class="fileWidth">##_width##</i>'+
							'<i class="fileHeight">##_height##</i>'+
							'<i class="fileBase64">##_base64##</i>'+
						'</li>'
					}
					,
					/**
					!初始化函數.
					*/
					default:function(){
						var e = document.createElement(System.DeviceSaves.OpenDataSheet.imageCache.ConstantStatic.SHEET_WRAPPER);
						e.setAttribute('class' , System.DeviceSaves.OpenDataSheet.imageCache.ConstantStatic.SHEET_NAME);
						$(System.DeviceSaves.VarableDynamic.data).append(e);
					}
					,
					/**
					!存入新的項目.
					>_props Object|{_name String|圖檔URL , _width Number|圖檔寬度 , _height Number|圖檔高度 , _base64 String|圖檔Base64 URL}
					@回傳 Boolean|true 正確存入 , false 任何原因的存入失敗.
					*/
					saveItem:function(_props){
						if(!_props) return;
						if(!_props._name) return false;
						if(!_props._width) return false;
						if(!_props._height) return false;
						if(!_props._base64) return false;
						var nodeName = System.DeviceSaves.OpenDataSheet.imageCache.ConstantStatic.SHEET_WRAPPER + 
							'.' + 
							System.DeviceSaves.OpenDataSheet.imageCache.ConstantStatic.SHEET_NAME;
						if(System.DeviceSaves.OpenDataSheet.imageCache.dataNode == null) System.DeviceSaves.OpenDataSheet.imageCache.dataNode = $(System.DeviceSaves.VarableDynamic.data).find(nodeName);//取得存檔位置節點的參照
						var node = System.DeviceSaves.OpenDataSheet.imageCache.dataNode;
						
						_props['data-index'] = $(node).children().length;
						_props['uid'] = DerAngma.folk(DerAngma.road({key:'chiliman production' , subKey:'Jeff Wu & Derek Skins'} , String(new Date().getTime())));
						
						var tmp = System.DeviceSaves.insertData(System.DeviceSaves.OpenDataSheet.imageCache.ConstantStatic.NODE_WRAPPER , _props);
						$(node).append(tmp);//加入新資料
						System.DeviceSaves.flush();//存檔
						tmp = $(document.createElement('DIV')).html(System.DeviceSaves.refine()).find(nodeName).html();//取出存檔內容字串驗證
						if(tmp.indexOf(_props._base64) > -1 && tmp.indexOf(_props._name) > -1){
							return true;
						} else {
							return false;
						}
					}
					,
					/**
					!移除項目.
					>_name String|圖檔的URL.
					@回傳 Boolean|true 有找到指定項目並移除 , false 找不到項目或移除失敗.
					*/
					removeItem:function(_name){
						if(arguments.length == 0) return false;
						var nodeName = System.DeviceSaves.OpenDataSheet.imageCache.ConstantStatic.SHEET_WRAPPER + 
							'.' + 
							System.DeviceSaves.OpenDataSheet.imageCache.ConstantStatic.SHEET_NAME;
						if(System.DeviceSaves.OpenDataSheet.imageCache.dataNode == null) System.DeviceSaves.OpenDataSheet.imageCache.dataNode = $(System.DeviceSaves.VarableDynamic.data).find(nodeName);//取得存檔位置節點的參照
						var node = System.DeviceSaves.OpenDataSheet.imageCache.dataNode;
						if(System.DeviceSaves.OpenDataSheet.imageCache.dataNode.innerHTML.indexOf(_name) == -1) return false;
						var _ary = $(System.DeviceSaves.OpenDataSheet.imageCache.dataNode).find('li');
						var chk , tmp;
						tmp = [];
						chk = false;
						for(var i = 0;i<_ary.length;i++){
							if($(_ary[i]).find('.fileName').html() == _name){
								chk = true;
								tmp.push(_ary[i]);//可能不止一個
							}
						}
						if(chk == true){
							$(tmp).remove();
							System.DeviceSaves.flush();
							tmp = $(document.createElement('DIV')).html(System.DeviceSaves.refine()).find(nodeName).html();
							if(tmp.indexOf(_name) > -1) chk = false;//取得存檔結點字串驗證
						}
						return chk;
					}
					,
					/**
					!取得特定的項目.
					>_propName String|欄位名稱.
					>_propValue String|欄位值.
					@回傳 HTML DOM|條件吻合的資料內容 , 若沒有吻合回傳null.
					*/
					getItemByKeyValue:function(_propName , _propValue){
						var _ary = System.DeviceSaves.OpenDataSheet.imageCache.itemList();
						var tmp , _i;
						for(var i = 0;i<_ary.length;i++){
							tmp = $(_ary[i]);
							_i = $(_ary[i]).find('.' + _propName);
							if(_i.length == 1 && _i.html() == _propValue) return tmp;
						}
						return null;
					}
					,
					/**
					!取得特定的項目值.
					>_propName String|欄位名稱.
					>_item HTML DOM|項目參照.
					@回傳 HTML DOM|條件吻合的資料內容 , 若沒有吻合回傳null.
					*/
					getItemValueByKey:function(_propName , _item){
						if(arguments.length != 2) return null;
						if($(_item).find('.' + _propName).length == 0) return null;
						return $(_item).find('.' + _propName).html();
					}
					,
					/**
					!取得項目清單.
					@回傳 HTML DOM|<li>構成的項目清單.
					*/
					itemList:function(){
						return $(System.DeviceSaves.VarableDynamic.data).find(
							System.DeviceSaves.OpenDataSheet.imageCache.ConstantStatic.SHEET_WRAPPER + 
							'.' + 
							System.DeviceSaves.OpenDataSheet.imageCache.ConstantStatic.SHEET_NAME
						)[0].getElementsByTagName('li');
					}
				}
			}
		}
		
	};
	/**
	!專案任務函數集.
	*/
	var Task = {
		operatorBubbleModual:null/*接線生的通訊框模板*/,
		guestBubbleModual:null/*使用者的通訊框模板*/,
		chatPoolModual:null/*通訊池模板*/,
		speakBarModual:null/*發話模組模板*/,
		listLabelModual:null/*左側選單使用者標籤模版*/,
		multiKey:{13:false , 16:false}/*組合鍵管理用參數13 = Enter , 16 = Shift*/,
		/**
		!被動建構子.
		*/
		init:function(user) {
			//初始化一些會用的到的介面物件 begin
			Task.operatorBubbleModual = System.UI.createCloneBubble(''/*使用者名稱先不設定*/ , Task.scodeWrapperId.ID_COPY_OPERATOR_BUBBLE);/*接線生泡泡框參照*/
			Task.guestBubbleModual = System.UI.createCloneBubble(''/*使用者名稱先不設定*/ , Task.scodeWrapperId.ID_COPY_USER_BUBBLE);/*使用者泡泡框參照*/
			Task.chatPoolModual = System.UI.createChatPool('' , Task.scodeWrapperId.ID_COPY_CHAT_POOL);/*通訊池模組參照*/
			Task.speakBarModual = System.UI.createSpeakBar('' , Task.scodeWrapperId.ID_COPY_CHAT_SPEAK_BAR);/*發話功能模組參照*/
			Task.listLabelModual = System.UI.createListItem('' , Task.scodeWrapperId.ID_COPY_USER_LIST_ITEM);/*使用者清單模組參照*/
			//初始化一些會用的到的介面物件 end
			if(user && IsFirstTimeAuthStateChange){
				//console.log('firebase 跳過第一次的StateChange');
				IsFirstTimeAuthStateChange = false;//不再是第一次的StateChange
				IsAnonymous = user.IsAnonymous;//是否為匿名使用者
				Uid = user.Uid;//取得使用者ID
				OperatorRef = MyFireBase.database().ref(FireBase.VarableDynamic.operatorsRefPath)/*取得操作員(目前是單人)*/;
				OperatorRef.update(ConnectedConfig);//連線設定
				OperatorRef.onDisconnect().update(DisConnectedConfig);//斷線設定
				ChatsGroupRef = firebase.database().ref(FireBase.VarableDynamic.chatsRefPath)/*取得客戶(群組)*/;
				ChatsGroupRef.orderByChild('C_ID').equalTo(FireBase.VarableDynamic.cid).once(FireBase.ConstantStatic.VALUE, Task.userHistoryDataInit)/*註冊第一次取得資料的處理事件*/;
				ChatsGroupRef.orderByChild('C_ID').equalTo(FireBase.VarableDynamic.cid).limitToLast(1).on(FireBase.ConstantStatic.CHILD_ADDED, Task.userRealTimeDateUpdate)/*註冊資料即時更新的處理事件*/;
			}
		}
		,
		/**
		!文字訊息腳本.
		*/
		textScripts:{
			CAN_NOT_FIND_USER_TO_CHANGE:'找不到使用者別名,無法變更.',
			CAN_NOT_FIND_USER_TO_WORKING:'找不到使用者別名,程式中斷.',
			DISALLOWED_WORDS_COUNTING_TO_POST:'文字量過長,需少於100 字.',
			DISALLOWED_CONTENT_TO_POST:'輸入不正常的內容.',
			DISALLOWED_EMPTY_TO_POST:'沒有輸入有效文字.',
			SELECTED_IMAGE_SIZE_ERROR:['選取圖檔大小錯誤.' , '選取圖檔大小不能超過' , 'Mb, 目前所選圖檔為' , 'Mb.'],
			SELECTED_IMAGE_FORMAT_ERROR:['選取圖檔格式錯誤.' , ' 檔案格式限 [' , '] 以上種類.'],
			SELECTED_IMAGE_DIMENSION_ERROR:['選取圖檔尺寸錯誤.' , '圖檔寬度不能小於' , '圖檔高度不能小於' , '圖檔寬度不能大於' , '圖檔高度不能大於'],
			SELECTED_IMAGE_CAN_SEND:'送出這張圖檔?',
			IMAGE_UPLOAD_FAILURE:['圖檔上傳失敗.' , '圖檔未上傳成功,請檢查您的網路連線品質.' , '錯誤碼:']

		}
		,
		/**
		!樣版HTML 片段id 字串集.
		*/
		scodeWrapperId:{
			ID_COPY_USER_BUBBLE:'ui-copy-user-bubble',
			ID_COPY_OPERATOR_BUBBLE:'ui-copy-operator-bubble',
			ID_COPY_USER_LIST_ITEM:'ui-copy-user-list-item',
			ID_COPY_USER_LIST_ITEM_DIVIDER:'ui-copy-user-list-item-divider',
			ID_COPY_CHAT_POOL:'ui-copy-chat-pool',
			ID_COPY_CHAT_SPEAK_BAR:'ui-copy-chat-speak-bar',
			ID_COPY_GRAPHIC_MEDIA:'ui-copy-graphic-media',
			ID_COPY_STICKER_MEDIA:'ui-copy-sticker-media',
			ID_COPY_VIDEO_MEDIA:'ui-copy-video-media',
			ID_COPY_AUDIO_MEDIA:'ui-copy-audio-media',
			ID_COPY_TEXT_MEDIA:'ui-copy-text-media',
			ID_COPY_CONFIRM_WINDOW:'ui-copy-confirm-window',
			ID_COPY_TEXT_SCRIPTS:'ui-copy-texts'
			
		}
		,
		/**
		!firebase 建立連線時監聽錯誤的call back 函數.
		>error Object|firebase 擲出的錯誤事件內容.
		*/
		errorCatch:function(error) {
			if(System.ConstantStatic.ALLOW_CONSOLE == true)console.log('firebase signInAnonymously().catch:');
			for(var i in error){
				console.log(i + ' = ' + error[i]);
			}
		}
		,
		/**
		!格式化使用者的基本資料模型.
		>_key String|使用者辨識id
		>_displayName String|使用者的顯示名稱.
		>_picUrl String|使用者頭像圖檔URL.
		@回傳 Object|物件.
		*/
		getGuestBasicDataTemplate:function(_key , _displayName , _picUrl){
			var beg = Math.floor(_key.length/8*Math.random());
			var end = Math.floor(_key.length/2*Math.random()) + 1;
			var tmp = _key.substring(beg , beg + end);
			tmp = DerAngma.folk(DerAngma.road({key:'chiliman production' , subKey:'Jeff Wu & Derek Skins'} , new Date().getTime() + tmp));
			var _obj = {
				id:_key/*來自JSON 的使用者辨識id*/,
				alternativeName:tmp/*用於HTML 內的辨識名*/,
				chatNodesArray:[]/*所有的通訊內容*/,
				thumbnailUrl:_picUrl/*頭像圖檔*/,
				guestName:_displayName/*顯示的人名*/,
				pool:null/*這個使用者的通訊池HTML 參照*/,
				bar:null/*這個使用者的發話列HTML 參照*/,
				list:null/*這個使用者在通訊清單的HTML 參照*/,
				visible:false/*是否切換到可視狀態*/,
				unRead:0/*未讀訊息數*/,
				perfectScrollBar:null/*PerfectScrollbar 的參照,選擇性產生*/,
			};
			return _obj;
		}
		,
		/**
		!在使用者來自後端的JSON 物件內,加入來自前端擴充的描述物件.
		>_streamObj Object|使用者來自後端的JSON 物件.
		@回傳 Object|物件.
		*/
		appendGuestExtendsData:function(_streamObj){
			_streamObj.frontExtends = {
				chatPoolIndex:null/*對話在所屬通訊池內的序列*/
				
			};
			_streamObj.message.frontExtends = {
				bubble:null/*訊息在通訊池內的HTML 參照*/
			};
			return _streamObj;
		}
		,
		/**
		!將使用者來自後端的JSON 物件,加入到AllGuests_ary 陣列內,並同時按照使用者進行分類.
		>_streamObj Object|使用者來自後端的單筆通訊內容(JSON).
		*/
		parseFireBaseDataToAllGuest:function(_streamObj){
			var guestData , chk;
//			chk = System.Utility.isValueInArray(AllGuests_ary , 'id' , _streamObj.CLIENT_ID);//尋找使用者是否已經存在AllGuests_ary 內?
//			if(chk == -1){//不曾存在,AllGuests_ary 產生一個新的元素代表該使用者
//				AllGuests_ary.push(Task.getGuestBasicDataTemplate(
//					_streamObj.CLIENT_ID , 
//					_streamObj.DISPLAYNAME , 
//					_streamObj.PICTURE
//				));
//				guestData = AllGuests_ary[AllGuests_ary.length - 1];//該使用者沒有產生過,新建立一個使用者
//			} else {//已經存在,挑選出AllGuests_ary 用來儲存該使用者的元素
//				guestData = AllGuests_ary[chk];//已存在的使用者
//			}
//			if(_streamObj.TYPE == 'user' && _streamObj.DISPLAYNAME != undefined){//若通訊內容身份是使用者,先針對使用者檢查是否有使用者存在,選出要加入資料的使用者
//				guestData.thumbnailUrl = _streamObj.PICTURE;//隨JSON 內容持續更新使用者頭像圖檔,同步來自使用者的最新狀態
//				guestData.guestName = _streamObj.DISPLAYNAME;//隨JSON 內容持續更新使用者顯示名稱,同步來自使用者的最新狀態
//			} else if(_streamObj.TYPE == 'operator' && _streamObj.DISPLAYNAME != undefined){//若通訊內容身份是接線生時
//				//看有無_streamObj.PICTURE 與_streamObj.DISPLAYNAME 兩個屬性可以更新??
//				console.log(_streamObj);
//			}
//			_streamObj.frontExtends.chatPoolIndex = guestData.chatNodesArray.length;//對話資料在對話池中的id
//			guestData.chatNodesArray.push(_streamObj);//加入使用者對話資料
			
			
			if(_streamObj.TYPE == 'user' && _streamObj.DISPLAYNAME != undefined){//若通訊內容身份是使用者,先針對使用者檢查是否有使用者存在,選出要加入資料的使用者
				chk = System.Utility.isValueInArray(AllGuests_ary , 'id' , _streamObj.CLIENT_ID);//尋找使用者是否已經存在AllGuests_ary 內?
				if(chk == -1){//不曾存在,AllGuests_ary 產生一個新的元素代表該使用者
					AllGuests_ary.push(Task.getGuestBasicDataTemplate(
						_streamObj.CLIENT_ID , 
						_streamObj.DISPLAYNAME , 
						_streamObj.PICTURE
					));
					guestData = AllGuests_ary[AllGuests_ary.length - 1];//該使用者沒有產生過,新建立一個使用者
				} else {//已經存在,挑選出AllGuests_ary 用來儲存該使用者的元素
					guestData = AllGuests_ary[chk];//已存在的使用者
					guestData.thumbnailUrl = _streamObj.PICTURE;//隨JSON 內容持續更新使用者頭像圖檔,同步來自使用者的最新狀態
					guestData.guestName = _streamObj.DISPLAYNAME;//隨JSON 內容持續更新使用者顯示名稱,同步來自使用者的最新狀態
				}
				
				_streamObj.frontExtends.chatPoolIndex = guestData.chatNodesArray.length;//對話資料在對話池中的id
				//if(_streamObj.message.type.toUpperCase() == 'IMAGE') _streamObj.message.fileUrl = fuckImage();
				guestData.chatNodesArray.push(_streamObj);//加入使用者對話資料
			} else if(_streamObj.TYPE == 'operator' && _streamObj.DISPLAYNAME != undefined){//若通訊內容身份是接線生時
				/*
				2019/07/26 因某些案例有可能JSON 不是從第一筆輸出,而是某個條件篩選過,例如從一個月前到今天,
				此時接到的_streamObj 可能正好會是接線生的訊息(_streamObj.TYPE == 'operator' && _streamObj.DISPLAYNAME != undefined).
				因此在這邊新增處於這種情形時,依樣將傳送的_streamObj 建立為一個新的使用者.
				*/
				chk = System.Utility.isValueInArray(AllGuests_ary , 'id' , _streamObj.CLIENT_ID);//尋找使用者是否已經存在AllGuests_ary 內?
				if(chk == -1){//不曾存在,AllGuests_ary 產生一個新的元素代表該使用者
					AllGuests_ary.push(Task.getGuestBasicDataTemplate(
						_streamObj.CLIENT_ID ,
						_streamObj.DISPLAYNAME ,
						_streamObj.PICTURE
					));
					guestData = AllGuests_ary[AllGuests_ary.length - 1];//該使用者沒有產生過,新建立一個使用者
					guestData.chatNodesArray.push(_streamObj);//加入operator對話資料
				} else {
					guestData = AllGuests_ary[chk];//已存在的使用者
					_streamObj.frontExtends.chatPoolIndex = guestData.chatNodesArray.length;//對話資料在對話池中的id
					//if(_streamObj.message.type.toUpperCase() == 'IMAGE') _streamObj.message.fileUrl = fuckImage();
					guestData.chatNodesArray.push(_streamObj);//加入operator對話資料
				}
			
			
			
				/*
				chk = System.Utility.isValueInArray(AllGuests_ary , 'id' , _streamObj.CLIENT_ID);//尋找使用者是否已經存在AllGuests_ary 內?
				guestData = AllGuests_ary[chk];//已存在的使用者
				_streamObj.frontExtends.chatPoolIndex = guestData.chatNodesArray.length;//對話資料在對話池中的id
				//if(_streamObj.message.type.toUpperCase() == 'IMAGE') _streamObj.message.fileUrl = fuckImage();
				guestData.chatNodesArray.push(_streamObj);//加入operator對話資料
				*/
			}

		}
		,
		/**
		!產生對話框的內容.
		>_bubbleDom HTML DOM|對話框的參照.
		>_prop Object|要寫入對話框的內容,包含文字,圖片,音訊,影片...{contentType:對話的內容形態|String 目前有text,audio,video,image , content:對話的內容|String 若不是文字對話,則是多媒體檔的URL}
		@回傳 HTML DOM|對話框的參照.
		*/
		bubbleContentGenerator:function(_bubbleDom , _prop){
/*使用者
<div class="row flex-nowrap message-row contact p-4">
<input type="hidden" name="userName" value />
<input type="hidden" name="index" value />
<img class="avatar mr-4" src="">
<div class="bubble">
	<div class="message" style="position:relative;"><button type="button" style="border:none; background:transparent; cursor:pointer; display:block;"></button></div>
	<div class="time text-muted text-right mt-2"></div>
</div>
</div>
*/
/*接線生
<div class="row flex-nowrap message-row user p-4">
<input type="hidden" name="operatorName" value />
<input type="hidden" name="index" value />
<div class="bubble">
	<div class="message"><button type="button" style="border:none; background:transparent; cursor:pointer; display:block;"></button></div>
	<div class="time text-muted text-right mt-2">11/14/2018, 8:52:33 PM</div>
</div>
</div>
*/
			var tmp , _src , _playBtn , policy , tmpEventId;//付費狀態
			_playBtn = $(_bubbleDom).find('.message button')[0];
			if(_prop.contentType.toUpperCase() == 'TEXT'){
				_prop.content = _prop.content.split('\n').join('<br>');
				tmp = System.UI.convertScodeToDOM(System.UI.getTemplate(Task.scodeWrapperId.ID_COPY_TEXT_MEDIA));
				$(tmp).html(_prop.content);
				$(_playBtn).remove();//擴充功能用的按鈕先移除
			} else if(_prop.contentType.toUpperCase() == 'VIDEO'){
				tmp = null;
				System.Event.addEventListener(_playBtn , System.EventTypes.ConstantStatic.CLICK , Task.BehaviorHandler.openMedia , false);
				$(_playBtn).attr('data-rel' , _prop.content).attr('data-type' , 'video').addClass('playVideoBtn');
			} else if(_prop.contentType.toUpperCase() == 'AUDIO'){
				tmp = null;
				System.Event.addEventListener(_playBtn , System.EventTypes.ConstantStatic.CLICK , Task.BehaviorHandler.openMedia , false);
				$(_playBtn).attr('data-rel' , _prop.content).attr('data-type' , 'audio').addClass('playAudioBtn');
			} else if(_prop.contentType.toUpperCase() == 'IMAGE'){
				tmp = System.UI.convertScodeToDOM(System.UI.getTemplate(Task.scodeWrapperId.ID_COPY_GRAPHIC_MEDIA))[0];//跳脫
				_src = System.Graphic.getContext(_prop.content/*此時_prop.content 是圖檔的URL*/);
				if(_src == _prop.content){//沒有Base64 的暫存
					$(tmp).attr('data-source-url' , '');//原始網址保留為空字串作為判斷這個<img> 沒有使用本地端base 64 內容
					tmp = System.Graphic.setToImageLazyloadMode(tmp , _prop.content);//設定為準備執行lazyLoad 模式的<img>
					if(System.ConstantStatic.ALLOW_CONSOLE == true)console.log(_prop.content + ' 沒有Base64 的暫存');
				} else {//有Base64 的暫存
					$(tmp).attr('data-source-url' , _prop.content);//寫入原始網址
					$(tmp).attr('src' , _src);//此時_src 是圖檔的base64 字串
					if(System.ConstantStatic.ALLOW_CONSOLE == true)console.log(_prop.content + ' 有Base64 的暫存');
				}
				System.Event.addEventListener(_playBtn , System.EventTypes.ConstantStatic.CLICK , Task.BehaviorHandler.openImage , false);
				$(_playBtn).addClass('downloadBtn');
			} else if(_prop.contentType.toUpperCase() == 'STICKER'){
				tmp = System.UI.convertScodeToDOM(System.UI.getTemplate(Task.scodeWrapperId.ID_COPY_STICKER_MEDIA))[0];//跳脫
				tmpEventId = System.Event.addEventListener(tmp , System.EventTypes.ConstantStatic.LOAD , System.EventHandler.afterPoolImageLoaded , false);//圖檔載入後更新通訊池捲動高度事件
				$(tmp).attr('auto-remove-event-id' , tmpEventId);//設定圖檔的載入後更新捲動高度事件,永遠只執行一次
				$(tmp).attr('src' , _prop.content);//此時_prop.content 是網路貼圖圖檔的URL
				$(_playBtn).addClass('off');
			}
			if(tmp != null) $(_bubbleDom).find('.message').append(tmp);
			return _bubbleDom;
		}
		,
		/**
		!變更使用者.
		>_altName String|使用者的別名.
		>_isAnimated Boolean|是否對通訊池,使用者列表...等切換時啟用動畫效果.
		*/
		changeGuest:function(_altName , _isAnimated){
			var tmp = System.Utility.isValueInArray(AllGuests_ary , 'alternativeName' , _altName);
			if(tmp == -1) {
				alert(Task.textScripts.CAN_NOT_FIND_USER_TO_CHANGE);
				return;
			}
			var dataItem = AllGuests_ary[tmp];//取得要變更的通話使用者的資料
			var _pool_ary = [];
			var _list_ary = [];
			var _bar_ary = [];
			AllGuests_ary[tmp].visible = true;//設定進入可視狀態
			AllGuests_ary[tmp].unRead = 0;//只要進入可視就把未讀訊息數量歸零
			for(var i = 0;i<AllGuests_ary.length;i++){
				if(AllGuests_ary[i].pool != dataItem.pool) _pool_ary.push(AllGuests_ary[i].pool);
				if(AllGuests_ary[i].list != dataItem.list) _list_ary.push(AllGuests_ary[i].list);
				if(AllGuests_ary[i].bar != dataItem.bar) _bar_ary.push(AllGuests_ary[i].bar);
				if(AllGuests_ary[i] != AllGuests_ary[tmp]) AllGuests_ary[i].visible = false;//設定進入不可視狀態
			}
			System.UI.pauseMediasInPool(_pool_ary);
			System.UI.switchCurrentGuestInList(dataItem.list , _list_ary , _isAnimated);
			System.UI.switchGuestPool(dataItem.pool , _pool_ary);
			System.UI.updateLazyLoadImage(dataItem.pool , _pool_ary);
			System.UI.switchGuestBar(dataItem.bar , _bar_ary);
			System.UI.updateToolBarIcon($(dataItem.list).find('img.avatar').clone()[0] , dataItem.guestName);
			CurrentGuest = _altName;//變更目前通話的使用者別名
			if($('div.fuse-bar-backdrop').length == 1){//在窄螢幕環境下,有開啟側選單,切換完使用者後將側選單回復原位
				$('aside.left-sidebar').removeClass('fuse-bar-open').addClass('fuse-bar-closed').css({transform:''});//側選單回復原狀
				setTimeout(
					function(){
						$('div.fuse-bar-backdrop').fadeOut(function(){$(this).remove();});//移除半透明黑色背景
					}
					,
					300
				);
			}
		}
		,
		/**
		!檢查即將發送的訊息是否真的可以發送,例如若都只有Enter 就不可發送.
		>_c String|發送的字串.
		@回傳 Number|0 正常.
		@回傳 Striong|錯誤原因.
		*/
		checkContentCanPost:function(_c){
			if(_c == '') return '';
			if(_c.length > 100) return Task.textScripts.DISALLOWED_WORDS_COUNTING_TO_POST;
			var isBreakInFirst = false;//第一個文字是折行
			var isAllSpace = false;//連續英文空白
			var isAllCharSpace = false;//連續中文空白
			var charLength = _c.length;
			var count = 0;
			if(_c.charAt(0) == '\n' && charLength == 2) isBreakInFirst = true;
			if(_c.charAt(0) == '\r' && charLength == 2) isBreakInFirst = true;
			//console.log(_c + ' / ' + _c.length)
			for(var i = 0;i<_c.length;i++){
				if(_c.charAt(i) == ' ' || _c.charAt(i) == '\n') {//連續英文空白 + 折行
					count += 1;
				}
			}
			//console.log(count + ' / ' + charLength);
			if(count == charLength) isAllSpace = true;
			count = 0;
			for(var i = 0;i<_c.length;i++){//連續中文空白 + 折行
				if(_c.charAt(i) == '　' || _c.charAt(i) == '\n') {
					count += 1;
				}
			}
			//console.log(count + ' / ' + charLength);
			if(count == charLength) isAllCharSpace = true;
			if(isBreakInFirst == true || isAllSpace == true || isAllCharSpace == true){
				return Task.textScripts.DISALLOWED_CONTENT_TO_POST;//表示字串內都是折行或其他可能原因
			} else {
				return 0;
			}
		}
		,
		/**
		!計算單一使用者訊息時間比該訊息中接線生的最後一則訊息的數量(未讀訊息數量)
		>_ary Array|訊息資料.
		>_lastTimeReference Number|UTC 時間.
		@回傳 Number|被認定是未讀的訊息量.
		*/
		countUnReads:function(_ary , _lastTimeReference){
			var _msg;
			var unreads = 0;
			for(var i = 0;i<_ary.length;i++){
				_msg = _ary[i];
				if(_msg.TIME > _lastTimeReference) unreads += 1;
			}
			return unreads;
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
			fileReader.addEventListener(System.EventTypes.ConstantStatic.LOAD , fileReaderLoadedTask , false);
			fileReader.readAsDataURL(_file);
		}
		,
		/**
		!重新產生一個<input type="file"> 代替舊有的作為重設其值的手段.
		>_input HTML Object|要被代替的<input type="file">.
		*/
		regenerateFileUploadInput:function(_input){
			var _p = _input.parentElement;
			var scode = _p.innerHTML;
			System.Event.removeEachEventListener(_input);//解除事件
			$(_input).remove();//移除舊的
			_p.innerHTML = scode;//寫入新的
			$(_p).find('input').removeAttr('system-event-reg');//移除舊的註冊事件管理屬性
			System.Event.addEventListener(
				$(_p).find('input')[0] , 
				System.EventTypes.ConstantStatic.FILE_SELECT_CHANGE , 
				Task.BehaviorHandler.fileUploadInput
			);//重新註冊事件
		}
		,
		/**
		!開啟詢問畫面.
		>_title String|詢問標題.
		>_content String , HTML DOM|詢問內容.
		>_whenDown Function|當按下確定的callback.
		>_whenDiscard Function|當按下取消的callback.
		*/
		openConfirmModal:function(_title , _content , _whenDown , _whenDiscard){
			var _confirm = System.UI.convertScodeToDOM(System.UI.getTemplate(Task.scodeWrapperId.ID_COPY_CONFIRM_WINDOW));
			$(_confirm).find('.confirm-title').text(_title);
			$(_confirm).find('.confirm-content').append(_content);
			$(_confirm).find('.discardBtn').on('click' , function(){
				$.fancybox.close();
			});
			if(_whenDown != undefined){
				$(_confirm).find('.doneBtn').on('click' , _whenDown).on('click' , function(){
					$.fancybox.close();
				});
			} else {
				$(_confirm).find('.doneBtn').hide();
			}
			if(_whenDiscard != undefined){
				$(_confirm).find('.discardBtn').on('click' , _whenDiscard).on('click' , function(){
					$.fancybox.close();
				});
			} else {
				$(_confirm).find('.discardBtn').hide();
			}
			$.fancybox.open({
				src  : _confirm,
				type : 'inline',
				opts : {
					modal: true
				}
			});
		}
		,
		/**
		!事件監聽函數集.
		*/
		BehaviorHandler:{
			/**
			!對話框中的內容為多媒體的image 形態時的Event Handler.此時開啟大圖會有多種狀況:1.圖檔使用本地端base64 內容,需先下載原始圖檔再開啟.2.圖檔是遠端圖檔,該圖檔以Base64 副本方式開啟.
			*/
			openImage:function(e){
				var _t = e.currentTarget;
				var e , _base64ImgCopy , fancyOpts , tmp;
				var _img = $(_t.parentElement).find('img')[0];//跳脫,通訊框中目前的圖檔<img>
				var createBase64Copy = function(_currentImg , insertAfterElement){
					var b64 = System.Graphic.getBase64Data(_currentImg , _currentImg.naturalWidth , _currentImg.naturalHeight);
					if(b64 == ''){
						return false;
					} else {
						$($(document.createElement('SCRIPT')).attr('language' , 'javascript').attr('type' , 'text/template').html(b64)).insertAfter(insertAfterElement);//以base64 保留副本
						return true;
					}
					
				};
				if($(_t.parentElement).find('script').length == 1){//如果產生過Base64 副本
					_base64ImgCopy = $(_t.parentElement).find('script').html();
					fancyOpts = {};
				} else {
					
					if($(_img).attr('data-source-url') != ''){//使用本地端Base64 內容(小圖)
						_base64ImgCopy = $(_img).attr('data-source-url').addClass('imageOpenInFancy');
						fancyOpts = {
							afterShow : function( instance, current ) {
								var tmp = createBase64Copy(current.$image[0] , _img);
							}
						};
					} else {//使用遠端圖檔中
						tmp = createBase64Copy(_img , _img);//產生Base64 字串副本
						if(tmp == true){
							_base64ImgCopy = $(_t.parentElement).find('script').html();
						} else {//CORs 不允許
							_base64ImgCopy = $(_img).attr('src');
							$.fancybox.open($(_img).clone().removeAttr('class').removeAttr('style').addClass('imageOpenInFancy'));
							return;//直接中斷
						}
					}
				}
				$.fancybox.open({
					src  : _base64ImgCopy,
					opts : fancyOpts
				});
				
			}
			,
			/**
			!對話框中的內容為多媒體的video或audio 形態時的Event Handler.
			*/
			openMedia:function(e){
				var _t = e.currentTarget;
				var e , scode;
				if($(_t).attr('data-type') == 'video'){
					scode = System.UI.getTemplate(Task.scodeWrapperId.ID_COPY_VIDEO_MEDIA);
				} else if($(_t).attr('data-type') == 'audio'){
					scode = System.UI.getTemplate(Task.scodeWrapperId.ID_COPY_AUDIO_MEDIA);
				}
				e = System.UI.convertScodeToDOM(scode);
				$(e).find('source').attr('src' , $(_t).attr('data-rel'));
				$(_t.parentElement).append(e);
				$(_t).remove();
			}
			,
			/**
			!通訊清單中的使用者標籤的Event Handler.
			*/
			labelItemBtn:function(e){
				var _t = e.currentTarget;
				Task.changeGuest($(_t.parentElement).find('input[name="userName"]').val() , false);
			}
			,
			/**
			!使用者的通訊功能列發話按鈕的Event Handler.
			*/
			speakBarBtn:function(e){
				var _t = e.currentTarget;
				var _altName = $(_t).closest('.reply-form').find('input[name="userName"]').val();
				var tmp = System.Utility.isValueInArray(AllGuests_ary , 'alternativeName' , _altName);
				if(tmp == -1) {
					alert(Task.textScripts.CAN_NOT_FIND_USER_TO_WORKING);
					return;
				}
				var guest = AllGuests_ary[tmp];
				var postText = $(guest.bar).find('textarea').eq(0).val();
				var chk = Task.checkContentCanPost(postText);
				if(String(chk) == '0'){
					//觸發擴充事件 begin
					System.ApiEventFiresMethod.fireContentExitPool(guest.id , $(guest.bar).find('textarea').eq(0)[0] , postText);//System.ApiEventTypes.ConstantStatic.CONTENT_EXIT_POOL
					//觸發擴充事件 end
					FireBase.NetBridge.operatorPostData(
						guest.id,
						postText
					);//對firebase 送出訊息
					$(guest.bar).find('textarea').eq(0).val('');
					for(var i in Task.multiKey){
						Task.multiKey[i] = false;
					}
				} else {
					if(String(chk) == '') {
						$(_t.parentElement).find('.form-group > .form-control').attr('placeholder' , Task.textScripts.DISALLOWED_EMPTY_TO_POST);
						return;
					};
					if(String(chk) != '0' && String(chk) != '') {
						$(AllGuests_ary[tmp].bar).find('textarea').eq(0).val('');//清空
						alert(chk);
						return;
					}
				}
				
				
			}
			,
			/**
			!使用者的通訊功能列輸入欄位的Event Handler,涵蓋檢查shift + enter 的組合鍵.若疑似在桌機以外場合使用,關閉Enter 的發送功能.
			*/
			speakBarInput:function(e){
				var _t = e.currentTarget;
				var _altName = $(_t).closest('.reply-form').find('input[name="userName"]').val();
				var tmp = System.Utility.isValueInArray(AllGuests_ary , 'alternativeName' , _altName);
				var postText , chk;
				var disableEnterKey = ($('aside.left-sidebar').css('position') != 'relative') ? true : false/*可能是在桌以外裝置上使用,停用Enter 的發送*/;
				var resetShiftEnter = function(){
					for(var i in Task.multiKey){
						Task.multiKey[i] = false;
					}
				};

				if(tmp == -1) {
					alert(Task.textScripts.CAN_NOT_FIND_USER_TO_WORKING);
					return;
				}
				if(disableEnterKey == true) return;
				for(var i in Task.multiKey){
					if(i == String(e.keyCode)) Task.multiKey[e.keyCode] = true;//將Enter 或Shift 標記為已按下
				}
				
				if(Task.multiKey['13'] == true/*enter按下*/ && Task.multiKey['16'] == false/*shift沒有按下*/){//送出文字
					postText = $(AllGuests_ary[tmp].bar).find('textarea').eq(0).val();
					postText = postText.substring(0 , postText.lastIndexOf('\n'));//有可能因為keyup 事件的關係,此時的文字有可能最後一個字元是折行,移除最後一個Enter
					chk = Task.checkContentCanPost(postText);
					
					if(String(chk) == '0'){
						//觸發擴充事件 begin
						System.ApiEventFiresMethod.fireContentExitPool(AllGuests_ary[tmp].id , $(AllGuests_ary[tmp].bar).find('textarea').eq(0)[0] , postText);//System.ApiEventTypes.ConstantStatic.CONTENT_EXIT_POOL
						//觸發擴充事件 end
						FireBase.NetBridge.operatorPostData(
							AllGuests_ary[tmp].id,
							postText
						);//對firebase 送出訊息
						$(AllGuests_ary[tmp].bar).find('textarea').eq(0).val('');//清空
						
						if(e.keyCode == 13) resetShiftEnter();//只要有按過enter 就重設組合鍵檢查參數
					} else {
						if(e.keyCode == 13) resetShiftEnter();//只要有按過enter 就重設組合鍵檢查參數
						if(String(chk) == '') {
							return;
						}
						if(String(chk) != '0' && String(chk) != '') {
							$(AllGuests_ary[tmp].bar).find('textarea').eq(0).val('');//清空
							alert(chk);
							return;
						}
					}
					
				}
				if(e.keyCode == 13) resetShiftEnter();//只要有按過enter 就重設組合鍵檢查參數
					
				
			}
			,
			/**
			!接線生選取圖檔發送的Event Handler.
			*/
			fileUploadInput:function(e){
				var _t = e.target;
				var _altName = $(_t).closest('.reply-form').find('input[name="userName"]').val();
				var tmp = System.Utility.isValueInArray(AllGuests_ary , 'alternativeName' , _altName);
				if(tmp == -1) {
					alert(Task.textScripts.CAN_NOT_FIND_USER_TO_WORKING);
					return;
				}
				var guest = AllGuests_ary[tmp];
				var _file = _t.files[0];
				var maxLength = Number($(_t).attr('data-file-max-length'));
				var fileFilterAry = $(_t).attr('data-file-filter').split('|');
				var maxWidth = Number($(_t).attr('data-file-max-width'));
				var maxHeight = Number($(_t).attr('data-file-max-height'));
				var minWidth = Number($(_t).attr('data-file-min-width'));
				var minHeight = Number($(_t).attr('data-file-min-height'));
				var chk , testImg;
				var _type = _file.type;
				
				
				/*
				console.log(_type);
				console.log('maxLength = ' + maxLength);
				console.log('fileFilterAry = ' + fileFilterAry.toString());
				console.log('maxWidth = ' + maxWidth);
				console.log('maxHeight = ' + maxHeight);
				console.log('minWidth = ' + minWidth);
				console.log('minHeight = ' + minHeight);
				*/
				//-- 檢查位元數 begin
				if(_file.size > maxLength){//檔案位元過大
					Task.openConfirmModal(
						Task.textScripts.SELECTED_IMAGE_SIZE_ERROR[0] 
						, 
						'<p>' + Task.textScripts.SELECTED_IMAGE_SIZE_ERROR[1] + 
						(Math.floor((maxLength/1024/1024)*100)/100) + 
						Task.textScripts.SELECTED_IMAGE_SIZE_ERROR[2] + 
						(Math.floor((_file.size/1024/1024)*100)/100) + 
						Task.textScripts.SELECTED_IMAGE_SIZE_ERROR[3] + '</p>'
						,
						function(){/*只用確定按鈕*/}
					);
					Task.regenerateFileUploadInput(_t);//重製<input type="file">
					return;
				}
				//-- 檢查位元數 end
				
				//-- 檢查格式 begin
				chk = false;
				fileFilterAry.forEach(function(data , index){//過率檔案格式
					if(_type.toUpperCase().indexOf(data) > -1){
						chk = true;
						return;
					}
				});
				if(chk == false){//檔案格式錯誤
					Task.openConfirmModal(
						Task.textScripts.SELECTED_IMAGE_FORMAT_ERROR[0]
						, 
						'<p>' + _file.name + '(' + _file.type + ')' + Task.textScripts.SELECTED_IMAGE_FORMAT_ERROR[1] + 
						fileFilterAry.toString() + Task.textScripts.SELECTED_IMAGE_FORMAT_ERROR[2] + '</p>'
						,
						function(){/*只用確定按鈕*/}
					);
					Task.regenerateFileUploadInput(_t);//重製<input type="file">
					return;
				}
				//-- 檢查格式 end
				
				//-- 檢查實體寬高 begin
				testImg = document.createElement('IMG');
				testImg.addEventListener(System.EventTypes.ConstantStatic.LOAD , function(e){
					var _str = '';
					var v_ary = [
						[testImg.naturalWidth < minWidth , Task.textScripts.SELECTED_IMAGE_DIMENSION_ERROR[1] + minWidth + ' 像素.'],
						[testImg.naturalHeight < minHeight , Task.textScripts.SELECTED_IMAGE_DIMENSION_ERROR[2] + minHeight + ' 像素.'],
						[testImg.naturalWidth > maxWidth , Task.textScripts.SELECTED_IMAGE_DIMENSION_ERROR[3] + maxWidth + ' 像素.'],
						[testImg.naturalHeight > maxHeight , Task.textScripts.SELECTED_IMAGE_DIMENSION_ERROR[4] + maxHeight + ' 像素.']
					];
					
					v_ary.forEach(function(data , i){
						if(data[0] == true) _str += data[1] + '<br>';
					});
					
					if(_str != ''){//檔案尺寸錯誤
						Task.openConfirmModal(
							Task.textScripts.SELECTED_IMAGE_DIMENSION_ERROR[0]
							, 
							'<p>' + _str + '</p>'
							,
							function(){/*只用確定按鈕*/}
						);
						Task.regenerateFileUploadInput(_t);//重製<input type="file">
					} else {
						Task.openConfirmModal(
							Task.textScripts.SELECTED_IMAGE_CAN_SEND
							, 
							$(testImg).addClass('previewSize')
							,
							function(){/*確定按鈕*/
								//觸發擴充事件 begin
								System.ApiEventFiresMethod.fireImageFileExitPool(guest.id , _t , $(testImg).attr('src'));//System.ApiEventTypes.ConstantStatic.IMAGE_FILE_EXIT_POOL
								//觸發擴充事件 end
								FireBase.NetBridge.operatorPostImageFile(guest.id , _t.files[0]);
								Task.regenerateFileUploadInput(_t);
							},
							function(){/*取消按鈕*/
								Task.regenerateFileUploadInput(_t);
							}
						);
					}
					
				} , false);//透過圖檔的onload 事件檢查圖檔的真實尺寸
				Task.setNewBase64Image(_file , testImg , function(){});//取得選取檔案的Base64 內容並寫入載入圖檔的<img> 內等待其onload 事件
				//-- 檢查實體寬高 end
			}
			,
			/**
			!使用者的通訊池的Event Handler.
			*/
			chatPool:function(e){
				var _t = e.currentTarget;
				var altName = $(_t).find('input[name="userName"]').val();
				//console.log(altName);
			}
			,
			/*
			!在送出通訊內容時觸發啟動監控通訊池的函數.
			*/
			startAutoScroll:function(e){
				if(System.UI.VarableDynamic.poolNodeLengthInterval == null) System.EventWatchMen.poolNodeLengthChange();//開始監控通訊池內對話框數量
				$('textarea[auto-remove-event-id] , button[auto-remove-event-id]').each(function(){
					System.Event.removeEventListener($(this).attr('auto-remove-event-id'));
					$(this).removeAttr('auto-remove-event-id');
				});
			}
		}
		,
		/**
		!封裝函數集.
		*/
		EncapsulationMethod:{
			/**
			!封裝通訊池,發訊模組與左側的使用者清單項目.
			>_prop 要寫入的內容{altName:String|使用者的別名字串 , guestName:String|使用者的顯示名稱 , icon:String|使用者的頭像圖檔URL}
			@回傳 Object|HTML Object 的參照{pool:通訊池 , bar:發訊模組 , label:左側的使用者清單項目}.
			*/
			poolAndBarAndUserListLabel:function(_prop){
				var _pool = $(Task.chatPoolModual).clone();
				var _bar = $(Task.speakBarModual).clone();
				var _userLabel = $(Task.listLabelModual).clone();
				var _fileId = 'pic_' + Math.floor(Math.random() * new Date().getTime() + Math.random() * _prop.altName.length);

				$(_pool).attr('data-allow-update-scroll' , 1);
				$(_userLabel).find('img.avatar').attr('src' , _prop.icon).attr('alt' , _prop.guestName);//通訊清單的頭像
				$(_userLabel).find('span.name').text(_prop.guestName);//通訊清單顯示的人名
				$(_pool).find('input[name="userName"]').val(_prop.altName);//加入別名
				$(_bar).find('input[name="userName"]').val(_prop.altName);//加入別名
				$(_bar).find('input[type="file"]').attr('id' , _fileId);//寫入檔案上傳欄位id
				$(_bar).find('.picturePostBtn').attr('for' , _fileId);//寫入代理檔案上傳欄位label 的for
				$(_userLabel).find('input[name="userName"]').val(_prop.altName);//加入別名
				return {pool:_pool , bar:_bar , label:_userLabel}
			}
			,
			/**
			!封裝使用者或接線生的訊息到網頁.
			>_msg Object|訊息的資料物件.
			>_serial Number|產生的順序索引值.
			>_altName String|該名使用者或接線生的資料別名.
			>_iconFile String|大頭照URL.
			@回傳 Object|傳入的訊息的資料物件.
			*/
			message:function(_msg , _serial , _altName , _iconFile){
				var _bubbleDom;
				var _contentObj = {contentType:_msg.message.type , content:null /*, previewContent:_msg.DISPLAYNAME + ':'*/};
				if(_msg.TYPE == 'operator'){
					_bubbleDom = $(Task.operatorBubbleModual).clone();
				} else if(_msg.TYPE == 'user'){
					_bubbleDom = $(Task.guestBubbleModual).clone();
					$(_bubbleDom).find('img.avatar').attr('src' , _iconFile);
				}
				if(_msg.message.type.toUpperCase() == 'TEXT'){//operator 裡面的text 是Text .... 全部轉大寫來比對
					_contentObj.content = _msg.message.text;
					//_contentObj.previewContent += _msg.message.text
				} if(_msg.message.type.toUpperCase() == 'STICKER'){
					(_msg.message.stickerURL) ? _contentObj.content = _msg.message.stickerURL : _contentObj.content = _msg.message.stickerUrl;//嘗試尋找屬性名稱
					//_contentObj.previewContent += '傳來的新的貼圖。'
				} else if(_msg.message.type.toUpperCase() == 'VIDEO' || _msg.message.type.toUpperCase() == 'AUDIO' || _msg.message.type.toUpperCase() == 'IMAGE'){
					_contentObj.content = _msg.message.fileUrl;
					//if(_msg.message.type.toUpperCase() == 'VIDEO') _contentObj.previewContent += '傳來了新的影片。';
					//if(_msg.message.type.toUpperCase() == 'AUDIO') _contentObj.previewContent += '傳來了新的音訊。';
					//if(_msg.message.type.toUpperCase() == 'IMAGE') _contentObj.previewContent += '傳來了新的照片。';
				}
				_msg.message.frontExtends.bubble = Task.bubbleContentGenerator(
					System.UI.createContentBubble(_serial , _altName , _bubbleDom , _msg.TYPE , _msg.TIME)
					,
					_contentObj
				);/*依據不同的通訊內容產生對話框實體並將參照存入指定變數*/
				return _msg;
			}
			,
			/**
			!註冊通訊池,發話模組,使用者標籤的固定事件.
			>_ary Array|二維陣列[[參照,事件名稱,事件參照],...]
			*/
			poolAndBarAndUserListLabelBasicEvents:function(_ary){
				
				_ary.forEach(function(data , index){
					System.Event.addEventListener(
						data[0] , 
						data[1] , 
						data[2] , 
						false
					);
				});
				/*
				for(var i = 0;i<_ary.length;i++){
					System.Event.addEventListener(
						_ary[i][0] , 
						_ary[i][1] , 
						_ary[i][2] , 
						false
					);
				}
				*/
			}
		}
		,
		/**
		!當使用者資料不在AllGuest_ary 內時,將使用者資料以基本的方式寫入AllGuest_ary 並註冊相關的事件.
		>_dataObj Object|使用者資料.
		>_doms HTML Object|產生通訊池,發話模組與聯絡人清單項目的參照.
		>dataProps Object|資料集.{iconFile:String|使用者頭像 , altName:String|使用者別名 , guestName:String|使用者人名}
		>partsProps Object|HTML Element 參照集.{pool:HTML Element|通訊池 , bar:HTML Element|通訊池捲軸}
		>_guestIndex Number|_dataObj 在AllGuest_ary 內的索引值.
		>alwaysInsertAt Number|選擇性,將使用者插入在使用者清單中的某的索引位置的下一個.
		@回傳 Object|{currentInList:_listedItem|使用者在列表清單中的HTML 參照 , unReadCount:Number|未讀訊息的數量 , lastGuest:Number|持有最晚的通訊時間的使用者在AllGuest_ary 內的索引值}.
		*/
		insertNewUserData:function(_dataObj , _doms , dataProps , partsProps , _guestIndex , alwaysInsertAt){
			var _ary = _dataObj.chatNodesArray;
			var tmpEventId;
			var _listedItem/*使用者在列表中的參照*/ , _label/*使用者名稱物件參照*/;
			var _lastGuestMsgTimeString , _lastOperatorMsgTime/*接線生的最後通訊時間,預設值-1 表示該使用者的通訊中,沒有出現過接線生的訊息*/;
			var _unReadCount;//未讀訊息的數量
			var lastGuestIndex = -1;//持有最晚的通訊時間的使用者在AllGuest_ary 內的索引值
			var tmpTime = 0;
			_lastOperatorMsgTime = -1;
			_label = _doms.label;
			
			for(var i = 0;i<_ary.length;i++){//實體化對話框
				msg = Task.EncapsulationMethod.message(_ary[i] , i , dataProps.altName , dataProps.iconFile);
				System.UI.insertBubbleToChatPool(partsProps.pool , msg.message.frontExtends.bubble);//插入對話框到對話池內
				if(msg.TYPE == 'user') _lastGuestMsgTimeString = $(msg.message.frontExtends.bubble).find('div.time').text();//持續更新單一使用者最後的訊息時間
				if(msg.TYPE == 'operator') _lastOperatorMsgTime = msg.TIME;//持續取得單一使用者訊息中,接線生的通訊時間,有可能會沒有接線生的訊息
				if(msg.TIME > tmpTime){//找出所有使用者訊息中最晚的通訊時間,不分使用者或接線生
					tmpTime = msg.TIME;//通訊時間
					lastGuestIndex = _guestIndex;//這個使用者同時是持有最晚的通訊時間的使用者
				}
				//--觸發擴充事件 begin
				System.ApiEventFiresMethod.fireContentIntoPool(_dataObj.chatNodesArray[i] , dataProps.guestName);//System.ApiEventTypes.ConstantStatic.CONTENT_INTO_POOL
				//--觸發擴充事件 end
			}
			$(partsProps.pool).attr(System.UI.ConstantStatic.DATA_CHILD_NODE_LENGTH_ATTR_NAME , $(partsProps.pool).find(System.UI.ConstantStatic.CHAT_CONTENTER_DOT_NAME).children().length);//寫入通訊池中的對話框數量
			//
			(_lastOperatorMsgTime == -1) ? _unReadCount = _dataObj.chatNodesArray.length/*視為全部未讀*/ : _unReadCount = Task.countUnReads(_ary , _lastOperatorMsgTime)/*計算未讀取的數量*/;
			
			$(_label).find('div.last-message-time').text(_lastGuestMsgTimeString);
			$(_label).find('div.unread-message-count').text(_unReadCount);
			if(alwaysInsertAt == undefined){
				_listedItem = System.UI.insertListItemToView(/*取得加入到畫面後的使用者清單內標籤參照*/
					_label , 
					System.UI.convertScodeToDOM(
						System.UI.getTemplate(
							Task.scodeWrapperId.ID_COPY_USER_LIST_ITEM_DIVIDER
						)
					)
					,
					alwaysInsertAt/*插入在第一個標籤(交談中使用者)的後面*/
				);
			} else {
				_listedItem = System.UI.insertListItemToView(/*取得加入到畫面後的使用者清單內標籤參照*/
					_label , 
					System.UI.convertScodeToDOM(
						System.UI.getTemplate(
							Task.scodeWrapperId.ID_COPY_USER_LIST_ITEM_DIVIDER
						)
					)
					/*不需要指定特定插入位置*/
				);
			}
			
			//
			Task.EncapsulationMethod.poolAndBarAndUserListLabelBasicEvents([
				[/*加入發送訊息按鈕事件*/
					$(partsProps.bar).find('button.msgPostBtn')[0] , 
					System.EventTypes.ConstantStatic.CLICK , 
					Task.BehaviorHandler.speakBarBtn
				]
				,
				[/*加入圖檔選取事件*/
					$(partsProps.bar).find('label.picturePostBtn input')[0] , 
					System.EventTypes.ConstantStatic.FILE_SELECT_CHANGE , 
					Task.BehaviorHandler.fileUploadInput
				]
				,
				[/*加入發送訊息文字欄位鍵盤事件*/
					$(partsProps.bar).find('textarea')[0] , 
					System.EventTypes.ConstantStatic.KEY_UP , 
					Task.BehaviorHandler.speakBarInput
				]
				,
				[/*加入切換使用者的事件*/
					$(_listedItem).find('.listItemBtn')[0] , 
					System.EventTypes.ConstantStatic.CLICK , 
					Task.BehaviorHandler.labelItemBtn
				]
				
				
			]);

			//
			tmpEventId = System.Event.addEventListener(/*加入啟動監控自動捲動通訊池事件*/
				$(partsProps.bar).find('button.msgPostBtn')[0] , 
				System.EventTypes.ConstantStatic.CLICK , 
				Task.BehaviorHandler.startAutoScroll , 
				false
			);
			$(partsProps.bar).find('button.msgPostBtn').attr('auto-remove-event-id' , tmpEventId);//在啟動後自行移除啟動監控自動捲動通訊池事件
			//
			tmpEventId = System.Event.addEventListener(/*加入啟動監控自動捲動通訊池事件*/
				$(partsProps.bar).find('textarea')[0] , 
				System.EventTypes.ConstantStatic.KEY_UP , 
				Task.BehaviorHandler.startAutoScroll , 
				false
			);
			$(partsProps.bar).find('textarea').attr('auto-remove-event-id' , tmpEventId);//在啟動後自行移除啟動監控自動捲動通訊池事件
			
			return {currentInList:_listedItem , unReadCount:_unReadCount , lastGuest:lastGuestIndex};
		}
		,
		/**
		!使用者(第一次取得)的歷史資料初始化.
		>snapshot Object|來自firebase 連線後丟出的資料物件.
		*/
		userHistoryDataInit:function(snapshot) {
			var _dataObj = snapshot.val();//第一次取得的資料內容是曾經存在的所有使用者與operator 的對話記錄
			if(System.ConstantStatic.ALLOW_CONSOLE == true)console.log(JSON.stringify(_dataObj).length);
			var stream , chk , id , guestData;
			for(var i in _dataObj){//將歷史通訊資料進行格式化
				stream = _dataObj[i];
				//if(stream.DISPLAYNAME == 'Operator Name')console.log(stream)
				stream = Task.appendGuestExtendsData(stream);
				Task.parseFireBaseDataToAllGuest(stream);
			}
			var dataInserted;
			var msg , _doms , _pool , _bar , _altName , _guestName , _contentObj , _iconFile , tmpTime , lastGuest , tmpEventId;
			var _queryArray = [];
			tmpTime = 0;
			for(var i = 0;i<AllGuests_ary.length;i++){
				_dataObj = AllGuests_ary[i];
				_iconFile = _dataObj.thumbnailUrl;//頭像
				_altName = _dataObj.alternativeName;//別名
				_guestName = _dataObj.guestName;//人名
				_queryArray.push({label:_guestName , value:_guestName , hiddenValue:_altName});
				//
				_doms = Task.EncapsulationMethod.poolAndBarAndUserListLabel({
					altName:_altName,
					guestName:_guestName,
					icon:_iconFile,
				});//產生通訊池,發話模組與聯絡人清單項目的參照
				
				//--觸發擴充事件 begin
				System.ApiEventFiresMethod.fireClientJoin(_dataObj.id , _guestName , '');//System.ApiEventTypes.ConstantStatic.CLIENT_JOIN
				//--觸發擴充事件 end
				
				_dataObj.pool = System.UI.insertChatPoolToView(_doms.pool);//取得加入到畫面後的參照
				_dataObj.bar = System.UI.insertSpeakBarToView(_doms.bar);//取得加入到畫面後的參照
				//
				dataInserted = Task.insertNewUserData(
					_dataObj , 
					_doms , 
					{
						iconFile:_iconFile,
						altName:_altName,
						guestName:_guestName
					},
					{
						pool:_dataObj.pool,
						bar:_dataObj.bar,
					} , 
					i
				);//實體化新使用者資料與註冊各類事件,回傳一個物件
				lastGuest = dataInserted.lastGuest;//最晚的通訊時間的使用者在AllGuests_ary 內的索引值
				_dataObj.list = dataInserted.currentInList;//使用者建立在使用者清單中的參照
				_dataObj.unRead = dataInserted.unReadCount;//未讀訊息數
				
//				for(var j = 0;j<_dataObj.chatNodesArray.length;j++){//實體化對話框
//					msg = Task.EncapsulationMethod.message(_dataObj.chatNodesArray[j] , j , _altName , _iconFile);
//					System.UI.insertBubbleToChatPool(_dataObj.pool , msg.message.frontExtends.bubble);//插入對話框到對話池內
//					if(msg.TYPE == 'user') _lastGuestMsgTimeString = $(msg.message.frontExtends.bubble).find('div.time').text();//持續更新單一使用者最後的訊息時間
//					if(msg.TYPE == 'operator') _lastOperatorMsgTime = msg.TIME;//持續取得單一使用者訊息中,接線生的通訊時間,有可能會沒有接線生的訊息
//					if(msg.TIME > tmpTime){//找出所有使用者訊息中最晚的通訊時間,不分使用者或接線生
//						tmpTime = msg.TIME;//通訊時間
//						lastGuest = i;//持有最晚的通訊時間的使用者
//					}
//					//--觸發擴充事件 begin
//					System.ApiEventFiresMethod.fireContentIntoPool(_dataObj.chatNodesArray[j] , _guestName);//System.ApiEventTypes.ConstantStatic.CONTENT_INTO_POOL
//					//--觸發擴充事件 end
//				}
//				$(_dataObj.pool).attr(System.UI.ConstantStatic.DATA_CHILD_NODE_LENGTH_ATTR_NAME , $(_dataObj.pool).find(System.UI.ConstantStatic.CHAT_CONTENTER_DOT_NAME).children().length);//寫入通訊池中的對話框數量
//				//
//				if(_lastOperatorMsgTime == -1){
//					_dataObj.unRead = _dataObj.chatNodesArray.length;//視為全部未讀
//				} else {
//					_dataObj.unRead = Task.countUnReads(_dataObj.chatNodesArray , _lastOperatorMsgTime);
//				}
//				$(_doms.label).find('div.last-message-time').text(_lastGuestMsgTimeString);
//				$(_doms.label).find('.unread-message-count').text(_dataObj.unRead );
//				_dataObj.list = System.UI.insertListItemToView(/*取得加入到畫面後的使用者清單內標籤參照*/
//					_doms.label , 
//					System.UI.convertScodeToDOM(
//						System.UI.getTemplate(
//							Task.scodeWrapperId.ID_COPY_USER_LIST_ITEM_DIVIDER
//						)
//					)
//					/*不需要指定特定插入位置*/
//				);
//				//
//				console.log(_dataObj.bar);
//				Task.EncapsulationMethod.poolAndBarAndUserListLabelBasicEvents([
//					[/*加入發送訊息按鈕事件*/
//						$(_dataObj.bar).find('button.msgPostBtn')[0] , 
//						System.EventTypes.ConstantStatic.CLICK , 
//						Task.BehaviorHandler.speakBarBtn
//					]
//					,
//					[/*加入圖檔選取事件*/
//						$(_dataObj.bar).find('label.picturePostBtn input')[0] , 
//						System.EventTypes.ConstantStatic.FILE_SELECT_CHANGE , 
//						Task.BehaviorHandler.fileUploadInput
//					]
//					,
//					[/*加入發送訊息文字欄位鍵盤事件*/
//						$(_dataObj.bar).find('textarea')[0] , 
//						System.EventTypes.ConstantStatic.KEY_UP , 
//						Task.BehaviorHandler.speakBarInput
//					]
//					,
//					[/*加入切換使用者的事件*/
//						$(_dataObj.list).find('.listItemBtn')[0] , 
//						System.EventTypes.ConstantStatic.CLICK , 
//						Task.BehaviorHandler.labelItemBtn
//					]
//					
//					
//				]);
//
//				//
//				tmpEventId = System.Event.addEventListener(/*加入啟動監控自動捲動通訊池事件*/
//					$(_dataObj.bar).find('button')[0] , 
//					System.EventTypes.ConstantStatic.CLICK , 
//					Task.BehaviorHandler.startAutoScroll , 
//					false
//				);
//				$(_dataObj.bar).find('button').attr('auto-remove-event-id' , tmpEventId);//在啟動後自行移除啟動監控自動捲動通訊池事件
//				//
//				tmpEventId = System.Event.addEventListener(/*加入啟動監控自動捲動通訊池事件*/
//					$(_dataObj.bar).find('textarea')[0] , 
//					System.EventTypes.ConstantStatic.KEY_UP , 
//					Task.BehaviorHandler.startAutoScroll , 
//					false
//				);
//				$(_dataObj.bar).find('textarea').attr('auto-remove-event-id' , tmpEventId);//在啟動後自行移除啟動監控自動捲動通訊池事件
				
				
				
			}
			var chk = System.Utility.isValueInArray(AllGuests_ary , 'id' , FireBase.VarableDynamic.userId);//尋找登入使用者在AllGuests_ary 的元素索引位置
			Task.changeGuest(AllGuests_ary[
				(chk > -1) ? chk /*畫面切換到本次的登入者*/: lastGuest/*畫面切到最晚通訊的使用者*/
			].alternativeName , false);
			
			System.UI.splashScreenOff(true);//關閉程式啟動畫面
			System.UI.chatScreenOff(false);//開啟通訊池父系物件
			System.UI.setUserQuery(_queryArray , function(e , ui){
				Task.changeGuest(ui.item.hiddenValue , false);
			});//設定搜尋功能
			System.EventWatchMen.triggerLazyLoadImage();
			System.Utility.installSourceCode('JS' , System.UI.getTemplate(System.ConstantStatic.INSTALL_JS_FUSE_HTML_JS) , 'head' , {id:'fuse-html'});//安裝原廠的fuse-html.min.js
				
			setTimeout(function(){/*因HTML DOM 生成的IO 時間差,略延遲捲動通訊池*/
				for(var i = 0;i<AllGuests_ary.length;i++){
					System.UI.scrollPoolToEnd(
						AllGuests_ary[i].pool , 
						$(AllGuests_ary[i].pool).find(System.UI.ConstantStatic.CHAT_CONTENTER_DOT_NAME).children().last()
					);//插入完對話框後,將通訊池捲動到最末端*/
					//$(AllGuests_ary[i].pool).attr('data-allow-update-scroll' , 0);//捲動完後不允許因圖檔載入更新捲動
				}
			} , 50);
			
			setTimeout(function(){/*因HTML DOM 生成的IO 時間差,略延遲為通訊池安裝外掛捲軸*/
				if(!System.VarableDynamic.isMobile.mobile()){//若是桌機使用時,啟用PerfectScrollbar 套件
					for(var i = 0;i<AllGuests_ary.length;i++){
						AllGuests_ary[i].perfectScrollBar = new PerfectScrollbar(AllGuests_ary[i].pool);
					}
					var ps = new PerfectScrollbar($(System.UI.ConstantStatic.CHAT_ASIDE_AREA_DOT_NAME).find(System.UI.ConstantStatic.CHAT_USER_LIST_DOT_NAME).parent()[0]);
				}
			} , 70);
			//
			//console.log('mobile feature:' + System.VarableDynamic.isMobile.mobile());
			//console.log(Task.chatPoolModual);
			//console.log(Task.speakBarModual);
			//console.log(Task.operatorBubbleModual);
			//console.log(Task.guestBubbleModual);
			//console.log(Task.listLabelModual);
			if(System.ConstantStatic.ALLOW_CONSOLE == true)console.log('通訊物件模型-歷史通訊資料初始化完成:');
			if(System.ConstantStatic.ALLOW_CONSOLE == true)console.log(AllGuests_ary);
		}
		,
		
		/**
		!使用者(單一)的即時通訊資料初始化.
		>snapshot Object|來自firebase 連線後丟出的資料物件.
		*/
		userRealTimeDateUpdate:function(snapshot) {
			
			if(AllGuests_ary.length == 0) return;//避免在歷史通訊資料接收完成前就收到即時資料
			var stream = snapshot.val();//取得的資料內容是即時發生的某位使用者與operator 的對話記錄
			var chk = System.Utility.isValueInArray(AllGuests_ary , 'id' , stream.CLIENT_ID);
			var dataInserted;
			var _dataObj , msg , _pool , _list , _bar , _altName , _guestName , _contentObj , _iconFile;
			
			stream = Task.appendGuestExtendsData(stream);
			//console.log('userRealTimeDateUpdate')
			
			Task.parseFireBaseDataToAllGuest(stream);//將訊息加入現有的使用者中或開啟一個新的使用者資料(AllGuests_ary 的長度會增加)

			if(chk == -1){//該訊息來自全新的使用者,Task.parseFireBaseDataToAllGuest 已對AllGuests_ary 內已新建相關資料,此時畫面上需要新的通訊池,通訊功能列,通訊清單中的使用者標籤
				_dataObj = AllGuests_ary[AllGuests_ary.length - 1];
				_iconFile = _dataObj.thumbnailUrl;//頭像
				_altName = _dataObj.alternativeName;//別名
				_guestName = _dataObj.guestName;//人名
				var /*tmpTime , */lastGuest/* , _lastGuestMsgTimeString , _lastOperatorMsgTime*/;
				var _doms = Task.EncapsulationMethod.poolAndBarAndUserListLabel({
					altName:_altName,
					guestName:_guestName,
					icon:_iconFile,
				});//產生通訊池,發話模組與聯絡人清單項目的參照
				
				//--觸發擴充事件 begin
				System.ApiEventFiresMethod.fireClientJoin(_dataObj.id , _guestName , 'runtime');//System.ApiEventTypes.ConstantStatic.CLIENT_RUNTIME_JOIN
				//--觸發擴充事件 end
				
				var _queryArray = [];
				for(var i = 0;i<AllGuests_ary.length;i++) _queryArray.push({label:AllGuests_ary[i].guestName , value:AllGuests_ary[i].guestName , hiddenValue:AllGuests_ary[i].alternativeName});//更新搜尋使用者清單
				
				_dataObj.pool = System.UI.insertChatPoolToView(_doms.pool);//取得加入到畫面後的參照
				_dataObj.bar = System.UI.insertSpeakBarToView(_doms.bar);//取得加入到畫面後的參照

				dataInserted = Task.insertNewUserData(
					_dataObj , 
					_doms , 
					{
						iconFile:_iconFile,
						altName:_altName,
						guestName:_guestName
					},
					{
						pool:_dataObj.pool,
						bar:_dataObj.bar,
					} , 
					i,
					0/*使用者插入在清單的第一個的下一個*/
				);//實體化新使用者資料與註冊各類事件,回傳一個物件
				lastGuest = dataInserted.lastGuest;//最晚的通訊時間的使用者在AllGuests_ary 內的索引值
				_dataObj.list = dataInserted.currentInList;//使用者建立在使用者清單中的參照
				_dataObj.unRead = dataInserted.unReadCount;//未讀訊息數
				
				//
//				_lastOperatorMsgTime = -1;
//				for(var i = 0;i<_dataObj.chatNodesArray.length;i++){//實體化對話框
//					msg = Task.EncapsulationMethod.message(_dataObj.chatNodesArray[i] , i , _altName , _iconFile);
//					System.UI.insertBubbleToChatPool(_dataObj.pool , msg.message.frontExtends.bubble);//插入對話框到對話池內
//					if(msg.TYPE == 'user') _lastGuestMsgTimeString = $(msg.message.frontExtends.bubble).find('div.time').text();//持續更新單一使用者最後的訊息時間
//					if(msg.TYPE == 'operator') _lastOperatorMsgTime = msg.TIME;//持續取得單一使用者訊息中,接線生的通訊時間,有可能會沒有接線生的訊息
//					if(msg.TIME > tmpTime){//找出所有使用者訊息中最晚的通訊時間,不分使用者或接線生
//						tmpTime = msg.TIME;//通訊時間
//						lastGuest = i;//持有最晚的通訊時間的使用者
//					}
//					//--觸發擴充事件 begin
//					System.ApiEventFiresMethod.fireContentIntoPool(_dataObj.chatNodesArray[i] , _guestName);//System.ApiEventTypes.ConstantStatic.CONTENT_INTO_POOL
//					//--觸發擴充事件 end
//				}
//				$(_dataObj.pool).attr(System.UI.ConstantStatic.DATA_CHILD_NODE_LENGTH_ATTR_NAME , $(_dataObj.pool).find(System.UI.ConstantStatic.CHAT_CONTENTER_DOT_NAME).children().length);//寫入通訊池中的對話框數量
//				//
//				if(_lastOperatorMsgTime == -1){
//					_dataObj.unRead = _dataObj.chatNodesArray.length;//視為全部未讀
//				} else {
//					_dataObj.unRead = Task.countUnReads(_dataObj.chatNodesArray , _lastOperatorMsgTime);
//				}
//				$(_doms.label).find('div.last-message-time').text(_lastGuestMsgTimeString);
//				$(_doms.label).find('.unread-message-count').text(_dataObj.unRead );
//				_dataObj.list = System.UI.insertListItemToView(/*取得加入到畫面後的使用者清單內標籤參照*/
//					_doms.label , 
//					System.UI.convertScodeToDOM(
//						System.UI.getTemplate(
//							Task.scodeWrapperId.ID_COPY_USER_LIST_ITEM_DIVIDER
//						)
//					)
//					,
//					0/*插入在第一個標籤(交談中使用者)的後面*/
//				);
//				//
//				Task.EncapsulationMethod.poolAndBarAndUserListLabelBasicEvents([
//					[/*加入發送訊息按鈕事件*/
//						$(_dataObj.bar).find('button.msgPostBtn')[0] , 
//						System.EventTypes.ConstantStatic.CLICK , 
//						Task.BehaviorHandler.speakBarBtn
//					]
//					,
//					[/*加入圖檔選取事件*/
//						$(_dataObj.bar).find('label.picturePostBtn input')[0] , 
//						System.EventTypes.ConstantStatic.FILE_SELECT_CHANGE , 
//						Task.BehaviorHandler.fileUploadInput
//					]
//					,
//					[/*加入發送訊息文字欄位鍵盤事件*/
//						$(_dataObj.bar).find('textarea')[0] , 
//						System.EventTypes.ConstantStatic.KEY_UP , 
//						Task.BehaviorHandler.speakBarInput
//					]
//					,
//					[/*加入切換使用者的事件*/
//						$(_dataObj.list).find('.listItemBtn')[0] , 
//						System.EventTypes.ConstantStatic.CLICK , 
//						Task.BehaviorHandler.labelItemBtn
//					]
//				]);
//				//
//				tmpEventId = System.Event.addEventListener(/*加入啟動監控自動捲動通訊池事件*/
//					$(_dataObj.bar).find('button')[0] , 
//					System.EventTypes.ConstantStatic.CLICK , 
//					Task.BehaviorHandler.startAutoScroll , 
//					false
//				);
//				$(_dataObj.bar).find('button').attr('auto-remove-event-id' , tmpEventId);//在啟動後自行移除啟動監控自動捲動通訊池事件
//				//
//				tmpEventId = System.Event.addEventListener(/*加入啟動監控自動捲動通訊池事件*/
//					$(_dataObj.bar).find('textarea')[0] , 
//					System.EventTypes.ConstantStatic.KEY_UP , 
//					Task.BehaviorHandler.startAutoScroll , 
//					false
//				);
//				$(_dataObj.bar).find('textarea').attr('auto-remove-event-id' , tmpEventId);//在啟動後自行移除啟動監控自動捲動通訊池事件
				System.UI.runNewBubbleAudioEffect();//訊息音效
				System.UI.updateUserQueryList(_queryArray);
				if(System.ConstantStatic.ALLOW_CONSOLE == true)console.log('通訊物件模型-新使用者即時訊息後更新:');
				if(System.ConstantStatic.ALLOW_CONSOLE == true)console.log(AllGuests_ary);
				//console.log(JSON.stringify(snapshot.val()))
			} else {//某個對話清單中現存使用者的新訊息,Task.parseFireBaseDataToAllGuest 已對AllGuests_ary 代表該使用者的chatNodesArray 陣列新增這一筆通訊
				_dataObj = AllGuests_ary[chk];
				_iconFile = _dataObj.thumbnailUrl;
				_altName = _dataObj.alternativeName;
				_guestName = _dataObj.guestName;//人名
				_pool = _dataObj.pool;
				_bar = _dataObj.bar;
				_list = _dataObj.list;
				var _others_pool = [];
				//
				msg = Task.EncapsulationMethod.message(_dataObj.chatNodesArray[_dataObj.chatNodesArray.length - 1] , _dataObj.chatNodesArray.length - 1 , _altName , _iconFile);
				System.UI.insertBubbleToChatPool(_dataObj.pool , msg.message.frontExtends.bubble);//插入對話框到對話池內
				//
				_contentObj = {messegeTime:msg.TIME , previewContent:msg.DISPLAYNAME + ':'};
				if(msg.message.type.toUpperCase() == 'TEXT'){
					_contentObj.previewContent += msg.message.text;
				} if(msg.message.type.toUpperCase() == 'STICKER'){
					_contentObj.previewContent += '傳來的新的貼圖。';
				} else if(msg.message.type.toUpperCase() == 'VIDEO'){
					_contentObj.previewContent += '傳來了新的影片。';
				} else if(msg.message.type.toUpperCase() == 'AUDIO'){
					_contentObj.previewContent += '傳來了新的音訊。';
				} else if(msg.message.type.toUpperCase() == 'IMAGE'){
					_contentObj.previewContent += '傳來了新的照片。';
				}
				System.UI.insertSpeakBarPreviewMessege(_bar , _contentObj);//插入預覽內容到通訊模組
				//
				if(msg.TYPE == 'user') $(_list).find('.last-message-time').text($(msg.message.frontExtends.bubble).find('div.time').text());//持續更新單一使用者最後的訊息時間
				
				//--觸發擴充事件 begin
				System.ApiEventFiresMethod.fireContentIntoPool(_dataObj.chatNodesArray[_dataObj.chatNodesArray.length - 1] , _guestName);//System.ApiEventTypes.ConstantStatic.CONTENT_INTO_POOL
				//--觸發擴充事件 end
				if(_dataObj.visible == false){//若是通訊池不可視,將使用者清單中的使用者標籤未讀數量 + 1
					_dataObj.unRead += 1;
					$(_list).find('.unread-message-count').text(_dataObj.unRead);
				}
				
				for(var i = 0;i<AllGuests_ary.length;i++) if(i != chk) _others_pool.push(AllGuests_ary[i]);//取得不是開啟中的通訊池
				System.UI.updateLazyLoadImage(_pool , _others_pool);//更新通訊池中需要lazyLoad 的圖檔
				System.UI.scrollPoolToEnd(
					_pool , 
					$(_pool).find(System.UI.ConstantStatic.CHAT_CONTENTER_DOT_NAME).children().last()
				);//插入完對話框後,將通訊池捲動到最末端*/
				if(
					(_dataObj.visible == true && msg.TYPE == 'user') == true ||
					(_dataObj.visible == false && msg.TYPE == 'user' || msg.TYPE == 'operator')
				){
					System.UI.runNewBubbleAudioEffect();//訊息音效
				}
				if(System.ConstantStatic.ALLOW_CONSOLE == true)console.log('通訊物件模型-現存使用者即時訊息後更新:');
				if(System.ConstantStatic.ALLOW_CONSOLE == true)console.log(AllGuests_ary);
			}
			
		}
	};
	
	if(FireBase.init(dataToConfig) == false) {
		alert(FireBase.textScripts.WITHOUT_CALL_UP_SETTING);
		return;
	}
	System.init();
	var MyFireBase/*別名化的firebase initializeApp() 後實體*/;
	var OperatorRef/*操作員參照*/ , ChatsGroupRef/*客戶群參照*/ , SingleChatsRef/*通訊中的客戶參照*/;
	var IsFirstTimeAuthStateChange = true/*firebase 是否是第一次的StateChange*/;
	var IsAnonymous = null;
	var Uid = null;
	var AllGuests_ary = []/*經過整理,依照不同客戶歸檔的通話內容*/;
	var CurrentGuest = null;
	var ConnectedConfig = {/*firebase 的連線組態*/
		TOKEN:FireBase.VarableDynamic.accessToken, //寫入ACCESS_TOKEN 在NodeJS監聽到訊息時發PushMessage給Line@用
		chatWith:FireBase.VarableDynamic.userId,
		C_ID:FireBase.VarableDynamic.cid,
		onlineState: true,status: 'online'
	};
	var DisConnectedConfig = {/*firebase 的斷線組態*/
		lastOnlineTime:System.VarableDynamic.lastOnlineTimestamp,
		onlineState: false,chatWith:'',status: 'offline'
	};
		
	System.Event.addEventListener(
		$(System.UI.ConstantStatic.START_VIEW_HASH_ID).find('button')[0] , 
		System.EventTypes.ConstantStatic.CLICK , 
		function(e){
			$(System.UI.ConstantStatic.START_VIEW_HASH_ID + ' ' + System.UI.ConstantStatic.START_VIEW_ROLLER_DOT_NAME).addClass('set').addClass('rotate-center');
			MyFireBase = FireBase.newApp({
				apiKey:FireBase.VarableDynamic.apiKey , 
				databaseURL:FireBase.VarableDynamic.dataConnectionPort
			});
			MyFireBase.auth().signInAnonymously().catch(Task.errorCatch);//對FireBase 附加登入錯誤實的處理事件
			MyFireBase.auth().onAuthStateChanged(Task.init);//對FireBase 附加狀態變更時的處理事件
			System.Event.removeEachEventListener(e.currentTarget);
			
		} , 
		false
	);/*啟動畫面上的啟動按鈕的Click 事件*/
	
	/* 只是用來模擬突然接收到目前不在使用者清單的訊息 */
	if(document.getElementById('okok')){
		document.getElementById('okok').addEventListener('click' , function(e){
			var ppp = {
				val:function(){
					return {
						"CLIENT_ID": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
						"C_ID": "0939624815",
						"DISPLAYNAME": "亂入者",
						"PICTURE": "sample/tired-dog3.jpg",
						"TIME": new Date().getTime(),
						"TYPE": "user",
						"message": {
							"id":"906619439" + String(Math.floor(Math.random()*1000)),
							"text":"亂入文字!!!",
							"type":"text"
						}
					}
				}
			};
			Task.userRealTimeDateUpdate(ppp);
		} , false);
	}
	/* 只是方便出文件 */

	return {
		clientList:$(System.UI.ConstantStatic.CHAT_ASIDE_AREA_DOT_NAME).find(System.UI.ConstantStatic.CHAT_USER_LIST_DOT_NAME)[0],/*聯絡人側邊欄清單參照*/
		chatPool:$(System.UI.ConstantStatic.CHAT_VIEW_HASH_ID)[0],/*通訊池參照*/
		elementAddEventListener:System.Event.addEventListener,/*自訂的事件註冊函數*/
		removeEventListenerByEventId:System.Event.removeEventListener,/*自訂的事件移除函數*/
		findElementEventId:System.Event.getEventRegId,/*取得事件代號的函數*/
		EventTypes:System.ApiEventTypes.ConstantStatic/*可使用的事件常數*/
		
	};
}
}