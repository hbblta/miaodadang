<template>
	<view>
        <view class="uni-padding-wrap">
            <view class="uni-title">地区：{{province[value[0]].name}} {{city[value[1]].name}} {{area[value[2]].name}}</view>
        </view>
        <picker-view class="pickers" v-if="visible" :indicator-style="indicatorStyle" :value="value" @change="bindChange">
            <picker-view-column>
                <view class="item" v-for="(item,index) in province" :key="index">{{item.name}}</view>
            </picker-view-column>
            <picker-view-column>
                <view class="item" v-for="(item,index) in city" :key="index">{{item.name}}</view>
            </picker-view-column>
            <picker-view-column>
                <view class="item" v-for="(item,index) in area" :key="index">{{item.name}}</view>
            </picker-view-column>
        </picker-view>
		<view @tap="sure" class="footer">立即认证</view>
    </view>
</template>

<script>
	import {areas} from './areas.js'
	export default{
		created(){
			this.province = areas.filter((item)=>{
				if(!item.parentId){
					return item
				}
			})
			this.height = Math.round(uni.getSystemInfoSync().screenWidth/(750/100))+'px'
			this.changecity()
			this.changearea()
		},
		 data() {
				return {
					province:[],
					city:[],
					area:[],
					title: 'picker-view',
					value: [0,0,0],
					oldvalue:[0,0,0],
					visible: true,
					indicatorStyle: ` height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`
				}
			},
			methods: {
				sure(){
						
						this.$myhttp.post(this.websiteUrl+'/agencies/applications',{
							 areaId:this.area[this.value[2]].id
						},(res)=>{
								console.log(JSON.stringify(res))
								uni.showToast({
									icon:'success',
									title:'上传成功'
									})
									setTimeout(()=> {
										uni.navigateBack({
											delta:2
										})
									}, 1000);
						},this)
				},
				changecity(){
					this.city = areas.filter((item)=>{
						var id = this.province[this.value[0]].id
						if(id == item.parentId){
							return item
						}
					})
					
				},
				changearea(){
					this.area = areas.filter((item)=>{
						var id = this.city[this.value[1]].id
						if(id == item.parentId){
							return item
						}
					})
				},
				bindChange: function (e) {
					const val = e.detail.value
					this.value = e.detail.value
					
					if(!(this.oldvalue[0] == this.value[0])){
						this.changecity()
						this.value[1] = 0
						this.changearea()
						this.value[2] = 0
						this.oldvalue = this.value
						return
					}
					if(!(this.oldvalue[1] == this.value[1])){
						this.changearea()
						this.value[2] = 0
						this.oldvalue = this.value
						return
					}
					
				}
			}
	}
</script>

<style>
	.pickers{
		width: 100%;
		height: 500upx;
	}
	.item{
		text-align: center;
		font-size: 30upx;
		line-height: 100upx;
	}
	.footer{
		width: 711upx;
		height: 105upx;
		line-height: 105upx;
		background: linear-gradient(to right,#17c5af,#20cdb2,#37e0b9,#3fe9bb);
		color: #fff;
		font-size: 44upx;
		text-align: center;
		border-radius: 10upx;
		position: fixed;
		left:50%;
		transform: translateX(-50%);
		bottom:35upx;
	}
</style>
