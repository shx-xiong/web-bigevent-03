$(function () {
    //点击a链接切换登录/注册模块
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //自定义验证规则
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $('.reg-form input[name=password]').val()
            if (pwd !== value) {
                return '两次输入密码不一致'
            }
        }
    })

    //注册功能
    $('.reg-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: {
                username: $('.reg-form input[name=username]').val(),
                password: $('.reg-form input[name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                $('#link_login').click()
                $('.reg-form')[0].reset()
            }
        })
    })

    //登录功能
    $('.login-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})