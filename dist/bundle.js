!function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return t[r].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}var i=n(1),o=r(i);window.heatm=o["default"]},function(t,e,n){"use strict";function r(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e["default"]=t,e}function i(t){t&&(s.config=t)}Object.defineProperty(e,"__esModule",{value:!0});var o=n(2),a=r(o),s={recording:!1,posting:!1,recordedPoints:[],config:{projectName:"default",onNewPoint:null,postPointsUrl:null,postPointsBatch:50,maxPointsToDraw:null,maxPointsToPost:null,postPointsInterval:250,getPointsInterval:250}};e["default"]=function(t){return i(t),{startRecording:function(){a.startRecording(s)},stopRecording:function(){a.stopRecording(s)},startPostingPoints:function(){a.startPostingPoints(s)},stopPostingPoints:function(){a.stopPostingPoints(s)},drawHeatMap:function(){a.drawHeatMap(s)},drawHeatMapFromRemote:function(){a.drawHeatMapFromRemote(s)}}}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function i(t){t.recording=!0,f(t)}function o(t){t.recording=!1,window.onmousemove=null}function a(t){if(!t.config.postPointsUrl)throw new Error("No postPointsUrl configured");t.posting=!0,f(t),_||(_=(0,v["default"])(t.config.projectName,t.config.postPointsUrl,t.config.pointsPostBatch,t.config.maxPointsToPost,t.config.postPointsInterval)),_.startPosting()}function s(t){t.posting=!1,_&&_.stopPosting()}function u(t){o(t),h["default"].drawByBatch(t.recordedPoints,t.config.pointsBatch)}function c(t,e){(0,g["default"])(t.config)}function f(t){window.onmousemove||(window.onmousemove=function(e){l(t,e.clientX,e.clientY)})}function l(t,e,n){t.config.onNewPoint&&t.config.onNewPoint(e,n),t.recording&&t.recordedPoints.push({x:e,y:n}),t.posting&&_.queuePoint({x:e,y:n})}Object.defineProperty(e,"__esModule",{value:!0}),e.startRecording=i,e.stopRecording=o,e.startPostingPoints=a,e.stopPostingPoints=s,e.drawHeatMap=u,e.drawHeatMapFromRemote=c;var d=n(3),h=r(d),p=n(5),g=r(p),m=n(29),v=r(m),_=null},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function i(){var t=document.getElementById("heatmapContainer");if(!t){var e=document.createElement("div");e.id="heatmapContainer",e.style.zIndex=1e3,e.style.position="absolute",e.style.top=0,e.style.left=0,e.style.width="100%",e.style.height="100%",document.body.style.margin=0,document.body.style.padding=0,document.body.appendChild(e),f=c["default"].create({container:e}),f.setData({max:10,data:[{x:1,y:1,value:0}]})}}function o(t,e,n){n>=t.length&&(n=t.length),e>=t.length||(n||(n=t.length>100?50:100),setTimeout(function(){for(var r=e;r<n-1;r++)f.addData({x:t[r].x,y:t[r].y,value:1});o(t,e+l,n+l)},100))}function a(t,e){i(),t&&t.length>0&&(e&&(l=e),o(t,0))}function s(t){i();for(var e=0;e<t.length;e++)f.addData({x:t[e].x,y:t[e].y,value:1})}Object.defineProperty(e,"__esModule",{value:!0});var u=n(4),c=r(u),f=null,l=50;e["default"]={drawByBatch:a,draw:s}},function(t,e,n){var r,i;!function(o,a,s){"undefined"!=typeof t&&t.exports?t.exports=s():(r=s,i="function"==typeof r?r.call(e,n,e,t):r,!(void 0!==i&&(t.exports=i)))}("h337",this,function(){var t={defaultRadius:40,defaultRenderer:"canvas2d",defaultGradient:{.25:"rgb(0,0,255)",.55:"rgb(0,255,0)",.85:"yellow",1:"rgb(255,0,0)"},defaultMaxOpacity:1,defaultMinOpacity:0,defaultBlur:.85,defaultXField:"x",defaultYField:"y",defaultValueField:"value",plugins:{}},e=function(){var e=function(t){this._coordinator={},this._data=[],this._radi=[],this._min=10,this._max=1,this._xField=t.xField||t.defaultXField,this._yField=t.yField||t.defaultYField,this._valueField=t.valueField||t.defaultValueField,t.radius&&(this._cfgRadius=t.radius)},n=t.defaultRadius;return e.prototype={_organiseData:function(t,e){var r=t[this._xField],i=t[this._yField],o=this._radi,a=this._data,s=this._max,u=this._min,c=t[this._valueField]||1,f=t.radius||this._cfgRadius||n;a[r]||(a[r]=[],o[r]=[]),a[r][i]?a[r][i]+=c:(a[r][i]=c,o[r][i]=f);var l=a[r][i];return l>s?(e?this.setDataMax(l):this._max=l,!1):l<u?(e?this.setDataMin(l):this._min=l,!1):{x:r,y:i,value:c,radius:f,min:u,max:s}},_unOrganizeData:function(){var t=[],e=this._data,n=this._radi;for(var r in e)for(var i in e[r])t.push({x:r,y:i,radius:n[r][i],value:e[r][i]});return{min:this._min,max:this._max,data:t}},_onExtremaChange:function(){this._coordinator.emit("extremachange",{min:this._min,max:this._max})},addData:function(){if(arguments[0].length>0)for(var t=arguments[0],e=t.length;e--;)this.addData.call(this,t[e]);else{var n=this._organiseData(arguments[0],!0);n&&(0===this._data.length&&(this._min=this._max=n.value),this._coordinator.emit("renderpartial",{min:this._min,max:this._max,data:[n]}))}return this},setData:function(t){var e=t.data,n=e.length;this._data=[],this._radi=[];for(var r=0;r<n;r++)this._organiseData(e[r],!1);return this._max=t.max,this._min=t.min||0,this._onExtremaChange(),this._coordinator.emit("renderall",this._getInternalData()),this},removeData:function(){},setDataMax:function(t){return this._max=t,this._onExtremaChange(),this._coordinator.emit("renderall",this._getInternalData()),this},setDataMin:function(t){return this._min=t,this._onExtremaChange(),this._coordinator.emit("renderall",this._getInternalData()),this},setCoordinator:function(t){this._coordinator=t},_getInternalData:function(){return{max:this._max,min:this._min,data:this._data,radi:this._radi}},getData:function(){return this._unOrganizeData()}},e}(),n=function(){function t(t){var n=t.container,r=this.shadowCanvas=document.createElement("canvas"),i=this.canvas=t.canvas||document.createElement("canvas"),o=(this._renderBoundaries=[1e4,1e4,0,0],getComputedStyle(t.container)||{});i.className="heatmap-canvas",this._width=i.width=r.width=t.width||+o.width.replace(/px/,""),this._height=i.height=r.height=t.height||+o.height.replace(/px/,""),this.shadowCtx=r.getContext("2d"),this.ctx=i.getContext("2d"),i.style.cssText=r.style.cssText="position:absolute;left:0;top:0;",n.style.position="relative",n.appendChild(i),this._palette=e(t),this._templates={},this._setStyles(t)}var e=function(t){var e=t.gradient||t.defaultGradient,n=document.createElement("canvas"),r=n.getContext("2d");n.width=256,n.height=1;var i=r.createLinearGradient(0,0,256,1);for(var o in e)i.addColorStop(o,e[o]);return r.fillStyle=i,r.fillRect(0,0,256,1),r.getImageData(0,0,256,1).data},n=function(t,e){var n=document.createElement("canvas"),r=n.getContext("2d"),i=t,o=t;if(n.width=n.height=2*t,1==e)r.beginPath(),r.arc(i,o,t,0,2*Math.PI,!1),r.fillStyle="rgba(0,0,0,1)",r.fill();else{var a=r.createRadialGradient(i,o,t*e,i,o,t);a.addColorStop(0,"rgba(0,0,0,1)"),a.addColorStop(1,"rgba(0,0,0,0)"),r.fillStyle=a,r.fillRect(0,0,2*t,2*t)}return n},r=function(t){for(var e=[],n=t.min,r=t.max,i=t.radi,t=t.data,o=Object.keys(t),a=o.length;a--;)for(var s=o[a],u=Object.keys(t[s]),c=u.length;c--;){var f=u[c],l=t[s][f],d=i[s][f];e.push({x:s,y:f,value:l,radius:d})}return{min:n,max:r,data:e}};return t.prototype={renderPartial:function(t){t.data.length>0&&(this._drawAlpha(t),this._colorize())},renderAll:function(t){this._clear(),t.data.length>0&&(this._drawAlpha(r(t)),this._colorize())},_updateGradient:function(t){this._palette=e(t)},updateConfig:function(t){t.gradient&&this._updateGradient(t),this._setStyles(t)},setDimensions:function(t,e){this._width=t,this._height=e,this.canvas.width=this.shadowCanvas.width=t,this.canvas.height=this.shadowCanvas.height=e},_clear:function(){this.shadowCtx.clearRect(0,0,this._width,this._height),this.ctx.clearRect(0,0,this._width,this._height)},_setStyles:function(t){this._blur=0==t.blur?0:t.blur||t.defaultBlur,t.backgroundColor&&(this.canvas.style.backgroundColor=t.backgroundColor),this._width=this.canvas.width=this.shadowCanvas.width=t.width||this._width,this._height=this.canvas.height=this.shadowCanvas.height=t.height||this._height,this._opacity=255*(t.opacity||0),this._maxOpacity=255*(t.maxOpacity||t.defaultMaxOpacity),this._minOpacity=255*(t.minOpacity||t.defaultMinOpacity),this._useGradientOpacity=!!t.useGradientOpacity},_drawAlpha:function(t){for(var e=this._min=t.min,r=this._max=t.max,t=t.data||[],i=t.length,o=1-this._blur;i--;){var a,s=t[i],u=s.x,c=s.y,f=s.radius,l=Math.min(s.value,r),d=u-f,h=c-f,p=this.shadowCtx;this._templates[f]?a=this._templates[f]:this._templates[f]=a=n(f,o);var g=(l-e)/(r-e);p.globalAlpha=g<.01?.01:g,p.drawImage(a,d,h),d<this._renderBoundaries[0]&&(this._renderBoundaries[0]=d),h<this._renderBoundaries[1]&&(this._renderBoundaries[1]=h),d+2*f>this._renderBoundaries[2]&&(this._renderBoundaries[2]=d+2*f),h+2*f>this._renderBoundaries[3]&&(this._renderBoundaries[3]=h+2*f)}},_colorize:function(){var t=this._renderBoundaries[0],e=this._renderBoundaries[1],n=this._renderBoundaries[2]-t,r=this._renderBoundaries[3]-e,i=this._width,o=this._height,a=this._opacity,s=this._maxOpacity,u=this._minOpacity,c=this._useGradientOpacity;t<0&&(t=0),e<0&&(e=0),t+n>i&&(n=i-t),e+r>o&&(r=o-e);for(var f=this.shadowCtx.getImageData(t,e,n,r),l=f.data,d=l.length,h=this._palette,p=3;p<d;p+=4){var g=l[p],m=4*g;if(m){var v;v=a>0?a:g<s?g<u?u:g:s,l[p-3]=h[m],l[p-2]=h[m+1],l[p-1]=h[m+2],l[p]=c?h[m+3]:v}}f.data=l,this.ctx.putImageData(f,t,e),this._renderBoundaries=[1e3,1e3,0,0]},getValueAt:function(t){var e,n=this.shadowCtx,r=n.getImageData(t.x,t.y,1,1),i=r.data[3],o=this._max,a=this._min;return e=Math.abs(o-a)*(i/255)>>0},getDataURL:function(){return this.canvas.toDataURL()}},t}(),r=function(){var e=!1;return"canvas2d"===t.defaultRenderer&&(e=n),e}(),i={merge:function(){for(var t={},e=arguments.length,n=0;n<e;n++){var r=arguments[n];for(var i in r)t[i]=r[i]}return t}},o=function(){function n(){var n=this._config=i.merge(t,arguments[0]||{});if(this._coordinator=new o,n.plugin){var s=n.plugin;if(!t.plugins[s])throw new Error("Plugin '"+s+"' not found. Maybe it was not registered.");var u=t.plugins[s];this._renderer=new u.renderer(n),this._store=new u.store(n)}else this._renderer=new r(n),this._store=new e(n);a(this)}var o=function(){function t(){this.cStore={}}return t.prototype={on:function(t,e,n){var r=this.cStore;r[t]||(r[t]=[]),r[t].push(function(t){return e.call(n,t)})},emit:function(t,e){var n=this.cStore;if(n[t])for(var r=n[t].length,i=0;i<r;i++){var o=n[t][i];o(e)}}},t}(),a=function(t){var e=t._renderer,n=t._coordinator,r=t._store;n.on("renderpartial",e.renderPartial,e),n.on("renderall",e.renderAll,e),n.on("extremachange",function(e){t._config.onExtremaChange&&t._config.onExtremaChange({min:e.min,max:e.max,gradient:t._config.gradient||t._config.defaultGradient})}),r.setCoordinator(n)};return n.prototype={addData:function(){return this._store.addData.apply(this._store,arguments),this},removeData:function(){return this._store.removeData&&this._store.removeData.apply(this._store,arguments),this},setData:function(){return this._store.setData.apply(this._store,arguments),this},setDataMax:function(){return this._store.setDataMax.apply(this._store,arguments),this},setDataMin:function(){return this._store.setDataMin.apply(this._store,arguments),this},configure:function(t){return this._config=i.merge(this._config,t),this._renderer.updateConfig(this._config),this._coordinator.emit("renderall",this._store._getInternalData()),this},repaint:function(){return this._coordinator.emit("renderall",this._store._getInternalData()),this},getData:function(){return this._store.getData()},getDataURL:function(){return this._renderer.getDataURL()},getValueAt:function(t){return this._store.getValueAt?this._store.getValueAt(t):this._renderer.getValueAt?this._renderer.getValueAt(t):null}},n}(),a={create:function(t){return new o(t)},register:function(e,n){t.plugins[e]=n}};return a})},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function i(){o()}function o(){var t={project:f.projectName,screen:f.screen,limitLeft:l,limitRight:l+f.getPointsBatch};s["default"].get(f.getPointsUrl,{params:t}).then(function(t){t.data.points.length>0&&(c["default"].draw(t.data.points),l=l+t.data.points.length+1)})["catch"](function(t){console.log(t)}),setTimeout(o,f.getPointsInterval||50)}Object.defineProperty(e,"__esModule",{value:!0});var a=n(6),s=r(a),u=n(3),c=r(u),f=null,l=0;e["default"]=function(t){f=t,i()}},function(t,e,n){t.exports=n(7)},function(t,e,n){"use strict";function r(t){var e=new a(t),n=o(a.prototype.request,e);return i.extend(n,a.prototype,e),i.extend(n,e),n}var i=n(8),o=n(9),a=n(10),s=r();s.Axios=a,s.create=function(t){return r(t)},s.all=function(t){return Promise.all(t)},s.spread=n(28),t.exports=s,t.exports["default"]=s},function(t,e,n){"use strict";function r(t){return"[object Array]"===b.call(t)}function i(t){return"[object ArrayBuffer]"===b.call(t)}function o(t){return"undefined"!=typeof FormData&&t instanceof FormData}function a(t){var e;return e="undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(t):t&&t.buffer&&t.buffer instanceof ArrayBuffer}function s(t){return"string"==typeof t}function u(t){return"number"==typeof t}function c(t){return"undefined"==typeof t}function f(t){return null!==t&&"object"==typeof t}function l(t){return"[object Date]"===b.call(t)}function d(t){return"[object File]"===b.call(t)}function h(t){return"[object Blob]"===b.call(t)}function p(t){return"[object Function]"===b.call(t)}function g(t){return f(t)&&p(t.pipe)}function m(t){return"undefined"!=typeof URLSearchParams&&t instanceof URLSearchParams}function v(t){return t.replace(/^\s*/,"").replace(/\s*$/,"")}function _(){return"undefined"!=typeof window&&"undefined"!=typeof document&&"function"==typeof document.createElement}function y(t,e){if(null!==t&&"undefined"!=typeof t)if("object"==typeof t||r(t)||(t=[t]),r(t))for(var n=0,i=t.length;n<i;n++)e.call(null,t[n],n,t);else for(var o in t)t.hasOwnProperty(o)&&e.call(null,t[o],o,t)}function w(){function t(t,n){"object"==typeof e[n]&&"object"==typeof t?e[n]=w(e[n],t):e[n]=t}for(var e={},n=0,r=arguments.length;n<r;n++)y(arguments[n],t);return e}function x(t,e,n){return y(e,function(e,r){n&&"function"==typeof e?t[r]=P(e,n):t[r]=e}),t}var P=n(9),b=Object.prototype.toString;t.exports={isArray:r,isArrayBuffer:i,isFormData:o,isArrayBufferView:a,isString:s,isNumber:u,isObject:f,isUndefined:c,isDate:l,isFile:d,isBlob:h,isFunction:p,isStream:g,isURLSearchParams:m,isStandardBrowserEnv:_,forEach:y,merge:w,extend:x,trim:v}},function(t,e){"use strict";t.exports=function(t,e){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return t.apply(e,n)}}},function(t,e,n){"use strict";function r(t){this.defaults=o.merge(i,t),this.interceptors={request:new a,response:new a}}var i=n(11),o=n(8),a=n(13),s=n(14),u=n(26),c=n(27);r.prototype.request=function(t){"string"==typeof t&&(t=o.merge({url:arguments[0]},arguments[1])),t=o.merge(i,this.defaults,{method:"get"},t),t.baseURL&&!u(t.url)&&(t.url=c(t.baseURL,t.url));var e=[s,void 0],n=Promise.resolve(t);for(this.interceptors.request.forEach(function(t){e.unshift(t.fulfilled,t.rejected)}),this.interceptors.response.forEach(function(t){e.push(t.fulfilled,t.rejected)});e.length;)n=n.then(e.shift(),e.shift());return n},o.forEach(["delete","get","head"],function(t){r.prototype[t]=function(e,n){return this.request(o.merge(n||{},{method:t,url:e}))}}),o.forEach(["post","put","patch"],function(t){r.prototype[t]=function(e,n,r){return this.request(o.merge(r||{},{method:t,url:e,data:n}))}}),t.exports=r},function(t,e,n){"use strict";function r(t,e){!i.isUndefined(t)&&i.isUndefined(t["Content-Type"])&&(t["Content-Type"]=e)}var i=n(8),o=n(12),a=/^\)\]\}',?\n/,s={"Content-Type":"application/x-www-form-urlencoded"};t.exports={transformRequest:[function(t,e){return o(e,"Content-Type"),i.isFormData(t)||i.isArrayBuffer(t)||i.isStream(t)||i.isFile(t)||i.isBlob(t)?t:i.isArrayBufferView(t)?t.buffer:i.isURLSearchParams(t)?(r(e,"application/x-www-form-urlencoded;charset=utf-8"),t.toString()):i.isObject(t)?(r(e,"application/json;charset=utf-8"),JSON.stringify(t)):t}],transformResponse:[function(t){if("string"==typeof t){t=t.replace(a,"");try{t=JSON.parse(t)}catch(e){}}return t}],headers:{common:{Accept:"application/json, text/plain, */*"},patch:i.merge(s),post:i.merge(s),put:i.merge(s)},timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(t){return t>=200&&t<300}}},function(t,e,n){"use strict";var r=n(8);t.exports=function(t,e){r.forEach(t,function(n,r){r!==e&&r.toUpperCase()===e.toUpperCase()&&(t[e]=n,delete t[r])})}},function(t,e,n){"use strict";function r(){this.handlers=[]}var i=n(8);r.prototype.use=function(t,e){return this.handlers.push({fulfilled:t,rejected:e}),this.handlers.length-1},r.prototype.eject=function(t){this.handlers[t]&&(this.handlers[t]=null)},r.prototype.forEach=function(t){i.forEach(this.handlers,function(e){null!==e&&t(e)})},t.exports=r},function(t,e,n){(function(e){"use strict";var r=n(8),i=n(16);t.exports=function(t){t.headers=t.headers||{},t.data=i(t.data,t.headers,t.transformRequest),t.headers=r.merge(t.headers.common||{},t.headers[t.method]||{},t.headers||{}),r.forEach(["delete","get","head","post","put","patch","common"],function(e){delete t.headers[e]});var o;return"function"==typeof t.adapter?o=t.adapter:"undefined"!=typeof XMLHttpRequest?o=n(17):"undefined"!=typeof e&&(o=n(17)),Promise.resolve(t).then(o).then(function(e){return e.data=i(e.data,e.headers,t.transformResponse),e},function(e){return e&&e.response&&(e.response.data=i(e.response.data,e.response.headers,t.transformResponse)),Promise.reject(e)})}}).call(e,n(15))},function(t,e){function n(){throw new Error("setTimeout has not been defined")}function r(){throw new Error("clearTimeout has not been defined")}function i(t){if(f===setTimeout)return setTimeout(t,0);if((f===n||!f)&&setTimeout)return f=setTimeout,setTimeout(t,0);try{return f(t,0)}catch(e){try{return f.call(null,t,0)}catch(e){return f.call(this,t,0)}}}function o(t){if(l===clearTimeout)return clearTimeout(t);if((l===r||!l)&&clearTimeout)return l=clearTimeout,clearTimeout(t);try{return l(t)}catch(e){try{return l.call(null,t)}catch(e){return l.call(this,t)}}}function a(){g&&h&&(g=!1,h.length?p=h.concat(p):m=-1,p.length&&s())}function s(){if(!g){var t=i(a);g=!0;for(var e=p.length;e;){for(h=p,p=[];++m<e;)h&&h[m].run();m=-1,e=p.length}h=null,g=!1,o(t)}}function u(t,e){this.fun=t,this.array=e}function c(){}var f,l,d=t.exports={};!function(){try{f="function"==typeof setTimeout?setTimeout:n}catch(t){f=n}try{l="function"==typeof clearTimeout?clearTimeout:r}catch(t){l=r}}();var h,p=[],g=!1,m=-1;d.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];p.push(new u(t,e)),1!==p.length||g||i(s)},u.prototype.run=function(){this.fun.apply(null,this.array)},d.title="browser",d.browser=!0,d.env={},d.argv=[],d.version="",d.versions={},d.on=c,d.addListener=c,d.once=c,d.off=c,d.removeListener=c,d.removeAllListeners=c,d.emit=c,d.binding=function(t){throw new Error("process.binding is not supported")},d.cwd=function(){return"/"},d.chdir=function(t){throw new Error("process.chdir is not supported")},d.umask=function(){return 0}},function(t,e,n){"use strict";var r=n(8);t.exports=function(t,e,n){return r.forEach(n,function(n){t=n(t,e)}),t}},function(t,e,n){(function(e){"use strict";var r=n(8),i=n(18),o=n(21),a=n(22),s=n(23),u=n(19),c="undefined"!=typeof window&&window.btoa||n(24);t.exports=function(t){return new Promise(function(f,l){var d=t.data,h=t.headers;r.isFormData(d)&&delete h["Content-Type"];var p=new XMLHttpRequest,g="onreadystatechange",m=!1;if("test"===e.env.NODE_ENV||"undefined"==typeof window||!window.XDomainRequest||"withCredentials"in p||s(t.url)||(p=new window.XDomainRequest,g="onload",m=!0,p.onprogress=function(){},p.ontimeout=function(){}),t.auth){var v=t.auth.username||"",_=t.auth.password||"";h.Authorization="Basic "+c(v+":"+_)}if(p.open(t.method.toUpperCase(),o(t.url,t.params,t.paramsSerializer),!0),p.timeout=t.timeout,p[g]=function(){if(p&&(4===p.readyState||m)&&0!==p.status){var e="getAllResponseHeaders"in p?a(p.getAllResponseHeaders()):null,n=t.responseType&&"text"!==t.responseType?p.response:p.responseText,r={data:n,status:1223===p.status?204:p.status,statusText:1223===p.status?"No Content":p.statusText,headers:e,config:t,request:p};i(f,l,r),p=null}},p.onerror=function(){l(u("Network Error",t)),p=null},p.ontimeout=function(){l(u("timeout of "+t.timeout+"ms exceeded",t,"ECONNABORTED")),p=null},r.isStandardBrowserEnv()){var y=n(25),w=(t.withCredentials||s(t.url))&&t.xsrfCookieName?y.read(t.xsrfCookieName):void 0;w&&(h[t.xsrfHeaderName]=w)}if("setRequestHeader"in p&&r.forEach(h,function(t,e){"undefined"==typeof d&&"content-type"===e.toLowerCase()?delete h[e]:p.setRequestHeader(e,t)}),t.withCredentials&&(p.withCredentials=!0),t.responseType)try{p.responseType=t.responseType}catch(x){if("json"!==p.responseType)throw x}"function"==typeof t.onDownloadProgress&&p.addEventListener("progress",t.onDownloadProgress),"function"==typeof t.onUploadProgress&&p.upload&&p.upload.addEventListener("progress",t.onUploadProgress),void 0===d&&(d=null),p.send(d)})}}).call(e,n(15))},function(t,e,n){"use strict";var r=n(19);t.exports=function(t,e,n){var i=n.config.validateStatus;n.status&&i&&!i(n.status)?e(r("Request failed with status code "+n.status,n.config,null,n)):t(n)}},function(t,e,n){"use strict";var r=n(20);t.exports=function(t,e,n,i){var o=new Error(t);return r(o,e,n,i)}},function(t,e){"use strict";t.exports=function(t,e,n,r){return t.config=e,n&&(t.code=n),t.response=r,t}},function(t,e,n){"use strict";function r(t){return encodeURIComponent(t).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var i=n(8);t.exports=function(t,e,n){if(!e)return t;var o;if(n)o=n(e);else if(i.isURLSearchParams(e))o=e.toString();else{var a=[];i.forEach(e,function(t,e){null!==t&&"undefined"!=typeof t&&(i.isArray(t)&&(e+="[]"),i.isArray(t)||(t=[t]),i.forEach(t,function(t){i.isDate(t)?t=t.toISOString():i.isObject(t)&&(t=JSON.stringify(t)),a.push(r(e)+"="+r(t))}))}),o=a.join("&")}return o&&(t+=(t.indexOf("?")===-1?"?":"&")+o),t}},function(t,e,n){"use strict";var r=n(8);t.exports=function(t){var e,n,i,o={};return t?(r.forEach(t.split("\n"),function(t){i=t.indexOf(":"),e=r.trim(t.substr(0,i)).toLowerCase(),n=r.trim(t.substr(i+1)),e&&(o[e]=o[e]?o[e]+", "+n:n)}),o):o}},function(t,e,n){"use strict";var r=n(8);t.exports=r.isStandardBrowserEnv()?function(){function t(t){var e=t;return n&&(i.setAttribute("href",e),e=i.href),i.setAttribute("href",e),{href:i.href,protocol:i.protocol?i.protocol.replace(/:$/,""):"",host:i.host,search:i.search?i.search.replace(/^\?/,""):"",hash:i.hash?i.hash.replace(/^#/,""):"",hostname:i.hostname,port:i.port,pathname:"/"===i.pathname.charAt(0)?i.pathname:"/"+i.pathname}}var e,n=/(msie|trident)/i.test(navigator.userAgent),i=document.createElement("a");return e=t(window.location.href),function(n){var i=r.isString(n)?t(n):n;return i.protocol===e.protocol&&i.host===e.host}}():function(){return function(){return!0}}()},function(t,e){"use strict";function n(){this.message="String contains an invalid character"}function r(t){for(var e,r,o=String(t),a="",s=0,u=i;o.charAt(0|s)||(u="=",s%1);a+=u.charAt(63&e>>8-s%1*8)){if(r=o.charCodeAt(s+=.75),r>255)throw new n;e=e<<8|r}return a}var i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";n.prototype=new Error,n.prototype.code=5,n.prototype.name="InvalidCharacterError",t.exports=r},function(t,e,n){"use strict";var r=n(8);t.exports=r.isStandardBrowserEnv()?function(){return{write:function(t,e,n,i,o,a){var s=[];s.push(t+"="+encodeURIComponent(e)),r.isNumber(n)&&s.push("expires="+new Date(n).toGMTString()),r.isString(i)&&s.push("path="+i),r.isString(o)&&s.push("domain="+o),a===!0&&s.push("secure"),document.cookie=s.join("; ")},read:function(t){var e=document.cookie.match(new RegExp("(^|;\\s*)("+t+")=([^;]*)"));return e?decodeURIComponent(e[3]):null},remove:function(t){this.write(t,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}()},function(t,e){"use strict";t.exports=function(t){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(t)}},function(t,e){"use strict";t.exports=function(t,e){return t.replace(/\/+$/,"")+"/"+e.replace(/^\/+/,"")}},function(t,e){"use strict";t.exports=function(t){return function(e){return t.apply(null,e)}}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function i(){p=!0,o()}function o(){if(g&&m>=g&&(p=!1),p){var t=h.slice(0,d);if(t.length+m>g&&(t=t.slice(0,g-(m+t.length))),m+=t.length,t.length>0){var e={project:f,points:t,screen:{width:screen.availWidth,height:screen.availHeight}};c["default"].post(l,e).then(function(t){h=h.slice(d,h.length)})["catch"](function(t){console.log(t)})}setTimeout(o,v)}}function a(){p=!1}function s(t){h.push(t)}Object.defineProperty(e,"__esModule",{value:!0});var u=n(6),c=r(u),f=null,l=null,d=null,h=[],p=!1,g=null,m=0,v=250;e["default"]=function(t,e,n,r,o){return l=e,d=n||50,f=t,g=r,v=o||50,{startPosting:i,stopPosting:a,queuePoint:s}}}]);