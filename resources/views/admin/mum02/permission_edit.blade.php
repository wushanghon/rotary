@extends('admin.layouts.admin')

@section('title', trans('mum02.title'))

@section('script_css')
<!-- Custom css -->
@endsection

@section('script_buttom')
<!-- Custom javascript -->
<script language="javascript">
    var _url = "{{ url('/admin/mum02/') }}"; //這裡需要改路徑

    function doAction(pType) {
        switch (pType) {
            case "save":
                $("#dataForm").attr("action", _url + "/update");
                $("#dataForm").submit();
                break;
            case "cancel":
                window.location = _url;
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
                        @include('components.createAndEditButtons')
                        <!--server side 錯誤訊息模板-->
                        @include('components.validationErrorMessage')
                        {!! csrf_field() !!}

                        <input type="hidden" name="key" value="{{ $data->gp_id }}">

                        <div class="form-group">
                            <label>{{ trans('mum02.gp_id') }}</label>

                            <div>
                                <input type="text" name="gp_nm" class="form-control" required readonly
                                    value="{{ old('gp_id', $data->gp_id) }}" placeholder="{{ trans('mum02.gp_id') }}"/>
                            </div>
                        </div>

                        <div class="form-group">
                            <label>{{ trans('mum02.gp_nm') }}</label>

                            <div>
                                <input type="text" name="gp_nm" class="form-control" required
                                    value="{{ old('gp_nm', $data->gp_nm) }}" placeholder="{{ trans('mum02.gp_nm') }}" />
                            </div>
                        </div>

                        <div class="form-group">
                            <label>{{ trans('mum02.gp_remark') }}</label>

                            <div>
                                <input type="text" name="gp_remark" class="form-control"
                                    value="{{ old('gp_remark', $data->gp_remark) }}" placeholder="{{ trans('mum02.gp_remark') }}" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
