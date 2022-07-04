<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">
    <meta name="description" content="Admin Dashboard">
    <meta name="author" content="themesdesign">

    <title>{{ trans('login.title') }}</title>

    <link rel="shortcut icon" href="/assets/images/favicon.ico">
    <link href="/assets/css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="/assets/plugins/animate/animate.css" rel="stylesheet" type="text/css">
    <link href="/assets/css/icons.css" rel="stylesheet" type="text/css">
    <link href="/assets/css/style.css" rel="stylesheet" type="text/css">
    <link href="/assets/css/lockline.css" rel="stylesheet" type="text/css">

    <style type="text/css">
        b.pagemessage {
            display: inline-block;
            font-style: normal;
            font-size: 13px;
            color: #263341;
            line-height: 18px;
            margin-left: 15px;
            padding-top: 10px;
        }
    </style>
</head>

<body class="fixed-left yellow_bg">
    <div id="stars"></div>
    <div id="stars2"></div>
    <div class="wrapper-page login_boxs">
        <div class="card login_shadow">
            <div class="card-body box50">
                <h6 class='text_1'>
                    <img src="/assets/images/logoLogin.png">
                    <span class='text_2'><br />{{ $CustomerName }}</span>
                </h6>

                <div class="p-3">
                    <form class="form-horizontal" id="dataForm" method="post">
                        {!! csrf_field() !!}
                        @include('components.validationErrorMessage')
                        <input type="hidden" name="CrmmId" value="{{ old('CrmmId', $CrmmId) }}">

                        <div class="form-group row">
                            <div class="col-12">
                                <h4 class="font-14 text_LightOrange margin_b5">
                                    {{ trans('login.accountTitle') }}
                                </h4>

                                <input class="form-control border_text_LightOrange" type="text" required
                                    name="account" value="{{ old('account', Cookie::get('account')) }}"
                                    placeholder="{{ trans('login.account') }}" maxlength="33">
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-12">
                                <h4 class="font-14 text_LightOrange margin_b5">
                                    {{ trans('login.passwordTitle') }}
                                </h4>

                                <input class="form-control border_text_LightOrange" type="password"
                                    name="password" value="{{ old('password') }}" required
                                    placeholder="{{ trans('login.password') }}" maxlength="30">
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-12">
                                <div class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" id="rememberAccount" name="rememberAccount"
                                        {{ (Cookie::get('rememberAccount') == 'Y') ? 'checked' : '' }}>

                                    <label class="custom-control-label text_LightOrange padding_2" for="rememberAccount">
                                        {{ trans('login.remeberAccount') }}
                                    </label>

                                    <a href="/admin/login/forgetpassword" class="a_text_LightOrange">
                                        <i class="mdi mdi-lock text_LightOrange"></i>{{ trans('login.forget') }}
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div class="form-group text-center row m-t-20">
                            <div class="col-12">
                                <button type="submit" data-action="login"
                                    class="btn btn-LivingCoral btn-block waves-effect waves-light">{{ trans('login.submit') }}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div id="carouselExampleIndicators" class="carousel slide card-body box50 no_padding" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <!--
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="5"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="6"></li>
                        -->
                </ol>

                <div class="carousel-inner" role="listbox">
                    <div class="carousel-item active">
                        <img src="/assets/images/tip01.jpg">
                    </div>
                    <!--
                        <div class="carousel-item">
                            <img src="/assets/images/tip02.jpg">
                        </div>
                        <div class="carousel-item">
                            <img src="/assets/images/tip03.jpg">
                        </div>
                        <div class="carousel-item">
                            <img src="/assets/images/tip04.jpg">
                        </div>
                        <div class="carousel-item">
                            <img src="/assets/images/tip05.jpg">
                        </div>
                        <div class="carousel-item">
                            <img src="/assets/images/tip06.jpg">
                        </div>
                        <div class="carousel-item">
                            <img src="/assets/images/tip07.jpg">
                        </div>
                        -->
                </div>

                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>

                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
        </div>
    </div>

    <!-- jQuery  -->
    <script src="/assets/js/jquery.min.js"></script>
    <script src="/assets/js/popper.min.js"></script>
    <script src="/assets/js/bootstrap.min.js"></script>
    <script src="/assets/js/modernizr.min.js"></script>
    <script src="/assets/js/detect.js"></script>
    <script src="/assets/js/fastclick.js"></script>
    <script src="/assets/js/jquery.slimscroll.js"></script>
    <script src="/assets/js/jquery.blockUI.js"></script>
    <script src="/assets/js/waves.js"></script>
    <script src="/assets/js/jquery.nicescroll.js"></script>
    <script src="/assets/js/jquery.scrollTo.min.js"></script>

    <!-- Parsley js for validator-->
    <script src="/assets/plugins/parsleyjs/parsley.min.js"></script>
    <script src="/assets/pages/form-validation.init.js"></script>

    <!-- Custom javascript -->
    <script language="javascript">
        $('button[data-action]').on('click', function () {
            doAction($(this).attr('data-action'));
        });

        function doAction(pType) {
            switch (pType) {
                case "login":
                    $("#dataForm").attr("action", "{{ url('admin/login/sign-in') }}");
                    $("#dataForm").submit();
                    break;
                default:
                    alert("{{ trans('common.parameterError') }}");
            }
            return false;
        }
    </script>

    <!-- App js -->
    <script src="/assets/js/app.js"></script>
</body>

</html>
