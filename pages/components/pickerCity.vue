<template>
	<view class="wrp" :style="{height:heights+'px'}" v-if='dis' >
		<view class="bgs" @click="disnone"></view>
		<view class="sure" >
			<view class="cancel" @click="disnone">
				取消
			</view>
			<view @click="sures" class="sures">
				确定
			</view>
		</view>
		<view class="aa">
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
		</view>

	</view>
</template>

<script>
	import {
		areas
	} from '../Authentication/areas.js'
	export default {
		props:{
			dis:Boolean
		},
		created() {
			uni.getSystemInfo({
				success: (res) => {
					this.heights = res.windowHeight
				}
			});
			let view = uni.createSelectorQuery().select(".aa");
			view.fields({
				size: true,
				scrollOffset: true
			}, data => {
				console.log(JSON.stringify(data))
				//this.bot = data.height
			}).exec();
			this.province = areas.filter((item) => {
				if (!item.parentId) {
					return item
				}
			})
			this.changecity()
			this.changearea()
		},
		data() {

			return {
				heights: '',
				title: 'picker-view',
				province: [],
				city: [],
				area: [],
				value: [0, 0, 0],
				oldvalue: [0, 0, 0],
				visible: true,
			
				indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`
			}
		},
		methods: {
			sures(){
				var city = this.province[this.value[0]].name +'-' +this.city[this.value[1]].name+'-'+this.area[this.value[2]].name
				var id = this.area[this.value[2]].id

			
				this.$emit('choosecitys',{city,id})
				this.$emit('watchs')
			},
			disnone(){
				this.dis = false
				this.$emit('watchs')
			},
			changecity() {
				this.city = areas.filter((item) => {
					var id = this.province[this.value[0]].id
					if (id == item.parentId) {
						return item
					}
				})

			},
			changearea() {
				this.area = areas.filter((item) => {
					var id = this.city[this.value[1]].id
					if (id == item.parentId) {
						return item
					}
				})
			},
			bindChange: function (e) {
					const val = e.detail.value
					this.value = e.detail.value
					console.log(this.value)
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
	.sure {
		width: 100%;
		height: 80upx;
		background: #fff;
		z-index: 1000;
		line-height: 80upx;
		position: absolute;
		display: flex;
		justify-content: space-between;
		font-size: 30upx;
		bottom: 500upx;
	}

	.sure>view {
		width: 130upx;
		text-align: center;
		height: 100%;
	}

	.wrp {
		width: 100%;
		position: fixed;
		top: 0;
		height: 0;
		z-index: 1000;
	}

	.bgs {
		width: 100%;
		height: 100%;
		background: #000000;
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0.7;
		z-index: 1000;
	}

	.pickers {
		text-align: center;
		width: 100%;
		height: 500upx;
		position: absolute;
		z-index: 1000;
		background: #fff;
		bottom: 0;
	}
</style>
