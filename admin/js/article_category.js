$(function () {
    function list() {
        $.ajax({
            url: BigNew.category_list,
            type: "get",
            dataType: "json",
            success: function (artList) {
                // console.log(artList);
                $("tbody").html(template("artList", artList));
            }
        });
    }
    list();
    //新增分类/修改
    $(".btn-success").on("click", function () {
        $("#myModal").modal({
            keyboard: true
        });
    });
    $("button.btn-primary").on("click", function () {
        let name = $("#category-name").val(),
            slug = $("#slug-text").val();
        $("#msgModal").modal({
            keyboard: true
        });
        // console.log(id, name, slug);
        if (id) {
            $.ajax({
                url: BigNew.category_edit,
                type: "post",
                dataType: "json",
                data: {
                    id,
                    name,
                    slug
                },
                success: function (artEdit) {
                    // console.log(artEdit);
                    $(".msg-body").text(artEdit.msg);
                }
            });
            list();
        } else if (name !== "" || slug !== "") {
            $.ajax({
                url: BigNew.category_add,
                type: "post",
                dataType: "json",
                data: {
                    name,
                    slug
                },
                success: function (artAdd) {
                    // console.log(artAdd);
                    $(".msg-body").text(artAdd.msg);
                }
            });
            list();
        } else {
            $(".msg-body").text("不能为空");
        }
        // console.log($("#form").reset());
        $("#category-name").val("");
        $("#slug-text").val("");
        $("#myModal").modal("hide");
    });
    //编辑类别
    let id;
    $("tbody").on("click", ".btn-info", function () {
        // console.log(id, name, slug);
        id = $(this).attr("data-id");
        $("#myModal").modal({
            keyboard: true
        });
    });

    $("tbody").on("click", ".btn-danger", function () {
        $.ajax({
            url: BigNew.category_delete,
            type: "post",
            dataType: 'json',
            data: {
                id: $(this).attr("data-id")
            },
            success: function (artDelete) {
                // console.log(artDelete);
                $("#msgModal").modal({
                    keyboard: true
                });
                $(".msg-body").text(artDelete.msg);
            }
        });
        // console.log($(this));
        $(this).parents("tr").remove();
    })
});