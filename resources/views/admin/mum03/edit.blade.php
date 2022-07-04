@extends('admin.layouts.admin')

@section('title', trans('mum03.title'))

@section('script_css')
<!-- Custom css -->
@endsection

@inject('presenter','App\Presenter\CommonPresenter')

@section('script_buttom')
<!-- Custom javascript -->
<script>
    var _refererUrl = "{{ $refererUrl }}"; //index頁面的URL，有時會帶有page等queryString
    var _baseUrl = "{{ $baseUrl }}"; //index頁面的URL,不包含queryString

    function doAction(pType) {
        switch (pType) {
            case "store":
                $("#dataForm").attr("action", _baseUrl);
                $("#dataForm").submit();
                break;
            case "update":
                $("#dataForm").attr("action", _baseUrl + "/{{ $presenter->showData($data, 'pg_id') }}");
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
</script>
@endsection

@section('function_nav')
<div class="FixMainTopMenu">
    @include('components.createAndEditButtons')
</div>
@endsection

@section('content')
<div class="container-fluid">
    <div class="row">
        <div class="col-md-12">
            <div class="card m-b-30">
                <div class="card-body">
                    <form name="dataForm" id="dataForm" method="post">
                        <div id="MainTopMenu">
                            <!--server side 錯誤訊息模板-->
                            @include('components.validationErrorMessage')
                            {!! csrf_field() !!}
                            {{ method_field('PUT') }}
                        </div>

                        <input type="hidden" name="key" value="{{ $data->pg_id }}">

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">
                                {{ trans('mum03.pg_id') }}
                            </label>

                            <div class="col-sm-3">
                                <input type="text" name="pg_id" class="form-control"
                                    value="{{ old('pg_id', $data->pg_id) }}" placeholder="{{ trans('mum03.pg_id') }}"
                                    readonly="readonly" maxlength="30" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">
                                {{ trans('mum03.pg_nm') }}
                            </label>

                            <div class="col-sm-5">
                                <input type="text" name="pg_nm" class="form-control" required
                                    value="{{ old('pg_nm', $data->pg_nm) }}" placeholder="{{ trans('mum03.pg_nm') }}"
                                    maxlength="50" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">
                                {{ trans('mum03.pg_icon') }}
                            </label>

                            <div class="col-sm-5">
                                <input type="text" name="pg_icon" class="form-control" required
                                    value="{{ old('pg_icon', $data->pg_icon) }}" placeholder="{{ trans('mum03.pg_icon') }}"
                                    maxlength="50" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">
                                {{ trans('mum03.pg_path') }}
                            </label>

                            <div class="col-sm-8">
                                <input type="text" name="pg_path" class="form-control" required
                                    value="{{ old('pg_path', $data->pg_path) }}" placeholder="{{ trans('mum03.pg_path') }}"
                                    maxlength="100" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">
                                {{ trans('mum03.target') }}
                            </label>

                            <div class="col-sm-2">
                                <select name="target" id="target" class="form-control">
                                    @foreach ($targetTypeList as $list)
                                        <option value="{{ $list->code_id }}"
                                            {{ ($list->code_id == $data->target) ? 'selected' : '' }} >
                                            {{ $list->code_desc }}
                                        </option>
                                    @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">{{ trans('mum03.remark') }}</label>

                            <div class="col-sm-8">
                                <input type="text" name="remark" class="form-control"
                                    value="{{ old('remark', $data->remark) }}" placeholder="{{ trans('mum03.remark') }}"
                                    maxlength="100" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">
                                {{ trans('mum03.role') }}
                            </label>

                            <div class="col-sm-8">
                                @foreach ($mum02List as $list)
                                    <div class="form-check-inline my-2">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" name="gp_id[]" class="custom-control-input"
                                                id="role-{{ $list->gp_id }}" value="{{ old('role', $list->gp_id) }}"
                                                {{ $presenter->displayChecked($list->gp_id, $mus02Data, 'gp_id') }} />

                                            <label for="role-{{ $list->gp_id }}" class="custom-control-label">
                                                {{ $list->gp_nm }}
                                            </label>
                                        </div>
                                    </div>
                                @endforeach
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
