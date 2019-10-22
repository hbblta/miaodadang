<template>
	<view>
		<view @tap="goback" class="header iconfont icon-chacha"></view>
		<image src="../../static/login/logo.png" class="logo" mode=""></image>
		<view v-if="time && cheshi" @click="toceshi" class="denglu">立即登录</view>
		<button v-if="time && !cheshi"  @click="logins" class="btns"></button>
		<view class="bot">
			<image @click="sureImg" :src="tab?'../../static/login/sure.png':''" mode=""></image>我已阅读并同意 <span @click='toagree'>《苗搭档用户注册协议》</span>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(){
			this.$http.get(this.websiteUrl+'/login/method?version='+plus.runtime.version,'',(res)=>{
				this.cheshi = res.data.data
				this.time++
			})
			setTimeout(()=> {
				this.time++
			}, 1500);
		},
		data() {
			return {
				tab:true,
				time:0,
				cheshi:false
			}
		},
		methods: {
			toceshi(){
				uni.navigateTo({
					url:'ceshiLogin'
				})
			},
			toagree(){
				uni.navigateTo({
					url:'agreement'
				})
			},
			goback() {
				uni.navigateBack({
					delta: 1
				})
			},
			sureImg() {
				if (this.tab) {
					this.tab = false
				} else {
					this.tab = true
				}
			},
			logins() {
				if(!this.tab){
					uni.showToast({
						icon:'none',
						title:'请阅读并同意用户注册协议'
					})
					return
				}

				uni.getProvider({
					service: 'oauth',
					success: (res) => {
						if (res.provider.indexOf('weixin') !== -1) {
							var _this = this;
							
									// #ifdef APP-PLUS
							var weixinService = null;
							// http://www.html5plus.org/doc/zh_cn/oauth.html#plus.oauth.getServices
							plus.oauth.getServices((services) => {
								for (var i = 0, len = services.length; i < len; i++) {
									if (services[i].id === 'weixin') {
										weixinService = services[i];
										break;
									}
								}
								weixinService.authorize((event) => {
									this.$http.get(this.websiteUrl + '/login?code=' + event.code, '', (res) => {
										console.log(res)
										var info = res.data.data
										console.log(info)
										uni.request({
											url: this.websiteUrl + '/my', //仅为示例，并非真实接口地址。

											header: {
												authorization: info //自定义请求头信息
											},
											data: '',
											success: (res) => {
												console.log(JSON.stringify(res))
												var mobile = res.data.data.user.mobile
												var location = res.data.data.shop.areaId
												if (mobile && location) {
													uni.showToast({
														icon: 'success',
														title: '登陆成功'
													})
													
													uni.setStorage({
														key: "userInfo",
														data:JSON.stringify(res.data.data)
													})
													setTimeout(()=> {
														this.$store.state.token = info
														uni.setStorage({
															key: "token",
															data: info
														})
														uni.reLaunch({
															url: '../tabs/tabs'
														})

													}, 1000);

												} else if(!mobile){
													uni.navigateTo({
														url: 'login2?tokens=' + info
													})
												}else{
													uni.navigateTo({
														url: 'login3?tokens=' + info
													})
												}

											}
										})
										

									});


								}, function(error) {
									console.error('authorize fail:' + JSON.stringify(error));
								}, {
									// http://www.html5plus.org/doc/zh_cn/oauth.html#plus.oauth.AuthOptions
									appid: 'wx9b474eb0a6ba77dd' //开放平台的应用标识。暂时填个假的充数，仅做演示。
								});

							}, function(error) {
								console.error('getServices fail:' + JSON.stringify(error));
							});
							// #endif
							
							



						} else {

						}


					}
				});
			}
		}
	}
</script>

<style>
	.header {
		margin-top: var(--status-bar-height);
		font-size: 40upx;
		line-height: 80upx;
		margin-left: 20upx;
	}

	.logo {
		display: block;
		width: 241upx;
		height: 310upx;
		margin: 94upx auto 189upx;
	}
	.denglu{
		width: 604upx;
		height: 100upx;
		color: #fff;
		text-align: center;
		line-height: 100upx;
		border-radius:50upx;
		background: linear-gradient(to right, #17c5af, #20cdb2, #37e0b9, #3fe9bb);
		margin: 0 auto;
	}
	.btns {
		width: 604upx;
		height: 100upx;
		background: url(../../static/login/login1Btn.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;

	}

	.btns:after {
		border: none;
	}

	.bot {
		position: absolute;
		bottom: 40upx;
		left: 0;
		width: 100%;
		font-size: 20upx;
		text-align: center;
	}

	.bot span {
		color: #16c4af;
	}

	.bot image {
		width: 40upx;
		height: 40upx;
		border: 1upx solid #16c4af;
		border-radius: 50%;
		vertical-align: middle;
		margin-right: 30upx;
	}
</style>
