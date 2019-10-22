<template>
	<view>
		<view class="item">
			<view >订单号</view>
			<view class="right">{{obj.id}}</view>
		</view>
		<view class="item">
			<view >商品名称</view>
			<view class="right">{{obj.remarks}}</view>
		</view>
		<view class="item">
			<view >金额</view>
			<view class="right">{{obj.amount.toFixed(2)}}</view>
		</view>
		<view v-if="obj.payType" class="item">
			<view >支付方式</view>
			<view class="right">{{obj.payType}}</view>
		</view>
		<view class="item">
			<view >时间</view>
			<view class="right">{{obj.gettime}}</view>
		</view>
	</view>
</template>

<script>
	export default{
		onLoad(){
			uni.getStorage({
				key:'runningdetails',
				success:(e)=>{
					this.obj = JSON.parse(e.data)
				}
			})
		},
		data(){
			return{
				obj:{
					id:"",
					remarks:"",
					amount:"",
					gettime:""
				}
			}
		}
	}
</script>

<style>
	.item{
		width: 673upx;
		margin: 0 auto;
		line-height: 80upx;
		font-size: 30upx;
		color: #cccccc;
		display: flex;
		justify-content: space-between;
	}
	.item .right{
		color: #4d4d4d;
	}
</style>
