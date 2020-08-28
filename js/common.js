(function(doc, win, undefined) {
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize',
		recalc = function() {
			var clientWidth = docEl.clientWidth;
			if(clientWidth === undefined) return;
			if(clientWidth>=750){
					docEl.style.fontSize='100px';
			}
			else{
				docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
			}
		};
	if(doc.addEventListener === undefined) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false)
	console.log('123')
})(document, window);


var baseurl = 'http://apisys.iushop.iuclub.vip/';

// var baseurl = 'http://apisys.iushop.test.iuclub.vip/';

var baseurlInvestment = 'http://apiapp.iushop.iuclub.vip/';

// var baseurlInvestment = 'http://apiapp.iushop.test.iuclub.vip/';

var baseurljdcloud = 'http://jdcloud.app.iuclub.vip/v1/';




var instance = axios.create({
    baseURL: baseurl,
    timeout: 10000,
});

var instanceInvestment = axios.create({
    baseURL: baseurlInvestment,
    timeout: 10000,
});

var baseurljdcloud = axios.create({
    baseURL: baseurljdcloud,
    timeout: 10000,
});


function getPar(par){
    //获取当前URL
    var local_url = document.location.href;

    //获取要取得的get参数位置
    var get = local_url.indexOf(par +"=");
    if(get == -1){
        return false;
    }
    //截取字符串
    var get_par = local_url.slice(par.length + get + 1);
	console.log(get_par)
    //判断截取后的字符串是否还有其他get参数
    var nextPar = get_par.indexOf("&");
    if(nextPar != -1){
        get_par = get_par.slice(0, nextPar);
    }
	console.log(get_par)
    return get_par;
}
function GetRequest() {
	//首先获取到当前页面的地址栏信息
	var url = window.location.href;//获取url地址
	var obj = {};//待会用来存放参数的对象
	var reg = /\?/;//匹配从?截取
	if(url.match(reg)) {
		//判断传入参数，以问号截取，问号后是参数
		var chars = url.split('?')[1];
		var arr = chars.split('&');//截取&号
		//获得截取后的数组为键值对字符串
		for (var i = 0; i < arr.length; i++) {
			//保守一点确定看是否为 name=value形式
			var num = arr[i].indexOf("=");
			if (num > 0) {
				//拼接字符串
				var name = arr[i].substring(0, num);
				var value = arr[i].substr(num + 1);
				//拼接对象，并转码
				obj[decodeURIComponent(name)] = decodeURIComponent(value);
			}
		}
	}
	return obj;
}
var isShow = false;
function toast(msg){
    if (isShow) {
        return
    }
    isShow = true;
    setTimeout(function(){
        isShow = false
    },5000)
    document.getElementsByClassName('toast-wrap')[0].getElementsByClassName('toast-msg')[0].innerHTML=msg;
    var toastTag = document.getElementsByClassName('toast-wrap')[0];
    toastTag.className = toastTag.className.replace('toastAnimate','');
    setTimeout(function(){
        toastTag.className = toastTag.className + ' toastAnimate';
    }, 100);
}
//金额格式的转换
function numFormat (num){
    num=num.toString().split(".");  // 分隔小数点
    var arr=num[0].split("").reverse();  // 转换成字符数组并且倒序排列
    var res=[];
    for(var i=0,len=arr.length;i<len;i++){
        if(i%3===0&&i!==0){
            res.push(".");   // 添加分隔符
        }
        res.push(arr[i]);
    }
    res.reverse(); // 再次倒序成为正确的顺序
    if(num[1]){  // 如果有小数的话添加小数部分
        res=res.join("").concat("."+num[1]);
    }else{
        res=res.join("");
    }
    return res;
};
