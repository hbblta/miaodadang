(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/supplyList"],{"0697":function(t,i,e){"use strict";e.r(i);var s=e("db8f"),a=e("7183");for(var n in a)"default"!==n&&function(t){e.d(i,t,function(){return a[t]})}(n);e("624f");var o=e("2877"),r=Object(o["a"])(a["default"],s["a"],s["b"],!1,null,null,null);i["default"]=r.exports},1899:function(t,i,e){"use strict";(function(t,s){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var a=r(e("5852")),n=e("90c6"),o=r(e("ef4f"));function r(t){return t&&t.__esModule?t:{default:t}}var l=function(){return Promise.all([e.e("common/vendor"),e.e("pages/components/pickallcity")]).then(e.bind(null,"0464"))},c=function(){return e.e("pages/components/you-scroll").then(e.bind(null,"25b1"))},u={components:{mpvueCityPicker:l,youScroll:c},onLoad:function(t){var i=this;if(t.return&&(this.returnIndex=!0),t.tags&&(this.tags=t.tags,"容器苗"!=t.tags)){var e=encodeURIComponent(t.tags);this.$myhttp.get(this.websiteUrl+"/categories?tag="+e,"",function(t){i.pickerLists=t.data.data,i.pickerLists.unshift({id:"",name:i.tags,tags:[]})},this)}for(var s=0;s<n.areas.length;s++)this.areas[n.areas[s].id]=n.areas[s];t.id&&(this.categoryId=t.id,this.liebie=t.name),this.getMyloctions()},onShow:function(){var i=getCurrentPages(),e=i[i.length-1];e.data.liebieChoice?(this.categoryId=e.data.liebieChoice.obj.id,this.liebie=e.data.liebieChoice.obj.name,this.specifications="",this.getnew(),e.setData({liebieChoice:""})):e.data.specificationChoice&&(this.specifications=JSON.stringify(e.data.specificationChoice),console.log(t(this.specifications," at pages/index/supplyList.vue:183")),this.getnew(),e.setData({specificationChoice:""}))},data:function(){return{shareDetailsDis:!1,returnIndex:!1,construcor:"",pickerLists:[""],listIndex:0,tags:"",sorts:"time",themeColor:"#007AFF",location:{latitude:"",longitude:""},liebie:"品类",areas:{},city:"地区",dis:!1,areaId:"",categoryId:"",specifications:"",sortDis:!1,sortactive:2,lists:{arrs:[],start:0,length:6,Total:0,loadingText:"已全部加载完毕",times:0,loading:!1}}},methods:{sharesweixin:function(t){var i=this;s.share({provider:"weixin",scene:t,type:0,title:"苗搭档:海量供应 -- 邀您查看",imageUrl:"https://img.hm8848.com/APP/152x152.png",href:"https://m.miaodadang.com/supplyList",summary:"每日更新海量供应信息\r\n附近消息让交易更靠谱",success:function(t){i.$store.state.token&&i.$myhttp.post(i.websiteUrl+"/my/share","",function(t){},i),i.shareDetailsDis=!1},fail:function(t){}})},bindPickerChange:function(t){this.listIndex=t.target.value,this.categoryId=this.pickerLists[this.listIndex].id,this.specifications="",this.getnew()},newsData:function(t){var i=this;this.lists={arrs:[],start:0,length:6,Total:0,loadingText:"已全部加载完毕",times:0,loading:!1},s.getLocation({type:"gcj02",success:function(e){i.location={longitude:e.longitude,latitude:e.latitude},i.onloadData(),setTimeout(function(){t()},500)},fail:function(e){i.onloadData(),setTimeout(function(){t()},500)}})},tosearch:function(){s.navigateTo({url:"search"})},tosupply:function(){s.navigateTo({url:"../release/retrieval?type=supply"})},todetails:function(t,i){var e=JSON.stringify(i);s.navigateTo({url:"../detailSupply/detailSupply?id="+t+"&info="+e})},getnew:function(){this.lists={arrs:[],start:0,length:6,loadingText:"已全部加载完毕",Total:0,times:0,loading:!1},this.onloadData()},getMyloctions:function(){var t=this;s.getLocation({type:"gcj02",success:function(i){t.location={longitude:i.longitude,latitude:i.latitude},t.getnew()}})},getlocation:function(t,i){if(!this.location.latitude)return"";var e,s,a=t*Math.PI/180,n=i;s=this.location.longitude,e=this.location.latitude*Math.PI/180;var o=a-e,r=n*Math.PI/180-s*Math.PI/180,l=2*Math.asin(Math.sqrt(Math.pow(Math.sin(o/2),2)+Math.cos(a)*Math.cos(e)*Math.pow(Math.sin(r/2),2)));return l*=6378.137,l=parseInt(Math.round(1e4*l)/10),(l/1e3).toFixed(2)+"公里"},onloadData:function(i){var e=this;this.lists.loading||(this.lists.loading=!0,0===this.lists.Total||this.lists.Total!=this.lists.arrs.length?(this.lists.loadingText="上拉加载更多",this.$http.get(this.websiteUrl+"/supplies/search?start="+this.lists.start+"&length="+this.lists.length+"&tags="+encodeURIComponent(this.tags)+"&areaId="+this.areaId+"&categoryId="+this.categoryId+"&specifications="+this.specifications+"&sort="+this.sorts+"&lat="+this.location.latitude+"&lon="+this.location.longitude,"",function(i){console.log(t(i," at pages/index/supplyList.vue:410"));i=i.data.data;if(e.lists.Total=i.totalCount,i.items.length){var s=i.items;if(s.forEach(function(t){t.details=e.$store.state.categories[t.categoryId],t.loc=e.getlocation(t.location.lat,t.location.lon),t.time=e.times(t.refreshTime);var i=(0,o.default)(t.areaId);t.city=i.replace(/-/g,"");for(var s=JSON.parse(t.specifications),a=s.length,n="",r=0;r<a;r++){var l="",c="";l=s[r].value instanceof Array?s[r].value[0]==s[r].value[1]?s[r].value[0]:s[r].value[0]+l+"-"+s[r].value[1]:s[r].value,s[r].unit&&(c=s[r].unit),n+=s[r].name+": "+l+c+";"}t.specificationsStr=n}),e.lists.start+=i.items.length,e.lists.arrs=e.lists.arrs.concat(s),0!==e.lists.Total&&e.lists.Total==e.lists.arrs.length)return void(e.lists.loadingText="已全部加载完毕")}else e.lists.loadingText="已全部加载完毕";e.lists.times++,e.lists.loading=!1})):this.lists.loadingText="已全部加载完毕")},tospecifications:function(){if(this.tags&&0==this.listIndex||"容器苗"==this.tags){console.log(t(111," at pages/index/supplyList.vue:466"));var i=encodeURIComponent(this.tags);this.$myhttp.get(this.websiteUrl+"/categories/attributes?tag="+i,"",function(i){console.log(t(i," at pages/index/supplyList.vue:469"));i=i.data.data;s.navigateTo({url:"specifications?info="+JSON.stringify(i)})},this)}else this.categoryId?this.$myhttp.get(this.websiteUrl+"/categories/"+this.categoryId+"/attributes","",function(t){t=t.data.data;s.navigateTo({url:"specifications?info="+JSON.stringify(t)})},this):s.showToast({icon:"none",title:"请先选择品类"})},tochoice:function(){s.navigateTo({url:"choice"})},showMulLinkageThreePicker:function(){this.$refs.mpvueCityPicker.show()},onConfirm:function(t){t.cityCode?(this.areaId=t.cityCode,this.city=this.areas[t.cityCode].name):(this.areaId="",this.city="全国"),this.getnew()},back:function(){this.returnIndex?s.redirectTo({url:"../tabs/tabs"}):s.navigateBack({delta:1})},sortTab:function(t){this.sortactive=t,this.sorts=1==t?"rank":2==t?"time":"distance",this.lists={arrs:[],start:0,length:6,loadingText:"已全部加载完毕",Total:0,times:0,loading:!1},this.onloadData(),this.sortDis=!1},showSort:function(){this.sortDis=!this.sortDis},pageClick:function(){this.shareDetailsDis=!1,this.sortDis=!1},times:function(t){var i="",e=new Date(t),s=e.getTime(),n=(new Date).getTime(),o=n-s,r=2592e6,l=864e5,c=36e5,u=6e4;if(o<l){if(o<c){for(var h=1;h<=60;h++)if(o<=h*u){i=h+"分钟前";break}}else for(h=2;h<=24;h++)if(o<h*c){i=h+"小时前";break}}else if(o<r){for(var d=2;d<=30;d++)if(o<d*l){i=d+"天前";break}}else i=(0,a.default)(e);return i}}};i.default=u}).call(this,e("0de9")["default"],e("6e42")["default"])},"624f":function(t,i,e){"use strict";var s=e("76fd"),a=e.n(s);a.a},7183:function(t,i,e){"use strict";e.r(i);var s=e("1899"),a=e.n(s);for(var n in s)"default"!==n&&function(t){e.d(i,t,function(){return s[t]})}(n);i["default"]=a.a},"76fd":function(t,i,e){},db8f:function(t,i,e){"use strict";var s=function(){var t=this,i=t.$createElement,e=(t._self._c,t.__map(t.lists.arrs,function(i,e){var s=i.price.toFixed(2);return{$orig:t.__get_orig(i),g0:s}}));t._isMounted||(t.e0=function(i){i.stopPropagation(),t.shareDetailsDis=!0}),t.$mp.data=Object.assign({},{$root:{l0:e}})},a=[];e.d(i,"a",function(){return s}),e.d(i,"b",function(){return a})},dbce:function(t,i,e){"use strict";(function(t){e("30b7"),e("921b");s(e("66fd"));var i=s(e("0697"));function s(t){return t&&t.__esModule?t:{default:t}}t(i.default)}).call(this,e("6e42")["createPage"])}},[["dbce","common/runtime","common/vendor"]]]);