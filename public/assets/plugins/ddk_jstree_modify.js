var DDK = {
	appConfig:null,
	allowTreeNodeDepth:4,
	/**
	!外部介面建構子.
	>props Object|一些設定或API 介面資料.
	@回傳 Object|外部介面函數集.
	*/
	active:function(props){
		DDK.appConfig = props;
		return {
			allowDepth:DDK.allowTreeNodeDepth,
			deCrypt:DDK.DataImport.convertToJsTreeData,
			enCrypt:DDK.DataExport.convertToServerSide,
			newCreate:DDK.ContextMenuOverride.create,
			newRemove:DDK.ContextMenuOverride.remove,
			newRename:DDK.ContextMenuOverride.rename,
			EventHolder:{
				
				createAnyNode:DDK.EventListener.whileCreateNode,
				moveUnEmptyFolder:DDK.EventListener.whileMoveNode
			}
		};
	}
	,
	Mutual:{
		TextScript:{
			CONTEXT_CREATE_OPTION_TEXT:['新增' , '建立一個新的項目'],
			CONTEXT_CREATE_SUB_MENU_OPTION_TEXT:['新增目錄' , '新增目錄' , '新增項目' , '新增項目'],
			
			CONTEXT_REMOVE_OPTION_TEXT:['移除項目' , '移除選取的項目'],
			CONTEXT_RENAME_OPTION_TEXT:['重新命名' , '重新命名選取的項目'],
			
			ALERT_FORCE_REMOVE_DEFAULT_FILE_ITEM:['此項目為後台程式無法刪除,請先移往別處.'],
			ALERT_FORCE_REMOVE_ITEM_WITHIN_FOLDER:['刪除此目錄前請先移出其內現存的' , '個項目'],
			ALERT_FORCE_RENAME_DEFAULT_FILE_ITEM:['此項目為後台程式無法變更名稱.'],
			ALERT_CHANGE_DEFAULT_NEW_FOLDER_NAME:['請先將目錄內的"未命名目錄"變更為您需要的名稱再繼續新增目錄.'],
			ALERT_SET_RENAME_FILE_PROMPT:['請輸入新的目錄名稱.' , '避免含有' , '\\/:\'*?"><|&' , '字元.'],
			ALERT_NODE_USE_MAX_DEPTH:['提醒您,建立的目錄不可超過' , '層.'],
			ALERT_NODE_MOVE_OVER_MAX_DEPTH:['提醒您,移動這個目錄會使目錄層數超過' , '層,因此不予提供移動.'],
			ALERT_NEW_FOLDER_ID_REPEAT:['請聯絡系統管理員,目錄ID 發生重複.'],
			ALERT_AJAX_FAILURE:['網路連線異常,請檢查您的網路狀態.'],
			TREE_NODE_DEFAULT_NEW_FOLDER_NAME:['未命名目錄'],
			TREE_NODE_DEFAULT_NEW_FILE_NAME:['未命名項目'],
		}
		,
		connectNewFolderApi:function(_data , completeFunc){
			_data['_token'] = $('input[name="_token"]').val();
			_data[DDK.appConfig.calls.userName] = DDK.appConfig.calls.userValue;
			var n = {
				url:DDK.appConfig.calls.createFolderApi.url + '?rvo=' + new Date().getTime(),
				method:DDK.appConfig.calls.createFolderApi.method,
				dataType:'json',
				complete:completeFunc,
				data:_data
			};
			if(n.method == 'GET') n.contentType = 'application/json; charset=UTF-8';
			$.ajax(n);
		}
			
	}
	,
	/**
	!右鍵彈出選單功能的修改或複寫.
	*/
	ContextMenuOverride:{
		create:function(){/*新增*/
			return {
				'label' : DDK.Mutual.TextScript.CONTEXT_CREATE_OPTION_TEXT[0],
				'title' : DDK.Mutual.TextScript.CONTEXT_CREATE_OPTION_TEXT[1],
				'submenu' : {/*彈出選單的新增項目內次選項*/
					'create_folder' : {/*建立新目錄*/
						'separator_after'	: true,
						'label'				: DDK.Mutual.TextScript.CONTEXT_CREATE_SUB_MENU_OPTION_TEXT[0],
						'title'				: DDK.Mutual.TextScript.CONTEXT_CREATE_SUB_MENU_OPTION_TEXT[1],
						'action'			: function (data) {
							var inst = $.jstree.reference(data.reference)/*樹狀選單實體*/,
								obj = inst.get_node(data.reference)/*樹狀選單參照*/;
							var canCreate = true,
								msg = '' , tmpData , createNewFolder;
							//console.log(data);
							//console.log(obj);
							
							for(var i = 0;i<obj.children.length;i++){
								tmpData = inst.get_node(obj.children[i]);
								if(tmpData.type == 'default' && tmpData.text == DDK.Mutual.TextScript.TREE_NODE_DEFAULT_NEW_FOLDER_NAME[0]){/*有目錄項目且未變更預設名稱*/
									canCreate = false;
									msg = DDK.Mutual.TextScript.ALERT_CHANGE_DEFAULT_NEW_FOLDER_NAME[0];
									break;
								}
							}
							if(canCreate == true && obj.parents.length == DDK.allowTreeNodeDepth - 1){
								//console.log(obj.parents.length)
								canCreate = false;
								msg = DDK.Mutual.TextScript.ALERT_NODE_USE_MAX_DEPTH[0] + DDK.allowTreeNodeDepth + DDK.Mutual.TextScript.ALERT_NODE_USE_MAX_DEPTH[1];
							}
							if(canCreate == false){
								alert(msg);
							} else {//透過AJAX 取新的目錄id 後才建立
								createNewFolder = function(xhr , status){
									if(status == 'success'){//傳送成功
										var chk = false;
										var _ary = JSON.parse(DDK.DataExport.convertToServerSide());
										for(var i = 0;i<_ary.length;i++){
											if(_ary[i].data["SERIAL_UID"] == xhr.responseJSON.NEW_ID){
												chk = true;
												break;
											}
										}
										if(chk == true){
											alert(DDK.Mutual.TextScript.ALERT_NEW_FOLDER_ID_REPEAT[0]);
											return;
										}
										var tmp = DDK.DataImport.convertToJsTreeData([
										{
											"data":{
												"SERIAL_UID":xhr.responseJSON.NEW_ID,
												"INDEX":"unknow"/*不需要,之後複寫*/,
												"LABEL":DDK.Mutual.TextScript.TREE_NODE_DEFAULT_NEW_FOLDER_NAME[0],
												"PARENT_UID":obj.li_attr.serial,
												"gp_id":''
											},
											"type":"default"
										}])[0];//模擬成Server 端預設輸出格式,轉為js tree 使用格式
										tmp.id = 'NO_' + xhr.responseJSON.NEW_ID;//改寫原本的id 值
										inst.create_node(
											obj, 
											tmp,
											'last',
											function (new_node) {
												setTimeout(
													function () { 
														inst.edit(new_node); 
													},
													0
												);
											}
										);/*插入新的目錄節點*/
									} else {
										alert(DDK.Mutual.TextScript.ALERT_AJAX_FAILURE[0]);
									}
								};
								DDK.Mutual.connectNewFolderApi(
									{
										'PARENT_UID':obj.li_attr.serial,
										'LABEL':DDK.Mutual.TextScript.TREE_NODE_DEFAULT_NEW_FOLDER_NAME[0]
									}
									,
									createNewFolder
								);
								/*
								inst.create_node(
									obj, 
									{ 
										type : 'default'  , 
										'text' : DDK.Mutual.TextScript.TREE_NODE_DEFAULT_NEW_FOLDER_NAME[0]
									}, 
									'last', 
									function (new_node) {
										setTimeout(
											function () { 
												inst.edit(new_node); 
											},
											0
										);
									}
								);
								*/
							}
						}
						
					}
					/*不啟用
					,
					'create_file' : {
						'label'				: DDK.Mutual.TextScript.CONTEXT_CREATE_SUB_MENU_OPTION_TEXT[2],
						'title'				: DDK.Mutual.TextScript.CONTEXT_CREATE_SUB_MENU_OPTION_TEXT[3],
						'action'			: function (data) {
							var inst = $.jstree.reference(data.reference),
								obj = inst.get_node(data.reference);
							inst.create_node(obj, { type : 'file' , 'text' : DDK.Mutual.TextScript.TREE_NODE_DEFAULT_NEW_FILE_NAME[0]}, 'last', function (new_node) {
								setTimeout(function () { inst.edit(new_node); },0);
							});
						}
					}*/
				}
			};
		}
		,
		remove:function(){/*移除*/
			return {
				'label' : DDK.Mutual.TextScript.CONTEXT_REMOVE_OPTION_TEXT[0],
				'title' : DDK.Mutual.TextScript.CONTEXT_REMOVE_OPTION_TEXT[1],
				'action' : function(data){/*彈出選單的移除項目*/
					var inst = $.jstree.reference(data.reference)/*樹狀選單實體*/,
						obj = inst.get_node(data.reference)/*樹狀選單參照*/;
					var canDelete = true,
						msg;
					//console.log(data);
					//console.log(obj);
					if(obj.type == 'file'){/*預設程式項目無法移除*/
						canDelete = false;
						msg = DDK.Mutual.TextScript.ALERT_FORCE_REMOVE_DEFAULT_FILE_ITEM[0];
					}
					if(obj.type == 'default' && obj.children.length > 0){/*內含任何項目的目錄無法移除*/
						canDelete = false;
						msg = DDK.Mutual.TextScript.ALERT_FORCE_REMOVE_ITEM_WITHIN_FOLDER[0] + obj.children.length + DDK.Mutual.TextScript.ALERT_FORCE_REMOVE_ITEM_WITHIN_FOLDER[1];
					}
					(canDelete == true) ? inst.delete_node(obj) : alert(msg);
				}
			};
		}
		,
		rename:function(){/*改名*/
			return {
				'label' : DDK.Mutual.TextScript.CONTEXT_RENAME_OPTION_TEXT[0],
				'title' : DDK.Mutual.TextScript.CONTEXT_RENAME_OPTION_TEXT[1],
				'action' : function(data){/*彈出選單的移除項目*/
					var inst = $.jstree.reference(data.reference)/*樹狀選單實體*/,
						obj = inst.get_node(data.reference)/*樹狀選單參照*/;
					var canRename = true,
						newName = null,
						checkedChar = /[&*;':"\\|<>\/]/,
						msg;
					//console.log(data);
					//console.log(obj);

					if(obj.type == 'file'){/*預設程式項目無法變更名稱*/
						canRename = false;
						msg = DDK.Mutual.TextScript.ALERT_FORCE_RENAME_DEFAULT_FILE_ITEM[0];
					}
					
					if(canRename == true) {
						newName = prompt(
							DDK.Mutual.TextScript.ALERT_SET_RENAME_FILE_PROMPT[0] + 
							DDK.Mutual.TextScript.ALERT_SET_RENAME_FILE_PROMPT[1] + 
							DDK.Mutual.TextScript.ALERT_SET_RENAME_FILE_PROMPT[2] + 
							DDK.Mutual.TextScript.ALERT_SET_RENAME_FILE_PROMPT[3]
							, 
							obj.text
						);

						if(newName != null && checkedChar.test(newName) == false) inst.rename_node(obj , newName);
					} else {
						alert(msg);
					}
				}
			}
		}
	}
	,
	EventListener:{
		/**
		!透過jQuery 註冊的"create_node.jstree" 事件接收函數,警告超過層數以下的目錄無法移入項目.
		*/
		whileCreateNode:function(e , currentNode){
			//console.log(Node.node.parents.length);
			if(currentNode.node.parents.length == DDK.allowTreeNodeDepth) alert(DDK.Mutual.TextScript.ALERT_NODE_USE_MAX_DEPTH[0] + DDK.allowTreeNodeDepth + DDK.Mutual.TextScript.ALERT_NODE_USE_MAX_DEPTH[1]);
		}
		,
		/**
		!透過jQuery 註冊的"move_node.jstree" 事件接收函數,警告移動目錄到新目錄後,若使層數超過上限則不予移動.
		*/
		whileMoveNode:function(e , currentNode){
			//console.log(currentNode.instance.get_node(currentNode.node.parent));
			var hasNest = 0;
			for(var i = 0;i<currentNode.node.children.length;i++){
				if(currentNode.instance.is_parent(currentNode.node.children[i]) == true){//在移動的子節點中找到含有下一層節點的項目
					hasNest = 2;
					break;
				}
			}
			//console.log('hasNest = ' + hasNest);
			//console.log(currentNode.node);
			if(hasNest + currentNode.node.parents.length >= DDK.allowTreeNodeDepth && currentNode.node.type == 'default') alert(DDK.Mutual.TextScript.ALERT_NODE_MOVE_OVER_MAX_DEPTH[0] + DDK.allowTreeNodeDepth + DDK.Mutual.TextScript.ALERT_NODE_MOVE_OVER_MAX_DEPTH[1]);
		}
	}
	,
	DataImport:{
		/**
		!將Server 端寫入資料還原為JsTree 需要的實際格式.
		>server_json Array/Object|原始的JSON 資料.
		@回傳 Array/Object|JsTree 使用的樹狀結構初始化資料.
		*/
		convertToJsTreeData:function(server_json){
			var tmp;
			
			var findParent = function(_ary , _key){//尋找自訂節點的父系節點
				for(var i = 0;i<_ary.length;i++){
					if(_ary[i].data['SERIAL_UID'] == _key) return _ary[i].id;
				}
				return null;
			};
			for(var i = 0;i<server_json.length;i++){
				tmp = server_json[i];
				tmp.icon = true;
				tmp.id = 'NO_' + i;
				tmp.text = tmp.data['LABEL'];
				tmp.li_attr = {serial:tmp.data['SERIAL_UID'] , pg:''};
				//if(tmp.data['gp_id']) tmp.li_attr.gpid = tmp.data['gp_id'];棄用
			}
			for(var i = 0;i<server_json.length;i++){
				tmp = server_json[i];
				
				tmp.parent = (tmp.data['PARENT_UID'] == '-1') ? '#'/*頭端節點*/ : findParent(server_json , tmp.data['PARENT_UID']) /*自訂節點*/;
				tmp.li_attr.pg = (tmp.type == 'file') ? tmp.data.PG_ID : '';//只有程式節點寫入PG_ID
			}
			for(var i = 0;i<server_json.length;i++){
				delete server_json[i].data;
			}
			//console.log(server_json);
			return server_json;
		}
	}
	,
	DataExport:{
		/**
		!將JsTree 輸出的JSON 內容轉換為提交給Server 的格式.
		>jsTree_json HTML Selector|js tree 的容器參照,選擇性.
		@回傳 String|轉換過格式的jSTree 結構內容.
		*/
		convertToServerSide:function(_jsTree){
			var jsTree_json = $((arguments.length == 0) ? DDK.appConfig.widget : _jsTree).jstree(true).get_json('#',DDK.appConfig.dataExportProfile);
			var findSUID = function(_ary , _key){
				for(var i = 0;i<_ary.length;i++){
					if(_ary[i].id == _key) return _ary[i].li_attr['serial'];
				}
				return null;
			};
			var tmp;
			var mod_ary = JSON.parse(JSON.stringify(jsTree_json));
			for(var i = 0;i<mod_ary.length;i++){
				tmp = mod_ary[i];
				tmp.data['SERIAL_UID'] = tmp.li_attr['serial'];
				tmp.data['LABEL'] = tmp.text;
				tmp.data['INDEX'] = String(i);//重編排序編號
				tmp.data['PG_ID'] = tmp.li_attr['pg'];
				if(tmp.parent == '#'){
					tmp.data['PARENT_UID'] = '-1';//上層目錄序號
					//tmp.data['gp_id'] = tmp.li_attr['gpid'];棄用
				} else {
					tmp.data['PARENT_UID'] = findSUID(mod_ary , tmp.parent);//尋找上層目錄序號
				}
				
			}
			for(var i = 0;i<mod_ary.length;i++){
				tmp = mod_ary[i];
				delete tmp.icon;
				delete tmp.id;
				delete tmp.text;
				delete tmp.parent;
				delete tmp.li_attr;
				
			}
			//console.log(JSON.stringify(mod_ary));
			return JSON.stringify(mod_ary);
		}
	}
};