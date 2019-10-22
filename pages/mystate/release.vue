<template>
	<view>
		<view style="position:fixed;top:9999px;">
		    <canvas :style="'width:'+imageW+'px;height:'+imageH+'px;'" canvas-id="myCanvas"></canvas>
		</view>
		
		<compress ref="compress" :maxwh="1920" :quality="0.99"> </compress>
		<cpimg ref="cpimg" @result="cpimgOk" @err="cpimgErr" :number="count" :fixOrientation="true" :size="1000" :maxWidth="10000"
		 :ql='0.9' type="url" />
		<view class='header'>
			<textarea focus placeholder='此刻的想法.....' v-model="obj.contents" maxlength='300'></textarea>
			<view class='words'>{{obj.contents.length}}/300</view>
			<view class='Hshow'>
				<view class="out">
					<view @click="showImg(item.url)" class="center-img" v-for="(item,index) in imgArray" :key='index'>
						<image :src="item.url" mode=""></image>
						<icon @click.stop="remove(index)" type='cancel' size="20" />
					</view>
					<view v-if="imgArray.length<9" @click="addPhoto" class="center-add iconfont icon-camera1">

					</view>
				</view>

			</view>
		</view>

		<view class='center'>
		  <image style="width: 300upx;height: 300upx;" :src="aa" mode=""></image>
		</view>
		<view class='footer'>
			<view @click="sures" class='btn'>发布动态</view>
		</view>
	</view>
</template>

<script>
	import cpimg from "../components/cpimg/cpimg.vue"
	import getpostion from '../../common/getpostion.js'
	import compress from "../components/compress.vue"
	export default {
		onLoad(){
			uni.getSystemInfo({
			    success:  (res)=> {
					this.model = res.platform
			      
			    }
			})
		},
		onReady() {
			this.getOnloadLaction()
		},
		components: {
			cpimg,
			compress
		},
		data() {
			return {
				imageW: 1000,
				imageH: 1920,
				aa:'',
				midImage:[],
				model:'ios',
				count: 9,
				imgArray: [],
				obj: {
					"title": "",
					"contents": "",
					"photos": [],
					"longitude": 0,
					"latitude": 0
				}
			}
		},
		methods: {
			sures() {
				if (this.obj.contents || this.imgArray.length) {
					var arr = []
					for (var i = 0; i < this.imgArray.length; i++) {
						arr.push(this.imgArray[i].key)
					}
					this.obj.photos = arr
					this.$myhttp.post(this.websiteUrl + '/news', this.obj, (res) => {
						if (res.data.code == 0) {
							uni.showToast({
								icon: 'success',
								title: '发布成功'
							})
							setTimeout(function() {
								uni.navigateBack({
									delta: 1
								})
							}, 1000);
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.message
							})
						}
					},this)
				} else {
					uni.showToast({
						icon: 'none',
						title: "图片或文字至少传一个哦"
					})
				}
			},
			getOnloadLaction() {

				uni.getLocation({
					type: 'gcj02',
					success: (res) => {
						this.obj.longitude = res.longitude
						this.obj.latitude = res.latitude
					},
					fail: () => {
						this.$myhttp.get(this.websiteUrl + '/users', '', (res) => {
							var user = res.data.data.areaId
							var city = getpostion(res.data.data.areaId)
							var address = city.replace(/-/g, "")
							this.$myhttp.get(this.websiteUrl + '/geocoder/latlng?address=' +encodeURIComponent(address), '', (res) => {
								this.obj.longitude = res.data.location.lng
								this.obj.latitude = res.data.location.lat
							},this)

						},this)
					}
				})
			},
			showImg(url) {
				if (this.throttle) {
					return
				}
				uni.previewImage({
					current: 0,
					urls: [url],
					success: (e) => {
						console.log(e)
					},
					fail: (e) => {
						console.log(e)
					}
				});
			},
			remove(index) {
				if (this.throttle) {
					return
				}
				uni.showModal({
					title: '提示',
					content: '确定要删除么',
					success: (res) => {
						if (res.confirm) {
							this.imgArray.splice(index, 1)
							this.count++
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			},
			upload(img, callback) {
				uni.uploadFile({
					url: 'https://openapi.hm8848.com/news/photos', //仅为示例，非真实的接口地址
					filePath: img,
					name: 'file',
					header: {
						authorization: this.$store.state.token
					},
					success: (uploadFileRes) => {

						callback(uploadFileRes)
					},
					fail: (e) => {
						uni.showToast({
							icon: 'none',
							title: '上传失败'
						})
					}
				});
			},
			addPhoto() {
				if (this.throttle) {
					return
				}
				// let that = this
				//#ifdef APP-PLUS
				plus.key.hideSoftKeybord()
				//#endif
				this.throttle = true
				// that.$refs.cpimg._changImg()
				uni.showActionSheet({
					itemList: ['拍摄', '从手机相册中选择'],
					success: (res) => {
						console.log(res.tapIndex)
						if (res.tapIndex == 0) {
							uni.chooseImage({
								sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
								sourceType: ['camera'], //从相册选择
								success: (res) => {
									console.log(res)
									this.midImage = this.imgArray
									uni.getImageInfo({
										src: res.tempFilePaths[0],
										success: (res) => {

											var rotate = 0

											if (this.model == 'ios') {
												rotate = 0;
											} else {
												switch (res.orientation) {
													case 'up': //exif:1 不旋转
														rotate = 0;
														break;
													case 'down': //exif:3 旋转180度
														rotate = 180;
														break;
													case 'right': //exif:6 旋转90度
														rotate = 90;
														break;
													case 'left': //exif:8 旋转270度
														rotate = 270;
														break;
													default:
														rotate = 0;
														break;
												}
												
											}
											plus.zip.compressImage({
													src: res.path,
													dst: "_doc/uniapp_temp" + '/compressed/' + Math.round(new Date()) + '.jpg',
													format: 'jpg',
													quality:90,
													rotate: rotate,
											},(event)=>{
							
												uni.showLoading({
													title: '上传中'
												})
												let tempPath = event.target;
								
												this.upload(tempPath, (res) => {
													var img = JSON.parse(res.data)
													if (img.code == 0) {
															this.imgArray.push(img.data)
															uni.hideLoading()
															this.throttle = false
															this.count = 9 - this.imgArray.length
														
													} else {
														this.imgArray = this.midImage
														this.throttle = false
														uni.hideLoading()
														uni.showToast({
															icon: 'none',
															title: img.message,
														})
														
													}
												
												
												})
											})
										}
									})
								},
								fail: (res) => {
									console.log(res)
									this.throttle = false
								}
							});
						}else if(res.tapIndex == 1){
							  console.log(111)
							uni.chooseImage({
								count: this.count,
								sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
								sourceType: ['album'], //从相册选择
								success: (res) => {
									console.log(res)
									this.midImage = this.imgArray
										
										
									
			
								
			
			
			
									
							
									this.$refs.compress.yasuoImg(res.tempFilePaths).then(e => {
										let imgs = e.map((value, index) => {
											return {
												uri: value.tempFilePath
											}
										})
										
										console.log(JSON.stringify(imgs))
										// this.aa = imgs[0].uri
										// console.log(this.aa)
										var count = 0
										var errCount = 0
										var msg = ''
										uni.showLoading({
											title: '上传中'
										})

										for (let i = 0; i < imgs.length; i++) {
											count++
											this.upload(imgs[i].uri, res => {
												var img = JSON.parse(res.data)
				
												if (img.code == 0) {
													this.imgArray.push(img.data)
													if (count == imgs.length) {
														if(errCount){
															console.log(111)
															uni.hideLoading()
															uni.showToast({
																icon: 'none',
																title: msg,
															})
															this.throttle = false
															this.imgArray = this.midImage
															this.count = 9 - this.imgArray.length
						
														}else{
															uni.hideLoading()
															this.throttle = false
															this.count = 9 - this.imgArray.length
														}
													}
												} else {
													errCount++
													msg = img.message
													console.log(count,imgs.length)
													if (count == imgs.length) {
								
														if(errCount){
															uni.hideLoading()
															uni.showToast({
																icon: 'none',
																title: msg,
															})
															this.throttle = false
															this.imgArray = this.midImage
															this.count = 9 - this.imgArray.length
														}
													}
												}


											})
										}
									})
								},
								fail: () => {
									this.throttle = false
								}
							});
						}

					},
					fail: (res) => {
						this.throttle = false
					}
				});

			},
			cpimgOk(file) {
				let that = this

				var count = 0
				uni.showLoading({
					title: '上传中'
				})
				for (let i = 0; i < file.length; i++) {
					count++
					this.upload(file[i], (res) => {
						var img = JSON.parse(res.data).data
						this.imgArray.push(img)
						if (count == file.length) {
							uni.hideLoading()
							this.throttle = false
							this.count = 9 - this.imgArray.length
						}
					})
				}
			},
			cpimgErr(e) {
				this.throttle = false
			},
		}
	}
</script>

<style>
	.header {
		margin: 44upx auto 0;
		width: 695upx;
		/* border-bottom: 1upx solid #e6e6e6; */
	}

	textarea {
		height: 250upx;
		width: 100%;
		font-size: 30upx;
	}

	.words {
		font-size: 24upx;
		margin-bottom: 40upx;
		text-align: right;
		color: #b6b6b6;
		margin-bottom: 30upx;
	}

	.header .photo {
		display: flex;
		margin-bottom: 42upx;
	}

	.header .photo>view {
		width: 120upx;
		height: 120upx;
		margin-left: 42upx;
		float: left;
		position: relative;
	}

	.header .photo>view icon {
		position: absolute;
		top: -7px;
		left: 100upx;
		z-index: 99;
	}

	.header .photo>view image {
		width: 100%;
		height: 100%;
		border-radius: 10upx;
	}

	.video video {
		width: 180upx;
		height: 320upx;
		margin: 0 0 30upx 20upx;
	}

	.center {
		width: 695upx;
		margin: 0 auto;
		padding-bottom: 150upx;
	}

	.center>view {
		display: flex;
		justify-content: space-between;
		border-bottom: 1upx solid #e6e6e6;
		padding: 33upx 0;
		font-size: 30upx;
		color: #000;
	}

	.center picker {
		color: #fb7917;
		font-size: 28upx;
	}

	.footer {
		position: fixed;
		bottom: 0;
		height: 150upx;
		width: 100%;
	}

	.footer .btn {
		width: 550upx;
		margin: 0 auto;
		height: 80upx;
		background: linear-gradient(to right, #17c5af, #20cdb2, #37e0b9, #3fe9bb);
		color: #fff;
		text-align: center;
		line-height: 80upx;
		font-size: 29upx;
		border-radius: 40upx;
	}



	.out {
		display: flex;
		flex-wrap: wrap;
		width: 720upx;
		margin: 30upx auto 40upx;
	}

	.center-img {
		width: 122upx;
		height: 122upx;
		margin-bottom: 27upx;
		position: relative;
		margin-right: 22upx;
	}

	.center-img image {
		width: 122upx;
		height: 122upx;
	}

	.center-img icon {
		position: absolute;
		top: -20px;
		right: -20px;
	}

	.center-add {
		text-align: center;
		width: 122upx;
		height: 122upx;
		line-height: 122upx;
		background: #f8f8f8;
		font-size: 50upx;
		color: #bbbbbb;
		position: relative;
	}

	.out .title {
		line-height: 122upx;
		color: #bababa;
		font-size: 26upx;
		margin-left: 30upx;
	}
</style>
