const token = window.localStorage.getItem('token')
const id = window.localStorage.getItem('id')

if (!token || !id) {
    window.location.href='./login.html'
}else{
    getInfo()
}
function getInfo(){
    $.ajax({
        url: 'http://localhost:8888/users/info',
        method: 'GET',
        data: { id: id },
        headers: {
            authorization: token
        },
        success(res) {

            if (res.code !== 1) {
                window.location.href='./login.html'
                return
            }
        }
    })
}

$('form').on('submit',function(e){
    e.preventDefault()

    const data = $('form').serialize()

    $.ajax({
        url:'http://localhost:8888/users/rpwd',
        method:'POST',
        data:data+'&id='+id,
        headers: {
            authorization: token
        },
        success(res){
            console.log(res)
            if(res.code !== 1){
                $('form>span').css('display','block')
                return
            }else{
                window.alert('修改密码成功!点击确定跳转回登录页')
                window.location.href='./login.html'
            }
        }
    })
})