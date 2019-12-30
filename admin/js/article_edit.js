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
        console.log(1);
        editOrDraft('已发布');
    });

    /* 存为草稿 */
    $('.btn-draft').click(function (e) {
        e.preventDefault();
        console.log(2);

        editOrDraft('草稿');
    });

    //提交
    function editOrDraft(state) {
        let date = new Date();
        $("#testico").val(date.toJSON().split("T")[0]);
        const formData = new FormData($("#form")[0]);
        formData.append("id", id);
        formData.append("state", state)
        $.ajax({
            url: BigNew.article_edit,
            type: 'post',
            data: formData,
            contentType: false, // 禁止进行编码
            processData: false,
            success: function (edit) {
                console.log(edit);
                $('#myModal').modal({
                    keyboard: true
                });
                $(".modal-body").text(edit.msg)
                if (edit.code === 200) {
                    location.href = "./article_list.html"
                }
            }
        })
    }
    //文章id=>渲染
    let id = window.location.search.split("=")[1];
    $.ajax({
        url: BigNew.article_search,
        data: {
            id
        },
        success: function (searchback) {
            let id = searchback.data.categoryId;
            // console.log($("option[data-id=" + id + "]").val());
            if (searchback.code == 200) {
                //获取成功,把对应的数据显示在对应的标签上.
                $('input.title').val(searchback.data.title); //文章标题
                $('.article_cover').attr('src', searchback.data.cover); //文章封面
                $('select.category').val($("option[data-id=" + id + "]").val()); //文章类别
                $('#testico').val(searchback.data.date); //发布时间
                $("#content").val(searchback.data.content) //文章内容
            }
            setTimeout(function () {
                tinymce.activeEditor.setContent(searchback.data.content)
            }, 200);
        }
    })

})