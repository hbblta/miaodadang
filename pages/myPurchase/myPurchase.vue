<template>
	<view class="mySupply">
		<view class="tabs">
			<view class="tabs-item" @tap="tabactive = 1" :class="tabactive==1?'active':''">
				报价中({{inRelease.Total}})                                  
				<view v-if="tabactive==1"></view>
			</view>
			<view class="tabs-item" @tap="tabactive = 2" :class="tabactive==2?'active':''">
				已截止({{Undercarriage.Total}})
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
					<view class="mainCenter">
						<view class="main-list">
							<view  v-for="(item,index) in inRelease.arrs" :key='index' class="main-list-item">
								<view @click="toinfos(item)" class="main-list-itemTop">
									<view class="main-list-itemTop1">
										<view class="main-list-itemTop1-left">
											{{item.details.name}}
										</view>
										
										<view v-if='item.approvalStatus==1' class="main-list-itemTop1-right">
											
											<view>审核中</view>
										</view>
										<view v-if='item.approvalStatus==2' class="main-list-itemTop1-right">
											<view>审核失败</view>
										</view>
										<view  @click.stop="tobaojia(item)" v-if='item.approvalStatus==3 && !item.quotations' class="main-list-itemTop1-right">
											<view>暂无报价</view></view>
										<view @click.stop="tobaojia(item)" v-if='item.approvalStatus==3 && item.quotations'  class="main-list-itemTop1-right">
											<view style="background: #fe7100;color: #fff;">{{item.quotations}}条报价</view>
										</view>
									</view>
									<view class="main-list-itemTop2">
										采购数量：{{item.quantity?item.quantity:'若干'}}
									</view>
									<view class="main-list-itemTop3">
										截止日期：{{item.expires}}
									</view>
								</view>
								<view class="main-list-itembot">
									<view @click="downSale(item.id,index,item.details.name)">
										结束报价
										<span></span>
									</view>
									<view  @click="toinfos(item)">
										查看求购
										<span></span>
									</view>
									<view @click="deteleSale(item.id,index,item.details.name,'inRelease')">
										删除求购
									</view>
								</view>
							</view>
							
							
							
							
						</view>
						<view class="more">{{inRelease.loadingText}}</view>
						<view class="pad"></view>
					</view>
					
				</scroll-view>
				</swiper-item>
				<swiper-item>
					<view class="mainCenter">
						<view v-if="!Undercarriage.arrs.length && Undercarriage.times"  class="nodata">
							没有任何数据哦～
						</view>
						<scroll-view lower-threshold='80' v-if="Undercarriage.arrs.length"  @scrolltolower='loadUndercarriage' scroll-y style='height:100%;' class="mainCenter">
						<view class="main-list">
							
							<view v-for="(item,index) in Undercarriage.arrs" :key='index' class="main-list-item">
								<view class="main-list-itemTop">
									<view class="main-list-itemTop1">
										<view class="main-list-itemTop1-left">
											{{item.details.name}}
										</view>
										<view v-if='item.approvalStatus==1' class="main-list-itemTop1-right">
											
											<view>审核中</view>
										</view>
										<view v-if='item.approvalStatus==2' class="main-list-itemTop1-right">
											<view>审核失败</view>
										</view>
										<view  @click.stop="tobaojia(item)" v-if='item.approvalStatus==3 && !item.quotations' class="main-list-itemTop1-right">
											<view>暂无报价</view></view>
										<view @click.stop="tobaojia(item)" v-if='item.approvalStatus==3 && item.quotations'  class="main-list-itemTop1-right">
											<view style="background: #fe7100;color: #fff;">{{item.quotations}}条报价</view>
										</view>
									</view>
									<view class="main-list-itemTop2">
										采购数量：{{item.quantity?item.quantity:'若干'}}
									</view>
									<view class="main-list-itemTop3">
										截止日期：{{item.expires}}
									</view>
								</view>
								<view class="main-list-itembot">
									<view @click="upSale(item.id,index,item.details.name)">
										开始报价
										<span></span>
									</view>
									<view @click="toedit(item)">
										编辑求购
										<span></span>
									</view>
									<view @click="deteleSale(item.id,index,item.details.name,'Undercarriage')">
										删除求购
									</view>
								</view>
							</view>
							
							
							
							
							
							<view class="more">{{inRelease.loadingText}}</view>
							<view class="pad"></view>
						</view>	
							
						</scroll-view>
							
							
						
						
					</view>
				</swiper-item>
				
			</swiper>
		</view>
		
		<view class="mySuppyfooter">
			<view @click="tosupply" class="btns">
				<span class='iconfont icon-jia'></span> 发布新求购
			</view>
			
		</view>
		
	</view>
</template>

<script>
	
	export default {
		onLoad(e){
			if(e.return){
				this.returnIndex = true
			}
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
				returnIndex:false,
				tabactive: 1,
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
				}
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
		},
		methods:{
			tosupply(){
				uni.navigateTo({
					url:'../release/retrieval?type=want'
				})
			},
			tobaojia(item){
				var obj = JSON.stringify(item)
				uni.setStorage({
					key: 'baojia',
					data: JSON.stringify(item),
					success: function () {
						
						uni.navigateTo({
							url:'../wantBuy/shoujia'
						})
					}
				});
			},
			toinfos(item){
				if(item.approvalStatus == 3){
					uni.navigateTo({
						url: '../purchaseDetails/purchaseDetails?id='+item.id+'&userId='+item.userId
					});
				}
				
			},
			toedit(obj){

				uni.setStorage({
					key: 'editorQuotation',
					data: JSON.stringify(obj),
					success: function () {
						
						uni.navigateTo({
							url:'index'
						})
					}
				});
			},
			deteleSale(id,index,name,type){
				uni.showModal({
					title: '提示',
					content: '确定要把'+name+'删除么',
					success:  (res)=> {
						if (res.confirm) {
							this.$myhttp.delete(this.websiteUrl+'/purchases/'+id,{},(res)=>{
								this[type].arrs.splice(index,1)
								this[type].start-=1
								this[type].Total-=1
								uni.showToast({
									icon:'success',
									title:'删除成功'
								})
							},this)
						} 
					}
				});
			},
			downSale(id,index,name){
					uni.showModal({
					title: '提示',
					content: '确定要结束'+name+'报价么',
					success:  (res)=> {
						if (res.confirm) {
							this.$myhttp.put(this.websiteUrl+'/purchases/'+id+'/offline','',(res)=>{
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
									title:'下线成功'
								})
							},this)
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
							this.$myhttp.put(this.websiteUrl+'/purchases/'+id+'/online','',(res)=>{
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
							},this)
						} 
					}
				});
			},
			swiperchange(e){
				this.tabactive = e.detail.current+1
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
				this.$myhttp.get(this.websiteUrl+'/purchases?start='+this.Undercarriage.start+'&length='+this.Undercarriage.length+'&online=false','',(res)=>{
					console.log(res)
					var res =res.data.data
					this.Undercarriage.Total =res.totalCount
					if(res.items.length){
						var info = res.items
						console.log(info)
						info.forEach((item)=>{
							item.details = this.$store.state.categories[item.categoryId]
							item.specificationsArr = []
							var specifications = JSON.parse(item.specifications)
							var len = specifications.length>=4?4:specifications.length
							for(let i =0;i<len;i++){
								var str = ''
								var value = ''
								var unit = ''
								if(specifications[i].value instanceof Array){
									value = specifications[i].value[0]
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
				this.$myhttp.get(this.websiteUrl+'/purchases?start='+this.inRelease.start+'&length='+this.inRelease.length+'&online=true','',(res)=>{
					var res =res.data.data
					this.inRelease.Total =res.totalCount
					if(res.items.length){
						var info = res.items
						info.forEach((item)=>{
							item.details = this.$store.state.categories[item.categoryId]
							item.specificationsArr = []
							var specifications = JSON.parse(item.specifications)
						
							var len = specifications.length>=4?4:specifications.length
							for(let i =0;i<len;i++){
								var str = ''
								var value = ''
								var unit = ''
								if(specifications[i].value instanceof Array){
									value = specifications[i].value[0]
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
			}
		}
	}
</script>

<style>
	page {
		background: #f6f6f6;
	}
	.tabs {
		display: flex;
		justify-content: space-between;
		border-top:4upx solid #f6f6f6;
		height: 73upx;
		line-height: 73upx;
		font-size: 26upx;
		color: #999;
		text-align: center;
		background: #fff;
		position: fixed;
		top: 0;
		left: 0;
		z-index:1000;
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
		height: 6upx;
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
	.states{
		position: absolute;
		top: 0;
		left: 0;
		color: #fff;
		font-size: 14upx;
		text-align: center;
		width: 56upx;
		height: 75upx;
		background: #fe7100;
		z-index: 200;
		line-height: 22upx;
	}
	.states:after{
		position: absolute;
		display: block;
		content: '';
		border-bottom: 14upx solid #fff;
		border-right: 28upx solid transparent;
		border-left: 28upx solid transparent;
		border-top: 14upx solid transparent;
		bottom: 0;
		left: 0;
	}
	.main-list-item{
		height: 307upx;
		width: 710upx;
		background: #fff;
		border-radius:20upx;
		margin: 0 auto 27upx;
		position: relative;
		overflow: hidden;
	}
	.main-list-itemTop1{
		margin-top: 26upx;
		width: 684upx;
		margin-left: 20upx;
		display: flex;
		justify-content: space-between;
		position: relative;
	}
	.main-list-itemTop1-left{
		font-weight: bold;
		color: #000;
		font-size: 30upx;
	}
	.main-list-itemTop1-right{
		width: 130upx;
		height: 200upx;
		position: absolute;
		top: 0;
		right: 0;
		background: #fff;
	}
	.main-list-itemTop1-right view{
		position: absolute;
		top: 0;
		left: 0;
		width: 130upx;
		height: 43upx;
		text-align: center;
		line-height: 38upx;
		background: #ededed;
		color: #aeaeae;
		font-size: 23upx;
		border-radius:21.5upx;
		
	}
	.main-list-itemTop2{
		font-size: 24upx;
		color: #838383;
		height:80upx ;
		line-height: 80upx;
		margin-left: 20upx;
	}
	.main-list-itemTop3{
		font-size: 24upx;
		color: #838383;
		margin-left: 20upx;
	}
	.main-list-itembot{
		display: flex;
		width: 685upx;
		margin:47upx auto;
		border-top:1upx solid #e8e8e8;
		justify-content: space-between;
	}
	.main-list-itembot view{
		text-align: center;
		flex: 1;
		position: relative;
		height: 80upx;
		line-height: 80upx;
		font-size: 27upx;
		color: #666666;
	}
	.main-list-itembot view span{
		display: block;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: 0;
		width: 2upx;
		height: 40upx;
		background: #e8e8e8;
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
		width: 713upx;
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
	.swiper{
		margin-top: 75upx;
		height:100vh;
	}
	.swiper .mainCenter{
		height: 100%;
	}
	.nodata{
		margin-top: 350upx;
		font-size: 30upx;
		color: #999;
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
</style>

