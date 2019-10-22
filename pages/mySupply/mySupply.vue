<template>
	<view class="mySupply">
		<view class="tabs">
			<view class="tabs-item" @tap="tabactive = 1" :class="tabactive==1?'active':''">
				发布中({{inRelease.Total}})
				<view v-if="tabactive==1"></view>
			</view>
			<view class="tabs-item" @tap="tabactive = 2" :class="tabactive==2?'active':''">
				已下架({{Undercarriage.Total}})
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
		
						
						<view  class="main-list">
							<view v-for="(item,index) in inRelease.arrs" :key='index' class="main-list-item">
								
								<view @click="todetails(item.id,item.details)" class="main-list-itemtop">
									<view class="main-list-itemtop-left">
										<image :src="item.photos[0].url" mode="aspectFill" ></image>
									</view>
									<view class="main-list-itemtop-right">
										<view class="main-list-right-item1">
											<view>{{item.details.name}}</view>
											<span class='iconfont icon-xiugai'></span>
										</view>
										<view class="main-list-right-item2">
											<span>￥</span>{{item.price.toFixed(2)}}<span style="color:#666666;">/{{item.details.unit}}</span>
										</view>
										<view  class="main-list-right-item3">
											<view v-for='items in item.specificationsArr' :key='items' class="overs">{{items}}</view>
										</view>
										<view class="main-list-right-item4">
											上次刷新时间：{{item.time}}
										</view>
										
									</view>
								</view>
								<view class="main-list-itembot">
									<!-- <view>预约刷新
										<span></span>
									</view> -->
									<view @click="refreshSupply(item)">立即刷新<span></span></view>
									<view @click="toedit(item)">编辑<span></span></view>
									<view @click="downSale(item.id,index,item.details.name)">下架</view>
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
			
						
						<view  class="main-list">
							<view  v-for="(item,index) in Undercarriage.arrs" :key='index' class="main-list-item">
								
								<view  class="main-list-itemtop">
									<view class="main-list-itemtop-left">
										<image :src="item.photos[0].url" mode="aspectFill" ></image>
									</view>
									<view class="main-list-itemtop-right">
										<view class="main-list-right-item1">
											<view>{{item.details.name}}</view>
											<span class='iconfont icon-xiugai'></span>
										</view>
										<view class="main-list-right-item2">
												<span>￥</span>{{item.price.toFixed(2)}}<span style="color:#666666;">/{{item.details.unit}}</span>
										</view>
										<view  class="main-list-right-item3">
											<view v-for='items in item.specificationsArr' :key='items' class="overs">{{items}}</view>
										</view>
										<view class="main-list-right-item4">
											上次刷新时间：{{item.time}}
										</view>
										
									</view>
								</view>
								<view class="main-list-itembot xiajia">
									<view @click="upSale(item.id,index,item.details.name)">立即上架
										<span></span>
									</view>
									<view @click="toedit(item)">编辑<span></span></view>
									<view @click="deteleSale(item.id,index,item.details.name)">删除</view>
								</view>
							</view>
							
							
							
						</view>
						<view class="pad"></view>
					</scroll-view>
				</swiper-item>
				
			</swiper>
		</view>
		
		<view class="mySuppyfooter">
			<view @click="tosupply" class="btns">
				<span class='iconfont icon-fabu'></span> 发布新供应
			</view>
			<view @click="allRefresh" class="btns" style="background: linear-gradient(to right,#fe845e,#fe9358,#ffad4e);">
				<span class='iconfont icon-icon'></span> 一键刷新
			</view>
		</view>
		
	</view>
</template>

<script>

	import getTime from '../../common/getTime.js'
	export default {
		
		onLoad(e){
			if(e.return){
				this.returnIndex = true
			}
			this.$myhttp.get(this.websiteUrl+'/my','',(res)=>{
				this.rank = res.data.data.shop.rank
			})
			this.loadRelease()
			this.loadUndercarriage()
			
		},
		onBackPress(){
			if(this.returnIndex){
				uni.redirectTo({
					url:'../tabs/tabs'
				})
				return true
			}
		},
		data() {
			return {
				refreshLock:true,
				rank:1,
				returnIndex:false,
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
			allRefresh(){
				if(!this.refreshLock){
					return
				}
				this.refreshLock = false
				
				if(this.rank < 5){
					uni.showModal({
					    title: '提示',
					    content: '该功能只对VIP开放，是否要升级VIP?',
						cancelText:'否',
						confirmText:'是',
					    success: function (res) {
					        if (res.confirm) {
								uni.navigateTo({
									url:'../vip/index'
								})
					        } else if (res.cancel) {
					           
					        }
					    }
					})
					setTimeout(()=>{
						this.refreshLock = true
					},1500)
					return
				}
				
				
				this.$myhttp.post(this.websiteUrl+'/supplies/refreshall','',(res)=>{
					console.log(res)
					if(res.data.code == 0){
						if(res.data.data.completed){
							if(this.rank == 7){
								uni.showToast({
									icon:'success',
									title:'刷新成功！'
								})
							}else{
								uni.showToast({
									icon:'none',
									title:'全部刷新成功，共消耗'+res.data.data.points+'积分！'
								})
							}
						}else{
							uni.showModal({
							    title: '提示',
							    content: '积分不够，只刷新了'+res.data.data.refreshed +'条，消耗'+res.data.data.points+'积分，是否去赚积分？',
								cancelText:'否',
								confirmText:'是',
							    success: function (res) {
							        if (res.confirm) {
										uni.navigateTo({
											url:'../my/integral'
										})
							        } else if (res.cancel) {
							           
							        }
							    }
							});
						}
						
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
						uni.showToast({
							icon:'none',
							title:res.data.message
						})
					}
				},this)
				setTimeout(()=>{
					this.refreshLock = true
				},1500)
			},
			
			refreshSupply(item){
				if(!this.refreshLock){
					return
				}
				this.refreshLock = false
				this.$myhttp.post(this.websiteUrl+'/supplies/'+item.id+'/refresh','',(res)=>{
					console.log(res)
					if(res.data.code == 0){
						if(this.rank == 7){
							uni.showToast({
								icon:'success',
								title:'刷新成功！'
							})
						}else{
							uni.showToast({
								icon:'none',
								title:'刷新成功，消耗5积分！'
							})
						}
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
					}else if(res.data.code == 410){
						uni.showModal({
						    title: '提示',
						    content: '积分不够，无法刷新 是否去赚积分?',
							cancelText:'否',
							confirmText:'是',
						    success: function (res) {
						        if (res.confirm) {
									uni.navigateTo({
										url:'../my/integral'
									})
						        } else if (res.cancel) {
						            console.log('用户点击取消');
						        }
						    }
						});
						
						
					}else{
						uni.showToast({
							icon:'none',
							title:res.data.message
						})
					}
				},this)
				setTimeout(()=>{
					this.refreshLock = true
				},1500)
			},
			tosupply(){
				uni.navigateTo({
					url:'../release/retrieval?type=supply'
				})
			},
			todetails(id,info){
				uni.navigateTo({
					url:'../detailSupply/detailSupply?id='+id+'&info='+JSON.stringify(info)
				})
			},
			toedit(obj){
				uni.setStorage({
					key: 'mylistloc',
					data: JSON.stringify(obj),
					success: function () {
						uni.navigateTo({
							url:'supply'
						})
					}
				});
			},
			deteleSale(id,index,name){
				uni.showModal({
					title: '提示',
					content: '确定要把'+name+'删除么',
					success:  (res)=> {
						if (res.confirm) {
							this.$myhttp.delete(this.websiteUrl+'/supplies/'+id,{},(res)=>{
								console.log(res)
								this.Undercarriage.arrs.splice(index,1)
								this.Undercarriage.start-=1
								this.Undercarriage.Total-=1
								uni.showToast({
									icon:'success',
									title:'删除成功'
								})
							})
						} 
					}
				});
			},
			upSale(id,index,name){
				uni.showModal({
					title: '提示',
					content: '确定要把'+name+'上架么',
					success:  (res)=> {
						if (res.confirm) {
							this.$myhttp.put(this.websiteUrl+'/supplies/'+id+'/onsale',{
								 "onSale": true
							},(res)=>{
								this.Undercarriage.arrs.splice(index,1)
								this.Undercarriage.start-=1
								this.Undercarriage.Total-=1
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
								uni.showToast({
									icon:'success',
									title:'上架成功'
								})
							})
						} 
					}
				});
			},
			downSale(id,index,name){
					uni.showModal({
					title: '提示',
					content: '确定要把'+name+'下架么',
					success:  (res)=> {
						if (res.confirm) {
							this.$myhttp.put(this.websiteUrl+'/supplies/'+id+'/onsale',{
								 "onSale": false
							},(res)=>{
								this.inRelease.arrs.splice(index,1)
								this.inRelease.start-=1
								this.inRelease.Total-=1
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
									icon:'success',
									title:'下架成功'
								})
							})
						} 
					}
				});
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
				this.$myhttp.get(this.websiteUrl+'/supplies?start='+this.Undercarriage.start+'&length='+this.Undercarriage.length+'&onsale=false','',(res)=>{
					var res =res.data.data
					this.Undercarriage.Total =res.totalCount
					if(res.items.length){
						var info = res.items
						info.forEach((item)=>{
							item.details = this.$store.state.categories[item.categoryId]
							item.time = getTime(item.refreshTime)
							item.specificationsArr = []
							var specifications = JSON.parse(item.specifications)
							var len = specifications.length>=4?4:specifications.length
							for(let i =0;i<len;i++){
								var str = ''
								var value = ''
								var unit = ''
								if(specifications[i].value instanceof Array){
									if(specifications[i].value[0] == specifications[i].value[1]){
										value = specifications[i].value[0]
									}else{
										value = specifications[i].value[0]+value +'-'+ specifications[i].value[1]
									}
								}else{
									value = specifications[i].value
								}
								if(specifications[i].unit){
									unit = specifications[i].unit
								}
								str = specifications[i].name+': '+value+unit 
								item.specificationsArr.push(str)
								
							}
						})
						this.Undercarriage.start+=this.Undercarriage.length
						this.Undercarriage.arrs = this.Undercarriage.arrs.concat(info)
						if(this.Undercarriage.Total !== 0){
							if(this.Undercarriage.Total == this.Undercarriage.arrs.length){
								this.Undercarriage.loadingText = '已全部加载完毕'
								return
							}
						}
						console.log(this.Undercarriage.arrs)
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
				this.$myhttp.get(this.websiteUrl+'/supplies?start='+this.inRelease.start+'&length='+this.inRelease.length+'&onsale=true','',(res)=>{
					var res =res.data.data
					this.inRelease.Total =res.totalCount
					if(res.items.length){
						var info = res.items
						info.forEach((item)=>{
							item.details = this.$store.state.categories[item.categoryId]
							item.time = getTime(item.refreshTime)
							item.specificationsArr = []
							var specifications = JSON.parse(item.specifications)
						
							var len = specifications.length>=4?4:specifications.length
							for(let i =0;i<len;i++){
								var str = ''
								var value = ''
								var unit = ''
								if(specifications[i].value instanceof Array){
									if(specifications[i].value[0] == specifications[i].value[1]){
										value = specifications[i].value[0]
									}else{
										value = specifications[i].value[0]+value +'-'+ specifications[i].value[1]
									}
								}else{
									value = specifications[i].value
								}
								if(specifications[i].unit){
									unit = specifications[i].unit
								}
								str = specifications[i].name+': '+value+unit 
								item.specificationsArr.push(str)
								
							}
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
	
	.main-list-item{
		height: 384upx;
		width: 710upx;
		background: #fff;
		border-radius:20upx;
		margin: 0 auto 27upx;
		position: relative;
		overflow: hidden;
	}
	.main-list-itemtop{
		width: 693upx;
		height: 218upx;
		margin: 27upx 0 30upx 18upx;
		display: flex;
	}
	.main-list-itemtop-left{
		width: 223upx;
		height: 214upx;
	}
	.main-list-itemtop-left image{
		width: 223upx;
		height: 214upx;
	}
	.main-list-itemtop-right{
		margin-left: 28upx;
	}
	.main-list-right-item1{
		width: 432upx;
		display: flex;
		justify-content: space-between;
		font-weight: bold;
		font-size: 29upx;
		color: #000;
	}
	.main-list-right-item1 span{
		font-size:50upx;
		color: #b9b9b9;
	}
	.main-list-right-item2{
		height: 60upx;
		line-height: 60upx;
		color: #fe7100;
		font-size: 34upx;
		font-weight: bold;
	}
	.main-list-right-item2 span{
		font-weight: normal;
		font-size: 23upx;
	}
	.main-list-right-item3{
		display: flex;
		flex-wrap: wrap;
		line-height: 34upx;
		font-size: 23upx;
		color: #666666;
		font-weight: bold;
		width: 374upx;
	}
	.main-list-right-item3 view{
		width: 50%;
	}
	.main-list-right-item4{
		color: #acacac;
		font-size: 24upx;	
	}
	.main-list-itembot{
		margin-top: 30upx;
		color: #666666;
		text-align: center;
		border-top:1upx solid #d2d2d2;
		font-size: 25upx;
		display: flex;
		justify-content: space-between;
	}
	.main-list-itembot view{
		width: 33.33%;
		position: relative;
		height: 100upx;
		line-height: 100upx;
	}
	.main-list-itembot.xiajia view{
		width: 33.33%;
	}
	.main-list-itembot view span{
		display: block;
		height: 39upx;
		width: 3upx;
		background: #999;
		position: absolute;
		right: 0upx;
		top: 50%;
		transform: translateY(-50%);
	}
	.mySuppyfooter{
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 1000;
		width: 100%;
		background: #fff;
		height: 160upx;
		color: #fff;
		display: flex;
		justify-content: space-around;
		border-top:1upx solid #f3f3f3;
	}
	.mySuppyfooter .btns{
		line-height: 100upx;
		height: 100upx;
		margin-top: 30upx;
		width: 350upx;
		font-size: 38upx;
		text-align: center;
		border-radius:14upx;
		background: linear-gradient(to right,#17c5af,#23d0b2,#3ce6bb);
		overflow: hidden;
	}
	.mySuppyfooter .btns span{
		font-size: 48upx;
		margin-right: 10upx;
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
</style>
