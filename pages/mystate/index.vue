<template>
	<view >
		<view v-if="!dynamic.arrs.length && dynamic.times" class="nodata">
			没有任何数据哦～
		</view>
		<view v-if="dynamic.arrs.length" class="dynamic">
			
			<view v-for="(item,index) in dynamic.arrs" :key='index' class="outdynamicItem">
				<view class="dynamicItem">
				
					<view class="dynamicItemTop">
							<span @click='removedynamic(index,item.id)' class='iconfont icon-lajitong'></span>
						<view  class="dynamicItemTopLeft">
							<image @click="toshops(item.userId)" :src="item.avatarUrl" mode=""></image>
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
			<view class="more">{{dynamic.loadingText}}</view>
		</view>
		
	</view>
</template>

<script>
	import getTime from '../../common/getTime.js'
	import getpostion from '../../common/getpostion.js'
	export default{
		created(){
			this.getMyloctions()
		
		},
		data(){
			return{
				id:'',
				location: {
					latitude: '',
					longitude: ''
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
			}
			
		},
		
		mounted(){
			this.$myhttp.get(this.websiteUrl+'/users','',(res)=>{
				this.id = res.data.data.id
				this.getDynamic()
			})
			
		},
		onReachBottom(e){
			this.getDynamic()
		},
		methods:{
			toshops(id){	
				uni.navigateTo({
					url:'../shops/shop?id='+id
				})
			},
			removedynamic(index,id){
				uni.showModal({
					title: '提示',
					content: '确定要把删除本条动态么',
					success:  (res)=> {
						if (res.confirm) {
							console.log(id)
							this.$myhttp.delete(this.websiteUrl+'/news/'+id,'',(res)=>{
								console.log(res)
								this.dynamic.arrs.splice(index,1)
								this.dynamic.start-=1
								this.dynamic.Total-=1
								
								uni.showToast({
									icon:'success',
									title:'删除成功'
								})
							})
						} 
					}
				});
			},
			getMyloctions(){
				uni.getLocation({
					type:'gcj02',
					success: res => {
						this.location = {
							longitude: res.longitude,
							latitude: res.latitude
						}
					}
				})
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
		
		},
		onNavigationBarButtonTap(){
			uni.navigateTo({
				url:'release'
			})
		}
	}
</script>

<style>
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
		height: 100%
	}
	.nodata{
		margin-top: 350upx;
		font-size: 30upx;
		color: #999;
		text-align: center;
	}
</style>
