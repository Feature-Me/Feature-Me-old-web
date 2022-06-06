import e,{isValidElement as t,useRef as n,useLayoutEffect as o,useEffect as s,cloneElement as a,useReducer as r,useState as i,forwardRef as c}from"react";import l from"clsx";function u(e){return"number"==typeof e&&!isNaN(e)}function d(e){return"boolean"==typeof e}function p(e){return"string"==typeof e}function m(e){return"function"==typeof e}function f(e){return p(e)||m(e)?e:null}function g(e){return 0===e||e}function y(e){return t(e)||p(e)||m(e)||u(e)}const h={TOP_LEFT:"top-left",TOP_RIGHT:"top-right",TOP_CENTER:"top-center",BOTTOM_LEFT:"bottom-left",BOTTOM_RIGHT:"bottom-right",BOTTOM_CENTER:"bottom-center"},T={INFO:"info",SUCCESS:"success",WARNING:"warning",ERROR:"error",DEFAULT:"default"};function v(e,t,n){void 0===n&&(n=300);const{scrollHeight:o,style:s}=e;requestAnimationFrame(()=>{s.minHeight="initial",s.height=o+"px",s.transition="all "+n+"ms",requestAnimationFrame(()=>{s.height="0",s.padding="0",s.margin="0",setTimeout(t,n)})})}function E(t){let{enter:a,exit:r,appendPosition:i=!1,collapse:c=!0,collapseDuration:l=300}=t;return function(t){let{children:u,position:d,preventExitTransition:p,done:m,nodeRef:f,isIn:g}=t;const y=i?a+"--"+d:a,h=i?r+"--"+d:r,T=n(),E=n(0);function b(e){if(e.target!==f.current)return;const t=f.current;t.dispatchEvent(new Event("d")),t.removeEventListener("animationend",b),t.removeEventListener("animationcancel",b),0===E.current&&"animationcancel"!==e.type&&(t.className=T.current)}function C(){const e=f.current;e.removeEventListener("animationend",C),c?v(e,m,l):m()}return o(()=>{!function(){const e=f.current;T.current=e.className,e.className+=" "+y,e.addEventListener("animationend",b),e.addEventListener("animationcancel",b)}()},[]),s(()=>{g||(p?C():function(){E.current=1;const e=f.current;e.className+=" "+h,e.addEventListener("animationend",C)}())},[g]),e.createElement(e.Fragment,null,u)}}function b(e,t){return{content:e.content,containerId:e.props.containerId,id:e.props.toastId,theme:e.props.theme,type:e.props.type,data:e.props.data||{},isLoading:e.props.isLoading,icon:e.props.icon,status:t}}const C={list:new Map,emitQueue:new Map,on(e,t){return this.list.has(e)||this.list.set(e,[]),this.list.get(e).push(t),this},off(e,t){if(t){const n=this.list.get(e).filter(e=>e!==t);return this.list.set(e,n),this}return this.list.delete(e),this},cancelEmit(e){const t=this.emitQueue.get(e);return t&&(t.forEach(clearTimeout),this.emitQueue.delete(e)),this},emit(e){this.list.has(e)&&this.list.get(e).forEach(t=>{const n=setTimeout(()=>{t(...[].slice.call(arguments,1))},0);this.emitQueue.has(e)||this.emitQueue.set(e,[]),this.emitQueue.get(e).push(n)})}},_=t=>{let{theme:n,type:o,...s}=t;return e.createElement("svg",{viewBox:"0 0 24 24",width:"100%",height:"100%",fill:"colored"===n?"currentColor":"var(--toastify-icon-color-"+o+")",...s})},I={info:function(t){return e.createElement(_,{...t},e.createElement("path",{d:"M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z"}))},warning:function(t){return e.createElement(_,{...t},e.createElement("path",{d:"M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z"}))},success:function(t){return e.createElement(_,{...t},e.createElement("path",{d:"M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"}))},error:function(t){return e.createElement(_,{...t},e.createElement("path",{d:"M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"}))},spinner:function(){return e.createElement("div",{className:"Toastify__spinner"})}};function O(e){const[,o]=r(e=>e+1,0),[c,l]=i([]),h=n(null),T=n(new Map).current,v=e=>-1!==c.indexOf(e),E=n({toastKey:1,displayedToast:0,count:0,queue:[],props:e,containerId:null,isToastActive:v,getToast:e=>T.get(e)}).current;function _(e){let{containerId:t}=e;const{limit:n}=E.props;!n||t&&E.containerId!==t||(E.count-=E.queue.length,E.queue=[])}function O(e){l(t=>g(e)?t.filter(t=>t!==e):[])}function L(){const{toastContent:e,toastProps:t,staleId:n}=E.queue.shift();P(e,t,n)}function N(e,n){let{delay:s,staleId:r,...i}=n;if(!y(e)||function(e){return!h.current||E.props.enableMultiContainer&&e.containerId!==E.props.containerId||T.has(e.toastId)&&null==e.updateId}(i))return;const{toastId:c,updateId:l,data:v}=i,{props:_}=E,N=()=>O(c),x=null==l;x&&E.count++;const R={toastId:c,updateId:l,data:v,containerId:i.containerId,isLoading:i.isLoading,theme:i.theme||_.theme,icon:null!=i.icon?i.icon:_.icon,isIn:!1,key:i.key||E.toastKey++,type:i.type,closeToast:N,closeButton:i.closeButton,rtl:_.rtl,position:i.position||_.position,transition:i.transition||_.transition,className:f(i.className||_.toastClassName),bodyClassName:f(i.bodyClassName||_.bodyClassName),style:i.style||_.toastStyle,bodyStyle:i.bodyStyle||_.bodyStyle,onClick:i.onClick||_.onClick,pauseOnHover:d(i.pauseOnHover)?i.pauseOnHover:_.pauseOnHover,pauseOnFocusLoss:d(i.pauseOnFocusLoss)?i.pauseOnFocusLoss:_.pauseOnFocusLoss,draggable:d(i.draggable)?i.draggable:_.draggable,draggablePercent:i.draggablePercent||_.draggablePercent,draggableDirection:i.draggableDirection||_.draggableDirection,closeOnClick:d(i.closeOnClick)?i.closeOnClick:_.closeOnClick,progressClassName:f(i.progressClassName||_.progressClassName),progressStyle:i.progressStyle||_.progressStyle,autoClose:!i.isLoading&&(k=i.autoClose,B=_.autoClose,!1===k||u(k)&&k>0?k:B),hideProgressBar:d(i.hideProgressBar)?i.hideProgressBar:_.hideProgressBar,progress:i.progress,role:i.role||_.role,deleteToast(){const e=b(T.get(c),"removed");T.delete(c),C.emit(4,e);const t=E.queue.length;if(E.count=g(c)?E.count-1:E.count-E.displayedToast,E.count<0&&(E.count=0),t>0){const e=g(c)?1:E.props.limit;if(1===t||1===e)E.displayedToast++,L();else{const n=e>t?t:e;E.displayedToast=n;for(let e=0;e<n;e++)L()}}else o()}};var k,B;R.iconOut=function(e){let{theme:n,type:o,isLoading:s,icon:r}=e,i=null;const c={theme:n,type:o};return!1===r||(m(r)?i=r(c):t(r)?i=a(r,c):p(r)||u(r)?i=r:s?i=I.spinner():(e=>e in I)(o)&&(i=I[o](c))),i}(R),m(i.onOpen)&&(R.onOpen=i.onOpen),m(i.onClose)&&(R.onClose=i.onClose),R.closeButton=_.closeButton,!1===i.closeButton||y(i.closeButton)?R.closeButton=i.closeButton:!0===i.closeButton&&(R.closeButton=!y(_.closeButton)||_.closeButton);let M=e;t(e)&&!p(e.type)?M=a(e,{closeToast:N,toastProps:R,data:v}):m(e)&&(M=e({closeToast:N,toastProps:R,data:v})),_.limit&&_.limit>0&&E.count>_.limit&&x?E.queue.push({toastContent:M,toastProps:R,staleId:r}):u(s)?setTimeout(()=>{P(M,R,r)},s):P(M,R,r)}function P(e,t,n){const{toastId:o}=t;n&&T.delete(n);const s={content:e,props:t};T.set(o,s),l(e=>[...e,o].filter(e=>e!==n)),C.emit(4,b(s,null==s.props.updateId?"added":"updated"))}return s(()=>(E.containerId=e.containerId,C.cancelEmit(3).on(0,N).on(1,e=>h.current&&O(e)).on(5,_).emit(2,E),()=>C.emit(3,E)),[]),s(()=>{E.props=e,E.isToastActive=v,E.displayedToast=c.length}),{getToastToRender:function(t){const n=new Map,o=Array.from(T.values());return e.newestOnTop&&o.reverse(),o.forEach(e=>{const{position:t}=e.props;n.has(t)||n.set(t,[]),n.get(t).push(e)}),Array.from(n,e=>t(e[0],e[1]))},containerRef:h,isToastActive:v}}function L(e){return e.targetTouches&&e.targetTouches.length>=1?e.targetTouches[0].clientX:e.clientX}function N(e){return e.targetTouches&&e.targetTouches.length>=1?e.targetTouches[0].clientY:e.clientY}function P(e){const[o,a]=i(!1),[r,c]=i(!1),l=n(null),u=n({start:0,x:0,y:0,delta:0,removalDistance:0,canCloseOnClick:!0,canDrag:!1,boundingRect:null,didMove:!1}).current,d=n(e),{autoClose:p,pauseOnHover:f,closeToast:g,onClick:y,closeOnClick:h}=e;function T(t){if(e.draggable){u.didMove=!1,document.addEventListener("mousemove",C),document.addEventListener("mouseup",_),document.addEventListener("touchmove",C),document.addEventListener("touchend",_);const n=l.current;u.canCloseOnClick=!0,u.canDrag=!0,u.boundingRect=n.getBoundingClientRect(),n.style.transition="",u.x=L(t.nativeEvent),u.y=N(t.nativeEvent),"x"===e.draggableDirection?(u.start=u.x,u.removalDistance=n.offsetWidth*(e.draggablePercent/100)):(u.start=u.y,u.removalDistance=n.offsetHeight*(80===e.draggablePercent?1.5*e.draggablePercent:e.draggablePercent/100))}}function v(){if(u.boundingRect){const{top:t,bottom:n,left:o,right:s}=u.boundingRect;e.pauseOnHover&&u.x>=o&&u.x<=s&&u.y>=t&&u.y<=n?b():E()}}function E(){a(!0)}function b(){a(!1)}function C(t){const n=l.current;u.canDrag&&n&&(u.didMove=!0,o&&b(),u.x=L(t),u.y=N(t),u.delta="x"===e.draggableDirection?u.x-u.start:u.y-u.start,u.start!==u.x&&(u.canCloseOnClick=!1),n.style.transform="translate"+e.draggableDirection+"("+u.delta+"px)",n.style.opacity=""+(1-Math.abs(u.delta/u.removalDistance)))}function _(){document.removeEventListener("mousemove",C),document.removeEventListener("mouseup",_),document.removeEventListener("touchmove",C),document.removeEventListener("touchend",_);const t=l.current;if(u.canDrag&&u.didMove&&t){if(u.canDrag=!1,Math.abs(u.delta)>u.removalDistance)return c(!0),void e.closeToast();t.style.transition="transform 0.2s, opacity 0.2s",t.style.transform="translate"+e.draggableDirection+"(0)",t.style.opacity="1"}}s(()=>{d.current=e}),s(()=>(l.current&&l.current.addEventListener("d",E,{once:!0}),m(e.onOpen)&&e.onOpen(t(e.children)&&e.children.props),()=>{const e=d.current;m(e.onClose)&&e.onClose(t(e.children)&&e.children.props)}),[]),s(()=>(e.pauseOnFocusLoss&&(document.hasFocus()||b(),window.addEventListener("focus",E),window.addEventListener("blur",b)),()=>{e.pauseOnFocusLoss&&(window.removeEventListener("focus",E),window.removeEventListener("blur",b))}),[e.pauseOnFocusLoss]);const I={onMouseDown:T,onTouchStart:T,onMouseUp:v,onTouchEnd:v};return p&&f&&(I.onMouseEnter=b,I.onMouseLeave=E),h&&(I.onClick=e=>{y&&y(e),u.canCloseOnClick&&g()}),{playToast:E,pauseToast:b,isRunning:o,preventExitTransition:r,toastRef:l,eventHandlers:I}}function x(t){let{closeToast:n,theme:o,ariaLabel:s="close"}=t;return e.createElement("button",{className:"Toastify__close-button Toastify__close-button--"+o,type:"button",onClick:e=>{e.stopPropagation(),n(e)},"aria-label":s},e.createElement("svg",{"aria-hidden":"true",viewBox:"0 0 14 16"},e.createElement("path",{fillRule:"evenodd",d:"M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"})))}function R(t){let{delay:n,isRunning:o,closeToast:s,type:a,hide:r,className:i,style:c,controlledProgress:u,progress:d,rtl:p,isIn:f,theme:g}=t;const y={...c,animationDuration:n+"ms",animationPlayState:o?"running":"paused",opacity:r?0:1};u&&(y.transform="scaleX("+d+")");const h=l("Toastify__progress-bar",u?"Toastify__progress-bar--controlled":"Toastify__progress-bar--animated","Toastify__progress-bar-theme--"+g,"Toastify__progress-bar--"+a,{"Toastify__progress-bar--rtl":p}),T=m(i)?i({rtl:p,type:a,defaultClassName:h}):l(h,i);return e.createElement("div",{role:"progressbar","aria-hidden":r?"true":"false","aria-label":"notification timer",className:T,style:y,[u&&d>=1?"onTransitionEnd":"onAnimationEnd"]:u&&d<1?null:()=>{f&&s()}})}R.defaultProps={type:T.DEFAULT,hide:!1};const k=t=>{const{isRunning:n,preventExitTransition:o,toastRef:s,eventHandlers:a}=P(t),{closeButton:r,children:i,autoClose:c,onClick:u,type:d,hideProgressBar:p,closeToast:f,transition:g,position:y,className:h,style:T,bodyClassName:v,bodyStyle:E,progressClassName:b,progressStyle:C,updateId:_,role:I,progress:O,rtl:L,toastId:N,deleteToast:k,isIn:B,isLoading:M,iconOut:D,theme:w}=t,A=l("Toastify__toast","Toastify__toast-theme--"+w,"Toastify__toast--"+d,{"Toastify__toast--rtl":L}),F=m(h)?h({rtl:L,position:y,type:d,defaultClassName:A}):l(A,h),S=!!O,z={closeToast:f,type:d,theme:w};let H=null;return!1===r||(H=m(r)?r(z):e.isValidElement(r)?e.cloneElement(r,z):x(z)),e.createElement(g,{isIn:B,done:k,position:y,preventExitTransition:o,nodeRef:s},e.createElement("div",{id:N,onClick:u,className:F,...a,style:T,ref:s},e.createElement("div",{...B&&{role:I},className:m(v)?v({type:d}):l("Toastify__toast-body",v),style:E},null!=D&&e.createElement("div",{className:l("Toastify__toast-icon",{"Toastify--animate-icon Toastify__zoom-enter":!M})},D),e.createElement("div",null,i)),H,(c||S)&&e.createElement(R,{..._&&!S?{key:"pb-"+_}:{},rtl:L,theme:w,delay:c,isRunning:n,isIn:B,closeToast:f,hide:p,type:d,style:C,className:b,controlledProgress:S,progress:O})))},B=E({enter:"Toastify--animate Toastify__bounce-enter",exit:"Toastify--animate Toastify__bounce-exit",appendPosition:!0}),M=E({enter:"Toastify--animate Toastify__slide-enter",exit:"Toastify--animate Toastify__slide-exit",appendPosition:!0}),D=E({enter:"Toastify--animate Toastify__zoom-enter",exit:"Toastify--animate Toastify__zoom-exit"}),w=E({enter:"Toastify--animate Toastify__flip-enter",exit:"Toastify--animate Toastify__flip-exit"}),A=c((t,n)=>{const{getToastToRender:o,containerRef:a,isToastActive:r}=O(t),{className:i,style:c,rtl:u,containerId:d}=t;function p(e){const t=l("Toastify__toast-container","Toastify__toast-container--"+e,{"Toastify__toast-container--rtl":u});return m(i)?i({position:e,rtl:u,defaultClassName:t}):l(t,f(i))}return s(()=>{n&&(n.current=a.current)},[]),e.createElement("div",{ref:a,className:"Toastify",id:d},o((t,n)=>{const o=n.length?{...c}:{...c,pointerEvents:"none"};return e.createElement("div",{className:p(t),style:o,key:"container-"+t},n.map((t,o)=>{let{content:s,props:a}=t;return e.createElement(k,{...a,isIn:r(a.toastId),style:{...a.style,"--nth":o+1,"--len":n.length},key:"toast-"+a.key},s)}))}))});A.displayName="ToastContainer",A.defaultProps={position:h.TOP_RIGHT,transition:B,rtl:!1,autoClose:5e3,hideProgressBar:!1,closeButton:x,pauseOnHover:!0,pauseOnFocusLoss:!0,closeOnClick:!0,newestOnTop:!1,draggable:!0,draggablePercent:80,draggableDirection:"x",role:"alert",theme:"light"};let F,S=new Map,z=[];function H(){return Math.random().toString(36).substring(2,9)}function q(e){return e&&(p(e.toastId)||u(e.toastId))?e.toastId:H()}function U(e,t){return S.size>0?C.emit(0,e,t):z.push({content:e,options:t}),t.toastId}function Q(e,t){return{...t,type:t&&t.type||e,toastId:q(t)}}function G(e){return(t,n)=>U(t,Q(e,n))}function W(e,t){return U(e,Q(T.DEFAULT,t))}W.loading=(e,t)=>U(e,Q(T.DEFAULT,{isLoading:!0,autoClose:!1,closeOnClick:!1,closeButton:!1,draggable:!1,...t})),W.promise=function(e,t,n){let o,{pending:s,error:a,success:r}=t;s&&(o=p(s)?W.loading(s,n):W.loading(s.render,{...n,...s}));const i={isLoading:null,autoClose:null,closeOnClick:null,closeButton:null,draggable:null,delay:100},c=(e,t,s)=>{if(null==t)return void W.dismiss(o);const a={type:e,...i,...n,data:s},r=p(t)?{render:t}:t;return o?W.update(o,{...a,...r}):W(r.render,{...a,...r}),s},l=m(e)?e():e;return l.then(e=>c("success",r,e)).catch(e=>c("error",a,e)),l},W.success=G(T.SUCCESS),W.info=G(T.INFO),W.error=G(T.ERROR),W.warning=G(T.WARNING),W.warn=W.warning,W.dark=(e,t)=>U(e,Q(T.DEFAULT,{theme:"dark",...t})),W.dismiss=e=>C.emit(1,e),W.clearWaitingQueue=function(e){return void 0===e&&(e={}),C.emit(5,e)},W.isActive=e=>{let t=!1;return S.forEach(n=>{n.isToastActive&&n.isToastActive(e)&&(t=!0)}),t},W.update=function(e,t){void 0===t&&(t={}),setTimeout(()=>{const n=function(e,t){let{containerId:n}=t;const o=S.get(n||F);return o?o.getToast(e):null}(e,t);if(n){const{props:o,content:s}=n,a={...o,...t,toastId:t.toastId||e,updateId:H()};a.toastId!==e&&(a.staleId=e);const r=a.render||s;delete a.render,U(r,a)}},0)},W.done=e=>{W.update(e,{progress:1})},W.onChange=e=>(C.on(4,e),()=>{C.off(4,e)}),W.POSITION=h,W.TYPE=T,C.on(2,e=>{F=e.containerId||e,S.set(F,e),z.forEach(e=>{C.emit(0,e.content,e.options)}),z=[]}).on(3,e=>{S.delete(e.containerId||e),0===S.size&&C.off(0).off(1).off(5)});export{B as Bounce,w as Flip,I as Icons,M as Slide,A as ToastContainer,D as Zoom,v as collapseToast,E as cssTransition,W as toast,P as useToast,O as useToastContainer};
//# sourceMappingURL=react-toastify.esm.js.map
