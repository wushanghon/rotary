@extends('admin.layouts.admin')

@section('title', trans('code_c.title'))

@section('script_css')
<!-- Custom css -->
@endsection

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
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">
                                {{ trans('code_c.code_type') }}
                            </label>

                            <div class="col-sm-2">
                                <input type="text" class="form-control" name="code_type" value="{{ old('code_type') }}"
                                    placeholder="{{ trans('code_c.code_type') }}" required maxlength="30" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">
                                {{ trans('code_c.code_type_desc') }}
                            </label>

                            <div class="col-sm-2">
                                <input type="text" name="code_type_desc" class="form-control" value="{{ old('code_type_desc') }}"
                                    placeholder="{{ trans('code_c.code_type_desc') }}" required maxlength="30" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">
                                {{ trans('code_c.code_id') }}
                            </label>

                            <div class="col-sm-2">
                                <input type="text" class="form-control" name="code_id" value="{{ old('code_id') }}"
                                    placeholder="{{ trans('code_c.code_id') }}" required maxlength="30" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">
                                {{ trans('code_c.code_desc') }}
                            </label>

                            <div class="col-sm-2">
                                <input type="text" name="code_desc" class="form-control" value="{{ old('code_desc') }}"
                                    placeholder="{{ trans('code_c.code_desc') }}" required maxlength="30" />
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
                                            value="Y" id="customRadio1" checked />
                                        <label class="custom-control-label" for="customRadio1"> 是</label>
                                    </div>
                                </div>

                                <div class="form-check-inline my-1">
                                    <div class="custom-control custom-radio">
                                        <input type="radio" name="code_dsp" class="custom-control-input" required
                                            value="N" id="customRadio2" />
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
                                    value="{{ old('code_sort', 1) }}" placeholder="{{ trans('code_c.code_sort')}}"
                                    min="1" required />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
