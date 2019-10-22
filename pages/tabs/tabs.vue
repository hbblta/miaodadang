<template>
	<view>
		<view @click="publishingLayer=false" class="publishingLayer" v-if="publishingLayer" style='height:100vh'>
			<view class="mask"></view>
			<view class="publishingLayerList">
				
				<view @click="torelease('../release/retrieval?type=supply')" class="item fadeInUpBig animated" >
					<image src="../../static/tab/pubIcon1.png" mode=""></image>
					<view>发布供应</view>
				</view>
				<view @click="torelease('../release/retrieval?type=want')" style="animation-delay: 0.3s;" class="item fadeInUpBig animated">
					<image src="../../static/tab/pubIcon2.png" mode=""></image>
					<view>发布求购</view>
				</view>
				<view  @click="torelease('../mystate/release')" style="animation-delay:0.6s;" class="item fadeInUpBig animated">
					<image src="../../static/tab/pubIcon3.png" mode=""></image>
					<view>发布动态</view>
				</view>
			</view>
			<view class="iconfont icon-chacha">
				
			</view>
		</view>

		<view :style="'min-height:'+height+'px'">
			<Index @tonear='towantnears' ref='Index'  :style="{display:active==0?'block':'none'}"  ></Index>
			<FuJin ref='FuJin' :style="{display:active==1?'block':'none'}"></FuJin>
			<XiaoXi  :style="{display:active==3?'block':'none'}" ></XiaoXi>
			<My ref='My'  :style="{display:active==4?'block':'none'}" ></My>
		</view>
		<view class="tab">
			<view :class="active==0?'item active':'item'" @click="active=0">
				<view>
					<view style="font-size: 50upx;" class="iconfont icon-shouye2"></view>
				</view>
				<view>首页</view>

			</view>
			<view :class="active==1?'item active':'item'" @click="tofujin">
				<view>
					<view style="font-size: 50upx;" class="iconfont icon-hezuo"></view>
				</view>
				<view>附近</view>
			</view>
			<view class='item-add' @click="publishingLayer=true">
				<view>
					<image src="../../static/tab/add.png" mode=""></image>
				</view>
				<view class="text">发布</view>
			</view>
			<view :class="active==3?'item active':'item'" @click="toxiaoxi">
				<view>
					<view style="font-size: 50upx;" class="iconfont icon-xiaoxi"></view>
				</view>
				<view>消息</view>
			</view>
			<view :class="active==4?'item active':'item'" @click="newMyInfo">
				<view>
					<view style="font-size: 50upx;" class="iconfont icon-wode"></view>
				</view>
				<view>我的</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Index from '../tabcomponts/index.vue'
	import My from '../tabcomponts/my.vue'
	import XiaoXi from '../tabcomponts/xiaoxi.vue'
	import FuJin from '../tabcomponts/fujin.vue'
	export default {
		components: {
			My,
			Index,
			XiaoXi,
			FuJin
		},
		onShow(){
			
			let pages = getCurrentPages();
			let currPage = pages[pages.length-1];	
			if(currPage.data.suppliesData){	
				this.$refs.FuJin.getnewlist(currPage.data.suppliesData)
				currPage.setData({
					suppliesData:''
				})
				
			}
			if(currPage.data.wantData){
				this.$refs.FuJin.getnewwantbuy(currPage.data.wantData)
				currPage.setData({
					wantData:''
				})
				
			}
			this.$refs.My.init()
		},
		data() {
			return {
				publishingLayer:false,
				active: 0,
				height: 0
			}

		},
		methods: {
			towantnears(){
				if(this.$store.state.token){
					this.active=1
					this.$refs.FuJin.wantNearto()
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
			tofujin(){
				if(this.$store.state.token){
					this.active=1
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
			newMyInfo(){
				this.$refs.My.init()
				this.active=4
			},
			toxiaoxi(){
				this.active=3
				// const dcRichAlert = uni.requireNativePlugin('DCloud-RichAlert');  
				// dcRichAlert.show({
				// 	 position: 'bottom',
				// 	 title: "提示信息",
				// 	 titleColor: '#FF0000',
				// 	 content: "<a href='https://uniapp.dcloud.io/' value='Hello uni-app'>uni-app</a> 是一个使用 Vue.js 开发跨平台应用的前端框架!\n免费的\n免费的\n免费的\n重要的事情说三遍",
				// 	 contentAlign: 'left',
				// 	 checkBox: {
				// 		 title: '不再提示',
				// 		 isSelected: true
				// 	 },
				// 	 buttons: [{
				// 		 title: '取消'
				// 	 }, {
				// 		 title: '否'
				// 	 }, {
				// 		 title: '确认',
				// 		 titleColor: '#3F51B5'
				// 	 }]
				// }, result => {
				// 	 console.log(result)
				// });
			},
			
			onReachBottom(e){
				if(this.active == 0){
					this.$refs.Index.getData()
				}
			},
			torelease(e){
				if(this.$store.state.token){
					uni.navigateTo({
						url:e
					})
					this.publishingLayer = false
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
					this.publishingLayer = false
				}
				
				
			}
			
		},
		onLoad: function() {
			
			uni.getSystemInfo({
				success: res => {
					this.height = res.screenHeight;

				}
			})
			if(this.$store.state.token){
				
				 uni.subscribePush({  
				        provider: 'mipush',  
				        success:  (res)=> {  
				            this.$myhttp.post(this.websiteUrl+'/my/clientid/'+encodeURIComponent(res.clientid),'',(res)=>{
				            	console.log(res)
				            },this)
				        }  
				    });
				uni.getLocation({
					type:'gcj02',
					success: res => {
						this.$myhttp.put(this.websiteUrl+'/my/shops/location',{
							lat:res.latitude,
							lon:res.longitude
						},()=>{
							
						},this)
					}
				})
			}
		},
		onPullDownRefresh(){
			if(this.active == 1){
				this.$refs.FuJin.news()
			}else{
				uni.stopPullDownRefresh()
			}
		},
	}
</script>

<style>
	@import "../../common/icon.css";

	.statusBar {
		height: var(--status-bar-height);
	}

	.swiper-item {
		display: flex;
		width: 100%;
		text-align: center;
		background-color: #00BFFF;
		justify-content: center;
		align-items: center;
	}

	.uni-icon {
		margin-top: 0;
		color: #929292;
	}

	.tab {
		position: fixed;
		z-index: 999;
		height: 170upx;
		width: 100%;
		bottom: 0;
		background-image: url('../../static/tab/tabbg.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		display: flex;

	}

	.tab .item-add {
		width: 20%;
		color: #929292;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		position: relative;
		text-align: center;
	}

	.tab .item-add image {
		width: 90upx;
		height: 90upx;
		margin-top: 10upx;
	}


	.item-add .text {
		font-size: 24px;
		/* padding-top: 10px; */
	}

	.tab .item {
		width: 20%;
		color: #929292;
		font-size: 24px;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		margin-top: 50upx;
	}

	.active {
		color: #b4eeeb !important;
	}

	.active .iconfont {
		color: #00dcba;
	}

	.publishingLayer {
		position: fixed;
		left: 0;
		width: 100%;
		
		z-index: 3100;
	}
	.publishingLayer .mask{
		width: 100%;
		height: 100%;
		background: #000;
		opacity: 0.8;
		position: absolute;
		top: 0;
		left: 0;
	}
	.publishingLayer .backs {
		width: 100upx;
		height: 100upx;
		background: #fff;
	}
	.publishingLayerList{
		position: absolute;
		bottom: 180upx;
		display: flex;
		justify-content: space-around;
		width: 100%;
	}
	.publishingLayerList .item{
		width: 134upx;
		text-align: center;
	}
	.publishingLayerList image{
		width: 134upx;
		height: 100upx;
	}
	.publishingLayerList .item view{
		color: #fff;
		font-size:30upx;
		line-height: 50upx;
	}
	.publishingLayer .iconfont{
		position: absolute;
		bottom: 10upx;
		width: 100%;
		text-align: center;
		font-size: 24upx;
		color: #fff;
	}
</style>
