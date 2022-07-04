@extends('admin.layouts.admin')

@section('title', trans('code_c.title'))

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
                $("#dataForm").attr("action", _baseUrl + "/{{ old('key', $data->code_type . '－' . $data->code_id) }}");
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

                        <input type="hidden" name="key" value="{{old('key', $data->code_type . '－' . $data->code_id) }}">

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">
                                {{ trans('code_c.code_type') }}
                            </label>

                            <div class="col-sm-2">
                                <input type="text" name="code_type" class="form-control" readonly
                                    value="{{ old('code_type', $data->code_type) }}"
                                    placeholder="{{ trans('code_c.code_type') }}" maxlength="30" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">
                                {{ trans('code_c.code_type_desc') }}
                            </label>

                            <div class="col-sm-2">
                                <input type="text" name="code_type_desc" class="form-control" required
                                    value="{{ old('code_type_desc', $data->code_type_desc) }}"
                                    placeholder="{{ trans('code_c.code_type_desc') }}" maxlength="30" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">
                                {{ trans('code_c.code_id') }}
                            </label>

                            <div class="col-sm-2">
                                <input type="text" name="code_id" class="form-control" readonly
                                    value="{{ old('code_id', $data->code_id) }}"
                                    placeholder="{{ trans('code_c.code_id') }}" maxlength="30"/>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">
                                {{ trans('code_c.code_desc') }}
                            </label>

                            <div class="col-sm-2">
                                <input type="text" name="code_desc" class="form-control" required
                                    value="{{ old('code_desc', $data->code_desc) }}"
                                    placeholder="{{ trans('code_c.code_desc') }}" maxlength="30" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">
                                {{ trans('code_c.code_dsp') }}
                            </label>

                            <div class="col-sm-2">
                                <div class="form-check-inline my-1">
                                    <div class="custom-control custom-radio">
                                        <input type="radio" name="code_dsp" class="custom-control-input" required
                                            value="Y" id="customRadio1" @if ($data->code_dsp == 'Y') checked @endif/>
                                        <label class="custom-control-label" for="customRadio1"> 是</label>
                                    </div>
                                </div>

                                <div class="form-check-inline my-1">
                                    <div class="custom-control custom-radio">
                                        <input type="radio" name="code_dsp" class="custom-control-input" required
                                            value="N" id="customRadio2" @if ($data->code_dsp == 'N') checked @endif/>
                                        <label class="custom-control-label" for="customRadio2"> 否</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">
                                {{ trans('code_c.code_sort') }}
                            </label>

                            <div class="col-sm-2">
                                <input type="number" name="code_sort" class="form-control"
                                    value="{{ old('code_sort', $data->code_sort) }}"
                                    placeholder="{{ trans('code_c.code_sort')}}" min="1" required />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
