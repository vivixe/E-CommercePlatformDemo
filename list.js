getCateList()
function getCateList(){
    $.get('http://localhost:8888/goods/category',res=>{
        console.log(res)

        let str='<li class="active">全部</li>'
        res.list.forEach(item=>{
            str+=`<li>${item}</li>`
        })
        $('.category').html(str)
    })
}

const info = {
    current:1,
    pagesize:12,
    search:'',
    filter:'',
    saleType:10,
    sortType:'id',
    sortMethod:'ASC',
    category:''
}

let totalPage = 1

getGoodsList()
function getGoodsList(){
    $.get('http://localhost:8888/goods/list',info,res=>{
        totalPage=res.total
        bindHtml(res)
    })
}
function bindHtml(res){
    console.log(res)
    if(info.current===1)$('.left').addClass('disable')
    else $('.left').removeClass('disable')

    if(info.current===res.total)$('.right').addClass('disable')
    else $('.right').removeClass('disable')

    $('.total').text(`${ info.current} / ${ res.total }`)

    $('select').val(info.pagesize)

    $('.page').val(info.current)

    let str = ``
    res.list.forEach(item=>{
        str+=`
        <li goodsId="${item.goods_id}">
            <div class="show"> 
                <img src="${item.img_big_logo}" alt="">
                ${item.is_hot?'<div class="hot">hot</div>':''}
                ${item.is_sale?'<div class="sale">sale</div>':''}
            </div>
            <div class="info">
                <p class="title">${item.title}</p>
                <p class="price">
                    <span class="current">￥ ${item.current_price}</span>
                    <span class="old">￥ ${item.price}</span>
                </p>
                <button goodsId="${item.goods_id}">加入购物车</button>
            </div>
        </li>
        `
    })
    $('.list').html(str)
}

$('.category').on('click','li',function(){
    $(this).addClass('active').siblings().removeClass('active')

    info.category=$(this).text()==='全部'?'':$(this).text()
    info.current=1
    getGoodsList()
})

$('.filter').on('click','li',function(){
    $(this).addClass('active').siblings().removeClass('active')

    info.filter=$(this).attr('type')
    info.current=1
    getGoodsList()
})
$('.sale').on('click','li',function(){
    $(this).addClass('active').siblings().removeClass('active')

    info.saleType=$(this).attr('type')
    info.current=1
    getGoodsList()
})
$('.sort').on('click','li',function(){
    $(this).addClass('active').siblings().removeClass('active')

    info.sortType=$(this).attr('type')
    info.sortMethod=$(this).attr('method')
    getGoodsList()
})

$('.search').on('input',function(){
    info.search=$(this).val().trim()
    info.current=1

    getGoodsList()
})
$('.left').on('click',function(){
    if($(this).hasClass('disable'))return
    info.current--
    getGoodsList()
})
$('.right').on('click',function(){
    if($(this).hasClass('disable'))return
    info.current++
    getGoodsList()
})
$('select').on('change',function(){
    info.pagesize=$(this).val()
    info.current=1
    getGoodsList()
})
$('.jump').on('click',function(){
    let page=$('.page').val()
    if(isNaN(page))page=1
    if(page<=1)page=1
    if(page>=totalPage)page=totalPage

    info.current=page
    getGoodsList()
})

$('.list').on('click','button',function(e){
    e.stopPropagation()
    const token = window.localStorage.getItem('token')
    const id = window.localStorage.getItem('id')
    if (!token || !id) {
        window.alert('您还没有登录，请登录后再进行添加操作')
        return
    }
    $.ajax({
        url: 'http://localhost:8888/cart/add',
        method: 'POST',
        data: { id: id,goodsId:$(this).attr('goodsId') },
        headers: {
            authorization: token
        },
        success(res) {
            console.log(res)
            if (res.code !== 1) {
                window.confirm('您还没有登录，请登录后再进行添加操作')
                return
            }else{
                window.alert('加入购物车成功')
            }
        }
    })
})
$('.list').on('click','li',function(){
    console.log('进入详情页')
    window.localStorage.setItem('goodsId',$(this).attr('goodsId'))
    window.location.href='./detail.html'
})