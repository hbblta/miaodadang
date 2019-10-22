<template>
	<view>
		<view class="xTitle">
			消息
		</view>
		<view @click="totongzhi" class="xiaoxiItem">
			<view class="mains">
				<view class="xiaoMainLeft">
					<image src="../../static/tab/xiaoXi1.png" mode=""></image>
				</view>
				<view class="xiaoMainRight">
					<view class="xiaoMainRightItem1">
						<view class="mianTiele">
							<view class="title1">
								系统消息
							</view>
							<view class="logos">
								官方
							</view>
						</view>
						<view class="time">
							{{time1}}
						</view>
					</view>
					<view class="xiaoMainRightItem2 overs">
						苗搭档最新通知 
					</view>
				</view>
			</view>
		</view>
		<view class="xiaoxiItem">
			<view class="mains">
				<view class="xiaoMainLeft">
					<image src="../../static/tab/xiaoXi2.png" mode=""></image>
				</view>
				<view class="xiaoMainRight">
					<view class="xiaoMainRightItem1">
						<view class="mianTiele">
							<view class="title1">
								互动消息
							</view>
							<!-- <view class="logos">
								官方
							</view> -->
						</view>
						<view class="time">
							<!-- 07-18 18:09 -->
						</view>
					</view>
					<view class="xiaoMainRightItem2 overs">
						苗搭档客服关注了您
					</view>
				</view>
			</view>
		</view>
		<view @click="toguanzhu" class="xiaoxiItem">
			<view class="mains">
				<view class="xiaoMainLeft">
					<image src="../../static/tab/xiaoXi3.png" mode=""></image>
				</view>
				<view class="xiaoMainRight">
					<view class="xiaoMainRightItem1">
						<view class="mianTiele">
							<view class="title1">
								通讯录
							</view>
							<!-- <view class="logos">
								官方
							</view> -->
						</view>
						<!-- <view class="time">
							07-18 18:09
						</view> -->
					</view>
					<view class="xiaoMainRightItem2 overs">
						我关注的会员
					</view>
				</view>
			</view>
		</view>
		<view @click="tokefu" class="xiaoxiItem">
			<view class="mains">
				<view class="xiaoMainLeft">
					<image src="https://img.hm8848.com/APP/kf.jpg" mode=""></image>
				</view>
				<view class="xiaoMainRight">
					<view class="xiaoMainRightItem1">
						<view class="mianTiele">
							<view class="title1">
								苗搭档客服
							</view>
							<!-- <view class="logos">
								官方
							</view> -->
						</view>
						<!-- <view class="time">
							07-18 18:09
						</view> -->
					</view>
					<view class="xiaoMainRightItem2 overs">
						您好我是苗搭档客服，有什么问题可以咨询我
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		created(){
			this.getTime()
		},
		data(){
			return{
				time1:''
			}
		},	
		methods:{
			getTime(){
				var date = new Date()
				var year = date.getFullYear() + '/' + addzero((date.getMonth() + 1)) + '/' + addzero(date.getDate())
				this.time1 = year
				function addzero(str) {
				    if (str < 10) {
				      return "0" + str
				    } else {
				      return str
				    }
				  }
			},
			toguanzhu(){
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
					url:'../my/attentionList'
				})
			},
			totongzhi(){
				var url = encodeURIComponent('http://help.hm8848.com/Notice.html')
				uni.navigateTo({
					url:'../help/help?url='+url
				})
			},
			tokefu(){
			
				uni.navigateTo({
					url:'../help/member'
				})
			}
		}
	}
</script>

<style>
	.xTitle{
		padding-top:var(--status-bar-height);
		width: 100%;
		height: 110upx;
		font-size: 34upx;
		line-height: 110upx;
		text-align: center;
		font-weight: bold;
		border-bottom:1upx solid #f1f1f1;
	}
	.xiaoxiItem{
		padding: 20upx 0 10upx;
		border-bottom:1upx solid #f1f1f1;
		overflow: hidden;
	}
	.xiaoxiItem .mains{
		width: 666upx;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
	}
	.xiaoxiItem .xiaoMainLeft image{
		width: 98upx;
		height: 98upx;
	}
	.xiaoMainRight{
		width: 541upx;
	}
	.xiaoMainRightItem1{
		display: flex;
		justify-content: space-between;
		width: 100%;
	}
	.xiaoMainRightItem1 .mianTiele{
		display: flex;
	}
	.xiaoMainRightItem1 .mianTiele .title1{
		font-size: 30upx;
		line-height: 50upx;
	}
	.xiaoMainRightItem1 .mianTiele .logos{
		margin-top: 11.5upx;
		width: 54upx;
		height: 27upx;
		line-height: 27upx;
		margin-left: 15upx;
		font-size: 15upx;
		color: #65d0b6;
		border: 1upx solid #65d0b6;
		border-radius:13.5upx ;
		text-align: center;
	}
	.xiaoMainRightItem1 .time{
		font-size: 18upx;
		line-height: 50upx;
		color: #7d7d7d;
	}
	.xiaoMainRightItem2{
		width: 100%;
		color: #afafaf;
		font-size: 25upx;
	}
</style>
