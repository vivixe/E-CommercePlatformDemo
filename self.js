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
            }else{
                console.log(res)

                $('form [name=username]').val(res.info.username)
                $('form [name=nickname]').val(res.info.nickname)
                $('form [name=age]').val(res.info.age)
                $('form [name=gender]').val(res.info.gender)

            }
        }
    })
}

$('form').on('submit',function(e){
    e.preventDefault()

    const data = $('form').serialize()

    $.ajax({
        url:'http://localhost:8888/users/update',
        method:'POST',
        data:data+'&id='+id,
        headers: {
            authorization: token
        },
        success(res){
            console.log(res)
            if(res.code === 1){
                window.alert('修改信息成功')
            }
        }
    })
})