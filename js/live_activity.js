var box = document.querySelector('.content_box')

// var box2 = document.querySelector('.box2')
// console.log(sessionStorage.code)
instance.post('v1/coupon-active/goods-list')
    .then(function (response) {
        if(response.data.code == 1){
            console.log(response.data.code)
			console.log('调用接口成功')
            var dataList = response.data.data
            var html = '';
            // var html2;
            for (var ele of dataList){
				// var param = JSON.stringify(ele)
				// <a href="${ele.return_link}">
					// <img src="${ele.goods_image}" alt="">
				// </a>
				// position: absolute;z-index:-999999;
				html += `<div class="${ele.type == '直播价' ? 'item_content' : 'item_content_bg'} " 
								onclick="changeGoods(${ele.id},${ele.sort},'${ele.return_link}','${ele.link_type}')">
							<div class="shangpin_img" >
								<span data-clipboard-action="copy" id="copy_url${ele.id}" data-clipboard-target="#copy_url${ele.id}" style='display: none' >${ele.return_link}</span>
								<img data-clipboard-action="copy" data-clipboard-target="#copy_url${ele.id}" id="copy_url${ele.id}" src="${ele.goods_image}" alt="">
							</div>
							<div class="discription_box">
								<div class="discription_box_top">
									<p class="shangpin_name"> ${ele.goods_name}  </p>
									<p class="shangpin_name2"> ${ele.goods_title} </p>
								</div>
								<div class="discription_box_bottom">
									<p class="one_text">日常<br />
										<span>¥${ele.goods_price}</span>
									</p>
									<p class="tow_text">${ele.type}<br />
										<span>¥${ele.lost_price}</span>
									</p>
									<p class="three_text">抢完<br/>恢复</p>
								</div>
							</div>
						</div>`
            }
            box.innerHTML = html;
            // box2.innerHTML = html2;
        }else{
            var message = response.data.errorMsg;
            
        }
    })
	// .catch(function (error) {
	// 		console.log('接口失败')
	//     var message = '接口失败'
	//     toast(message)
	// });
let from_name = getPar('from_name')
instance.post('v1/coupon-active/add-from-detail',{
	from_name: from_name
}).then(function (res) {
	
})

function changeGoods(id,type,return_link,link_type){
	var copy = '#copy_url' + id
	var byId = 'copy_url' + id
	var textUrl = document.getElementById(byId)
	var clipboard = new Clipboard(copy, {
		// text 设置元素隐藏后获取内容赋值
		text: function() {
		  return textUrl.innerHTML;
		}
	});
	if (isWeiXin() && link_type == '淘宝' ) {
		// alert(" 是来自微信内置浏览器")
		clipboard.on('success', function(e) {
		    toast("链接复制成功 打开淘宝");
		    e.clearSelection();
		});
		clipboard.on('error', function(e) {
		    toast("Gagal");
		});
	} else {
		window.location.href = return_link
		// window.location.href = 'https://m.tb.cn/h.Vrp5JRS?sm=fb80cb'
		// alert("不是来自微信内置浏览器")
	}
	instance.post('v1/coupon-active/add-click-detail',{goods_id: id})
	.then(function () {
		
	})
	
}
function isWeiXin() {
	var ua = window.navigator.userAgent.toLowerCase();
	// console.log(ua);
	//mozilla/5.0 (iphone; cpu iphone os 9_1 like mac os x) applewebkit/601.1.46 (khtml, like gecko)version/9.0 mobile/13b143 safari/601.1
	if (ua.match(/MicroMessenger/i) == 'micromessenger' || ua.match(/WeiBo/i) == "weibo") {
	    return true;
	} else {
	    return false;
	}
}
