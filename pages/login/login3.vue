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
				<view class="headerItemRight overs">
					{{user.nickname}}
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
				<view class="headerItemRight item2">
					请进行企业认证
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
			<view class="headerItem">
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
			
		<!-- 	<view @click="showImg(item.url)" class="center-img" v-for="(item,index) in imgArray" :key='index'>
				<image :src="item.url" mode=""></image>
				<icon @click.stop="remove(index)" type='cancel' size="20"/>
			</view>
			
			<view v-if="imgArray.length < 4" @tap="addPhoto" class="center-add iconfont icon-camera1">
					
			</view> -->
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
		onLoad(e) {
				this.tokens = e.tokens
				uni.request({
					url: this.websiteUrl + '/my', //仅为示例，并非真实接口地址。
					header: {
						authorization: this.tokens//自定义请求头信息
					},
					success: (res) => {
							this.user = res.data.data.user
					}
				})
				
				
				uni.getLocation({
					type:'gcj02',
					success: (res)=> {
						this.msgs.longitude = res.longitude
						this.msgs.latitude= res.latitude
					
					var point = new plus.maps.Point(res.longitude, res.latitude);
					plus.maps.Map.reverseGeocode(
					point,
					{},
					(event)=>{
						this.address = event.address
						uni.request({
								url: this.websiteUrl + '/areas/find?location=' + encodeURIComponent(event.address),
								success: res => {
												console.log(res)
													uni.request({
														url: this.websiteUrl + '/users', //仅为示例，并非真实接口地址。
														data: {
															"areaId":res.data.data,
															"mainBusiness": "",
															"position": "",
															"wechatNumber": "",
															"address": "",
															"profile": "",
															"longitude":'',
															"latitude": ''
														},
														method: "PUT",
														header: {
															authorization: this.tokens //自定义请求头信息
														},
														success: (res) => {
															if(res.data.code == 0){
																uni.showToast({
																	icon: 'success',
																	title: '注册成功'
																})
																uni.setStorage({
																	key: "userInfo",
																	data: JSON.stringify(res.data.data)
																})
																setTimeout(() => {
																	this.$store.state.token = this.tokens
																	uni.setStorage({
																		key: "token",
																		data: this.tokens
																	})
																	
																	uni.reLaunch({
																		url: '../tabs/tabs'
																	})
																}, 1000);
															}
															
														}
													})
												},
												fail: () => {},
												complete: () => {}
											});
					},
					function(e) {}
								);
							}
					});
				
			
			
		},
		data(){
			return{
				cityPickerValueDefault:[0,0,0],
				themeColor: '#007AFF',
				count:4,
				dis:false,
				imgArray:[],
				token:'',
				address:'',
				user:{
					
				},
				msgs:{
					areaId:"6550688903064453120",
					mainBusiness:"",
					position:"",
					wechatNumber:"",
					address:"",
					profile:'',
					longitude:'',
					latitude:'',
					"photos": []
				}
			}
		},
		methods: {
			
			
			
					
			
			areapicshow(){
				
				this.$refs.myCityPicker.show()
			},
			onareasure(e){
				this.msgs.areaId = e.cityCode
				var city = getpostion(e.cityCode)
				this.address = city
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
			console.log(this.msgs)
				uni.request({
					url: this.websiteUrl + '/my/shops', //仅为示例，并非真实接口地址。
					data:this.msgs,
					method: "PUT",
					header: {
						authorization:this.tokens //自定义请求头信息
					},
					
					success: (res) => {
						console.log(res)
							if(res.data.code == 0){
								uni.showToast({
									icon: 'success',
									title: '注册成功'
								})
								uni.setStorage({
									key: "userInfo",
									data: JSON.stringify(res.data.data)
								})
								setTimeout(()=> {
									this.$store.state.token = this.tokens
									uni.setStorage({
										key: "token",
										data: this.tokens
									})
									uni.reLaunch({
										url:'../tabs/tabs'
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
