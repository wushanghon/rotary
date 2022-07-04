@extends('admin.layouts.admin')

@section('title', trans('changepassword.title'))

@section('script_css')
<!-- Custom css -->
@endsection

@section('script_buttom')
<!-- Custom javascript -->
<script>
    var _url = "{{ url('/admin/changepassword/') }}"; //這裡需要改路徑

    function doAction(pType) {
        switch (pType) {
            case "update":
            case "save":
                //$("#dataForm").attr("action", _url + "/store");
                $("#dataForm").attr("action", _url);
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

    @if ($changeStatus == 'success')
        $(document).ready(function () {
            // alert 範例
            swal({
                title: "已修改密碼",
                html: "請重新登入",
                type: "success"
            }).then(
                function () {
                    location.replace("{{ url('/admin/login/sign-out') }}");
                }
            );
        });
    @endif
</script>
@endsection

@section('function_nav')
<div class="FixMainTopMenu">
    <div class="btn-group m-b-10 chili-btn-group mantain-task">
        @if (session('g_mod') == 'Y')
            <button type="button" data-action="update" class="btn btn-info chili-btn chili-spaced full-rounded task-create">
                {{ trans('common.save') }}
            </button>
        @endif
    </div>
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

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">
                                {{ trans('changepassword.user_pass_ori') }}
                            </label>

                            <div class="col-sm-4">
                                <input type="password" class="form-control" name="user_pass_ori"
                                    value="{{ old('user_pass_ori') }}" placeholder="{{ trans('common.user_pass_ori') }}"
                                    required maxlength="20" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">
                                {{ trans('changepassword.user_pass_modify') }}
                            </label>

                            <div class="col-sm-4">
                                <input type="password" class="form-control" name="user_pass_modify"
                                    value="{{ old('user_pass_modify') }}" id="pass2"
                                    placeholder="{{ trans('common.user_pass_modify') }}" maxlength="20" />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">
                                {{ trans('changepassword.user_pass_modify_confirmation') }}
                            </label>

                            <div class="col-sm-4">
                                <input type="password" class="form-control" name="user_pass_modify_confirmation"
                                    value="{{ old('user_pass_modify_confirmation') }}"
                                    placeholder="{{ trans('common.user_pass_modify_confirmation') }}" maxlength="20" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
