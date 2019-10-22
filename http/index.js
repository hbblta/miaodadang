export default {
    //get请求
    get(url, param, backFun) {
		const data = JSON.stringify(param);
		return	uni.request({
					url: url,
					data: data,
					success: backFun,
					fail: (err) => {
						uni.showModal({
							content:'网络异常,请稍后重试...',
							showCancel:false
						})
					},
					complete:()=> {
					} 
			    })	 
    },
    //post请求
    post(url, param, backFun) {
		const data = JSON.stringify(param);
        return	uni.request({
        			url: url,
        			data: data,
					method:'POST',
        			success: backFun,
        			fail: (err) => {
        				uni.showModal({
        					content:'网络异常,请稍后重试...',
        					showCancel:false
        				})
        			},
        			complete:()=> {
        			} 
        		})	
    }
}