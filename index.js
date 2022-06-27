/*
 * @Author: vivi.
 * @Date: 2022-05-02 18:38:34
 * @LastEditTime: 2022-05-03 17:49:25
 * @FilePath: \code\js\jQuery\index.js
 * @Description: 
 */
const token = window.localStorage.getItem('token')
const id = window.localStorage.getItem('id')

if (!token || !id) {
    $('.off').addClass('active')
    $('.on').removeClass('active')
} else {
    getInfo()
}
function getInfo() {
    $.ajax({
        url: 'http://localhost:8888/users/info',
        method: 'GET',
        data: { id: id },
        headers: {
            authorization: token
        },
        success(res) {
            console.log(res)
            if (res.code !== 1) {
                $('.off').addClass('active')
                $('.on').removeClass('active')
                return
            }else{
                $('.on').addClass('active').find('span').text(res.info.nickname)
                $('.off').removeClass('active')
            }
        }
    })
}

$('button.self').on('click',function(){
    window.location.href='./self.html'
})
$('button.logout').on('click',function(){
    $.get('http://localhost:8888/users/logout',{id:id},res=>{
        window.location.reload()
    })
})