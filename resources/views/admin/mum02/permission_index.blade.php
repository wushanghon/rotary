@extends('admin.layouts.admin')

@section('title', trans('mus02.title'))

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
    //只需要改這段的查詢條件
    var _searhCondition = "{!! $_searchCondition !!}";
    var _baseUrl = "{{ $baseUrl }}";
    var _refererUrl = "{{ $refererUrl }}";

    function doAction(pType, _btn) {
        switch (pType) { //add action type at here when you need
            case "create":
                $("#dataForm").attr("action", _baseUrl + "/create");
                setKey('{{$key}}');
                break;
            case "destroy":
                $("input[name=_method]").val("DELETE");
                $("#dataForm").attr("action", _baseUrl + "/" + $("#key").val());
                break;
            case "save":
                $("input[name=_method]").val("PUT");
                $("#dataForm").attr("action", _baseUrl + "/" + $("#key").val());
                break;
            case "cancel":
                window.location = _refererUrl;
                // window.location=location.protocol +'//'+location.host + "/admin/mum02";
                return;
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
    });
</script>
@endsection

@section('content')
<div class="container-fluid">
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-body">
                    <div id="MainTopMenu">
                        <div class="btn-group m-b-10 chili-btn-group mantain-task">
                            <button type="button" data-action="create"
                                class="btn btn-info chili-btn full-rounded spaced task-create">
                                {{ trans('common.create') }}
                            </button>

                            <button type="submit" data-action="save"
                                class="btn btn-info chili-btn full-rounded spaced task-modify">
                                {{ trans('common.save') }}
                            </button>

                            <button type="button" data-action="cancel"
                                class="btn btn-primary chili-btn full-rounded spaced task-mutual">
                                {{ trans('common.cancel') }}
                            </button>

                            <button type="button" data-action="destroy"
                                class="btn btn-info chili-btn full-rounded spaced task-delete">
                                {{ trans('common.destroy') }}
                            </button>
                        </div>
                    </div>

                    <form name="dataForm" id="dataForm" method="post">
                        <table id="datatable-buttons" data-order='[[ 1, "asc" ]]'
                            class="table table-striped table-bordered dt-responsive nowrap"
                            style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                            {!! csrf_field() !!}
                            {{ method_field('GET') }}

                            <input type="hidden" name="key" id="key" value="{{ $key }}">
                            <input type="hidden" name="dataCount" id="dataCount" value="{{ $dataCount }}">

                            <thead>
                                <tr>
                                    <th>
                                        <div class="form-check-inline my-2">
                                            <div class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input" name="delVal"
                                                    id="delVal" data-parsley-multiple="groups" data-parsley-mincheck="2"
                                                    value="ON" onClick="changCheckboxV('{{ $dataCount }}',this.checked);">

                                                <label class="custom-control-label" for="delVal">
                                                    {{ trans('mus02.selectALL') }}
                                                </label>
                                            </div>
                                        </div>
                                    </th>
                                    <th>{{ trans('mum03.pg_nm') }}({{ trans('mum03.pg_id') }})</th>
                                    <th>{{ trans('mum03.remark') }}</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($datalist as $data)
                                    <tr>
                                        <td>
                                            <div class="form-check-inline my-2">
                                                <div class="custom-control custom-checkbox">
                                                    <input type="checkbox" class="custom-control-input"
                                                        name="rowNum{{ $loop->index }}" id="rowNum{{ $loop->index }}"
                                                        data-parsley-multiple="groups" data-parsley-mincheck="2"
                                                        value="{{ $data->pg_id }}"
                                                        onClick="authorityAll({{ $loop->index }});">

                                                    <label class="custom-control-label" for="rowNum{{ $loop->index }}">
                                                        {{ trans('mus02.select') }}
                                                    </label>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {{ $data->pg_nm }}({{ $data->pg_id }})
                                            <input type="hidden" name="pg_id{{ $loop->index }}" id="pg_id{{ $loop->index }}"
                                                value="{{ $data->pg_id }}">
                                        </td>
                                        <td>{{ $data->remark }}</td>
                                        <td>
                                            <div class="form-check-inline my-2">
                                                <div class="custom-control custom-checkbox">
                                                    <input type="checkbox" class="custom-control-input"
                                                        name="g_add{{ $loop->index }}" id="g_add{{ $loop->index }}"
                                                        data-parsley-multiple="groups" data-parsley-mincheck="2" value="Y"
                                                        onClick="authorityItem({{ $loop->index }});"
                                                        {{ $data->g_add == 'Y' ? 'checked' : '' }}>

                                                    <label class="custom-control-label" for="g_add{{ $loop->index }}">
                                                        {{ trans('mus02.g_add') }}
                                                    </label>
                                                </div>
                                            </div>

                                            <div class="form-check-inline my-2">
                                                <div class="custom-control custom-checkbox">
                                                    <input type="checkbox" class="custom-control-input"
                                                        name="g_query{{ $loop->index }}" id="g_query{{ $loop->index }}"
                                                        data-parsley-multiple="groups" data-parsley-mincheck="2" value="Y"
                                                        onClick="authorityItem({{ $loop->index }});"
                                                        {{ $data->g_query == 'Y' ? 'checked' : '' }}>

                                                    <label class="custom-control-label" for="g_query{{ $loop->index }}">
                                                        {{ trans('mus02.g_query') }}
                                                    </label>
                                                </div>
                                            </div>

                                            <div class="form-check-inline my-2">
                                                <div class="custom-control custom-checkbox">
                                                    <input type="checkbox" class="custom-control-input"
                                                        name="g_mod{{ $loop->index }}" id="g_mod{{ $loop->index }}"
                                                        data-parsley-multiple="groups" data-parsley-mincheck="2" value="Y"
                                                        onClick="authorityItem({{ $loop->index }});"
                                                        {{ $data->g_mod == 'Y' ? 'checked' : '' }}>

                                                    <label class="custom-control-label" for="g_mod{{ $loop->index }}">
                                                        {{ trans('mus02.g_mod') }}
                                                    </label>
                                                </div>
                                            </div>

                                            <div class="form-check-inline my-2">
                                                <div class="custom-control custom-checkbox">
                                                    <input type="checkbox" class="custom-control-input"
                                                        name="g_del{{ $loop->index }}" id="g_del{{ $loop->index }}"
                                                        data-parsley-multiple="groups" data-parsley-mincheck="2" value="Y"
                                                        onClick="authorityItem({{ $loop->index }});"
                                                        {{ $data->g_del == 'Y' ? 'checked' : '' }}>

                                                    <label class="custom-control-label" for="g_del{{ $loop->index }}">
                                                        {{ trans('mus02.g_del') }}
                                                    </label>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
