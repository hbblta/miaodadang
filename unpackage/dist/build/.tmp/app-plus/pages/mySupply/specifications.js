(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mySupply/specifications"],{"0561":function(e,i,t){"use strict";t.r(i);var s=t("d8b8"),n=t.n(s);for(var a in s)"default"!==a&&function(e){t.d(i,e,function(){return s[e]})}(a);i["default"]=n.a},"1a34":function(e,i,t){"use strict";t.r(i);var s=t("dc61"),n=t("0561");for(var a in n)"default"!==a&&function(e){t.d(i,e,function(){return n[e]})}(a);t("5881");var o=t("2877"),r=Object(o["a"])(n["default"],s["a"],s["b"],!1,null,null,null);i["default"]=r.exports},5881:function(e,i,t){"use strict";var s=t("c975"),n=t.n(s);n.a},a94b:function(e,i,t){"use strict";(function(e){t("30b7"),t("921b");s(t("66fd"));var i=s(t("1a34"));function s(e){return e&&e.__esModule?e:{default:e}}e(i.default)}).call(this,t("6e42")["createPage"])},c975:function(e,i,t){},d8b8:function(e,i,t){"use strict";(function(e,t){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var s={data:function(){return{infos:[],val:""}},onLoad:function(e){for(var i=JSON.parse(e.info),t=[],s=0;s<i.length;s++)i[s].group&&t.push(i[s].group),"select"==i[s].attributeType&&(i[s].selectValue="",i[s].selectText=""),"range"==i[s].attributeType&&(i[s].min="",i[s].max=""),"input"==i[s].attributeType&&(i[s].values="");for(var n=t.filter(function(e,i){return t.indexOf(e)===i}),a=0;a<n.length;a++){for(var o={attributeType:"group",name:n[a],arrs:[],index:0},r=0;r<i.length;r++)i[r].group==n[a]&&(o.arrs.push(i[r]),o.isRequired=i[r].isRequired);this.infos.push(o)}for(var u=0;u<i.length;u++)i[u].group||this.infos.push(i[u])},methods:{changeArrmin:function(e,i){this.infos[i].arrs[this.infos[i].index].max=e.target.value},minchanges:function(e,i){this.infos[i].max=e.target.value},choiceArr:function(i,s){var n=this;plus.key.hideSoftKeybord();for(var a=[],o=0;o<i.length;o++)a.push(i[o].name);e.showActionSheet({itemList:a,success:function(e){n.infos[s].index=e.tapIndex},fail:function(e){console.log(t(e.errMsg," at pages/mySupply/specifications.vue:190"))},complete:function(){plus.key.hideSoftKeybord()}})},choice:function(i,s){var n=this;plus.key.hideSoftKeybord(),console.log(t(i," at pages/mySupply/specifications.vue:203"));for(var a=JSON.parse(i),o=[],r=0;r<a.length;r++)o.push(a[r].text);e.showActionSheet({itemList:o,success:function(e){n.infos[s].selectValue=a[e.tapIndex].value,n.infos[s].selectText=a[e.tapIndex].text},fail:function(e){console.log(t(e.errMsg," at pages/mySupply/specifications.vue:217"))},complete:function(){plus.key.hideSoftKeybord()}})},sure:function(){console.log(t(this.infos," at pages/mySupply/specifications.vue:227"));for(var i=[],s=0;s<this.infos.length;s++){var n={name:"",isRequired:!1,id:"",value:"",text:""};"group"==this.infos[s].attributeType?(n.name=this.infos[s].arrs[this.infos[s].index].name,n.isRequired=this.infos[s].arrs[this.infos[s].index].isRequired,n.id=this.infos[s].arrs[this.infos[s].index].id,"range"==this.infos[s].arrs[this.infos[s].index].attributeType?(n.value=[this.infos[s].arrs[this.infos[s].index].min,this.infos[s].arrs[this.infos[s].index].max],n.text=this.infos[s].arrs[this.infos[s].index].min+"-"+this.infos[s].arrs[this.infos[s].index].max):"select"==this.infos[s].arrs[this.infos[s].index].attributeType?(n.value=this.infos[s].arrs[this.infos[s].index].selectValue,n.text=this.infos[s].arrs[this.infos[s].index].selectText):(n.value=this.infos[s].arrs[this.infos[s].index].values,n.text=this.infos[s].arrs[this.infos[s].index].values)):"range"==this.infos[s].attributeType?(n.name=this.infos[s].name,n.isRequired=this.infos[s].isRequired,n.id=this.infos[s].id,n.value=[this.infos[s].min,this.infos[s].max],n.text=this.infos[s].min+"-"+this.infos[s].max):"select"==this.infos[s].attributeType?(n.name=this.infos[s].name,n.isRequired=this.infos[s].isRequired,n.id=this.infos[s].id,n.value=this.infos[s].selectValue,n.text=this.infos[s].selectText):(n.name=this.infos[s].name,n.isRequired=this.infos[s].isRequired,n.id=this.infos[s].id,n.value=this.infos[s].values,n.text=this.infos[s].values),i.push(n)}for(var a=[],o=0;o<i.length;o++){if(i[o].isRequired)if(i[o].value instanceof Array){if(!i[o].value[0])return void e.showToast({icon:"none",title:"请填带*的必填项"})}else if(!i[o].text)return void e.showToast({icon:"none",title:"请填带*的必填项"});i[o].value instanceof Array?i[o].value[0]&&a.push(i[o]):i[o].text&&a.push(i[o])}n={texts:"",val:[]};for(var r=0;r<a.length;r++){var u={id:a[r].id,value:a[r].value};n.texts+=a[r].name+":"+a[r].text+";",n.val.push(u)}n.val=JSON.stringify(n.val);var f=getCurrentPages(),l=(f[f.length-1],f[f.length-2]);l.setData({specifica:n}),e.navigateBack()}}};i.default=s}).call(this,t("6e42")["default"],t("0de9")["default"])},dc61:function(e,i,t){"use strict";var s=function(){var e=this,i=e.$createElement;e._self._c},n=[];t.d(i,"a",function(){return s}),t.d(i,"b",function(){return n})}},[["a94b","common/runtime","common/vendor"]]]);