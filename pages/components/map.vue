<template>
	<view>
		<view class="inputs">
			<view :style="{margin:dis?'10upx 0 0 20upx':'10upx auto'}" class="outinput">
				<input @input='changeArr' :style="{width:dis?'500upx':'600upx'}" @focus='dis=true'  v-model="value" placeholder="搜索地点" type="text">
				<span @tap='value=""' v-if="value"  class="iconfont icon-shanchu"></span>
			</view>
			<view v-if="dis" @tap="romove" class="remove">取消</view>
		</view>
		<scroll-view v-if="dis" class="search" scroll-y>
			<view @tap="chooseAddress(index)"  v-for="(item,index) in keyWordArr" :key='index' class="choose-item">
				<view class="overs title">
					{{item.title}}
				</view>
				<view class="overs tit">
					{{item.tit}}
				</view>
			</view>
			
		</scroll-view>
		<map  v-show="!dis" id="navmap"  style="width: 100%; height:600upx;" :latitude="latitude" :longitude="longitude" :markers="covers">
		</map>
		<scroll-view v-if="!dis" class="choose" scroll-y>
			<view @tap="nearIndex(index)" v-for="(item,index) in nearbyList" :key='index' class="choose-item">
				<view class="overs title">
					{{item.title}}
				</view>
				<view class="overs tit">
					{{item.tit}}
				</view>
				<span v-if="nearshowIndex==index"  class='iconfont icon-dui'>
					
				</span>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				keyWordArr:[],
				nearshowIndex:0,
				nearbyList:[],
				dis:false,
				value:'',
				latitude:0,
				longitude:0,
				covers:[{
					longitude:0,
					latitude:0,
					iconPath:"/static/weizhi.png"
				}],
				nmap:''
			}
		},
		onLoad(e){
			this.latitude = e.lat;
			this.longitude = e.lng;
			this.covers[0].longitude = e.lng
			this.covers[0].latitude  = e.lat
			this.near()
		},
		onReady(){
			this.nmap = uni.createMapContext("navmap",this).$getAppMap();
			this.nmap.onclick = (res)=>{
				this.covers[0].longitude = res.longitude;
				this.covers[0].latitude  = res.latitude;
			
				this.nearbyList = []
				this.near()
			}
		},
		onNavigationBarButtonTap(e){
			var pages = getCurrentPages();
			var currPage = pages[pages.length - 1]; //当前页面
			var prevPage = pages[pages.length - 2]; //上一个页面
			var tit 
			if(this.nearshowIndex==0){
				tit = this.nearbyList[this.nearshowIndex].tit
			}else{
				tit = this.nearbyList[this.nearshowIndex].tit+this.nearbyList[this.nearshowIndex].title
			}
			prevPage.setData({
				objloc:{
					longitude:this.nearbyList[this.nearshowIndex].longitude,
					latitude:this.nearbyList[this.nearshowIndex].latitude,
					address:tit
				}
			})
			 uni.navigateBack();
		},
		methods: {
			
			chooseAddress(index){
				this.latitude = this.keyWordArr[index].latitude;
				this.longitude = this.keyWordArr[index].longitude;
				this.covers[0].longitude = this.keyWordArr[index].longitude;
				this.covers[0].latitude  = this.keyWordArr[index].latitude;
				this.value = ''
				this.dis = false
				this.nearshowIndex = 0
				uni.hideKeyboard()
				this.near()
				this.nmap = uni.createMapContext("navmap",this).$getAppMap();
				this.nmap.onclick = (res)=>{
					console.log(111)
					this.covers[0].longitude = res.longitude;
					this.covers[0].latitude  = res.latitude;
					this.nearbyList = []
					this.near()
				}
			},
			changeArr(e){
				var keyword = e.detail.value
				setTimeout(()=>{
					this.keyWordArr = []
					this.$myhttp.get(this.websiteUrl+"/geocoder/suggestion?keyword="+encodeURIComponent(keyword),'',(res)=>{
						var info = res.data
						if(info.status == 0){
							var data = info.data
							var len = data.length
							for(let i=0;i<len;i++){
								var obj = {
									title:data[i].title,
									tit:data[i].address,
									longitude:data[i].location.lng,
									latitude:data[i].location.lat
								}
								this.keyWordArr.push(obj)
							}
						}else{
							uni.showToast({
								icon:'none',
								title:'请求超时',
							})
						}
					})
				},500)
				
			},
			nearIndex(index){
				this.nearshowIndex = index
			},
			romove(){
				this.dis = false
				this.value = ''
				uni.hideKeyboard()
			},
			near(){
			
				this.$myhttp.get(this.websiteUrl+'/geocoder/address?lng='+this.covers[0].longitude+"&lat="+this.covers[0].latitude,'',(res)=>{
					
					var obj = {
						title:'我的位置',
						tit:res.data.address,
						longitude:res.data.location.lng,
						latitude:res.data.location.lat
					}
					this.nearbyList.unshift(obj)
				})
				this.$myhttp.get(this.websiteUrl+"/geocoder/search?lng="+this.covers[0].longitude+"&lat="+this.covers[0].latitude+"&keyword= ",'',(res)=>{
					var info = res.data
					if(info.status == 0){
						var data = info.data
						var len = (data.length>=10)?10:data.length
						for(let i=0;i<len;i++){
							var obj = {
								title:data[i].title,
								tit:data[i].address,
								longitude:data[i].location.lng,
								latitude:data[i].location.lat
							}
							this.nearbyList.push(obj)
						}
					}else{
						uni.showToast({
							icon:'none',
							title:'请求超时',
						})
					}
				})
			}
		},

	}
</script>

<style>
	.inputs{
		height: 100upx;
		width: 100%;
		overflow: hidden;
		display: flex;
		justify-content: space-between;
	}
	.outinput{
		width: 700upx;
		height: 80upx;
		margin: 10upx auto;
		position: relative;
		
	}
	.inputs input{
		width: 600upx;
		height: 80upx;
		line-height: 80upx;
		display: block;
		background: #F1F1F1;
		border-radius:40upx ;
		font-size: 30upx;
		padding: 0 60upx 0 40upx;
		color: #000;
	}
	.outinput .icon-shanchu{
		position: absolute;
		right: 20upx;
		font-size: 30upx;
		top: 25upx;
		color: #999;
	}
	.search{
		height:calc( 100vh - 100upx );
		background: #fff;
		width: 100%;
	}
	.remove{
		font-size: 30upx;
		width: 150upx;
		text-align: center;
		line-height: 100upx;
	}
	.choose{
		height:calc( 100vh - 700upx );
		width: 100%;
	}
	.choose-item{
		width: 720upx;
		margin-left: 30upx;
		height: 120upx;
		border-bottom: 2upx solid #F1F1F1;
		position: relative;
	}
	.choose-item .icon-dui{
		position: absolute;
		right: 20upx;
		font-size: 30upx;
		top: 45upx;
		color: #06BF04;
	}
	.title{
		width: 80%;
		font-size: 32upx;
		font-weight: bold;
		color: #000;
		line-height: 60upx;
	}
	.tit{
		width: 80%;
		font-size: 30upx;
		color: #999;
	}
</style>
