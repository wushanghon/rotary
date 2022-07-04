@extends('admin.layouts.admin')

@section('title', trans('mum02.title'))

@section('script_css')
<!-- Custom css -->
@endsection

@section('script_buttom')
<!-- Custom javascript -->
<script language="javascript">
    var _url = "{{ $current_url }}"; //這裡需要改路徑
    var _refererUrl = "{{ $refererUrl }}";

    function doAction(pType) {
        switch (pType) {
            case "store":
                $("#dataForm").attr("action", _url);
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
</script>
@endsection

@section('content')
<div class="container-fluid">
    <div class="row">
        <div class="col-md-12">
            <div class="card m-b-30">
                <div class="card-body">
                    <form name="dataForm" id="dataForm" method="post">
                        <div id="MainTopMenu">
                            @include('components.createButtons')
                            <!--server side 錯誤訊息模板-->
                            @include('components.validationErrorMessage')
                            {!! csrf_field() !!}
                            {{ method_field('PUT') }}
                        </div>

                        <input type="hidden" name="origp_id" value="{{ $origp_id }}">

                        <div class="form-group row">
                            <label class="col-sm-2 col-xl-1 col-form-label">
                                {{ trans('mum02.gp_id') }}
                            </label>

                            <div class="col-sm-3">
                                <input type="text" name="gp_id" class="form-control" required
                                    value="{{ old('gp_id', $data->gp_id) }}" placeholder="{{ trans('mum02.gp_id') }}"
                                    maxlength="30" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-xl-1 col-xl-1 col-form-label">
                                {{ trans('mum02.gp_nm') }}
                            </label>

                            <div class="col-sm-5">
                                <input type="text" name="gp_nm" class="form-control" required
                                    value="{{ old('gp_nm', $data->gp_nm) }}" placeholder="{{ trans('mum02.gp_nm') }}"
                                    maxlength="50" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-xl-1 col-form-label">
                                {{ trans('mum02.gp_remark') }}
                            </label>

                            <div class="col-sm-8">
                                <input type="text" name="gp_remark" class="form-control"
                                    value="{{ old('gp_remark', $data->gp_remark) }}"
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
