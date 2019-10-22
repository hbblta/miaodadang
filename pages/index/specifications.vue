<template>
	<view>
		<view class="header" v-for="(item,index) in infos" :key='index'>
			<view v-if="item.attributeType ==  'group'" class="headerItem">
				<view class="itemLeft">
					{{item.name}}
				</view>
				<view class="itemRight">
					<view @click="choiceArr(item.arrs,index)" class="choice">
						<view class="choice-left">
							<view style="color: #000000;">{{item.arrs[item.index].name}}</view>
						</view>
						<view class="choice-right">

						</view>
					</view>

					<view v-if="item.arrs[item.index].attributeType ==  'select'" style="margin-top: 30upx;" class="itemRight">
						<view @click="choice(item.options)" class="choice">
							<view class="choice-left">
								<view>请选择{{item.name}}</view>
							</view>
							<view class="choice-right">

							</view>
						</view>
					</view>

					<view v-if="item.arrs[item.index].attributeType ==  'range'" style="margin-top: 30upx;" class="itemRight">
						<view class="inputGroup">
							<view class="input1">
								<input @input="changeArrmin($event,index)" v-model="item.arrs[item.index].min" type="number"  />
								<view>{{item.arrs[item.index].unit?item.arrs[item.index].unit:''}}</view>
							</view>
							-
							<view class="input2">
								<input v-model="item.arrs[item.index].max" type="number"  />
								<view style="margin-right: 20upx;">{{item.arrs[item.index].unit?item.arrs[item.index].unit:''}}</view>
							</view>
						</view>
					</view>


					<view v-if="item.arrs[item.index].attributeType ==  'input'" style="margin-top: 30upx;" class="itemRight">
						<view class="bigInput">
							<input v-model="item.arrs[item.index].values" type="number">
							<view>{{item.unit?item.unit:''}}</view>
						</view>
					</view>


				</view>

			</view>


			<view v-if="item.attributeType ==  'select'" class="headerItem">
				<view class="itemLeft">
					{{item.name}}
				</view>
				<view class="itemRight">
					<view @click="choice(item.options,index)" class="choice">
						<view class="choice-left">
							<view style="color: #000;" v-if="item.selectText">{{item.selectText}}</view>
							<view v-else>请选择{{item.name}}</view>


						</view>
						<view class="choice-right">

						</view>
					</view>
				</view>
			</view>
			<view v-if="item.attributeType ==  'range'" class="headerItem">
				<view class="itemLeft">
					{{item.name}}
				</view>
				<view class="itemRight">
					<view class="inputGroup">
						<view class="input1">
							<input @input="minchanges($event,index)" v-model="item.min" type="number" value="" />
							<view>{{item.unit?item.unit:''}}</view>
						</view>
						-
						<view class="input2">
							<input v-model="item.max"  type="number"  />
							<view style="margin-right: 20upx;">{{item.unit?item.unit:''}}</view>
						</view>
					</view>
				</view>
			</view>
			<view v-if="item.attributeType ==  'input'" class="headerItem">
				<view class="itemLeft">
					{{item.name}}
				</view>
				<view class="itemRight">
					<view class="bigInput">
						<input v-model="item.values" type="number">
						<view>{{item.unit?item.unit:''}}</view>
					</view>
				</view>
			</view>
		</view>
		<view @click="sure" class="footer">
			确定
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				infos: [],
				val:''
			}
		},
		onLoad(e) {
				
				var res = JSON.parse(e.info)
				var varieties = []
				for (let i = 0; i < res.length; i++) {
					if (res[i].group) {
						varieties.push(res[i].group)
					}
					if (res[i].attributeType == "select") {
						res[i].selectValue = ''
						res[i].selectText = ''
					}
					if (res[i].attributeType == "range") {
						res[i].min = ''
						res[i].max = ''
					}
					if (res[i].attributeType == "input") {
						res[i].values = ''
					}
				}
				var newVarieties = varieties.filter((item, index) => {
					return varieties.indexOf(item) === index
				})
				for (let i = 0; i < newVarieties.length; i++) {
					var obj = {
						attributeType: 'group',
						name: newVarieties[i],
						arrs: [],
						index: 0,

					}
					for (let j = 0; j < res.length; j++) {
						if (res[j].group == newVarieties[i]) {
							obj.arrs.push(res[j])
							obj.isRequired = res[j].isRequired
						}
					}
					this.infos.push(obj)
				}
				for (let i = 0; i < res.length; i++) {
					if (!res[i].group) {

						this.infos.push(res[i])
					}
				}
		
			
		},
		methods: {
			changeArrmin(e, index) {
				this.infos[index].arrs[this.infos[index].index].max = e.target.value
			
			},
			minchanges(e, index) {
				this.infos[index].max = e.target.value
				
			},
			choiceArr(e, index) {
				//#ifdef APP-PLUS
				plus.key.hideSoftKeybord()
				//#endif
				var list = []
				for (let i = 0; i < e.length; i++) {
					list.push(e[i].name)
				}
				uni.showActionSheet({
					itemList: list,
					success: (res) => {
						this.infos[index].index = res.tapIndex
					},
					fail: function(res) {
						console.log(res.errMsg);
					},
					complete(){
						//#ifdef APP-PLUS
				plus.key.hideSoftKeybord()
				//#endif
					}
				});
			},
			choice(e, index) {
				//#ifdef APP-PLUS
				plus.key.hideSoftKeybord()
				//#endif
				console.log(e)
				var arr = JSON.parse(e)
				var list = []
				for (let i = 0; i < arr.length; i++) {
					list.push(arr[i].text)
				}
				uni.showActionSheet({
					itemList: list,
					success: (res) => {
						this.infos[index].selectValue = arr[res.tapIndex].value
						this.infos[index].selectText = arr[res.tapIndex].text
						
					},
					fail: function(res) {
						console.log(res.errMsg);
					},
					complete(){
						//#ifdef APP-PLUS
						plus.key.hideSoftKeybord()
						//#endif
					}
				});
			},
			sure() {
				console.log(this.infos)
				let arr = []
				for (let i = 0; i < this.infos.length; i++) {
					var obj = {
						name:'',
						isRequired: false,
						id: '',
						value: '',
						text: ''
					}
					if (this.infos[i].attributeType == 'group') {
						obj.name =  this.infos[i].arrs[this.infos[i].index].name
						obj.isRequired = this.infos[i].arrs[this.infos[i].index].isRequired
						obj.id = this.infos[i].arrs[this.infos[i].index].id
						if (this.infos[i].arrs[this.infos[i].index].attributeType == 'range') {
							obj.value = [this.infos[i].arrs[this.infos[i].index].min, this.infos[i].arrs[this.infos[i].index].max]
							obj.text = this.infos[i].arrs[this.infos[i].index].min + '-' + this.infos[i].arrs[this.infos[i].index].max
						} else if (this.infos[i].arrs[this.infos[i].index].attributeType == 'select') {
							obj.value = this.infos[i].arrs[this.infos[i].index].selectValue
							obj.text = this.infos[i].arrs[this.infos[i].index].selectText
						} else {
							obj.value = this.infos[i].arrs[this.infos[i].index].values
							obj.text = this.infos[i].arrs[this.infos[i].index].values
						}
					} else if (this.infos[i].attributeType == 'range') {
						obj.name =  this.infos[i].name
						obj.isRequired = this.infos[i].isRequired
						obj.id = this.infos[i].id
						obj.value = [this.infos[i].min, this.infos[i].max]
						obj.text = this.infos[i].min + '-' + this.infos[i].max
					} else if (this.infos[i].attributeType == 'select') {
						obj.name =  this.infos[i].name
						obj.isRequired = this.infos[i].isRequired
						obj.id = this.infos[i].id
						obj.value = this.infos[i].selectValue
						obj.text = this.infos[i].selectText
					} else {
						obj.name =  this.infos[i].name
						obj.isRequired = this.infos[i].isRequired
						obj.id = this.infos[i].id
						obj.value = this.infos[i].values
						obj.text = this.infos[i].values
					}
					arr.push(obj)
				}
				let arrs = []
				for (let i = 0; i < arr.length; i++) {

					
				if (arr[i].value instanceof Array) {
						if (arr[i].value[0]) {
							arrs.push(arr[i])
						}
				}else{
					if (arr[i].text) {
						arrs.push(arr[i])	
					}
				}
			}
	
			var obj ={
				val:[],
				times:1
			}
			for(let i = 0;i<arrs.length;i++){
				var objs = {
					id:arrs[i].id,
					value:arrs[i].value
				}
				obj.val.push(objs)
			}
			
			uni.removeStorage({
				key: 'specifications'
			})
			if(obj.val.length){
				var pages = getCurrentPages();
				var currPage = pages[pages.length - 1]; //当前页面
				var prevPage = pages[pages.length - 2]; //上一个页面
				prevPage.setData({
					specificationChoice:obj.val
				})
				uni.navigateBack();
			}else{
				uni.navigateBack({
					delta:1
				})
			}
			
			
		}
	}
	}
</script>

<style>
	.header {
		margin-top: 27upx;
	}

	.headerItem {
		display: flex;
		margin-bottom: 30upx;
	}

	.itemLeft {
		width: 180upx;
		text-align: center;
		font-size: 30upx;
		color: #a7a7a7;
		line-height: 72upx;
	}

	.choice {
		width: 540upx;
		height: 70upx;
		border: 1upx solid #dddddd;
		display: flex;
		position: relative;
	}

	.choice-left {
		line-height: 72upx;
		font-size: 30upx;
		color: #cecece;
		margin-left: 25upx;
	}

	.choice-left.active {
		color: #333;
	}

	.choice-right {
		top: 28upx;
		right: 25upx;
		position: absolute;
		border-top: #000 solid 8upx;
		border-left: transparent solid 8upx;
		border-right: transparent solid 8upx;
		border-bottom: solid 8upx transparent;
	}

	.inputGroup {
		width: 540upx;
		display: flex;
		justify-content: space-between;
		font-size: 30upx;
		line-height: 70upx;

	}

	.inputGroup>view {
		width: 240upx;
		height: 70upx;
		border: 1upx solid #dddddd;
		display: flex;
		justify-content: space-between;
	}

	.inputGroup>view input {
		width: 120upx;
		padding-left: 30upx;
		height: 50upx;
		margin-top: 10upx;
		line-height: 50upx;
	}

	.footer {
		width: 711upx;
		height: 105upx;
		line-height: 105upx;
		background: linear-gradient(to right, #17c5af, #20cdb2, #37e0b9, #3fe9bb);
		color: #fff;
		font-size: 44upx;
		text-align: center;
		border-radius: 10upx;
		margin: 0 auto;
	}

	.bigInput {
		width: 540upx;
		height: 70upx;
		line-height: 70upx;
		border: 1upx solid #dddddd;
		display: flex;
		justify-content: space-between;
	}

	.bigInput input {
		font-size: 30upx;
		height: 50upx;
		margin-top: 10upx;
		line-height: 50upx;
		margin-left: 20upx;
	}

	.bigInput view {
		margin-right: 20upx;
		font-size: 28upx;
		color: #666666;
	}
</style>
