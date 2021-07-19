(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{381:function(t,e,n){var content=n(407);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(33).default)("1b7833da",content,!0,{sourceMap:!1})},406:function(t,e,n){"use strict";n(381)},407:function(t,e,n){var o=n(32)(!1);o.push([t.i,".hidden-ghost{display:none}",""]),t.exports=o},495:function(t,e,n){"use strict";n.r(e);var o=n(19),r=(n(14),n(47),n(213),n(61),n(77),n(404)),d=n(405),c={components:{GridLayout:r.GridLayout,GridItem:r.GridItem},data:function(){return{audioCtx:null,colNum:32,currentSource:null,lines:[],nodes:[],nodeSelectionSources:[{name:"Oscillator Node",component:"oscillator-node",width:4,height:20,hasInput:!1,hasOutput:!0},{name:"Track Node",component:"track-node",width:4,height:11,hasInput:!1,hasOutput:!0}],nodeSelectionFilters:[{name:"Lowpass Filter Node",component:"lowpass-filter-node",width:4,height:10,hasInput:!0,hasOutput:!0},{name:"Highpass Filter Node",component:"highpass-filter-node",width:4,height:10,hasInput:!0,hasOutput:!0},{name:"Bandpass Filter Node",component:"bandpass-filter-node",width:4,height:17,hasInput:!0,hasOutput:!0},{name:"Notch Filter Node",component:"notch-filter-node",width:4,height:17,hasInput:!0,hasOutput:!0},{name:"Allpass Filter Node",component:"allpass-filter-node",width:4,height:17,hasInput:!0,hasOutput:!0},{name:"Lowshelf Filter Node",component:"lowshelf-filter-node",width:4,height:17,hasInput:!0,hasOutput:!0},{name:"Highshelf Filter Node",component:"highshelf-filter-node",width:4,height:17,hasInput:!0,hasOutput:!0},{name:"Distortion Node",component:"distortion-node",width:4,height:10,hasInput:!0,hasOutput:!0},{name:"Pinking Filter Node",component:"pinking-filter-node",width:4,height:10,hasInput:!0,hasOutput:!0},{name:"Bitcrusher Filter Node",component:"bitcrusher-filter-node",width:5,height:18,hasInput:!0,hasOutput:!0}],nodeSelectionVisuals:[{name:"Scope Node",component:"scope-node",width:5,height:17,hasInput:!0,hasOutput:!0},{name:"Spectrum Node",component:"spectrum-node",width:5,height:17,hasInput:!0,hasOutput:!0}],nodeSelectionManipulators:[{name:"Gain Node",component:"gain-node",width:3,height:10,hasInput:!0,hasOutput:!0},{name:"Vibrato Node",component:"vibrato-node",width:4,height:17,hasInput:!0,hasOutput:!0}]}},mounted:function(){this.setColNum(),window.addEventListener("resize",this.setColNum),this.init()},methods:{init:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.createAudioContext();case 2:t.audioCtx&&"running"===t.audioCtx.state&&t.initNodeLayout();case 3:case"end":return e.stop()}}),e)})))()},initNodeLayout:function(){this.nodes=[{x:this.colNum-4,y:4,w:4,h:4,i:Date.now(),component:"destination-node",hasInput:!0,hasOutput:!1,sourceNode:null,destinationNode:null,audioDestination:null,audioNodeCtx:null,inputLine:null,outputLine:null}],this.lines.forEach((function(line){line.remove()})),this.lines=[]},setColNum:function(){this.colNum=Math.round(window.innerWidth/75)},createAudioContext:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.audioCtx){e.next=3;break}return e.next=3,t.audioCtx.close();case 3:t.audioCtx=new(window.AudioContext||window.webkitAudioContext);case 4:case"end":return e.stop()}}),e)})))()},addNode:function(t){this.nodes.push({x:2*this.nodes.length%(this.colNum||12),y:0,w:t.width,h:t.height,i:Date.now(),component:t.component,hasInput:t.hasInput,hasOutput:t.hasOutput,sourceNode:null,destinationNode:null,audioDestination:null,audioNodeCtx:null,inputLine:null,outputLine:null})},removeNode:function(t){var e=this.layout.map((function(t){return t.i})).indexOf(t);this.layout.splice(e,1)},beginDraw:function(source){this.currentSource=source},endDraw:function(t){if(this.currentSource&&t.hasInput){var line=d.a.setLine(document.getElementById("output"+this.currentSource.i),document.getElementById("input"+t.i));line.color="#FF9800",this.currentSource.outputLine=line,this.currentSource.audioDestination=t.audioNodeCtx,this.currentSource.destinationNode=t,t.sourceNode=this.currentSource,t.inputLine=line,this.lines.push(line)}},onAudioNodeCtxChange:function(t){t.sourceNode&&t.audioNodeCtx&&(t.sourceNode.audioDestination=t.audioNodeCtx)},moveEvent:function(t){t.inputLine&&t.inputLine.position(),t.outputLine&&t.outputLine.position()},moveEnded:function(t){var e=this,n=setInterval((function(){e.lines.forEach((function(line){line.position()}))}),50);setTimeout((function(){clearInterval(n)}),2e3)}}},l=(n(406),n(69)),h=n(94),m=n.n(h),v=n(485),f=n(382),N=n(318),w=n(512),_=n(333),x=n(389),C=n(347),y=n(336),S=n(400),k=n(491),component=Object(l.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-dialog",{attrs:{value:t.audioCtx&&"running"!==t.audioCtx.state,width:"500"},on:{"click:outside":t.init}},[n("v-card",{on:{click:t.init}},[n("v-card-title",{staticClass:"justify-center"},[t._v("\n                Click on page to create audio context\n            ")])],1)],1),t._v(" "),n("div",[n("v-card",{staticClass:"d-flex"},[n("v-menu",{scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on,r=e.attrs;return[n("v-btn",t._g(t._b({attrs:{text:""}},"v-btn",r,!1),o),[t._v("Sources")])]}}])},[t._v(" "),n("v-list",t._l(t.nodeSelectionSources,(function(e){return n("v-list-item",{key:e.name,on:{click:function(n){return t.addNode(e)}}},[n("v-list-item-title",[t._v(t._s(e.name))])],1)})),1)],1),t._v(" "),n("v-menu",{scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on,r=e.attrs;return[n("v-btn",t._g(t._b({attrs:{text:""}},"v-btn",r,!1),o),[t._v("Manipulators")])]}}])},[t._v(" "),n("v-list",t._l(t.nodeSelectionManipulators,(function(e){return n("v-list-item",{key:e.name,on:{click:function(n){return t.addNode(e)}}},[n("v-list-item-title",[t._v(t._s(e.name))])],1)})),1)],1),t._v(" "),n("v-menu",{scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on,r=e.attrs;return[n("v-btn",t._g(t._b({attrs:{text:""}},"v-btn",r,!1),o),[t._v("Filters")])]}}])},[t._v(" "),n("v-list",t._l(t.nodeSelectionFilters,(function(e){return n("v-list-item",{key:e.name,on:{click:function(n){return t.addNode(e)}}},[n("v-list-item-title",[t._v(t._s(e.name))])],1)})),1)],1),t._v(" "),n("v-menu",{scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on,r=e.attrs;return[n("v-btn",t._g(t._b({attrs:{text:""}},"v-btn",r,!1),o),[t._v("Visuals")])]}}])},[t._v(" "),n("v-list",t._l(t.nodeSelectionVisuals,(function(e){return n("v-list-item",{key:e.name,on:{click:function(n){return t.addNode(e)}}},[n("v-list-item-title",[t._v(t._s(e.name))])],1)})),1)],1),t._v(" "),n("v-spacer"),t._v(" "),n("v-btn",{attrs:{text:""},on:{click:t.init}},[t._v("Clear")])],1)],1),t._v(" "),n("grid-layout",{ref:"ref_nodeLayout",staticStyle:{height:"100%"},attrs:{layout:t.nodes,"col-num":t.colNum,"row-height":1,"is-draggable":!0,"is-resizable":!1,"is-mirrored":!1,"vertical-compact":!1,margin:[14,14],autoSize:!1,responsive:!1,useStyleCursor:!1,"use-css-transforms":!0},on:{"update:layout":function(e){t.nodes=e}}},t._l(t.nodes,(function(e){return n("grid-item",{key:e.i,staticStyle:{"touch-action":"none"},attrs:{x:e.x,y:e.y,w:e.w,h:e.h,i:e.i,"drag-allow-from":".vue-draggable-handle","drag-ignore-from":".no-drag"},on:{move:function(n){return t.moveEvent(e)},moved:function(n){return t.moveEnded(e)}}},[n("div",[n("div",{staticClass:"d-flex align-center"},[e.hasInput?n("div",{attrs:{id:"input"+e.i}},[n("v-icon",{attrs:{disabled:!t.currentSource&&!e.sourceNode,color:"primary"},on:{click:function(n){return t.endDraw(e)}}},[t._v("mdi-circle")])],1):t._e(),t._v(" "),n(e.component,{tag:"component",staticClass:"vue-draggable-handle",attrs:{audioCtx:t.audioCtx,sourceNode:e.sourceNode,destinationNode:e.destinationNode,audioDestination:e.audioDestination},on:{input:function(n){return t.onAudioNodeCtxChange(e)}},model:{value:e.audioNodeCtx,callback:function(n){t.$set(e,"audioNodeCtx",n)},expression:"item.audioNodeCtx"}}),t._v(" "),e.hasOutput?n("div",{attrs:{id:"output"+e.i}},[n("v-icon",{on:{click:function(n){return t.beginDraw(e)}}},[t._v("mdi-arrow-right-circle")])],1):t._e()],1)])])})),1)],1)}),[],!1,null,null,null);e.default=component.exports;m()(component,{VBtn:v.a,VCard:f.a,VCardTitle:N.b,VDialog:w.a,VIcon:_.a,VList:x.a,VListItem:C.a,VListItemTitle:y.b,VMenu:S.a,VSpacer:k.a})}}]);