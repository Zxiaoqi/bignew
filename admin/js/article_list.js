$(function () {
    $.ajax({
        url: BigNew.category_list,
        type: "get",
        dataType: "json",
        success: function (artList) {
            // console.log(artList);
            $("#selCategory").html(template("category_list", artList));
        }
    });

    $('#btnSearch').click(function (e) {
        e.preventDefault();
        //2.2 ajax请求
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
                console.log(backData);
                $('.table>tbody').html(template('article_list', backData));
            }
        });
    });
    $('#btnSearch').trigger('click');

    // $("#selCategory").on('change', function () {
    //     // console.log($(this).val());
    //     let id = $("option:contains(" + $(this).val() + ")").attr("data-id");
    //     $.ajax({
    //         url: BigNew.article_search,
    //         type: 'get',
    //         data: {
    //             id
    //         },
    //         dataType: 'json',
    //         success: function (searchback) {
    //             console.log(searchback);

    //         }
    //     })
    // })

})