@extends('admin.layouts.admin')

@section('title', trans('sample.title'))

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
                        <!--server side 錯誤訊息模板-->
                        @include('components.validationErrorMessage')

                        {!! csrf_field() !!}
                        {{ method_field('PUT') }}

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">{{ trans('sample.name') }}</label>

                            <div class="col-sm-8">
                                <input type="text" name="name" class="form-control"
                                    value="{{ old('name', $data->name) }}" placeholder="{{ trans('sample.name') }}"
                                    maxlength="30" required />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
