/*
 * @Author: vivi.
 * @Date: 2022-05-01 17:01:36
 * @LastEditTime: 2022-05-03 17:07:44
 * @FilePath: \code\js\jQuery\register.js
 * @Description: 
 */
$('form').on('submit',function(e){
    e.preventDefault()

    const data=$('form').serialize()
    console.log(data)

    $.post('http://localhost:8888/users/register',data,res=>{
        console.log(res)
        if(res.code === 0){
            $('form>span').css('display','block')
            return
        }
        window.alert('注册成功，点击确定跳转到登录页')
        window.location.href='./login.html'
        
    })
})