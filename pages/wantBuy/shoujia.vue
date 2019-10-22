<template>
	<view>
		<view class="header">
			<view class="headerItem1">
				{{obj.details.name}}
			</view>
			<view class="headerItem2">
				<view class="headerItem2Left">采购数量:
				<span v-if='obj.quantity'>{{obj.quantity}}{{obj.details.unit}}</span>
				<span v-else>若干</span>
				
				</view>
				<view class="headerItem2Right">共收到: <span style='color:#0ab7a3;'>{{obj.quotations}}条</span>报价</view>
			</view>
			<view class="headerItem3">
				截止日期:{{obj.expires}}
			</view>
		</view>
		<view class="main">
			<view @click="toshops(item.userId)" v-for="(item,index) in arr" :key='index' class="mianItem">
				<view class="mianItem1">
					<view class="prices overs">
						<view class="overs" v-if="item.price">
							{{item.price}}<span style='font-size:20upx;'>元/{{obj.details.unit}}</span>
						</view>
						<view v-else>
							面议
						</view>
						
					</view>
					<view class="midname">
						<view class="names overs">{{item.nickName}}</view>
						<view class="icon-grounp">
							<view  v-if="item.agencies.length" style=";background:#1dae2d;">
								服
							</view>
							<view v-if="item.rank == 7"  style="background:#b9227f;">
								冠
							</view>
							<view v-if="item.rank == 6"  style="background:#2b6cd0;">
								钻
							</view>
							<view v-if="item.rank == 5"  style="background:#ffa523;">
								金
							</view>
							<view v-if="item.isMember" style="background:#ed7f40;">
								诚
							</view>
							<view  v-if="item.hasBusinessLicense" style="background:#38d3cb;">
								企
							</view>
							<view v-if="item.hasIdCard" style="background:#019fa2;">
								实
							</view>
						</view>
					</view>
					<view  v-if='item.photos.length' class="lookbigImg">
						<view @click.stop="showImg(item.photos)" class="innerImg">
							<view >查看大图</view>
						</view> 
						<!-- 查看大图 -->
					</view>
				</view>
				<view class="mianItem2">
					<view class="mianItem2Left">{{item.payTerm==1?'上车价':'到货价'}}</view>
					<view class="mianItem2Mid overs">
						{{item.address}}
					</view>
					<view  v-if="item.loc" class="mianItem2Right overs">
						<span style='font-size: 25upx;' class='iconfont icon-weizhi1'></span>
						{{item.loc}}
					</view>
				</view>
			</view>
			<view class="pad"></view>
		</view>
		
		<view class="footer">
			<view :style="{background:obj.online?' linear-gradient(to right,#17c4b0,#1ac8b1,#28d2b5,#36e0b9,#3fe9bc)':'#999'}" @click="lowers">结束报价</view>
		</view>
	</view>
</template>

<script>
	export default{
		onLoad(){
			this.getMyloctions()
			
			
		},
		onShow(){
			
			
		},
		data(){
			return{
				location :{
					longitude: '',
					latitude: ''
				},
				arr:[],
				obj:{
					quantity:'',
					quotations:'',
					expires:'',
					details:{
						name:'',
						unit:''
					}
				}
			}
		},
		methods:{
			toshops(id){
				uni.navigateTo({
					url:'../shops/shop?id='+id
				})
			},
			lowers(){
				if(!this.obj.online){
					return
				}
				uni.showModal({
					title: '提示',
					content: '确定要结束'+this.obj.details.name+'报价么',
					success:  (res)=> {
						if (res.confirm) {
							this.$myhttp.put(this.websiteUrl+'/purchases/'+this.obj.id+'/offline','',(res)=>{
								
								uni.showToast({
									icon:'success',
									title:'下线成功'
								})
								setTimeout(function(){
									uni.navigateBack({
										delta:2
									})
								},1000)
							},this)
						} 
					}
				})
			},
			showImg(item){
				var arr = []
				for(let i = 0;i<item.length;i++){
					arr.push(item[i].url)
				}
				uni.previewImage({
					urls:arr
				});
			},
			getMyloctions() {
				uni.getLocation({
					type:'gcj02',
					success: res => {
						this.location = {
							longitude: res.longitude,
							latitude: res.latitude
						}
						console.log(this.location)
						uni.getStorage({
							key: 'baojia',
							success:(res)=>{
								this.obj = JSON.parse(res.data)
								this.$myhttp.get(this.websiteUrl+'/purchases/'+this.obj.id+'/quotations?start=0&length=100','',(res)=>{
									var info = res.data.data.items
									info.forEach(item =>{
										item.loc = this.getlocation(item.latitude, item.longitude)
									})
									this.arr = info
									
								},this)
							}
						})
					},
					fail:()=>{
						uni.getStorage({
							key: 'baojia',
							success:(res)=>{
								this.obj = JSON.parse(res.data)
								this.$myhttp.get(this.websiteUrl+'/purchases/'+this.obj.id+'/quotations?start=0&length=100','',(res)=>{
									var info = res.data.data.items
									info.forEach(item =>{
										item.loc = this.getlocation(item.latitude, item.longitude)
									})
									this.arr = info
									
								},this)
							}
						})
					}
				});
			},
			getlocation(latitude, longitude) {
				if (!this.location.latitude) {
					return ''
				}
				var La1 = latitude * Math.PI / 180.0;
				var Lo1 = longitude;
				var La2
				var Lo2
				var earthRadius = 6371;
				Lo2 = this.location.longitude
				La2 = this.location.latitude * Math.PI / 180.0;
				var La3 = La1 - La2;
				var Lb3 = Lo1 * Math.PI / 180.0 - Lo2 * Math.PI / 180.0;
				var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(
					Lb3 / 2), 2)));
				s = s * 6378.137; //地球半径
				s = parseInt(Math.round(s * 10000) / 10); //距离计算添加对象
				return (s / 1000).toFixed(2) + '公里'
			},
		}
	}
</script>

<style>
	page{
		background: #f6f6f6;
	}
	.header{
		width: 100%;
		height: 197upx;
		background: #fff;
		margin:2upx 0 22upx;
		box-sizing: border-box;
		overflow: hidden;
	}
	.header>view{
		margin: 0 auto;
		width: 675upx;
		
	}
	.header .headerItem1{
		margin: 30upx auto 10upx;
		font-weight: bold;
		font-size: 27upx;
		color: #333;
	}
	.headerItem2{
		display: flex;
		font-size: 25upx;
		line-height: 53upx;
	}
	.headerItem2Left{
		width: 360upx;
	}
	.headerItem3{
		font-size: 25upx;
		line-height: 53upx;
	}
	.mianItem{
		height: 180upx;
		border-bottom:#f6f6f6 solid 1upx;
		background: #fff;
		width: 100%;
		line-height: 58upx;
		overflow: hidden;
	}
	.mianItem>view{
		height: 58upx;
		width: 680upx;
		margin: 0 auto;
	}
	.mianItem .mianItem1{
		margin-top: 38upx;
		display: flex;
	}
	.mianItem .mianItem1 .prices{
		font-size: 32upx;
		color: #14c5b1;
		width: 197upx;
		font-weight: bold;
	}
	.midname{
		display: flex;
		width: 298upx;
	}
	.midname .names{
		max-width: 149upx;
		font-size: 30upx;
	}
	.icon-grounp{
		   margin-left: 26upx;
		   display: flex;
		   margin-top: 16upx;
	   }
	 .icon-grounp>view{
			 text-align: center;
			 width: 26upx;
			 height: 26upx;
			 color: #fff;
			 font-size: 20upx;
			 border-radius:5upx;
			 line-height: 26upx;
			 margin-right: 9upx;
			margin-top: 4upx;
	}
	.lookbigImg{
		width: 100upx;
		height: 41upx;
		margin: 8upx;
		
		position: relative;
	}
	.lookbigImg .innerImg{
		position: absolute;
		top: -40upx;
		left: 0;
		height: 150upx;
		z-index: 1000;
		width: 200upx;
		background: transparent;
	}
	.lookbigImg .innerImg view{
		width: 100upx;
		height: 41upx;
		background: #24bf9f;
		color:#fff;
		font-size: 24upx;
		border-radius:5upx ;
		text-align: center;
		line-height: 41upx;
		margin-left: 55upx;
		position: relative;
		margin-top: 35upx;
	}
	.mianItem2{
		display: flex;
	}
	.mianItem2Left{
		width: 197upx;
		font-size: 33upx;
	}
	.mianItem2Mid{
		width: 298upx;
		font-size: 33upx;
	}
	.mianItem2Right{
		font-size: 24upx;
		color: #999;
		width: 163upx;
		text-align: right;
	}
	.footer{
		position: fixed;
		bottom: 0;
		height: 160upx;
		z-index: 100;
		background: #fff;
		width: 100%;
	}
	.pad{
		height: 160upx;
	}
	.footer view{
		text-align: center;
		width: 710upx;
		height: 100upx;
		margin: 30upx auto;
		color: #fff;
		line-height: 100upx;
		border-radius:10upx;
		font-size: 38upx;
		background: linear-gradient(to right,#17c4b0,#1ac8b1,#28d2b5,#36e0b9,#3fe9bc);
	}
</style>
