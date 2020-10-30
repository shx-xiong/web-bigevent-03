$(function () {
    var layer = layui.layer
    var form = layui.form
    //获取文章分类列表
    initArtCate()
    function initArtCate() {
        $.ajax({
            url: '/my/article/cates',
            success: function (res) {
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    //添加文章分类
    var indexAdd = null
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '250px'],
            content: $('#dialog-add').html()
        })
    })
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                initArtCate()
                layer.msg(res.message)
                layer.close(indexAdd)
            }
        })
    })

    //编辑文章分类
    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '250px'],
            content: $('#dialog-edit').html()
        })

        var Id = $(this).data('id')
        $.ajax({
            url: '/my/article/cates/' + Id,
            success: function (res) {
                form.val('form-edit', res.data)
            }
        })
    })
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                initArtCate()
                layer.msg(res.message)
                layer.close(indexEdit)
            }
        })
    })

    //删除文章分类
    $('tbody').on('click', '.btn-delete', function () {
        var Id = $(this).data('id')
        layer.confirm('确定删除?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            $.ajax({
                url: '/my/article/deletecate/' + Id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    initArtCate()
                    layer.msg(res.message)
                    layer.close(index)
                }
            })
        })
    })
})