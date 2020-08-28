var content = document.querySelector('.content_box')
// var box = document.('.content_box')
let seach_name = GetRequest('seach_name')
console.log(seach_name)
baseurljdcloud.post('company/info',{
	seach_name: seach_name.seach_name
}).then(res => {
	// console.log(res.data)
	let data = res.data
	var datas = res.data.data
	if (data.code == 1 ) {
		var html = ''
		html = `<div class="content_row">
					<p>授权企业</p>
					<p>${datas.company_name}</p>
				</div>
				<div class="content_row">
					<p>授权产品</p>
					<p>${datas.warrant_product}</p>
				</div>
				<div class="content_row">
					<p>授权区域</p>
					<p>${datas.warrant_area}</p>
				</div>
				<div class="content_row">
					<p>有效期</p>
					<p> ${datas.begin_date} - ${datas.end_date}</p>
				</div>
				<div class="bottom">
					<p onclick="returnPage()">
						返回
					</p>
				</div>`
		content.innerHTML = html;
	}
})
function returnPage () {
	window.location.href = 'jdPageone.html'
}
