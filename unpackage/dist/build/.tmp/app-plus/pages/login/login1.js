(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/login1"],{"028e":function(t,e,n){"use strict";(function(t){n("30b7"),n("921b");a(n("66fd"));var e=a(n("578d"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},"195d":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return o})},"578d":function(t,e,n){"use strict";n.r(e);var a=n("195d"),o=n("a9f2");for(var i in o)"default"!==i&&function(t){n.d(e,t,function(){return o[t]})}(i);n("d8d4");var u=n("2877"),r=Object(u["a"])(o["default"],a["a"],a["b"],!1,null,null,null);e["default"]=r.exports},"82a9":function(t,e,n){},a9f2:function(t,e,n){"use strict";n.r(e);var a=n("e12d"),o=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,function(){return a[t]})}(i);e["default"]=o.a},d8d4:function(t,e,n){"use strict";var a=n("82a9"),o=n.n(a);o.a},e12d:function(t,e,n){"use strict";(function(t,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={onLoad:function(){var e=this;this.$http.get(this.websiteUrl+"/login/method?version="+plus.runtime.version,"",function(n){console.log(t(n," at pages/login/login1.vue:17")),e.cheshi=n.data.data,e.time++}),setTimeout(function(){e.time++},1500)},data:function(){return{tab:!0,time:0,cheshi:!1}},methods:{toceshi:function(){n.navigateTo({url:"ceshiLogin"})},toagree:function(){n.navigateTo({url:"agreement"})},goback:function(){n.navigateBack({delta:1})},sureImg:function(){this.tab?this.tab=!1:this.tab=!0},logins:function(){var e=this;this.tab?n.getProvider({service:"oauth",success:function(a){if(-1!==a.provider.indexOf("weixin")){var o=null;plus.oauth.getServices(function(a){for(var i=0,u=a.length;i<u;i++)if("weixin"===a[i].id){o=a[i];break}o.authorize(function(a){e.$http.get(e.websiteUrl+"/login?code="+a.code,"",function(a){console.log(t(a," at pages/login/login1.vue:82"));var o=a.data.data;console.log(t(o," at pages/login/login1.vue:84")),n.request({url:e.websiteUrl+"/my",header:{authorization:o},data:"",success:function(a){console.log(t(JSON.stringify(a)," at pages/login/login1.vue:93"));var i=a.data.data.user.mobile,u=a.data.data.shop.areaId;i&&u?(n.showToast({icon:"success",title:"登陆成功"}),n.setStorage({key:"userInfo",data:JSON.stringify(a.data.data)}),setTimeout(function(){e.$store.state.token=o,n.setStorage({key:"token",data:o}),n.reLaunch({url:"../tabs/tabs"})},1e3)):i?n.navigateTo({url:"login3?tokens="+o}):n.navigateTo({url:"login2?tokens="+o})}})})},function(e){console.error(t("authorize fail:"+JSON.stringify(e)," at pages/login/login1.vue:136"))},{appid:"wx9b474eb0a6ba77dd"})},function(e){console.error(t("getServices fail:"+JSON.stringify(e)," at pages/login/login1.vue:143"))})}}}):n.showToast({icon:"none",title:"请阅读并同意用户注册协议"})}}};e.default=a}).call(this,n("0de9")["default"],n("6e42")["default"])}},[["028e","common/runtime","common/vendor"]]]);