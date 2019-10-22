<template>
	<view @click="shareDetailsNone">
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
		
		
		
		
		<view class="footer">
			<view class="footer-left">
				<!-- <view @click="nokaifang" class="footer-left-item">
					<span class='iconfont icon-ziyuan'></span>
					<view>聊一聊</view>
				</view> -->
				<view @click="showCall" class="footer-left-item">
					<span style="color:#f3c254;" class='iconfont icon-dianhua1'></span>
					<view >打电话</view>
				</view>
			</view>
			<view @click="toOffer" class="footer-right">
				立即报价
			</view>
		</view>
		<view @click="toshop" class="pur-header">
			<view class="headermain">
				<view class="headermain-left">
					<image :src="obj.avatarUrl" mode=""></image>
				</view>
				<view class="headermain-right">
					<view style="display: flex;" class="headermain-right1">
						 <view>{{obj.nickName}}</view>
						 <view class="icon-grounp">
						 	<view v-if="obj.agencies.length" style="margin-top: 10upx;background:#1dae2d;">
						 		服
						 	</view>
						 	<view v-if="obj.rank == 7" style="margin-top: 10upx;background:#b9227f;">
						 		冠
						 	</view>
						 	<view v-if="obj.rank == 6" style="margin-top: 10upx;background:#2b6cd0;">
						 		钻
						 	</view>
						 	<view v-if="obj.rank == 5" style="margin-top: 10upx;background:#ffa523;">
						 		金
						 	</view>
						 	<view v-if="obj.isMember" style="margin-top: 10upx;background:#ed7f40;">
						 		诚
						 	</view>
						 	<view v-if="obj.hasBusinessLicense"  style="margin-top: 10upx;background:#38d3cb;">
						 		企
						 	</view>
						 	<view v-if="obj.hasIdCard"  style="margin-top: 10upx;background:#019fa2;">
						 		实
						 	</view>
						 </view>
					</view>
					<view class="headermain-right2">
						<view>{{obj.area}} <view v-if="location"><span style="margin: 0 5upx;" class="iconfont icon-weizhi1"></span> {{location}}</view> </view>
						<view>近期采购 <span style="color:#ed7522;">{{qiugou}}单</span> </view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="center">
			<view class="center-item">
				<view class="center-item-left">
					<view>采购品种</view>
				</view>
				<view class="center-item-right">
					<view>{{obj.details.name}}
					</view>
					
				</view>
			</view>
			<view class="center-item">
				<view class="center-item-left">
					<view>采购数量</view>
				</view>
				<view class="center-item-right">
					<view v-if="obj.quantity">
						{{obj.quantity}}{{obj.details.unit}}
					</view>
					<view v-else>
						若干
					</view>
					
				</view>
			</view>
		</view>
		<view class="center-item">
				<view class="center-item-left">
					<view>采购规格</view>
				</view>
				<view class="center-item-right">
					<view v-for="item in obj.specificationsArr" :key='item'>
						{{item}}
					</view>
					
				</view>
		</view>
		<view class="center-item">
				<view class="center-item-left">
					<view>采购地区</view>
				</view>
				<view class="center-item-right">
					<view  style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
						{{obj.purchaseStr}}
					</view>
					
				</view>
		</view>
		<view class="center-item" v-if="obj.photos.length">
				<view class="center-item-left">
					<view>样式图片</view>
				</view>
				<view class="center-item-right">
					<view class="imgGroup">
						<image @click="showImage(obj.photos,index)" v-for="(item,index) in obj.photos" :src="item" mode="aspectFill"></image>
						
					</view>
				</view>
		</view>
		<view class="center-item">
				<view class="center-item-left">
					<view>收货地区</view>
				</view>
				<view class="center-item-right">
					<view >
						{{obj.address}}
					</view>
					
				</view>
		</view>
		<view class="center-item">
				<view class="center-item-left">
					<view>截止时间</view>
				</view>
				<view class="center-item-right">
					<view  style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
						{{obj.expires}}
					</view>
					
				</view>
		</view>
		<view v-if="obj.profile" class="center-item">
				<view class="center-item-left">
					<view>货物说明</view>
				</view>
				<view class="center-item-right">
					<view>
						{{obj.profile}}
					</view>
					
				</view>
		</view>
		<view style="height: 106rpx;"></view>
		</view>
	</view>
</template>

<script>
	import {areas} from '../../common/areas.js'
	import provinceData from '../components/city-data/area0.js';
	import cityData from '../components/city-data/area1.js';
	import areaData from '../components/city-data/area2.js';
	import getpostion from '../../common/getpostion.js'

	export default{
		onLoad(e){
			this.userIds= e.userId
			this.id = e.id
			for(var i=0;i<areas.length;i++){
				this.areas[areas[i].id] = areas[i]
				this.cityname[areas[i].name] = areas[i]
			}
			if(this.$store.state.token){
				this.$myhttp.get(this.websiteUrl+'/my','',(res)=>{
					this.rank = res.data.data.shop.rank
				},this)
			}
			
			try{
				this.getInfo()
			}catch(e){
				this.getInfo()
			}
		},
		data(){
			return{
				userIds:'',
				qiugou:0,
				rank:1,
				shareStr:'',
				shareDetailsDis:false,
				stayCall:true,
				location:'',
				areas:{},
				cityname:{},
				id:'',
				obj:{
					purchaseStr:'',
					avatarUrl:'',
					nickName:'',
					area:'',
					details:{
						name:'',
						unit:""
					},
					specificationsArr:['']
				}
			}
		},
		onNavigationBarButtonTap(){
			this.shareDetailsDis = true
		},
		methods:{
			nokaifang(){
				if(!this.$store.state.token){
					uni.showToast({
						icon:'none',
						title:'请登录'
					})
					setTimeout(()=> {
						uni.navigateTo({
							url:'../login/login1'
						})
					}, 1000);
					return
				}
				uni.showToast({
					icon:'none',
					title:'暂未开放,敬请期待'
				})
			},
			shareDetailsNone(){
				this.shareDetailsDis = false
			},
			sharesweixin(type){
				uni.share({
				    provider: "weixin",
				    scene: type,
				    type: 0,
					title:this.obj.nickName + '想要求购 -- '+this.obj.details.name,
					imageUrl:'https://img.hm8848.com/APP/152x152.png',
					href:'https://m.miaodadang.com/wantBuyDrtails?id='+this.id,
				    summary: this.shareStr,
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
			showImage(item,index){
				uni.previewImage({
						current:index,
				        urls: item
				        
				    });
			},
			showCall(){
				if(!this.$store.state.token){
					uni.showToast({
						icon:'none',
						title:'请登录'
					})
					setTimeout(()=> {
						uni.navigateTo({
							url:'../login/login1'
						})
					}, 1000);
					return
				}
				if(!this.stayCall){
					return
				}
				this.stayCall = false
				this.$myhttp.post(this.websiteUrl+'/my/shops/'+this.obj.userId+'/contact?pay=true','',(res)=>{
					if(res.data.code == 0){
						uni.makePhoneCall({
							 phoneNumber:res.data.data
						})
					}else if(res.data.code == 410){
						uni.showModal({
						    title: '提示',
						    content: '积分不够，是否去赚积分？',
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
					}else{
						uni.showToast({
							icon:'none',
							title:res.data.message
						})
					}
					
					
				},this)
				setTimeout(()=>{
					this.stayCall = true	
				},1000)
			},
			toshop(){
				if(!this.$store.state.token){
					uni.showToast({
						icon:'none',
						title:'请登录'
					})
					setTimeout(()=> {
						uni.navigateTo({
							url:'../login/login1'
						})
					}, 1000);
					return
				}
				uni.navigateTo({
					url:'../shops/shop?id='+this.obj.userId
				})
			},
			toOffer(){
				if(!this.$store.state.token){
					uni.showToast({
						icon:'none',
						title:'请登录'
					})
					setTimeout(()=> {
						uni.navigateTo({
							url:'../login/login1'
						})
					}, 1000);
					return
				}
				uni.setStorage({
					key:'purOffer',
					data:JSON.stringify(this.obj),
					success(){
						uni.navigateTo({
							url:'../wantBuy/offer'
						})
					}
				})	
			},
			getInfo(){
				this.$http.get(this.websiteUrl+'/purchases/search?start=0&length=0&userId='+this.userIds,'',(res)=>{
					this.qiugou = res.data.data.totalCount
				})
				this.$http.get(this.websiteUrl + '/purchases/snapshots/'+this.id,'',(res)=>{
					var info = res.data.data
					info.area = getpostion(info.areaId)
					info.area = info.area.replace(/-/g,"")
					info.details = this.$store.state.categories[info.categoryId]
					info.specificationsArr = []
					var specifications = JSON.parse(info.specifications)
					var len = specifications.length
					this.shareStr = ''
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
						info.specificationsArr.push(str)
						this.shareStr += str+';'
					}
					
					info.purchaseStr = ''
					
					for(let i=0;i<info.acceptedAreas.length;i++){
						var obj = {
							name:'',
							id:''
						}
						if(!info.acceptedAreas[i]){
							info.purchaseStr += '全国;'
						}else{
							
							var obj = {
								name:getpostion(info.acceptedAreas[i]),
								id:info.acceptedAreas[i]
							}
							info.purchaseStr += getpostion(info.acceptedAreas[i]) + ';'
						}
						
					}
					
					
					
					this.obj = info
					this.getlocation()
				},this)	
			},
			getlocation(){
				uni.getLocation({
					type:'gcj02',
					success: res => {
						var La1 = this.obj.location.lat* Math.PI / 180.0;
						var Lo1 = this.obj.location.lon;
						var La2
						var Lo2
						var earthRadius = 6371;
						Lo2 = res.longitude
						La2 = res.latitude * Math.PI / 180.0;
						var La3 = La1 - La2;
						var Lb3 = Lo1 * Math.PI / 180.0 - Lo2 * Math.PI / 180.0;
						var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
						s = s * 6378.137;//地球半径
						s = parseInt(Math.round(s * 10000) / 10);      //距离计算添加对象
						this.location = (s/1000).toFixed(2)+'公里'
					},
					fail: () => {
						this.location = ''
					},
					complete: () => {}
				});
				
				
			},
		}
	}
</script>

<style>
	.imgGroup{
		display: flex;
		flex-wrap: wrap;
		padding: 30upx 0;
	}
	.imgGroup image{
		width:120upx;
		height: 120upx;
		margin-right: 20upx;
		margin-bottom: 20upx;
	}
	
	.pur-header{
		width: 100%;
		height: 194upx;
		
	}
	.headermain{
		width: 675upx;
		margin:24upx auto;
		display: flex;
	}
	.headermain-left image{
		width: 108upx;
		height: 108upx;
		border-radius:50%;
		margin: 20upx 24upx 0;
	}
	.headermain-right1{
		font-size: 32upx;
		font-weight: bold;
		color: #000000;
	}
	 .headermain-right1 .icon-gou{
		 font-weight: normal;
		 text-align: center;
		 width: 30upx;
		 height: 30upx;
		 color: #fff;
		 font-size: 24upx;
		 background: #f4b96a;
		 border-radius:5upx;
		 line-height: 30upx;
		 display: inline-block;
		 margin-left: 25upx;
	 }
	 .headermain-right2{
		 color: #999999;
		 font-size: 27upx;
		 font-weight: bold;
		 line-height: 46upx;
	 }
	 .center{
		 border-top:1upx solid #f0f0f0;
	 }
	 .center-item{
		overflow: hidden;	
		display: flex;
			justify-content: space-between;
		  border-bottom:1upx solid #f0f0f0;
		  font-weight: bold;
	 }
	 .center-item-left{
		 background: #f7f7f7;
		 box-sizing:border-box ;
		 text-align: center;
		 width: 26%;
		 font-size: 30upx;
		 color: #858585;
		 display: flex;
		 align-items: center;
		 justify-content: center;
	 }

	 .center-item-right{
		 width: 74%;
		
		 align-items: center;
		min-height: 80upx;
	 }
	  .center-item-right view{
		white-space: pre-line;
		  margin-left: 37upx;
		  font-size: 30upx;
		  line-height: 60upx;
		padding:10upx 0;
	  }
	  .footer{
		  position: fixed;
		  bottom: 0;
		  left: 0;
		  width: 100%;
		  z-index: 1000;
		  border-top:1upx solid #f3f3f3;
		  display: flex;
		  justify-content: space-between;
		  height: 106upx;
		  background: #fff;
	  }
	  .footer-left{
		  width: 260upx;
		  display: flex;
	  }
	  .footer-left-item{
		  width: 50%;
		  height: 106upx;
		  text-align: center;
		  font-size: 27upx;
		  color: #ccc;
		 
	  }
	  .footer-left-item:nth-of-type(1){
		  border-right: 1upx solid #f3f3f3;
	  }
	  .footer-left-item span{
		  display: inline-block;
		  font-size: 45upx;
		  margin: 9upx 0;
	  }
	  .footer-right{
		  width: 455upx;
		  height: 88upx;
		  margin: 9upx 10upx 0;
		  background: #41bca0;
		  line-height: 88upx;
		  border-radius:5upx;
		  color: #fff;
		  text-align: center;
		  font-size: 36upx;
	  }
	  
	  
	  .icon-grounp {
	  		display: flex;
	  		margin-left: 10upx;
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
	  	
	  }
</style>
