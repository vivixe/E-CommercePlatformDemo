
const goodsId=window.localStorage.getItem('goodsId')

if(!goodsId)window.location.href='./list.html'

getInfo()
function getInfo(){
    $.get('http://localhost:8888/goods/item',{id:goodsId},res=>{
        $('.show>img').prop('src',res.info.img_big_logo)
        $('.info>.title').text(res.info.title)
        $('.info>.price').text('￥'+res.info.current_price)
    })
    

}