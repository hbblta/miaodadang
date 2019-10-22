<template>
	<view class="index">
		<view class="statusBar"></view>
		<view class="gotop" @tap="gotop">
			<span class='iconfont icon-xiangshang'></span>
			<view >TOP</view>
		</view>
		<view class="header">
			<view class="header-main">
				<view @click="tourl('../my/collectFootprints?id=2')" class="footprint white w50">
					<span class='iconfont icon-shijian upx40'></span>
					<view style="font-size: 22upx;">足迹</view>
				</view>
				<view @click="tourl('../index/searchSupply')" class="searchBox">
					<span class='iconfont icon-sousuo '></span>
					<view class="searchBoxText">请输入关键词</view>
				</view>
				<view  @click="totongzhi" class="notice white w50">
					<i></i>
					<span class='iconfont icon-lingdang upx40'></span>
					<view style="font-size: 22upx;">公告</view>
				</view>
			</view>
		</view>
		<view style="margin-top: 90upx;">
			
		
		<you-scroll @onPullDown="indexRefresh">
		<view class="swiper">
			<swiper class="swiper"  indicator-active-color="#41eabb" indicator-color="#fff" indicator-dots="true" autoplay="true" interval="3000" >
                    <swiper-item v-for="(item,index) in zhuImage" :key='index' @click="tourl(item.url)">
                            <image  :src="item.imageUrl" mode=""></image>
                     </swiper-item>
                      
             </swiper>
		</view>
		<view class="w714">
			<view class="top-list">
				<view @tap="tourl('../photoFlowers/index')" class="top-list-item">
					<image src="../../static/index/toplist1.png" mode=""></image>
					<view>鉴花识虫</view>
				</view>
				<!-- <view  @click="noopen" class="top-list-item">
					<image src="../../static/index/toplist2.png" mode=""></image>
					<view>悬赏推广</view>
					
				</view> -->
				<view @tap="tourl('../mystate/community')" class="top-list-item">
					<image src="../../static/index/toplist3.png" mode=""></image>
					<view>社区</view>
				</view>
				<view @click="tofuwuzhan" class="top-list-item">
					<image src="../../static/index/toplist4.png" mode=""></image>
					<view>服务站</view>
				</view>
				<view @tap="tourl('../shops/shopList')"  class="top-list-item">
					<image src="../../static/index/toplist5.png" mode=""></image>
					<view>实力卖家</view>
				</view>
			</view>
			
			<view class="supply">
				<view style="background-image:url('../../static/index/midlist3.png');" @tap="tourl('../index/supplyList')" class="supply-item supplybg1">
					<view class="title">供应大厅</view>
					<view class="tit">海量信息</view>
				</view>
				<view @tap="tourl('../index/wantBuy')" class="supply-item supplybg2">
					<view class="title">求购大厅</view>
					<view class="tit">免费发布</view>
				</view>
			</view>
			
			<!-- <view class="todayChoice">
				<view class="choice-title">
					<view class="title">今日优选</view>
					<view class="mytitle">我要上优选</view>
				</view>
				<view class="todayChoice-list">
					<view class="list-item">
						<image src="../../static/test/index1.png" mode=""></image>
						<view class="title">四季种易活龟背竹</view>
						<view>￥450.00</view>
					</view>
					<view class="list-item">
						<image src="../../static/test/index1.png" mode=""></image>
						<view class="title">四季种易活龟背竹</view>
						<view>￥450.00</view>
					</view>
					<view class="list-item">
						<image src="../../static/test/index1.png" mode=""></image>
						<view class="title">四季种易活龟背竹</view>
						<view>￥450.00</view>
					</view>
				</view>
			</view> -->
			
			<view class="botlist">
				<view @tap="tourl('../index/supplyList?id=685&name=工程小苗')" class="botlist-item" >
					<view class="image-cover">
						<image style="width:100upx;height: 74upx;" src="../../static/index/botlist1.png" mode=""></image>
					</view>
					<view>工程小苗</view>
				</view>
				<view @tap="tourl('../index/supplyList?tags=容器苗')"class="botlist-item">
					<view class="image-cover">
						<image style="width:67upx;height: 91upx;" src="../../static/index/botlist2.png" mode=""></image>
					</view>
					<view>容器苗</view>
				</view>
				<view @tap="tourl('../index/supplyList?id=679&name=造型树桩盆景')" class="botlist-item" >
					<view class="image-cover">
						<image style="width:77upx;height: 87upx;" src="../../static/index/botlist3.png" mode=""></image>
					</view>
					<view>造型树</view>
				</view>
				<view @tap="tourl('../index/supplyList?id=688&name=枝条')" class="botlist-item" >
					<view class="image-cover">
						<image style="width:91upx;height: 85upx;" src="../../static/index/botlist4.png" mode=""></image>
					</view>
					<view>枝条</view>
				</view>
				<view @tap="tourl('../index/supplyList?id=654&name=草坪')" class="botlist-item" >
					<view class="image-cover">
						<image style="width:111upx;height:28upx;" src="../../static/index/botlist5.png" mode=""></image>
					</view>
					<view>草坪</view>
				</view>
				<view @tap="tourl('../index/supplyList?tags=果树')"  class="botlist-item" >
					<view class="image-cover">
						<image style="width:90upx;height: 68upx;" src="../../static/index/botlist6.png" mode=""></image>
					</view>
					<view>果树</view>
				</view>
				<view @tap="tourl('../index/supplyList?tags=绿植')" class="botlist-item">
					<view class="image-cover">
						<image style="width:72upx;height: 85upx;" src="../../static/index/botlist7.png" mode=""></image>
					</view>
					<view>绿植</view>
				</view>
				<view @tap="tourl('../index/supplyList?id=687&name=资材')" class="botlist-item" >
					<view class="image-cover">
						<image style="width:80upx;height: 79upx;" src="../../static/index/botlist8.png" mode=""></image>
					</view>
					<view>资材</view>
				</view>
				<view @tap="tourl('../index/supplyList?id=639&name=地被/花草')"  class="botlist-item" >
					<view class="image-cover">
						<image style="width:120upx;height: 81upx;" src="../../static/index/botlist9.png" mode=""></image>
					</view>
					<view>地坡/花草</view>
				</view>
				<view @tap="tourl('../index/supplyList')"  class="botlist-item" >
					<view class="image-cover">
						<image style="width:88upx;height:90upx;" src="../../static/index/botlist10.png" mode=""></image>
					</view>
					<view>更多</view>
				</view>
			</view>
			<view v-if="token" class="neighBorhood">
				<view @tap="towantnear" class="choice-title">
					<view class="title">附近求购</view>
					<view class="mytitle">更多</view>
				</view>
				<view class="neighBorhood-list">
					
					<view @click="towantdetails(item)" v-for="item in nearWantList" :key='item.id' class="neighBorhood-list-item">
						<view class="neighBorhood-item-left overs">
							<view class="icon-gou">
								购
							</view>
							<view class="title">
								{{item.details.name}}
							</view>
						</view>
						<view class="neighBorhood-item-add overs">
							{{item.specificationsStr}}
						</view>
						<view class="neighBorhood-item-mid overs">
							{{item.quantity?item.quantity:'若干'}} {{item.quantity?item.details.unit:''}}
						</view>
						<view v-if="item.loc" class="neighBorhood-item-right overs">
							<span class="iconfont icon-weizhi"></span>
							{{item.loc}}km
						</view>
					</view>
					
				
				</view>
			</view>
			<view class="tabs">
					<view class="tab-item" @tap="tab=1" :class="tab==1?'active':''">
						供应
						<view v-if="tab==1"></view>
					</view>
					<view class="tab-item" @tap="tab=2" :class="tab==2?'active':''">
						求购
						<view v-if="tab==2"></view>
					</view>
			</view>
			<view  class="botnav" v-if="tab==2">
				<view @click="towantdetails(item)" class="wantBuy-item"  v-for="(item,index) in wantList.arrs" :key="index">
					<view @click.stop="toOffer(item)" class="wantBuy-btns">
						去报价
					</view>
					<view class="wantBuy-item1">
						<view>{{item.details.name}}</view>
						<span>{{item.time}}</span>
					</view>
					<view style="justify-content: space-between;" class="wantBuy-item2">
						<view>求购数量： {{item.quantity?item.quantity:'若干'}} {{item.quantity?item.details.unit:''}} </view>		
						<view style="margin-right: 20upx;" class=" overs" v-if="item.loc" >
							<span style='font-size: 25upx;' class='iconfont icon-weizhi1'></span>
							{{item.loc}}km
						</view>
					</view>
					<view class="wantBuy-item2">
						<view class="overs">
							求购规格：{{item.specificationsStr}}
						</view>
					</view>
					<view class="wantBuy-item2">
						<view style="width:400upx;" class="overs">求购地区：{{item.city}}</view>
						<view class="num overs">
							<span v-if='item.quotations'>{{item.quotations}}条报价</span>
						</view>
					</view>
				</view>
				<view class="mores">{{wantList.loadingText}}</view>
			</view>
			<view class="botnav" v-if="tab==1">
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
										{{item.loc}}公里
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="mores">{{lists.loadingText}}</view>
				</view>
				
				
				
				
				<!-- <view @tap="tourl('../detailSupply/detailSupply')" class="botnav-item" v-for="(item,index) in num" :key="index">
					<image class="mainImg" src="../../static/test/index2.png" mode=""></image>
					<view class="botnav-right">
						<view class="botnav-right-item1">
							17公分银杏3年苗
						</view>
						<view class="botnav-right-item2">
							5284人看过 <span>1小时前</span>
						</view>
						<view class="botnav-right-item3">
							江苏省徐泉州市 
							<view class="icon-grounp">
								<view style="background:#fe7100;">
									诚
								</view>
								<view style="background:#e6f9f8;">
									企
								</view>
								<view style="background:#e2bc61;">
									金
								</view>
							</view>
						</view>
						<view class="botnav-right-item4">
							<span style="font-size: 20upx;">￥</span>700.0<span style="font-size: 21upx;color:#8c8c8c;">/棵</span>
						</view>
					</view>
				</view> -->
			</view>
		</view>
		</you-scroll>
		</view>
		<view class="pad"></view>
	</view>
</template>

<script>
	import getTime from '../../common/getTime.js'
	import {areas} from '../../common/areas.js'
	import getpostion from '../../common/getpostion.js'
	import youScroll from '../components/you-scroll'
	export default {
		 components:{
		 	youScroll
		 },
		created(){
			this.token = this.$store.state.token
			for (var i = 0; i < areas.length; i++) {
				this.areas[areas[i].id] = areas[i]
			}	
			this.getMyloctions()
			this.getZhuImage()
			if(this.$store.state.token){
				this.$myhttp.get(this.websiteUrl+'/my','',(res)=>{
					this.fuwuzhan = res.data.data
				},this)
			}
			
		},
		
		data(){
			return{
				zhuImage:[],
				fuwuzhan:{
					hasIdCard:false,
					businessLicense:{},
					agencies:[]
				},
				token:'',
				nearWantList:[],
				location: {
					latitude: '',
					longitude: ''
				},
				areas: {},
				tab:1,
				lists: {
					arrs: [],
					start: 0,
					length: 6,
					Total:0,
					loadingText: '已全部加载完毕',
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
					loading:false
				}
			}
			
		},
		methods:{
			getZhuImage(){
				this.$http.get(this.websiteUrl+'/links','',(res)=>{
				
					this.zhuImage = res.data.data
				})
			},
			tofuwuzhan(){
				if(this.$store.state.token){
					
						
						if (this.fuwuzhan.agencies.length){
							uni.showToast({
								title: '您通过认证'
							});
						}else{
							if(!this.fuwuzhan.hasIdCard){
								uni.showToast({
									icon:'none',
									title: '请先进行实名认证'
								});
								return
							}
							if(!this.fuwuzhan.businessLicense){
								uni.showToast({
									icon:'none',
									title: '请先进行企业认证'
								});
								return
							}
							uni.navigateTo({
								url:'../Authentication/realNamebg?title=服务站认证&src=https://img.hm8848.com/APP/auimg3.png&url=serviceStation'
							})
							
						}
				
						
					
					
				}else{
					uni.showToast({
						icon:'none',
						title:'请登录'
					})
					setTimeout(()=> {
						uni.navigateTo({
							url:'../login/login1'
						})
					}, 1000);
				}
					
			},
			nokaifang(){
				uni.showToast({
					icon:'none',
					title:'暂未开放,敬请期待'
				})
			},
			totongzhi(){
				var url = encodeURIComponent('http://help.hm8848.com/Notice.html')
				uni.navigateTo({
					url:'../help/help?url='+url
				})
			},
			towantnear(){
				this.$emit('tonear')
			},
			nearWantBuy(){
				uni.getLocation({
					type:'gcj02',
					success: res => {
						this.location = {
							longitude: res.longitude,
							latitude: res.latitude,
						}
						this.getNewsWantBuy()
					},
					fail(){
						this.getNewsWantBuy()
					}
				})
			},
			getNewsWantBuy(){
			
				this.$http.get(this.websiteUrl + '/purchases/search?start=0&length=3&areaId=&categoryId=&specifications=&sort=distance&lat='+this.location.latitude +'&lon='+this.location.longitude, '', (res) => {
							var res = res.data.data
							var info = res.items
							info.forEach((item) => {
								item.details = this.$store.state.categories[item.categoryId]
								item.loc = this.getlocation(item.location.lat, item.location.lon)	
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
							this.nearWantList = info
							
					})
			},
			indexRefresh(done){
				this.lists= {
					arrs: [],
					start: 0,
					length: 6,
					Total:0,
					loadingText: '已全部加载完毕',
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
					loading:false
				}
				this.onloadData()
				this.onWantData()
				this.nearWantBuy()
					setTimeout(()=>{
						done()	
					},500)
			},
			noopen(){
				uni.showToast({
					icon:'none',
					title:'暂未开放'
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
			towantdetails(item){
				uni.navigateTo({
					url: '../purchaseDetails/purchaseDetails?id='+item.id+'&userId='+item.userId
				});
			},
			getData(){
				if(this.tab == 1){
					this.onloadData()
				}else{
					this.onWantData()
				}
			},
			onWantData() {
				if(this.wantList.loading){
					return
				}
				this.wantList.loading = true
				if (this.wantList.Total !== 0) {
					if (this.wantList.Total == this.wantList.arrs.length) {
						this.wantList.loadingText = '已全部加载完毕'
						return
					}
				}
				this.wantList.loadingText = '上拉加载更多'
				this.$http.get(this.websiteUrl + '/purchases/search?start=' + this.wantList.start + '&length=' + this.wantList.length +
					'&areaId=&categoryId=&specifications=&sort=time', '', (res) => {
					
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
									return
								}
							}
							
						
						} else {
							this.wantList.loadingText = '已全部加载完毕'
						}
						this.wantList.times++
						this.wantList.loading = false
					})
			},
			todetails(id,info){
				var infos = JSON.stringify(info)
				uni.navigateTo({
					url:'../detailSupply/detailSupply?id='+id+'&info='+infos
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
			getMyloctions() {
				uni.getLocation({
					type:'gcj02',
					success: res => {
						this.location = {
							longitude: res.longitude,
							latitude: res.latitude
						}
						this.onloadData()
						this.onWantData()
						this.nearWantBuy()
					},
					fail:res=>{
						this.onloadData()
						this.onWantData()
						this.nearWantBuy()
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
				return (s / 1000).toFixed(2)
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
				this.$http.get(this.websiteUrl + '/supplies/search?start=' + this.lists.start + '&length=' + this.lists.length +
					'&areaId=&categoryId=&specifications=&sort=time', '', (res) => {
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
			gotop(){
				setTimeout(function() {
				   uni.pageScrollTo({
						scrollTop: 0,
						duration: 0
						});
				 }, 200)
			
			},
			tourl(e){
				if(this.$store.state.token){
					uni.navigateTo({
						url:e
					})
				}else{
					uni.showToast({
						icon:'none',
						title:'请登录'
					})
					setTimeout(()=> {
						uni.navigateTo({
							url:'../login/login1'
						})
					}, 1000);
				}
			}
			
			
			
		}
	}
</script>

<style scoped>
	@import url("../../style/index.css");
	.index{
		background-color: #f6f6f6;
	}
</style>
