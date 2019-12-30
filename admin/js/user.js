$(() => {
    $.ajax({
        url: BigNew.user_detail,
        // headers: {
        //     Authorization: token
        // },
        type: 'get',
        dataType: 'json',
        success: (backData) => {
            // console.log(backData);
            //渲染页面
            //遍历对象优化代码
            for (var key in backData.data) {
                $('input.' + key).val(backData.data[key]);
            }
            $('img.user_pic').attr('src', backData.data.userPic);
        }
    });
    //修改用户数据


    //1.给file表单元素注册onchange事件
    $('#exampleInputFile').change(function () {
        //1.2 获取用户选择的图片
        const file = this.files[0];
        //1.3 将文件转为src路径
        const url = URL.createObjectURL(file);
        //1.4 将url路径赋值给img标签的src
        $('.user_pic').attr('src', url);
    });
    $("button.btn").on("click", () => {
        const formData = new FormData();
        const form = $("form").serializeArray();
        let username, nickname, email, password;
        username = form[0].value;
        nickname = form[1].value;
        email = form[2].value;
        password = form[3].value;

        const file = $("#exampleInputFile")[0].files[0];

        formData.append("username", username)
        formData.append("nickname", nickname)
        formData.append("email", email)
        formData.append("password", password)
        formData.append("userPic", file);


        $.ajax({
            url: BigNew.user_edit,
            type: "post",
            data: formData,
            contentType: false, // 禁止进行编码
            processData: false,
            dataType: "json",
            success: (backData) => {
                $('#myModal').modal({
                    keyboard: true
                });
                if (backData.code === 200) {
                    $(".modal-body").text(backData.msg)
                    // window.parent.location.reload();
                }
            }
        })
    })
})