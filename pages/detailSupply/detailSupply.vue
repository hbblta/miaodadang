<template>
	<view @click="shareDetailsNone" class="detailSupply">
		
		<view v-if="shareDetailsDis" class="shareDetails">
			<view class="mains">
				<view class="shareClick">
					<view @click.stop="sharesweixin('WXSceneSession')" class="shareClickItems">
						<image src="../../static/shareImg1.png" mode=""></image>
						<view>微信好友</view>
					</view>
					<view @click.stop="sharesweixin('WXSenceTimeline')"  class="shareClickItems">
						<image src="../../static/shareImg2.png" mode=""></image>
						<view>朋友圈</view>
					</view>
				</view>
			</view>
		</view>
		
		
		<view class="footerbot">
			<view  class="footerbot-right">
				<view >
					<view @click="quxiaoshoucang" v-if="collection.iscollection">
						<view class="iconfont icon-shoucang1"></view>
						<view style='font-size: 27upx;'>收藏</view>
					</view>
					<view v-else @click="shoucang">
						<view class="iconfont icon-shoucang"></view>
						<view style='font-size: 27upx;'>收藏</view>
					</view>
				</view>
				
			</view>
			<view class="footerbot-left">
				<!-- <view @click="nokaifang" style="background:linear-gradient(to bottom,#fec936,#ffb426,#ff9e1d);">聊一聊</view> -->
				<view @click="showCall">打电话</view>
			</view>
		</view>
		<view  :style="{opacity:opcti}">
			<view class="statusBar"></view>
				<view class="tabBar">
					<view  @touchstart="backs" class="tabBar-left">
						<span class="iconfont icon-fanhui"></span>
					</view>
					<view class="tabBar-mid">
						<view :class="tabactive==1?'active':''" class="tabBar-mid-item" @click="tabchange(1)">
							供应
							<view v-if="tabactive==1"></view>
						</view>
						<view :class="tabactive==2?'active':''" class="tabBar-mid-item"  @click="tabchange(2)">
							详情
							<view  v-if="tabactive==2"></view>
						</view>
						<!-- <view :class="tabactive==3?'active':''" class="tabBar-mid-item"  @click="tabchange(3)">
							推荐
							<view  v-if="tabactive==3"></view>
						</view> -->
					</view>
					<view @click.stop="shareDetailsShow" class="tabBar-right">
						<span class="iconfont icon-share"></span>
					</view>
				</view>
		</view>
		
		
		<scroll-view @scroll="onscroll" class="centers" scroll-y :style="[{height:'calc(100vh)'}]"  :enable-back-to-top="true" :scroll-with-animation="true" :scroll-into-view="'indexes-'+ midIndex">
			<view id="indexes-1">
				<view class="swipers">
					<view class="backmore">
						<view @touchstart="backs" class="back icon-fanhui iconfont"></view>
						<view @click.stop="shareDetailsShow" class="more icon-share iconfont"></view>
					</view>
					<swiper class="swiper" @change="swipeChange">
                        <swiper-item  v-for="(item,index) in obj.photos" :key="index">
                           <image @click="showImgs(index)" :src="item"  mode="aspectFill"></image>
                        </swiper-item>
                       
                    </swiper>
					<view class="pages">
						{{swipeItem}}/{{obj.photos.length}}
					</view>
				</view>
				
				<view class="userInformation w700">
					<view class="userInformation-top">
						<view class="userInformation-top-item1 overs">
							{{info.name}}
						</view>
						<view class="userInformation-top-item2">
							<view class="overs">{{city}}</view> 
						</view>
						<view class="userInformation-top-item3">
							{{obj.price}} <span>元/{{info.unit}}</span>  <span v-if="location" class='iconfont icon-weizhi1'></span> <view v-if="location" class="overs">{{location}}</view>
						</view>
						<view @click="tojubao" class="report">
							<span class='iconfont icon-guoqiflag30'></span>
							<view >虚假举报</view>
						</view>
					</view>
					<view class="userInformation-bot"></view>
				</view>
				<view class="ffflines"></view>
				<view @click="toshops" class="nameMsg w700">
					<view class="nameMsg-image">
						<image :src="obj.avatarUrl"  mode="aspectFill"></image>
					</view>
					<view class="nameMsg-name">
						<view class="nameMsg-name-item1">
							<view  class="overs">
								{{obj.realName?obj.realName:obj.nickName}}
							</view>
							
							<view class="icon-grounp">
								<view v-if="obj.agencies.length" style="background:#1dae2d;">
									服
								</view>
								<view v-if="obj.rank == 7" style="background:#b9227f;">
									冠
								</view>
								<view v-if="obj.rank == 6" style="background:#2b6cd0;">
									钻
								</view>
								<view v-if="obj.rank == 5" style="background:#ffa523;">
									金
								</view>
								<view v-if="obj.isMember" style="background:#ed7f40;">
									诚
								</view>
								<view v-if="obj.hasBusinessLicense"  style="background:#38d3cb;">
									企
								</view>
								<view v-if="obj.hasIdCard"  style="background:#019fa2;">
									实
								</view>
							</view>
						</view>
						<view style="min-height: 20upx;" class="nameMsg-name-item2 overs">
							{{obj.corporateName}}
						</view>
						<view class="nameMsg-name-item2">
							持续经营{{obj.birthTime}}天 诚信等级:{{obj.rank}}级
						</view>
					</view>
					<view class="nameMsg-store">
						进店逛逛
					</view>
				</view>
				
			</view>
			<view id="indexes-2">
				<view class="lines">
				</view>
				<!-- <view class="amountMoney">
					<span class="iconfont icon-qian"></span>您还不是买家保障商家，加入后即可提升供应排名
				</view> -->
				<view class="indexes-2-title">
					详细信息
				</view>
				<view class="inforlist">
					<view v-for="(item,index) in obj.specificationsArr" :key='index' class="inforlist-item">
						<view class="overs inforlist-item-left">{{item.name}}</view>
						<view class="overs inforlist-item-right">{{item.value}}</view>
					</view>
					<view v-if="obj.quantity" class="inforlist-item overs">
						<view class="overs inforlist-item-left">数量</view>
						<view class="overs inforlist-item-right">{{obj.quantity}}{{info.unit}}</view>
					</view>
				</view>
				<view class="Tips1">[联系我时，请说是在苗搭档上看到的]{{obj.profile}}</view>
				<view style="width: 100%;"></view>
				<image mode="widthFix" @click="showImgs(index)" v-for="(item,index) in obj.photos" :key="index" class="Tipsimage" :src="item" ></image>
				
				<view class="Tips2">
					<span>更新时间: {{obj.time}}</span> <!-- <span>供应编号: 1251172</span> -->
				</view>
			</view>
			<view style="height:94upx;"></view>
			<!-- <view id="indexes-3">
				<view class="indexes-3-title">
					为您推荐
				</view>
				<view class="indexes-3-list">
					<view class="indexes-3-list-item">
						<image src="../../static/test/index1.png" mode=""></image>
						<view class="indexes-3-list-item1">
							大叶油草
						</view>
						<view class="indexes-3-list-item2">
							金华市五城区哈啊哈
						</view>
						<view class="indexes-3-list-item3">
							2.50 <span>元/平方米</span>
						</view>
					</view>
					<view class="indexes-3-list-item">
						<image src="../../static/test/index1.png" mode=""></image>
						<view class="indexes-3-list-item1">
							大叶油草
						</view>
						<view class="indexes-3-list-item2">
							金华市五城区哈啊哈
						</view>
						<view class="indexes-3-list-item3">
							2.50 <span>元/平方米</span>
						</view>
					</view>
					<view class="indexes-3-list-item">
						<image src="../../static/test/index1.png" mode=""></image>
						<view class="indexes-3-list-item1">
							大叶油草
						</view>
						<view class="indexes-3-list-item2">
							金华市五城区哈啊哈
						</view>
						<view class="indexes-3-list-item3">
							2.50 <span>元/平方米</span>
						</view>
					</view>
					<view class="indexes-3-list-item">
						<image src="../../static/test/index1.png" mode=""></image>
						<view class="indexes-3-list-item1">
							大叶油草
						</view>
						<view class="indexes-3-list-item2">
							金华市五城区哈啊哈
						</view>
						<view class="indexes-3-list-item3">
							2.50 <span>元/平方米</span>
						</view>
					</view>
				</view>
			</view> -->
		</scroll-view> 
		
	</view>
</template>

<script>
	import {areas} from '../Authentication/areas.js'
	import getTime from '../../common/getTime.js'
	import getpostion from '../../common/getpostion.js'
	export default {
		onLoad(e){
			this.id = e.id
		
			
			try {
				this.init()
			}
			catch(err) {
				this.init()
			}
			
		},
	
		data() {
			return {
				shareStr:'111',
				shareDetailsDis:false,
				stayCall:true,
				collection:{
					ismy:true,
					iscollection:false,
					timing:true
				},
		
				id:'',
				location:'',
				areas:{},
				city:'',
				obj:{
					birthTime:0,
					corporateName:'',
					rank:'',
					photos:[""],
					price:'0.00',
					realName:'',
					nickName:'',
					time:"",
					specificationsArr:[],
					avatarUrl:"",
					profile:''
				},
				info:{
					name:'',
					unit:""
				},
				tabactive:1,
				swipeItem:1,
				tabBarHeight:'',
				opcti:0,
				midIndex:1,
				indexHeight:{
					index1:'',
					index2:'',
					index3:''
				}
			}
		},
		onReady() {
				let selector = uni.createSelectorQuery().select('.tabBar');  
				selector.fields({size:true},data =>{
					this.tabBarHeight = data.height
				}).exec();
				let index1 = uni.createSelectorQuery().select('#indexes-1');  
				 index1.fields({size:true},data =>{  
					this.indexHeight.index1 = data.height
				}).exec();
				let index2 = uni.createSelectorQuery().select('#indexes-2');  
				 index1.fields({size:true},data =>{   
					this.indexHeight.index2 = data.height
				}).exec();
				let index3 = uni.createSelectorQuery().select('#indexes-3');  
				 index1.fields({size:true},data =>{   
					this.indexHeight.index3 = data.height
				}).exec();
		},
		methods: {
			nokaifang(){
				if(!this.$store.state.token){
					uni.showToast({
						icon:'none',
						title:'请登录'
					})
					setTimeout(()=> {
						uni.navigateTo({
							url:'../login/login1'
						})
					}, 1000);
					return
				}
				uni.showToast({
					icon:'none',
					title:'暂未开放,敬请期待'
				})
			},
			tojubao(){
				uni.showToast({
					icon:'success',
					title:'举报成功'
				})
			},
			getNumberDay(createTime){
				      var odate = new Date(createTime)
				      var zeroDate = odate.getFullYear() + "/" + (odate.getMonth() + 1) + "/" + odate.getDate()
				      zeroDate = new Date(zeroDate)
				      zeroDate = zeroDate.getTime()
				      var ndate = new Date().getTime()
				      var gdate = ndate - zeroDate
				      var day = Math.ceil(gdate / 1000 / 60 / 60 / 24)
				      return day
			},
			shareDetailsNone(){
				this.shareDetailsDis = false
			},
			shareDetailsShow(){
				this.shareDetailsDis = true
			},
			sharesweixin(type){
			
				uni.share({
				    provider: "weixin",
				    scene: type,
				    type: 0,
					title:this.obj.nickName + '的供应 -- '+this.info.name,
					imageUrl:'https://img.hm8848.com/APP/152x152.png',
					href:'https://m.miaodadang.com/supplyDetails?id='+this.id,
				    summary: this.shareStr,
				    success:  (res)=> {
						this.shareDetailsDis = false
						if(this.$store.state.token){
							this.$myhttp.post(this.websiteUrl+'/my/share','',(res)=>{
								
							},this)
						}
				    },
				    fail: function (err) {
						// this.shareDetailsDis = false
				    }
				});
			},
			showCall(){
				if(!this.$store.state.token){
					uni.showToast({
						icon:'none',
						title:'请登录'
					})
					setTimeout(()=> {
						uni.navigateTo({
							url:'../login/login1'
						})
					}, 1000);
					return
				}
				if(!this.stayCall){
					return
				}
				this.stayCall = false
				this.$myhttp.post(this.websiteUrl+'/my/shops/'+this.obj.userId+'/contact?pay=false','',(res)=>{
					console.log(res)
					uni.makePhoneCall({
						 phoneNumber:res.data.data
					})
					
				},this)
				setTimeout(()=>{
					this.stayCall = true	
				},1000)
			},
			quxiaoshoucang(){
				if(!this.collection.timing){
					return
				}
				this.collection.timing = false
				this.$myhttp.post(this.websiteUrl+'/my/supplies/'+this.id+'/unmark','',(res)=>{
						if(res.data.code == 0){
							this.collection.iscollection = false
							uni.showToast({
								title:'取消成功'
							})
							
						}
						setTimeout(()=>{
							this.collection.timing = true
						},500)
				},this)
			},
			toLogin(){
				uni.showToast({
					icon:'none',
					title:'请登录'
				})
				setTimeout(()=> {
					uni.navigateTo({
						url:'../login/login1'
					})
				}, 1000);
			},
			shoucang(){
				if(!this.collection.timing){
					return
				}
				if(!this.$store.state.token){
					this.toLogin()
					return
				}
				if(!this.collection.ismy){
					uni.showToast({
						icon:'none',
						title:'不能收藏自己的产品!'
					})
					return
				}
				this.collection.timing = false
				this.$myhttp.post(this.websiteUrl+'/my/supplies/'+this.id+'/mark','',(res)=>{
						if(res.data.code == 0){
							this.collection.iscollection = true
							uni.showToast({
								title:'收藏成功'
							})
							
						}
						setTimeout(()=>{
							this.collection.timing = true
						},500)
				},this)
			},
			getshoucang(){
				this.$myhttp.get(this.websiteUrl+'/my/supplies/'+this.id+'/marked','',(res)=>{
					this.collection.iscollection = res.data.data
				},this)
			},
			init(){
				
				if(this.$store.state.token){
				
					this.$myhttp.get(this.websiteUrl+'/my','',(res)=>{
					
						var userId = res.data.data.user.id
					
						this.$myhttp.get(this.websiteUrl+'/supplies/snapshots/'+this.id,'',(res)=>{
							console.log(res)
							var info = res.data
							if(info.data.userId == userId){
								this.collection.ismy = false
							}else{
								this.collection.ismy = true
								this.getshoucang()
							}
							this.obj = info.data
							this.obj.birthTime = this.getNumberDay(info.data.shopCreateTime)
							this.obj.price = this.obj.price.toFixed(2)
							this.obj.time = getTime(this.obj.refreshTime)
							this.info = this.$store.state.categories[this.obj.categoryId]
							this.getlocation()
							var city = getpostion(info.data.areaId)
							this.city  = city.replace(/-/g,"")	
							var arrs = []
							var specifications = JSON.parse(this.obj.specifications)
							this.shareStr = ''
							for(let i =0;i<specifications.length;i++){
								var str = {
									name:'',
									value:''
								}
								var value = ''
								var unit = ''
								if(specifications[i].value instanceof Array){
									if(specifications[i].value[0] == specifications[i].value[1]){
										value = specifications[i].value[0]
									}else{
										value = specifications[i].value[0]+value +'-'+ specifications[i].value[1]
									}
								}else{
									value = specifications[i].value
								}
								if(specifications[i].unit){
									unit = specifications[i].unit
								}
								str.name = specifications[i].name 
								str.value = value+unit 
								arrs.push(str)
								this.shareStr += specifications[i].name + ':'+ str.value +";"
							}
							this.obj.specificationsArr = arrs
							
						})
					},this)
					
				}else{
					
					this.collection.ismy = false
					this.$http.get(this.websiteUrl+'/supplies/snapshots/'+this.id,'',(res)=>{
						console.log(res)
						var info = res.data
						this.obj = info.data
						this.obj.price = this.obj.price.toFixed(2)
						this.obj.time = getTime(this.obj.refreshTime)
						this.obj.birthTime = this.getNumberDay(info.data.shopCreateTime)
						this.info = this.$store.state.categories[this.obj.categoryId]
						this.getlocation()
						var city = getpostion(info.data.areaId)
						this.city  = city.replace(/-/g,"")	
						var arrs = []
						var specifications = JSON.parse(this.obj.specifications)
						for(let i =0;i<specifications.length;i++){
							var str = {
								name:'',
								value:''
							}
							var value = ''
							var unit = ''
							if(specifications[i].value instanceof Array){
								value = specifications[i].value[0]+'-'+ specifications[i].value[1]
							}else{
								value = specifications[i].value
							}
							if(specifications[i].unit){
								unit = specifications[i].unit
							}
							str.name = specifications[i].name 
							str.value = value+unit 
							arrs.push(str)
						}
						this.obj.specificationsArr = arrs
						
					},this)
				}
				
				
			},
			
			toshops(){
				if(!this.$store.state.token){
					uni.showToast({
						icon:'none',
						title:'请登录'
					})
					setTimeout(()=> {
						uni.navigateTo({
							url:'../login/login1'
						})
					}, 1000);
					return
				}
				uni.navigateTo({
					url:'../shops/shop?id='+this.obj.userId
				})
				
			},
			getlocation(){
				uni.getLocation({
					type:'gcj02',
					success: res => {
						var La1 = this.obj.location.lat * Math.PI / 180.0;
						var Lo1 = this.obj.location.lon;
						var La2
						var Lo2
						var earthRadius = 6371;
						Lo2 = res.longitude
						La2 = res.latitude * Math.PI / 180.0;
						var La3 = La1 - La2;
						var Lb3 = Lo1 * Math.PI / 180.0 - Lo2 * Math.PI / 180.0;
						var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
						s = s * 6378.137;//地球半径
						s = parseInt(Math.round(s * 10000) / 10);      //距离计算添加对象
						this.location = (s/1000).toFixed(2)+'公里'
					},
					fail: () => {
						this.location = ''
					},
					complete: () => {}
				});
				
				
			},
			showImgs(index){
				
				uni.previewImage({
					current:index,
					urls: this.obj.photos
				});
			},
			backs(){  //返回
				uni.navigateBack({
					delta:1
				})
			},
			tabchange(e){
				this.midIndex=e
				this.tabactive=e
			},
			swipeChange(e){
				this.swipeItem = e.detail.current+1
			},
			onscroll(e){
				var scoll = e.target.scrollTop
				this.opcti =  this.tabBarHeight-scoll
				if(this.opcti<=0){
					this.opcti  = 1
					
				}else if(this.opcti <= this.tabBarHeight){
					this.opcti = scoll/this.tabBarHeight
				}else{
					this.opcti = 0
				}
				if(scoll >= (this.indexHeight.index1-this.tabBarHeight) ){
					this.tabactive = 2
				}
				if(scoll >= (this.indexHeight.index1+this.indexHeight.index2-this.tabBarHeight) ){
					this.tabactive = 3
				}
			}
		}
	}
</script>

<style>
	@import url("../../style/detailSupply.css");
	#indexes-2 .lines{
		width: 100%;
		height: 2upx;
		background: #f3f3f3;
	}
</style>
