<template>
	<view>
		<view class="header">

			<view class="header-item" @tap="torealName('title=个人认证&src=https://img.hm8848.com/APP/auimg.png&url=realName')">
				<view class="header-item-left">
					<view class="icon" style="background: #ffae00;">
						<image style="width: 42upx;height: 45upx;" src="../../static/Authentication/index1.png" mode=""></image>
					</view>
					<view class="title">
						<view>实名认证</view>
						<view>个人信息审核认证</view>
					</view>
				</view>
				<view  class="header-item-right" :class="user.hasIdCard?'':'active'">
					{{user.hasIdCard?'已认证':'未认证'}}
				</view>
			</view>

			<view class="header-item" @tap="toenterName('title=企业认证&src=https://img.hm8848.com/APP/auimg2.png&url=enterprise')">
				<view class="header-item-left">
					<view class="icon" style="background: #5bb53c;">
						<image style="width: 42upx;height: 45upx;" src="../../static/Authentication/index2.png" mode=""></image>
					</view>
					<view class="title">
						<view>企业认证</view>
						<view>企业资质审核认证</view>
					</view>
				</view>
				<view class="header-item-right" :class="!user.businessLicense?'active':''">
					{{!user.businessLicense?'未认证':''}}
					{{(user.businessLicense.approvalStatus==1)?'审核中':''}}
					{{(user.businessLicense.approvalStatus==2)?'已拒绝':''}}
					{{(user.businessLicense.approvalStatus==3)?'已认证':''}}
				</view>
			</view>

			<view class="header-item" @tap="topay('title=诚信认证&src=https://img.hm8848.com/APP/auimg4.png&url=../pay/pay?type=sincerity')">
				<view class="header-item-left">
					<view class="icon" style="background: #339ee9;">
						<image style="width: 42upx;height: 45upx;" src="../../static/Authentication/index3.png" mode=""></image>
					</view>
					<view class="title">
						<view>诚信认证</view>
						<view>平台信任体系认证</view>
					</view>
				</view>
				<view class="header-item-right" :class="user.memberServiceTerm?'':'active'">
					{{user.memberServiceTerm?'已认证':'未认证'}}
				</view>
			</view>

			<view class="header-item" @tap="toserviceStation('title=服务站认证&src=https://img.hm8848.com/APP/auimg3.png&url=serviceStation',applications)">
				<view class="header-item-left">
					<view class="icon" style="background: #f45262;">
						<image style="width: 42upx;height: 45upx;" src="../../static/Authentication/index4.png" mode=""></image>
					</view>
					<view class="title">
						<view>服务站认证</view>
						<view>区县级服务管理员</view>
					</view>
				</view>
				<view class="header-item-right" :class="!user.agencyApplication?'active':''">
					{{!user.agencyApplication?'未认证':''}}
					{{user.agencyApplication.approvalStatus==1?'审核中':''}}
					{{user.agencyApplication.approvalStatus==2?'已拒绝':''}}
					{{user.agencyApplication.approvalStatus==3?'已认证':''}}
				</view>
			</view>

		</view>

		<view @click="call" class="footer"> <span class='iconfont icon-ziyuan'></span> 联系客服</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: 0,
				user: {

				}
			}
		},
		onShow() {
		
			this.$myhttp.get(this.websiteUrl + '/my', '', (res) => {
		
				this.user = res.data.data
				console.log(this.user)
			},this)
		},
		methods: {
			call(){
				uni.makePhoneCall({
					phoneNumber: '057982060602' //仅为示例
				})
			},
			torealName(e) {
				if (!this.user.hasIdCard) {
					uni.navigateTo({
						url: 'realNamebg?' + e
					})
				}
			},
			toenterName(e) {
				if (!this.user.hasIdCard ) {
					uni.showToast({
						icon: 'none',
						title: '请先进行实名认证'
					})
					return
				}
				if (!this.user.businessLicense) {
					uni.navigateTo({
						url: 'realNamebg?' + e
					})
					return
				}else{
					if (this.user.businessLicense.approvalStatus == 2) {
						uni.navigateTo({
							url: 'realNamebg?' + e
						})
					}
				}
				

			},
			topay(e) {
				if (!this.user.hasIdCard ) {
					uni.showToast({
						icon: 'none',
						title: '请先进行实名认证'
					})
					return
				}
				if (!this.user.memberServiceTerm) {
					uni.navigateTo({
						url: 'realNamebg?' + e
					})
				}
			},
			toserviceStation(e) {
				if (!this.user.hasIdCard) {
					uni.showToast({
						icon: 'none',
						title: '请先进行实名认证'
					})
					return
				}
				if (!this.user.businessLicense) {
					uni.showToast({
						icon: 'none',
						title: '请先进行企业认证'
					})
					return
				}else{
					if (this.user.businessLicense.approvalStatus !== 3) {
						uni.showToast({
							icon: 'none',
							title: '请先进行企业认证'
						})
						return
					}
					if (!this.user.agencyApplication) {
						uni.navigateTo({
							url: 'realNamebg?' + e
						})
						return
					}else{
						if (this.user.agencyApplication.approvalStatus == 2) {
							uni.navigateTo({
								url: 'realNamebg?' + e
							})
						}
					}
					
				}
				
			}
		}
	}
</script>

<style>
	page {
		background: #f6f6f6;
	}

	.header {
		margin-top: 20upx;
	}

	.header-item {
		background: #fff;
		margin-bottom: 2upx;
		height: 140upx;
		display: flex;
		justify-content: space-between;
	}

	.header-item-left {
		height: 100%;
		width: 462upx;
		overflow: hidden;
		display: flex;
	}

	.header-item-left .title {
		font-size: 30upx;
		color: #cccccc;
		margin-left: 32upx;
	}

	.header-item-left .title view:nth-of-type(1) {
		font-weight: bold;
		color: #000;
		font-size: 35upx;
		margin-top: 28upx;
	}

	.header-item-right {
		width: 111upx;
		height: 54upx;
		border-radius: 27upx;
		border: 1upx solid #16c4af;
		color: #16c4af;
		line-height: 54upx;
		text-align: center;
		font-size: 23upx;
		margin-right: 20upx;
		margin-top: 43upx;
	}

	.header-item-right.active {
		background: #16c4af;
		color: #fff;
	}

	.header-item-left .icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 98upx;
		height: 98upx;
		border-radius: 50%;
		margin: 21upx 0 0 18upx;

	}

	.footer {
		width: 711upx;
		height: 105upx;
		line-height: 105upx;
		background: linear-gradient(to right, #17c5af, #20cdb2, #37e0b9, #3fe9bb);
		color: #fff;
		font-size: 44upx;
		position: absolute;
		text-align: center;
		border-radius: 10upx;
		bottom: 40upx;
		left: 50%;
		transform: translateX(-50%);
	}

	.footer span {
		font-size: 50upx;
		margin-right: 10upx;
	}
</style>
