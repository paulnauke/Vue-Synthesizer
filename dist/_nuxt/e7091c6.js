(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{320:function(t,e,o){"use strict";var n=o(4),r=o(142);n({target:"String",proto:!0,forced:o(143)("link")},{link:function(t){return r(this,"a","href",t)}})},503:function(t,e,o){"use strict";o.r(e);var n={name:"highshelf-filter-node",props:{audioCtx:{},audioDestination:{},value:{},sourceNode:{},destinationNode:{}},data:function(){return{filterNode:null,threshold:0,frequency:20,boost:0}},watch:{threshold:function(){this.updateNode()},boost:function(){this.updateNode()},audioDestination:function(){this.audioDestination&&this.filterNode.connect(this.audioDestination),this.updateNode()}},mounted:function(){this.init()},methods:{init:function(){this.filterNode=this.audioCtx.createBiquadFilter(),this.filterNode.type="highshelf",this.filterNode.frequency.value=20,this.$emit("input",this.filterNode)},updateNode:function(){var t=this.audioCtx.sampleRate/2,e=Math.log(t/20)/Math.LN2,o=Math.pow(2,e*(this.threshold-1)),n=t*o;this.filterNode.frequency.value=n>24e3?2400:n,this.filterNode.gain.value=this.boost,this.frequency=Math.round(t*o)}}},r=o(69),d=o(94),l=o.n(d),h=o(382),c=o(318),f=o(492),component=Object(r.a)(n,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-card",{attrs:{width:"100%",height:"100%"}},[o("v-card-title",[t._v("Highshelf Filter Node")]),t._v(" "),o("v-card-text",{staticClass:"no-drag"},[o("div",{staticClass:"subtitle--text text-right"},[t._v("Center: "+t._s(t.frequency)+" Hz")]),t._v(" "),o("v-slider",{attrs:{min:0,max:1,step:"0.01"},model:{value:t.threshold,callback:function(e){t.threshold=e},expression:"threshold"}}),t._v(" "),o("div",{staticClass:"subtitle--text text-right"},[t._v("Boost: "+t._s(t.boost)+" dB")]),t._v(" "),o("v-slider",{attrs:{min:-24,max:24,step:"0.1"},model:{value:t.boost,callback:function(e){t.boost=e},expression:"boost"}})],1)],1)}),[],!1,null,"9efde5b8",null);e.default=component.exports;l()(component,{VCard:h.a,VCardText:c.a,VCardTitle:c.b,VSlider:f.a})}}]);