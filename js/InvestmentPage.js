var box = document.querySelector('.content_box')
var tankuang = document.querySelector('.tankuang')
var index = 0
var dataList = []
let id = getPar('id')

function getshowClass () {
	instanceInvestment.post('v1/recruit-merchat/show-class', {
		id: id
	}).then(function (response) {
		if(response.data.code == 1){
			var dataList = response.data.data
			var html = '';
			// var html2;
			for (var i=0;i<dataList.length;i++) {
				html += '<div class="item_box">'
				html +=		'<img src=" '+dataList[i].icon_url+' " >'
				html +=		'<span class="text"> '+dataList[i].class_name+'</span>'
				html +=		'<span class="num"> ('+dataList[i].number+') </span>'
				html +=	'</div>'
			}
			// for (var ele of dataList){
				
			// }
			box.innerHTML = html;
		}else{
			box.innerHTML = ''
		}
	})
}
getshowClass ()

function getdatalistApi () {
	instanceInvestment.post('v1/recruit-merchat/merchant-list',{
		id: id
	}).then(function (response) {
		if(response.data.code == 1){
			if (response.data.data.length > 0) {
				setTimeoutFun(3000,showBox)
			} else {
				setTimeoutFun2 ()
			}
		    dataList = response.data.data
		}else{
			dataList = []
		}
	})
}
getdatalistApi ()
function setTimeoutFun2 () {
	// index++
	setTimeout(function () {
		getdatalistApi ()
	}, 3000);
}


// function hideBox () {
// 	var time = setTimeout(function () {
// 		console.log(index)
// 		$(".tankuang").hide();
		// if (index + 1 == dataList.length) {
		// 	index = 0
		// 	getdatalistApi ()
		// } else {
		// 	index++
		// 	showBox ()
		// }
// 		console.log('后来=====',index)
// 	}, 10000);
	
// }

// function showBox () {
// 	// index++
// 	setTimeout(function () {
// 		$(".tankuang").show();
		// var html = '';
		// // alert(index)
		// html += `<p> <img src="${dataList[index].status == '1' ? './img/Mcn/success.png':'./img/Mcn/fail.png'}" > </p>
		// 		<p style="margin-top: 30px;">  ${dataList[index].merchant_name} </p>
		// 		<p> ${dataList[index].principal} </p>
		// 		<p> 品类：${dataList[index].class_name} </p>`
		// tankuang.innerHTML = html;
// 		hideBox ()
// 	}, 2000);
// }
function hideBox () {
	// $(".tankuang").hide();
	if (dataList[index].status == 2) {
		
		$(".tankuang_fail").hide();
	} else {
		$(".tankuang").hide();
	}
	if (index + 1 == dataList.length) {
		index = 0
		getdatalistApi ()
	} else {
		index++
		setTimeoutFun(3000,showBox)
	}
	
}

function showBox () {
	// $(".tankuang").show();
	var html = '';
	if (dataList[index].status == 2) {
		$(tankuang).removeClass('tankuang')
	    $(tankuang).addClass('tankuang_fail');
		$(".tankuang_fail").show();
	} else {
		$(tankuang).removeClass('tankuang_fail')
		$(tankuang).addClass('tankuang');
		$(".tankuang").show();
	}
	var url = ''
	if (dataList[index].status == 1) {
		url = './img/Mcn/success.png'
	} else {
		url = './img/Mcn/fail.png'
	}
	
	html += '<p> <img class="tangkaung_img" src='+url+'> </p>'
	html +=	'<p style="margin-top: 30px;">  '+dataList[index].merchant_name+' </p>'
	html +=	'<p class="tankuang_p"> '+dataList[index].principal+' </p>'
	html +=	'<p class="tankuang_p"> 品类：'+dataList[index].class_name+' </p>'
	// console.log(html)
	tankuang.innerHTML = html;
	updateRelease(dataList[index].id)
	setTimeoutFun(5000,hideBox)
}

function setTimeoutFun (time,fun) {
	setTimeout(function (){
		fun ()
	}, time)
}

function setTimeoutShowClass () {
	setInterval(function () {
		getshowClass ()
	},15000)
}
setTimeoutShowClass ()

// 已发布
// /v1/recruit-merchat/release
function updateRelease (merchatId) {
	instanceInvestment.post('/v1/recruit-merchat/release', {
		meeting_id: id,
		id: merchatId
	}).then( function (res) {
		// console.log(res)
	})
}