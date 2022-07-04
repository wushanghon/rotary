@extends('admin.layouts.admin')

@section('title', trans('mum02.title'))

@section('script_css')
<!-- DataTables -->
<link href="/assets/plugins/datatables/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css" />
<link href="/assets/plugins/datatables/buttons.bootstrap4.min.css" rel="stylesheet" type="text/css" />

<!-- Responsive datatable examples -->
<link href="/assets/plugins/datatables/responsive.bootstrap4.min.css" rel="stylesheet" type="text/css" />
@endsection

@section('script_buttom')
<script src="/js/admin/index.js"></script>

<script language="javascript">
    var _searhCondition = "{!! $_searchCondition !!}";
    var _baseUrl = "{{ $baseUrl }}";
    var _lastPage = "{{ $datalist->lastPage() }}";

    function doAction(pType, _btn) {
        switch (pType) { //add action type at here when you need
            case "toPage":
                if (parseInt($("#page").val()) > _lastPage) {
                    $("#page").val(_lastPage);
                }
                window.location = _baseUrl + "?page=" + $("#page").val() + _searhCondition;
                return;
            case "firstPage":
                window.location = _baseUrl + "?page=1" + _searhCondition;
                return;
            case "prePage":
                if (parseInt($("#page").val()) - 1 < 1) {
                    return;
                }
                window.location = '{{ $datalist->previousPageUrl() }}' + _searhCondition;
                return;
            case "nextPage":
                if (parseInt($("#page").val()) + 1 > _lastPage) {
                    return;
                }
                window.location = '{{ $datalist->nextPageUrl() }}' + _searhCondition;
                return;
            case "lastPage":
                window.location = '{{ $datalist->url($datalist->lastPage()) }}' + _searhCondition;
                return;
            case "search":
                $("#page").val(1);
                $("#dataForm").attr("action", _baseUrl);
                break;
            case "clearSearchCondition":
                cleanupForm(_btn);
                return false;
            case "create":
                window.location = _baseUrl + "/create";
                return false;
            case "destroy":
                $("input[name=_method]").val("DELETE");
                $("#dataForm").attr("action", _baseUrl + "/" + $("#key").val());
                break;
            case "edit":
                window.location = _baseUrl + "/" + $("#key").val() + "/edit";
                return false;
            case "permission":
                window.location = _baseUrl + "/" + $("#key").val() + "/permission";
                return false;
                // $("#dataForm").attr("action", _baseURL + "/" +  $("#key").val() + "/permission");
                // break;
            case "copygroup":
                window.location = _baseUrl + "/" + $("#key").val() + "/copygroup";
                return false;
                // $("#dataForm").attr("action", _baseURL+ "/" +  $("#key").val() + "/copygroup");
                // break;
            default:
                alert("{{ trans('common.parameterError') }}");
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
    });
</script>
@endsection

@section('function_nav')
<div class="FixMainTopMenu">
    @include('components.indexFunctionButtons')
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
                            {{ method_field('GET') }}
                            <input type="hidden" name="key" id="key">

                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalform">
                                            {{ trans('common.conditionTitle') }}
                                        </h5>

                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true" class="text-dark">&times;</span>
                                        </button>
                                    </div>

                                    <div class="modal-body">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="field-2" class="control-label">
                                                        {{ trans('mum02.gp_id') }}
                                                    </label>

                                                    <input type="text" value="{{ (isset($gp_id)) ? $gp_id : '' }}"
                                                        name="gp_id" class="form-control" id="field-2"
                                                        placeholder="{{ trans('mum02.gp_id') }}">
                                                </div>
                                            </div>

                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="field-1" class="control-label">
                                                        {{ trans('mum02.gp_nm') }}
                                                    </label>

                                                    <input type="text" value="{{ (isset($gp_nm)) ? $gp_nm : '' }}"
                                                        name="gp_nm" class="form-control" id="field-1"
                                                        placeholder="{{ trans('mum02.gp_nm') }}">
                                                </div>
                                            </div>

                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="field-2" class="control-label">
                                                        {{ trans('mum02.gp_remark') }}
                                                    </label>

                                                    <input type="text" value="{{ (isset($gp_remark)) ? $gp_remark : '' }}"
                                                        name="gp_remark" class="form-control" id="field-2"
                                                        placeholder="{{ trans('mum02.gp_remark') }}">
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="modal-footer">
                                        <div class="btn-group m-b-10 chili-btn-group mantain-task">
                                            <button type="button" data-action="search"
                                                class="btn btn-info chili-btn full-rounded spaced task-create">
                                                {{ trans('common.submit') }}
                                            </button>

                                            <button type="button" data-action="clearSearchCondition"
                                                class="btn btn-primary chili-btn full-rounded spaced task-mutual">
                                                {{ trans('common.conditionClean') }}
                                            </button>

                                            <button type="button" data-dismiss="modal"
                                                class="btn btn-primary chili-btn full-rounded spaced task-mutual">
                                                {{ trans('common.cancel') }}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>

                    <table id="datatable-buttons" data-order='[[ 1, "asc" ]]'
                        class="table table-striped table-bordered dt-responsive nowrap"
                        style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                        <thead>
                            <tr>
                                <th style="width: 30px;"></th>
                                <th style="width: 40px;">{{ trans('mum02.permission') }}</th>
                                <th>{{ trans('mum02.copygroup') }}</th>
                                <th data-class-name="priority">{{ trans('mum02.gp_id') }}</th>
                                <th>{{ trans('mum02.gp_nm') }}</th>
                                <th>{{ trans('mum02.gp_remark') }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($datalist as $data)
                                <tr>
                                    <td>
                                        <div class="btn-group m-b-10 chili-btn-group mantain-task">
                                            @if (session('g_mod') == 'Y')
                                                <i class="fas fa-edit"
                                                    onclick="setKey('{{ $data->gp_id }}');doAction('edit');"></i>
                                            @endif
                                            @if (session('g_del') == 'Y')
                                                <i class="fas fa-trash-alt" onclick="setKey('{{ $data->gp_id }}');"
                                                    id="sa-warning"></i>
                                            @endif
                                        </div>
                                    </td>
                                    <td>
                                        <div class="btn-group m-b-10 chili-btn-group mantain-task">
                                            <i class="fas fa-user-lock"
                                                onclick="setKey('{{ $data->gp_id }}');doAction('permission');"></i>
                                            {{ trans('mum02.permission') }}
                                        </div>
                                    </td>
                                    <td>
                                        <div class="btn-group m-b-10 chili-btn-group mantain-task">
                                            <i class="fas fa-copy"
                                                onclick="setKey('{{ $data->gp_id }}');doAction('copygroup');"></i>{{ trans('mum02.copygroup') }}
                                        </div>
                                    </td>
                                    <td>{{ $data->gp_id }}</td>
                                    <td>{{ $data->gp_nm }}</td>
                                    <td>{{ $data->gp_remark }}</td>
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
