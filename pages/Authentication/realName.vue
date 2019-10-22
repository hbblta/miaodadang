<template>
	<view>
		<view class="header">
			<view class="w673">
				<view class="headerTitle">
					身份证照片
				</view>
				<view class="front">
					 <view class="front-left">
						 <image v-if="idcard.face" @tap="chooseImg('face')" class="add" :src="idcard.face" mode=""></image>
						 <view v-else @tap="chooseImg('face')" class="add">
							 <view class="iconfont icon-jia1"></view>
							 <view>身份证正面照片</view>
						 </view>
					
					
						
					 </view>
					
					 <view class="front-right" @tap="prefront('../../static/Authentication/real1.jpeg')">
						  <span>例：</span>
						  <image src="../../static/Authentication/real1.jpeg" mode=""></image>
						  <view class="mask">点击查看</view>
					 </view>
				</view>
				
				<view class="front" style="margin-top:10upx;">
					 <view class="front-left">
						 <image v-if="idcard.back" @tap="chooseImg('back')" class="add" :src="idcard.back" mode=""></image>
						 <view v-else class="add" @tap="chooseImg('back')">
							 <view class="iconfont icon-jia1"></view>
							 <view>身份证反面照片</view>
						 </view>
						 
					 </view>
					 <view class="front-right" @tap="prefront('../../static/Authentication/real2.jpeg')">
						  <image src="../../static/Authentication/real2.jpeg" mode=""></image>
						  <view class="mask">点击查看</view>
					 </view>
				</view>
				
			</view>
			
		</view>
		<view @tap="sure" class="footer">立即认证</view>
	</view>
</template>

<script>
	export default{
		onNavigationBarButtonTap(e){
				uni.makePhoneCall({
					phoneNumber: '057982060602' //仅为示例
				});
		},
		data(){
		  return{
			  idcard:{
				  face:'',
				  back:''
			  },
		  }	
		},
		methods:{
			prefront(url){
				uni.previewImage({
							current:0,
							urls:[url],
							success:(e)=>{
								console.log(e)
							},
							fail:(e)=>{
								console.log(e)
							}
						});
			},
			chooseImg(face){
				
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], //从相册选择
					success:  (res)=> {
						uni.showLoading({
							title: '加载中'
						});
						var img = res.tempFilePaths[0]
						this.upload(face,img)
					},
					fail:(res)=>{
						uni.showToast({
							'icon':'none',
							'title':'图片上传失败'
						})
					}
				});
				
			},
			upload(face,img){
				console.log(img)
				 uni.uploadFile({
					url: 'https://openapi.hm8848.com/ocr/idcard/'+face, //仅为示例，非真实的接口地址
					filePath: img,
					name: 'file',
					header:{
						authorization:this.$store.state.token
					},
					success: (uploadFileRes) => {
						var data = JSON.parse(uploadFileRes.data)
						if(data.code == '0'){
							this.idcard[face] = data.data
							
							uni.showToast({
								'icon':'success',
								'title':'上传成功'
							})
						}else{
							uni.showToast({
							'icon':'none',
							'title':data.message
						})
						}
					}
				});
			},
			sure(){
				if(this.idcard.face == ""){
					uni.showToast({
							'icon':'none',
							'title':'请上传身份证正面'
						})
				}else if( this.idcard.back == ""){
					uni.showToast({
							'icon':'none',
							'title':'请上传身份证反面'
						})
				}else{
					uni.showToast({
					icon:'success',
					title:'上传成功'
					})
					setTimeout(()=> {
						uni.navigateBack({
							delta:2
						})
					}, 1000);
				}
			}
		}
	}
</script>

<style>
	page{
		background: #f6f6f6;
		
	}
	.header{
		margin-top: 4upx;
		height: 571upx;
		width: 100%;
		background: #fff;
	}
	.w673{
		width: 674upx;
		margin: 0 auto;
	}
	.headerTitle{
		height: 78upx;
		line-height: 78upx;
		font-size: 30upx;
	}
	.front{
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
	.front>view{
		width: 290upx;
		height: 224upx;
		
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
		font-size:45upx;
		margin: 60upx auto 28upx;
		color: #d5d5d5;
	}
	.front-right image{
		width: 100%;
		height: 100%;
	}
	.front-right{
		position: relative;
	}
	.front-right .mask{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: #333;
		opacity: 0.7;
		color: #fff;
		text-align: center;
		line-height: 224upx;
		font-size: 30upx;
	}
	.front-right span{
		position: absolute;
		color: #fff;
		font-size: 32upx;
		left: -55upx;
		top: 0;
		z-index: 999;
		color: #333;
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
