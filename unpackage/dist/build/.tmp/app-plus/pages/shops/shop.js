(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/shops/shop"],{"07a5":function(t,i,e){"use strict";(function(t,a){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var s=n(e("ef4f"));function n(t){return t&&t.__esModule?t:{default:t}}var o=function(){return e.e("pages/components/you-scroll").then(e.bind(null,"25b1"))},l={components:{youScroll:o},onLoad:function(t){this.id=t.id},onShow:function(){this.getUsers(),this.onsuppliesData(""),this.getMyloctions(),this.getDynamic("")},data:function(){return{shareDetailsDis:!1,stayCall:!0,location:{latitude:"",longitude:""},lists:{arrs:[],Total:0,start:0,length:8,loadingText:"已全部加载完毕",times:0,loading:!1},dynamic:{arrs:[],Total:0,start:0,length:6,loadingText:"已全部加载完毕",times:0,loading:!1},timing:!0,followed:!1,ismy:!1,id:"",obj:{nickName:"",corporateName:"",mobile:"",avatarUrl:"",city:"",visitors:"",followers:"",contacts:""},activetab:1,num:"qwerty"}},methods:{shareDetailsNone:function(){this.shareDetailsDis=!1},shareDetailsShow:function(){this.shareDetailsDis=!0},sharesweixin:function(i){var e=this;t.share({provider:"weixin",scene:i,type:0,title:this.obj.nickName+"的苗店 -- 点击关注",imageUrl:"https://img.hm8848.com/APP/152x152.png",href:"https://m.miaodadang.com/shop?id="+this.id,summary:"主营:".concat(this.obj.mainBusiness),success:function(t){e.$store.state.token&&e.$myhttp.post(e.websiteUrl+"/my/share","",function(t){}),e.shareDetailsDis=!1},fail:function(t){console.log(a("fail:"+JSON.stringify(t)," at pages/shops/shop.vue:384")),this.shareDetailsDis=!1}})},getUsers:function(){var t=this;this.$myhttp.get(this.websiteUrl+"/users","",function(i){var e=i.data.data;t.$myhttp.get(t.websiteUrl+"/shops/"+t.id,"",function(i){var a=i.data.data;a.id==e.id?t.ismy=!0:(t.ismy=!1,t.getfollowed());var n=(0,s.default)(a.areas[0]);a.city=n.replace(/-/g,""),a.birthTime=t.getNumberDay(a.createTime),t.obj=a})},this)},showCall:function(){var i=this;this.stayCall&&(this.stayCall=!1,this.$myhttp.post(this.websiteUrl+"/my/shops/"+this.id+"/contact?pay=false","",function(i){t.makePhoneCall({phoneNumber:i.data.data})},this),setTimeout(function(){i.stayCall=!0},1e3))},onNewDynamic:function(i){var e=this;this.dynamic={arrs:[],Total:0,start:0,length:6,loadingText:"已全部加载完毕",times:0,loading:!1},t.getLocation({type:"gcj02",success:function(t){e.location={longitude:t.longitude,latitude:t.latitude},e.getDynamic(function(){i()})}})},onNewSupplies:function(t){this.lists={arrs:[],Total:0,start:0,length:8,loadingText:"已全部加载完毕",times:0,loading:!1},this.onsuppliesData(function(){t()})},toshops:function(i){t.navigateTo({url:"../shops/shop?id="+i})},edits:function(){t.navigateTo({url:"edit"})},showdynamicImg:function(i,e){t.previewImage({current:e+"",urls:i,loop:!0})},getMyloctions:function(){var i=this;t.getLocation({type:"gcj02",success:function(t){i.location={longitude:t.longitude,latitude:t.latitude}}})},todetails:function(i,e){var a=JSON.stringify(e);t.navigateTo({url:"../detailSupply/detailSupply?id="+i+"&info="+a})},onsuppliesData:function(t){var i=this;if(this.lists.loading)t&&t();else{if(this.lists.loading=!0,0!==this.lists.Total&&this.lists.Total==this.lists.arrs.length)return this.lists.loadingText="已全部加载完毕",void(t&&t());this.lists.loadingText="上拉加载更多",this.$http.get(this.websiteUrl+"/supplies/search?start="+this.lists.start+"&length="+this.lists.length+"&userId="+this.id+"&sort=time","",function(e){e=e.data.data;if(i.lists.Total=e.totalCount,e.items.length){var a=e.items;if(a.forEach(function(t){t.details=i.$store.state.categories[t.categoryId]}),i.lists.start+=e.items.length,i.lists.arrs=i.lists.arrs.concat(a),0!==i.lists.Total&&i.lists.Total==i.lists.arrs.length)return i.lists.loadingText="已全部加载完毕",void(t&&t())}else i.lists.loadingText="已全部加载完毕";t&&t(),i.lists.times++,i.lists.loading=!1})}},getDynamic:function(t){var i=this;if(this.dynamic.loading)t&&t();else{if(this.dynamic.loading=!0,0!==this.dynamic.Total&&this.dynamic.Total==this.dynamic.arrs.length)return this.dynamic.loadingText="已全部加载完毕",void(t&&t());this.dynamic.loadingText="上拉加载更多",this.$myhttp.get(this.websiteUrl+"/news?start="+this.dynamic.start+"&length="+this.dynamic.length+"&userId="+this.id+"&sort=time","",function(e){e=e.data.data;if(i.dynamic.Total=e.totalCount,e.items.length){var a=e.items;if(a.forEach(function(t){t.loc=i.getDynamiclocation(t.location.lat,t.location.lon),t.time=i.times(t.createTime);var e=(0,s.default)(t.areaId);t.city=e.replace(/-/g,"")}),i.dynamic.start+=e.items.length,i.dynamic.arrs=i.dynamic.arrs.concat(a),0!==i.dynamic.Total&&i.dynamic.Total==i.dynamic.arrs.length)return i.dynamic.loadingText="已全部加载完毕",void(t&&t())}else i.dynamic.loadingText="已全部加载完毕";t&&t(),i.dynamic.times++,i.dynamic.loading=!1},this)}},getDynamiclocation:function(t,i){if(!this.location.latitude)return"";var e,a,s=t*Math.PI/180,n=i;a=this.location.longitude,e=this.location.latitude*Math.PI/180;var o=s-e,l=n*Math.PI/180-a*Math.PI/180,r=2*Math.asin(Math.sqrt(Math.pow(Math.sin(o/2),2)+Math.cos(s)*Math.cos(e)*Math.pow(Math.sin(l/2),2)));return r*=6378.137,r=parseInt(Math.round(1e4*r)/10),(r/1e3).toFixed(2)+"km"},times:function(t){var i="",e=new Date(t),a=e.getTime(),s=(new Date).getTime(),n=s-a,o=2592e6,l=864e5,r=36e5,c=6e4;if(n<l){if(n<r){for(var u=1;u<=60;u++)if(n<=u*c){i=u+"分钟前";break}}else for(u=2;u<=24;u++)if(n<u*r){i=u+"小时前";break}}else if(n<o){for(var h=2;h<=30;h++)if(n<h*l){i=h+"天前";break}}else i=getTime(e);return i},guanzhu:function(){var i=this;this.timing&&(this.timing=!1,this.$myhttp.post(this.websiteUrl+"/my/shops/"+this.id+"/follow","",function(e){0==e.data.code&&(i.followed=!0,t.showToast({title:"关注成功"})),setTimeout(function(){i.timing=!0},500)},this))},quxiaoguanzhu:function(){var i=this;this.timing&&(this.timing=!1,this.$myhttp.post(this.websiteUrl+"/my/shops/"+this.id+"/unfollow","",function(e){0==e.data.code&&(i.followed=!1,t.showToast({title:"取消成功"})),setTimeout(function(){i.timing=!0},500)},this))},getfollowed:function(){var t=this;this.$myhttp.get(this.websiteUrl+"/my/shops/"+this.id+"/followed","",function(i){t.followed=i.data.data},this)},getNumberDay:function(t){var i=new Date(t),e=i.getFullYear()+"/"+(i.getMonth()+1)+"/"+i.getDate();e=new Date(e),e=e.getTime();var a=(new Date).getTime(),s=a-e,n=Math.ceil(s/1e3/60/60/24);return n},back:function(){t.navigateBack({delta:1})},swiperchange:function(t){this.activetab=t.detail.current+1}}};i.default=l}).call(this,e("6e42")["default"],e("0de9")["default"])},"1b27":function(t,i,e){"use strict";var a=e("63ff"),s=e.n(a);s.a},"481e":function(t,i,e){"use strict";var a=function(){var t=this,i=t.$createElement,e=(t._self._c,t.__map(t.lists.arrs,function(i,e){var a=i.price.toFixed(2);return{$orig:t.__get_orig(i),g0:a}}));t._isMounted||(t.e0=function(i){t.activetab=1},t.e1=function(i){t.activetab=2},t.e2=function(i){t.activetab=3}),t.$mp.data=Object.assign({},{$root:{l0:e}})},s=[];e.d(i,"a",function(){return a}),e.d(i,"b",function(){return s})},"58df":function(t,i,e){"use strict";e.r(i);var a=e("481e"),s=e("ccfb");for(var n in s)"default"!==n&&function(t){e.d(i,t,function(){return s[t]})}(n);e("1b27");var o=e("2877"),l=Object(o["a"])(s["default"],a["a"],a["b"],!1,null,null,null);i["default"]=l.exports},"63ff":function(t,i,e){},ccfb:function(t,i,e){"use strict";e.r(i);var a=e("07a5"),s=e.n(a);for(var n in a)"default"!==n&&function(t){e.d(i,t,function(){return a[t]})}(n);i["default"]=s.a},fdc4:function(t,i,e){"use strict";(function(t){e("30b7"),e("921b");a(e("66fd"));var i=a(e("58df"));function a(t){return t&&t.__esModule?t:{default:t}}t(i.default)}).call(this,e("6e42")["createPage"])}},[["fdc4","common/runtime","common/vendor"]]]);