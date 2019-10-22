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
		
		
		<view class="header">
			<view class="header-top">
				<view @touchstart="back" class="headerTopLeft">
					<span class='iconfont icon-fanhui'></span>
				</view>
				<view @click="toIntegralRule" class="headerTopRight">
					积分规则
				</view>
			</view>
			<view class="nowIntegral">
				<view class="nowIntegralItem1">{{item1List.points}}</view>
				<view class="nowIntegralItem2">当前积分</view>
			</view>
			
			<view class="showMain">
				<view class="tabOut">
					<view @click="activetab=1" :class="activetab==1?'active':''" class="tab-item">
						赚积分
						<i v-if="activetab==1"></i>
					</view>
					<view @click="activetab=2" :class="activetab==2?'active':''" class="tab-item">
						花积分
						<i v-if="activetab==2"></i>
					</view>
					<view @click="activetab=3" :class="activetab==3?'active':''" class="tab-item">
						积分明细
						<i v-if="activetab==3"></i>
					</view>
				</view>
			
				<view v-show="activetab==1" class="intergralItem1">
					<view  class="intergralPage1Item">
						<view class="page1Tit1">
							每日签到
						</view>
						<view class="page1Tit2">
							+3
						</view>
						<view v-if="!item1List.checkIn" @click="qiandao"  class="page1Tit3">
							签到
						</view>
						<view v-else class="page1Tit3Active">
							已签到
						</view>
					</view>
					<view class="intergralPage1Item">
						<view class="page1Tit1">
							每日登录
						</view>
						<view class="page1Tit2">
							+5
						</view>
						<view v-if="!item1List.signIn"  class="page1Tit3">
							登录
						</view>
						<view v-else class="page1Tit3Active">
							已登录
						</view>
					</view>
					
					
					<view class="intergralPage1Item">
						<view class="page1Tit1">
							每日分享
						</view>
						<view class="page1Tit2">
							+5
						</view>
						<view @click.stop="shareDetailsShow" v-if="!item1List.share"  class="page1Tit3">
							立即分享
						</view>
						<view v-else  class="page1Tit3Active">
							已分享
						</view>
					</view>
					
					
					
					<view class="intergralPage1Item">
						<view class="page1Tit1">
							个人认证
						</view>
						<view class="page1Tit2">
							+30
						</view>
						<view @click="tourl('../Authentication/realNamebg?title=个人认证&src=https://img.hm8848.com/APP/auimg.png&url=realName')" v-if="!item1List.hasIdCard"  class="page1Tit3">
							立即认证
						</view>
						<view  v-else class="page1Tit3Active">
							已认证
						</view>
					</view>
					
					<view class="intergralPage1Item">
						<view class="page1Tit1">
							企业认证
						</view>
						<view class="page1Tit2">
							+30
						</view>
						<view @click="tourl('../Authentication/realNamebg?title=企业认证&src=https://img.hm8848.com/APP/auimg2.png&url=enterprise')" v-if="!item1List.hasBusinessLicense"  class="page1Tit3">
							立即认证
						</view>
						<view v-else class="page1Tit3Active">
							已认证
						</view>
					</view>
					
					
					<view class="intergralPage1Item">
						<view class="page1Tit1">
							诚信认证
						</view>
						<view class="page1Tit2">
							+200
						</view>
						<view @click="tourl('../Authentication/realNamebg?title=诚信认证&src=https://img.hm8848.com/APP/auimg4.png&url=../pay/pay?type=sincerity')" v-if="!item1List.isMember"  class="page1Tit3">
							立即认证
						</view>
						<view   v-else class="page1Tit3Active">
							已认证
						</view>
					</view>
					
					<view class="intergralPage1Item">
						<view class="page1Tit1">
							发布供应
						</view>
						<view class="page1Tit2">
							+5
						</view>
						<view @click="tourl('../release/retrieval?type=supply')" v-if="!item1List.pubSupply"  class="page1Tit3">
							立即发布
						</view>
						<view v-else class="page1Tit3Active">
							已发布
						</view>
					</view>
					
					<view class="intergralPage1Item">
						<view class="page1Tit1">
							发布求购
						</view>
						<view class="page1Tit2">
							+10
						</view>
						<view @click="tourl('../release/retrieval?type=want')" v-if="!item1List.pubPurchase"   class="page1Tit3">
							立即发布
						</view>
						<view v-else class="page1Tit3Active">
							已发布
						</view>
					</view>
					
					<view class="intergralPage1Item">
						<view class="page1Tit1">
							充值10元
						</view>
						<view class="page1Tit2">
							+100
						</view>
						<view @click="topay(100)" class="page1Tit3">
							立即充值
						</view>
						
					</view>
					
					
					<view class="intergralPage1Item">
						<view class="page1Tit1">
							现在充值，9折优惠
						</view>
						<view class="page1Tit2">
							+1000
						</view>
						<view @click="topay(1000)" class="page1Tit3">
							立即充值
						</view>
						
					</view>
					
					<view class="intergralPage1Item">
						<view class="page1Tit1">
							感恩回馈，限时8折
						</view>
						<view class="page1Tit2">
							+5000
						</view>
						<view  @click="topay(5000)" class="page1Tit3">
							立即充值
						</view>
					
					</view>
					
				</view>
				
				
				<view v-show="activetab==2" class="intergralItem1">
					<view class="intergralPage1Item">
						<view class="page1Tit1">
							查看求购电话
						</view>
						<view class="page1Tit2">
							-10
						</view>
						<view class="page1Tit2">
							查看一次
						</view>
					</view>
					<view class="intergralPage1Item">
						<view class="page1Tit1">
							刷新供应
						</view>
						<view class="page1Tit2">
							-5
						</view>
						<view class="page1Tit2">
							刷新一次  
						</view>
					</view>
					<view class="intergralPage1Item">
						<view class="page1Tit1">
							全网推广 
						</view>
						<view class="page1Tit2">
							-？
						</view>
						<view class="page1Tit2">
							 咨询客服 
						</view>
					</view>
					<view class="intergralPage1Item">
						<view class="page1Tit1">
							开通VIP  
						</view>
						<view class="page1Tit2">
							-？
						</view>
						<view class="page1Tit2">
							 咨询客服
						</view>
					</view>
				</view>
				<view style="height:1024upx;" v-show="activetab==3" class="intergralItem1">
					<view v-if="!lists.arrs.length && lists.times" class="nodata">
							没有任何数据哦～
					</view>
				
					<you-scroll style="height:100%;color:#000000;" @onPullDown="onNewSupplies"  @onLoadMore="getList('')"  v-if="lists.arrs.length">
						<view v-for="(item,index) in lists.arrs" :key='index' class="intergralPage1Item">
							<view class="page1Tit1">
								{{item.remarks}}
							</view>
							<view class="page1Tit2">
								{{(item.amount > 0)?'+'+item.amount:item.amount}}
							</view>
							<view class="page1Tit2">
								{{item.getTimes}}
							</view>
						</view>
						
					</you-scroll>
					<view class="more">{{lists.loadingText}}</view>
				</view>
				
				
				
				
				
			</view>
			
			
			
		</view>
	</view>
</template>

<script>
	import youScroll from '../components/you-scroll'
	export default{
		components:{
			youScroll
		},
		onLoad(){
			this.getList()
		},
		onShow(){
			this.$myhttp.get(this.websiteUrl+'/my','',(res)=>{
			
				this.id = res.data.data.user.id
				this.shareObj.nickName = res.data.data.user.nickname
				this.shareObj.id = res.data.data.user.id
				this.shareObj.mainBusiness = res.data.data.shop.mainBusiness
			},this)
			this.init()
			
		},
		data(){
			return{
				shareObj:{
					nickName:'',
					mainBusiness:'',
					id:''
				},
				shareDetailsDis:false,
				id:'',
				activetab:1,
				actives:1,
				item1List:{
					"signIn": false,
					"checkIn": false,
					"share": false,
					"hasIdCard": false,
					"hasBusinessLicense": false,
					"isMember": false,
					"pubSupply": false,
					"pubPurchase": false,
					"pubNews": false
				},
				lists:{
					arrs:[],
					Total:0,
					start:0,
					length:30,
					loadingText:'已全部加载完毕',
					times:0,
					loading:false
				}
			}
		},
		methods:{
			topay(num){
				uni.navigateTo({
					url:'../pay/pay?type=points&num='+num
				})
			},
			shareDetailsNone(){
				this.shareDetailsDis = false
			},
			shareDetailsShow(){
				this.shareDetailsDis = true
			},
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
						// this.shareDetailsDis = false
				    }
				});
			},
			tourl(e){
				uni.navigateTo({
					url:e
				})
			},
			qiandao(){
				this.$myhttp.post(this.websiteUrl+'/my/checkin','',(res)=>{
					this.lists={
						arrs:[],
						Total:0,
						start:0,
						length:30,
						loadingText:'已全部加载完毕',
						times:0,
						loading:false
					}
					this.init()
					this.getList('')
					uni.showToast({
						icon:'none',
						title:'+3'
					})
					
				})
				
			},
			onNewSupplies(done){

				this.lists={
					arrs:[],
					Total:0,
					start:0,
					length:30,
					loadingText:'已全部加载完毕',
					times:0,
					loading:false
				}
				this.getList(()=>{
					done()
				})
			},
			getTime(e){
				var date = new Date(e)
				var year = date.getFullYear() + '-' + this.addzero((date.getMonth() + 1)) + '-' + this.addzero(date.getDate()) 
				return year
			},
			addzero(str) {
			    if (str < 10) {
			      return "0" + str
			    } else {
			      return str
			    }
			  },
			getList(fn){
				if(this.lists.loading){
					fn && fn()
					return
				}
				this.lists.loading = true
				if (this.lists.Total !== 0) {
					if (this.lists.Total == this.lists.arrs.length) {
						this.lists.loadingText = '已全部加载完毕'
						fn && fn()
						return
					}
				}
				this.lists.loadingText = '上拉加载更多'
				this.$myhttp.get(this.websiteUrl+'/my/points?start='+ this.lists.start +'&length=' + this.lists.length, '', (res) => {
						var res = res.data.data
				
						this.lists.Total =res.totalCount
						if (res.items.length) {
							var info = res.items
							info.forEach((item) => {
								item.getTimes =  this.getTime(item.time)
							})
							this.lists.start += res.items.length
							this.lists.arrs = this.lists.arrs.concat(info)
							
							if (this.lists.Total !== 0) {
								if (this.lists.Total == this.lists.arrs.length) {
									this.lists.loadingText = '已全部加载完毕'
									fn && fn()
									return
								}
							}
						
						} else {
							this.lists.loadingText = '已全部加载完毕'
						}
						fn && fn()
						this.lists.times++
						this.lists.loading = false
					},this)
				
			},
			init(){
				this.$myhttp.get(this.websiteUrl+'/my/points/stat','',(res)=>{
					this.item1List = res.data.data
				})
			},
			
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			toIntegralRule(){
				var url = encodeURIComponent('https://help.hm8848.com/img.html?img=./images/13.jpeg')
				uni.navigateTo({
					url:'../help/help?url='+url
				})
			}
		}
	}
</script>

<style>
	.header{
		width:100%;
		height: 404upx;
		background: url(../../static/shop/shopbg.png) no-repeat;
		background-size:100% 100%;
		padding-top: var(--status-bar-height);
		position: relative;
		color: #fff;
	}
	.header-top{
		display: flex;
		justify-content: space-between;
		height: 84upx;
		line-height: 84upx;
	}
	.headerTopLeft span{
		font-size: 40upx;
		display: block;
		width: 84upx;
		height: 84upx;
		text-align: center;
	}
	.headerTopRight{
		padding-right: 20upx;
	}
	.nowIntegral{
		margin-top: 40upx;
		text-align: center;
	}
	.nowIntegralItem1{
		font-size: 48upx;
		font-weight: bold;
	}
	.nowIntegralItem2{
		font-size: 23upx;
	}
	.showMain{
		position:absolute;
		height: 1124upx;
		top: calc( var(--status-bar-height) + 298upx);
		left: 50%;
		transform: translateX(-50%);
		background: #fff;
		width: 717upx;
		border-radius:16upx;
	}
	.tabOut{
		width: 100%;
		text-align: center;
		color: #a6a6a6;
		display: flex;
	}
	.tabOut .tab-item{
		width: 33.33%;
		height: 100upx;
		line-height: 100upx;
		font-size: 30upx;
		position: relative;
	}
	.tabOut .tab-item.active{
		color: #363636;
	}
	.tabOut .tab-item i{
		display: block;
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 47upx;
		height: 4upx;
		background: #16c4af;
	}
	
	
	.intergralItem1{
		width: 100%;
	}
	.intergralPage1Item{
		width: 100%;
		height: 105upx;
		line-height: 105upx;
		color: #4f4f4f;
		font-size: 26upx;
		text-align: center;
		display: flex;
	}
	.intergralPage1Item>view{
		width: 33.33%;
	}
	.intergralPage1Item .page1Tit3{
		width: 130upx;
		height: 50upx;
		line-height: 50upx;
		border-radius: 4upx;
		color: #11ba98;
		margin: 27upx auto;
		font-size: 23upx;
		border:1upx solid #11ba98;
	}
	.intergralPage1Item  .page1Tit3Active{
		width: 130upx;
		height: 50upx;
		line-height: 50upx;
		background: #eeeeee;
		border-radius: 4upx;
		color: #989898;
		margin: 27upx auto;
		font-size: 23upx;
		border:1upx solid #eee;
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
