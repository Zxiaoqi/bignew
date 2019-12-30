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

    $("option").on('click', function () {
        console.log(123);
        $(this).selected = true;

        $.ajax({
            url: BigNew.article_search,
            type: 'get',
            data: {
                id: $(this).attr("data-id")
            },
            dataType: 'json',
            success: function (searchback) {
                console.log(searchback);

            }
        })
    })

})