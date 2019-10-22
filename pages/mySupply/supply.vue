<template>
	<view>
		<compress ref="compress" :maxwh="1920" :quality="0.99"> </compress>
		<cpimg ref="cpimg" @result="cpimgOk" @err="cpimgErr" :number="count" :fixOrientation="true" :size="500" :maxWidth="1000" :ql="0.9" type="url" />
		<myCityPicker 
		:themeColor="themeColor"  ref="myCityPicker" :pickerValueDefault="cityPickerValueDefault"
		@onConfirm="onareasure"
		></myCityPicker>
		<view class="header">
			<view class="headerItem">
				<view class="headerItemLeft">
					货物名称
				</view>
				<view class="headerItemRight">
					{{info.name}}
				</view>
			</view>
			<view class="headerItem">
				<view class="headerItemLeft">
					货物规格
				</view>
				<view @click="tospecifi" :style="{color:specificationsVal?'#000000':''}" class="headerItemRight item2 overs">
					{{specificationsVal?specificationsVal:'请选择货品规格'}}
				</view>
			</view>
			<view class="headerItem">
				<view class="headerItemLeft">
					货品价格<span style='color:#DD524D'>*</span>
				</view>
				<view class="headerItemRight item3">
					<input :disabled='throttle' v-model="obj.price" placeholder-style="color:#c7c7cc;" placeholder="请输入货品价格" type="number">
					<view>元</view>
				</view>
			</view>
			<view class="headerItem">
				<view class="headerItemLeft">
					供货数量
				</view>
				<view class="headerItemRight item3">
					<input :disabled='throttle' v-model="obj.quantity" placeholder-style="color:#c7c7cc;" placeholder="请输入货品数量" type="number">
					<view>{{info.unit}}</view>
				</view>
			</view>
			<view class="headerItem">
				<view class="headerItemLeft">
					供货地区
				</view>
				<view @click="areapicshow" class="headerItemRight item5">
					{{city?city:'请选择地区'}}
				</view>
			</view>
			<view class="headerItem">
				<view class="headerItemLeft">
					精确定位
				</view>
				<view class="headerItemRight  item6 overs" @click="chooseLocation">
					{{obj.address?obj.address:'请选择位置'}}
				</view>
			</view>
			<view class="headerItem">
				<view class="headerItemLeft item6Left">
					货物说明
				</view>
				<view class="headerItemRight item6">
					<textarea :disabled='throttle' v-model="obj.profile" placeholder-style="color:#898989;font-size:35upx;"
					 placeholder="请填写货品特色,种植情况等" />
					</view>
			</view>
		</view>
		<view class="center">
			
			<view @click="showImg(item.url)" class="center-img" v-for="(item,index) in imgArray" :key='index'>
				<image :src="item.url" mode=""></image>
				<icon @click.stop="remove(index)" type='cancel' size="20"/>
			</view>
			
			<view v-if="imgArray.length < 9" @tap="addPhoto" class="center-add iconfont icon-camera1">
					
			</view>
		</view>
		<view @click="sures" class="footer">
			立即发布
		</view>
		<pickerCity @choosecitys='citys'  @watchs="disnone" :dis='dis'></pickerCity>
	</view>
</template>

<script>
	import compress from "../components/compress.vue"
	import {areas} from '../../common/areas.js'
	import cpimg from "../components/cpimg/cpimg.vue"
	import myCityPicker from '../components/pickcity.vue'
	import getpostion from '../../common/getpostion.js'
	import provinceData from '../components/city-data/area0.js';
	import cityData from '../components/city-data/area1.js';
	import areaData from '../components/city-data/area2.js';
	export default{
		components:{
			myCityPicker,
			cpimg,
			compress
		},
		onLoad(e){
			uni.getSystemInfo({
			    success:  (res)=> {
					this.model = res.platform
			      
			    }
			})
			uni.getStorage({
				key:'mylistloc',
				success:(e)=>{
						var info = JSON.parse(e.data)
						console.log(info)
						this.info = info.details
						this.id = info.id
						this.getspecisure()
						this.obj.categoryId = info.categoryId
						this.obj.price = info.price
						this.obj.quantity = info.quantity
						this.obj.areaId = info.areaId	
						this.obj.latitude = info.latitude
						this.obj.longitude = info.longitude
						this.obj.address = info.address
						this.obj.profile = info.profile
						this.imgArray = info.photos
						for(var i=0;i<areas.length;i++){
							this.areas[areas[i].id] = areas[i]
							this.cityname[areas[i].name] = areas[i]
						}
						var area = this.areas[info.areaId]
						var city = this.areas[area.parentId]
						this.firstMakeloc(area.name,city.name)
				
						var specifications = JSON.parse(info.specifications)
						var obj ={
							texts:'',
							val:[]
						}
						for(let i=0;i<specifications.length;i++){
							var objs = {
								id:specifications[i].id,
								value:specifications[i].value
							}
							var val
							if(specifications[i].value instanceof Array){
								val = specifications[i].value[0]+"-"+specifications[i].value[1]
							}else{
								val = specifications[i].value
							}
							obj.texts+=specifications[i].name+":"+ val+";"
							obj.val.push(objs)
						}
						this.obj.specifications = JSON.stringify(obj.val)
						this.specificationsVal = obj.texts
				}
			})
			
			
			
			
			uni.removeStorage({
				key:'specifications'
			})
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
			if(currPage.data.specifica){
				this.obj.specifications = currPage.data.specifica.val
				this.specificationsVal = currPage.data.specifica.texts
				currPage.setData({
					specifica:''
				})
				
			}
		},
		data(){
			return{
				cityname:{},
				cityPickerValueDefault:[0,0,0],
				themeColor: '#007AFF',		
				midImage:[],
				model:'ios',
				count: 9,
				id:'',
				SpecificationsArr:[],
				isSpecifications:false,
				areas:{},
				specificationsVal:'',
				throttle:false,
				city:'',
				dis:false,
				info:{
				"unit": "棵",
				id: 31695,
				name: "",
				parentId: 637,
				sort: 3
				},
				imgArray:[],
				obj:{
						address:'',
						"title": "",
					  "categoryId":'',
					  "areaId":'',
					  "price":'',
					  "quantity":'',
					  "profile": "",
					  "photos": [],
					  "specifications": "",
					  "longitude":'',
					  "latitude": ''
				}
			}
		},
		methods: {
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
			areapicshow(){
				if(this.throttle){
					return
				}
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
				},this)
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
										this.count = 9-this.imgArray.length
								}
						})
				}
			},
			cpimgErr(e) {
				console.log(e)
				this.throttle = false
			},
			getspecisure(){
				this.$myhttp.get(this.websiteUrl + '/categories/'+this.info.id+'/attributes', '', (res) => {
					var res = res.data.data
					this.isSpecifications = res.some((item)=>{
						return item.isRequired
					})
					this.SpecificationsArr = JSON.stringify(res)
				},this)
			},
			sures(){
				var arr = []
				
				for(var i=0;i<this.imgArray.length;i++){
					arr.push(this.imgArray[i].key)
				}
				this.obj.photos = arr 
				if(this.isSpecifications){
					if(!this.obj.specifications){
						uni.showToast({
							icon:'none',
							title:'请填写规格'
						})
						return
					}
				}
				if(!this.obj.price){
					uni.showToast({
						icon:'none',
						title:'请填写货物价格'
					})
					return
				}
				if(!this.obj.areaId){
					uni.showToast({
						icon:'none',
						title:'请填写供货地区'
					})
					return
				}
				if(!this.obj.photos.length){
					uni.showToast({
						icon:'none',
						title:'请上传至少一张图片'
					})
					return
				}
				console.log(this.obj)
				this.$myhttp.put(this.websiteUrl+'/supplies/'+this.id,this.obj,(res)=>{
					if(res.data.code == 0){
						uni.navigateTo({
							url:'../release/success?mode=supply'
						})
					}else{
						uni.showToast({
							title:res.data.message,
							icon:'none'
						})
					}
					 
				},this)
			},
			chooseAddres(){
				if(this.throttle){
					return
				}
				//#ifdef APP-PLUS
				plus.key.hideSoftKeybord()
				//#endif
				this.dis = true
			},
			disnone(){
				this.dis = false
			},
			citys(obj){
				this.obj.areaId = obj.id
				this.city = obj.city
				this.obj.address = obj.city
				var area = this.areas[obj.id]
				
				this.$myhttp.get(this.websiteUrl+'/geocoder/latlng?address='+area.name,'',(res)=>{
				
					this.obj.longitude = res.data.location.lng
					this.obj.latitude = res.data.location.lat
					
				},this)
			},
			tospecifi(){
				if(this.throttle){
					return
				}
				uni.navigateTo({
					url:'specifications?info='+this.SpecificationsArr
				})
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
			remove(index){
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
			showImg(url){
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
			
			upload(img,callback){
				 uni.uploadFile({
					url: 'https://openapi.hm8848.com/supplies/photos', //仅为示例，非真实的接口地址
					filePath: img,
					name: 'file',
					header:{
						authorization:this.$store.state.token
					},
					success: (uploadFileRes) => {
						callback(uploadFileRes)
					},
					fail:()=>{
						uni.showToast({
							icon:'none',
							title:'上传失败'
						})
					}
				});
			}
		},
	}
</script>

<style>
	
	.headerItem{
		width: 100%;
		display: flex;
		border-top:1upx solid #eeeeee;
	}
	.headerItemLeft{
		width: 217upx;
		background: #f7f7f7;
		height: 107upx;
		line-height: 107upx;
		text-align: center;
		font-size: 30upx;
		color: #666;
	}
	.headerItemRight{
		width: 490upx;
		margin-left: 43upx;
		height: 107upx;
		line-height: 107upx;
		font-size: 30upx;
		color: #333333;
	}
	.item2{
		color: #b6b6b6;
	}
	.item3{
		width: 460upx;
		display: flex;
		justify-content: space-between;
	}
	.item3 input{
		width: 250upx;
		height: 57upx;
		line-height: 57upx;
		margin-top: 25upx;
	}
	.item3 view{
		width: 100upx;
	}
	.item6Left{
		height: 187upx;
		line-height: 187upx;
	}
	.item6 textarea{
		padding-top: 30upx;
		width: 100%;
		height: 130upx;
		line-height: 50upx;
	}
	.center{
		margin: 306upx;
		margin: 20upx 0 100upx 30upx;
		display: flex;
		flex-wrap:wrap;
		width: 720upx;
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
	.center-add:after{
		position: absolute;
		right: -20upx;
		top: 0;
		line-height:30upx;
		content: '*';
		color: #EE3333;
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
		margin: 0 auto;
	}
</style>
