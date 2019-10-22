<template>
	<view>
		<view class="header">
			<view class="headerMoney w674">
				¥ {{order.price}}
			</view>
			<view class="headerOrder w674">
				订单编号:{{order.id}}
			</view>
			<view class="headerOrder w674">
				{{order.title}}
			</view>
		</view>
		<view class="modeTitle w674">
			请选择付款方式
		</view>
		<view class="mode">


			<radio-group @change="radioChange">
				<label>
					<view style="border-bottom:1upx solid #f6f6f6;" class="mode-item w674">
						<view class="mode-item-left">
							<image src="../../static/pay/weixin.png" mode=""></image>
							<view>微信支付</view>
						</view>
						<view class="mode-item-right">
							<radio color="#31cc32" value='weixin' :checked="type=='weixin'?true:false" />
						</view>
					</view>
				</label>
				<label>
					<view class="mode-item w674">
						<view class="mode-item-left">
							<image src="../../static/pay/zhifubao.png" mode=""></image>
							<view>支付宝支付</view>
						</view>
						<view class="mode-item-right">
							<radio color="#31cc32" value='zhifubao' :checked="type=='zhifubao'?true:false" />
						</view>
					</view>

				</label>
			</radio-group>
		</view>
		<view @tap="sure" class="footer">立即支付</view>
	</view>
</template>

<script>
	export default {
		
		onLoad(e){
			this.chooseType = e.type
			if(e.type == 'vip'){
				this.$myhttp.post(this.websiteUrl + '/my/vip/orders',{
					"vipId": e.vipId
				}, (res) => {
					this.order = res.data.data
				},this)
			}else if(e.type == 'points'){
				this.$myhttp.post(this.websiteUrl + '/my/recharge?points='+e.num, '', (res) => {
					this.order = res.data.data
				},this)
			}else if(e.type == 'other'){
				this.$myhttp.post(this.websiteUrl + '/my/recharge/'+e.methods, '', (res) => {
					this.order = res.data.data
				},this)
			}else{
				this.$myhttp.post(this.websiteUrl + '/members/orders', '', (res) => {
					this.order = res.data.data
				},this)
			}
		},
		onNavigationBarButtonTap(e) {
			uni.makePhoneCall({
				phoneNumber: '057982060602' //仅为示例
			});
		},
		data() {
			return {
				chooseType:'vip',
				type: "weixin",
				order: {}
			}
		},
		methods: {
			radioChange(e) {
				this.type = e.detail.value

			},
			sure() {
				if (this.type == 'weixin') {
					uni.getProvider({ //先获得是否有微信支付
						service: 'payment',
						success: (res) => {
							console.log(res.provider)
							if (res.provider.indexOf("wxpay") !== -1) {
								var url 
								if(this.chooseType == 'vip'){
									url = this.websiteUrl + '/my/vip/orders/' + this.order.id + '/pay/wechat'
								}else if(this.chooseType == 'points'){
									url = this.websiteUrl + '/my/recharge/' + this.order.id + '/pay/wechat'
								}else if(this.chooseType == 'other'){
									url = this.websiteUrl + '/my/recharge/' + this.order.id + '/pay/wechat'
								}else{
									url = this.websiteUrl + '/members/orders/' + this.order.id + '/pay/wechat'
								}
								this.$myhttp.get(url, '', (res) => {
									var orderInfo = res.data.data
									uni.requestPayment({
										provider: 'wxpay',
										orderInfo: orderInfo, //微信、支付宝订单数据
										success: (res) => {

											uni.showToast({
												icon: "success",
												title: '支付成功'
											})
											setTimeout(() => {
												uni.reLaunch({
													url: '../tabs/tabs'
												})
											}, 1000);
										},
										fail: (err) => {
											uni.showToast({
												icon: "none",
												title: '支付失败'
											})
										}
									})

								},this)
							} else {
								uni.showToast({
									icon: "none",
									title: '请开通微信支付'
								})
							}
						}
					});
				} else {
				
					uni.getProvider({ //先获得是否有支付宝支付
					
						service: 'payment',
						success: (res) => {
							if (res.provider.indexOf("alipay") !== -1) {
								var url
								if(this.chooseType == 'vip'){
									url = this.websiteUrl + '/my/vip/orders/' + this.order.id + '/pay/alipay'
								}else if(this.chooseType == 'points'){
									url = this.websiteUrl + '/my/recharge/' + this.order.id + '/pay/alipay'
								}else if(this.chooseType == 'other'){
									url = this.websiteUrl + '/my/recharge/' + this.order.id + '/pay/alipay'
								}else{
									url = this.websiteUrl + '/members/orders/' + this.order.id + '/pay/alipay'
								}
								this.$myhttp.get(url, '', (res) => {
									console.log(res)
									var orderInfo = res.data.data
									uni.requestPayment({
										provider: 'alipay',
										orderInfo: orderInfo, //微信、支付宝订单数据
										success: (res) => {
											uni.showToast({
												icon: "success",
												title: '支付成功'
											})
											setTimeout(() => {
												uni.reLaunch({
													url: '../tabs/tabs'
												})
											}, 1000);
										},
										fail: (err) => {
											uni.showToast({
												icon: "none",
												title: '支付失败'
											})
										}
									})

								},this)
							} else {
								uni.showToast({
									icon: "none",
									title: '请开通支付宝支付'
								})
							}
						}
					});
				}

			}
		}
	}
</script>

<style>
	.header {
		border-top: 3upx solid #f6f6f6;
		border-bottom: 1upx solid #f6f6f6;
	}

	.w674 {
		width: 674upx;
		margin: 0 auto;
	}

	.headerMoney {
		line-height: 80upx;
		color: #323332;
		font-size: 40upx;
		font-weight: bold;
	}

	.headerOrder {
		line-height: 60upx;
		color: #9a9a9a;
		font-size: 24upx;
	}

	.modeTitle {
		line-height: 82upx;
		color: #9a9a9a;
		font-size: 24upx;
		border-bottom: 1upx solid #f6f6f6;
	}

	.mode-item {
		height: 132upx;
		display: flex;
		justify-content: space-between;
	}

	.mode-item .mode-item-left {
		display: flex;
		line-height: 132upx;
		font-size: 32upx;
		color: #323332;
	}

	.mode-item .mode-item-left image {
		margin: 28upx 30upx 0 0;
		vertical-align: middle;
		width: 75upx;
		height: 75upx;
	}

	.mode-item-right {
		display: flex;
		align-items: center;
	}

	.footer {
		width: 711upx;
		height: 105upx;
		line-height: 105upx;
		background: linear-gradient(to right, #17c5af, #20cdb2, #37e0b9, #3fe9bb);
		color: #fff;
		font-size: 44upx;
		text-align: center;
		border-radius: 10upx;
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		bottom: 35upx;
	}
</style>
