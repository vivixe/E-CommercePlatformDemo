const token = window.localStorage.getItem('token')
const id = window.localStorage.getItem('id')

if (!token || !id) {
    window.location.href = './login.html'
} else {
    getCartList()
}
function getCartList() {
    $.ajax({
        url: 'http://localhost:8888/cart/list',
        method: 'GET',
        data: { id: id },
        headers: {
            authorization: token
        },
        success(res) {
            if (res.code !== 1) {
                window.location.href = './login.html'
                return
            }
            bindHtml(res)
        }
    })
}

function bindHtml(res) {
    if (!res.cart.length) {
        $('.empty').addClass('active')
        $('.list').removeClass('active')
        return
    }

    let selectNum = 0, totalPrice = 0, totalNum = 0
    res.cart.forEach(item => {
        if (item.is_select) {
            selectNum++
            totalNum += item.cart_number
            totalPrice += item.cart_number * item.current_price
        }
    })

    let str = `
    <div class="top">
    全选<input class="selectAll" type="checkbox" ${selectNum === res.cart.length ? 'checked' : ''}>
</div>
<ul class="center">
    `
    res.cart.forEach(item => {
        str += `
        <li>
        <div class="select">
            <input ${item.is_select ? 'checked' : ''} type="checkbox" goodsId="${item.goods_id}">
        </div>
        <div class="show">
            <img src="${item.img_small_logo}" alt="">
        </div>
        <div class="title">
            ${item.title}
        </div>
        <div class="price">￥${item.current_price}</div>
        <div class="number">
            <button goodsId="${item.goods_id}" class="sub">-</button>
            <input class="cart_number" type="text" value="${item.cart_number}">
            <button goodsId="${item.goods_id}" class="add">+</button>
        </div>
        <div class="subPrice">￥${(item.current_price * item.cart_number).toFixed(2)}</div>
        <div class="destory">
            <button goodsId="${item.goods_id}" class="del">删除</button>
        </div>
    
        `
    })

    str += `
    </li>
</ul>
<div class="bottom">
    <p>
        共计<span>${totalNum}</span>件商品
    </p>
    <div class="btns">
        <button class="clear">清空购物车</button>
        <button class="clear_complete" ${selectNum === 0 ? 'disabled' : ''}>删除已选中</button>
        <button class="pay" ${selectNum === 0 ? 'disabled' : ''}>去支付</button>
    </div>
    <p>
        共计 ￥<span>${totalPrice.toFixed(2)}</span>
    </p>
</div>
`

    $('.list').html(str)
}
//单一商品选择
$('.list').on('click', '.center .select input', function () {
    $.ajax({
        url: 'http://localhost:8888/cart/select',
        method: 'POST',
        data: { id: id, goodsId: $(this).attr('goodsId') },
        headers: {
            authorization: token
        },
        success(res) {

        }
    })
    getCartList()
})
//单一商品加数量
$('.list').on('click', '.center .number .add', function () {
    $.ajax({
        url: 'http://localhost:8888/cart/number',
        method: 'POST',
        data: {
            id: id,
            goodsId: $(this).attr('goodsId'),
            number: $(this).prev().val() - 0 + 1
        },
        headers: {
            authorization: token
        }
    })
    getCartList()
})
//单一商品减数量
$('.list').on('click', '.center .number .sub', function () {
    const number = $(this).next().val() - 0
    if (number <= 1) return

    $.ajax({
        url: 'http://localhost:8888/cart/number',
        method: 'POST',
        data: {
            id: id,
            goodsId: $(this).attr('goodsId'),
            number: $(this).next().val() - 0 - 1
        },
        headers: {
            authorization: token
        },
    })
    getCartList()
})
//删除单一商品
$('.list').on('click', '.center .del', function () {
    $.ajax({
        url: 'http://localhost:8888/cart/remove',
        method: 'GET',
        data: {
            id: id,
            goodsId: $(this).attr('goodsId'),
        },
        headers: {
            authorization: token
        }
    })
    getCartList()
})
//全选事件
$('.list').on('click', '.selectAll', function () {
    const type = $(this).prop('checked') ? 1 : 0
    $.ajax({
        url: 'http://localhost:8888/cart/select/all',
        method: 'POST',
        data: {
            id: id,
            type: type,
        },
        headers: {
            authorization: token
        }
    })
    getCartList()
})
//清空购物车
$('.list').on('click', '.clear', function () {
    $.ajax({
        url: 'http://localhost:8888/cart/clear',
        method: 'GET',
        data: {
            id: id
        },
        headers: {
            authorization: token
        }
    })
    getCartList()
})
//删除所有已选中
$('.list').on('click', '.clear_complete', function () {
    $.ajax({
        url: 'http://localhost:8888/cart/remove/select',
        method: 'GET',
        data: {
            id: id
        },
        headers: {
            authorization: token
        }
    })
    getCartList()
})
//支付
$('.list').on('click', '.pay', function () {
    console.log('去支付')
})