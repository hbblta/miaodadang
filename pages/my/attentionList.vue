<template>
	<view class="swiper" style="height: 100vh;" >
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
							<view v-if=" item.loc" class="nearMainRight">
								{{item.loc}}
							</view>
							
						</view>
					</view>
				</view>
			</view>
			<view v-if="nearShop.arrs.length" class="more">{{nearShop.loadingText}}</view>
		</you-scroll>
		
	</view>
</template>

<script>
	import youScroll from '../components/you-scroll'
	export default{
		components:{
			youScroll
		},
		mounted(){
			this.getMyloctions(()=>{
				this.getNearShop('')
			})
		},
		data(){
			return{
				location: {
					latitude: '',
					longitude: ''
				},
				nearShop:{
					arrs:[],
					Total:0,
					start:0,
					length:10,
					loadingText:'已全部加载完毕',
					times:0,
					loading:false
				}
			}
		},
		methods:{
			toshops(id){
				uni.navigateTo({
					url:'../shops/shop?id='+id
				})
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
				console.log(this.websiteUrl + '/shops?start=' + this.nearShop.start + '&length=' + this.nearShop.length+'&sort=distance&lat='+this.location.latitude+'&lon='+this.location.longitude+'&followed=true')
				this.$myhttp.get(this.websiteUrl + '/shops?start=' + this.nearShop.start + '&length=' + this.nearShop.length+'&sort=distance&lat='+this.location.latitude+'&lon='+this.location.longitude+'&followed=true', '', (res) => {
						console.log(res)
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
		}
	}
</script>

<style>
	@import url("../../style/fujin.css");
</style>
