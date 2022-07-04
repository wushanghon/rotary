@extends('admin.layouts.admin')

@section('title', trans('code_c.title'))

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
    //只需要改這段的查詢條件
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
            case "changeType":
                //寫入查詢值，然後送出dataForm
                $("#code_type").val($("#changeType").val());
                $("#page").val(1);
                $("#dataForm").attr("action", _baseUrl);
                break;
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

    <div class="btn-group chili-btn-group">
        <select name="changeType" id="changeType" class="form-control" onchange="doAction('changeType');">
            <option value="">ALL</option>
            @foreach ($code_typeList as $list)
                <option value="{{ $list->code_type }}"
                    {{ (isset($code_type) && $code_type == $list->code_type) ? 'selected' : '' }}>
                    {{ $list->code_type_desc }}
                </option>
            @endforeach
        </select>
    </div>
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
                            {!! csrf_field() !!}{{ method_field('GET') }}
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
                                                        {{ trans('code_c.code_type') }}
                                                    </label>

                                                    <input type="text" value="{{ (isset($code_type)) ? $code_type : '' }}"
                                                        name="code_type" class="form-control" id="code_type"
                                                        placeholder="{{ trans('code_c.code_type') }}">
                                                </div>
                                            </div>

                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="field-2" class="control-label">
                                                        {{ trans('code_c.code_id') }}
                                                    </label>

                                                    <input type="text" value="{{ (isset($code_id)) ? $code_id : ''}}"
                                                        name="code_id" class="form-control" id="code_id"
                                                        placeholder="{{ trans('code_c.code_id') }}">
                                                </div>
                                            </div>

                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="field-2" class="control-label">
                                                        {{ trans('code_c.code_desc') }}
                                                    </label>

                                                    <input type="text" value="{{ (isset($code_desc)) ? $code_desc : '' }}"
                                                        name="code_desc" class="form-control" id="code_desc"
                                                        placeholder="{{ trans('code_c.code_desc') }}">
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

                    <div id="MainTopMenu"></div>

                    <table id="datatable-buttons" class="table table-striped table-bordered dt-responsive nowrap"
                        style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                        <thead>
                            <tr>
                                <th style="width: 30px;"></th>
                                <th data-class-name="priority">{{ trans('code_c.code_type') }}</th>
                                <th>{{ trans('code_c.code_type_desc') }}</th>
                                <th>{{ trans('code_c.code_id') }}</th>
                                <th>{{ trans('code_c.code_desc') }}</th>
                                <th>{{ trans('code_c.code_sort') }}</th>
                            </tr>
                        </thead>

                        <tbody>
                            @foreach ($datalist as $data)
                                <tr>
                                    <td>
                                        <div class="btn-group m-b-10 chili-btn-group mantain-task">
                                            @if (session('g_mod') == 'Y')
                                                <i class="fas fa-edit" title="{{ trans('common.edit') }}"
                                                    onclick="setKey('{{ $data->code_type }}－{{ $data->code_id }}');doAction('edit');"></i>
                                            @endif
                                            @if (session('g_del') == 'Y')
                                                <i class="fas fa-trash-alt" title="{{ trans('common.destroy') }}"
                                                    onclick="setKey('{{ $data->code_type }}－{{ $data->code_id }}');"></i>
                                            @endif
                                        </div>
                                    </td>
                                    <td>{{ $data->code_type }}</td>
                                    <td>{{ $data->code_type_desc }}</td>
                                    <td>{{ $data->code_id }}</td>
                                    <td>{{ $data->code_desc }}</td>
                                    <td>{{ $data->code_sort }}</td>
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
