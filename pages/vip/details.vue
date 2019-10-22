<template>
	<view>
		<image class="banner" :src="obj.banner" mode=""></image>
		<image class="interests" :src="obj.interests" mode=""></image>
		<image class="evaluation" :src="obj.evaluation" mode=""></image>
		<view class="footer">
			<view @click="tourl('../pay/pay?type=vip&vipId='+id)" class="btn" :class="obj.type">
				¥{{obj.money}}立即开通
			</view>
		</view>
		<view class="pad">
			
		</view>
	</view>
</template>

<script>
	export default{
		onLoad(e){
			this.obj = e
			if(this.obj.type == 'crown'){
				this.obj.money = '8880'
				this.id = 7
			}else if(this.obj.type == 'gold'){
				this.obj.money = '1680'
				this.id = 5
			}else if(this.obj.type == 'masonry'){
				this.obj.money = '3980'
				this.id = 6
			}
		},
		data(){
			return{
				id:5,
				obj:{}
			}
		},
		onNavigationBarButtonTap(e){
				uni.makePhoneCall({
					phoneNumber: '057982060602' //仅为示例
				});
		},
		methods:{
			
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
		width: 710upx;
		height: 300upx;
		margin: 17upx auto 30upx;
		display: block;
	}
	.interests{
		width: 710upx;
		height: 1200upx;
		display: block;
		margin: 0 auto 30upx;
	}
	.evaluation{
		width: 710upx;
		height: 1200upx;
		display: block;
		margin: 0 auto;
	}
	.footer{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 152upx;
		z-index: 1000;
	}
	.btn{
		width: 710upx;
		height: 100upx;
		margin: 26upx auto;
		text-align: center;
		font-size:40upx;
		color: #fff;
		line-height: 100upx;
		border-radius:50upx;
	}
	.crown{
		background:linear-gradient(to right,#6e3cdc,#8642d8,#af4ed2,#d557cc,#f960c7);
	}
	.gold{
		background:linear-gradient(to right,#ff6d00,#ff7300,#ff7b00,#ff8d00,#ff9500);
	}
	.masonry{
		background:linear-gradient(to right,#00285d,#053970,#115794,#227dc4,#2b91dd);
	}
	.pad{
		height: 170upx;
	}
</style>
