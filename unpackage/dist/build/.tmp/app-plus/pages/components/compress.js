(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/components/compress"],{"8d53":function(e,t,a){"use strict";a.r(t);var n=a("ab6a"),o=a("90ae");for(var s in o)"default"!==s&&function(e){a.d(t,e,function(){return o[e]})}(s);var r=a("2877"),u=Object(r["a"])(o["default"],n["a"],n["b"],!1,null,null,null);t["default"]=u.exports},"90ae":function(e,t,a){"use strict";a.r(t);var n=a("a1a7"),o=a.n(n);for(var s in n)"default"!==s&&function(e){a.d(t,e,function(){return n[e]})}(s);t["default"]=o.a},a1a7:function(e,t,a){"use strict";(function(e,a){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={created:function(){var t=this;e.getSystemInfo({success:function(e){t.model=e.platform}})},name:"image-compress",props:{quality:{type:Number,default:1},maxwh:{type:Number,default:1900},maxw:{type:Number,default:1e3},changes:{type:Function,default:null}},data:function(){return{model:"ios",imageW:this.maxwh,imageH:this.maxwh,redio:1}},methods:{yasuo:function(t){var n=this;return new Promise(function(o,s){e.getImageInfo({src:t,success:function(e){var t=0;if("ios"==n.model)t=0;else switch(e.orientation){case"up":t=0;break;case"down":t=180;break;case"right":t=90;break;case"left":t=270;break;default:t=0;break}if(90==t||270==t){console.log(a(t," at pages/components/compress.vue:88"));var s=parseFloat(e.height/e.width),r=e.height,u=e.width,i=n.maxwh,c=n.maxw;(r>c||u>i)&&(r>u?(r=c,u=parseInt(r/s)):(u=i,r=parseInt(u*s))),n.imageW=r,n.imageH=u}else{s=parseFloat(e.width/e.height),r=e.width,u=e.height,i=n.maxwh,c=n.maxw;(r>c||u>i)&&(r>u?(r=c,u=parseInt(r/s)):(u=i,r=parseInt(u*s))),n.imageW=r,n.imageH=u}plus.zip.compressImage({src:e.path,dst:"_doc/uniapp_temp/compressed/"+Math.round(new Date)+".jpg",format:"jpg",rotate:t,width:r,height:u},function(e){var t=e.target,a={tempFilePath:t};o(a)})}})})},yasuoImg:function(e,t){var a=this;t=t||[],e=e;return new Promise(function(n,o){"object"==typeof e?e.length?a.yasuo(e[0]).then(function(o){t.push(o);for(var s=[],r=0;r<e.length;r++)0!=r&&s.push(e[r]);a.yasuoImg(s,t).then(function(e){n(e)})}):(n(t),a.$emit("changes",t)):a.yasuoImg(e).then(function(e){n(t),a.$emit("changes",t)})})}}};t.default=n}).call(this,a("6e42")["default"],a("0de9")["default"])},ab6a:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement;e._self._c},o=[];a.d(t,"a",function(){return n}),a.d(t,"b",function(){return o})}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/components/compress-create-component',
    {
        'pages/components/compress-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("8d53"))
        })
    },
    [['pages/components/compress-create-component']]
]);                