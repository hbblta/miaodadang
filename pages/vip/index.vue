<template>
	<view>
		<image class="banner" src="https://img.hm8848.com/APP/vipindexBanner.png" mode=""></image>
		<image @click="tourl('details?type=gold&banner=https://img.hm8848.com/APP/goldBanner.png&interests=https://img.hm8848.com/APP/goldInterests.png&evaluation=https://img.hm8848.com/APP/crownEvaluation.png')" class="viplist" src="https://img.hm8848.com/APP/viplist1.png" mode=""></image>
		<image @click="tourl('details?type=masonry&banner=https://img.hm8848.com/APP/masonryBanner.png&interests=https://img.hm8848.com/APP/masonryInterests.png&evaluation=https://img.hm8848.com/APP/crownEvaluation.png')" class="viplist" src="https://img.hm8848.com/APP/viplist2.png" mode=""></image>
		<image @click="tourl('details?type=crown&banner=https://img.hm8848.com/APP/crownBanner.png&interests=https://img.hm8848.com/APP/crownInterests.png&evaluation=https://img.hm8848.com/APP/crownEvaluation.png')" class="viplist" src="https://img.hm8848.com/APP/viplist3.png" mode=""></image>
		<view class="title">
			更多vip服务推荐
		</view>
		<view class="botList">
			<image @click="tocheng" src="https://img.hm8848.com/APP/VIPb1.png" mode=""></image>
			<image @click="tofu" src="https://img.hm8848.com/APP/VIPb2.png" mode=""></image>
			<image @click="topay('brand')" src="https://img.hm8848.com/APP/VIPb3.png" mode=""></image>
			<image @click="topay('website')" src="https://img.hm8848.com/APP/VIPb4.png" mode=""></image>
			<image @click="topay('location')" src="https://img.hm8848.com/APP/VIPb5.png" mode=""></image>
			<image @click="topay('ring')" src="https://img.hm8848.com/APP/VIPb6.png" mode=""></image>
			<image @click="topay('wechat1')" src="https://img.hm8848.com/APP/VIPb7.png" mode=""></image>
			<image @click="topay('wechat2')" src="https://img.hm8848.com/APP/VIPb8.png" mode=""></image>
			<image @click="topay('wechat3')" src="https://img.hm8848.com/APP/VIPb9.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default{
		created(){
			this.$myhttp.get(this.websiteUrl+'/my','',(res)=>{
				this.users = res.data.data
			})
		},
		data(){
			return{
				users:{
					
				}
			}
		},
		onNavigationBarButtonTap(e){
				uni.makePhoneCall({
					phoneNumber: '057982060602' //仅为示例
				});
		},
		methods:{
			topay(method){
				uni.navigateTo({
					url:'../pay/pay?type=other&methods='+method
				})
			},
			tocheng(){
				if(this.users.memberServiceTerm){
					uni.showToast({
						icon:'none',
						title:'您已经是诚信会员'
					})
					return
				}else{
					uni.navigateTo({
						url:'../Authentication/index'
					})
				}
			},
			tofu(){
				if(this.users.agencies.length){
					uni.showToast({
						icon:'none',
						title:'您已申请是服务站'
					})
					return
				}else{
					uni.navigateTo({
						url:'../Authentication/index'
					})
				}
			},
			tourl(e){
		
				if(this.$store.state.token){
					uni.navigateTo({
						url:e
					})
				}else{
					uni.showToast({
						icon:'none',
						title:'请登录'
					})
					setTimeout(()=> {
						uni.navigateTo({
							url:'../login/login1'
						})
					}, 1000);
				}
			},
		}
	}
</script>

<style>
	page{
		background: #f6f6f6;
	}
	.banner{
		width: 100%;
		height: 387upx;
	}
	.viplist{
		width: 710upx;
		height: 300upx;
		display: block;
		margin: 20upx auto;
	}
	.title{
		line-height: 85upx;
		margin-top: 20upx;
		color: #333;
		font-size: 34upx;
		font-weight: bold;
		text-align: center;
	}
	.botList{
		width: 710upx;
		margin: 0 auto;
		padding-bottom: 62upx;
		display: flex;
		justify-content: space-between;
		flex-wrap:wrap;
	}
	.botList image{
		width: 226upx;
		height: 280upx;
		margin-bottom: 20upx;
	}
</style>
