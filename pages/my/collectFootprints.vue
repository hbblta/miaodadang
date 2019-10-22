<template>
	<view class="mySupply">
		<view v-if="tabactive==2" @click="clearZuJi" class="supplyRad">清除</view>
		<view class="tabs">
			<view class="tabs-item" @tap="tabactive = 1" :class="tabactive==1?'active':''">
				收藏
				<view v-if="tabactive==1"></view>
			</view>
			<view class="tabs-item" @tap="tabactive = 2" :class="tabactive==2?'active':''">
				足迹
				<view v-if="tabactive==2"></view>
			</view>
			
		</view>

		<view class="swipers">
			<swiper class="swiper" :current='tabactive-1' @change='swiperchange'>
				<swiper-item>
					<view v-if="!inRelease.arrs.length && inRelease.times" class="nodata">
						没有任何数据哦～
					</view>
					<scroll-view lower-threshold='80' v-if="inRelease.arrs.length"   @scrolltolower='loadRelease' scroll-y style='height:100%;'  class="mainCenter">
						
						<view  @click="todetails(item.supply.id,item.supply.details)" v-for="(item,index) in inRelease.arrs" :key='index' class="scrollItem">
							<view class="mainItem">
								<view class="mainItemLeft">
									<image :src="item.supply.photos[0]" mode="aspectFill"></image>
								</view>
								<view class="mainItemRight">
									<view class="right-Item1">
										<view style="font-size:30upx;color: #363636;font-weight: bold;">{{item.supply.details.name}}</view>
										<view style="font-size: 21upx;color: #909090;">{{item.supply.time}}</view>
									</view>
									<view class="right-Item2">
										<view class="tit overs">{{item.supply.price.toFixed(2)}}元/{{item.supply.details.unit}}</view>
										<view  class="icon-grounp">
											<view  v-if="item.supply.agencies.length" style=";background:#1dae2d;">
												服
											</view>
											<view v-if="item.supply.rank == 7"  style="background:#b9227f;">
												冠
											</view>
											<view v-if="item.supply.rank == 6"  style="background:#2b6cd0;">
												钻
											</view>
											<view v-if="item.supply.rank == 5"  style="background:#ffa523;">
												金
											</view>
											<view v-if="item.supply.isMember" style="background:#ed7f40;">
												诚
											</view>
											<view  v-if="item.supply.hasBusinessLicense" style="background:#38d3cb;">
												企
											</view>
											<view v-if="item.supply.hasIdCard" style="background:#019fa2;">
												实
											</view>
										
										</view>
									</view>
									<view style="width: 427upx;font-size:28upx;color: #5d5d5d;" class="right-Item3 overs">
										{{item.supply.specificationsStr}}
									</view>
									<view class="right-Item4">
										<view class="overs">
											{{item.supply.city}}
										</view>
										<view v-if="item.loc" class="overs">
											<span class='iconfont icon-weizhi1'></span>
											{{item.supply.loc}}
										</view>
									</view>
								</view>
							</view>
						</view>
						
						<view class="more">{{inRelease.loadingText}}</view>
						<view class="pad"></view>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<view v-if="!Undercarriage.arrs.length && Undercarriage.times"  class="nodata">
						没有任何数据哦～
					</view>
					<scroll-view lower-threshold='80' v-if="Undercarriage.arrs.length"  @scrolltolower='loadUndercarriage' scroll-y style='height:100%;' class="mainCenter">
						
						<view  @click="todetails(item.supply.id,item.supply.details)" v-for="(item,index) in Undercarriage.arrs" :key='index' class="scrollItem">
							<view class="mainItem">
								<view class="mainItemLeft">
									<image :src="item.supply.photos[0]" mode="aspectFill"></image>
								</view>
								<view class="mainItemRight">
									<view class="right-Item1">
										<view style="font-size:30upx;color: #363636;font-weight: bold;">{{item.supply.details.name}}</view>
										<view style="font-size: 21upx;color: #909090;">{{item.supply.time}}</view>
									</view>
									<view class="right-Item2">
										<view class="tit overs">{{item.supply.price.toFixed(2)}}元/{{item.supply.details.unit}}</view>
										<view  class="icon-grounp">
											<view  v-if="item.supply.agencies.length" style=";background:#1dae2d;">
												服
											</view>
											<view v-if="item.supply.rank == 7"  style="background:#b9227f;">
												冠
											</view>
											<view v-if="item.supply.rank == 6"  style="background:#2b6cd0;">
												钻
											</view>
											<view v-if="item.supply.rank == 5"  style="background:#ffa523;">
												金
											</view>
											<view v-if="item.supply.isMember" style="background:#ed7f40;">
												诚
											</view>
											<view  v-if="item.supply.hasBusinessLicense" style="background:#38d3cb;">
												企
											</view>
											<view v-if="item.supply.hasIdCard" style="background:#019fa2;">
												实
											</view>
										
										</view>
									</view>
									<view style="width: 427upx;font-size:28upx;color: #5d5d5d;" class="right-Item3 overs">
										{{item.supply.specificationsStr}}
									</view>
									<view class="right-Item4">
										<view class="overs">
											{{item.supply.city}}
										</view>
										<view v-if="item.supply.loc" class="overs">
											<span class='iconfont icon-weizhi1'></span>
											{{item.supply.loc}}
										</view>
									</view>
								</view>
							</view>
						</view>
						<view class="pad"></view>
					</scroll-view>
				</swiper-item>
				
			</swiper>
		</view>
	
		
	</view>
</template>

<script>

	import getTime from '../../common/getTime.js'
	import {areas} from '../../common/areas.js'
	import getpostion from '../../common/getpostion.js'
	export default {
		
		onLoad(e){
			this.tabactive = e.id
			
			
			
			
		},
		onReady(){
			this.loadRelease()
			this.loadUndercarriage()
		},
		data() {
			return {
			
				location: {
					latitude: '',
					longitude: ''
				},

				inRelease:{
					arrs:[],
					Total:0,
					start:0,
					length:6,
					loadingText:'已全部加载完毕',
					times:0,
					loading:false
				},
				Undercarriage:{
					arrs:[],
					Total:0,
					start:0,
					length:6,
					loadingText:'已全部加载完毕',
					times:0,
					loading:false
				},
				tabactive: 1
			}
		},
		methods:{
			clearZuJi(){
				console.log(111)
				uni.showModal({
				    title: '提示',
					content:'是否清除所有足迹',
				    cancelText:'否',
					confirmText:'是',
				    success:(res)=> {
				        if (res.confirm) {
				           this.$myhttp.post(this.websiteUrl+'/my/supplies/tracks/clear','',()=>{
				           	this.Undercarriage={
				           		arrs:[],
				           		Total:0,
				           		start:0,
				           		length:6,
				           		loadingText:'已全部加载完毕',
				           		times:0,
				           		loading:false
				           	}
				           	this.loadUndercarriage()
				           	uni.showToast({
				           		title:'清除成功'
				           	})
				           })
				        }
				    }
				});
				
			},
			todetails(id,info){
				uni.navigateTo({
					url:'../detailSupply/detailSupply?id='+id+'&info='+JSON.stringify(info)
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
			
			
			loadUndercarriage(){
				if(this.Undercarriage.loading){
					return
				}
				this.Undercarriage.loading = true
				if(this.Undercarriage.Total !== 0){
					if(this.Undercarriage.Total == this.Undercarriage.arrs.length){
						this.Undercarriage.loadingText = '已全部加载完毕'
						return
					}
				}
				this.Undercarriage.loadingText = '上拉加载更多'
				this.$myhttp.get(this.websiteUrl+'/my/supplies/tracks?start='+this.Undercarriage.start+'&length='+this.Undercarriage.length+'&onsale=false','',(res)=>{
					console.log(res)
					var res =res.data.data
					this.Undercarriage.Total =res.totalCount
					if(res.items.length){
						var info = res.items
						info.forEach((item) => {
							item.supply.details =this.$store.state.categories[item.supply.categoryId]
							item.supply.loc = this.getlocation(item.supply.location.lat, item.supply.location.lon)
							item.supply.time = this.times(item.supply.refreshTime)
							var city = getpostion(item.supply.areaId)
							item.supply.city  = city.replace(/-/g,"")
							var specifications = JSON.parse(item.supply.specifications)
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
							item.supply.specificationsStr = str
						})
						this.Undercarriage.start+=this.Undercarriage.length
						this.Undercarriage.arrs = this.Undercarriage.arrs.concat(info)
						if(this.Undercarriage.Total !== 0){
							if(this.Undercarriage.Total == this.Undercarriage.arrs.length){
								this.Undercarriage.loadingText = '已全部加载完毕'
								return
							}
						}
					}else{
						this.Undercarriage.loadingText = '已全部加载完毕'
					}
					this.Undercarriage.times++
					this.Undercarriage.loading = false
				},this)
			},
			loadRelease(){
				if(this.inRelease.loading){
					return
				}
				this.inRelease.loading = true
				if(this.inRelease.Total !== 0){
					if(this.inRelease.Total == this.inRelease.arrs.length){
						this.inRelease.loadingText = '已全部加载完毕'
						return
					}
				}
				this.inRelease.loadingText = '上拉加载更多'
				this.$myhttp.get(this.websiteUrl+'/my/supplies/marks?start='+this.inRelease.start+'&length='+this.inRelease.length+'&onsale=true','',(res)=>{
						
					var res =res.data.data
				
					this.inRelease.Total =res.totalCount
					if(res.items.length){
						
						var info = res.items
						info.forEach((item) => {
							
							item.supply.details = this.$store.state.categories[item.supply.categoryId]
							item.supply.loc = this.getlocation(item.supply.location.lat, item.supply.location.lon)
							item.supply.time = this.times(item.supply.refreshTime)
							var city = getpostion(item.supply.areaId)
							item.supply.city  = city.replace(/-/g,"")
							var specifications = JSON.parse(item.supply.specifications)
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
							item.supply.specificationsStr = str
						})
						this.inRelease.start+=this.inRelease.length
						this.inRelease.arrs = this.inRelease.arrs.concat(info)
						console.log(this.inRelease.arrs)
						if(this.inRelease.Total !== 0){
							if(this.inRelease.Total == this.inRelease.arrs.length){
								this.inRelease.loadingText = '已全部加载完毕'
								return
							}
						}
						console.log(this.inRelease.arrs)
					}else{
						this.inRelease.loadingText = '已全部加载完毕'
					}
					this.inRelease.times++
					this.inRelease.loading = false
				},this)
			},
			swiperchange(e){
				this.tabactive = e.detail.current+1
			}
		},
		onPullDownRefresh(){
			if(this.tabactive == 1){
				this.inRelease={
					arrs:[],
					Total:0,
					start:0,
					length:6,
					loadingText:'已全部加载完毕',
					times:0,
					loading:false
				}
				this.loadRelease()
			}else{
				this.Undercarriage={
					arrs:[],
					Total:0,
					start:0,
					length:6,
					loadingText:'已全部加载完毕',
					times:0,
					loading:false
				}
				this.loadUndercarriage()
			}
			uni.stopPullDownRefresh()
		}
	}
</script>

<style>
	.supplyRad{
		position: fixed;
		width: 138upx;
		height: 138upx;
		z-index: 100;
		right: 52upx;
		bottom: 55upx;
		background: #34ad9e;
		color: #fff;
		font-size: 35upx;
		border-radius:50%;
		line-height: 138upx;
		text-align: center;
	}
	page {
		background: #f6f6f6;
	}
	.mySupply{
		position: relative;
	}
	.tabs {
		border-top:2upx solid #f6f6f6;
		display: flex;
		justify-content: space-between;
		height: 73upx;
		line-height: 73upx;
		font-size: 26upx;
		color: #999;
		text-align: center;
		background: #fff;
		position: fixed;
		top: 0upx;
		left: 0;
		z-index:300;
		width: 100%;
	}

	.tabs-item {
		width: 50%;
		position: relative;
	}

	.tabs-item.active {
		color: #333;
	}

	.tabs-item view {
		position: absolute;
		left: 50%;
		bottom: 0;
		width: 48upx;
		height: 5upx;
		background: #16c4af;
		transform: translateX(-50%);
	}
	.swiper{
		margin-top: 75upx;
		height:100vh;
	}
	.swiper .mainCenter{
		height: 100%;
	}
	.msg{
		height: 84upx;
		line-height: 84upx;
		color: #c8c8c8;
		font-size: 23upx;
		text-align: center;
	}
	
	
	
	
	
	.pad{
		height: 160upx;
	}
	.more{
		height: 80upx;
		font-size: 30upx;
		line-height: 80upx;
		text-align: center;
		color: #999;
	}
	.nodata{
		margin-top: 350upx;
		font-size: 30upx;
		color: #999;
		text-align: center;
	}
	
	
	
	
	.scrollItem {
		height: 260upx;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.mainItem {
		width: 684upx;
		height: 202upx;
		display: flex;
		justify-content: space-between;
	}
	
	.mainItemLeft {
		width: 202upx;
		height: 202upx;
	}
	
	.mainItemLeft image {
		width: 100%;
		height: 100%;
	}
	
	.mainItemRight {
		width: 462upx;
	}
	
	.right-Item1 {
		display: flex;
		width: 100%;
		justify-content: space-between;
	}
	
	.right-Item2 {
		display: flex;
		width: 100%;
		height: 80upx;
	}
	
	.right-Item2 .tit {
		color: #f97c0e;
		font-size: 30upx;
		line-height: 80upx;
		width: 211upx;
	}
	
	.icon-grounp {
		display: flex;
		margin-top: 27upx;
	}
	
	.icon-grounp>view {
		text-align: center;
		width: 26upx;
		height: 26upx;
		color: #fff;
		font-size: 20upx;
		border-radius: 5upx;
		line-height: 26upx;
		margin-right: 9upx;
		margin-top: 5upx;
	}
	
	.right-Item4 {
		display: flex;
		line-height: 60upx;
	}
	
	.right-Item4 view:nth-of-type(1) {
		width: 290upx;
		color: #c5c5c5;
		font-size: 25upx;
		margin-right: 10upx;
	
	}
	
	.right-Item4 view:nth-of-type(2) {
		width: 169upx;
		color: #999;
		font-size: 25upx;
	
	}
	
	.right-Item4 view:nth-of-type(2) span {
		font-size: 30upx;
	}
	
</style>

