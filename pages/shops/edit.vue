<template>
	<view>
		<cpimg ref="cpimg" @result="cpimgOk" @err="cpimgErr" :number="count" :fixOrientation="true" :size="500" :maxWidth="1000" :ql="0.9" type="url" />
		<view class="header">
			<view class="headerItem">
				<view class="headerItemLeft item0">
					<image :src="user.avatarUrl" class="item0Img" mode=""></image>
				</view>
				<view style="line-height: 154upx;" class="headerItemRight">
					头像
				</view>
			</view>
			<view class="headerItem">
				<view class="headerItemLeft">
					姓名
				</view>
				<view @click="toshiming" class="headerItemRight overs">
					{{shiming?user.nickname:'请进行实名认证'}}
				</view>
			</view>
			<view class="headerItem">
				<view class="headerItemLeft">
					手机号
				</view>
				<view class="headerItemRight">
					{{user.mobile}}
				</view>
			</view>
			<view @click="areapicshow" class="headerItem">
				<view class="headerItemLeft">
					所在地 <span style="color: #ff4242;">*</span>
				</view>
				<view class="headerItemRight item5 overs">
					{{address?address:'请选择所在地'}}
				</view>
			</view>
			<view class="headerItem">
				<view class="headerItemLeft">
					公司
				</view>
				<view @click="toqiye" :style="{color:qiye?'#333':'#c7c7cc'}" class="headerItemRight item2">
					
					{{qiye?corporateName:'请进行企业认证'}}
				</view>
			</view>
			<view class="headerItem">
				<view class="headerItemLeft">
					主营
				</view>
				<view class="headerItemRight item3">
					<input v-model="msgs.mainBusiness" placeholder-style="color:#c7c7cc;" placeholder="请输入主营业务" type="text">

				</view>
			</view>
			<view class="headerItem">
				<view class="headerItemLeft">
					职位
				</view>
				<view class="headerItemRight item3">
					<input v-model="msgs.position" placeholder-style="color:#c7c7cc;" placeholder="请输入职位" type="text">
				</view>
			</view>
			<view  class="headerItem">
				<view class="headerItemLeft">
					微信
				</view>
				<view class="headerItemRight item3">
					<input v-model="msgs.wechatNumber" placeholder-style="color:#c7c7cc;" placeholder="请输入微信" type="text">
				</view>
			</view>
			<view class="headerItem">
				<view class="headerItemLeft">
					收货地址
				</view>
				<view class="headerItemRight  item6 overs" @click="chooseLocation">
					{{msgs.address?msgs.address:'请选择收货地址'}}
				</view>
			</view>
			<view class="headerItem">
				<view class="headerItemLeft item6Left">
					简介
				</view>
				<view class="headerItemRight item6">
					<textarea v-model="msgs.profile" placeholder-style="color:#898989;font-size:35upx;" placeholder="请填写简介" />
					</view>
			</view>
		</view>
		<view class="center">
			
			<view @click="showImg(item.url)" class="center-img" v-for="(item,index) in imgArray" :key='index'>
				<image :src="item.url" mode=""></image>
				<icon @click.stop="remove(index)" type='cancel' size="20"/>
			</view>
			
			<view v-if="imgArray.length < 4" @tap="addPhoto" class="center-add iconfont icon-camera1">
					
			</view>
		</view>
		
		
		<view @click="sures" class="footer">
			保存
		</view>
		<myCityPicker
		:themeColor="themeColor"  ref="myCityPicker" :pickerValueDefault="cityPickerValueDefault"
		@onConfirm="onareasure"
		></myCityPicker>
	</view>
</template>

<script>
	import {areas} from '../../common/areas.js'
	import provinceData from '../components/city-data/area0.js';
	import cityData from '../components/city-data/area1.js';
	import areaData from '../components/city-data/area2.js';
	import myCityPicker from '../components/pickcity.vue'
	import cpimg from "../components/cpimg/cpimg.vue"
	import getpostion from '../../common/getpostion.js'
	export default{
		components:{
				myCityPicker,
				cpimg
		},
		onShow(){
			let pages = getCurrentPages();
			let currPage = pages[pages.length-1];	
			if(currPage.data.objloc){
				this.msgs.address  = currPage.data.objloc.address
				currPage.setData({
					objloc:''
				})
				
			}
		},
		onLoad() {
			for(var i=0;i<areas.length;i++){
				this.areas[areas[i].id] = areas[i]
				this.cityname[areas[i].name] = areas[i]
			}
			this.$myhttp.get(this.websiteUrl+'/my','',(res)=>{
				console.log(res)
				this.user = res.data.data.user
				var shop = res.data.data.shop
		
				if(shop.wechatNumber){
					this.iswechat = true
				}
				
				this.msgs.areaId = shop.areaId
				this.msgs.mainBusiness= shop.mainBusiness
				this.msgs.position = shop.position
				this.msgs.address= shop.address
				this.msgs.wechatNumber = shop.wechatNumber
				this.msgs.profile= shop.profile
				this.msgs.longitude = shop.longitude
				this.msgs.latitude= shop.latitude
				this.imgArray = shop.photos
				this.address = getpostion(shop.areaId)
				this.firstMakeloc(shop.areaId)
				this.shiming = res.data.data.hasIdCard
				this.qiye = res.data.data.businessLicense?true:false
				if(this.qiye){
					this.corporateName = shop.corporateName
				}
			},this)
		},
		data(){
			return{
				iswechat:false,
				corporateName:'',
				shiming:false,
				qiye:false,
				areas:{},
				cityname:{},
				cityPickerValueDefault:[0,0,0],
				themeColor: '#007AFF',
				count:4,
				dis:false,
				imgArray:[],
				token:'',
				address:'',
				user:{},
				msgs:{
					areaId:'',
					mainBusiness:"",
					position:"",
					wechatNumber:"",
					address:"",
					profile:'',
					longitude:'',
					latitude:'',
					"photos": [
					  
					  ]
				}
			}
		},
		methods: {
			toshiming(){
				if(this.shiming){
					return
				}
				uni.navigateTo({
					url:'../Authentication/realNamebg?title=个人认证&src=https://img.hm8848.com/APP/auimg.png&url=realName'
				})
			},
			toqiye(){
				if(this.qiye){
					return
				}
				if(!this.shiming){
					uni.showToast({
						icon:'none',
						title:"请先进行实名认证"
					})
					return
				}
				uni.navigateTo({
					url:'../Authentication/realNamebg?title=企业认证&src=https://img.hm8848.com/APP/auimg2.png&url=enterprise'
				})
			},
			firstMakeloc(areaname){
				var arr = []
				var area = this.areas[areaname]   //得到本城市名称
				var city = this.areas[area.parentId]  //上一个城市
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
				// this.obj.areaId  = area.id 
				// this.city = getpostion(area.id)
				this.cityPickerValueDefault = arr
			},
			
			
			
			
			addPhoto() {
				if(this.throttle){
					return
				}
				let that = this
				//#ifdef APP-PLUS
				 plus.key.hideSoftKeybord()
				//#endif
				this.throttle = true
				that.$refs.cpimg._changImg()
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
									console.log(res)
									if(count==file.length){
										uni.hideLoading()
										this.throttle = false
										this.count = 4-this.imgArray.length
								}
						})
				}
			},
			
					
			 upload(img,callback){
				 uni.uploadFile({
					url: 'https://openapi.hm8848.com/my/shops/photos', //仅为示例，非真实的接口地址
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
			cpimgErr(e) {
				console.log(e)
				this.throttle = false
			},
			areapicshow(){
				
				this.$refs.myCityPicker.show()
			},
			onareasure(e){
				this.msgs.areaId = e.cityCode
				var city = getpostion(e.cityCode)
				this.address = city
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
			remove(index){
				uni.showModal({
					title: '提示',
					content: '确定要删除么',
					success: (res)=> {
						if (res.confirm) {
							this.imgArray.splice(index,1)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
			},
			sures(){
				if(!this.msgs.areaId){
					uni.showToast({
						icon:"none",
						title:'所在地为必填选项'
					})
					return
				}
				var arr = []
				for(var i=0;i<this.imgArray.length;i++){
					arr.push(this.imgArray[i].key)
				}
				this.msgs.photos = arr 
			
				uni.request({
					url: this.websiteUrl + '/my/shops', //仅为示例，并非真实接口地址。
					data:this.msgs,
					method: "PUT",
					header: {
						authorization:this.$store.state.token //自定义请求头信息
					},
					
					success: (res) => {
							if(res.data.code == 0){
								uni.showToast({
									icon: 'success',
									title: '修改成功'
								})
														
								setTimeout(()=> {
									
									
									uni.navigateBack({
										delta:1
									})
								}, 1000);
							}else{
								uni.showToast({
									title:res.data.message,
									icon:'none'
								})
							}
							
					}
				})
			},
			chooseLocation(){
				//this.msgs.address 
				this.$jurisdiction(()=>{
					uni.getLocation({
						type:'gcj02',
						success:(res)=>{
							uni.navigateTo({
								url:'../components/map?lat='+res.latitude+"&lng="+res.longitude
							})
						}
					})
					
				})
			},
			
			
			
		},
	}
</script>

<style>
	.overs{
		overflow:hidden;
		text-overflow:ellipsis;
		white-space:nowrap;
	}
	.headerItem{
		width: 100%;
		display: flex;
		border-top:1upx solid #eeeeee;
	}
	.headerItemLeft{
		width: 217upx;
		/* background: #f7f7f7; */
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
	.headerItemLeft.item0{
		height: 154upx;
	
	}
	.item0Img{
		margin-top: 25upx;
		width: 104upx;
		height: 104upx;
		border-radius:50%;
	}
	.item2{
		color: #b6b6b6;
	}
	.item3{
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
		width: 68upx;
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
	
	.footer{
		width: 711upx;
		height: 80upx;
		line-height: 80upx;
		background: linear-gradient(to right,#17c5af,#20cdb2,#37e0b9,#3fe9bb);
		color: #fff;
		font-size: 40upx;
		text-align: center;
		border-radius: 10upx;
		margin: 40upx auto 50upx;
	}
	.footer:after{
		content: "";
		display: block;
		height: 40upx;
	}
	
	
	
	
	
	
</style>
