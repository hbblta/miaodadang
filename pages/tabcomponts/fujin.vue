<template>
	<view>
		<view class="header">
			<view @tap="tabactive = 1" :class="tabactive==1?'active':''" class="item">附近供应 <i v-if="tabactive==1"></i></view>
			<view @tap="tabactive = 2" :class="tabactive==2?'active':''" class="item">附近求购 <i v-if="tabactive==2"></i></view>
			<view @tap="tabactive = 3" :class="tabactive==3?'active':''" class="item">附近动态 <i v-if="tabactive==3"></i></view>
			<view @tap="tabactive = 4" :class="tabactive==4?'active':''" class="item">附近苗友 <i v-if="tabactive==4"></i></view>
		</view>
		<view class="swipers" >
			
				<view  class="swiper"  v-show='tabactive==1'>
					<you-scroll @onPullDown="onSuppliesDown"   @onLoadMore="onsuppliesData('')">
						<view>
							<view class="searchList">
								<view @click="tosearchsupplies" class="mainSearch">
									<span class='iconfont icon-sousuo'></span>
								{{lists.name?'搜索附近"'+lists.name+'"结果':'搜索附近供应'}}	 
								</view>
							</view>
							<view v-if="!lists.arrs.length && lists.times" class="nodata">
								没有任何数据哦～
							</view>
							<view  class="main-list" v-if="lists.arrs.length">
								<view @click="todetails(item.id,item.details)" v-for="(item,index) in lists.arrs" :key='index' class="main-list-item">
									<view class="mainItem">
										<view class="mainItemLeft">
											<image mode="aspectFill" :src="item.photos[0]" ></image>
										</view>
										<view class="mainItemRight">
											<view class="right-Item1">
												<view style="font-size:30upx;color: #363636;font-weight: bold;">{{item.details.name}}</view>
												<view style="font-size: 21upx;color: #909090;">{{item.time}}</view>
											</view>
											<view class="right-Item2">
												<view class="tit overs">{{item.price.toFixed(2)}}元/{{item.details.unit}}</view>
												<view   class="icon-grounp">
													<view  v-if="item.agencies.length" style="margin-top:25upx;background:#1dae2d;">
														服
													</view>
													<view v-if="item.rank == 7"  style="margin-top:25upx;background:#b9227f;">
														冠
													</view>
													<view v-if="item.rank == 6"  style="margin-top:25upx;background:#2b6cd0;">
														钻
													</view>
													<view v-if="item.rank == 5"  style="margin-top:25upx;background:#ffa523;">
														金
													</view>
													<view v-if="item.isMember" style="margin-top:25upx;background:#ed7f40;">
														诚
													</view>
													<view  v-if="item.hasBusinessLicense" style="margin-top:25upx;background:#38d3cb;">
														企
													</view>
													<view v-if="item.hasIdCard" style="margin-top:25upx;background:#019fa2;">
														实
													</view>
												
												</view>
											</view>
											<view style="width: 427upx;font-size:28upx;color: #5d5d5d;" class="right-Item3 overs">
												{{item.specificationsStr}}
											</view>
											<view class="right-Item4">
												<view class="overs">
													{{item.city}}
												</view>
												<view v-if="item.loc" class="overs">
													<span class='iconfont icon-weizhi1'></span>
													{{item.loc}}
												</view>
											</view>
										</view>
									</view>
								</view>
								
								
								
								
							</view>
							<view class="more">{{lists.loadingText}}</view>
						</view>
						
					</you-scroll>
				
					
				</view>
				
					<view class="swiper"   v-show='tabactive==2'>
					<you-scroll @onPullDown="onWantDown"  @onLoadMore="onWantData('')">
						<view>
							<view class="searchList">
								<view @click="tosearchwantbuy" class="mainSearch">
									<span class='iconfont icon-sousuo'></span>
								{{wantList.name?'搜索附近"'+wantList.name+'"结果':'搜索附近求购'}}	 
								</view>
							</view>
							<view v-if="!wantList.arrs.length && wantList.times" class="nodata">
								没有任何数据哦～
							</view>
							<view  class="main-list" v-if="wantList.arrs.length" >
								
								<view  @click="towantdetails(item)" v-for="(item,index) in wantList.arrs" :key='index' class="scrollItem">
									<view class="baoMain">
										<view class="baoMainItem1">
											<view class="baoMainItem1Left">{{item.details.name}}</view>
											<view >{{item.time}}</view>
										</view>
										<view class="baoMainItem2">
											<view class="baoMainItem2Left">求购数量:  {{item.quantity?item.quantity:'若干'}} {{item.quantity?item.details.unit:''}}</view>
											<view class="baoMainItem2Right overs" v-if="item.loc" >
												<span style='font-size: 25upx;' class='iconfont icon-weizhi1'></span>
												{{item.loc}}
											</view>
										</view>
										<view  class="baoMainItem3 overs">
											求购规格: {{item.specificationsStr}}
										</view>
										<view  class="baoMainItem4 ">
											<view class="baoMainItem4Left overs">
												求购地区: {{item.city}}
											</view>
											<view class="baoMainItem4Right">
												<view class="num overs">
													<span v-if='item.quotations'>{{item.quotations}}条报价</span>
												</view>
												<view @click.stop="toOffer(item)" class="btn">
													去报价
												</view>
											</view>
										</view>
									</view>
								</view>
							</view>
							<view class="more">{{wantList.loadingText}}</view>
						</view>
					</you-scroll>
					
				
					</view>
			
				<view class="swiper"   v-show='tabactive==3'>
					<you-scroll  @onPullDown="onDynamicDown"  @onLoadMore="getDynamic('')">
						<view>
							<view v-if="!dynamic.arrs.length && dynamic.times" class="nodata">
								没有任何数据哦～
							</view>
							<view   v-if="dynamic.arrs.length" class="dynamic">
								
								<view v-for="(item,index) in dynamic.arrs" :key='index' class="outdynamicItem">
									<view class="dynamicItem">
										<view class="dynamicItemTop">
											<view @click="toshops(item.userId)" class="dynamicItemTopLeft">
												<image :src="item.avatarUrl" mode=""></image>
											</view>
											<view class="dynamicItemTopRight">
												<view class="dynamicItemTopRight1">
													<view @click="toshops(item.userId)" class="name">{{item.nickName}}</view>
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
					
				
					</view>
				
					<view class="swiper"  v-show='tabactive==4'>
						<you-scroll  @onPullDown="onNearShopDown"  @onLoadMore="getNearShop('')">
							<view>
								<view v-if="!nearShop.arrs.length && nearShop.times" class="nodata">
									没有任何数据哦～
								</view>
								<view v-if="nearShop.arrs.length"  class="nearbyShops">
									<view @click="toshops(item.userId)" v-for="item in nearShop.arrs" :key='item.id' class="nearbyShopsItem">
										<view class="naerMain">
											<view class="nearMainLeft">
												<image :src="item.avatarUrl" mode=""></image>
												<view class="leftInfo">
													<view class="leftInfoTop">
														<view class="name overs">{{item.nickName}}</view>
														<view  class="icon-grounp">
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
													<view class="leftInfoBottom overs">
														主营: <span v-if='!item.mainBusiness'>暂无主营</span> <span v-else>{{item.mainBusiness}}</span>
													</view>
												</view>
											
											</view>
											<view v-if="item.loc" class="nearMainRight">
												{{item.loc}}
											</view>
											
										</view>
									</view>
								</view>
								<view class="more">{{nearShop.loadingText}}</view>
							</view>
						</you-scroll>
					</view>
				
			
		</view>
		
	</view>
</template>

<script>
	import youScroll from '../components/you-scroll'
	import getTime from '../../common/getTime.js'
	import {areas} from '../../common/areas.js'
	import getpostion from '../../common/getpostion.js'
	export default{
		components:{
			youScroll
		},
		created(){
			uni.getSystemInfo({
			    success: (res)=> {
					this.heights = res.windowHeight
			     
			    }
			});
			
			
			for (var i = 0; i < areas.length; i++) {
				this.areas[areas[i].id] = areas[i]
			}	
		},
		mounted(){
			if(this.$store.state.token){
				this.getMyloctions(()=>{
					this.news()
				})
			}
			
			
			
		},
		data(){
			return{
				heights:'100vh',
				location: {
					latitude: '',
					longitude: ''
				},
	
				areas:{},
				tabactive:1,
				lists:{
					arrs:[],
					Total:0,
					start:0,
					length:6,
					loadingText:'已全部加载完毕',
					times:0,
					loading:false,
					categoryId:'',
					name:''
				},
				nearShop:{
					arrs:[],
					Total:0,
					start:0,
					length:10,
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
				wantList:{
					arrs: [],
					start: 0,
					length: 6,
					Total:0,
					loadingText: '已全部加载完毕',
					times:0,
					loading:false,
					categoryId:'',
					name:''
				}
			}
			
		},
		methods:{
			wantNearto(){
				this.tabactive=2
			},
			toOffer(item){
				uni.setStorage({
					key:'purOffer',
					data:JSON.stringify(item),
					success(){
						uni.navigateTo({
							url:'../wantBuy/offer'
						})
					}
				})
			},
			toshops(id){
				uni.navigateTo({
					url:'../shops/shop?id='+id
				})
			},
			onSuppliesDown(done) { // 下拉刷新
				this.lists={
					arrs:[],
					Total:0,
					start:0,
					length:6,
					loadingText:'已全部加载完毕',
					times:0,
					loading:false,
					categoryId:'',
					name:''
				}
				this.getMyloctions(()=>{
					this.onsuppliesData(()=>{
						done()
					})
				})
					
					
			},
			onWantDown(done){
				this.wantList={
					arrs: [],
					start: 0,
					length: 6,
					Total:0,
					loadingText: '已全部加载完毕',
					times:0,
					loading:false,
					categoryId:'',
					name:''
				}
				this.getMyloctions(()=>{
					this.onWantData(()=>{
							done()
					})
				})
				
			},
			onNearShopDown(done){
				this.nearShop={
					arrs:[],
					Total:0,
					start:0,
					length:10,
					loadingText:'已全部加载完毕',
					times:0,
					loading:false
				}
				this.getMyloctions(()=>{
					
					this.getNearShop(()=>{
						done()
					})
				})
			},
			onDynamicDown(done){
				this.dynamic={
					arrs:[],
					Total:0,
					start:0,
					length:6,
					loadingText:'已全部加载完毕',
					times:0,
					loading:false
				}
				this.getMyloctions(()=>{
					this.getDynamic(()=>{
							done()
					})
				})
			
			},
			tosearchwantbuy(){
				uni.navigateTo({
					url:'../index/search?type=wantData'
				})
			},
			tosearchsupplies(){
				uni.navigateTo({
					url:'../index/search?type=suppliesData'
				})
			},
			
			getnewlist(type){
			
				this.lists={
					arrs:[],
					Total:0,
					start:0,
					length:6,
					loadingText:'已全部加载完毕',
					times:0,
					loading:false,
					categoryId:type.id,
					name:type.name
				}	
				this.onsuppliesData()
			},
			getnewwantbuy(type){
				this.wantList={
					arrs:[],
					Total:0,
					start:0,
					length:6,
					loadingText:'已全部加载完毕',
					times:0,
					loading:false,
					categoryId:type.id,
					name:type.name
				}	
				this.onWantData()
			},
			news(){
				this.lists={
					arrs:[],
					Total:0,
					start:0,
					length:6,
					loadingText:'已全部加载完毕',
					times:0,
					loading:false,
					categoryId:'',
					name:''
				},
				this.dynamic={
					arrs:[],
					Total:0,
					start:0,
					length:6,
					loadingText:'已全部加载完毕',
					times:0,
					loading:false
				},
				this.wantList={
					arrs: [],
					start: 0,
					length: 6,
					Total:0,
					loadingText: '已全部加载完毕',
					times:0,
					loading:false,
					categoryId:'',
					name:''
				}
				this.nearShop={
					arrs:[],
					Total:0,
					start:0,
					length:10,
					loadingText:'已全部加载完毕',
					times:0,
					loading:false
				}
				this.onsuppliesData('')
				this.onWantData('')
				this.getDynamic('')
				this.getNearShop('')
			},
			showdynamicImg(item,index){
					uni.previewImage({
							current:index,
				            urls: item
				        });
			},
		
			towantdetails(item){
				uni.navigateTo({
					url: '../purchaseDetails/purchaseDetails?id='+item.id+'&userId='+item.userId
				});
			},
			swiperchange(e){
				this.tabactive = e.detail.current+1
			},
			getNearShop(fn){
				if(this.nearShop.loading){
						fn && fn()
					return
				}
							
				this.nearShop.loading = true
				if (this.nearShop.Total !== 0) {
					if (this.nearShop.Total == this.nearShop.arrs.length) {
						this.nearShop.loadingText = '已全部加载完毕'
						fn && fn()
						return
					}
				}
				this.nearShop.loadingText = '上拉加载更多'
				
				this.$myhttp.get(this.websiteUrl + '/shops?start=' + this.nearShop.start + '&length=' + this.nearShop.length+'&sort=distance&lat='+this.location.latitude+'&lon='+this.location.longitude, '', (res) => {
			
						var res = res.data.data
						
						this.nearShop.Total =res.totalCount
						if (res.items.length) {
							var info = res.items
							info.forEach((item) => {
								if(item.location){
									item.loc = this.getDynamiclocation(item.location.lat,item.location.lon)
								}else{
									item.loc = ''
								}
								
								
							})
							this.nearShop.start += res.items.length
							this.nearShop.arrs = this.nearShop.arrs.concat(info)
							if (this.nearShop.Total !== 0) {
								if (this.nearShop.Total == this.nearShop.arrs.length) {
									this.nearShop.loadingText = '已全部加载完毕'
									fn && fn()
									return
								}
							}
							
							
						
						} else {
							this.nearShop.loadingText = '已全部加载完毕'
							
							
						}
						this.nearShop.times++
						this.nearShop.loading = false
					
						fn && fn()
					},this)
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
				this.$myhttp.get(this.websiteUrl + '/news?start=' + this.dynamic.start + '&length=' + this.dynamic.length+'&sort=distance&lat='+this.location.latitude+'&lon='+this.location.longitude, '', (res) => {
			
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
						this.dynamic.times++
						this.dynamic.loading = false
					
						fn && fn()
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
					'&areaId=&categoryId='+this.lists.categoryId+'&specifications=&sort=distance&lat='+this.location.latitude +'&lon='+this.location.longitude, '', (res) => {
						
						var res = res.data.data
						this.lists.Total =res.totalCount
						if (res.items.length) {
							var info = res.items
							info.forEach((item) => {
								item.details = this.$store.state.categories[item.categoryId]
								item.loc = this.getlocation(item.location.lat, item.location.lon)
								item.time = this.times(item.refreshTime)
								
								var city = getpostion(item.areaId)
								item.city  = city.replace(/-/g,"")
								var specifications = JSON.parse(item.specifications)
								var len = specifications.length
								var str = ''
								for (let i = 0; i < len; i++) {
									var value = ''
									var unit = ''
									if (specifications[i].value instanceof Array) {
										if(specifications[i].value[0] == specifications[i].value[1]){
											value = specifications[i].value[0]
										}else{
											value = specifications[i].value[0]+value +'-'+ specifications[i].value[1]
										}
									} else {
										value = specifications[i].value
									}
									if (specifications[i].unit) {
										unit = specifications[i].unit
									}
									str += specifications[i].name + ': ' + value + unit + ";"
								}
								item.specificationsStr = str
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
						
						this.lists.times++
						this.lists.loading = false
						fn && fn()
					})
			},
			onWantData(fn) {
				if(this.wantList.loading){
					fn && fn()
					return
				}
				this.wantList.loading = true
				if (this.wantList.Total !== 0) {
					if (this.wantList.Total == this.wantList.arrs.length) {
						this.wantList.loadingText = '已全部加载完毕'
						fn && fn()
						return
					}
				}
				this.wantList.loadingText = '上拉加载更多'
				this.$http.get(this.websiteUrl + '/purchases/search?start=' + this.wantList.start + '&length=' + this.wantList.length +
					'&areaId=&categoryId='+this.wantList.categoryId+'&specifications=&sort=distance&lat='+this.location.latitude +'&lon='+this.location.longitude, '', (res) => {
						
						var res = res.data.data
						this.wantList.Total =res.totalCount
						if (res.items.length) {
							var info = res.items
						
							info.forEach((item) => {
								item.details = this.$store.state.categories[item.categoryId]
								item.loc = this.getlocation(item.location.lat, item.location.lon)
								item.time = this.times(item.createTime)
								if(item.acceptedAreas[0]){
									var city = getpostion(item.acceptedAreas[0])
									item.city  = city.replace(/-/g,"")
								}else{
									 item.city  = '全国'
								}
								
								
								
								
								var specifications = JSON.parse(item.specifications)
								var len = specifications.length
								var str = ''
								for (let i = 0; i < len; i++) {
									var value = ''
									var unit = ''
									if (specifications[i].value instanceof Array) {
										if(specifications[i].value[0] == specifications[i].value[1]){
											value = specifications[i].value[0]
										}else{
											value = specifications[i].value[0]+value +'-'+ specifications[i].value[1]
										}
									} else {
										value = specifications[i].value
									}
									if (specifications[i].unit) {
										unit = specifications[i].unit
									}
									str += specifications[i].name + ': ' + value + unit + ";"
								}
								item.specificationsStr = str
							})
							this.wantList.start += res.items.length
							this.wantList.arrs = this.wantList.arrs.concat(info)
						
							if (this.wantList.Total !== 0) {
								if (this.wantList.Total == this.wantList.arrs.length) {
									this.wantList.loadingText = '已全部加载完毕'
									fn && fn()
									return
								}
							}
							
						
						} else {
							this.wantList.loadingText = '已全部加载完毕'
							
						}
						this.wantList.times++
						this.wantList.loading = false
						fn && fn()
					
						
					})
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
			getMyloctions(callback) {
				uni.getLocation({
					type:'gcj02',
					success: res => {
						this.location = {
							longitude: res.longitude,
							latitude: res.latitude
						}
						callback && callback()
					},
					fail:()=>{
						callback && callback()
					}
				});
			},
			getlocation(latitude, longitude) {
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
				return (s / 1000).toFixed(2) + '公里'
			},
			todetails(id,info){
				var infos = JSON.stringify(info)
				uni.navigateTo({
					url:'../detailSupply/detailSupply?id='+id+'&info='+infos
				})
			},
		}
	}
</script>

<style>
	@import url("../../style/fujin.css");
	.scrollItem {
		height: 284upx;
		width: 100%;
		border-bottom: 2upx solid #f5f5f5;
	}
	
	.baoMain{
		width: 674upx;
		margin: 22upx auto 0;
		font-size: 24upx;
		color: #7d7d7d;
		line-height: 54upx;
		font-weight: bold;
	}
	.baoMain>view{
		display: flex;
		justify-content: space-between;
		height: 54upx;
	}
	.baoMainItem1{
		font-size: 22upx;
	}
	.baoMainItem1 .baoMainItem1Left{
		font-size: 27upx;
		color: #333;
		font-weight: bold;
	}
	.baoMain .baoMainItem3 {
		width:674upx;
		display: block;
	}
	
	.baoMainItem4Left{
		width: 400upx;
	}
	.baoMainItem4Right{
		width: 274upx;
		display: flex;
		justify-content: space-between;
	}
	.baoMainItem4Right .num{
		width: 113upx;
		color: #343534;
	}
	.baoMainItem4Right .btn{
		width: 127upx;
		height: 54upx;
		color: #3fc7af;
		border: 1upx solid #3fc7af;
		text-align: center;
		line-height: 49upx;
		border-radius:7upx ;
		font-size: 29upx;
	}
</style>
