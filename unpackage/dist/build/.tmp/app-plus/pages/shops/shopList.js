(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/shops/shopList"],{"29b7":function(t,a,e){"use strict";(function(t,n){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var o=e("90c6"),i=s(e("ef4f"));function s(t){return t&&t.__esModule?t:{default:t}}var r=function(){return Promise.all([e.e("common/vendor"),e.e("pages/components/pickallcity")]).then(e.bind(null,"0464"))},l={components:{mpvueCityPicker:r},onLoad:function(){this.getMyloctions();for(var t=0;t<o.areas.length;t++)this.areas[o.areas[t].id]=o.areas[t]},onReachBottom:function(){this.getNearShop()},onPullDownRefresh:function(){this.nearShop={arrs:[],Total:0,start:0,length:6,loadingText:"已全部加载完毕",times:0,loading:!1},this.getMyloctions(),setTimeout(function(){t.stopPullDownRefresh()},500)},data:function(){return{shareDetailsDis:!1,areaId:"",location:{longitude:"",latitude:""},tabs:"rank",areas:{},city:"地区",themeColor:"#007AFF",nearShop:{arrs:[],Total:0,start:0,length:6,loadingText:"已全部加载完毕",times:0,loading:!1}}},methods:{shareDetailsNone:function(){this.shareDetailsDis=!1},togongying:function(){t.navigateTo({url:"../index/searchSupply"})},sharesweixin:function(a){var e=this;t.share({provider:"weixin",scene:a,type:0,title:"苗搭档:海量供应 -- 邀您查看",imageUrl:"https://img.hm8848.com/APP/152x152.png",href:"https://m.miaodadang.com/supplyList",summary:"每日更新海量供应信息\r\n附近消息让交易更靠谱",success:function(t){e.$store.state.token&&e.$myhttp.post(e.websiteUrl+"/my/share","",function(t){}),e.shareDetailsDis=!1},fail:function(t){}})},tabSwitch:function(t){this.tabs=t,this.nearShop={arrs:[],Total:0,start:0,length:6,loadingText:"已全部加载完毕",times:0,loading:!1},this.getMyloctions()},toshops:function(a){t.navigateTo({url:"../shops/shop?id="+a})},getMyloctions:function(){var a=this;t.getLocation({type:"gcj02",success:function(t){a.location={longitude:t.longitude,latitude:t.latitude},a.getNearShop()},fail:function(){a.getNearShop()}})},getlocation:function(t,a){if(!this.location.latitude)return"";var e,n,o=t*Math.PI/180,i=a;n=this.location.longitude,e=this.location.latitude*Math.PI/180;var s=o-e,r=i*Math.PI/180-n*Math.PI/180,l=2*Math.asin(Math.sqrt(Math.pow(Math.sin(s/2),2)+Math.cos(o)*Math.cos(e)*Math.pow(Math.sin(r/2),2)));return l*=6378.137,l=parseInt(Math.round(1e4*l)/10),(l/1e3).toFixed(2)+"公里"},getNearShop:function(){var t=this;this.nearShop.loading||(this.nearShop.loading=!0,0===this.nearShop.Total||this.nearShop.Total!=this.nearShop.arrs.length?(this.nearShop.loadingText="上拉加载更多",this.$myhttp.get(this.websiteUrl+"/shops/sellers?start="+this.nearShop.start+"&length="+this.nearShop.length+"&sort="+this.tabs+"&lat="+this.location.latitude+"&lon="+this.location.longitude+"&areaId="+this.areaId,"",function(a){console.log(n(a," at pages/shops/shopList.vue:263"));a=a.data.data;if(t.nearShop.Total=a.totalCount,a.items.length){var e=a.items;if(e.forEach(function(a){a.location?a.loc=t.getlocation(a.location.lat,a.location.lon):a.loc="";var e=(0,i.default)(a.areas[0]);a.city=e.replace(/-/g,"")}),t.nearShop.start+=a.items.length,t.nearShop.arrs=t.nearShop.arrs.concat(e),0!==t.nearShop.Total&&t.nearShop.Total==t.nearShop.arrs.length)return void(t.nearShop.loadingText="已全部加载完毕")}else t.nearShop.loadingText="已全部加载完毕";t.nearShop.times++,t.nearShop.loading=!1},this)):this.nearShop.loadingText="已全部加载完毕")},showMulLinkageThreePicker:function(){this.$refs.mpvueCityPicker.show()},onConfirm:function(t){t.cityCode?(this.areaId=t.cityCode,this.city=this.areas[t.cityCode].name):(this.areaId="",this.city="全国"),this.nearShop={arrs:[],Total:0,start:0,length:6,loadingText:"已全部加载完毕",times:0,loading:!1},this.getMyloctions()},back:function(){t.navigateBack({delta:1})}}};a.default=l}).call(this,e("6e42")["default"],e("0de9")["default"])},"318c":function(t,a,e){"use strict";e.r(a);var n=e("d008"),o=e("ad09");for(var i in o)"default"!==i&&function(t){e.d(a,t,function(){return o[t]})}(i);e("ad9c");var s=e("2877"),r=Object(s["a"])(o["default"],n["a"],n["b"],!1,null,null,null);a["default"]=r.exports},"6a07":function(t,a,e){},"95a3":function(t,a,e){"use strict";(function(t){e("30b7"),e("921b");n(e("66fd"));var a=n(e("318c"));function n(t){return t&&t.__esModule?t:{default:t}}t(a.default)}).call(this,e("6e42")["createPage"])},ad09:function(t,a,e){"use strict";e.r(a);var n=e("29b7"),o=e.n(n);for(var i in n)"default"!==i&&function(t){e.d(a,t,function(){return n[t]})}(i);a["default"]=o.a},ad9c:function(t,a,e){"use strict";var n=e("6a07"),o=e.n(n);o.a},d008:function(t,a,e){"use strict";var n=function(){var t=this,a=t.$createElement;t._self._c;t._isMounted||(t.e0=function(a){a.stopPropagation(),t.shareDetailsDis=!0})},o=[];e.d(a,"a",function(){return n}),e.d(a,"b",function(){return o})}},[["95a3","common/runtime","common/vendor"]]]);