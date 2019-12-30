$(() => {
    $.ajax({
        url: BigNew.user_detail,
        type: 'get',
        dataType: 'json',
        success: (backData) => {
            // console.log(backData);
            //遍历对象优化代码
            for (var key in backData.data) {
                $('input.' + key).val(backData.data[key]);
            }
            $('img.user_pic').attr('src', backData.data.userPic);
        }
    });
    //修改用户数据
    let url;
    //1.给file表单元素注册onchange事件
    $('#exampleInputFile').change(function () {
        //1.2 获取用户选择的图片
        const file = this.files[0];
        //1.3 将文件转为src路径
        url = URL.createObjectURL(file);
        //1.4 将url路径赋值给img标签的src
        $('.user_pic').attr('src', url);
    });
    $("#form").submit(function (e) {
        e.preventDefault();
        const formData = new FormData(this);
        const username = $("input.nickname").val()
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
                    parent.$(".user_center_link img", ".user_info img").attr("src", url);
                    parent.$(".user_info span").text("欢迎 " + username);
                }
            }
        })
    })
})