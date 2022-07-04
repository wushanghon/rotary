@extends('admin.layouts.admin')

@section('title', trans('menu_set.title'))

@section('script_css')
<link href="/assets/plugins/jstree/themes/default/style.css" rel="stylesheet" type="text/css">
<link href="/assets/plugins/jstree/themes/default/chiliman_jstree.css" rel="stylesheet" type="text/css">
@endsection

@section('script_buttom')
<script type="text/javascript" src="/assets/plugins/jstree/jstree.js"></script>
<script type="text/javascript" src="/assets/plugins/ddk_jstree_modify.js"></script>

<script>
    var _url = "{{ url('/admin/menu_set/') }}";
    var modifer = DDK.active({
        widget: document.getElementById('singletonTreeMenu'),
        calls: {
            userName: 'gp_id',
            userValue: $('input[name="gp_id"]').val(),
            createFolderApi: {
                url: '/admin/menu_set/addnewfolder/',
                method: 'GET'
            }
        },
        dataExportProfile: {
            no_state: true,
            no_icon: true,
            no_a_attr: true,
            flat: true
        }
    });

    $('#singletonTreeMenu').jstree({
        'types': {
            '#': {
                /*全域設定*/
                'max_children': 1,
                'max_depth': modifer.allowDepth,
                'valid_children': [
                    'root'
                ]
            },
            'root': {
                /*頭端節點*/
                'valid_children': [ /*可允許的節點型態*/
                    'folder' /*自訂名稱節點-目錄*/ ,
                    'file' /*自訂名稱節點-程式檔*/
                ]
            },
            'folder': {
                /*自訂節點-目錄*/
                'valid_children': [ /*可允許的節點型態*/
                    'folder',
                    'file'
                ]
            },
            'file': {
                /*自訂節點-檔案*/
                'icon': 'jstree-icon jstree-file',
                'valid_children': null /*沒有允許的節點型態*/
            }
        },
        'plugins': [ /*功能擴充模組*/
            'contextmenu' /*右鍵選單*/ ,
            'dnd' /*拖曳*/ ,
            'search',
            'state' /*記錄每個節點最後的開啟或選取狀態*/ ,
            'types' /*自訂節點型態與名稱*/ ,
            'wholerow' /*單行檔案總管格式*/ ,
            'unique' /*單一命名檔案或目錄*/
        ],
        'contextmenu': {
            /*右鍵選單*/
            'items': function (node) {
                var tmp = $.jstree.defaults.contextmenu.items(); //取得預設的config 項目進行局部的複寫

                tmp.create = modifer.newCreate(); /*新增*/
                tmp.rename = modifer.newRename(); /*改名*/
                tmp.remove = modifer.newRemove(); /*移除*/

                //-- 編輯 begin
                tmp.ccp.label = '編輯';
                tmp.ccp.title = '項目的剪下、複製、貼上';
                tmp.ccp.submenu.copy.label = '複製';
                tmp.ccp.submenu.copy.title = '複製項目';
                tmp.ccp.submenu.cut.label = '剪下';
                tmp.ccp.submenu.cut.title = '剪下項目';
                tmp.ccp.submenu.paste.label = '貼上';
                tmp.ccp.submenu.paste.title = '貼上項目';

                //-- 編輯 end
                if (this.get_type(node) === "file") {
                    delete tmp.create;
                }
                return tmp;
            }
        },
        'core': {
            /*核心定義區段*/
            'animation': 200,
            'check_callback': true,
            'force_text': true,
            'themes': {
                'stripes': true
            },
            'data': modifer.deCrypt({!!$TreeViewJson!!})
        }
    }).on('move_node.jstree', modifer.EventHolder.moveUnEmptyFolder);

    function doAction(pType) {
        switch (pType) {
            case "update":
            case "save":
                $("#dataForm").attr("action", _url + "/update");
                document.getElementById('TreeViewJsonCode').value = modifer.enCrypt(document.getElementById('singletonTreeMenu'));
                $("#dataForm").submit();
                break;
            case "cancel":
                window.location = _url;
                return;
            default:
                alert("{{ trans('common.parameterError') }}");
        }
    }

    $('button[data-action]').on('click', function () {
        doAction($(this).attr('data-action'));
    });
</script>
@endsection

@section('function_nav')
<div class="FixMainTopMenu">
    @include('components.editButtons')
</div>
@endsection

@section('content')
<div class="container-fluid">
    <div class="row">
        <div class="col-md-12">
            <div class="card m-b-30">
                <div class="card-body">
                    <form name="dataForm" id="dataForm" method="post" enctype="multipart/form-data">
                        <input type="hidden" id="TreeViewJsonCode" name="TreeViewJsonCode">
                        <input type="hidden" name="gp_id" value="{{ $gp_id }}">

                        <div id="MainTopMenu">
                            <!--server side 錯誤訊息模板-->
                            @include('components.validationErrorMessage')
                            {!! csrf_field() !!}
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">
                                {{ trans('menu_set.EditTreeView') }}
                            </label>

                            <div class="col-sm-8" style="color: #fe473e;">
                                <section id="singletonTreeMenu"></section>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
