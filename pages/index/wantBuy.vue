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
		
		
		<view @click="tosupply"  class="supplyRad">发布</view>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" 
		 @onConfirm="onConfirm"></mpvue-city-picker>
		<view class="pad"></view>
		<view class="headers">
			<view class="header">
				<view @touchstart="back" class="back iconfont icon-fanhui"></view>
				<view @click="tosearch" class="search"><span class='iconfont icon-sousuo'></span>搜索求购</view>
				<view @click.stop="shareDetailsDis=true" class="share iconfont icon-share"></view>
			</view>
			<view class="screen">
				<view @click="showMulLinkageThreePicker" class="screen-item overs">
					{{city}}<span class='triangle'></span>
				</view>
				<view @click="tochoice" class="screen-item overs">
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
		<view v-if="lists.arrs.length" style="height:calc(100vh - 190upx );">
			
	
		<you-scroll @onPullDown='newsData' @onLoadMore="onloadData" class="scrolls"  >
		
			<view>
				<view  @click="todetails(item)" v-for="(item,index) in lists.arrs" :key='index' class="scrollItem">
					<view class="baoMain">
						<view class="baoMainItem1">
							<view style="font-size: 32upx;" class="baoMainItem1Left">{{item.details.name}}</view>
							<view >{{item.time}}</view>
						</view>
						<view class="baoMainItem2">
							<view class="baoMainItem2Left">求购数量: <span style='margin-left:5upx;font-size:33upx;color:#40aea5;'> {{item.quantity?item.quantity:'若干'}}{{item.quantity?item.details.unit:''}}</span></view>
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
			
		
			for (var i = 0; i < areas.length; i++) {
				this.areas[areas[i].id] = areas[i]
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
	// 		uni.getStorage({
	// 			key: 'liebie',
	// 			success: (e) => {
	// 				var obj = JSON.parse(e.data)
	// 				this.categoryId = obj.obj.id
	// 				this.liebie = obj.obj.name
	
	// 				if (obj.times == 1) {
	// 					this.specifications = ''
	// 					this.getnew()
	// 				} else {
	// 					uni.getStorage({
	// 						key: 'specifications',
	// 						success: (e) => {
	// 							var obj = JSON.parse(e.data)
	// 							this.specifications = obj.val
								
	// 							if(obj.times == 1){
	// 								this.getnew()
	// 								obj.times++
	// 								obj = JSON.stringify(obj)
	// 								uni.setStorage({
	// 									key: 'specifications',
	// 									data: obj
	// 								})
	// 							}
	// 						},
	// 						fail: () => {
	// 							this.specifications = ''
	// 						}
	// 					})
	// 				}
	// 				obj.times++
	// 				obj = JSON.stringify(obj)
	// 				uni.setStorage({
	// 					key: 'liebie',
	// 					data: obj
	// 				})


	// 			},
	// 			fail: () => {
	// 				this.onloadData()
	// 			}
	// 		})
		},

		data() {
			return {
				shareDetailsDis:false,
				returnIndex:false,
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
					title:'苗搭档:最新求购 -- 邀您查看',
					imageUrl:'https://img.hm8848.com/APP/152x152.png',
					href:'https://m.miaodadang.com/wantBuyList',
				    summary: `每日更新海量求购订单\r\n附近求购让交易更靠谱`,
				    success:  (res)=> {
						if(this.$store.state.token){
							this.$myhttp.post(this.websiteUrl+'/my/share','',(res)=>{
								
							},this)
						}
						this.shareDetailsDis = false
				    },
				    fail:  (err)=> {
				  //       console.log("fail:" + JSON.stringify(err));
						// this.shareDetailsDis = false
				    }
				});
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
					url:'../release/retrieval?type=want'
				})
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
			todetails(item){
				uni.navigateTo({
					url: '../purchaseDetails/purchaseDetails?id='+item.id+'&userId='+item.userId
				});
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
			onloadData() {
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
				this.$http.get(this.websiteUrl + '/purchases/search?start=' + this.lists.start + '&length=' + this.lists.length +
					'&areaId=' + this.areaId + '&categoryId=' + this.categoryId + '&specifications=' + this.specifications+'&sort='+this.sorts+'&lat='+this.location.latitude +'&lon='+this.location.longitude, '', (res) => {
						var res = res.data.data
						this.lists.Total =res.totalCount
						if (res.items.length) {
							var info = res.items
							console.log(info[0])
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
				this.shareDetailsDis=false
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
		color: #c6741e;
		border: 1upx solid #c6741e;
		text-align: center;
		line-height: 49upx;
		border-radius:7upx ;
		font-size: 29upx;
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
