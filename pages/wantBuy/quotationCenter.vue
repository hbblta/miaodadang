<template>
	<view>
		<!-- <view class="header">
			<view @click="active=1" :class="active==1?'active':''" class="item">
				未报价
			</view>
			<view  @click="active=2" :class="active==2?'active':''" class="item">
				已报价
			</view>
			<view  @click="active=3" :class="active==3?'active':''" class="item">
				已错过
			</view>
		</view> -->
		<view  style="height:100vh;"  class="center">
			<you-scroll  @onPullDown="onWantDown"  @onLoadMore="onWantData('')">
			<view class="center-list">
				<view v-if="!wantList.arrs.length && wantList.times" class="nodata">
					没有任何数据哦～
				</view>
				
					<view v-if="wantList.arrs.length" @click="towantdetails(item.purchase)" v-for="(item,index) in wantList.arrs" :key='index' class="center-item">
						<view class="center-item1">
							<view>{{item.purchase.details.name}}</view>
							<view>{{item.purchase.time}}</view>
						</view>
						<view class="center-item2">
							求购数量：{{item.purchase.quantity?item. purchase.quantity:'若干'}} {{item.purchase.quantity?item. purchase.details.unit:''}}
						</view>
						<view class="center-item2 overs">
							求购规格：{{item.purchase.specificationsStr}}
						</view>
						<view class="center-item3">
							<view>求购地区: {{item.purchase.city}}</view>
							<view @click.stop="toOffer(item.purchase)" class="btn">去报价</view>
						</view>
					</view>
				
				
				<view v-if="wantList.arrs.length" class="more">{{wantList.loadingText}}</view>
			</view>
			</you-scroll>
		</view>
	</view>

</template>

<script>
	import getTime from '../../common/getTime.js'
	import youScroll from '../components/you-scroll'
	import getpostion from '../../common/getpostion.js'
	export default{
		created(){
			this.onWantData('')
		},
		components:{
			youScroll
		},
		data(){
			return{
				active:1,
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
					this.onWantData(()=>{
							done()
					})
				
				
			},
			towantdetails(item){
				uni.navigateTo({
					url: '../purchaseDetails/purchaseDetails?id='+item.id+'&userId='+item.userId
				});
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
				this.$myhttp.get(this.websiteUrl + '/purchases/recommended?start=' + this.wantList.start + '&length=' + this.wantList.length +
					'&quotation=true', '', (res) => {
						console.log(res)
						var res = res.data.data
						this.wantList.Total =res.totalCount
						if (res.items.length) {
							var info = res.items
						
							info.forEach((item) => {
								item.purchase.details = this.$store.state.categories[item. purchase.categoryId]
								// item.loc = this.getlocation(item.location.lat, item.location.lon)
								item.purchase.time = this.times(item.purchase.createTime)
								if(item.purchase.acceptedAreas[0]){
									var city = getpostion(item.purchase.acceptedAreas[0])
									item.purchase.city  = city.replace(/-/g,"")
								}else{
									 item.purchase.city  = '全国'
								}
								
								
								
								
								var specifications = JSON.parse(item.purchase.specifications)
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
								item.purchase.specificationsStr = str
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
		}
	}
</script>

<style>
	.header {
		width: 100%;
		height: 100upx;
		display: flex;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1000;
	}

	.header .item {
		width: 33.3%;
		height: 100upx;
		text-align: center;
		line-height: 100upx;
		color: #959595;
		font-size: 30upx;
		position: relative;
	}

	.header .item.active {
		color: #1d1d1d;
	}

	.header .item.active:after {
		position: absolute;
		content: '';
		width: 40upx;
		height: 5upx;
		background: #33c3a7;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
	}
	/* .center{
		margin-top: 100upx;
	} */
	.center-item{
		padding: 30upx 0;
		height: 220upx;
		width: 100%;
		border-bottom: 1upx solid #f2f2f2;
		line-height:60upx;
	}
	.center-item1{
		display: flex;
		justify-content: space-between;
		width: 675upx;
		margin: 0 auto;
	}
	.center-item1 view:nth-of-type(1){
		font-size:30upx;
		color: #464746;
		font-weight: bold;
	}
	.center-item1 view:nth-of-type(2){
		font-size: 22upx;
		color: #989797;
	}
	.center-item2{
		width: 675upx;
		margin: 0 auto;
		font-size: 28upx;
		color: #575757;
	}
	.center-item3{
		width: 675upx;
		margin: 0 auto;
		font-size: 28upx;
		color: #575757;
		display: flex;
		justify-content: space-between;
	}
	.center-item3 .btn{
		width: 130upx;
		height: 50upx;
		color: #0cb897;
		border: 1upx solid #0cb897;
		border-radius:15upx;
		line-height: 50upx;
		text-align: center;
	}
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
