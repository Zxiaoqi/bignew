$(() => {

    $.ajax({
        type: "get",
        url: BigNew.user_info,
        dataType: "json",
        success: (backData) => {
            $('.user_info>img').attr('src', backData.data.userPic);
            $('.user_center_link>img').attr('src', backData.data.userPic);
            $('.user_info>span').text('欢迎  ' + backData.data.nickname);
        }
    })
    $('.logout').click(() => {
        //2.1 删除token
        localStorage.removeItem('token');
        //2.2 跳转登录页
        window.location.href = './login.html';
    })
    $(() => {
        $(".level01").click(function () {
            // console.log($(this));
            $(this)
                .addClass("active")
                .siblings()
                .removeClass("active");
            if (
                $(this)
                .next()
                .hasClass("level02")
            ) {
                $(this)
                    .next(".level02")
                    .slideToggle();
                $(this)
                    .find("b")
                    .toggleClass("rotate0");
                $(".level02>li>a")
                    .first()[0]
                    .click();
            } else {
                $(".level02>li")
                    .removeClass("active")
                    .parent(".level02")
                    .slideUp()
                    .prev()
                    .find("b")
                    .removeClass("rotate0");
            }
        });
        $(".level02>li").click(function () {
            $(this)
                .addClass("active")
                .siblings()
                .removeClass("active");
        });
    });

})