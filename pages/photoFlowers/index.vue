<template>
	<view>
		<image @click="tophoflower" style="margin-top: 40upx;" src="../../static/index/photo1.png" mode=""></image>
		<image @click="toanimal" style="margin-top: 34upx;" src="../../static/index/photo2.png" mode=""></image>
	</view>
</template>
<script>
	export default{
		onLoad(){
			
		},
		methods:{
			tophoflower(){
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], //从相册选择
					success:  (res)=> {
						uni.showLoading({
							title: '加载中'
						});
						var img = res.tempFilePaths[0]
						console.log(img)
						
						uni.uploadFile({
							url: 'https://openapi.hm8848.com/ocr/plant', //仅为示例，非真实的接口地址
							filePath: img,
							name: 'file',
							header:{
								authorization:this.$store.state.token
							},
							success: (uploadFileRes) => {
								var data = JSON.parse(uploadFileRes.data)
								
								if(data.data[0].name == '非植物'){
									uni.showToast({
										icon:'none',
										title:'非植物'
									})
								}else{
									var obj = {
										img:'',
										introduce:'',
										title:''
									}
									obj.title = data.data[0].name
									if(data.data[0].baike_info.image_url){
										obj.img = data.data[0].baike_info.image_url
										obj.introduce = data.data[0].baike_info.description
										
									}
									uni.setStorage({
										key:'flowers',
										data:JSON.stringify(obj),
										success(){
											uni.navigateTo({
												url:'photogFlowers'
											})
										}
									})
								
									
									
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
			},
			toanimal(){
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
									if(data.data[0].baike_info.image_url){
										obj.img = data.data[0].baike_info.image_url
										obj.introduce = data.data[0].baike_info.description
										
									}
									uni.setStorage({
										key:'animals',
										data:JSON.stringify(obj),
										success(){
											uni.navigateTo({
												url:'photoanimal'
											})
										}
									})
									
									
									
									
									
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
	page{
		background: #f6f6f6;
		text-align: center;
	}
	image{
		width: 711upx;
		height:346upx;
		
	}
</style>
