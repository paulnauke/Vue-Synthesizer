(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{320:function(t,e,n){"use strict";var o=n(4),r=n(142);o({target:"String",proto:!0,forced:n(143)("link")},{link:function(t){return r(this,"a","href",t)}})},502:function(t,e,n){"use strict";n.r(e);var o={name:"highpass-filter-node",props:{audioCtx:{},audioDestination:{},value:{},sourceNode:{},destinationNode:{}},data:function(){return{filterNode:null,threshold:0,frequency:20}},watch:{threshold:function(){this.updateNode()},audioDestination:function(){this.audioDestination&&this.filterNode.connect(this.audioDestination),this.updateNode()}},mounted:function(){this.init()},methods:{init:function(){this.filterNode=this.audioCtx.createBiquadFilter(),this.filterNode.type="highpass",this.filterNode.frequency.value=20,this.$emit("input",this.filterNode)},updateNode:function(){var t=this.audioCtx.sampleRate/2,e=Math.log(t/20)/Math.LN2,n=Math.pow(2,e*(this.threshold-1));this.filterNode.frequency.value=t*n,this.frequency=Math.round(t*n)}}},r=n(69),d=n(94),h=n.n(d),l=n(382),c=n(318),f=n(492),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-card",{attrs:{width:"100%",height:"100%"}},[n("v-card-title",[t._v("Highpass Filter Node")]),t._v(" "),n("v-card-text",{staticClass:"no-drag"},[n("div",{staticClass:"subtitle--text text-right"},[t._v(t._s(t.frequency)+" Hz")]),t._v(" "),n("v-slider",{attrs:{min:0,max:1,step:"0.01"},model:{value:t.threshold,callback:function(e){t.threshold=e},expression:"threshold"}})],1)],1)}),[],!1,null,"0ce267be",null);e.default=component.exports;h()(component,{VCard:l.a,VCardText:c.a,VCardTitle:c.b,VSlider:f.a})}}]);