<template>
	<view class="login2" :style="{minHeight: Height}">
		<view @click="goback" class="header iconfont icon-chacha"></view>
		<image src="../../static/login/logo.png" class="logo" mode=""></image>
		<view class="main">
			<view class="input1 inputs">
				<view>+86</view>
				<input placeholder-class="place" placeholder="请输入手机号" type="number" @blur='yanzheng' v-model="phone" />
			</view>
			<view class="input2 inputs">
				<input @input="inputcode" placeholder-class="place" v-model='code' placeholder="请输入验证码" type="number" value="" />
				<view @click="btncode">{{codetext}}</view>
			</view>
			<view @tap="register" class="sure">验证手机号</view>
		</view>
		<view class="bot">

			客服电话 <span>0579-82060602</span>
		</view>
	</view>
</template>

<script>
	export default {

		onLoad(e) {
			this.tokens = e.tokens

			uni.getSystemInfo({
				success: (res) => {

					this.Height = res.windowHeight + 'px'

				}
			});
		},
		data() {
			return {
				tokens: '',
				tab: true,
				Height: '',
				phone: '',
				code: '',
				sending: false,
				codetext: "获取验证码"
			}
		},
		onHide() {
			this.sending = false
			clearInterval(this.time1)
			this.codetext = "获取验证码"
		},
		methods: {
			inputcode(){
				console.log(1)
				if(this.code.length > 6){
					this.code = this.code.substring(0, 6)
				}
				
			},
			goback() {
				uni.navigateBack({
					delta: 2
				})
			},
			yanzheng() { //输入时验证手机号
				var reg = /^[1][3,4,5,7,8][0-9]{9}$/ //必须为11位的手机数字结构
				if (!reg.test(this.phone)) {
					this.phone = ''
					uni.showToast({
						icon: "none",
						title: "请输入正确的手机号"
					})

				}

			},
			btncode() {
				if (this.sending) {
					return
				}
				var reg = /^[1][3,4,5,7,8][0-9]{9}$/ //必须为11位的手机数字结构
				if (!reg.test(this.phone)) {
					this.phone = ''
					uni.showToast({
						icon: "none",
						title: "请输入正确的手机号"
					})
					return
				}
				if (this.phone) {
					uni.request({
						url: this.websiteUrl + '/sms/verifycode', //仅为示例，并非真实接口地址。
						data: {
							mobile: this.phone,
						},
						method: "POST",
						header: {
							authorization: this.tokens //自定义请求头信息
						},

						success: (e) => {
							uni.showToast({
								icon: "success",
								title: "发送成功"
							})
							let time = 10
							this.sending = true
							this.time1 = setInterval(() => {
								time--
								this.codetext = time + "s后重新发送"
								if (time == -1) {
									this.sending = false
									clearInterval(this.time1)
									this.codetext = "获取验证码"
								}
							}, 1000)

						}
					})


				} else {
					uni.showToast({
						icon: "none",
						title: "请输入手机号"
					})
				}

			},
			register() { //注册
				if (this.phone == '') {
					uni.showToast({
						icon: "none",
						title: "请输入手机号"
					})
					return
				}
				if (this.code == '') {
					uni.showToast({
						icon: "none",
						title: "请输入验证码"
					})
					return
				}


				uni.request({
					url: this.websiteUrl + '/users/mobile', //仅为示例，并非真实接口地址。
					data: {
						mobile: this.phone,
						verifyCode: this.code
					},
					method: "PUT",
					header: {
						authorization: this.tokens //自定义请求头信息
					},

					success: (res) => {
						if (res.data.code == 0) {
							uni.showToast({
								icon: 'success',
								title: '绑定成功'
							})
							setTimeout(() => {
								uni.navigateTo({
									url: 'login3?tokens=' + this.tokens
								})
							}, 1500);
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.message
							})
						}


					}
				})

			},
		}
	}
</script>

<style>
	.login2 {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}

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

	.main {
		width: 604upx;
		margin: 80upx auto 0;
	}

	.main .inputs {
		width: 100%;
		display: flex;
		height: 100upx;
		line-height: 100upx;
		margin-bottom: 26upx;
		display: flex;
		border-bottom: 1upx solid #dcdcdc;
		line-height: 100upx;
	}

	.main .input1 view {
		width: 118upx;
		text-align: center;
		font-size: 29upx;
		color: #333;
	}

	.main .input1 input {
		width: 486upx;
		height: 100upx;
		display: inline-block;
	}

	.main .input2 view {
		width: 180upx;
		text-align: center;
		font-size: 29upx;
		color: #333;
	}

	.main .input2 input {
		width: 400upx;
		height: 100upx;
		display: inline-block;
		padding-left: 24upx;
	}

	.sure {
		height: 100upx;
		width: 100%;
		background: linear-gradient(to right, #16c4b0, #1fccb1, #34d9b5, #41e9bc);
		text-align: center;
		font-size: 40upx;
		border-radius: 50upx;
		text-align: center;
		color: #fff;
		line-height: 100upx;
		margin-top: 80upx;
	}

	.place {
		color: #bfbfbf;
		font-size: 30upx;
	}

	.bot {
		position: absolute;
		bottom: 40upx;
		left: 0;
		width: 100%;
		font-size: 20upx;
		text-align: center;
		color: #666666;
	}

	.bot span {
		color: #16c4af;
		margin-left: 20upx;
	}
</style>
