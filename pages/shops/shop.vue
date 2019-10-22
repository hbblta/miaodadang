<template>
	<view @click="shareDetailsNone">
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
		<view class="footers">
			<view v-if="!ismy" class="nomy">
				<view style="color:#14c4ad;flex: 1;" class="nomyFollow">
					<view @click="guanzhu" v-if="!followed">
						<span style="color:#14c4ad;" class='iconfont icon-guanzhu'></span> 
					+关注</view>
					<view @click="quxiaoguanzhu" v-else>取消关注</view>
					<i></i>
				</view>
				<!-- <view class="nomyFollow">
					<view><span class='iconfont icon-liaotian'></span> 
					聊一聊</view>
					<i></i>
		
				</view> -->
				<view @click="showCall" style="flex: 1;" class="nomyFollow">
					<view ><span class='iconfont icon-dianhua1'></span> 
					打电话</view>
				
				</view>
			</view>
			<view v-else class="my">
				<view class="nomyFollow">
					<view @click="edits" style="color:#14c4ad;"><span style="color:#14c4ad;" class='iconfont icon-bianji'></span> 
					店铺编辑</view>
					<i></i>
				</view>
				<view @click.stop="shareDetailsShow" class="nomyFollow">
					<view><span class='iconfont icon-fenxiang1'></span> 
					分享苗店</view>
				</view>
			</view>
		</view>
		
		
		<view class="header">
			<view class="header-top">
				<view class="topIcon">
					<span @touchstart="back" class='iconfont icon-fanhui'></span>
					<span  @click.stop="shareDetailsShow" class='iconfont icon-fenxiang'></span>
				</view>
				<view class="midUser">
					<view class="midUserLeft">
						<image :src="obj.avatarUrl" mode="aspectFill"></image>
					</view>
					<view class="midUserRight">
						<view class="midUserRight1 overs">
							{{obj.nickName}}
						</view>
						<view class="midUserRight2">
							{{obj.corporateName}}
						</view>
						<view class="midUserRight3">
							<!-- <span class='iconfont icon-ai-briefcase'></span> -->
							<view class="zhuyin overs">主营:{{obj.mainBusiness?obj.mainBusiness:'暂未编辑'}}</view>
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
						<view class="midUserRight4">
							<span class='iconfont icon-weizhi2'></span>
							{{obj.city}}
						</view>
					</view>
				</view>
				<view class="headerbot">
					<view class="headerbotList">
						<view class="headerbotListItem">
							<view class="headerbotListItemTop">
								{{obj.visitors}}
							</view>
							<view class="headerbotListItembottom">
								访客
							</view>
						</view>
						<view class="headerbotListItem">
							<view class="headerbotListItemTop">
								{{obj.followers}}
							</view>
							<view class="headerbotListItembottom">
								粉丝
							</view>
						</view>
						<view class="headerbotListItem">
							<view class="headerbotListItemTop">
								{{obj.contacts}}
							</view>
							<view class="headerbotListItembottom">
								联系
							</view>
						</view>
					</view>
					<view class="tianshu">
						<span class='iconfont icon-hua'></span>
						经营<span>{{obj.birthTime}}</span>天
					</view>
				</view>
			</view>
			<view class="showMain">
				<view class="outTab">
					<view class="showmainTab">
						<view @click="activetab=1" :class="activetab==1?'active':''" class="showmainTabItem">
							供应信息
							<i v-if='activetab==1'></i>
						</view>
						<view @click="activetab=2"  :class="activetab==2?'active':''" class="showmainTabItem">
							最近动态
							<i  v-if='activetab==2'></i>
						</view>
						<view @click="activetab=3"  :class="activetab==3?'active':''" class="showmainTabItem">
							实力展示
							<i  v-if='activetab==3'></i>
						</view>
					</view>
					<swiper class="swiper" :current='activetab-1' @change='swiperchange'>
							<swiper-item>
							<view v-if="!lists.arrs.length && lists.times" class="nodata">
									没有任何数据哦～
							</view>
							<you-scroll style="height: 100%;"  v-if="lists.arrs.length" @onPullDown="onNewSupplies"  @onLoadMore="onsuppliesData('')">
								<view>
									<view class="suppyInfo">
										<view @click="todetails(item.id,item.details)" v-for="(item,index) in lists.arrs" :key='index' class="supplyItem">
											<image :src="item.photos[0]" mode="aspectFill" ></image>
											<view class="title">
												{{item.details.name}}
											</view>
											<view class="tit">
												<view>{{item.price.toFixed(2)}}元/{{item.details.unit}}</view>
												<view style="color:#bbbbbb;">
													<!-- <span style='font-size: 28upx;margin-top: 4upx;' class='iconfont icon-yanjing'>
														
													</span>1454127 -->
												</view>
											</view>
										</view>
										
									</view>
									<view class="more">{{lists.loadingText}}</view>
								</view>
							</you-scroll>
							</swiper-item>
							<swiper-item>
							<view v-if="!dynamic.arrs.length && dynamic.times" class="nodata">
								没有任何数据哦～
							</view>
						<you-scroll style="height:100%;"  v-if="dynamic.arrs.length"   @onPullDown="onNewDynamic"   @onLoadMore="getDynamic('')">
							<view>
								<view class="dynamic">
									<view v-for="(item,index) in dynamic.arrs" :key='index' class="outdynamicItem">
										<view class="dynamicItem">
											<view class="dynamicItemTop">
												<view class="dynamicItemTopLeft">
													<image  @click="toshops(item.userId)" :src="item.avatarUrl" mode=""></image>
												</view>
												<view class="dynamicItemTopRight">
													<view class="dynamicItemTopRight1">
														<view  @click="toshops(item.userId)" class="name">{{item.nickName}}</view>
														<view   class="icon-grounp">
															<view  v-if="item.agencies.length" style="margin-top:10upx;background:#1dae2d;">
																服
															</view>
															<view v-if="item.rank == 7"  style="margin-top:10upx;background:#b9227f;">
																冠
															</view>
															<view v-if="item.rank == 6"  style="margin-top:10upx;background:#2b6cd0;">
																钻
															</view>
															<view v-if="item.rank == 5"  style="margin-top:10upx;background:#ffa523;">
																金
															</view>
															<view v-if="item.isMember" style="margin-top:10upx;background:#ed7f40;">
																诚
															</view>
															<view  v-if="item.hasBusinessLicense" style="margin-top:10upx;background:#38d3cb;">
																企
															</view>
															<view v-if="item.hasIdCard" style="margin-top:10upx;background:#019fa2;">
																实
															</view>
														
														</view>
													</view>
													<view class="dynamicItemTopRight2">
														{{item.city?item.city:''}}
													</view>
													<view  class="texts">
														<text>{{item.contents}}</text>
													</view>
													<view class="thumbnails">
														<view :class="item.photos.length === 1?'my-gallery':'thumbnail'" v-for="(image, index_images) in item.photos" :key="index_images">
															<image @click="showdynamicImg(item.photos,index_images)" class="gallery_img" :src="image" lazy-load mode="aspectFill"   ></image>
														</view>
													</view>
													<view class="bot">
														{{item.time}}·{{item.loc?item.loc:''}}·{{item.views}}阅读量
													</view>
												</view>
												
											</view>
											
										</view>
									</view>
								</view>
								<view class="more">{{dynamic.loadingText}}</view>
							
								</view>
							</you-scroll>
							</swiper-item>
							<swiper-item>
								<view class="strength">
									<view class="title">
										简介
									</view>
									<view class="maintext">
										<text>
											{{obj.profile}}
										</text>
									</view>
									<view  class="imgGroup">
										<image @click="showdynamicImg(obj.photos,index)" v-for="(item,index) in obj.photos" :key='item' :src="item" mode=""></image>
									
									</view>
									<view class="title">认证信息</view>
									<view class="authentication">
										<view class="item">
											<view  :style="{background:obj.hasIdCard?'#ffae00':'#999999'}" class="itemTop">
												<image style="width: 42upx;height: 45upx;" src="../../static/Authentication/index1.png" mode=""></image>
											</view>
											实名认证
										</view>
										<view class="item">
											<view :style="{background:obj.hasBusinessLicense?'#5bb53c':'#999999'}" class="itemTop">
												<image style="width: 42upx;height: 45upx;" src="../../static/Authentication/index2.png" mode=""></image>
											</view>
											企业认证
										</view>
										<view class="item">
											<view :style="{background:obj.isMember?'#339ee9':'#999999'}"   class="itemTop">
												<image style="width: 42upx;height: 45upx;" src="../../static/Authentication/index3.png" mode=""></image>
											</view>
											诚信认证
										</view>
										<view class="item">
											<view :style="{background:obj.agencies.length?'#f45262':'#999999'}"   class="itemTop">
												<image style="width: 42upx;height: 45upx;" src="../../static/Authentication/index4.png" mode=""></image>
											</view>
											服务站认证
										</view>
									</view>
								</view>
							</swiper-item>
					</swiper>
				</view>
				
				
				
			</view>
		</view>
	</view>
</template>

<script>
	import getpostion from '../../common/getpostion.js'

	import youScroll from '../components/you-scroll'
	export default{
		components:{
			youScroll
		},
		onLoad(e){
			this.id = e.id
		},
		onShow(){
			this.getUsers()
			this.onsuppliesData('')
			this.getMyloctions()
			this.getDynamic('')
		},
		data(){
			return{
				shareDetailsDis:false,
				stayCall:true,
				location: {
					latitude: '',
					longitude: ''
				},
				lists:{
					arrs:[],
					Total:0,
					start:0,
					length:8,
					loadingText:'已全部加载完毕',
					times:0,
					loading:false
				},
				dynamic:{
					arrs:[],
					Total:0,
					start:0,
					length:6,
					loadingText:'已全部加载完毕',
					times:0,
					loading:false
				},
				timing:true,
				followed:false,
				ismy:false,
				id:'',
				obj:{
					nickName:'',
					corporateName:'',
					mobile:'',
					avatarUrl:'',
					city:'',
					visitors:'',
					followers:'',
					contacts:''
				},
				activetab:1,
				num:'qwerty'
			}
		},
		methods:{
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
					title:this.obj.nickName + '的苗店 -- 点击关注',
					imageUrl:'https://img.hm8848.com/APP/152x152.png',
					href:'https://m.miaodadang.com/shop?id='+this.id,
				    summary:`主营:${this.obj.mainBusiness}`,
				    success:  (res)=> {
						if(this.$store.state.token){
							this.$myhttp.post(this.websiteUrl+'/my/share','',(res)=>{
							})
						}
						this.shareDetailsDis = false
				    },
				    fail: function (err) {
				        console.log("fail:" + JSON.stringify(err));
						this.shareDetailsDis = false
				    }
				});
			},
			getUsers(){
				this.$myhttp.get(this.websiteUrl+'/users','',(res)=>{
					var user = res.data.data
					this.$myhttp.get(this.websiteUrl+'/shops/'+this.id,'',(res)=>{
						
						var info = res.data.data
						if(info.id == user.id){
							this.ismy = true
						}else{
							this.ismy = false
							this.getfollowed()
						}
						var city = getpostion(info.areas[0])
						info.city = city.replace(/-/g,"")
						info.birthTime = this.getNumberDay(info.createTime)
						this.obj = info
					})
				},this)
			},
			showCall(){
				if(!this.stayCall){
					return
				}
				this.stayCall = false
				this.$myhttp.post(this.websiteUrl+'/my/shops/'+this.id+'/contact?pay=false','',(res)=>{
					uni.makePhoneCall({
						 phoneNumber:res.data.data
						 // success:()=>{
							// this.getUsers() 
						 // }
					})
					
				},this)
				setTimeout(()=>{
					this.stayCall = true	
				},1000)
			},
			onNewDynamic(done){
				this.dynamic={
					arrs:[],
					Total:0,
					start:0,
					length:6,
					loadingText:'已全部加载完毕',
					times:0,
					loading:false
				}
				uni.getLocation({
					type:'gcj02',
					success: res => {
						this.location = {
							longitude: res.longitude,
							latitude: res.latitude
						}
						this.getDynamic(()=>{
							done()
						})
					}
				});
			},
			onNewSupplies(done){
				this.lists={
					arrs:[],
					Total:0,
					start:0,
					length:8,
					loadingText:'已全部加载完毕',
					times:0,
					loading:false
				}
				this.onsuppliesData(()=>{
					done()
				})
			},
			toshops(id){
				uni.navigateTo({
					url:'../shops/shop?id='+id
				})
			},
			edits(){
				uni.navigateTo({
					url:'edit'
				})
			},
			showdynamicImg(item,index){
					uni.previewImage({
						current:index+'',
					    urls: item,
						loop:true
					})
			},
			getMyloctions() {
				uni.getLocation({
					type:'gcj02',
					success: res => {
						this.location = {
							longitude: res.longitude,
							latitude: res.latitude
						}
					}
				});
			},
			todetails(id,info){
				var infos = JSON.stringify(info)
				uni.navigateTo({
					url:'../detailSupply/detailSupply?id='+id+'&info='+infos
				})
			},
			onsuppliesData(fn) {
				
				if(this.lists.loading){
					fn && fn()
					return
				}
				this.lists.loading = true
				if (this.lists.Total !== 0) {
					if (this.lists.Total == this.lists.arrs.length) {
						this.lists.loadingText = '已全部加载完毕'
						fn && fn()
						return
					}
				}
				this.lists.loadingText = '上拉加载更多'
				this.$http.get(this.websiteUrl + '/supplies/search?start=' + this.lists.start + '&length=' + this.lists.length +
					'&userId='+this.id+'&sort=time', '', (res) => {
						var res = res.data.data
						this.lists.Total =res.totalCount
						if (res.items.length) {
							var info = res.items
							info.forEach((item) => {
								item.details = this.$store.state.categories[item.categoryId]
								
							})
							this.lists.start += res.items.length
							this.lists.arrs = this.lists.arrs.concat(info)
							
							if (this.lists.Total !== 0) {
								if (this.lists.Total == this.lists.arrs.length) {
									this.lists.loadingText = '已全部加载完毕'
									fn && fn()
									return
								}
							}
						
						} else {
							this.lists.loadingText = '已全部加载完毕'
						}
						fn && fn()
						this.lists.times++
						this.lists.loading = false
					})
			},
			getDynamic(fn){
							if(this.dynamic.loading){
								fn && fn()
								return
							}
							this.dynamic.loading = true
							if (this.dynamic.Total !== 0) {
								if (this.dynamic.Total == this.dynamic.arrs.length) {
									this.dynamic.loadingText = '已全部加载完毕'
									fn && fn()
									return
								}
							}
							this.dynamic.loadingText = '上拉加载更多'
							this.$myhttp.get(this.websiteUrl + '/news?start=' + this.dynamic.start + '&length=' + this.dynamic.length+"&userId="+this.id+'&sort=time', '', (res) => {
									var res = res.data.data
									this.dynamic.Total =res.totalCount
									if (res.items.length) {
										var info = res.items
									
										info.forEach((item) => {
											item.loc = this.getDynamiclocation(item.location.lat, item.location.lon)
											item.time = this.times(item.createTime)
											var city = getpostion(item.areaId)
											item.city  = city.replace(/-/g,"")	
										})
										this.dynamic.start += res.items.length
									
											this.dynamic.arrs = this.dynamic.arrs.concat(info)
										
										
										if (this.dynamic.Total !== 0) {
											if (this.dynamic.Total == this.dynamic.arrs.length) {
												this.dynamic.loadingText = '已全部加载完毕'
												fn && fn()
												return
											}
										}
									
									} else {
										this.dynamic.loadingText = '已全部加载完毕'
									}
									fn && fn()
									this.dynamic.times++
									this.dynamic.loading = false
								},this)
						},
		
			getDynamiclocation(latitude, longitude) {
				if (!this.location.latitude) {
					return ''
				}
				var La1 = latitude * Math.PI / 180.0;
				var Lo1 = longitude;
				var La2
				var Lo2
				var earthRadius = 6371;
				Lo2 = this.location.longitude
				La2 = this.location.latitude * Math.PI / 180.0;
				var La3 = La1 - La2;
				var Lb3 = Lo1 * Math.PI / 180.0 - Lo2 * Math.PI / 180.0;
				var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(
					Lb3 / 2), 2)));
				s = s * 6378.137; //地球半径
				s = parseInt(Math.round(s * 10000) / 10); //距离计算添加对象
				return (s / 1000).toFixed(2) + 'km'
			},
			times(val) {
					var times = ''
					var date = new Date(val)
					var date1 = date.getTime()
					var date2 = new Date().getTime()
					var Difference = date2 - date1
					var onemouths = 30 * 24 * 60 * 60 * 1000
					var oneday = 24 * 60 * 60 * 1000
					var onehour = 60 * 60 * 1000
					var onemiutes = 60 * 1000
					if (Difference < oneday) {
						if (Difference < onehour) {
							for (var i = 1; i <= 60; i++) {
								if (Difference <= i * onemiutes) {
									times = i + "分钟前"
									break
								}
							}
						} else {
							for (var i = 2; i <= 24; i++) {
								if (Difference < i * onehour) {
									times = i + "小时前"
									break
								}
							}
						}
			
					} else if (Difference < onemouths) {
						for (let i = 2; i <= 30; i++) {
							if (Difference < i * oneday) {
								times = i + "天前"
								break
							}
						}
					} else {
						times = getTime(date)
					}
					return times
			},
			guanzhu(){
				if(!this.timing){
					return
				}
				this.timing = false
				this.$myhttp.post(this.websiteUrl+'/my/shops/'+this.id+'/follow','',(res)=>{
						if(res.data.code == 0){
							this.followed = true
							uni.showToast({
								title:'关注成功'
							})
							
						}
						setTimeout(()=>{
							this.timing = true
						},500)
				},this)
			},
			quxiaoguanzhu(){
				if(!this.timing){
					return
				}
				this.timing = false
				this.$myhttp.post(this.websiteUrl+'/my/shops/'+this.id+'/unfollow','',(res)=>{
		
						if(res.data.code == 0){
							this.followed = false
							uni.showToast({
								title:'取消成功'
							})
						}
						setTimeout(()=>{
							this.timing = true
						},500)
				},this)
			},
			getfollowed(){
				this.$myhttp.get(this.websiteUrl+'/my/shops/'+this.id+'/followed','',(res)=>{
				
						this.followed = res.data.data
						
				},this)
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
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			swiperchange(e){
				this.activetab = e.detail.current+1
			},
		},
	}
</script>

<style>
	@import url("../../style/shop.css");
	.more{
		text-align: center;
		height: 80upx;
		line-height: 80upx;
		color: #000000;
		font-size: 30upx;
	}
	.nodata{
		margin-top: 350upx;
		font-size: 30upx;
		color: #999;
		text-align: center;
	}
</style>
