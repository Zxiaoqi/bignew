$(function () {
    //文章类别
    $.ajax({
        url: BigNew.category_list,
        success: function (artList) {
            // console.log(artList);
            $("#selCategory").html(template("category_list", artList));
        }
    });

    //获取所有数据
    function query(Page) {
        $.ajax({
            url: BigNew.article_query,
            data: {
                page: Page,
                perpage: 10, //每页返回10条数据
                type: $('#selCategory').val(),
                state: $('#selStatus').val(),
            },
            success: function (backData) {
                // console.log(backData);
                $('.table>tbody').html(template('article_list', backData.data));
                let totalPage = backData.data.totalPage
                loadPagination(totalPage, Page)
            }
        });
    }
    query();
    //
    $('#btnSearch').on("click", function (e) {
        e.preventDefault();
        query();
    });
    $('#btnSearch').trigger('click');
    //删除文章
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
                if (artdel.code === 204) {
                    query();
                }
            }
        })
    })
    //分页器
    function loadPagination(totalPage, startPage) {
        //(1)先销毁上一次的分页数据
        $('#pagination').twbsPagination('destroy');
        //(2)加载分页插件
        $('#pagination').twbsPagination({
            totalPages: totalPage,
            startPage: startPage,
            visiblePages: 7,
            first: '首页',
            prev: '上一页',
            next: '下一页',
            last: '尾页',
            onPageClick: function (event, page) {
                //如果点击的页数与当前页数不一致，则发送ajax请求
                if (page !== startPage) {
                    query(page);
                };
            }
        });
    };
    
})