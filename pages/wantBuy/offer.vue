<template>
	<view>
		<compress ref="compress" :maxwh="1920" :quality="0.99"> </compress>
		<cpimg ref="cpimg" @result="cpimgOk" @err="cpimgErr" :number="count" :fixOrientation="true" :size="500" :maxWidth="1000" :ql="0.9" type="url" />
		 <myCityPicker 
		:themeColor="themeColor"  ref="myCityPicker" :pickerValueDefault="cityPickerValueDefault"
		@onConfirm="onareasure"
		></myCityPicker>
		<view @click="toshop"  class="header">
			<view class="header-left">
				<image :src="obj.avatarUrl" mode=""></image>
			</view>
			<view class="header-right">
				<view class="name overs">
					{{obj.nickName}}
				</view>
				<view class="now">
					正在采购{{obj.details.name}}
				</view>
			</view>
		</view>
		<view class="center">
			<view class="centerItem">
				<view class="centerItemLeft"></view>
				<view class="centerItemRight item1">
					<view v-if="showpay !== 2" @click="active=1" :class="active==1?'active':''">上车价</view>
					<view v-if="showpay !== 1"  @click="active=2" :class="active==2?'active':''">到货价</view>
				</view>
			</view>
			<view class="centerItem">
				<view class="centerItemLeft">
					我的报价 <span v-if='obj.requirePrice' style='color:#E64340;'>*</span>
				</view>
				<view class="centerItemRight item2">
					<input @input="priceInput" :disabled='throttle' type="number">
					<view>元/株</view>
				</view>
			</view>
			<view class="centerItem">
				<view  class="centerItemLeft">
					供货地区
				</view>
				<view @click="areapicshow" class="centerItemRight item3 overs">
					{{city}}
				</view>
			</view>
			<view class="centerItem">
				<view class="centerItemLeft">
					精准定位
				</view>
				<view @click="chooseLocation" class="centerItemRight item3 overs">
					<span style='font-size:30upx;' class='iconfont icon-weizhi'></span> {{obj.address}}
				</view>
			</view>
		</view>
		
		<view class="footer">
			<view class="out">
				<view @click="showImg(item.url)"  class="center-img" v-for="(item,index) in imgArray" :key='index'>
					<image :src="item.url" mode=""></image>
					<icon @click.stop="remove(index)" type='cancel' size="20"/>
				</view>
				<view  v-if="imgArray.length<5" @click="addPhoto"  class="center-add iconfont icon-camera1">
						
				</view>
				<span  v-if="imgArray.length<5 && obj.requirePhotos"  style='margin-left:15upx; color:#E64340;'>*</span>
				<view v-if="!imgArray.length" class="title"> 添加图片(最多不超过5张)</view>
			</view>
			<view @click="sures" class="btn">立即发布</view>
		</view>
		
	</view>
</template>

<script>
	import compress from "../components/compress.vue"
	import myCityPicker from '../components/pickcity.vue'
	import {areas} from '../../common/areas.js'
	import provinceData from '../components/city-data/area0.js';
	import cityData from '../components/city-data/area1.js';
	import areaData from '../components/city-data/area2.js';
	import getpostion from '../../common/getpostion.js'
	import cpimg from "../components/cpimg/cpimg.vue"
	export default{
		components: {
			myCityPicker,
			cpimg,
			compress
		},
		onLoad(){
			uni.getSystemInfo({
			    success:  (res)=> {
					this.model = res.platform
			      
			    }
			})
			uni.getStorage({
				key:'purOffer',
				success:(e)=>{
					
					this.obj = JSON.parse(e.data)
					if(this.obj.payTerm){
						this.showpay = this.obj.payTerm
						this.active = this.obj.payTerm
					}else{
						this.obj.payTerm = 1
					}
					
				}
			})
			for(let i=0;i<areas.length;i++){
				this.areas[areas[i].id] = areas[i]
				this.cityname[areas[i].name] = areas[i]
			}
		},
		onReady(){
			this.getOnloadLaction()
		},
		onShow(){
		
			let pages = getCurrentPages();
			let currPage = pages[pages.length-1];	
			if(currPage.data.objloc){
				this.obj.latitude = currPage.data.objloc.latitude
				this.obj.longitude = currPage.data.objloc.longitude
				this.obj.address = currPage.data.objloc.address
				currPage.setData({
					objloc:''
				})
				
			}
		
			
		},
		data(){
			return{
				midImage:[],
				model:'ios',
				price:'',
				count:5,
				throttle:false,
				themeColor: '#007AFF',
				mode: '',
				deepLength: 1,
				areas:{},
				cityname:{},
				cityPickerValueDefault:[0,0,0],
				city:'',
				showpay:0,
				obj:{
					
				},
				imgArray:[],
				active:1
			}
		},
		methods:{
			priceInput(e){
				this.price = e.detail.value
			},
			toshop(){
				uni.navigateTo({
					url:'../shops/shop?id='+this.obj.userId
				})
			},
			sures(){
				if(this.throttle){
					return
				}
				if(this.obj.requirePhotos && (!this.price)){
					uni.showToast({
						icon:'none',
						title:'必须填写价格哦'
					})
					return
				}
				if(this.obj.requirePhotos && (!this.imgArray.length)){
					uni.showToast({
						icon:'none',
						title:'必须带有图片报价哦'
					})
					return
				}
				
				
				var arr = []
				var obj = {}
				for(var i=0;i<this.imgArray.length;i++){
					arr.push(this.imgArray[i].key)
				}
				obj.payTerm = this.active
				obj.areaId = this.obj.areaId
				obj.longitude= this.obj.longitude
				obj.latitude = this.obj.latitude
				obj.address= this.obj.address
				obj.price = this.price
				obj.photos = arr 
			
				this.$myhttp.post(this.websiteUrl+'/purchases/'+this.obj.id+'/quotations',obj,(res)=>{
					if(res.data.code == 0){
						uni.showToast({
							title:'报价已送达'
						})
						setTimeout(()=> {
							uni.navigateBack({
								delta:1
							})
						}, 500);
					}else{
						uni.showToast({
							icon:'none',
							title:res.data.message
						})
					}
				},this)
			},
			chooseLocation(){
				if(this.throttle){
					return
				}
				this.$jurisdiction(()=>{
					uni.navigateTo({
						url:'../components/map?lat='+this.obj.latitude+"&lng="+this.obj.longitude
					})
				})
			},
			showImg(url){
				if(this.throttle){
					return
				}
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
			remove(index){
				if(this.throttle){
					return
				}
				uni.showModal({
					title: '提示',
					content: '确定要删除么',
					success: (res)=> {
						if (res.confirm) {
							this.imgArray.splice(index,1)
							this.count++
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
			},
			upload(img,callback){
				 uni.uploadFile({
					url: 'https://openapi.hm8848.com/purchases/photos', //仅为示例，非真实的接口地址
					filePath: img,
					name: 'file',
					header:{
						authorization:this.$store.state.token
					},
					success: (uploadFileRes) => {
						callback(uploadFileRes)
					},
					fail:(e)=>{
						uni.showToast({
							icon:'none',
							title:'上传失败'
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
						if (res.tapIndex == 0) {
							uni.chooseImage({
								sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
								sourceType: ['camera'], //从相册选择
								success: (res) => {
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
								fail: () => {
									this.throttle = false
								}
							});
						}else if(res.tapIndex == 1){
							console.log('进入选照片')
							uni.chooseImage({
								count: this.count,
								sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
								sourceType: ['album'], //从相册选择
								success: (res) => {
									this.midImage = this.imgArray
									console.log(this.midImage)
									this.$refs.compress.yasuoImg(res.tempFilePaths).then(e => {
										let imgs = e.map((value, index) => {
											return {
												uri: value.tempFilePath
											}
										})
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
															this.count = 5 - this.imgArray.length
						
														}else{
															uni.hideLoading()
															this.throttle = false
															this.count = 5 - this.imgArray.length
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
															this.count = 5 - this.imgArray.length
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
					title:'上传中'
				})
				for(let i=0;i<file.length;i++){
					 count++
					this.upload(file[i],(res)=>{
									var img = JSON.parse(res.data).data
									this.imgArray.push(img)
									if(count==file.length){
										uni.hideLoading()
										this.throttle = false
										this.count = 5-this.imgArray.length
								}
						})
				}
			},
			cpimgErr(e) {
				this.throttle = false
			},
			areapicshow(){
				if(this.throttle){
					return
				}
				//#ifdef APP-PLUS
				 plus.key.hideSoftKeybord()
				//#endif
				this.$refs.myCityPicker.show()
			},
			onareasure(e){
				this.obj.areaId = e.cityCode
				var city = getpostion(e.cityCode)
				this.city = city
				var adress = city.replace(/-/g,"")
				this.obj.address = adress
				this.$myhttp.get(this.websiteUrl+'/geocoder/latlng?address='+encodeURIComponent(adress),'',(res)=>{
					this.obj.longitude = res.data.location.lng
					this.obj.latitude = res.data.location.lat
				})
			},
			
			getOnloadLaction(){
				
				uni.getLocation({
					type:'gcj02',
					success:(res)=>{
						this.obj.longitude = res.longitude
						this.obj.latitude = res.latitude
						this.$myhttp.get(this.websiteUrl+'/geocoder/address?lng='+res.longitude+'&lat='+res.latitude,'',(res)=>{
							var areaname = res.data.address_component.district
							var city = res.data.address_component.city
							this.obj.address = res.data.address
							this.firstMakeloc(areaname,city)
						},this)
						
					},
					fail:()=>{
						this.$myhttp.get(this.websiteUrl+'/my','',(res)=>{
								var user = res.data.data.shop.areaId
								var city = getpostion(res.data.data.shop.areaId)
								this.obj.address = city.replace(/-/g,"")
								var area = this.areas[user]
								var city = this.areas[this.areas[user].parentId]
								this.firstMakeloc(area.name,city.name)	
								
						},this)
					}
				})
			},
			firstMakeloc(areaname,cityname){
				var arr = []
				var area = this.cityname[areaname]
				var city = this.cityname[cityname]
				if(!(area.parentId == city.id)){
					var mid = []
					for(let i=0;i<areas.length;i++){
						if(areas[i].name == areaname){
							if(areas[i].parentId == city.id){
								area = areas[i]
								break
							}
						}
					}
				}
				if(city.parentId){
					var province = this.areas[city.parentId]
				}else{
					var province = city
					city = area
				}
				var provinceDatalen = provinceData.length
				for(let i=0;i<provinceDatalen;i++){
					if(province.id == provinceData[i].id){
						arr[0] = i
						break
					}
				}
				var cityDatalen = cityData[arr[0]].length
				for(let i=0;i<cityDatalen;i++){
					if(city.id == cityData[arr[0]][i].id){
						arr[1] = i
						break
					}
				}
				var  areaDatalen  =  areaData[arr[0]][arr[1]].length
				for(let i=0;i<areaDatalen;i++){
					if(area.id == areaData[arr[0]][arr[1]][i].id){
						arr[2] = i
						break
					}
				}	
				this.obj.areaId  = area.id 
				this.city = getpostion(area.id)
				this.cityPickerValueDefault = arr
			},
		}
	}
</script>

<style>
	page{
		background: #f8f8f8;
	}
	.header{
		height: 164upx;
		width: 100%;
		background: #fff;
		display: flex;
	}
	.header-left{
		margin-left: 35upx;
		margin-top: 32upx;
		margin-right: 30upx;
	}
	.header-left image{
		border-radius: 50%;
		width: 100upx;
		height: 100upx;
	}
	.header-right .name{
		font-size: 30upx;
		color: #000;
		font-weight: bold;
		margin: 35upx 0 10upx;
	}
	.header-right .now{
		font-size: 23upx;
	}
	.center{
		height: 544upx;
		background: #fff;
		margin:15upx 0;
		overflow: hidden;
	}
	.centerItem{
		display: flex;
		justify-content: space-between;
		margin-top: 30upx;
	}
	.centerItemLeft{
		width: 160upx;
		height: 70upx;
		line-height: 70upx;
		margin-left: 35upx;
		font-size: 30upx;
		color: #6e6e6e;
	}
	.centerItemRight{
		width: 524upx;
		margin-right: 32upx;
	}
	.item1{
		display: flex;
		justify-content: space-between;
	}
	.item1 view{
		width: 50%;
		height: 70upx;
		text-align: center;
		border: 1upx solid #e7e7e7;
		line-height: 70upx;
		color: #898989;
		font-size: 30upx;
	}
	.item1 view.active{
		color: #fff;
		background: #24bfa1;
	}
	.item1 view:nth-of-type(1){
		border-right:none;
	}
	.item2{
		height: 70upx;
		border: 1upx solid #e7e7e7;
		display: flex;
		justify-content: space-between;
	}
	.item2 input{
		width:410upx;
		margin-top: 10upx;
		margin-left: 20upx;
		font-size:26upx;
		height: 50upx;
		line-height: 50upx;
		
	}
	.item2 view{
		line-height: 70upx;
		text-align: right;
		font-size: 28upx;
		color: #c1c1c1;
	}
	.item3{
		color: #434443;
		font-size: 32upx;
		line-height: 70upx;
	}
	.footer{
		background: #fff;
		min-height: 300upx;
		overflow: hidden;
		padding-bottom: 50upx;
	}
	.out{
		display: flex;
		flex-wrap:wrap;
		width: 720upx;
		margin: 30upx auto 40upx;
	}
	.center-img{
		width: 122upx;
		height: 122upx;
		margin-bottom: 27upx;
		position: relative;
		margin-right: 22upx;
	}
	.center-img image{
		width: 122upx;
		height: 122upx;
	}
	.center-img icon{
		position: absolute;
		top: -20px;
		right: -20px;
	}
	.center-add{
		text-align: center;
		width: 122upx;
		height: 122upx;
		line-height: 122upx;
		background: #f8f8f8;
		font-size: 50upx;
		color: #bbbbbb;
		position: relative;
	}
	.out .title{
		line-height: 122upx;
		color: #bababa;
		font-size: 26upx;
		margin-left: 30upx;
	}
	.btn{
		width: 711upx;
		height: 105upx;
		line-height: 105upx;
		background: linear-gradient(to right,#17c5af,#20cdb2,#37e0b9,#3fe9bb);
		color: #fff;
		font-size: 44upx;
		text-align: center;
		border-radius: 10upx;
		margin: 0 auto;
	}
</style>
