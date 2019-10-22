(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tabcomponts/xiaoxi"],{"26d7":function(t,n,e){"use strict";e.r(n);var o=e("4420"),a=e.n(o);for(var u in o)"default"!==u&&function(t){e.d(n,t,function(){return o[t]})}(u);n["default"]=a.a},"2ab6":function(t,n,e){},4420:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={created:function(){this.getTime()},data:function(){return{time1:""}},methods:{getTime:function(){var t=new Date,n=t.getFullYear()+"/"+e(t.getMonth()+1)+"/"+e(t.getDate());function e(t){return t<10?"0"+t:t}this.time1=n},toguanzhu:function(){if(!this.$store.state.token)return t.showToast({icon:"none",title:"请登录"}),void setTimeout(function(){t.navigateTo({url:"../login/login1"})},1e3);t.navigateTo({url:"../my/attentionList"})},totongzhi:function(){var n=encodeURIComponent("http://help.hm8848.com/Notice.html");t.navigateTo({url:"../help/help?url="+n})},tokefu:function(){t.navigateTo({url:"../help/member"})}}};n.default=e}).call(this,e("6e42")["default"])},"6c15":function(t,n,e){"use strict";var o=e("2ab6"),a=e.n(o);a.a},a0a1:function(t,n,e){"use strict";var o=function(){var t=this,n=t.$createElement;t._self._c},a=[];e.d(n,"a",function(){return o}),e.d(n,"b",function(){return a})},bc9e:function(t,n,e){"use strict";e.r(n);var o=e("a0a1"),a=e("26d7");for(var u in a)"default"!==u&&function(t){e.d(n,t,function(){return a[t]})}(u);e("6c15");var i=e("2877"),r=Object(i["a"])(a["default"],o["a"],o["b"],!1,null,null,null);n["default"]=r.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/tabcomponts/xiaoxi-create-component',
    {
        'pages/tabcomponts/xiaoxi-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("bc9e"))
        })
    },
    [['pages/tabcomponts/xiaoxi-create-component']]
]);                
