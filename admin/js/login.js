$(() => {
    /* 登录功能思路
    1.给登录按钮注册点击事件
    2.阻止默认跳转事件（表单submit会自动跳转页面）
    3.获取用户名和密码
    4.非空判断
    5.ajax发送请求
    6.处理响应结果   a.成功：跳转管理系统首页    b.失败：提示用户
     */
    //1.给登录按钮注册点击事件
    $('.login_form').submit(function (e) {
        //2.阻止默认跳转事件（表单submit会自动跳转页面）
        e.preventDefault();
        //3.获取用户名和密码
        const username = $('.input_txt').val().trim(); //去除前后空格
        const password = $('.input_pass').val().trim();
        //4.非空判断
        if (username == '' || password == '') {
            $('#myModal').modal({
                keyboard: true
            });
            $(".modal-body").text("用户名与密码不能为空")
            return;
        };
        //5.ajax发送请求
        $.ajax({
            url: BigNew.user_login,
            type: 'post',
            dataType: 'json',
            data: {
                username,
                password
            },
            success: (backData) => {
                //  console.log(backData);
                //6.处理响应结果  a.成功：跳转管理系统首页  b.失败：提示用户
                if (backData.code == 200) {
                    //跳转首页
                    localStorage.setItem("token", backData.token)
                    window.location.href = './index.html';
                } else {
                    $('#myModal').modal({
                        keyboard: true
                    });
                    $(".modal-body").text(backData.msg)
                }
            }
        });
    });
});