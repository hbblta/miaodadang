<template>
	<view>
		<view class="header">
			<view @click="totabs" class="iconfont icon-chacha"></view>
			<image src="../../static/login/logo.png" class="logo" mode=""></image>
			<view class="slogan">
				<view class="sloganItem1">恭喜你!发布成功</view>
				<view v-if="mode=='supply'" class="sloganItem2">您的供应信息将立即</view>
				<view v-else class="sloganItem2">平台审核过后</view>
				<view v-if="mode=='supply'" class="sloganItem3">展示在供应大厅</view>
				<view v-else class="sloganItem3">会通知供应商</view>
			</view>
			<view class="btngroup">
				<view @click="tourl('../index/supplyList?return=index')" v-if="mode=='supply'" class="btn">查看供应</view>
				<view @click="tourl('../index/wantBuy?return=index')"  v-else  class="btn">查看求购</view>
				<view @click="tourl('../mySupply/mySupply?return=index')" v-if="mode=='supply'" style="border: 1upx solid #23be9f;color: #23be9f;" class="btn">管理供应</view>
				<view @click="tourl('../myPurchase/myPurchase?return=index')"  v-else style="border: 1upx solid #23be9f;color: #23be9f;" class="btn">管理求购</view>
				<view @click="torelease" style="border: 1upx solid #ffa859;color: #ffa859;" class="btn">继续发布</view>
			</view>
		</view>
		<view class="center">
			<view class="title">
				- 分享朋友圈，生意在身边 -
			</view>
			<view class="share">
				<image @click.stop="sharesweixin('WXSceneSession')" src="../../static/release/weixin1.jpeg" mode=""></image>
				<image @click.stop="sharesweixin('WXSenceTimeline')"  src="../../static/release/weixin2.jpeg" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		onLoad(e){
			this.mode = e.mode
			this.$myhttp.get(this.websiteUrl+'/my','',(res)=>{
				this.shareObj.nickName = res.data.data.user.nickname
				this.shareObj.id = res.data.data.user.id
				this.shareObj.mainBusiness = res.data.data.shop.mainBusiness
			},this)
		},
		data(){
			return{
				mode:'supply',
				shareObj:{
					nickName:'',
					mainBusiness:'',
					id:''
				}
			}
		},
		methods:{
			sharesweixin(type){
				uni.share({
				    provider: "weixin",
				    scene: type,
				    type: 0,
					title:this.shareObj.nickName + '的苗店 -- 点击关注',
					imageUrl:'https://img.hm8848.com/APP/152x152.png',
					href:'https://m.miaodadang.com/shop?id='+this.shareObj.id,
				    summary:`主营:${this.shareObj.mainBusiness}`,
				    success:  (res)=> {
						if(this.$store.state.token){
							this.$myhttp.post(this.websiteUrl+'/my/share','',(res)=>{
							})
						}
						this.shareDetailsDis = false
				    },
				    fail:  (err)=> {
						this.shareDetailsDis = false
				    }
				});
			},
			tourl(e){
				uni.navigateTo({
					url:e
				})
			},
			totabs(){
				uni.redirectTo({
					url:'../tabs/tabs'
				})
			},
			torelease(){
				uni.navigateTo({
					url:'retrieval?type='+this.mode+"&return=index"
				})
				
			}
		}
	}
</script>

<style>
	.header{
		margin-top:var(--status-bar-height);
		padding-bottom: 75upx;
		border: 1upx solid #f0f0f0;
	}
	.icon-chacha{
		font-size: 40upx;
		margin: 30upx 0 86upx 30upx;
	}
	.logo{
		width: 246upx;
		height: 300upx;
		margin: 0 auto 54upx;
		display: block;
	}
	.slogan{
		text-align: center;
	}
	.sloganItem1{
		font-size: 40upx;
		color: #20be9f;
	}
	.sloganItem2{
		margin-top: 40upx;
		font-size: 24upx;
		color: #7f7b7b;
	}
	.sloganItem3{
		font-size: 24upx;
		color: #7f7b7b;
		margin-bottom: 60upx;
	}
	.btngroup{
		display: flex;
		justify-content: space-around;
	}
	.btngroup .btn{
		width: 200upx;
		height: 70upx;
		border: 1upx solid #f0f0f0;
		color: #696969;
		text-align: center;
		border-radius: 36upx;
		line-height: 72upx;
		font-size: 32upx;
	}
	.title{
		margin: 78upx 0 50upx;
		text-align: center;
		font-size: 28upx;
		color: #2a2b2a;
	}
	.share{
		display: flex;
		width: 300upx;
		justify-content: space-between;
		margin: 0 auto;
	}
	.share image{
		width: 96upx;
		height: 96upx;
	}
</style>
