@extends('admin.layouts.admin')

@section('title', trans('menu_set.title'))

@section('script_css')
<!-- DataTables -->
<link href="/assets/plugins/datatables/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css" />
<link href="/assets/plugins/datatables/buttons.bootstrap4.min.css" rel="stylesheet" type="text/css" />

<!-- Responsive datatable examples -->
<link href="/assets/plugins/datatables/responsive.bootstrap4.min.css" rel="stylesheet" type="text/css" />
@endsection

@section('script_buttom')
<script src="/js/admin/index.js"></script>

<script>
    var _searhCondition = "&";
    var _baseURL = location.protocol + "//" + location.host + location.pathname;
    var _lastPage = "{{ $datalist -> lastPage() }}";

    function doAction(pType, _btn) {
        switch (pType) {
            case "toPage":
                if (parseInt($("#page").val()) > _lastPage) {
                    $("#page").val(_lastPage);
                }
                window.location = _baseURL + "?page=" + $("#page").val() + _searhCondition;
                return;
            case "firstPage":
                window.location = _baseURL + "?page=1" + _searhCondition;
                return;
            case "prePage":
                if (parseInt($("#page").val()) - 1 < 1) {
                    return;
                }
                window.location = "{{ $datalist->previousPageUrl() }}" + _searhCondition;
                return;
            case "nextPage":
                if (parseInt($("#page").val()) + 1 > _lastPage) {
                    return;
                }
                window.location = "{{ $datalist->nextPageUrl() }}" + _searhCondition;
                return;
            case "lastPage":
                window.location = "{{ $datalist->url($datalist->lastPage()) }}" + _searhCondition;
                return;
            case "search":
                $("#page").val(1);
                $("#dataForm").attr("action", _baseURL);
                break;
            case "clearSearchCondition":
                cleanupForm(_btn);
                return;
            case "create":
                $("#dataForm").attr("action", _baseURL + "/create");
                break;
            case "destroy":
                $("#dataForm").attr("action", _baseURL + "/destroy");
                break;
            case "edit":
                $("#dataForm").attr("action", _baseURL + "/edit");
                break;
            case "changeType":
                //寫入查詢值，然後送出dataForm
                $("#codeType").val($("#changeType").val());
                $("#page").val(1);
                $("#dataForm").attr("action", _baseURL);
                break;
            default:
                alert("參數錯誤");
                return false;
        }
        $("#dataForm").submit();
    }

    function setKey(pKey) {
        $("#key").attr("value", pKey);
    }

    $('button[data-action]').on('click', function () {
        doAction($(this).attr('data-action'), this);
    });

    $('input[data-action]').on('keyup', function (e) {
        if (e.keyCode == 13) {
            doAction($(this).attr('data-action'), this);
        }
    });

    $('input[data-action]').on('focus', function (e) {
        $(this).select();
    });

    $(document).ready(function () {
        $('#datatable-buttons_wrapper .dataTables_info').hide();
        $('button[type="button"]').find('新增').each();
    });
</script>
@endsection

@section('function_nav')
<div class="FixMainTopMenu">
    @include('components.pageNavigation')
</div>
@endsection

@section('content')
<div class="container-fluid">
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-body">
                    @include('components.validationErrorMessage')

                    <form name="dataForm" id="dataForm" method="post">
                        <div class="modal fade bd-example-modal-form" tabindex="-1" role="dialog"
                            aria-labelledby="myLargeModalLabel" aria-hidden="true">
                            {!! csrf_field() !!}
                            <input type="hidden" name="key" id="key">
                        </div>
                    </form>

                    <div id="MainTopMenu"></div>

                    <table id="datatable-buttons" class="table table-striped table-bordered dt-responsive nowrap"
                        style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                        <thead>
                            <tr>
                                <th style="width: 30px;"></th>
                                <th data-class-name="priority">{{ trans('menu_set.gp_id') }}</th>
                                <th>{{ trans('menu_set.gp_nm') }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($datalist as $data)
                                <tr>
                                    <td>
                                        <div class="btn-group m-b-10 chili-btn-group mantain-task">
                                            @if (session('g_mod') == 'Y')
                                                <i class="fas fa-edit" onclick="setKey('{{ $data->gp_id }}');doAction('edit');"></i>
                                            @endif
                                        </div>
                                    </td>
                                    <td>{{ $data->gp_id }}</td>
                                    <td>{{ $data->gp_nm }}</td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
