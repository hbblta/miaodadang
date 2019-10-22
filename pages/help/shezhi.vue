<template>
	<view>
		<view @click="toabout" class="item">
			<view class="itemMain">
				<view class="itemMainLeft">
					关于我们
				</view>
				<view class="itemMainRight">
					<span class='iconfont icon-xiayibu'></span>
				</view>
			</view>
		</view>
		<view @click="tohelp('https://help.hm8848.com/Clause.html')"  class="item">
			<view  class="itemMain">
				<view class="itemMainLeft">
					使用条款
				</view>
				<view class="itemMainRight">
					<span class='iconfont icon-xiayibu'></span>
				</view>
			</view>
		</view>
		<view @click="tohelp('https://help.hm8848.com/Privacy.html')"  class="item">
			<view class="itemMain">
				<view class="itemMainLeft">
					政策隐私
				</view>
				<view class="itemMainRight">
					<span class='iconfont icon-xiayibu'></span>
				</view>
			</view>
		</view>
		
		<view @click="sure" class="footer">
			{{token?'退出登录':'点击登录'}}
		</view>
	</view>
</template>

<script>
	export default{
		onShow(){
			this.token = this.$store.state.token
		},
		data(){
			return{
				token:''
			}
		},
		methods:{
			sure(){
				if(this.$store.state.token){
					uni.clearStorage('token')
					this.$store.state.token = ''
					uni.navigateBack({
						delta:1
					})
				}else{
					uni.navigateTo({
						url:'../login/login1'
					})
				}
				
				
			},
			toabout(){
				uni.navigateTo({
					url:'about'
				})
			},
			tohelp(e){
				uni.navigateTo({
					url:'help?url='+e
				})
			}
		}
	}
</script>

<style>
	.item{
		width: 100%;
		height: 100upx;
		border-bottom:1upx solid #efefef;
		line-height: 100upx;
	}
	.itemMain{
		width: 612upx;
		margin: 0 auto;
		font-size: 30upx;
		color: #333;
		display: flex;
		justify-content:space-between;
	}
	.itemMain span{
		font-weight:0;
		font-size: 20upx;
		color: #c7c7c7;
	}
	.footer {
		position: absolute;
		left: 50%;
		bottom: 75upx;
		transform: translateX(-50%);
		width: 711upx;
		height: 105upx;
		line-height: 105upx;
		background: linear-gradient(to right, #17c5af, #20cdb2, #37e0b9, #3fe9bb);
		color: #fff;
		font-size: 44upx;
		text-align: center;
		border-radius: 10upx;
	}
</style>
