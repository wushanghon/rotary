@extends('admin.layouts.admin')

@section('title', trans('mum01.title'))

@section('script_css')
<!-- Custom css -->
@endsection

@section('script_buttom')
<!-- Custom javascript -->
<script>
    var _refererUrl = "{{ $refererUrl }}"; //index頁面的URL，有時會帶有page等queryString
    var _baseUrl = "{{ $baseUrl }}"; //index頁面的URL,不包含queryString

    function doAction(pType) {
        switch (pType) {
            case "update":
                $("#dataForm").attr("action", _baseUrl + "/{{ old('id', $data->user_no) }}");
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
                        <div id="MainTopMenu">
                            <!--server side 錯誤訊息模板-->
                            @include('components.validationErrorMessage')
                            {!! csrf_field() !!}
                            {{ method_field('PUT') }}
                        </div>

                        <input type="hidden" name="key" value="{{ $data->user_no }}">
                        <input type="hidden" name="user_no" value="{{ $data->user_no }}">

                        <div class="form-group row">
                            <label class="col-sm-1 col-form-label">
                                {{ trans('mum01.user_id') }}
                            </label>

                            <div class="col-sm-2">
                                <input type="text" class="form-control" name="user_id"
                                    value="{{ old('user_id', $data->user_id) }}" required readonly
                                    placeholder="{{ trans('mum01.user_id') }}" maxlength="30" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-1 col-form-label">
                                {{ trans('mum01.user_nm') }}
                            </label>

                            <div class="col-sm-2">
                                <input type="text" name="user_nm" class="form-control" required maxlength="50"
                                    value="{{ old('user_nm', $data->user_nm) }}" placeholder="{{ trans('mum01.user_nm') }}" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-1 col-form-label">
                                {{ trans('mum01.user_email') }}
                            </label>

                            <div class="col-sm-4">
                                <input type="text" name="user_email" class="form-control"
                                    value="{{ old('user_email', $data->user_email) }}"
                                    placeholder="{{ trans('mum01.user_email') }}" maxlength="50" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-1 col-form-label">
                                {{ trans('mum01.user_pass') }}
                            </label>

                            <div class="col-sm-2">
                                <input type="password" name="user_pass" class="form-control" maxlength="20"
                                    value="{{ old('user_pass') }}" placeholder="{{ trans('mum01.user_pass') }}" />
                            </div>

                            <div class="col-sm-2">
                                <input type="password" name="user_pass_confirmation" class="form-control"
                                    placeholder="{{ trans('mum01.user_pass_confirmation') }}" maxlength="20" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-1 col-form-label">
                                {{ trans('mum01.user_remark') }}
                            </label>

                            <div class="col-sm-8">
                                <input type="text" name="user_remark" class="form-control"
                                    value="{{ old('user_remark', $data->user_remark) }}"
                                    placeholder="{{ trans('mum01.user_remark') }}" maxlength="255" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-1 col-form-label">
                                {{ trans('mum01.user_status') }}
                            </label>

                            <div class="col-sm-2">
                                <select class="form-control"name="user_status" required
                                    data-parsley-error-message="{{ trans('common.required_select') }}">
                                    <option value="">{{ trans('common.select') }}</option>
                                    @foreach ($VALID_Ary as $list)
                                        <option value="{{ $list->code_id }}"
                                            {{ old('user_status', $data->user_status) == $list->code_id ? 'selected' : '' }}>
                                            {{ $list->code_desc }}
                                        </option>
                                    @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-1 col-form-label">
                                {{ trans('mum01.user_group') }}
                            </label>

                            <div class="col-sm-2">
                                <select class="form-control" name="GROUP" required
                                    data-parsley-error-message="{{ trans('common.required_select') }}">
                                    <option value="">{{ trans('common.select') }}</option>
                                    @foreach ($GROUP_Ary as $list)
                                        <option value="{{ $list->gp_id }}"
                                            {{old('GROUP', $data->gp_id) == $list->gp_id ? 'selected' : '' }}>
                                            {{ $list->gp_nm }}
                                        </option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
