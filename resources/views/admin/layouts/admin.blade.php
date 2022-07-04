<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">
    <meta content="Admin Dashboard" name="description">
    <meta content="themesdesign" name="author">

    <title>@yield('title'){{ trans('common.systemName') }}</title>

    <link rel="shortcut icon" href="/assets/images/favicon.ico">
    <link rel="stylesheet" type="text/css" href="https://code.jquery.com/ui/1.12.0/themes/smoothness/jquery-ui.css">
    <link rel="stylesheet" type="text/css" href="/assets/vendor/timepicker/jquery-ui-timepicker-addon.min.css">
    <link rel="stylesheet" type="text/css" href="/assets/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="/assets/plugins/animate/animate.css">
    <link rel="stylesheet" type="text/css" href="/assets/css/icons.css">
    <link rel="stylesheet" type="text/css" href="/assets/css/style.css">
    <link rel="stylesheet" type="text/css" href="/assets/css/chiliman_overwrite.css">
    <link rel="stylesheet" type="text/css" href="/assets/css/chiliman_extends.css">
    <link rel="stylesheet" type="text/css" href="/assets/css/lockline.css">
    <link rel="stylesheet" type="text/css" href="/assets/plugins/chartist/css/chartist.min.css">

    <!-- Sweet Alert -->
    <link href="/assets/plugins/sweet-alert2/sweetalert2.min.css" rel="stylesheet" type="text/css">

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

        table.dataTable {
            margin-top: 0px !important;
            margin-bottom: 0px !important;
        }
    </style>

    @yield('script_css')
</head>

<body class="fixed-left bg_white">
    <div id="wrapper">
        <div class="left side-menu bg_left">
            <i class="ion-close button-menu-mobile button-menu-mobile-topbar open-left"></i>

            <div class="bg_pink h70">
                <div class="text-center">
                    <a href="{{ url('admin/dashboard') }}" class="logo" style="font-size: 30px; color: #FFF;">
                        <img src="/assets/images/logo.png" width="70%" alt="logo">
                    </a>
                </div>
            </div>

            <div class="sidebar-inner slimscrollleft" id="sidebar-main">
                <div id="sidebar-menu">
                    <ul>{!! session('treeView') !!}</ul>
                </div>

                <div class="clearfix"></div>
            </div>
        </div>

        <div class="content-page">
            <div class="content">
                <div class="topbar">
                    <nav class="navbar-custom bg_LivingCoral">
                        <ul class="list-inline menu-left mb-0 position-absolute end">
                            <li class="float-left">
                                <i class="mdi mdi-menu button-menu-mobile  waves-effect"></i>
                            </li>
                            <li class="float-left">
                                @yield('buttons')
                            </li>
                        </ul>

                        @yield('function_nav')

                        <ul class="list-inline float-right mb-0">
                            <li class="list-inline-item dropdown notification-list">
                                <a class="nav-link dropdown-toggle arrow-none waves-effect waves-light nav-user"
                                    data-toggle="dropdown" href="#" role="button" aria-haspopup="false"
                                    aria-expanded="false">
                                    @if (session()->get('photo') == '')
                                        <img src="/assets/images/UserPhotoDefault.png" alt="user" class="rounded-circle">
                                    @else
                                        <img src="/images/{{ session()->get('photo') }}" alt="user" class="rounded-circle">
                                    @endif
                                </a>

                                <div class="dropdown-menu dropdown-menu-right profile-dropdown ">
                                    <div class="dropdown-item noti-title">
                                        <h5>{{ trans('common.welcome') }}</h5>
                                    </div>
                                    <!--
                                        <a class="dropdown-item" href="#"><i class="mdi mdi-account-circle "></i>{{ trans('common.profile') }}</a>
                                        <a class="dropdown-item" href="#"><span class="badge badge-primary float-right">3</span><i class="mdi mdi-settings "></i>{{ trans('common.settings') }}</a>
                                        <a class="dropdown-item" href="#"><i class="mdi mdi-lock-open-outline"></i>{{ trans('common.lockScreen') }}</a>
                                        <div class="dropdown-divider"></div>
                                        -->
                                    <a class="dropdown-item text-danger" href="{{ url('/admin/changepassword') }}">
                                        <i class="mdi mdi-key-change text-danger"></i>{{ trans('common.password') }}
                                    </a>
                                    <a class="dropdown-item text-danger" href="{{ url('/admin/login/sign-out') }}">
                                        <i class="mdi mdi-power text-danger"></i>{{ trans('common.logout') }}
                                    </a>
                                </div>
                            </li>
                        </ul>
                        <div class="clearfix"></div>
                    </nav>
                </div>

                <div class="page-content-wrapper">
                    @yield('content')
                </div>
            </div>

            <footer class="footer">
                {{ trans('common.footer') }}{{ trans('common.version') }}
            </footer>
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
    <script src="/assets/js/jquery.countdown.js"></script>
    <script src="https://code.jquery.com/ui/1.12.0/jquery-ui.min.js"
        integrity="sha256-eGE6blurk5sHj+rmkfsGYeKyZx3M4bG+ZlFyA7Kns7E=" crossorigin="anonymous"></script>
    <script type="text/javascript" src="/assets/vendor/timepicker/jquery-ui-sliderAccess.js"></script>
    <script type="text/javascript" src="/assets/vendor/timepicker/jquery-ui-timepicker-addon.min.js"></script>
    <script type="text/javascript" src="/assets/vendor/ckeditor/ckeditor.js"></script>

    <!-- App js -->
    <script src="/assets/js/app.js"></script>

    <!-- Sweet Alert -->
    <script src="/assets/plugins/sweet-alert2/sweetalert2.min.js"></script>
    <script src="/assets/pages/sweet-alert.init.js"></script>

    <!-- Parsley js for validator-->
    <script src="/assets/plugins/parsleyjs/parsley.min.js"></script>
    <script src="/assets/plugins/parsleyjs/i18n/zh_tw.js"></script>
    <script src="/assets/pages/form-validation.init.js"></script>

    @yield('script_buttom')
</body>

</html>
