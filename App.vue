<script>
	import categories from 'pages/release/categories.js'
	export default {
		onLaunch: function() {
			 
			
			// #ifdef APP-PLUS  
			this.$http.get(this.websiteUrl+'/login/method?version='+plus.runtime.version,'',(res)=>{
			
				if(res.data.data){
					
				}
			})
			uni.request({
				url:'https://openapi.hm8848.com/login/method?version='+plus.runtime.version,
				success:(res)=>{
					console.log(res.data.data)
					if(!res.data.data){
						plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
							
						    uni.request({  
						        url: 'http://update.miaodadang.com/update?name=mdd?name=mdd&version='+widgetInfo.version,  
						        data:'',  
						        success: (result) => {
									var data = result.data.data; 
						            if (data.update && data.wgtUrl) {  
						                uni.downloadFile({  
						                    url: data.wgtUrl,  
						                    success: (downloadResult) => {  
						                        if (downloadResult.statusCode === 200) {  
						                            plus.runtime.install(downloadResult.tempFilePath, {  
						                                force: false  
						                            }, function() {  
						                                console.log('install success...');  
						                                plus.runtime.restart();  
						                            }, function(e) {  
						                                console.error('install fail...');  
						                            });  
						                        }  
						                    }  
						                });  
						            }  
						        }  
						    });  
						}); 
					}
				}
			})
			 
			// #endif 
			 
			 
			var categoriesIdList = {}
			for (let i = 0; i < categories.length; i++) {
				categoriesIdList[categories[i].id] = categories[i]
			}
			uni.setStorage({
				key:'category',
				data:JSON.stringify(categoriesIdList)
			})
			this.$store.state.categories = categoriesIdList
			//#ifdef APP-PLUS
			/* 5+环境锁定屏幕方向 */
			plus.screen.lockOrientation('portrait-primary'); //锁定
					  plus.push.addEventListener("click", function(msg) {  
								console.log(msg.payload)
								plus.push.clear()
								uni.navigateTo({
									url: "/pages/Authentication/enterprise"
								})
					  }, false);  
			       // 监听在线消息事件    
			       plus.push.addEventListener("receive", function(msg) {
						console.log(msg)
						var reg = /^\{.*\}$/
						if(reg.test(msg.content)){
							var data = JSON.parse(msg.content)
							plus.push.createMessage(data.text,"/pages/Authentication/enterprise",{
								title:data.title
							}); 
						}
						
						//plus.push.createMessage(1111, "/pages/Authentication/enterprise"); 
						
						// var iosmsgstr = msg.content.replace(/\'/g, '"')  		
						// plus.push.createMessage(1111, "/pages/Authentication/enterprise");  
						// if(msg.type){
						// 	var iosmsgstr = msg.content.replace(/\'/g, '"')				  
						// 	 var options = {  
						// 	          cover: false  
						// 	    };  		
						// 	plus.push.createMessage(iosmsgstr, "/pages/Authentication/enterprise", {cc:'aa'});  
						
						// } 
			       }, false);  
			//#endif
			
		},
		onShow: function() {
					console.log('App Show')
					//https://openapi.hm8848.com/access_token/create/6560351635791413248
					// this.$store.state.token = "i1L94soiikmXzEnTlUYKcA",
					// uni.setStorage({
					// 	key: "token",
					// 	data:"i1L94soiikmXzEnTlUYKcA"
					// })														
			
		},
		onHide: function() {

		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("./common/iconfont.css");
	@import url("./common/uni.css");
	@import url("./common/animate.css");

	page,
	view {}

	page {
		min-height: 100%;
	}
	.overs{
		overflow:hidden;
		text-overflow:ellipsis;
		white-space:nowrap;
	}
	.shareDetails{
		position: fixed;
		width: 100%;
		height: 100%;
		z-index: 1200;
		background: rgba(0,0,0,0.3);
	}
	.shareDetails .mains{
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 254upx;
		background: #fff;
	}
	.shareDetails .mains .shareClick{
		width: 308upx;
		display: flex;
		justify-content: space-between;
		line-height: 60upx;
		font-size: 28upx;
		margin: 48upx auto 0;
	}
	.shareDetails .mains .shareClick .shareClickItems{
		text-align: center;
		width:120upx;
	}
	.shareDetails .mains .shareClick image{
		width: 95upx;
		height: 95upx;
	}
</style>
