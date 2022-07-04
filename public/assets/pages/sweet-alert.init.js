/*
 Template Name: Dashor - Responsive Bootstrap 4 Admin Dashboard
 Author: Themesdesign
 Website: www.themesdesign.in
 File: Sweet Alert init js
 */

!function ($) {
    "use strict";

    var SweetAlert = function () {
    };

    //examples
    SweetAlert.prototype.init = function () {

        //Basic
        var btn_event_basic = function () {
            swal('Any fool can use a computer').catch(swal.noop)
        };
        //A title with a text under
        var btn_event_title = function () {
            swal(
                'The Internet?',
                'That thing is still around?',
                'question'
            )
        };
        //Success Message
        var btn_event_success = function () {
            swal(
                {
                    title: 'Good job!',
                    text: 'You clicked the button!',
                    type: 'success',
                    showCancelButton: true,
                    confirmButtonClass: 'btn btn-success',
                    cancelButtonClass: 'btn btn-danger m-l-10'
                }
            );
        };
        //Warning Message
        var btn_event_delete_item = function () {
            swal({
                title: '您確定要刪除嗎?!',
                text: "刪除後將無法回復!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger m-l-10',
                confirmButtonText: '確定',
                cancelButtonText: '取消'
            }).then(function () {
                doAction('destroy',"");//Jeff need it
            });
        };
        //Parameter
        var btn_event_params = function () {
            swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger m-l-10',
                buttonsStyling: false
            }).then(function () {
                swal(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }, function (dismiss) {
                // dismiss can be 'cancel', 'overlay',
                // 'close', and 'timer'
                if (dismiss === 'cancel') {
                    swal(
                        'Cancelled',
                        'Your imaginary file is safe :)',
                        'error'
                    )
                }
            });
        };
        //Custom Image
        var btn_event_image = function () {
            swal({
                title: 'Sweet!',
                text: 'Modal with a custom image.',
                imageUrl: 'assets/images/logo.png',
                imageHeight: 30,
                animation: false
            })
        };
        //Auto Close Timer
        var btn_event_auto_close_by_timer = function () {
            swal({
                title: 'Auto close alert!',
                text: 'I will close in 2 seconds.',
                timer: 2000
            }).then(
                function () {
                },
                // handling the promise rejection
                function (dismiss) {
                    if (dismiss === 'timer') {
                        console.log('I was closed by the timer')
                    }
                }
            )
        };
        //custom html alert
        var btn_event_custom_html_alert = function () {
            swal({
                title: '<i>HTML</i> <u>example</u>',
                type: 'info',
                html: 'You can use <b>bold text</b>, ' +
                '<a href="//Mannatthemes.in/">links</a> ' +
                'and other HTML tags',
                showCloseButton: true,
                showCancelButton: true,
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger m-l-10',
                confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
                cancelButtonText: '<i class="fa fa-thumbs-down"></i>'
            });
        };
        //Custom width padding
        var btn_event_custom_padding_width_alert = function () {
            swal({
                title: 'Custom width, padding, background.',
                width: 600,
                padding: 100,
                background: '#fff url(//subtlepatterns2015.subtlepatterns.netdna-cdn.com/patterns/geometry.png)'
            })
        };
        //Ajax
        var btn_event_ajax_alert = function () {
            swal({
                title: 'Submit email to run ajax request',
                input: 'text',
                showCancelButton: true,
                confirmButtonText: 'Submit',
                showLoaderOnConfirm: true,
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger m-l-10',
                preConfirm: function (email) {
                    return new Promise(function (resolve, reject) {
                        setTimeout(function () {
                            if (email === 'taken@example.com') {
                                reject('This email is already taken.')
                            } else {
                                resolve()
                            }
                        }, 2000)
                    })
                },
                allowOutsideClick: false
            }).then(function (email) {
                swal({
                    type: 'success',
                    title: 'Ajax request finished!',
                    html: 'Submitted email: ' + email
                })
            });
        };
        //chaining modal alert
        var btn_event_chaining_alert = function () {
            swal.setDefaults({
                input: 'text',
                confirmButtonText: 'Next &rarr;',
                showCancelButton: true,
                animation: false,
                progressSteps: ['1', '2', '3']
            });

            var steps = [
                {
                    title: 'Question 1',
                    text: 'Chaining swal2 modals is easy'
                },
                'Question 2',
                'Question 3'
            ];

            swal.queue(steps).then(function (result) {
                swal.resetDefaults();
                swal({
                    title: 'All done!',
                    html: 'Your answers: <pre>' +
                    JSON.stringify(result) +
                    '</pre>',
                    confirmButtonText: 'Lovely!',
                    showCancelButton: false
                })
            }, function () {
                swal.resetDefaults()
            });
        };
        //Danger
        var btn_event_dynamic_alert = function () {
            swal.queue([{
                title: 'Your public IP',
                confirmButtonText: 'Show my public IP',
                text: 'Your public IP will be received ' +
                'via AJAX request',
                showLoaderOnConfirm: true,
                preConfirm: function () {
                    return new Promise(function (resolve) {
                        $.get('https://api.ipify.org?format=json')
                            .done(function (data) {
                                swal.insertQueueStep(data.ip);
                                resolve()
                            })
                    })
                }
            }])
        };
        //抽獎倒數視窗
        var btn_event_auto_close_timer = function () {
            swal({
                title: '抽獎中',
                text: '請稍後',
                timer: 3000
            }).then(
                function () {
                },
                // handling the promise rejection
                function (dismiss) {
                    if (dismiss === 'timer') {
                        goToDraw();
                    }
                }
            )
        };
        var always_registered;
        var clickEventAttrMarker = 'sweet-alert-implement';
        var clickEventPairAry = [/*用不到的可註記掉*/
            /*['#s4a-basic' , btn_event_basic],*/
            ['#sa-title' , btn_event_title],
            ['#sa-success' , btn_event_success],
            ['.fas.fa-trash-alt' , btn_event_delete_item],
            ['#sa-params' , btn_event_params],
            ['#sa-image' , btn_event_image],
            ['#sa-close' , btn_event_auto_close_by_timer],
            ['#custom-html-alert' , btn_event_custom_html_alert],
            ['#custom-padding-width-alert' , btn_event_custom_padding_width_alert],
            ['#ajax-alert' , btn_event_ajax_alert],
            ['#chaining-alert' , btn_event_chaining_alert],
            ['#dynamic-alert' , btn_event_dynamic_alert],
            ['#time-close' , btn_event_auto_close_timer],
        ];
        always_registered = setInterval(
            function(){
                var _ary , _selector , _func;
                for(var i = 0;i<clickEventPairAry.length;i++){
                    _selector = clickEventPairAry[i][0];
                    _func = clickEventPairAry[i][1];
                    _ary = $(_selector);
                    for(var j = 0;j<_ary.length;j++){
                        if(($(_ary[j]).attr(clickEventAttrMarker) === undefined) == true && $(_ary[j]).attr(clickEventAttrMarker) != ''){//確認沒有註冊過SweetAlert 的事件
                            
                            $(_ary[j]).attr(clickEventAttrMarker , 1);
                            _ary[j].addEventListener('click' , _func , false);
                        }
                    }
                }
            }
            ,
            100
        );
        


    },
    //init
    $.SweetAlert = new SweetAlert, $.SweetAlert.Constructor = SweetAlert
}(window.jQuery),

//initializing
    function ($) {
        "use strict";
        $.SweetAlert.init()
    }(window.jQuery);