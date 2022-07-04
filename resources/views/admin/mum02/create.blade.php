@extends('admin.layouts.admin')

@section('title', trans('mum02.title'))

@section('script_css')
<!-- Custom css -->
@endsection

@section('script_buttom')
<!-- Custom javascript -->
<script language="javascript">
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
                                {{ trans('mum02.gp_id') }}
                            </label>

                            <div class="col-sm-3">
                                <input type="text" class="form-control" name="gp_id" value="{{ old('gp_id') }}"
                                    placeholder="{{ trans('mum02.gp_id') }}" required maxlength="30" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">
                                {{ trans('mum02.gp_nm') }}
                            </label>

                            <div class="col-sm-5">
                                <input type="text" class="form-control" name="gp_nm" value="{{ old('gp_nm') }}"
                                    placeholder="{{ trans('mum02.gp_nm') }}" required maxlength="50" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">
                                {{ trans('mum02.gp_remark') }}
                            </label>

                            <div class="col-sm-8">
                                <input type="text" class="form-control" name="gp_remark" value="{{ old('gp_remark') }}"
                                    placeholder="{{ trans('mum02.gp_remark') }}" maxlength="100" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
