<template>
	<view class="zai-box">
		<image src="../../static/login/logo.png" mode='aspectFit' class="zai-logo"></image>
	
		<view class="zai-form">
			<input v-model="zhanghao" class="zai-input" placeholder-class placeholder="请输入账号" />
			<input v-model="password" class="zai-input" placeholder-class password placeholder="请输入密码"/>
			<button @click="denglu" class="zai-btn">立即登录</button>
			
		</view>
	</view>
</template>
<script>
	export default{
		data(){
			return{
				password:'',
				zhanghao:''
			}
		},
		methods:{
			denglu(){
				this.$http.get(this.websiteUrl+'/login/mobile?mobile='+this.zhanghao+'&password='+this.password,'',(res)=>{
					if(res.data.code == 0){
						uni.showToast({
							icon: 'success',
							title: '登陆成功'
						})
						
						
						setTimeout(()=> {
							this.$store.state.token = res.data.data
							uni.setStorage({
								key: "token",
								data: res.data.data
							})
							uni.reLaunch({
								url: '../tabs/tabs'
							})
						
						}, 1000);
					}else{
						uni.showToast({
							icon:'none',
							title:res.data.message
						})
					}
				})
			}
		}
	}
</script>

<style>
	.zai-box{
		padding: 0 100upx;
		position: relative;
	}
	.zai-logo{
		width: 100%;
		width: 100%;
		height: 310upx;
	}
	.zai-title{
		position: absolute;
		top: 0;
		line-height: 360upx;
		font-size: 68upx;
		color: #fff;
		text-align: center;
		width: 100%;
		margin-left: -100upx;
	}
	.zai-form{
		margin-top: 300upx;
	}
	.zai-input{
		background: #e2f5fc;
		margin-top: 30upx;
		border-radius: 100upx;
		padding: 20upx 40upx;
		font-size: 36upx;
	}
	.input-placeholder, .zai-input{
		color: #94afce;
	}
	.zai-label{
		padding: 60upx 0;
		text-align: center;
		font-size: 30upx;
		color: #a7b6d0;
	}
	.zai-btn{
		background: #ff65a3;
		color: #fff;
		border: 0;
		border-radius: 100upx;
		font-size: 36upx;
		margin-top: 40upx;
	}
	.zai-btn:after{
		border: 0;
	}
	/*按钮点击效果*/
	.zai-btn.button-hover{
		transform: translate(1upx, 1upx);
	}
</style>