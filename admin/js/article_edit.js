$(function () {
    let id = window.location.search.split("=")[1] || 0;
    // console.log(id);
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
    let categoryId;
    $("select.category").on('change', function () {
        categoryId = $(this).val();
    })
    //提交
    function editOrDraft(state) {
        let file = $("[type='file']")[0].files[0];
        let cover = file ? URL.createObjectURL(file) : " ";
        let date = $("#testico").val() || (new Date()).toJSON().split("T")[0];
        //限制内容不能为空
        if ($("#mytextarea").val() === "") {
            $('#myModal').modal({
                keyboard: true
            });
            $(".modal-body").text("内容不能为空")
            return;
        }
        // console.log(cover);
        $.ajax({
            url: BigNew.article_edit,
            type: 'post',
            data: {
                id: id,
                title: $(".title").val(),
                cover: cover,
                categoryId: categoryId,
                date: date,
                content: $("#mytextarea").val(),
                state: state
            },
            success: function (edit) {
                // console.log(edit);
                $('#myModal').modal({
                    keyboard: true
                });
                $(".modal-body").text(edit.msg)
                if (edit.code === 200) {
                    setTimeout(function () {
                        location.href = "./article_list.html"
                    }, 1000)
                }
            }
        })
    }
    //文章id=>渲染
    $.ajax({
        url: BigNew.article_search,
        data: {
            id
        },
        success: function (searchback) {
            if (searchback.code === 400) {
                $('#myModal').modal({
                    keyboard: true
                });
                $(".modal-body").text(searchback.msg)
            }
            if (searchback.code == 200) {
                let id = searchback.data.categoryId;
                //获取成功,把对应的数据显示在对应的标签上.
                $('input.title').val(searchback.data.title); //文章标题
                $('.article_cover').attr('src', searchback.data.cover); //文章封面
                $('select.category').val($("option[value=" + id + "]").val()); //文章类别
                $('#testico').val(searchback.data.date); //发布时间
                $("#mytextarea").val(searchback.data.content) //文章内容
            }
        }
    })
    //富文本
    tinymce.init({
        selector: '#mytextarea',
        language: 'zh_CN',
        directionality: 'rtl',
        browser_spellcheck: true,
        contextmenu: false,
        plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table contextmenu paste imagetools wordcount",
            "code"
        ],
        toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code",

    })
})