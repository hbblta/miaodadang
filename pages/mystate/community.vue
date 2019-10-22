<template>
	<view>
		<view class="header">
			<view class="tab"> 
				<view @click="tabs=1" :class="tabs==1?'active':''" class="tab-item">
					关注
					<i></i>
				</view>
				<view @click="tabs=2" :class="tabs==2?'active':''" class="tab-item">
					推荐
					<i></i>
				</view>
				<view @click="tabs=3"  :class="tabs==3?'active':''" class="tab-item">
					附近
					<i></i>
				</view>
			</view>
		</view>
		<view class="main">
			<view v-show="tabs == 1"  class="scrolls">
			<you-scroll style="height: 100%;"  @onPullDown="onPullGuanZhu"  @onLoadMore="getGuanZhu('')">			
				<view v-if="!followDynamic.arrs.length && followDynamic.times" class="nodata">
					没有任何数据哦～
				</view>
				<view v-if="followDynamic.arrs.length" class="dynamic">
					
					<view v-for="(item,index) in followDynamic.arrs" :key='index' class="outdynamicItem">
						<view class="dynamicItem">
						
							<view class="dynamicItemTop">
									
								<view @click="toshops(item.userId)" class="dynamicItemTopLeft">
									<image :src="item.avatarUrl" mode=""></image>
								</view>
								<view class="dynamicItemTopRight">
									<view class="dynamicItemTopRight1">
										<view class="name">{{item.nickName}}</view>
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
					<view class="more">{{followDynamic.loadingText}}</view>
				</view>
			</you-scroll>
			</view>
			<view v-show="tabs == 2"  class="scrolls">
			<you-scroll style="height: 100%;"  @onPullDown="onPullDynamic"  @onLoadMore="getDynamic('')">	
			
				<view v-if="!dynamic.arrs.length && dynamic.times" class="nodata">
					没有任何数据哦～
				</view>
				<view v-if="dynamic.arrs.length" class="dynamic">
					
					<view  v-for="(item,index) in dynamic.arrs" :key='index' class="outdynamicItem">
						<view    class="dynamicItem">
						
							<view class="dynamicItemTop">
									
								<view @tap="toshops(item.userId)" class="dynamicItemTopLeft">
									<image @tap="toshops(item.userId)" :src="item.avatarUrl" mode=""></image>
								</view>
								<view  class="dynamicItemTopRight">
									<view class="dynamicItemTopRight1">
										<view class="name">{{item.nickName}}</view>
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
					<view class="more">{{dynamic.loadingText}}</view>
				</view>
			</you-scroll>
			</view>
			<view v-show="tabs == 3"  class="scrolls">
			<you-scroll style="height: 100%;"  @onPullDown="onPullNearLoc"  @onLoadMore="getNearLoc('')">	
			
				<view v-if="!nearDynamic.arrs.length && nearDynamic.times" class="nodata">
					没有任何数据哦～
				</view>
				<view v-if="nearDynamic.arrs.length" class="dynamic">
					
					<view v-for="(item,index) in nearDynamic.arrs" :key='index' class="outdynamicItem">
						<view class="dynamicItem">
						
							<view class="dynamicItemTop">
									
								<view @click="toshops(item.userId)" class="dynamicItemTopLeft">
									<image :src="item.avatarUrl" mode=""></image>
								</view>
								<view class="dynamicItemTopRight">
									<view class="dynamicItemTopRight1">
										<view class="name">{{item.nickName}}</view>
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
					<view class="more">{{nearDynamic.loadingText}}</view>
				</view>
			</you-scroll>
			</view>
		</view>
	</view>
</template>

<script>
	import youScroll from '../components/you-scroll'
	import getTime from '../../common/getTime.js'
	import getpostion from '../../common/getpostion.js'
	export default{
		components:{
			youScroll
		},
		created(){
			this.getMyloctions()
		},
		data(){
			return{
				location: {
					latitude: '',
					longitude: ''
				},
				tabs:2,
				dynamic:{
					arrs:[],
					Total:0,
					start:0,
					length:6,
					loadingText:'已全部加载完毕',
					times:0,
					loading:false
				},
				followDynamic:{
					arrs:[],
					Total:0,
					start:0,
					length:6,
					loadingText:'已全部加载完毕',
					times:0,
					loading:false
				},
				nearDynamic:{
					arrs:[],
					Total:0,
					start:0,
					length:6,
					loadingText:'已全部加载完毕',
					times:0,
					loading:false
				}
			}
		},
		
		onPullDownRefresh(){
			this.dynamic={
				arrs:[],
				Total:0,
				start:0,
				length:6,
				loadingText:'已全部加载完毕',
				times:0,
				loading:false
			},
			this.nearDynamic={
				arrs:[],
				Total:0,
				start:0,
				length:6,
				loadingText:'已全部加载完毕',
				times:0,
				loading:false
			}
			this.getMyloctions()
			setTimeout(()=>{
				uni.stopPullDownRefresh()
			},400)
		},
		methods:{
			onPullGuanZhu(done){
				this.followDynamic={
					arrs:[],
					Total:0,
					start:0,
					length:6,
					loadingText:'已全部加载完毕',
					times:0,
					loading:false
				}
				this.getGuanZhu()
				setTimeout(()=>{
					done()
				},400)
			},
			onPullDynamic(done){
				this.dynamic={
					arrs:[],
					Total:0,
					start:0,
					length:6,
					loadingText:'已全部加载完毕',
					times:0,
					loading:false
				}
				this.getDynamic()
				setTimeout(()=>{
					done()
				},400)
			},
			onPullNearLoc(done){
				this.nearDynamic={
					arrs:[],
					Total:0,
					start:0,
					length:6,
					loadingText:'已全部加载完毕',
					times:0,
					loading:false
				}
				this.getNearLoc()
				setTimeout(()=>{
					done()
				},400)
			},
			showdynamicImg(item,index){
					uni.previewImage({
							current:index+'',
				            urls: item,
							loop:true
				    });
			},
			toshops(id){
				
				uni.navigateTo({
					url:'../shops/shop?id='+id
				})
			},
				getMyloctions(){
					uni.getLocation({
						type:'gcj02',
						success: res => {
							this.location = {
								longitude: res.longitude,
								latitude: res.latitude
							}
							this.getNearLoc()
							this.getDynamic()
							this.getGuanZhu()
						}
					})
				},
				getGuanZhu(){
								if(this.followDynamic.loading){
									return
								}
								this.followDynamic.loading = true
								if (this.followDynamic.Total !== 0) {
									if (this.followDynamic.Total == this.followDynamic.arrs.length) {
										this.followDynamic.loadingText = '已全部加载完毕'
										return
									}
								}
								this.followDynamic.loadingText = '上拉加载更多'
								this.$myhttp.get(this.websiteUrl + '/news?start=' + this.followDynamic.start + '&length=' + this.followDynamic.length+'&sort=time&followed=true', '', (res) => {
										console.log(res)
										var res = res.data.data
										this.followDynamic.Total =res.totalCount
										if (res.items.length) {
											var info = res.items
											info.forEach((item) => {
												item.loc = this.getDynamiclocation(item.location.lat, item.location.lon)
												item.time = this.times(item.createTime)
												var city = getpostion(item.areaId)
												item.city  = city.replace(/-/g,"")	
												
				
											})
											this.followDynamic.start += res.items.length
									
									
												this.followDynamic.arrs = this.followDynamic.arrs.concat(info)
										
											if (this.followDynamic.Total !== 0) {
												if (this.followDynamic.Total == this.followDynamic.arrs.length) {
													this.followDynamic.loadingText = '已全部加载完毕'
													return
												}
											}
											
										} else {
											this.followDynamic.loadingText = '已全部加载完毕'
										}
										this.followDynamic.times++
										this.followDynamic.loading = false
									},this)
							},
				getDynamic(){
								if(this.dynamic.loading){
									return
								}
								this.dynamic.loading = true
								if (this.dynamic.Total !== 0) {
									if (this.dynamic.Total == this.dynamic.arrs.length) {
										this.dynamic.loadingText = '已全部加载完毕'
										return
									}
								}
								this.dynamic.loadingText = '上拉加载更多'
								this.$myhttp.get(this.websiteUrl + '/news?start=' + this.dynamic.start + '&length=' + this.dynamic.length+'&sort=time', '', (res) => {
										console.log(res)
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
													return
												}
											}
											
										} else {
											this.dynamic.loadingText = '已全部加载完毕'
										}
										this.dynamic.times++
										this.dynamic.loading = false
									},this)
							},
			getNearLoc(){
							if(this.nearDynamic.loading){
								return
							}
							this.nearDynamic.loading = true
							if (this.nearDynamic.Total !== 0) {
								if (this.nearDynamic.Total == this.nearDynamic.arrs.length) {
									this.nearDynamic.loadingText = '已全部加载完毕'
									return
								}
							}
							this.nearDynamic.loadingText = '上拉加载更多'
							this.$myhttp.get(this.websiteUrl + '/news?start=' + this.nearDynamic.start + '&length=' + this.nearDynamic.length+'&sort=distance&lat='+this.location.latitude+'&lon='+this.location.longitude, '', (res) => {
									var res = res.data.data
									this.nearDynamic.Total =res.totalCount
									if (res.items.length) {
										var info = res.items
										info.forEach((item) => {
											item.loc = this.getDynamiclocation(item.location.lat, item.location.lon)
											item.time = this.times(item.createTime)
											var city = getpostion(item.areaId)
											item.city  = city.replace(/-/g,"")	
											
			
										})
										this.nearDynamic.start += res.items.length
								
								
											this.nearDynamic.arrs = this.nearDynamic.arrs.concat(info)
									
										if (this.nearDynamic.Total !== 0) {
											if (this.nearDynamic.Total == this.nearDynamic.arrs.length) {
												this.nearDynamic.loadingText = '已全部加载完毕'
												return
											}
										}
										
									} else {
										this.nearDynamic.loadingText = '已全部加载完毕'
									}
									this.nearDynamic.times++
									this.nearDynamic.loading = false
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
		}
	}
</script>

<style>
	.header{
		width: 100%;
		height: 70upx;
		background: #fff;
		border-bottom:1upx solid #f6f6f6;
		border-top:1upx solid #f6f6f6;
		position: fixed;
		top: 0;
		z-index: 100;
	}
	.tab{
		display: flex;
		width: 465upx;
		margin: 0 auto;
		height: 70upx;
		line-height: 70upx;
	}
	.tab-item{
		width: 33.33%;
		color: #333;
		font-size: 29upx;
		text-align: center;
		position: relative;
	}
	.tab-item.active i{
		display: block;
		width: 48upx;
		height: 4upx;
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		background: #16c4af;
	}
	.main{
		margin-top: 72upx;
	}
	.more{
		text-align: center;
		height: 80upx;
		line-height: 80upx;
		color: #000000;
		font-size: 30upx;
	}
	.dynamicItem{
		width: 686upx;
		margin: 30upx auto 0;
	
	}
	.dynamicItem{
		position: relative;
	}
	.icon-lajitong{
		position: absolute;
		top: 10upx;
		right:0;
		color: #CF2D28;
		font-size: 45upx;
	}
	.outdynamicItem{
		width: 100%;
		padding-bottom: 15upx;
		border: 1upx solid #f6f6f6;
		position: relative;
	}
	.dynamicItemTop{
		display: flex;
		
	}
	.dynamicItemTopLeft image{
		width: 70upx;
		height: 70upx;
		margin-right: 20upx;
		border-radius:50%;
	}
	.dynamicItemTopRight{
		width: 586upx;
	}
	.dynamicItemTopRight1{
		display: flex;
		
	}
	.dynamicItemTopRight1 .name{
		color: #333;
		font-weight: bold;
	
		font-size: 27upx;
	}
	.dynamicItemTopRight2{
		font-size: 22upx;
		color: #adadad;
		line-height: 50upx;
	}
	
	.icon-grounp{
		margin-left: 26upx;
		display: flex;
		margin-top: 0!important;
	}
	.icon-grounp>view{
				 text-align: center;
				 width: 26upx;
				 height: 26upx;
				 color: #fff;
				 font-size: 20upx;
				 border-radius:5upx;
				 line-height: 26upx;
				 margin-right: 9upx;
				
		}
		.dynamicItemTopRight .texts{
			font-size: 30upx;
			line-height: 50upx;
			color: #000;
			font-weight: bold;
			word-wrap: break-word;
		}
			.dynamicItemTopRight .bot{
				text-align: right;
				color: #bfbfbf;
				font-size: 24upx;
				line-height: 60upx;
			}
	 .thumbnails {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		/* display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox; */
		/* -webkit-flex-wrap: wrap;
		-ms-flex-wrap: wrap; */
	}
	
	.thumbnails .thumbnail {
		width: 30%;
		height: 180upx;
		margin: 4upx;
		background: #757575;
		overflow: hidden;
	}
	
	.my-gallery{
		width: 250upx;
		height: 400upx;
		margin: 4upx;
		background: #757575;
		overflow: hidden
	}
	.gallery_img {
		width: 100%;
		height: 100%;
	}
	.scrolls{
		height:calc(100vh - 70upx);
	}
	.nodata{
		margin-top: 350upx;
		font-size: 30upx;
		color: #999;
		text-align: center;
	}
</style>
