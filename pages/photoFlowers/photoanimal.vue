<template>
	<view>
		<view @tap="chooseImg" class="imgs">
			<image v-if="info.img" :src="info.img" mode=""></image>
			 <view v-else class="add">
				<view class="iconfont icon-jia1"></view>
				<view>点击上传昆虫照片</view>
			</view>
		</view>
		<view  class="title">
			{{info.title}}
		</view>
		<view  class="btnsGroup">
			<view @click="buynongyao" class="buy btn">购买农药</view>
			<view @tap="chooseImg" style="background: #F0AD4E;" class="again btn">继续识别</view>
		</view>
		<view v-if="info.introduce" class="main">
			{{info.introduce}}
		</view>
	</view>
</template>

<script>
	export default{
		onLoad(){
			uni.getStorage({
				key:'animals',
				success:(e)=>{
					
					this.info = JSON.parse(e.data)
				}
			})
		},
		data(){
			return{
				info:{
					title:'',
					img:'',
					introduce:''
				}
			}
		},
		methods:{
			buynongyao(){
				uni.showToast({
					icon:'none',
					title:'暂未开放'
				})
			},
			chooseImg(){
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], //从相册选择
					success:  (res)=> {
						uni.showLoading({
							title: '加载中'
						});
						var img = res.tempFilePaths[0]
			
						
						uni.uploadFile({
							url: 'https://openapi.hm8848.com/ocr/animal', //仅为示例，非真实的接口地址
							filePath: img,
							name: 'file',
							header:{
								authorization:this.$store.state.token
							},
							success: (uploadFileRes) => {
								console.log(uploadFileRes)
								var data = JSON.parse(uploadFileRes.data)
								
								if(data.data[0].name == '非动物'){
									uni.showToast({
										icon:'none',
										title:'非动物'
									})
								}else{
									var obj = {
										img:'',
										introduce:'',
										title:''
									}
									obj.title = data.data[0].name
								if( data.data[0].baike_info.image_url){
									obj.img = data.data[0].baike_info.image_url
									obj.introduce = data.data[0].baike_info.description
								
								}
								this.info = obj
									
								}
								
							},
							complete(){
								uni.hideLoading()
							}
						});
					},
					fail:(res)=>{
						uni.showToast({
							'icon':'none',
							'title':'图片上传失败'
						})
					}
				});
			}
		}
	}
</script>

<style>
	.imgs{
		width: 600upx;
		height: 600upx;
		margin: 40upx auto;
	}
	.imgs image{
		width: 600upx;
		height: 600upx;
	}
	.add{
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		border: 2upx solid #dedede;
		text-align: center;
		font-size:30upx;
		color: #d5d5d5;
	}
	.add .icon-jia1{
		font-size:80upx;
		margin: 160upx auto 60upx;
		color: #d5d5d5;
	}
	.title{
		text-align: center;
		line-height: 120upx;
		font-size: 34upx;
	}
	.btnsGroup{
		width: 640upx;
		margin: 0 auto;
		display: flex;
		justify-content: space-around;
	}
	.btnsGroup .btn{
		height: 80upx;
		line-height: 80upx;
		border-radius: 5upx;
		font-size: 30upx;
		background: #00AA00;
		width: 200upx;
		color: #fff;
		text-align: center;
	}
	.main{

		width: 650upx;
		padding-bottom: 100upx;
		margin:30upx auto 0;
		line-height: 60upx;
		color: #929292;
		font-size: 30upx;
	}
</style>
