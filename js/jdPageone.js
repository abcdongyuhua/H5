function orderSearch () {
	var orderId = $(" #input_value ").val()
	if (!orderId) {
		toast('请输入要查询的机构名称或授权编号')
	} else {
		baseurljdcloud.post('company/info',{
			seach_name: orderId
		}).then(res => {
			if (res.data.code == 1 ) {
				window.location.href = 'jdPagetwo.html?seach_name=' + orderId
			} else {
				toast(res.data.message)
			}
		})
	}
	
	
}