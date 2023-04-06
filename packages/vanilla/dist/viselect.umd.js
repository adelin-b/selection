/*! @viselect/vanilla v3.2.6 MIT | https://github.com/Simonwep/selection/tree/master/packages/vanilla */
(function(E,g){typeof exports=="object"&&typeof module<"u"?module.exports=g():typeof define=="function"&&define.amd?define(g):(E=typeof globalThis<"u"?globalThis:E||self,E.SelectionArea=g())})(this,function(){"use strict";var X=Object.defineProperty;var Y=(E,g,v)=>g in E?X(E,g,{enumerable:!0,configurable:!0,writable:!0,value:v}):E[g]=v;var u=(E,g,v)=>(Y(E,typeof g!="symbol"?g+"":g,v),v);class E{constructor(){u(this,"_listeners",new Map);u(this,"on",this.addEventListener);u(this,"off",this.removeEventListener);u(this,"emit",this.dispatchEvent)}addEventListener(l,e){const t=this._listeners.get(l)||new Set;return this._listeners.set(l,t),t.add(e),this}removeEventListener(l,e){var t;return(t=this._listeners.get(l))==null||t.delete(e),this}dispatchEvent(l,...e){let t=!0;for(const s of this._listeners.get(l)||[])t=s(...e)!==!1&&t;return t}unbindAllListeners(){this._listeners.clear()}}const g=(c,l="px")=>typeof c=="number"?c+l:c;function v({style:c},l,e){if(typeof l=="object")for(const[t,s]of Object.entries(l))s!==void 0&&(c[t]=g(s));else e!==void 0&&(c[l]=g(e))}function C(c){return(l,e,t,s={})=>{l instanceof HTMLCollection||l instanceof NodeList?l=Array.from(l):Array.isArray(l)||(l=[l]),Array.isArray(e)||(e=[e]);for(const n of l)for(const i of e)n[c](i,t,{capture:!1,...s});return[l,e,t,s]}}const T=C("addEventListener"),b=C("removeEventListener"),w=c=>{const{clientX:l,clientY:e,target:t}=c.touches&&c.touches[0]||c;return{x:l,y:e,target:t}};function M(c,l,e="touch"){switch(e){case"center":{const t=l.left+l.width/2,s=l.top+l.height/2;return t>=c.left&&t<=c.right&&s>=c.top&&s<=c.bottom}case"cover":return l.left>=c.left&&l.top>=c.top&&l.right<=c.right&&l.bottom<=c.bottom;case"touch":return c.right>=l.left&&c.left<=l.right&&c.bottom>=l.top&&c.top<=l.bottom}}function A(c,l=document){const e=Array.isArray(c)?c:[c];let t=[];for(let s=0,n=e.length;s<n;s++){const i=e[s];typeof i=="string"?t=t.concat(Array.from(l.querySelectorAll(i))):i instanceof Element&&t.push(i)}return t}const O=()=>matchMedia("(hover: none), (pointer: coarse)").matches,H=()=>"safari"in window,q=c=>{let l,e=-1,t=!1;return{next(...s){l=s,t||(t=!0,e=requestAnimationFrame(()=>{c(...l),t=!1}))},cancel(){cancelAnimationFrame(e),t=!1}}},{abs:S,max:R,min:k,ceil:D}=Math;class B extends E{constructor(e){var i,o,r,h,_;super();u(this,"_options");u(this,"_selection",{stored:[],selected:[],touched:[],changed:{added:[],removed:[]}});u(this,"_area");u(this,"_clippingElement");u(this,"_targetElement");u(this,"_targetRect");u(this,"_selectables",[]);u(this,"_latestElement");u(this,"_areaRect",new DOMRect);u(this,"_areaLocation",{y1:0,x2:0,y2:0,x1:0});u(this,"_singleClick",!0);u(this,"_frame");u(this,"_scrollAvailable",!0);u(this,"_scrollingActive",!1);u(this,"_scrollSpeed",{x:0,y:0});u(this,"_scrollDelta",{x:0,y:0});u(this,"disable",this._bindStartEvents.bind(this,!1));u(this,"enable",this._bindStartEvents);this._options={selectionAreaClass:"selection-area",selectionContainerClass:void 0,selectables:[],document:window.document,startAreas:["html"],boundaries:["html"],container:"body",...e,behaviour:{overlap:"invert",intersect:"touch",...e.behaviour,startThreshold:(i=e.behaviour)!=null&&i.startThreshold?typeof e.behaviour.startThreshold=="number"?e.behaviour.startThreshold:{x:10,y:10,...e.behaviour.startThreshold}:{x:10,y:10},scrolling:{speedDivider:10,manualSpeed:750,...(o=e.behaviour)==null?void 0:o.scrolling,startScrollMargins:{x:0,y:0,...(h=(r=e.behaviour)==null?void 0:r.scrolling)==null?void 0:h.startScrollMargins}}},features:{range:!0,touch:!0,...e.features,singleTap:{allow:!0,intersect:"native",...(_=e.features)==null?void 0:_.singleTap}}};for(const f of Object.getOwnPropertyNames(Object.getPrototypeOf(this)))typeof this[f]=="function"&&(this[f]=this[f].bind(this));const{document:t,selectionAreaClass:s,selectionContainerClass:n}=this._options;this._area=t.createElement("div"),this._clippingElement=t.createElement("div"),this._clippingElement.appendChild(this._area),this._area.classList.add(s),n&&this._clippingElement.classList.add(n),v(this._area,{willChange:"top, left, bottom, right, width, height",top:0,left:0,position:"fixed"}),v(this._clippingElement,{overflow:"hidden",position:"fixed",transform:"translate3d(0, 0, 0)",pointerEvents:"none",zIndex:"1"}),this._frame=q(f=>{this._recalculateSelectionAreaRect(),this._updateElementSelection(),this._emitEvent("move",f),this._redrawSelectionArea()}),this.enable()}_bindStartEvents(e=!0){const{document:t,features:s}=this._options,n=e?T:b;n(t,"mousedown",this._onTapStart),s.touch&&n(t,"touchstart",this._onTapStart,{passive:!1})}_onTapStart(e,t=!1){const{x:s,y:n,target:i}=w(e),{_options:o}=this,{document:r}=this._options,h=i.getBoundingClientRect(),_=A(o.startAreas,o.document),f=A(o.boundaries,o.document);this._targetElement=f.find(y=>M(y.getBoundingClientRect(),h));const m=e.composedPath();if(!this._targetElement||!_.find(y=>m.includes(y))||!f.find(y=>m.includes(y))||!t&&this._emitEvent("beforestart",e)===!1)return;this._areaLocation={x1:s,y1:n,x2:0,y2:0};const a=r.scrollingElement||r.body;this._scrollDelta={x:a.scrollLeft,y:a.scrollTop},this._singleClick=!0,this.clearSelection(!1,!0),T(r,["touchmove","mousemove"],this._delayedTapMove,{passive:!1}),T(r,["mouseup","touchcancel","touchend"],this._onTapStop),T(r,"scroll",this._onScroll)}_onSingleTap(e){const{singleTap:{intersect:t},range:s}=this._options.features,n=w(e);let i;if(t==="native")i=n.target;else if(t==="touch"){this.resolveSelectables();const{x:r,y:h}=n;i=this._selectables.find(_=>{const{right:f,left:m,top:a,bottom:y}=_.getBoundingClientRect();return r<f&&r>m&&h<y&&h>a})}if(!i)return;for(this.resolveSelectables();!this._selectables.includes(i);){if(!i.parentElement)return;i=i.parentElement}const{stored:o}=this._selection;if(this._emitEvent("start",e),e.shiftKey&&o.length&&s){const r=this._latestElement??o[0],[h,_]=r.compareDocumentPosition(i)&4?[i,r]:[r,i],f=[...this._selectables.filter(m=>m.compareDocumentPosition(h)&4&&m.compareDocumentPosition(_)&2),h,_];this.select(f),this._latestElement=i}else o.includes(i)&&(o.length===1||e.ctrlKey||o.every(r=>this._selection.stored.includes(r)))?(this.deselect(i),this._latestElement=i):(this.select(i),this._latestElement=i);this._emitEvent("stop",e)}_delayedTapMove(e){const{container:t,document:s,behaviour:{startThreshold:n}}=this._options,{x1:i,y1:o}=this._areaLocation,{x:r,y:h}=w(e);if(typeof n=="number"&&S(r+h-(i+o))>=n||typeof n=="object"&&S(r-i)>=n.x||S(h-o)>=n.y){if(b(s,["mousemove","touchmove"],this._delayedTapMove,{passive:!1}),this._emitEvent("beforedrag",e)===!1){b(s,["mouseup","touchcancel","touchend"],this._onTapStop);return}T(s,["mousemove","touchmove"],this._onTapMove,{passive:!1}),v(this._area,"display","block"),A(t,s)[0].appendChild(this._clippingElement),this.resolveSelectables(),this._singleClick=!1,this._targetRect=this._targetElement.getBoundingClientRect(),this._scrollAvailable=this._targetElement.scrollHeight!==this._targetElement.clientHeight||this._targetElement.scrollWidth!==this._targetElement.clientWidth,this._scrollAvailable&&(T(s,"wheel",this._manualScroll,{passive:!1}),this._selectables=this._selectables.filter(_=>this._targetElement.contains(_))),this._setupSelectionArea(),this._emitEvent("start",e),this._onTapMove(e)}this._handleMoveEvent(e)}_setupSelectionArea(){const{_clippingElement:e,_targetElement:t,_area:s}=this,n=this._targetRect=t.getBoundingClientRect();this._scrollAvailable?(v(e,{top:n.top,left:n.left,width:n.width,height:n.height}),v(s,{marginTop:-n.top,marginLeft:-n.left})):(v(e,{top:0,left:0,width:"100%",height:"100%"}),v(s,{marginTop:0,marginLeft:0}))}_onTapMove(e){const{x:t,y:s}=w(e),{_scrollSpeed:n,_areaLocation:i,_options:o,_frame:r}=this,{speedDivider:h}=o.behaviour.scrolling,_=this._targetElement;if(i.x2=t,i.y2=s,this._scrollAvailable&&!this._scrollingActive&&(n.y||n.x)){this._scrollingActive=!0;const f=()=>{if(!n.x&&!n.y){this._scrollingActive=!1;return}const{scrollTop:m,scrollLeft:a}=_;n.y&&(_.scrollTop+=D(n.y/h),i.y1-=_.scrollTop-m),n.x&&(_.scrollLeft+=D(n.x/h),i.x1-=_.scrollLeft-a),r.next(e),requestAnimationFrame(f)};requestAnimationFrame(f)}else r.next(e);this._handleMoveEvent(e)}_handleMoveEvent(e){const{features:t}=this._options;(t.touch&&O()||this._scrollAvailable&&H())&&e.preventDefault()}_onScroll(){const{_scrollDelta:e,_options:{document:t}}=this,{scrollTop:s,scrollLeft:n}=t.scrollingElement||t.body;this._areaLocation.x1+=e.x-n,this._areaLocation.y1+=e.y-s,e.x=n,e.y=s,this._setupSelectionArea(),this._frame.next(null)}_manualScroll(e){const{manualSpeed:t}=this._options.behaviour.scrolling,s=e.deltaY?e.deltaY>0?1:-1:0,n=e.deltaX?e.deltaX>0?1:-1:0;this._scrollSpeed.y+=s*t,this._scrollSpeed.x+=n*t,this._onTapMove(e),e.preventDefault()}_recalculateSelectionAreaRect(){const{_scrollSpeed:e,_areaLocation:t,_areaRect:s,_targetElement:n,_options:i}=this,{scrollTop:o,scrollHeight:r,clientHeight:h,scrollLeft:_,scrollWidth:f,clientWidth:m}=n,a=this._targetRect,{x1:y,y1:L}=t;let{x2:p,y2:d}=t;const{behaviour:{scrolling:{startScrollMargins:x}}}=i;p<a.left+x.x?(e.x=_?-S(a.left-p+x.x):0,p=p<a.left?a.left:p):p>a.right-x.x?(e.x=f-_-m?S(a.left+a.width-p-x.x):0,p=p>a.right?a.right:p):e.x=0,d<a.top+x.y?(e.y=o?-S(a.top-d+x.y):0,d=d<a.top?a.top:d):d>a.bottom-x.y?(e.y=r-o-h?S(a.top+a.height-d-x.y):0,d=d>a.bottom?a.bottom:d):e.y=0;const P=k(y,p),j=k(L,d),F=R(y,p),W=R(L,d);s.x=P,s.y=j,s.width=F-P,s.height=W-j}_redrawSelectionArea(){const{x:e,y:t,width:s,height:n}=this._areaRect,{style:i}=this._area;i.left=`${e}px`,i.top=`${t}px`,i.width=`${s}px`,i.height=`${n}px`}_onTapStop(e,t){var o;const{document:s,features:n}=this._options,{_singleClick:i}=this;b(s,["mousemove","touchmove"],this._delayedTapMove),b(s,["touchmove","mousemove"],this._onTapMove),b(s,["mouseup","touchcancel","touchend"],this._onTapStop),b(s,"scroll",this._onScroll),this._keepSelection(),e&&i&&n.singleTap.allow?this._onSingleTap(e):!i&&!t&&(this._updateElementSelection(),this._emitEvent("stop",e)),this._scrollSpeed.x=0,this._scrollSpeed.y=0,this._scrollAvailable&&b(s,"wheel",this._manualScroll,{passive:!0}),this._clippingElement.remove(),(o=this._frame)==null||o.cancel(),v(this._area,"display","none")}_updateElementSelection(){const{_selectables:e,_options:t,_selection:s,_areaRect:n}=this,{stored:i,selected:o,touched:r}=s,{intersect:h,overlap:_}=t.behaviour,f=_==="invert",m=[],a=[],y=[];for(let p=0;p<e.length;p++){const d=e[p];if(M(n,d.getBoundingClientRect(),h)){if(o.includes(d))i.includes(d)&&!r.includes(d)&&r.push(d);else if(f&&i.includes(d)){y.push(d);continue}else a.push(d);m.push(d)}}f&&a.push(...i.filter(p=>!o.includes(p)));const L=_==="keep";for(let p=0;p<o.length;p++){const d=o[p];!m.includes(d)&&!(L&&i.includes(d))&&y.push(d)}s.selected=m,s.changed={added:a,removed:y},this._latestElement=m[m.length-1]}_emitEvent(e,t){return this.emit(e,{event:t,store:this._selection,selection:this})}_keepSelection(){const{_options:e,_selection:t}=this,{selected:s,changed:n,touched:i,stored:o}=t,r=s.filter(h=>!o.includes(h));switch(e.behaviour.overlap){case"drop":{t.stored=[...r,...o.filter(h=>!i.includes(h))];break}case"invert":{t.stored=[...r,...o.filter(h=>!n.removed.includes(h))];break}case"keep":{t.stored=[...o,...s.filter(h=>!o.includes(h))];break}}}trigger(e,t=!0){this._onTapStart(e,t)}resolveSelectables(){this._selectables=A(this._options.selectables,this._options.document)}clearSelection(e=!0,t=!1){const{selected:s,stored:n,changed:i}=this._selection;i.added=[],i.removed.push(...s,...e?n:[]),t||(this._emitEvent("move",null),this._emitEvent("stop",null)),this._selection={stored:e?[]:n,selected:[],touched:[],changed:{added:[],removed:[]}}}getSelection(){return this._selection.stored}getSelectionArea(){return this._area}cancel(e=!1){this._onTapStop(null,!e)}destroy(){this.cancel(),this.disable(),this._clippingElement.remove(),super.unbindAllListeners()}select(e,t=!1){const{changed:s,selected:n,stored:i}=this._selection,o=A(e,this._options.document).filter(r=>!n.includes(r)&&!i.includes(r));return i.push(...o),n.push(...o),s.added.push(...o),s.removed=[],this._latestElement=void 0,t||(this._emitEvent("move",null),this._emitEvent("stop",null)),o}deselect(e,t=!1){const{selected:s,stored:n,changed:i}=this._selection,o=A(e,this._options.document).filter(r=>s.includes(r)||n.includes(r));o.length&&(this._selection.stored=n.filter(r=>!o.includes(r)),this._selection.selected=s.filter(r=>!o.includes(r)),this._selection.changed.added=[],this._selection.changed.removed.push(...o.filter(r=>!i.removed.includes(r))),this._latestElement=void 0,t||(this._emitEvent("move",null),this._emitEvent("stop",null)))}}return u(B,"version","3.2.6"),B});
//# sourceMappingURL=viselect.umd.js.map