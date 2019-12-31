$(function () {
    $.ajax({
        url: BigNew.category_list,
        success: function (artList) {
            // console.log(artList);
            $(".category").html(template("category_list", artList));
        }
    });
    //图片修改
    $('#inputCover').change(function () {
        //1.2 获取用户选择的图片
        var file = this.files[0];
        //1.3 将文件转为src路径
        var url = URL.createObjectURL(file);
        //1.4 将url路径赋值给img标签的src
        $('.article_cover').attr('src', url);
    });
    //发布
    $('.btn-edit').click(function (e) {
        e.preventDefault();
        editOrDraft('已发布');
    });

    /* 存为草稿 */
    $('.btn-draft').click(function (e) {
        e.preventDefault();
        editOrDraft('草稿');
    });
    //
    //提交
    function editOrDraft(state) {
        let date = $("#testico").val() || (new Date()).toJSON().split("T")[0];
        console.log($("[type='file']")[0].files[0]);

        if ($("#content").val() === "" || !$("[type='file']")[0].files[0]) {
            $('#myModal').modal({
                keyboard: true
            });
            $(".modal-body").text("内容和图片不能为空")
            return;
        }
        const formData = new FormData($("#form")[0]);
        formData.set("date", date)
        formData.append("state", state)
        $.ajax({
            url: BigNew.article_publish,
            type: 'post',
            data: formData,
            contentType: false, // 禁止进行编码
            processData: false,
            success: function (publish) {
                // console.log(publish);
                $('#myModal').modal({
                    keyboard: true
                });
                $(".modal-body").text(publish.msg)
                if (publish.code === 200) {
                    setTimeout(function () {
                        location.href = "./article_list.html"
                    }, 500)
                }
            }
        })
    }
})