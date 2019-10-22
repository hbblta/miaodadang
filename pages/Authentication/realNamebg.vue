<template>
	<view>
		<image :src="obj.src" mode=""></image>
		<view @tap="tourl" class="footer">立即认证</view>
	</view>
	
</template>

<script>
	export default{
		data(){
			return {
				obj:{}
			}
		},
		onLoad(e){
				this.obj = e
				uni.setNavigationBarTitle({
				　　title:e.title
				})
		},
		methods:{
			tourl(){
				uni.navigateTo({
					url:this.obj.url
				})
			}
		}
	}
</script>

<style>
	page{
		background: #f6f6f6;
	}
	image{
		width: 100%;
		height: 1212upx;
		padding-bottom: 140upx;
	}
	.footer{
		width: 711upx;
		height: 105upx;
		line-height: 105upx;
		background: linear-gradient(to right,#17c5af,#20cdb2,#37e0b9,#3fe9bb);
		color: #fff;
		font-size: 44upx;
		text-align: center;
		border-radius: 10upx;
		position: fixed;
		left:50%;
		transform: translateX(-50%);
		bottom:35upx;
	}
</style>
