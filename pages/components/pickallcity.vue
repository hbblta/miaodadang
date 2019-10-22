<template>
	<div class="mpvue-picker">
		<div :class="{'pickerMask':showPicker}" @click="maskClick" catchtouchmove="true"></div>
		<div class="mpvue-picker-content " :class="{'mpvue-picker-view-show':showPicker}">
			<div class="mpvue-picker__hd" catchtouchmove="true">
				<div class="mpvue-picker__action" @click="pickerCancel">取消</div>
				<div class="mpvue-picker__action" :style="{color:themeColor}" @click="pickerConfirm">确定</div>
			</div>
			<picker-view indicator-style="height: 40px;" class="mpvue-picker-view" :value="pickerValue" @change="pickerChange">
				<block>
					<picker-view-column>
						<div class="picker-item" v-for="(item,index) in provinceDataList" :key="index">{{item.name}}</div>
					</picker-view-column>
					<picker-view-column>
						<div class="picker-item" v-for="(item,index) in cityDataList" :key="index">{{item.name}}</div>
					</picker-view-column>
					<picker-view-column>
						<div class="picker-item" v-for="(item,index) in areaDataList" :key="index">{{item.name}}</div>
					</picker-view-column>
				</block>
			</picker-view>
		</div>
	</div>
</template>

<script>
	import provinceData from './city-dataAll/area0.js';
	import cityData from './city-dataAll/area1.js';
	import areaData from './city-dataAll/area2.js';
	export default {
		data() {
			return {
				pickerValue: [0, 0, 0],
				provinceDataList: provinceData,
				cityDataList: cityData[0],
				areaDataList: areaData[0][0],
				/* 是否显示控件 */
				showPicker: false,
			};
		},
		created() {
			this.init()
		},
		props: {
			/* 默认值 */
			pickerValueDefault: {
				type: Array,
				default () {
					return [0, 0, 0]
				}
			},
			/* 主题色 */
			themeColor: String
		},
		watch: {
			pickerValueDefault() {
				this.init();
			}
		},
		methods: {
			init() {
				this.handPickValueDefault(); // 对 pickerValueDefault 做兼容处理
				const pickerValueDefault = this.pickerValueDefault
			
				this.cityDataList = cityData[pickerValueDefault[0]];
				this.areaDataList = areaData[pickerValueDefault[0]][pickerValueDefault[1]];
				this.pickerValue = pickerValueDefault;
			},
			show() {
				setTimeout(() => {
					this.showPicker = true;
				}, 0);
			},
			maskClick() {
				this.pickerCancel();
			},
			pickerCancel() {
				this.showPicker = false;
				this._$emit('onCancel');
			},
			pickerConfirm(e) {
				this.showPicker = false;
				this._$emit('onConfirm');
			},
			showPickerView() {
				this.showPicker = true;
			},
			handPickValueDefault() {
				const pickerValueDefault = this.pickerValueDefault

				let provinceIndex = pickerValueDefault[0]
				let cityIndex = pickerValueDefault[1]
				const areaIndex = pickerValueDefault[2]
				if (
					provinceIndex !== 0 ||
					cityIndex !== 0 ||
					areaIndex !== 0
				) {
					if (provinceIndex > provinceData.length - 1) {
						this.pickerValueDefault[0] = provinceIndex = provinceData.length - 1;
					}
					if (cityIndex > cityData[provinceIndex].length - 1) {
						this.pickerValueDefault[1] = cityIndex = cityData[provinceIndex].length - 1;
					}
					if (areaIndex > areaData[provinceIndex][cityIndex].length - 1) {
						this.pickerValueDefault[2] = areaData[provinceIndex][cityIndex].length - 1;
					}
				}
			},
			pickerChange(e) {
				let changePickerValue = e.mp.detail.value;
				if (this.pickerValue[0] !== changePickerValue[0]) {
					// 第一级发生滚动
					this.cityDataList = cityData[changePickerValue[0]];
					this.areaDataList = areaData[changePickerValue[0]][0];
					changePickerValue[1] = 0;
					changePickerValue[2] = 0;
				} else if (this.pickerValue[1] !== changePickerValue[1]) {
					// 第二级滚动
					this.areaDataList =
						areaData[changePickerValue[0]][changePickerValue[1]];
					changePickerValue[2] = 0;
				}
				this.pickerValue = changePickerValue;
				this._$emit('onChange');
			},
			_$emit(emitName) {
				let pickObj = {
					name: this._getLabel(),
					value: this.pickerValue,
					cityCode: this._getCityCode()
				};
				this.$emit(emitName, pickObj);
			},
			_getLabel() {
				let pcikerLabel
				if(!this.areaDataList[this.pickerValue[2]].name){
					if(this.cityDataList[this.pickerValue[1]].name == '全部'){
						pcikerLabel = this.provinceDataList[this.pickerValue[0]].name
					}else{
						pcikerLabel = this.provinceDataList[this.pickerValue[0]].name +'-' +this.cityDataList[this.pickerValue[1]].name
					}
				}else if(this.areaDataList[this.pickerValue[2]].name == '全部'){
					pcikerLabel = this.provinceDataList[this.pickerValue[0]].name +'-' +this.cityDataList[this.pickerValue[1]].name
				}else{
					pcikerLabel = this.provinceDataList[this.pickerValue[0]].name +'-' +this.cityDataList[this.pickerValue[1]].name +'-' +this.areaDataList[this.pickerValue[2]].name;
				}
				
				
				return pcikerLabel;
			},
			_getCityCode() {
				return this.areaDataList[this.pickerValue[2]].id;
			}
		}
	};
</script>

<style>
	.pickerMask {
		position: fixed;
		z-index: 1000;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
	}

	.mpvue-picker-content {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		transition: all 0.3s ease;
		transform: translateY(100%);
		z-index: 3000;
	}

	.mpvue-picker-view-show {
		transform: translateY(0);
	}

	.mpvue-picker__hd {
		display: flex;
		padding: 15upx 30upx;
		background-color: #fff;
		position: relative;
		text-align: center;
		font-size: 35upx;
	}

	.mpvue-picker__hd:after {
		content: ' ';
		position: absolute;
		left: 0;
		bottom: 0;
		right: 0;
		height: 2upx;
		border-bottom: 2upx solid #e5e5e5;
		color: #e5e5e5;
		transform-origin: 0 100%;
		transform: scaleY(0.5);
	}

	.mpvue-picker__action {
		display: block;
		flex: 1;
		color: #1aad19;
	}

	.mpvue-picker__action:first-child {
		text-align: left;
		color: #888;
	}

	.mpvue-picker__action:last-child {
		text-align: right;
	}

	.picker-item {
		text-align: center;
		line-height: 60px;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 35upx;
	}

	.mpvue-picker-view {
		position: relative;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 400upx;
		background-color: rgba(255, 255, 255, 1);
	}
</style>