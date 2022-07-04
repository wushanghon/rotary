(function ()
{
    $('.chat-list .contact').on('click', function ()
    {
        //changeView('#chat-content-views', '#chat-view');
        //Jeff Add
        //取得點到哪一個人
        //關閉所有訊息，並顯示那位的所有資訊
        //changeRow('#show', '.U4c2d3eefd46ae59b4b30e0c5e96259ef');
        //changeRow('#show', '.Ud171aa1e2e3a3abda31b7c60a710184c');
       // alert($(this).hasClass('U6c8b5bad5da8cabb412db5f6b48cc567'));
        //console.log($(this).hasClass(''));//老王
       //changeRow('#show', '#U6c8b5bad5da8cabb412db5f6b48cc567');//老王
        //changeRow('#show', '#Ud171aa1e2e3a3abda31b7c60a710184c');//LEO
        //changeRow('#show', '#U4c2d3eefd46ae59b4b30e0c5e96259ef');//JEFF
        //
        //console.log($(this).attr("class"));
        //console.log($(this).data('data-id'));
        //console.log($(this).data("id"));
        //console.log($('#show').data('type'));
        
        changeRow('#show', '.U4c2d3eefd46ae59b4b30e0c5e96259ef');//測試

        //改變客服發話的對象值
        $('#uid').val('U4c2d3eefd46ae59b4b30e0c5e96259ef');
        
    });

    $('#contacts-button').on('click', function ()
    {
        changeView('#chat-left-sidebar-views', '#contacts-view');
    });

    // $('.back-to-chats-button').on('click', function ()
    // {
    //     changeView('#chat-left-sidebar-views', '#chats-view');
    // });

    // $('#user-avatar-button').on('click', function ()
    // {
    //     changeView('#chat-left-sidebar-views', '#user-view');
    // });

    function changeView(wrapper, view)
    {
        var wrapper = $(wrapper);
        wrapper.find('.view').removeClass('d-none d-flex');
        wrapper.find('.view').not(view).addClass('d-none');
        wrapper.find(view).addClass('d-flex');
    }

// Add by Jeff at 20181108
    function changeRow(wrapper, row)
    {   
        var wrapper = $(wrapper);
        wrapper.find('.message-row').removeClass('d-none d-flex');
        wrapper.find('.message-row').not(row).addClass('d-none');
        wrapper.find(row).addClass('d-flex');
    }

    changeView('#chat-content-views', '#chat-view');
})();