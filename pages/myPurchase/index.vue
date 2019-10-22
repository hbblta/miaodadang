<template>
	<view>
		<compress ref="compress" :maxwh="1920" :quality="0.99"> </compress>
		<cpimg ref="cpimg" @result="cpimgOk" @err="cpimgErr" :number="count" :fixOrientation="true" :size="500" :maxWidth="1000" :ql="0.9" type="url" />
		 <myCityPicker 
		:themeColor="themeColor" :pickerValue='pickerValue' ref="myCityPicker" :pickerValueDefault="cityPickerValueDefault"
		@onConfirm="onareasure"
		></myCityPicker>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" 
		 @onConfirm="onConfirm"></mpvue-city-picker>
		
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
				<view @click="tospecifica" :style="{color:specificationsVal?'#000000':''}" class="headerItemRight item2 overs">
					{{specificationsVal?specificationsVal:'请选择货品规格'}}
				</view>
			</view>
			<view class="headerItem">
				<view class="headerItemLeft">
					采购数量<span style='color:#DD524D'>*</span>
				</view>
				<view class="headerItemRight item3">
					<input :disabled='throttle' @input="changeInput('quantity',$event)" placeholder-style="color:#c7c7cc;" placeholder="请输入采购数量" type="number">
					<view >{{info.unit}}</view>
				</view>
			</view>
			<view class="headerItem">
				<view class="headerItemLeft">
					截止日期
				</view>
				<view class="headerItemRight item5">
				
					<picker :disabled='throttle' mode="date"  @change="bindDateChange" :value="valueDate" :start="startDate" :end="endDate" >
                        <view style="line-height: 107upx;height: 107upx;" class="item5">{{obj.expires}}</view>
                    </picker>
				</view>
			</view>
			<view class="headerItem">
				<view class="headerItemLeft">
					采购地区<span style='color:#DD524D'>*</span>
				</view>
				<view  class="headerItemRight item7">
					<view  v-for="(item,index) in purchaseList" :key='index' class="item7Item">
						<view style="width:300upx;" @click="showMulLinkageThreePicker(index)" class="left overs">{{item.name}}</view>
						<view class="right">
							<view 	@click="addPurchaseList" v-if="purchaseList.length==1 || index==2 || (purchaseList.length==2 && index == 1)" style="color: #6a6a6a;" class="add">添加</view>
							<view  @click="removePurchaseList(index)" v-else style="color: #e8291a;" class="remove">删除</view>
							
						</view>
					</view>
				</view>
				
			</view>
			<view class="headerItem">
				<view class="headerItemLeft">
					心理价位
				</view>
				<view class="headerItemRight item8">
					<view style="margin-top:20upx;" class="inputGroup">
						<view class="input1">
							<input :disabled='throttle' @input='minprice'  type="number" />
						
						</view>
						-
						<view class="input2">
							<input :disabled='throttle' :value='obj.maxPrice' @input="changeInput('maxPrice',$event)"  type="number"  />
							<view >元/{{info.unit}}</view>
						</view>
					</view>
					<view class="title">心里价位卖家看不到,仅帮助您筛选供应商</view>
				</view>
				
			</view>
			<view class="headerItem">
				<view class="headerItemLeft">
					收货地区
				</view>
				<view @click="areapicshow" class="headerItemRight item5 overs">
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
					<textarea :disabled='throttle' @input="changeInput('profile',$event)" placeholder-style="color:#898989;font-size:35upx;" placeholder="请填写货品特色,种植情况等"/>
				</view>
			</view>
		</view>
		<view class="center">
			
			<view @click="showImg(item.url)" class="center-img" v-for="(item,index) in imgArray" :key='index'>
				<image :src="item.url" mode=""></image>
				<icon @click.stop="remove(index)" type='cancel' size="20"/>
			</view>
			
			<view v-if="imgArray.length < 9" @tap="addPhoto"   class="center-add iconfont icon-camera1">
					
			</view>
		</view>
		<view @click="sures" class="footer">
			立即发布
		</view>
	</view>
</template>

<script>
	import compress from "../components/compress.vue"
	import mpvueCityPicker from '../components/pickallcity.vue'
	import myCityPicker from '../components/pickcity.vue'
	import {areas} from '../../common/areas.js'
	import provinceData from '../components/city-data/area0.js';
	import cityData from '../components/city-data/area1.js';
	import areaData from '../components/city-data/area2.js';
	import getpostion from '../../common/getpostion.js'
	import cpimg from "../components/cpimg/cpimg.vue"
	export default{
		components: {
			mpvueCityPicker,
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
				key:'editorQuotation',
				success:(e)=>{
		
						var info = JSON.parse(e.data)
						this.info = info.details
						this.id = info.id
						this.getspecisure()
						this.obj.categoryId = info.categoryId
						this.obj.maxPrice = info.maxPrice
						this.obj.minPrice = info.minPrice
						this.obj.quantity = info.quantity
						this.obj.areaId = info.areaId	
						this.obj.latitude = info.latitude
						this.obj.longitude = info.longitude
						this.obj.address = info.address
						this.obj.profile = info.profile
						this.imgArray = info.photos
						this.obj.requirePrice = info.requirePrice
						this.obj.requirePhotos = info.requirePhotos
						
						if(info.payTerm){
							this.obj.payTerm = info.payTerm
						}
						
						for(let i=0;i<areas.length;i++){
							this.areas[areas[i].id] = areas[i]
							this.cityname[areas[i].name] = areas[i]
						}
						this.purchaseList = []
						for(let i=0;i<info.acceptedAreas.length;i++){
							var obj = {
								name:'',
								id:''
							}
							if(!info.acceptedAreas[i]){
								var obj = {
									name:'全国',
									id:null
								}
							}else{
								
								var obj = {
									name:getpostion(info.acceptedAreas[i]),
									id:info.acceptedAreas[i]
								}
							}
							this.purchaseList.push(obj)
							
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
			this.newdate()
	
		
			
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
				this.obj.requirePrice = currPage.data.specifica.requirePrice
				this.obj.requirePhotos = currPage.data.specifica.requirePhotos
				this.obj.payTerm= currPage.data.specifica.payTerm
				this.obj.specifications = currPage.data.specifica.val
				this.specificationsVal = currPage.data.specifica.texts
				console.log(currPage.data.specifica)
				currPage.setData({
					specifica:''
				})
				
			}
			
		},
		onReady(){
			this.getOnloadLaction()
		},
		
		data(){
			return{
				midImage:[],
				model:'ios',
				count: 9,
				id:'',
				valueDate:'',
				startDate:'',
				endDate:'',
				city:"",
				specificationsVal:'',
				isSpecifications:false,
				SpecificationsArr:'',
				obj:{
				  "categoryId": 0,
				  "minPrice": '',
				  "maxPrice": '',
				  "payTerm": '',
				  "quantity": '',
				  "profile": "",
				  "acceptedAreas": [],
				  "longitude": 0,
				  "latitude": 0,
				  "areaId": '',
				  "address": "",
				  "photos": [],
				  "specifications": "",
				  "requirePrice":false,
				  "requirePhotos":false,
				  "expires": ""
				},
				areas:{},
				cityname:{},
				purIndex:1,
				purchaseList:[{
					name:'请选择地区(最多3个)',
					id:''
				}],
				info:{},
				imgArray:[],
				areapickDefault:[0,0,0],
				cityPickerValueDefault: [0, 0, 0],
				themeColor: '#007AFF',
				mode: '',
				deepLength: 1
			}
		},
		methods: {
			changeInput(str,e){
				this.obj[str] = e.target.value
			},
			bindDateChange(e){
				this.obj.expires = e.target.value
			},
			newdate(){
					const date = new Date();
					let start = date.getTime() + 1000*60*60*24*7
					let end = date.getTime() + 1000*60*60*24*180
					let startDate = new Date(start)
					let endDate = new Date(end)
					this.startDate = startDate.getFullYear()+'-'+this.addzero(startDate.getMonth() + 1)+'-'+this.addzero(startDate.getDate())
					this.endDate = endDate.getFullYear()+'-'+this.addzero(endDate.getMonth() + 1)+'-'+this.addzero(endDate.getDate())
					this.obj.expires = this.startDate
				
			},
			addzero(num){
				num = num > 9 ? num : '0' + num;
				return num
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
						console.log(e)
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
			
			
			minprice(e){
				this.obj.minPrice = e.target.value
				this.obj.maxPrice = e.target.value
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
				},this)
			},
			// 三级联动选择
			showMulLinkageThreePicker(index) {
				if(this.throttle){
					return
				}
				//#ifdef APP-PLUS
				 plus.key.hideSoftKeybord()
				//#endif
				this.purIndex = index
				this.$refs.mpvueCityPicker.show()
			},
			onConfirm(e) {
				this.purchaseList[this.purIndex].name = e.name
				if(e.cityCode){
					this.purchaseList[this.purIndex].id  = e.cityCode
				}else{
					this.purchaseList[this.purIndex].id  = null
				}
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
			getOnloadLaction(){
				
				uni.getLocation({
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
						this.$myhttp.get(this.websiteUrl+'/users','',(res)=>{
								var user = res.data.data.areaId
								var city = getpostion(res.data.data.areaId)
								this.obj.address = city.replace(/-/g,"")
								var area = this.areas[user]
								var city = this.areas[this.areas[user].parentId]
								this.firstMakeloc(area.name,city.name)	
								
								
						},this)
					}
				})
			},
			
			tospecifica(){
				if(this.throttle){
					return
				}
				uni.navigateTo({
					url:'specifications?info='+ this.SpecificationsArr 
				})
			},
			addPurchaseList(){
				if(this.throttle){
					return
				}
				var len = this.purchaseList.length
				if(len>=3){
					return
				}
				this.purchaseList.push({
					name:'请选择地区(最多3个)',
					id:''
				})
			},
			removePurchaseList(e){
				if(this.throttle){
					return
				}
				var len = this.purchaseList.length
				this.purchaseList.splice(e,1)
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
			
			sures(){
			
				if(this.throttle){
					return
				}
				
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
				if(!this.obj.latitude){
					uni.showToast({
						icon:'none',
						title:'请填写精确定位'
					})
					return
					
				}
				if(!this.obj.quantity){
					uni.showToast({
						icon:'none',
						title:'请填写采购数量'
					})
					return
				}
				var ispur = this.purchaseList.every((item)=>{
					return item.name == '请选择地区(最多3个)'
				})
				if(ispur){
					uni.showToast({
						icon:'none',
						title:'至少填写一个采购地区'
					})
					return
				}
				var arr2 = []
				
				for(let j=0;j<this.purchaseList.length;j++){
				
					if(this.purchaseList[j].name !== '请选择地区(最多3个)'){
						arr2.push(this.purchaseList[j].id)
							
					}
				}
				this.obj.acceptedAreas = arr2
				this.$myhttp.put(this.websiteUrl+'/purchases/'+this.id,this.obj,(res)=>{
					console.log(res)
					
					 if(res.data.code == 0){
					 	uni.navigateTo({
					 		url:'../release/success?mode=wantbuy'
					 	})
					 }else{
					 	uni.showToast({
					 		title:res.data.message,
					 		icon:'none'
					 	})
					 }
				},this)
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
		min-height: 107upx;
		line-height: 107upx;
		text-align: center;
		font-size: 30upx;
		color: #666;
	}
	.headerItemRight{
		width: 490upx;
		margin-left: 43upx;
		/* height: 107upx; */
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
	.headerItemRight.item7{
		min-height: 107upx;
	}
	.headerItemRight.item7 .item7Item{
		display: flex;
		justify-content: space-between;
		border-bottom:1upx solid #eeeeee;
	}
	.headerItemRight.item7 .item7Item .right{
		width: 140upx;
		height: 107upx;
		background: #f7f7f7;
		text-align: center;
		line-height: 107upx;
		font-size: 28upx;
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
	.inputGroup{
		width:100%;
		display: flex;
		justify-content: space-between;
		font-size: 30upx;
		line-height: 70upx;
	}
	.inputGroup>view{
		width: 225upx;
		height: 70upx;
		border: 1upx solid #dddddd;
		display: flex;
		justify-content: space-between;
		font-size: 22upx;
	}
	.inputGroup>view input{
		width: 80upx;
		padding-left: 30upx;
		height: 50upx;
		margin-top: 10upx;
		line-height: 50upx;
	}
	.item8 .title{
		line-height: 60upx;
		font-size: 24upx;
		color: #616161;
		text-align: center;
	}
</style>
