@extends('admin.layouts.admin')

@section('title', trans('mum03.title'))

@section('script_css')
<!-- Custom css -->
@endsection

@inject('presenter','App\Presenter\CommonPresenter')

@section('script_buttom')
<!-- Custom javascript -->
<script>
    var _refererUrl = "{{ $refererUrl }}";
    var _baseUrl = "{{ $baseUrl }}";

    function doAction(pType) {
        switch (pType) {
            case "store":
                $("#dataForm").attr("action", _baseUrl);
                $("#dataForm").submit();
                break;
            case "update":
                $("#dataForm").attr("action", _baseUrl + "/{{ $presenter->showData($data, 'id') }}");
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
                            @include('components.validationErrorMessage')
                            <!--server side 錯誤訊息模板-->
                            {!! csrf_field() !!}
                            {{ method_field($method) }}
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">
                                {{ trans('mum03.pg_id') }}
                            </label>

                            <div class="col-sm-3">
                                <input type="text" class="form-control" name="pg_id" value="{{ old('pg_id') }}"
                                    placeholder="{{ trans('mum03.pg_id') }}" required maxlength="50" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">
                                {{ trans('mum03.pg_nm') }}
                            </label>

                            <div class="col-sm-5">
                                <input type="text" class="form-control" name="pg_nm" value="{{ old('pg_nm') }}"
                                    placeholder="{{ trans('mum03.pg_nm') }}" required maxlength="50" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">
                                {{ trans('mum03.pg_icon') }}
                            </label>

                            <div class="col-sm-5">
                                <input type="text" class="form-control" name="pg_icon"
                                    value="{{ old('pg_icon','fab fa-laravel') }}"
                                    placeholder="{{ trans('mum03.pg_icon') }}" required maxlength="50" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">
                                {{ trans('mum03.pg_path') }}
                            </label>

                            <div class="col-sm-8">
                                <input type="text" name="pg_path" class="form-control" value="{{ old('pg_path') }}"
                                    placeholder="{{ trans('mum03.pg_path') }}" maxlength="100" />
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
                                            {{ ($list->code_id == '_self') ? 'selected' : '' }}>
                                            {{ $list->code_desc }}
                                        </option>
                                    @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">
                                {{ trans('mum03.remark') }}
                            </label>

                            <div class="col-sm-8">
                                <input type="text" class="form-control" name="remark" value="{{ old('remark') }}"
                                    placeholder="{{ trans('mum03.remark') }}" required maxlength="100" />
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
                                                id="role-{{ $list->gp_id }}" value="{{ old('role', $list->gp_id) }}" />

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
