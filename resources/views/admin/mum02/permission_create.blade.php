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
    var _refererUrl = "{{ $refererUrl }}";
    var _baseUrl = "{{ $baseUrl }}";

    function doAction(pType) {
        switch (pType) {
            case "save":
                $("#dataForm").attr("action", _refererUrl);
                $("#dataForm").submit();
                break;
            case "cancel":
                window.location = _refererUrl;
                return;
            default:
                alert("{{ trans('common.parameterError') }}");
        }
    }

    $('button[data-action]').on('click', function () {
        doAction($(this).attr('data-action'));
    });

    $('select[data-action]').on('change', function () {
        doAction($(this).attr('data-action'));
    });

    function authorityAll(rowNum) {
        if ($("#rowNum" + rowNum).prop("checked")) {
            $("#g_add" + rowNum).prop("checked", true);
            $("#g_query" + rowNum).prop("checked", true);
            $("#g_mod" + rowNum).prop("checked", true);
            $("#g_del" + rowNum).prop("checked", true);
        } else {
            $("#g_add" + rowNum).prop("checked", false);
            $("#g_query" + rowNum).prop("checked", false);
            $("#g_mod" + rowNum).prop("checked", false);
            $("#g_del" + rowNum).prop("checked", false);
        }
    }
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
                            <button type="submit" data-action="save"
                                class="btn btn-info chili-btn full-rounded spaced task-create">
                                {{ trans('common.save') }}
                            </button>

                            <button type="button" data-action="cancel"
                                class="btn btn-primary chili-btn full-rounded spaced task-mutual">
                                {{ trans('common.cancel') }}
                            </button>
                        </div>
                    </div>

                    <form name="dataForm" id="dataForm" method="post">
                        <table id="datatable-buttons" data-order='[[ 1, "asc" ]]'
                            class="table table-striped table-bordered dt-responsive nowrap"
                            style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                            {!! csrf_field() !!}
                            <input type="hidden" name="key" id="key" value="{{ $key }}">
                            <input type="hidden" name="dataCount" id="dataCount" value="{{ $dataCount }}">

                            <thead>
                                <tr>
                                    <th></th>
                                    <th>{{ trans('mum03.pg_id') }}</th>
                                    <th>{{ trans('mum03.pg_nm') }}</th>
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
                                            {{ $data->pg_id }}
                                            <input type="hidden" name="pg_id{{ $loop->index }}" id="pg_id{{ $loop->index }}"
                                                value="{{ $data->pg_id }}">
                                        </td>
                                        <td>
                                            {{ $data->pg_nm }}
                                            <input type="hidden" name="pg_nm{{ $loop->index }}" id="pg_nm{{ $loop->index }}"
                                                value="{{ $data->pg_nm }}">
                                        </td>
                                        <td>{{ $data->remark }}</td>
                                        <td>
                                            <div class="form-check-inline my-2">
                                                <div class="custom-control custom-checkbox">
                                                    <input type="checkbox" class="custom-control-input"
                                                        name="g_add{{ $loop->index }}" id="g_add{{ $loop->index }}"
                                                        data-parsley-multiple="groups" data-parsley-mincheck="2" value="Y"
                                                        onClick="authorityItem({{ $loop->index }});">

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
                                                        onClick="authorityItem({{ $loop->index }});">

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
                                                        onClick="authorityItem({{ $loop->index }});">

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
                                                        onClick="authorityItem({{ $loop->index }});">

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
