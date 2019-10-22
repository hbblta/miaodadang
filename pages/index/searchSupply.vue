<template>
	<view  >
		<view class="pad"></view>
		<view class="headerout">
				<view class="header">
			<view class="iconfont icon-sousuo"></view>
			<input focus v-model="value" 	ref="input" @input="onchange" type="text"   placeholder="搜索品种名称"/>
			<view @click="clears" class="iconfont icon-shanchu"></view>
		</view>
		</view>
	
		<view   v-if="chooseList.length" class="searchResult">
			<view @touchmove="inputno" @tap.stop="tosupply(item)" v-for="(item,index) in chooseList" :key='index'  class="searchResultItem">
				<view  v-html='item.html'>
					
				</view>
			</view>
		</view>
		<view class="center">
			<view class="title">
				<image src="../../static/release/commonNames.png" mode=""></image>
				<view >常用名称</view>
			</view>
			<view class="commonLists">
				<view @tap="tosupply(item)" v-for="(item,index) in arrs" :key='index' class="commonListsItem">
					{{item.name}}
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	import categories from '../release/categories.js'
	export default{
			 
			 data() {
			 	return {
					arrs:[{
						id: "30538",
						name: "国槐",
						parentId: "637",
						sort: 10,
						unit: "颗"
					},{
						id: "30533",
						name: "桂花",
						parentId: "637",
						sort: 9,
						unit: "颗"
					},{
						id: "31202",
						name: "银杏",
						parentId: "637",
						sort: 18,
						unit: "颗"
					},{
						id: "31140",
						name: "香樟",
						parentId: "637",
						sort: 7,
						unit: "颗"
					},{
						id: "31568",
						name: "法桐",
						parentId: "637",
						sort: 10,
						unit: "颗"
					},{
						id: "31608",
						name: "紫薇",
						parentId: "637",
						sort: 14,
						unit: "颗"
					},{
						id: "31205",
						name: "樱花",
						parentId: "637",
						sort: 19,
						unit: "颗"
					},{
						id: "31309",
						name: "白蜡",
						parentId: "637",
						sort: 7,
						unit: "颗"
					}
					],
					categoriesArr:{},
					chooseList:[],
			 		value:'',
					type:''
			 	}
			 },
			 onLoad(e){

				for(let i=0;i<categories.length;i++){
					this.categoriesArr[categories[i].id] = categories[i]
				}
			 },
			 methods:{
				 tosupply(item){
					 var objs = item
					 delete objs.html
					uni.navigateTo({
						url:'./supplyList?id='+objs.id+'&name='+objs.name
					})
				 },
				 inputno(){
					 //#ifdef APP-PLUS
					 plus.key.hideSoftKeybord()
					//#endif
					
				 },
				 clears(){
							this.chooseList = []
							this.value = ''
							//#ifdef APP-PLUS
							 plus.key.hideSoftKeybord()
							//#endif
							uni.pageScrollTo({
								scrollTop: 0,
								duration: 0
							});
				 },
				 onchange(e){
					var val = e.target.value
					if(val){
						var info =  categories.filter((item)=>{
							if(item.parentId){
								if(item.name.indexOf(val) !== -1 ){
										if(item.parentId){
											 var parents = this.categoriesArr[item.parentId]
											 var names = parents.name+'-->'+ item.name
											 item.html = names.replace(val,'<span style="color:#85dbca;">'+val+'</span>');
										}else{
											item.html = item.name.replace(val,'<span style="color:#85dbca;">'+val+'</span>');
										}
										return item
										
								}
							}
						
							
						})
						this.chooseList = info
						if(!this.chooseList.length){
							
							uni.pageScrollTo({
								scrollTop: 0,
								duration: 0
							});
						}
					}
					
					
				 }
			 }
	}
</script>

<style>
	.pad{
		height: 48upx;
		width: 100%;
		background: #fff;
		position: fixed;
		top:0;
		z-index: 1001;
	}
	.headerout{
		position: fixed;
		top:48upx;
		width: 100%;
		height: 82upx;
		background: #fff;
		z-index: 1001;
	}
	.header{
		width: 682upx;
		height: 82upx;
		border: 1upx solid #e0e0e0;
		border-radius:25upx;
		line-height: 82upx;
		display: flex;
		
		margin: 0 auto;
	}
	.header .icon-sousuo{
		font-size:24upx;
		width: 56upx;
		text-align: center;
	}
	.header .icon-shanchu{
		font-size:24upx;
		text-align: center;
		color: #cccccc;
	}
	.header input{
		display: inline-block;
		width: 569upx;
		height: 50upx;
		margin-top: 16upx;
		font-size: 28upx;
		
	}
	.searchResult{
		position: absolute;
		top: 133upx;
		width: 100%;
		background:#fff;
		left: 0;
		z-index: 1000;
		min-height:80vh;
	}
	.searchResultItem{
		height: 100upx;
		box-sizing: border-box;
		padding-left: 35upx;
		line-height: 100upx;
		border-bottom:1upx solid #f7f7f7;
		font-size: 28upx;
	}
	.center {
		position: fixed;
		top: 180upx;
		width: 100%;
	}
	.center .title{
		display: flex;
		line-height: 57upx;
		font-size: 32upx;
		margin:  0 0 26upx;
	}
	.center image{
		margin: 0 22upx 0 40upx;
		width: 57upx;
		height: 57upx;
	}
	.commonLists{
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		text-align: center;
		border-top: 1upx solid #f6f6f6;
	}
	.commonLists .commonListsItem{
		font-size: 22upx;
		width: 25%;
		height: 94upx;
		line-height: 94upx;
		border-bottom: 1upx solid #f6f6f6;
		position: relative;
	}
	.commonLists .commonListsItem:after{
		position: absolute;
		content: '';
		display: block;
		width: 1upx;
		height: 58upx;
		background: #CCCCCC;
		top: 50%;
		transform: translateY(-50%);
		right: 0;
	}
	
</style>