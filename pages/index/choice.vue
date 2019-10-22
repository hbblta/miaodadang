<template>
	<view class='component'>
		<scroll-view scroll-y="true" class='componentLeft'>
		  <block v-for="(item,index) in category" :key="index">
			<view :class='categoryIndex==index?"on":""' class="Left-item" @click='levelNavigation(index)' >{{item.name}}</view>
		  </block>
		</scroll-view>
		<scroll-view  @scrolltolower='loadData'  scroll-y class='componentRight'>
			<block v-for="(item,index) in  child.arrs" :key="index">
			  <view class='Right-item' @click='finalChoice(index)' >
				  <view>{{item.showName?item.showName:item.name}}</view>
				  <icon v-if="showIndex==index" type="success_no_circle" color='#2196f3' size="20"/>
			  </view>
			</block>
			<view style="text-align: center;" v-if="category[categoryIndex].Child.length>child.length">上拉加载更多～</view>
		</scroll-view>
	</view>
</template>

<script>
	import categories from '../release/categories.js'
	export default{
		onLoad(){
			var arr = []
			arr.push({
				name:'全部',
				id:'',
				Child:[{
					name:'全部',
					id:''
				}]
			})
			for(let i = 0;i<categories.length;i++){
				if(!categories[i].parentId){
					var aa = JSON.stringify(categories[i])
					var obj1 = JSON.parse(aa)
					var obj =  JSON.parse(aa)
					obj1.showName = '全部'
					obj.Child = []
					obj.Child.push(obj1)
					arr.push(obj)
				}
			}
			for(let i = 0;i<categories.length;i++){
				for(let j=0;j<arr.length;j++){
					if(categories[i].parentId == arr[j].id){
						arr[j].Child.push(categories[i])
					}
				}
			}
			
			this.category = arr
			this.loadData()
		},
		data(){
			return{
				active:'',
				category: [],
				categoryIndex: 0,
				showIndex:'',
				child:{
					arrs:[],
					length:0,
					count:50
				}
			}
		},
		methods:{
			loadData(){
					var coun = this.category[this.categoryIndex].Child.length - this.child.length
					var obj = JSON.stringify(this.category[this.categoryIndex].Child)
					obj = JSON.parse(obj)
					if(coun>=this.child.count){
						var arr =  obj
						var arrs = arr.splice(this.child.length,this.child.count)
						this.child.arrs = this.child.arrs.concat(arrs)
						this.child.length+=this.child.count
					}else if((0 <= coun) && (coun <this.child.count)){
						
						var arr = obj
						var arrs = arr.splice(this.child.length,coun)
						this.child.arrs = this.child.arrs.concat(arrs)
						this.child.length+=coun
						
					}
			},
			levelNavigation(index){
				this.categoryIndex = index
				this.child={
					arrs:[],
					length:0,
					count:40
				}
				this.loadData()
			},
			finalChoice(index){
				this.showIndex = index
				var obj = {obj: this.category[this.categoryIndex].Child[index],times:1}
	
				var pages = getCurrentPages();
				var currPage = pages[pages.length - 1]; //当前页面
				var prevPage = pages[pages.length - 2]; //上一个页面
				prevPage.setData({
					liebieChoice:obj
				})
				uni.navigateBack();
				
				
				
			}
		}
	}
</script>

<style>
page{
  width: 100%;
  height: 100%;
}
.component{
  width: 100%;
  height: 100%;
  background: #fff;
  color: #333;
  font-size: 30upx;
  display: flex;
  justify-content: space-between;
}
.component scroll-view{
  line-height: 98upx;
  height: 100%;
}
.componentLeft{
  width: 40%;
  text-align: center;
  box-sizing: border-box;
}
.Left-item{
  height: 98upx;
  background: #f6f6f6;
}
.Left-item.on{
  border-left:10upx solid #2196f3;
  background: #fff; 
}
.componentRight{
  width: 60%;
}
.Right-item{
  box-sizing: border-box;
  padding: 0 28upx;
  display: flex;
  justify-content: space-between; 
}
.Right-item icon{
  width: 20px;
  height: 20px;
  margin-top: 49upx;
  transform: translateY(-50%);
}
</style>
