var baseURL = 'http://ajax.frontend.itheima.net'
$.ajaxPrefilter(function (options) {
    options.url = baseURL + options.url
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token')
        }
    }

})