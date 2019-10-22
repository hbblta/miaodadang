<template>
	<view class="my">
		<view class="header">
			<view class="header-top">
				<view class="top-information" @tap="tologin">
					<view class="top-information-left">
						<view class="maininfo" >
							<image :src="user.avatarUrl?user.avatarUrl:'../../static/my/user.jpeg'"></image>
							<view v-if="token" class="namephone">
								<view class="name">{{user.nickname}}</view>
								
								<view style="display: flex;">
									<view class="phone">
										<span class='iconfont icon-shouji'></span>
										{{user.mobile}}
									</view>
									<view style="margin-left:10upx;margin-top:18upx;font-size: 25upx;line-height:36upx;">
									 	{{user.huiyuan}}
									</view>
								</view>
								
							</view>
							<view v-else class="namephone nologin">
								点击登陆
							</view>
						</view>
						<view>
							<span class='iconfont icon-xiayibu'></span>
						</view>
					</view>
				</view>
				<view class="top-list">
					<view @click="tourl('../my/collectFootprints?id=1')" class="top-list-item">
						<view class="top-list-itemnum">{{user.markedSupplies}}</view>
						<view class="">收藏夹</view>
					</view>
					<view  v-show="time && !cheshi" @click="tourl('../my/integral')" class="top-list-item">
						<view class="top-list-itemnum">{{user.points}}</view>
						<view class="">积分</view>
					</view>
					<view @click="tourl('../my/collectFootprints?id=2')" class="top-list-item">
						<view class="top-list-itemnum">{{user.tracks}}</view>
						<view class="">足迹</view>
					</view>
					<view @click="tourl('../my/attentionList')" class="top-list-item">
						<view class="top-list-itemnum">{{user.follows}}</view>
						<view class="">关注</view>
					</view>
				</view>
			</view>
			
			<view class="header-bottom">
				<view class="header-bottom-title">
					工具箱
				</view>
				<view class="header-bottom-list">
					<view @click="tourl('../mySupply/mySupply')" class="header-bottom-item">
						<image src="../../static/my/mygong1.png" mode=""></image>
						<view >我的供应</view>
					</view>
					<view @click="tourl('../myPurchase/myPurchase')"  class="header-bottom-item">
						<image src="../../static/my/mygong2.png" mode=""></image>
						<view >我的求购</view>
					</view>
					<view @click="tourl('../wantBuy/quotationCenter')" class="header-bottom-item">
						<image src="../../static/my/mygong8.png" mode=""></image>
						<view >报价中心</view>
					</view>
					<view v-show="time && !cheshi"  @click="tourl('../vip/index')" class="header-bottom-item">
						<image src="../../static/my/mygong4.png" mode=""></image>
						<view >会员通道</view>
					</view>
					<view  @click="tourl('../shops/shop?id='+user.id)" class="header-bottom-item">
						<image src="../../static/my/mygong5.png" mode=""></image>
						<view >我的店铺</view>
					</view>
					<view  @click="tourl('../mystate/index')" class="header-bottom-item">
						<image src="../../static/my/mygong6.png" mode=""></image>
						<view >我的动态</view>
					</view>
					<view @click="tourl('../my/wallet')"  class="header-bottom-item">
						<image src="../../static/my/mygong7.png" mode=""></image>
						<view >我的钱包</view>
					</view>
					<view @click="tourl('../Authentication/index')" class="header-bottom-item">
						<image src="../../static/my/mygong3.png" mode=""></image>
						<view >平台认证</view>
					</view>
				</view>
			</view>
			
		</view>
		
		<view class="footer">
			<view class="footer-item" @click="notokenUrl('../help/help?url=http://help.hm8848.com/')">
				<view class="footer-item-left">
					<image src="../../static/my/footer1.png" mode=""></image>
					常见问题
				</view>
				<view class="footer-item-right">
					<span class='iconfont icon-xiayibu'></span>
				</view>
			</view>
			<view @click="notokenUrl('../help/member')" class="footer-item">
				<view class="footer-item-left">
					<image src="../../static/my/footer2.png" mode=""></image>
					在线客服
				</view>
				<view class="footer-item-right">
					<span class='iconfont icon-xiayibu'></span>
				</view>
			</view>
			<view @click="calls"  class="footer-item">
				<view class="footer-item-left">
					<image src="../../static/my/footer3.png" mode=""></image>
					客服电话
				</view>
				<view class="footer-item-right">
					<span class='iconfont icon-xiayibu'></span>
				</view>
			</view>
			<view  @click="notokenUrl('../help/shezhi')" class="footer-item">
				<view class="footer-item-left">
					<image src="../../static/my/footer4.png" mode=""></image>
					系统设置
				</view>
				<view class="footer-item-right">
					<span class='iconfont icon-xiayibu'></span>
				</view>
			</view>
			<view  @click="notokenUrl('../my/fankui')" class="footer-item">
				<view class="footer-item-left">
					<image src="../../static/my/footer5.png" mode=""></image>
					意见和建议
				</view>
				<view class="footer-item-right">
					<span class='iconfont icon-xiayibu'></span>
				</view>
			</view>
		</view>
		<view class="pad"></view>
	</view>
</template>

<script>
	export default {
		
		created(){
			this.$http.get(this.websiteUrl+'/login/method?version='+plus.runtime.version,'',(res)=>{
				this.cheshi = res.data.data
				this.time++
			})
			setTimeout(()=> {
				this.time++
			}, 1500);
			this.token = this.$store.state.token
			this.init()
		},
		
		data(){
			return{
				cheshi:false,
				time:0,
				token:'',
				user:{
					avatarUrl:'',
					nickname:'',
					mobile:'',
					"markedSupplies": 0,
					"points": 0,
					"tracks": 0,
					"follows": 0,
					huiyuan:""
				}
			}
		},
		methods:{
			init(){
				if(this.$store.state.token){
					this.$myhttp.get(this.websiteUrl+'/my','',(res)=>{
						console.log(res)
						this.user = res.data.data.user
						this.user.markedSupplies = res.data.data.markedSupplies
						this.user.points = res.data.data.points
						this.user.tracks = res.data.data.tracks
						this.user.follows = res.data.data.follows
						this.user.huiyuan = ''
						if(res.data.data.shop.rank == 5){
							this.user.huiyuan = '黄金会员'
						}else if(res.data.data.shop.rank == 6){
							this.user.huiyuan = '钻石会员'
						}else if(res.data.data.shop.rank == 7){
							this.user.huiyuan = '皇冠会员'
						}
					},this)
				}else{
					this.token = ''
					this.user={
						avatarUrl:'',
						nickname:'',
						mobile:'',
						"markedSupplies": 0,
						"points": 0,
						"tracks": 0,
						"follows": 0
					}
				}
			},
			noopen(){
				uni.showToast({
					icon:'none',
					title:'暂未开放'
				})
			},
			calls(){
				uni.makePhoneCall({
					phoneNumber: '057982060602' //仅为示例
				})
			},
			notokenUrl(e){
				uni.navigateTo({
						url:e
					})
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
			},
			tologin(){
				
				if(this.$store.state.token){
					uni.navigateTo({
						url:'../shops/edit'
					})
				}else{
				
					uni.navigateTo({
							url:'../login/login1'
					})	
				}
			}
			
			
		}
	}
</script>

<style scoped>
.my{
		background-color: #f6f6f6;
}
.header{
	position: relative;
	height: calc(920upx + var(--status-bar-height));
}
.header-top{
	padding-top:var(--status-bar-height);
	height: 444upx;
	width: 100%;
	background-image: url("../../static/my/mybg.png");
	background-repeat: no-repeat;
	background-size: 100% 100%;
	overflow: hidden;
}
.top-information{
	height: 128upx;
	margin-top: 80upx;
}
.top-information-left{
	display: flex;
	justify-content: space-between;
}
.top-information-left image{
	width: 114upx;
	height: 114upx;
	border-radius:50%;
	border:4upx solid #fff;
	margin:  0 18upx 0 34upx;
}
.maininfo{
	display: flex;
	color: #fff;
}
.namephone.nologin{
	line-height: 114upx;
}

.namephone .name{
	font-size: 40upx;
	width:300px;
	overflow:hidden;
	text-overflow:ellipsis;
	white-space:nowrap;
}
.namephone .phone{
	margin-top: 18upx;
	width: 195upx;
	height: 36upx;
	opacity: 0.7;
	background: #34c0a7;
	border-radius:18upx;
	font-size: 23upx;
	line-height: 36upx;
}
.namephone .phone span{
	margin: 0 8upx;
}
.icon-xiayibu{
	color: #fff;
	font-size: 32upx;
	line-height: 128upx;
	margin-right: 20upx;
}
.top-list{
	margin-top: 36upx;
	color: #fff;
	font-size: 35upx;
	display: flex;
	width: 100%;
}
.top-list-item{
	width: 25%;
	text-align: center;
	position: relative;
}
.top-list-itemnum{
	font-size: 40upx;
}
.top-list-item:after{
	width: 2upx;
	height: 52upx;
	background: #8ce9e0;
	content: "";
	position: absolute;
	right: 0;
	top: 50%;
	transform: translateY(-50%);
}
.header-bottom{
	width: 711upx;
	height: 550upx;
	position: absolute;
	top: calc(370upx + var(--status-bar-height));
	left: 50%;
	transform: translateX(-50%);
	background: #fff;
	border-radius:20upx ;
}
.header-bottom-title{
	width: 673upx;
	margin: 0 auto;
	padding: 25upx 0;
	color: #000000;
	font-weight: 600;
	border-bottom: 1upx solid #e8e8e8;
	font-size: 30upx;
}
.header-bottom-list{
	width: 673upx;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
}
.header-bottom-item{
	width: 145upx;
	text-align: center;
	color: #666;
	font-size: 29upx;
	margin-top: 35upx;
	margin-bottom: 56upx;
}
.header-bottom-item image{
	width: 99upx;
	height: 99upx;
	
}
.footer{
	margin: 30upx auto;
	width: 711upx;
	height: 638upx;
	background: #fff;
	border-radius:20upx;
}
.footer-item{
	color: #333a43;
	height: 120upx;
	line-height: 120upx;
	border-bottom:1upx solid #dfe4e8;
	font-size: 32upx;
	display: flex;
	justify-content: space-between;
}
.footer-item image{
	width: 44upx;
	height: 44upx;
	margin: 0 22upx 0 25upx;
	vertical-align: middle;
	margin-top: -8upx;
}
.footer-item-right span{
	color: #c9c9c9;
}
.footer-item:nth-of-type(5){
	border-bottom: none;
}
.pad{
		padding-bottom: 160upx;
	}
</style>
