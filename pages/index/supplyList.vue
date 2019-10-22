<template>
	<view @click="pageClick">
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
		
		
		<view @click="tosupply" class="supplyRad">发布</view>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" 
		 @onConfirm="onConfirm"></mpvue-city-picker>
		<view class="pad"></view>
		<view class="headers">
			<view class="header">
				<view @touchstart="back" class="back iconfont icon-fanhui"></view>
				<view @click="tosearch" class="search"><span class='iconfont icon-sousuo'></span>搜索供应</view>
				<view @click.stop="shareDetailsDis=true" class="share iconfont icon-share"></view>
			</view>
			<view class="screen">
				<view @click="showMulLinkageThreePicker" class="screen-item overs">
					{{city}}<span class='triangle'></span>
				</view>
				<view v-if="tags && tags == '容器苗'" class="screen-item overs">
					容器苗
					<span class='triangle'></span>
				</view>
				<view v-else-if="tags && !(tags=='容器苗')" class="screen-item overs">
					<picker @change="bindPickerChange" :value="listIndex" range-key="name" :range="pickerLists">
					    {{pickerLists[listIndex].name}}
					</picker><span class='triangle'></span>
				</view>
				<view v-else @click="tochoice" class="screen-item overs">
					{{liebie}}<span class='triangle'></span>
				</view>
				<view @click="tospecifications" class="screen-item overs">
					{{specifications?'已有值':'筛选'}}<span class='triangle'></span>
				</view>
				<view @click.stop="showSort" class="screen-item overs">
					排序<span class='triangle'></span>
				</view>
			</view>
			<view v-if='sortDis' class="sort">
				<view @click.stop="sortTab(1)" :class="sortactive==1?'active':''" class="sortItem">综合</view>
				<view @click.stop="sortTab(2)" :class="sortactive==2?'active':''" class="sortItem">时间</view>
				<view @click.stop="sortTab(3)" :class="sortactive==3?'active':''" class="sortItem">附近</view>
			</view>
		</view>
		<view v-if="!lists.arrs.length && lists.times" class="nodata">
			没有任何数据哦～
		</view>
		<view style="height:calc(100vh - 200upx );" v-if="lists.arrs.length" >
		<you-scroll @onPullDown='newsData' @onLoadMore="onloadData" class="scrolls"  >
			<view>
			<view  @click="todetails(item.id,item.details)" v-for="(item,index) in lists.arrs" :key='index' class="scrollItem">
				<view class="mainItem">
					<view class="mainItemLeft">
						<image :src="item.photos[0]" mode="aspectFill"></image>
					</view>
					<view class="mainItemRight">
						<view class="right-Item1">
							<view style="font-size:30upx;color: #363636;font-weight: bold;">{{item.details.name}}</view>
							<view style="font-size: 21upx;color: #909090;">{{item.time}}</view>
						</view>
						<view class="right-Item2">
							<view class="tit overs">{{item.price.toFixed(2)}}元/{{item.details.unit}}</view>
							<view  class="icon-grounp">
								<view  v-if="item.agencies.length" style=";background:#1dae2d;">
									服
								</view>
								<view v-if="item.rank == 7"  style="background:#b9227f;">
									冠
								</view>
								<view v-if="item.rank == 6"  style="background:#2b6cd0;">
									钻
								</view>
								<view v-if="item.rank == 5"  style="background:#ffa523;">
									金
								</view>
								<view v-if="item.isMember" style="background:#ed7f40;">
									诚
								</view>
								<view  v-if="item.hasBusinessLicense" style="background:#38d3cb;">
									企
								</view>
								<view v-if="item.hasIdCard" style="background:#019fa2;">
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
			<view class="mores">{{lists.loadingText}}</view>
		</you-scroll>
		</view>
		
		<pickerCity @choosecitys='citys' @watchs="disnone" :dis='dis'></pickerCity>
	</view>
</template>

<script>
	import mpvueCityPicker from '../components/pickallcity.vue'
	import getTime from '../../common/getTime.js'
	import {areas} from '../../common/areas.js'
	import getpostion from '../../common/getpostion.js'
	import youScroll from '../components/you-scroll'
	export default {
		components: {
			mpvueCityPicker,
			youScroll
		},
		onLoad(e) {
			if(e.return){
				this.returnIndex = true
			}
			if(e.tags){
				this.tags = e.tags
				if(!(e.tags == '容器苗')){
					
					var tag = encodeURIComponent(e.tags)
					this.$myhttp.get(this.websiteUrl+'/categories?tag='+tag,'',(res)=>{
						this.pickerLists=res.data.data
						this.pickerLists.unshift({
								"id": "",
								"name":this.tags,
								"tags": []
							})
					},this)
				}
				
			
			}
			
			
			for (var i = 0; i < areas.length; i++) {
				this.areas[areas[i].id] = areas[i]
			}
			if(e.id){
				this.categoryId = e.id
				this.liebie = e.name
			}
			this.getMyloctions()
			
		},
		onShow() {
			let pages = getCurrentPages();
			let currPage = pages[pages.length-1];	
			if(currPage.data.liebieChoice){
				this.categoryId = currPage.data.liebieChoice.obj.id
				this.liebie = currPage.data.liebieChoice.obj.name
				this.specifications = ''
				this.getnew()
				currPage.setData({
					liebieChoice:''
				})
			}else{
				if(currPage.data.specificationChoice){
					this.specifications = JSON.stringify(currPage.data.specificationChoice)
					console.log(this.specifications)
					this.getnew()
					currPage.setData({
						specificationChoice:''
					})
				}
				// this.specifications = ''
				// this.getnew()
			}
			
			// uni.getStorage({
			// 	key: 'liebie',
			// 	success: (e) => {
			// 		var obj = JSON.parse(e.data)
			// 		this.categoryId = obj.obj.id
			// 		this.liebie = obj.obj.name
			// 		if (obj.times == 1) {
			// 			this.specifications = ''
			// 			this.getnew()
			// 		} else {
			// 			uni.getStorage({
			// 				key: 'specifications',
			// 				success: (e) => {
			// 					var obj = JSON.parse(e.data)
			// 					this.specifications = obj.val
			// 					if(obj.times == 1){
			// 						this.getnew()
			// 						obj.times++
			// 						obj = JSON.stringify(obj)
			// 						uni.setStorage({
			// 							key: 'specifications',
			// 							data: obj
			// 						})
			// 					}
			// 				},
			// 				fail: () => {
			// 					this.specifications = ''
			// 				}
			// 			})
			// 		}
			// 		obj.times++
			// 		obj = JSON.stringify(obj)
			// 		uni.setStorage({
			// 			key: 'liebie',
			// 			data: obj
			// 		})


			// 	},
			// 	fail: () => {
			// 		this.onloadData()
			// 	}
			// })
		},

		data() {
			return {
				shareDetailsDis:false,
				returnIndex:false,
				construcor:'',
				pickerLists:[''],
				listIndex:0,
				tags:'',
				sorts:'time',
				themeColor: '#007AFF',
				location: {
					latitude: '',
					longitude: ''
				},
			
				liebie: '品类',
				areas: {},
				city: '地区',
				dis: false,
				areaId: '',
				categoryId: '',
				specifications: '',
				sortDis: false,
				sortactive: 2,
				lists: {
					arrs: [],
					start: 0,
					length: 6,
					Total:0,
					loadingText: '已全部加载完毕',
					times:0,
					loading:false
				}
			}
		},
		methods: {
			sharesweixin(type){
				uni.share({
				    provider: "weixin",
				    scene: type,
				    type: 0,
					title:'苗搭档:海量供应 -- 邀您查看',
					imageUrl:'https://img.hm8848.com/APP/152x152.png',
					href:'https://m.miaodadang.com/supplyList',
				    summary: `每日更新海量供应信息\r\n附近消息让交易更靠谱`,
				    success:  (res)=> {
						if(this.$store.state.token){
							this.$myhttp.post(this.websiteUrl+'/my/share','',(res)=>{
								
							},this)
						}
						this.shareDetailsDis = false
				    },
				    fail: function (err) {
				  //       console.log("fail:" + JSON.stringify(err));
						// this.shareDetailsDis = false
				    }
				});
			},
			bindPickerChange(e) {
			this.listIndex = e.target.value
			this.categoryId = this.pickerLists[this.listIndex].id
			this.specifications = ''
			this.getnew()
			},
			newsData(done){
				this.lists= {
					arrs: [],
					start: 0,
					length: 6,
					Total:0,
					loadingText: '已全部加载完毕',
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
						this.onloadData()
						setTimeout(()=>{
							done()
						},500)
					},
					fail:res =>{
						this.onloadData()
						setTimeout(()=>{
							done()
						},500)
					}
				});
				
			},
			tosearch(){
				uni.navigateTo({
					url:'search'
				})
			},
			tosupply(){
				uni.navigateTo({
					url:'../release/retrieval?type=supply'
				})
			},
			todetails(id,info){
				var infos = JSON.stringify(info)
				uni.navigateTo({
					url:'../detailSupply/detailSupply?id='+id+'&info='+infos
				})
			},
			getnew(){
				this.lists = {
					arrs: [],
					start: 0,
					length: 6,
					loadingText: '已全部加载完毕',
					Total:0,
					times:0,
					loading:false
				}
				this.onloadData()
			},
			getMyloctions() {
				uni.getLocation({
					type:'gcj02',
					success: res => {
						this.location = {
							longitude: res.longitude,
							latitude: res.latitude
						}
		
						this.getnew()
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
			onloadData(fn) {
				if(this.lists.loading){
			
					return
				}
				this.lists.loading = true
				if (this.lists.Total !== 0) {
					if (this.lists.Total == this.lists.arrs.length) {
						this.lists.loadingText = '已全部加载完毕'
			
						return
					}
				}
				this.lists.loadingText = '上拉加载更多'
				this.$http.get(this.websiteUrl + '/supplies/search?start=' + this.lists.start + '&length=' + this.lists.length + '&tags='+encodeURIComponent(this.tags)+
					'&areaId=' + this.areaId + '&categoryId=' + this.categoryId + '&specifications=' + this.specifications+'&sort='+this.sorts+'&lat='+this.location.latitude +'&lon='+this.location.longitude, '', (res) => {
						console.log(res)
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
							
									return
								}
							}
						} else {
							this.lists.loadingText = '已全部加载完毕'
						}
					
						this.lists.times++
						this.lists.loading = false
					})
			},
			tospecifications() {
				if((this.tags && (this.listIndex==0)) || this.tags=='容器苗'){
					console.log(111)
					var tag = encodeURIComponent(this.tags)
					this.$myhttp.get(this.websiteUrl + '/categories/attributes?tag='+tag, '', (res) => {
						console.log(res)
						var res = res.data.data
						uni.navigateTo({
							url: 'specifications?info=' + JSON.stringify(res)
						})
					},this)
					return
				}
			
				if (this.categoryId) {
					this.$myhttp.get(this.websiteUrl + '/categories/' + this.categoryId + '/attributes', '', (res) => {
						var res = res.data.data
						uni.navigateTo({
							url: 'specifications?info=' + JSON.stringify(res)
						})
					},this)
				} else {
					uni.showToast({
						icon: 'none',
						title: '请先选择品类'
					})
				}

			},
			tochoice() {
				uni.navigateTo({
					url: 'choice'
				})
			},
			showMulLinkageThreePicker() {
				this.$refs.mpvueCityPicker.show()
			},
			onConfirm(e) {
				if(e.cityCode){
					this.areaId = e.cityCode
					this.city = this.areas[e.cityCode].name
				}else{
					this.areaId = ''
					this.city = '全国'
				}
				
				this.getnew()
			},
		
			back() {
				if(this.returnIndex){
					uni.redirectTo({
						url:'../tabs/tabs'
					})
				}else{
					uni.navigateBack({
						delta: 1
					})
				}
				
			},
			sortTab(e) {
				this.sortactive = e
				if(e == 1){
					this.sorts = 'rank'
				}else if(e == 2){
					this.sorts = 'time'
				}else{
					this.sorts = 'distance'
				}
				this.lists = {
					arrs: [],
					start: 0,
					length: 6,
					loadingText: '已全部加载完毕',
					Total:0,
					times:0,
					loading:false
				}
				this.onloadData()
				this.sortDis = false
			},
			showSort() {
				this.sortDis = this.sortDis ? false : true
			},
			pageClick() {
				this.shareDetailsDis = false
				this.sortDis = false
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
	.pad {
		padding-top: var(--status-bar-height);
		height: 190upx;
		width: 100%;
	}

	.headers {
		position: fixed;
		width: 100%;
		z-index: 1000;
		top: 0;
		left: 0;
	}

	.header {
		height: 90upx;
		width: 100%;
		padding-top: var(--status-bar-height);
		background: #f8f8f8;
		line-height: 90upx;
		display: flex;
		justify-content: space-between;
		text-align: center;
	}

	.header .back {
		height: 100%;
		width: 75upx;
		color: #888888;
		font-size: 35upx;
	}

	.header .search {
		width: 562upx;
		height: 54upx;
		border: 1upx solid #ebebeb;
		color: #9f9f9f;
		background: #fff;
		border-radius: 28upx;
		line-height: 54upx;
		margin-top: 16upx;
		font-size: 25upx;
	}

	.header .search span {
		font-size: 25upx;
		margin-right: 10upx;
	}

	.header .share {
		width: 75upx;
		color: #333;
		font-size: 35upx;
	}

	.screen {
		height: 99upx;
		line-height: 99upx;
		display: flex;
		border-bottom: 1upx solid #f1f1f1;
		width: 100%;
		background: #fff;
	}

	.screen-item {
		width: 25%;
		text-align: center;
		font-size: 25upx;
		color: #333;
		overflow: hidden;
	}

	.screen-item .triangle {
		display: inline-block;
		border-top: #000000 solid 7upx;
		border-left: transparent solid 7upx;
		border-right: transparent solid 7upx;
		border-bottom: transparent solid 7upx;
		margin: 46upx 0 0 7upx;
	}

	.scrolls {}

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

	.sort {
		height: 240upx;
		position: absolute;
		bottom: -240upx;
		right: 0;
		width: 200upx;
		line-height: 80upx;
		text-align: center;
		background: #fff;
	}

	.sortItem {
		height: 79upx;
		font-size: 25upx;
		border-bottom: 1upx solid #AEAEAE;
	}

	.sortItem.active {
		color: #06BF04;
	}
	.mores{
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
