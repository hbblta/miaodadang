<template>
	<view>
		<view v-if="arr.length">
			<view @click="torunning(item)" v-for="item in arr" :key='item.id' class="listItem">
				<view class="main">
					<view class="listItemLeft">
						<view class="name">{{item.remarks}}</view>
						<view class="date">{{item.gettime}}</view>
					</view>
					<view class="listItemRight">
						<view :style="{color:item.amount>=0?'#4db640':'#CF2D28'}" class="shou">{{item.amount.toFixed(2)}}</view>
						
					</view>
				</view>
			</view>
		</view>
		<view v-if="!arr.length && times" class="nodata">
			没有任何数据哦～
		</view>
	</view>
</template>

<script>
	import getTime from '../../common/getTime.js'
	export default{
		onLoad(){
			this.$myhttp.get(this.websiteUrl+'/my/balancehistories?start=0&length=999','',(res)=>{
				console.log(res)
				var info = res.data.data.items
				info.forEach(item=>{
					item.gettime = getTime(item.time)
				})
				this.arr = info
				this.times++
			},this)
		},
		methods:{
			torunning(item){
				uni.setStorage({
					key:'runningdetails',
					data:JSON.stringify(item),
					success(){
						uni.navigateTo({
							url:'runningWater'
						})
					}
				})
			}
		},
		data(){
			return{
				arr:[],
				times:0
			}
		}
	}
</script>

<style>
	.listItem{
	
		width: 100%;
		padding: 30rpx 0 22rpx;
		border-bottom:1rpx solid #efefef;
	}
	.main{
		width: 670rpx;
		margin: 0 auto;
		font-size: 22rpx;
		color: #b5b5b5;
		display: flex;
		justify-content: space-between;
	}
	.main .name{
		font-size: 30rpx;
		color: #000;
		margin-bottom: 10rpx;
	}
	.main .listItemRight{
		font-size: 26rpx;
		color: #4db640;
		line-height: 70rpx;
	}
	.nodata{
		margin-top: 350upx;
		font-size: 30upx;
		color: #999;
		text-align: center;
	}
</style>
