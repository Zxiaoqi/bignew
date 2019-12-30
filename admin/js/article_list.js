$(function () {
    $.ajax({
        url: BigNew.category_list,
        success: function (artList) {
            // console.log(artList);
            $("#selCategory").html(template("category_list", artList));
        }
    });

    function query() {
        $.ajax({
            url: BigNew.article_query,
            type: 'get',
            dataType: 'json',
            data: {
                perpage: 10, //每页返回10条数据
                type: $('#selCategory').val(),
                state: $('#selStatus').val(),
            },
            success: function (backData) {
                // console.log(backData);
                $('.table>tbody').html(template('article_list', backData.data));
            }
        });
    }
    query();
    //
    // $("#myModal").on("show.bs.modal", function (e) {
    //     $("button.btn-primary").text($(e.relatedTarget).text())
    // })
    //
    $('#btnSearch').on("click", function (e) {
        e.preventDefault();
        query();
    });
    $('#btnSearch').trigger('click');

    $("tbody").on("click", "a.delete", function () {
        $.ajax({
            url: BigNew.article_delete,
            type: 'post',
            data: {
                id: $(this).attr("data-id")
            },
            success: function (artdel) {
                $("#msgModal").modal({
                    keyload: true
                });
                $(".modal-body").text(artdel.msg)
            }
        })
    })

    $("#selCategory").on('change', function () {
        let txt = $(this).val();
        let id = $("option:contains(" + txt + ")").attr("data-id");
        $.ajax({
            url: BigNew.article_search,
            type: 'get',
            data: {
                id
            },
            dataType: 'json',
            success: function (searchback) {
                // console.log(searchback);
                const sb = searchback.data;
                const result = `<tr>
                <td>${sb.title}</td>
                <td>${sb.author}</td>
                <td>${txt}</td>
                <td class="text-center">${sb.date}</td>
                <td class="text-center">${sb.state}</td>
                <td class="text-center">
                    <a href="article_edit.html?id=${sb.id}" data-id="${sb.id}"
                        class="btn btn-default btn-xs">编辑</a>
                    <a href="javascript:void(0);" data-id="${sb.id}" class="btn btn-danger btn-xs delete">删除</a>
                </td>
            </tr>`;
                $('.table>tbody').html(result);
            }
        })
    })

})