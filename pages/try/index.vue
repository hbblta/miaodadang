<!-- <template>
	<view>
		<view @tap="aaa">llll</view>
		<view @tap="rrr">1112313213</view>
		<image :src="aa" mode=""></image>
	</view>
</template>

<script>

	export default{
		onLoad(){
				//#ifdef APP-PLUS
				if(plus.os.name == 'iOS') {  
                              var PHPhotoLibrary = plus.ios.importClass('PHPhotoLibrary')  
                              var PHAuthorizationStatus = PHPhotoLibrary.authorizationStatus()  
                              if(PHAuthorizationStatus != 3 ) {  
                                 uni.showModal({  
                                    content: '需要访问您的相册，请在设置里开启',  
                                    confirmText: '设置',  
                                    success: res => {  
                                        if(res.confirm) {  
                                            plus.runtime.openURL('app-settings://')  
                                        }  
                                    }  
                                 });   
                              }  
                      }
				//#endif
		},
		data(){
			return {
				aa:''
			}
		},
		methods:{
			rrr(){
				console.log(uploadFile)
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				
					success:  (res)=> {
						this.aa =res.tempFilePaths[0]
						var filess = res.tempFilePaths[0]
						uni.request({
							url: 'https://openapi.hm8848.com/oss', //仅为示例，并非真实接口地址。
							success: (res) => {
								var datas = res.data
								console.log(datas)
								uploadFile(filess,datas.signature,datas.AccessKeyId,datas.key,(res)=>{
									console.log(res)
								},(res)=>{
									console.log(res)
								})
								
							}
						});
						
					}
				})
			},
			aaa(){
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				
					success:  (res)=> {
						this.aa =res.tempFilePaths[0]
						var filess = res.tempFilePaths[0]
						uni.request({
							url: 'https://openapi.hm8848.com/oss', //仅为示例，并非真实接口地址。
							success: (res) => {
								var datas = res.data
								console.log(filess)
								console.log(datas)
								uni.uploadFile({
									url: 'https://openapi.hm8848.com/ocr/idcard/face',//开发者服务器 url
									
									filePath: filess,//要上传文件资源的路径
									name: 'file',//必须填file
									// formData: {
									//   'key': datas.key,
									//   'OSSAccessKeyId': datas.AccessKeyId,
									//   'signature': datas.signature,
									//   'policy':"",
									//   'success_action_status': '200',
									// },
									success: function (res) {
											console.log(res);
									  if (res.statusCode != 200) {
										console.log("pppp")
										return;
									  }
									   
									},
									fail: function (err) {
									 console.log(err)
									},
								  })
							}
						});
						
					}
				})
			}
		}
	}
</script>

<style>
</style>
 -->