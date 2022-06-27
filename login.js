/*
 * @Author: vivi.
 * @Date: 2022-05-02 17:49:48
 * @LastEditTime: 2022-05-03 17:51:05
 * @FilePath: \code\js\jQuery\login.js
 * @Description: 
 */
$('form').on('submit', function (e) {
    e.preventDefault()

    const data = $('form').serialize()
    console.log(data)

    $.post('http://localhost:8888/users/login', data, res => {
        console.log(res)
        if (res.errcode === 1) {
            $('form>span').css('display', 'block')
            return
        }
        // window.alert('登录成功，点击确定跳转到首页')

        window.localStorage.setItem('token', res.token)
        window.localStorage.setItem('id', res.user.id)
        window.location.href = './index.html'
    })
})

