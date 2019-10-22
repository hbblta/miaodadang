<template>
	<view  @click="shareDetailsNone">
		
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
		
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker"
		 @onConfirm="onConfirm"></mpvue-city-picker>
		<view class="pad"></view>
		<view class="headers">
			<view class="header">
				<view @touchstart="back" class="back iconfont icon-fanhui"></view>
				<view @click="togongying"  class="search"><span class='iconfont icon-sousuo'></span>搜索供应</view>
				<view @click.stop="shareDetailsDis=true" class="share iconfont icon-share"></view>
			</view>
			<view class="screen">
				<view @click="showMulLinkageThreePicker" class="screen-item overs">
					{{city}}<span class='triangle'></span>
				</view>
				<view @click="tabSwitch('rank')"  :class="tabs=='rank'?'active':''" class="screen-item overs">
						实力排序<span  :style="{borderTop:tabs=='rank'?'#35cec6 solid 7upx':'#000000 solid 7upx'}" class='triangle'></span>
				</view>
				<view  @click="tabSwitch('distance')" :class="tabs=='distance'?'active':''"   class="screen-item overs">
					距离排序<span :style="{borderTop:tabs=='distance'?'#35cec6 solid 7upx':'#000000 solid 7upx'}" class='triangle'></span>
				</view>
				
			</view>
			
		</view>
		<view class="center">
			<view @click="toshops(item.userId)"  v-for="item in nearShop.arrs" :key='item.id' class="shopItem">
				<view class="shopItemMain">
					<view class="shopItemMainLeft">
						<image :src="item.avatarUrl" mode=""></image>
						<view class="iconGroup">
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
					<view class="shopItemMainRight">
						<view class="overs name">
							{{item.nickName}}
						</view>
						<view class="loctions">
							<view class="provinces overs">
								{{item.city}}
							</view>
							<view v-if="item.loc" class="loc overs">
								<span style='font-size:20upx;' class='iconfont icon-weizhi1'></span>
								{{item.loc}}
							</view>
							
						</view>
						<view class="info">
							<view class="numericalValue">
								{{item.totalSupplies}}条供应/{{item.totalPurchases}}条求购
							</view>
							<view class="zhuyin overs">
								主营:{{item.mainBusiness?item.mainBusiness:'暂未编辑'}}
							</view>
						</view>
						<view class="imgGroup">
							<view class="imgItem" :key='supitem.id' v-for="supitem in item.supplies">
								<image :src="supitem.photos[0]" mode="aspectFill"></image>
								<view class="jieshao overs">{{$store.state.categories[supitem.categoryId].name}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="more">{{nearShop.loadingText}}</view>
	</view>
</template>

<script>
	import mpvueCityPicker from '../components/pickallcity.vue'
	import {areas} from '../../common/areas.js'
	import getpostion from '../../common/getpostion.js'
	export default{
		components: {
			mpvueCityPicker
		},
		onLoad(){
		
			this.getMyloctions()
			for (var i = 0; i < areas.length; i++) {
				this.areas[areas[i].id] = areas[i]
			}
		},
		onReachBottom(){
			this.getNearShop()
		},
		onPullDownRefresh(){
			this.nearShop={
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
			},500)
			
		},
		data(){
			return{
				shareDetailsDis:false,
				areaId:'',
		
				location:{
					longitude:'',
					latitude:''
				},
				tabs:'rank',
				areas:{},
				city: '地区',
				themeColor: '#007AFF',
				nearShop:{
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
		methods:{
			shareDetailsNone(){
				this.shareDetailsDis = false
			},
			togongying(){
					uni.navigateTo({
						url:'../index/searchSupply'
					})
			},
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
								
							})
						}
						this.shareDetailsDis = false
				    },
				    fail: function (err) {
				  //       console.log("fail:" + JSON.stringify(err));
						// this.shareDetailsDis = false
				    }
				});
			},
			tabSwitch(e){
				this.tabs = e
				this.nearShop = {
					arrs:[],
					Total:0,
					start:0,
					length:6,
					loadingText:'已全部加载完毕',
					times:0,
					loading:false
				}
				this.getMyloctions()
			},
			toshops(id){
				uni.navigateTo({
					url:'../shops/shop?id='+id
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
						this.getNearShop()
					},
					fail:()=>{
						this.getNearShop()
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
			getNearShop(){
				if(this.nearShop.loading){
					return
				}
							
				this.nearShop.loading = true
				if (this.nearShop.Total !== 0) {
					if (this.nearShop.Total == this.nearShop.arrs.length) {
						this.nearShop.loadingText = '已全部加载完毕'
						return
					}
				}
				this.nearShop.loadingText = '上拉加载更多'
				this.$myhttp.get(this.websiteUrl + '/shops/sellers?start=' + this.nearShop.start + '&length=' + this.nearShop.length+'&sort='+this.tabs+'&lat='+this.location.latitude+'&lon='+this.location.longitude+'&areaId='+this.areaId, '', (res) => {
						console.log(res)
						var res = res.data.data
						this.nearShop.Total =res.totalCount
						if (res.items.length) {
							var info = res.items
							info.forEach((item) => {
								if(item.location){
									item.loc = this.getlocation(item.location.lat,item.location.lon)
								}else{
									item.loc = ''
								}
								var city = getpostion(item.areas[0])
								item.city  = city.replace(/-/g,"")
							})
							this.nearShop.start += res.items.length
							this.nearShop.arrs = this.nearShop.arrs.concat(info)
							if (this.nearShop.Total !== 0) {
								if (this.nearShop.Total == this.nearShop.arrs.length) {
									this.nearShop.loadingText = '已全部加载完毕'
									return
								}
							}
							
							
						
						} else {
							this.nearShop.loadingText = '已全部加载完毕'
							
							
						}
						this.nearShop.times++
						this.nearShop.loading = false
					
					},this)
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
				this.nearShop = {
					arrs:[],
					Total:0,
					start:0,
					length:6,
					loadingText:'已全部加载完毕',
					times:0,
					loading:false
				}
				this.getMyloctions()
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>
<style>
	.pad {
		padding-top: var(--status-bar-height);
		height: 190upx;
		width: 100%;
	}
	.headers {
		position: fixed;
		width: 100%;
		z-index: 200;
		top: 0;
		left: 0;
		background: #fff;
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
		width: 33.33%;
		text-align: center;
		font-size: 25upx;
		color: #333;
		overflow: hidden;
	}
	.screen-item.active{
		color: #35cec6;
		
	}
	.screen-item .triangle {
		display: inline-block;
		border-top: #000000 solid 7upx;
		border-left: transparent solid 7upx;
		border-right: transparent solid 7upx;
		border-bottom: transparent solid 7upx;
		margin: 46upx 0 0 7upx;
	}
	.shopItem{
		width: 100%;
		padding: 38upx 0 26upx;
		border-bottom:1upx solid #f4f4f4;
	}
	.shopItemMain{
		width: 670upx;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
	}
	.shopItemMainLeft{
		width: 68upx;
	}
	.shopItemMainLeft image{
		width: 68upx;
		height: 68upx;
		border-radius:50%;
	}

	.iconGroup {
		display: flex;
		margin-top: 29upx;
		width: 100%;
		display: flex;
		justify-content: space-between;
		flex-wrap:wrap;
	}
	.iconGroup>view {
		text-align: center;
		width: 26upx;
		height: 26upx;
		color: #fff;
		font-size: 20upx;
		border-radius: 5upx;
		line-height: 26upx;
		margin-top:10upx;
	}
	.shopItemMainRight{
		width: 568upx;
	}
	.shopItemMainRight .name{
		width: 100%;
		font-size: 29upx;
		font-weight: bold;
		color: #1c1c1c;
	}
	.loctions{
		width: 100%;
		display: flex;
		justify-content: space-between;
		color:#767676;
		font-size: 22upx;
		line-height: 45upx;
	}
	.loctions .provinces{
		width: 352upx;
	}
	.shopItemMainRight .info{
		display: flex;
		font-size: 23upx;
		color: #676666;
		line-height: 45upx;
	}
	.shopItemMainRight .info .zhuyin{
		width: 304upx;
		margin-left: 34upx;
	}
	.imgGroup{
		display: flex;
		
	}
	.imgGroup .imgItem{
		width: 172upx;
		height: 172upx;
		position: relative;
		margin-right: 20upx;
	}
	.imgGroup .imgItem image{
		width: 172upx;
		height: 172upx;
	}
	.imgGroup .imgItem .jieshao{
		position: absolute;
		z-index: 100;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 37upx;
		line-height: 37upx;
		color: #fff;
		background:rgba(0,0,0,0.3);
		text-align: center;
		font-size: 25upx;
	}
	.more{
		text-align: center;
		height: 80upx;
		line-height: 80upx;
		color: #000000;
		font-size: 30upx;
	}
</style>
