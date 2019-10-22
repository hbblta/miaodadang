import Vue from 'vue'
export default {
    //get请求
		get(url, param, backFun,that) {
		uni.getStorage({
			key:'token',
			success(e){
				var  token = e.data
				const data = JSON.stringify(param);
				return	uni.request({
							url: url,
							data: data,
							header:{
								authorization:token
							},
							success: (res)=>{
								if(res.data.code == 401){
									uni.showToast({
										title: '请登录',
										icon:'none'
									})
									uni.clearStorage('token')
									if(that){
										that.$store.state.token = ''
									}
									
									
									setTimeout(function() {
										uni.navigateTo({
											url: '/pages/login/login1'
										});
									}, 1000);
									
								}else{
									backFun(res)
								}
								
							},
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
			fail(e){
				// uni.navigateTo({
				// 	url:"/pages/Authentication/index.vue"
				// })
			}
		})
				
		 
    },
    //post请求
    post(url, param, backFun,that) {
		uni.getStorage({
			key:'token',
			success(e){
				var  token = e.data
				const data = JSON.stringify(param);
				return	uni.request({
							url: url,
							data: data,
							method:'POST',
							header:{
								authorization:token
							},
							success: (res)=>{
								if(res.data.code == 401){
									uni.showToast({
										title: '请登录',
										icon:'none'
									})
									uni.clearStorage('token')
									if(that){
										that.$store.state.token = ''
									}
									
									
									setTimeout(function() {
										uni.navigateTo({
											url: '/pages/login/login1'
										});
									}, 1000);
									
								}else{
									backFun(res)
								}
								
							},
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
			fail(e){
				// uni.navigateTo({
				// 	url:"/pages/Authentication/index.vue"
				// })
			}
		})
    },
	//delete请求
    delete(url, param, backFun,that) {
		uni.getStorage({
			key:'token',
			success(e){
				var  token = e.data
				const data = JSON.stringify(param);
				return	uni.request({
							url: url,
							data: data,
							method:'DELETE',
							header:{
								authorization:token
							},
							success:  (res)=>{
								if(res.data.code == 401){
									uni.showToast({
										title: '请登录',
										icon:'none'
									})
									uni.clearStorage('token')
									if(that){
										that.$store.state.token = ''
									}
									
									
									setTimeout(function() {
										uni.navigateTo({
											url: '/pages/login/login1'
										});
									}, 1000);
									
								}else{
									backFun(res)
								}
								
							},
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
			fail(e){
				// uni.navigateTo({
				// 	url:"/pages/Authentication/index.vue"
				// })
			}
		})
    },
	//put请求
	put(url, param, backFun) {
		uni.getStorage({
			key:'token',
			success(e){
				var  token = e.data
				const data = JSON.stringify(param);
				return	uni.request({
							url: url,
							data: data,
							method:'PUT',
							header:{
								authorization:token
							},
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
			fail(e){
				// uni.navigateTo({
				// 	url:"/pages/Authentication/index.vue"
				// })
			}
		})
	},
	
}