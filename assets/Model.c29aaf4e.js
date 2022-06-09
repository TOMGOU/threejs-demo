var lt=Object.defineProperty,ct=Object.defineProperties;var ut=Object.getOwnPropertyDescriptors;var Re=Object.getOwnPropertySymbols;var ft=Object.prototype.hasOwnProperty,dt=Object.prototype.propertyIsEnumerable;var De=(e,t,n)=>t in e?lt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,le=(e,t)=>{for(var n in t||(t={}))ft.call(t,n)&&De(e,n,t[n]);if(Re)for(var n of Re(t))dt.call(t,n)&&De(e,n,t[n]);return e},ce=(e,t)=>ct(e,ut(t));import{S as ht,O as pt,W as mt,s as pe,L as ze,F as me,B as yt,a as Me,G,b as gt,T as be,c as _t,V as Se,d as wt,C as Tt,M as se,e as xe,D as bt,f as St,g as xt,h as Ie,i as L,A as At,j as Ct,k as Et,l as Rt,R as Dt,Q as Mt,m as It,n as $e,o as Pt,p as Lt,q as Ot,r as Pe,t as Nt,P as vt}from"./three.module.902524f2.js";import{O as Ft,G as Bt}from"./GLTFLoader.cd2228e9.js";import{_ as Gt,r as Ut}from"./index.a77ac71e.js";import{f as Ye,g as kt,h as qt,r as Le,o as Oe,c as Ne,u as ve,a as ue,j as Wt,k as O,w as Fe,l as Vt,m as Qe,t as Ht}from"./vendor.919ab38d.js";const C=new ht,Ze=window.innerWidth,Je=window.innerHeight,Be=Ze/Je,X=200,N=new pt(-X*Be,X*Be,X,-X,1,3e3);N.position.set(292,223,185);N.lookAt(C.position);const v=new mt({antialias:!0,alpha:!0});v.setPixelRatio(window.devicePixelRatio);v.setSize(Ze,Je);v.outputEncoding=pe;v.setClearColor(65535,1);const oe=new Ft(N,v.domElement);oe.minZoom=.5;oe.maxZoom=1;oe.maxPolarAngle=Math.PI/2;oe.minPolarAngle=0;const fe=new WeakMap;class zt extends ze{constructor(t){super(t);this.decoderPath="",this.decoderConfig={},this.decoderBinary=null,this.decoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL="",this.defaultAttributeIDs={position:"POSITION",normal:"NORMAL",color:"COLOR",uv:"TEX_COORD"},this.defaultAttributeTypes={position:"Float32Array",normal:"Float32Array",color:"Float32Array",uv:"Float32Array"}}setDecoderPath(t){return this.decoderPath=t,this}setDecoderConfig(t){return this.decoderConfig=t,this}setWorkerLimit(t){return this.workerLimit=t,this}load(t,n,i,r){const a=new me(this.manager);a.setPath(this.path),a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(t,s=>{const o={attributeIDs:this.defaultAttributeIDs,attributeTypes:this.defaultAttributeTypes,useUniqueIDs:!1};this.decodeGeometry(s,o).then(n).catch(r)},i,r)}decodeDracoFile(t,n,i,r){const a={attributeIDs:i||this.defaultAttributeIDs,attributeTypes:r||this.defaultAttributeTypes,useUniqueIDs:!!i};this.decodeGeometry(t,a).then(n)}decodeGeometry(t,n){for(const l in n.attributeTypes){const u=n.attributeTypes[l];u.BYTES_PER_ELEMENT!==void 0&&(n.attributeTypes[l]=u.name)}const i=JSON.stringify(n);if(fe.has(t)){const l=fe.get(t);if(l.key===i)return l.promise;if(t.byteLength===0)throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")}let r;const a=this.workerNextTaskID++,s=t.byteLength,o=this._getWorker(a,s).then(l=>(r=l,new Promise((u,c)=>{r._callbacks[a]={resolve:u,reject:c},r.postMessage({type:"decode",id:a,taskConfig:n,buffer:t},[t])}))).then(l=>this._createGeometry(l.geometry));return o.catch(()=>!0).then(()=>{r&&a&&this._releaseTask(r,a)}),fe.set(t,{key:i,promise:o}),o}_createGeometry(t){const n=new yt;t.index&&n.setIndex(new Me(t.index.array,1));for(let i=0;i<t.attributes.length;i++){const r=t.attributes[i],a=r.name,s=r.array,o=r.itemSize;n.setAttribute(a,new Me(s,o))}return n}_loadLibrary(t,n){const i=new me(this.manager);return i.setPath(this.decoderPath),i.setResponseType(n),i.setWithCredentials(this.withCredentials),new Promise((r,a)=>{i.load(t,r,void 0,a)})}preload(){return this._initDecoder(),this}_initDecoder(){if(this.decoderPending)return this.decoderPending;const t=typeof WebAssembly!="object"||this.decoderConfig.type==="js",n=[];return t?n.push(this._loadLibrary("draco_decoder.js","text")):(n.push(this._loadLibrary("draco_wasm_wrapper.js","text")),n.push(this._loadLibrary("draco_decoder.wasm","arraybuffer"))),this.decoderPending=Promise.all(n).then(i=>{const r=i[0];t||(this.decoderConfig.wasmBinary=i[1]);const a=$t.toString(),s=["/* draco decoder */",r,"","/* worker */",a.substring(a.indexOf("{")+1,a.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([s]))}),this.decoderPending}_getWorker(t,n){return this._initDecoder().then(()=>{if(this.workerPool.length<this.workerLimit){const r=new Worker(this.workerSourceURL);r._callbacks={},r._taskCosts={},r._taskLoad=0,r.postMessage({type:"init",decoderConfig:this.decoderConfig}),r.onmessage=function(a){const s=a.data;switch(s.type){case"decode":r._callbacks[s.id].resolve(s);break;case"error":r._callbacks[s.id].reject(s);break;default:console.error('THREE.DRACOLoader: Unexpected message, "'+s.type+'"')}},this.workerPool.push(r)}else this.workerPool.sort(function(r,a){return r._taskLoad>a._taskLoad?-1:1});const i=this.workerPool[this.workerPool.length-1];return i._taskCosts[t]=n,i._taskLoad+=n,i})}_releaseTask(t,n){t._taskLoad-=t._taskCosts[n],delete t._callbacks[n],delete t._taskCosts[n]}debug(){console.log("Task load: ",this.workerPool.map(t=>t._taskLoad))}dispose(){for(let t=0;t<this.workerPool.length;++t)this.workerPool[t].terminate();return this.workerPool.length=0,this}}function $t(){let e,t;onmessage=function(s){const o=s.data;switch(o.type){case"init":e=o.decoderConfig,t=new Promise(function(c){e.onModuleLoaded=function(h){c({draco:h})},DracoDecoderModule(e)});break;case"decode":const l=o.buffer,u=o.taskConfig;t.then(c=>{const h=c.draco,p=new h.Decoder,y=new h.DecoderBuffer;y.Init(new Int8Array(l),l.byteLength);try{const d=n(h,p,y,u),f=d.attributes.map(m=>m.array.buffer);d.index&&f.push(d.index.array.buffer),self.postMessage({type:"decode",id:o.id,geometry:d},f)}catch(d){console.error(d),self.postMessage({type:"error",id:o.id,error:d.message})}finally{h.destroy(y),h.destroy(p)}});break}};function n(s,o,l,u){const c=u.attributeIDs,h=u.attributeTypes;let p,y;const d=o.GetEncodedGeometryType(l);if(d===s.TRIANGULAR_MESH)p=new s.Mesh,y=o.DecodeBufferToMesh(l,p);else if(d===s.POINT_CLOUD)p=new s.PointCloud,y=o.DecodeBufferToPointCloud(l,p);else throw new Error("THREE.DRACOLoader: Unexpected geometry type.");if(!y.ok()||p.ptr===0)throw new Error("THREE.DRACOLoader: Decoding failed: "+y.error_msg());const f={index:null,attributes:[]};for(const m in c){const T=self[h[m]];let g,S;if(u.useUniqueIDs)S=c[m],g=o.GetAttributeByUniqueId(p,S);else{if(S=o.GetAttributeId(p,s[c[m]]),S===-1)continue;g=o.GetAttribute(p,S)}f.attributes.push(r(s,o,p,m,T,g))}return d===s.TRIANGULAR_MESH&&(f.index=i(s,o,p)),s.destroy(p),f}function i(s,o,l){const c=l.num_faces()*3,h=c*4,p=s._malloc(h);o.GetTrianglesUInt32Array(l,h,p);const y=new Uint32Array(s.HEAPF32.buffer,p,c).slice();return s._free(p),{array:y,itemSize:1}}function r(s,o,l,u,c,h){const p=h.num_components(),d=l.num_points()*p,f=d*c.BYTES_PER_ELEMENT,m=a(s,c),T=s._malloc(f);o.GetAttributeDataArrayForAllPoints(l,h,m,f,T);const g=new c(s.HEAPF32.buffer,T,d).slice();return s._free(T),{name:u,array:g,itemSize:p}}function a(s,o){switch(o){case Float32Array:return s.DT_FLOAT32;case Int8Array:return s.DT_INT8;case Int16Array:return s.DT_INT16;case Int32Array:return s.DT_INT32;case Uint8Array:return s.DT_UINT8;case Uint16Array:return s.DT_UINT16;case Uint32Array:return s.DT_UINT32}}}const H=e=>{const t=new gt({map:new be().load("./mark/light-point.png"),transparent:!0}),n=new _t(t);n.scale.set(30,30,1);const i=new Se;return e.getWorldPosition(i),n.position.copy(i),n};let I=0;const Ke=e=>{I+=.01,I<.5?e.forEach(t=>{t.scale.x=30*(1+I),t.scale.y=30*(1+I)}):I>=.5&&I<1?e.forEach(t=>{t.scale.x=30*(2-I),t.scale.y=30*(2-I)}):I=0,requestAnimationFrame(()=>Ke(e))},Yt=e=>{const t=new G;t.name="LFDoorGroup";const n=new G;n.name="RFDoorGroup";const i=new G;i.name="LBDoorGroup";const r=new G;r.name="RBDoorGroup";const a=new G;a.name="TrunkDoorGroup";const s=e.getObjectByName("\u5DE6\u524D\u95E8"),o=e.getObjectByName("\u53F3\u8F66\u95E8"),l=e.getObjectByName("\u5DE6\u540E\u95E8"),u=e.getObjectByName("\u53F3\u540E\u95E8"),c=e.getObjectByName("\u540E\u5907\u7BB1"),h=H(s);h.name="LFSprite",h.position.x+=340,h.position.y+=-70,h.position.z+=-80,t.add(h);const p=H(o);p.name="RFSprite",p.position.x+=340,p.position.y+=-70,p.position.z+=80,n.add(p);const y=H(l);y.name="LBSprite",y.position.x+=200,y.position.y+=-100,y.position.z+=-70,i.add(y);const d=H(u);d.name="RBSprite",d.position.x+=200,d.position.y+=-100,d.position.z+=70,r.add(d);const f=H(c);f.name="TrunkSprite",f.position.x+=0,f.position.y+=-300,f.position.z+=0,a.add(f),Ke([h,p,y,d,f]),s.add(t),o.add(n),l.add(i),u.add(r),c.add(a)};class Qt extends ze{constructor(t){super(t)}load(t,n,i,r){const a=this,s=new me(this.manager);s.setPath(this.path),s.setRequestHeader(this.requestHeader),s.setWithCredentials(a.withCredentials),s.load(t,function(o){let l;try{l=JSON.parse(o)}catch{console.warn("THREE.FontLoader: typeface.js support is being deprecated. Use typeface.json instead."),l=JSON.parse(o.substring(65,o.length-2))}const u=a.parse(l);n&&n(u)},i,r)}parse(t){return new je(t)}}class je{constructor(t){this.type="Font",this.data=t}generateShapes(t,n=100){const i=[],r=Zt(t,n,this.data);for(let a=0,s=r.length;a<s;a++)Array.prototype.push.apply(i,r[a].toShapes());return i}}function Zt(e,t,n){const i=Array.from(e),r=t/n.resolution,a=(n.boundingBox.yMax-n.boundingBox.yMin+n.underlineThickness)*r,s=[];let o=0,l=0;for(let u=0;u<i.length;u++){const c=i[u];if(c===`
`)o=0,l-=a;else{const h=Jt(c,r,o,l,n);o+=h.offsetX,s.push(h.path)}}return s}function Jt(e,t,n,i,r){const a=r.glyphs[e]||r.glyphs["?"];if(!a){console.error('THREE.Font: character "'+e+'" does not exists in font family '+r.familyName+".");return}const s=new wt;let o,l,u,c,h,p,y,d;if(a.o){const f=a._cachedOutline||(a._cachedOutline=a.o.split(" "));for(let m=0,T=f.length;m<T;)switch(f[m++]){case"m":o=f[m++]*t+n,l=f[m++]*t+i,s.moveTo(o,l);break;case"l":o=f[m++]*t+n,l=f[m++]*t+i,s.lineTo(o,l);break;case"q":u=f[m++]*t+n,c=f[m++]*t+i,h=f[m++]*t+n,p=f[m++]*t+i,s.quadraticCurveTo(h,p,u,c);break;case"b":u=f[m++]*t+n,c=f[m++]*t+i,h=f[m++]*t+n,p=f[m++]*t+i,y=f[m++]*t+n,d=f[m++]*t+i,s.bezierCurveTo(h,p,y,d,u,c);break}}return{offsetX:a.ha*t,path:s}}je.prototype.isFont=!0;const ye=250,Kt=new Tt(ye,ye,10,128),jt=new se({color:26112}),Xe=new xe(Kt,jt);Xe.translateY(-5);const Ae=new G;Ae.add(Xe);const Xt=new Qt;Xt.load("./font/helvetiker_bold.typeface.json",e=>{const t=new se({color:16777215,side:bt}),n=e.generateShapes("Build Your Dream",30),i=new St(n),r=new xe(i,t);r.position.z=ye,r.position.x=-180,Ae.add(r)});const en=e=>{const t=new xt().setPath("./skybox/").load(["li.jpg","xin.jpg","chu.jpg","xing.jpg","top.jpg","bottom.jpg"]);t.encoding=pe,e.traverse(n=>{n.type==="Mesh"&&(n.name==="\u8F66\u6807"?(n.position.x+=-.1,n.material.map=new be().load("./gltf/Image_0.png"),n.material.map.encoding=pe,n.material.map.flipY=!1):n.name.slice(0,4)==="\u9AD8\u5149\u91D1\u5C5E"?n.material=new Ie(ce(le({},n.material),{metalness:1,roughness:.2,envMapIntensity:1})):n.name.slice(0,2)==="\u5916\u58F3"?n.material=new L(ce(le({},n.material),{color:3605049,clearcoat:1,clearcoatRoughness:.01,metalness:1,roughness:.5,envMapIntensity:1})):n.name.slice(0,2)==="\u73BB\u7483"?n.material=new L({color:16777215,metalness:0,roughness:0,transparent:!0,transmission:.99,envMapIntensity:1}):n.name.slice(0,3)==="\u540E\u89C6\u955C"?n.material=new Ie({color:16777215,metalness:1,roughness:0,envMapIntensity:1}):n.name.slice(0,2)==="\u8F6E\u80CE"?(n.material.color.set(0),n.material.normalScale.set(2,2),n.material.metalness=0,n.material.roughness=.6):n.name.slice(0,3)==="\u524D\u706F\u7F69"?n.material=new L({color:16777215,metalness:0,roughness:0,transmission:.9,transparent:!0}):n.name.slice(0,4)==="\u5C3E\u706F\u706F\u7F69"?n.material=new L({color:16711680,metalness:0,roughness:0,transmission:.5,transparent:!0}):n.name.slice(0,5)==="\u5C3E\u706F\u7B2C\u4E8C\u5C42"?n.material=new L({color:4456448,metalness:0,roughness:0,transmission:.5,transparent:!0}):n.name.slice(0,4)==="\u5C3E\u706F\u53D1\u5149"?n.material=new se({color:6684672}):n.name.slice(0,5)==="\u5C3E\u706F\u7B2C\u4E09\u5C42"?n.material=new se({color:421068800}):n.name.slice(0,2)==="\u5851\u6599"&&(n.material=new L({color:65793,metalness:0,roughness:.8})),e.getObjectByName("\u5929\u7A97\u9ED1\u73BB\u7483").material=new L({color:1118481,metalness:0,roughness:0,envMapIntensity:1,transmission:.5,transparent:!0}),e.getObjectByName("\u8F66\u5EA7").material=new L({color:131586,metalness:0,roughness:.6}),n.material.envMap=t)})};let E=typeof self!="undefined"?self:typeof window!="undefined"?window:typeof global!="undefined"?global:globalThis||(typeof exports!="undefined"?exports:{});E.requestAnimationFrame;let tn=E.cancelAnimationFrame||(e=>E.clearTimeout(e));const B=function(){if(typeof process!="undefined"&&process.hrtime!==void 0&&(!process.versions||process.versions.electron===void 0))return function(){const e=process.hrtime();return e[0]*1e3+e[1]/1e6};if(E.performance!==void 0&&E.performance.now!==void 0)return E.performance.now.bind(E.performance);{const e=E.performance&&E.performance.timing&&E.performance.timing.navigationStart?E.performance.timing.navigationStart:Date.now();return function(){return Date.now()-e}}}();/**
 * Lightweight, effecient and modular ES6 version of tween.js
 * @copyright 2019 @dalisoft and es6-tween contributors
 * @license MIT
 * @namespace TWEEN
 * @example
 * // ES6
 * const {add, remove, isRunning, autoPlay} = TWEEN
 */const W=[];let et=!1,nn,sn=!0;const ee=e=>{let t=W.indexOf(e);t>-1&&W.splice(t,1),W.push(e)},z=e=>{const t=W.indexOf(e);t!==-1&&W.splice(t,1),W.length===0&&(tn(nn),et=!1)},rn=()=>et,on=()=>sn,P={},Y={Linear:{None(e){return e}},Quadratic:{In(e){return Math.pow(e,2)},Out(e){return e*(2-e)},InOut(e){return(e*=2)<1?.5*Math.pow(e,2):-.5*(--e*(e-2)-1)}},Cubic:{In(e){return Math.pow(e,3)},Out(e){return--e*e*e+1},InOut(e){return(e*=2)<1?.5*Math.pow(e,3):.5*((e-=2)*e*e+2)}},Quartic:{In(e){return Math.pow(e,4)},Out(e){return 1- --e*e*e*e},InOut(e){return(e*=2)<1?.5*Math.pow(e,4):-.5*((e-=2)*e*e*e-2)}},Quintic:{In(e){return Math.pow(e,5)},Out(e){return--e*e*e*e*e+1},InOut(e){return(e*=2)<1?.5*Math.pow(e,5):.5*((e-=2)*e*e*e*e+2)}},Sinusoidal:{In(e){return 1-Math.cos(e*Math.PI/2)},Out(e){return Math.sin(e*Math.PI/2)},InOut(e){return .5*(1-Math.cos(Math.PI*e))}},Exponential:{In(e){return e===0?0:Math.pow(1024,e-1)},Out(e){return e===1?1:1-Math.pow(2,-10*e)},InOut(e){return e===0?0:e===1?1:(e*=2)<1?.5*Math.pow(1024,e-1):.5*(-Math.pow(2,-10*(e-1))+2)}},Circular:{In(e){return 1-Math.sqrt(1-e*e)},Out(e){return Math.sqrt(1- --e*e)},InOut(e){return(e*=2)<1?-.5*(Math.sqrt(1-e*e)-1):.5*(Math.sqrt(1-(e-=2)*e)+1)}},Elastic:{In(e){return e===0?0:e===1?1:-Math.pow(2,10*(e-1))*Math.sin((e-1.1)*5*Math.PI)},Out(e){return e===0?0:e===1?1:Math.pow(2,-10*e)*Math.sin((e-.1)*5*Math.PI)+1},InOut(e){return e===0?0:e===1?1:(e*=2,e<1?-.5*Math.pow(2,10*(e-1))*Math.sin((e-1.1)*5*Math.PI):.5*Math.pow(2,-10*(e-1))*Math.sin((e-1.1)*5*Math.PI)+1)}},Back:{In(e){return e*e*((1.70158+1)*e-1.70158)},Out(e){return--e*e*((1.70158+1)*e+1.70158)+1},InOut(e){const t=2.5949095;return(e*=2)<1?.5*(e*e*((t+1)*e-t)):.5*((e-=2)*e*((t+1)*e+t)+2)}},Bounce:{In(e){return 1-Y.Bounce.Out(1-e)},Out(e){let t=2.75,n=7.5625;return e<1/t?n*e*e:e<2/t?n*(e-=1.5/t)*e+.75:e<2.5/t?n*(e-=2.25/t)*e+.9375:n*(e-=2.625/t)*e+.984375},InOut(e){return e<.5?Y.Bounce.In(e*2)*.5:Y.Bounce.Out(e*2-1)*.5+.5}},Stepped:{steps:e=>t=>(t*e|0)/e}},an=50/3,ln=250,Ge="_chainedTweens",te="Callback",cn="update",un="complete",fn="start",dn="repeat",hn="reverse",pn="pause",mn="play",yn="restart",gn="stop",_n="seek",U="STRING_PROP",wn=/\s+|([A-Za-z?().,{}:""[\]#%]+)|([-+]=+)?([-+]+)?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]=?\d+)?/g;function tt(e){if(e&&e.nodeType||e===void 0||typeof e!="object")return e;if(Array.isArray(e))return[].concat(e);if(typeof e=="object"){let t={};for(let n in e)t[n]=tt(e[n]);return t}return e}const Tn=e=>isNaN(+e)||(e[0]==="+"||e[0]==="-")&&e[1]==="="||e===""||e===" ",bn=/^#([0-9a-f]{6}|[0-9a-f]{3})$/gi,Sn=(e,t)=>{let n,i,r;t.length===3&&(n=t[0],i=t[1],r=t[2],t=n+n+i+i+r+r);let a=parseInt(t,16);return n=a>>16&255,i=a>>8&255,r=a&255,"rgb("+n+", "+i+", "+r+")"};function $(e){if(e&&e.splice&&e.isString||typeof e!="string"||e.charAt(1)==="=")return e;const t=e.replace(bn,Sn).match(wn).map(n=>Tn(n)?n:+n);return t.isString=!0,t}function Q(e,t,n,i){const r=n[e],a=i[e];if(r===a)return!0;if(Array.isArray(r)&&Array.isArray(a)&&r.length===a.length)for(let s=0,o=a.length;s<o;s++){const l=r[s],u=a[s];l===u||typeof l=="number"&&typeof u=="number"||Q(s,t[e],r,a)}if(!(typeof r=="number"&&typeof a=="number")){if(!(r&&r.splice&&r.isString&&a&&a.splice&&a.isString)){if(typeof r=="string"&&Array.isArray(a)){const s=$(r),o=a.map($);return n[e]=s,i[e]=o,!0}else if(typeof r=="string"||typeof a=="string"){let s=Array.isArray(r)&&r[0]===U?r:$(r),o=Array.isArray(a)&&a[0]===U?a:$(a);if(s===void 0)return;let l=1;for(;l<s.length;)s[l]===o[l]&&typeof s[l-1]=="string"?(s.splice(l-1,2,s[l-1]+s[l]),o.splice(l-1,2,o[l-1]+o[l])):l++;return l=0,s[0]===U&&s.shift(),o[0]===U&&o.shift(),n[e]=s,i[e]=o,!0}else if(typeof r=="object"&&typeof a=="object"){if(Array.isArray(r)&&!r.isString)return r.map((s,o)=>Q(o,t[e],r,a));for(let s in a)Q(s,t[e],r,a);return!0}}}return!1}const xn="rgb(",ge="rgba(",q=(e,t,n=xn)=>typeof e[t]=="number"&&(e[t-1]===n||e[t-3]===n||e[t-5]===n);function _e(e,t,n,i,r,a,s){const o=s?n:n[e];let l=s?i:i[e];if(l===void 0)return o;if(o===void 0||typeof o=="string"||o===l)return l;if(typeof o=="object"&&typeof l=="object"){if(!o||!l)return t[e];if(typeof o=="object"&&!!o&&o.isString&&l&&l.splice&&l.isString){let u="";for(let c=0,h=o.length;c<h;c++)if(o[c]!==l[c]||typeof o[c]!="number"||typeof l[c]=="number"){const p=typeof o[c]=="number"&&typeof l[c]=="string"&&l[c][1]==="=";let y=typeof o[c]!="number"?o[c]:p?o[c]+parseFloat(l[c][0]+l[c].substr(2))*r:o[c]+(l[c]-o[c])*r;(q(o,c)||q(o,c,ge))&&(y|=0),u+=y,p&&a===1&&(o[c]=o[c]+parseFloat(l[c][0]+l[c].substr(2)))}else u+=o[c];return s||(t[e]=u),u}else if(Array.isArray(o)&&o[0]!==U)for(let u=0,c=o.length;u<c;u++)o[u]===l[u]||typeof t[e]=="string"||_e(u,t[e],o,l,r,a);else if(typeof o=="object"&&!!o&&!o.isString)for(let u in o)o[u]!==l[u]&&_e(u,t[e],o,l,r,a)}else if(typeof o=="number"){const u=typeof l=="string";t[e]=u?o+parseFloat(l[0]+l.substr(2))*r:o+(l-o)*r,u&&a===1&&(n[e]=t[e])}else typeof l=="function"&&(t[e]=l(r));return t[e]}const An=/([.[])/g,Cn=/\]/g,de=function(e,t){const n=e[t],i=t.replace(Cn,"").split(An),r=i.length-1;let a=Array.isArray(e),s=typeof e=="object"&&!a;return s?(e[t]=null,delete e[t]):a&&e.splice(t,1),i.reduce((o,l,u)=>{a&&l!=="."&&l!=="["&&(l*=1);let h=i[u+1]==="[";if(l==="."||l==="[")return l==="."?(s=!0,a=!1):l==="["&&(s=!1,a=!0),o;if(o[l]===void 0){if(a||s)return o[l]=u===r?n:a||h?[]:s?{}:null,s=a=!1,o[l]}else if(o[l]!==void 0)return u===r&&(o[l]=n),o[l];return o},e)},Ue=function(e){if(typeof e=="object"&&!!e){for(let t in e)if(t.indexOf(".")!==-1||t.indexOf("[")!==-1)de(e,t);else if(typeof e[t]=="object"&&!!e[t]){let n=e[t];for(let i in n)if(i.indexOf(".")!==-1||i.indexOf("[")!==-1)de(n,i);else if(typeof n[i]=="object"&&!!n[i]){let r=n[i];for(let a in r)(a.indexOf(".")!==-1||a.indexOf("[")!==-1)&&de(r,a)}}}return e},A={Linear(e,t,n){const i=e.length-1,r=i*t,a=Math.floor(r),s=A.Utils.Linear;return t<0?s(e[0],e[1],r,n):t>1?s(e[i],e[i-1],i-r,n):s(e[a],e[a+1>i?i:a+1],r-a,n)},Bezier(e,t,n){let i=A.Utils.Reset(n),r=e.length-1,a=Math.pow,s=A.Utils.Bernstein,o=Array.isArray(i);for(let l=0;l<=r;l++)if(typeof i=="number")i+=a(1-t,r-l)*a(t,l)*e[l]*s(r,l);else if(o)for(let u=0,c=i.length;u<c;u++)typeof i[u]=="number"?i[u]+=a(1-t,r-l)*a(t,l)*e[l][u]*s(r,l):i[u]=e[l][u];else if(typeof i=="object")for(let u in i)typeof i[u]=="number"?i[u]+=a(1-t,r-l)*a(t,l)*e[l][u]*s(r,l):i[u]=e[l][u];else if(typeof i=="string"){let u="",c=Math.round(r*t),h=e[c];for(let p=1,y=h.length;p<y;p++)u+=h[p];return u}return i},CatmullRom(e,t,n){const i=e.length-1;let r=i*t,a=Math.floor(r);const s=A.Utils.CatmullRom;return e[0]===e[i]?(t<0&&(a=Math.floor(r=i*(1+t))),s(e[(a-1+i)%i],e[a],e[(a+1)%i],e[(a+2)%i],r-a,n)):t<0?s(e[1],e[1],e[0],e[0],-t,n):t>1?s(e[i-1],e[i-1],e[i],e[i],(t|0)-t,n):s(e[a?a-1:0],e[a],e[i<a+1?i:a+1],e[i<a+2?i:a+2],r-a,n)},Utils:{Linear(e,t,n,i){if(e===t||typeof e=="string"){if(t.length&&t.splice&&t.isString){t="";for(let r=0,a=e.length;r<a;r++)t+=e[r]}return t}else{if(typeof e=="number")return typeof e=="function"?e(n):e+(t-e)*n;if(typeof e=="object"){if(e.length!==void 0){const r=typeof e[0]=="string"||e.isString;if(r||e[0]===U){let a="";for(let s=r?0:1,o=e.length;s<o;s++){let l=n===0?e[s]:n===1?t[s]:typeof e[s]=="number"?e[s]+(t[s]-e[s])*n:t[s];(n>0&&n<1&&q(e,s)||q(e,s,ge))&&(l|=0),a+=l}return a}else if(i&&i.length&&i.splice)for(let a=0,s=i.length;a<s;a++)i[a]=A.Utils.Linear(e[a],t[a],n,i[a])}else for(const r in i)i[r]=A.Utils.Linear(e[r],t[r],n,i[r]);return i}}},Reset(e){if(Array.isArray(e)){for(let t=0,n=e.length;t<n;t++)e[t]=A.Utils.Reset(e[t]);return e}else if(typeof e=="object"){for(let t in e)e[t]=A.Utils.Reset(e[t]);return e}else if(typeof e=="number")return 0;return e},Bernstein(e,t){const n=A.Utils.Factorial;return n(e)/n(t)/n(e-t)},Factorial:function(){const e=[1];return t=>{let n=1;if(e[t])return e[t];for(let i=t;i>1;i--)n*=i;return e[t]=n,n}}(),CatmullRom(e,t,n,i,r,a){if(typeof e=="string")return t;if(typeof e=="number"){const s=(n-e)*.5,o=(i-t)*.5,l=r*r,u=r*l;return(2*t-2*n+s+o)*u+(-3*t+3*n-2*s-o)*l+s*r+t}else if(typeof e=="object"){if(e.length!==void 0){if(e[0]===U){let s="";for(let o=1,l=e.length;o<l;o++){let u=typeof e[o]=="number"?A.Utils.CatmullRom(e[o],t[o],n[o],i[o],r):i[o];(q(e,o)||q(e,o,ge))&&(u|=0),s+=u}return s}for(let s=0,o=a.length;s<o;s++)a[s]=A.Utils.CatmullRom(e[s],t[s],n[s],i[s],r,a[s])}else for(const s in a)a[s]=A.Utils.CatmullRom(e[s],t[s],n[s],i[s],r,a[s]);return a}}}},Z={};function ke(e,t,n){if(!e||!e.nodeType)return t;const i=e.queueID||"q_"+Date.now();e.queueID||(e.queueID=i);const r=Z[i];if(r){if(r.object===t&&e===r.tween.node&&n._startTime===r.tween._startTime)z(r.tween);else if(typeof t=="object"&&!!t&&!!r.object){for(let a in t)a in r.object&&(n._startTime===r.tween._startTime?delete r.object[a]:r.propNormaliseRequired=!0);Object.assign(r.object,t)}return r.object}return typeof t=="object"&&!!t?(Z[i]={tween:n,object:t,propNormaliseRequired:!1},Z[i].object):t}function En(e,t,n){return t?e?typeof window!="undefined"&&e===window||typeof document!="undefined"&&e===document?[e]:typeof e=="string"?!!document.querySelectorAll&&document.querySelectorAll(e):Array.isArray(e)?e:e.nodeType?[e]:n?e:[]:null:e?typeof window!="undefined"&&e===window||typeof document!="undefined"&&e===document?e:typeof e=="string"?!!document.querySelector&&document.querySelector(e):Array.isArray(e)?e[0]:e.nodeType||n?e:null:null}let qe=0;const he=Y.Linear.None;class R{static fromTo(t,n,i,r={}){r.quickRender=r.quickRender?r.quickRender:!i;const a=new R(t,n).to(i,r);return r.quickRender&&(a.render().update(a._startTime),a._rendered=!1,a._onStartCallbackFired=!1),a}static to(t,n,i){return R.fromTo(t,null,n,i)}static from(t,n,i){return R.fromTo(t,n,null,i)}constructor(t,n){return this.id=qe++,!!t&&typeof t=="object"&&!n&&!t.nodeType?(n=this.object=t,t=null):!!t&&(t.nodeType||t.length||typeof t=="string")&&(t=this.node=En(t),n=this.object=ke(t,n,this)),this._valuesEnd=null,this._valuesStart=Array.isArray(n)?[]:{},this._duration=1e3,this._easingFunction=he,this._easingReverse=he,this._interpolationFunction=A.Linear,this._startTime=0,this._initTime=0,this._delayTime=0,this._repeat=0,this._r=0,this._isPlaying=!1,this._yoyo=!1,this._reversed=!1,this._onStartCallbackFired=!1,this._pausedTime=null,this._isFinite=!0,this._maxListener=15,this._chainedTweensCount=0,this._prevTime=null,this}setMaxListener(t=15){return this._maxListener=t,this}on(t,n){const{_maxListener:i}=this,r=t+te;for(let a=0;a<i;a++){const s=r+a;if(!this[s]){this[s]=n;break}}return this}once(t,n){const{_maxListener:i}=this,r=t+te;for(let a=0;a<i;a++){const s=r+a;if(!this[s]){this[s]=(...o)=>{n.apply(this,o),this[s]=null};break}}return this}off(t,n){const{_maxListener:i}=this,r=t+te;for(let a=0;a<i;a++){const s=r+a;this[s]===n&&(this[s]=null)}return this}emit(t,n,i,r){const{_maxListener:a}=this,s=t+te;if(!this[s+0])return this;for(let o=0;o<a;o++){const l=s+o;this[l]&&this[l](n,i,r)}return this}isPlaying(){return this._isPlaying}isStarted(){return this._onStartCallbackFired}reverse(t){const{_reversed:n}=this;return this._reversed=t!==void 0?t:!n,this}reversed(){return this._reversed}pause(){return this._isPlaying?(this._isPlaying=!1,z(this),this._pausedTime=B(),this.emit(pn,this.object)):this}play(){return this._isPlaying?this:(this._isPlaying=!0,this._startTime+=B()-this._pausedTime,this._initTime=this._startTime,ee(this),this._pausedTime=B(),this.emit(mn,this.object))}restart(t){return this._repeat=this._r,this.reassignValues(),ee(this),this.emit(yn,this.object)}seek(t,n){const{_duration:i,_initTime:r,_startTime:a,_reversed:s}=this;let o=r+t;return this._isPlaying=!0,o<a&&a>=r&&(this._startTime-=i,this._reversed=!s),this.update(t,!1),this.emit(_n,t,this.object),n?this:this.pause()}duration(t){return this._duration=typeof t=="function"?t(this._duration):t,this}to(t,n=1e3,i){if(this._valuesEnd=t,typeof n=="number"||typeof n=="function")this._duration=typeof n=="function"?n(this._duration):n;else if(typeof n=="object"){for(const r in n)if(typeof this[r]=="function"){const[a=null,s=null,o=null,l=null]=Array.isArray(n[r])?n[r]:[n[r]];this[r](a,s,o,l)}}return this}render(){if(this._rendered)return this;let{_valuesStart:t,_valuesEnd:n,object:i,node:r,InitialValues:a}=this;if(Ue(i),Ue(n),r&&r.queueID&&Z[r.queueID]){const s=Z[r.queueID];if(s.propNormaliseRequired&&s.tween!==this){for(const o in n)s.tween._valuesEnd[o];s.normalisedProp=!0,s.propNormaliseRequired=!1}}if(r&&a&&(!i||Object.keys(i).length===0?i=this.object=ke(r,a(r,n),this):(!n||Object.keys(n).length===0)&&(n=this._valuesEnd=a(r,i))),!t.processed){for(const s in n){let o=i&&i[s]&&tt(i[s]),l=n[s];if(!(P[s]&&P[s].init&&(P[s].init.call(this,o,l,s,i),o===void 0&&t[s]&&(o=t[s]),P[s].skipProcess))&&!(typeof o=="number"&&isNaN(o)||o===null||l===null||o===!1||l===!1||o===void 0||l===void 0||o===l)){if(t[s]=o,Array.isArray(l))if(Array.isArray(o))l.isString&&i[s].isString&&!o.isString?o.isString=!0:Q(s,i,t,n);else{l.unshift(o);for(let u=0,c=l.length;u<c;u++)typeof l[u]=="string"&&(l[u]=$(l[u]))}else Q(s,i,t,n);typeof o=="number"&&typeof l=="string"&&l[1]}}t.processed=!0}return R.Renderer&&this.node&&R.Renderer.init&&(R.Renderer.init.call(this,i,t,n),this.__render=!0),this._rendered=!0,this}start(t){return this._startTime=t!==void 0?typeof t=="string"?B()+parseFloat(t):t:B(),this._startTime+=this._delayTime,this._initTime=this._prevTime=this._startTime,this._onStartCallbackFired=!1,this._rendered=!1,this._isPlaying=!0,ee(this),this}stop(){let{_isPlaying:t,_isFinite:n,object:i,_startTime:r,_duration:a,_r:s,_yoyo:o,_reversed:l}=this;if(!t)return this;let u=n?(s+1)%2===1:!l;return this._reversed=!1,o&&u?this.update(r):this.update(r+a),z(this),this.emit(gn,i)}delay(t){return this._delayTime=typeof t=="function"?t(this._delayTime):t,this}chainedTweens(){if(this._chainedTweensCount=arguments.length,!this._chainedTweensCount)return this;for(let t=0,n=this._chainedTweensCount;t<n;t++)this[Ge+t]=arguments[t];return this}repeat(t){return this._repeat=this._duration?typeof t=="function"?t(this._repeat):t:0,this._r=this._repeat,this._isFinite=isFinite(t),this}reverseDelay(t){return this._reverseDelayTime=typeof t=="function"?t(this._reverseDelayTime):t,this}yoyo(t,n){return this._yoyo=typeof t=="function"?t(this._yoyo):t===null?this._yoyo:t,t||(this._reversed=!1),this._easingReverse=n||null,this}easing(t){return this._easingFunction=t,this}interpolation(t){return typeof t=="function"&&(this._interpolationFunction=t),this}reassignValues(t){const{_valuesStart:n,object:i,_delayTime:r}=this;this._isPlaying=!0,this._startTime=t!==void 0?t:B(),this._startTime+=r,this._reversed=!1,ee(this);for(const a in n){const s=n[a];i[a]=s}return this}update(t,n,i){let{_onStartCallbackFired:r,_easingFunction:a,_interpolationFunction:s,_easingReverse:o,_repeat:l,_delayTime:u,_reverseDelayTime:c,_yoyo:h,_reversed:p,_startTime:y,_prevTime:d,_duration:f,_valuesStart:m,_valuesEnd:T,object:g,_isFinite:S,_isPlaying:M,__render:K,_chainedTweensCount:j}=this,b,V,_,Ee=0;if(!f)b=1,l=0;else{t=t!==void 0?t:B();let w=t-d;if(this._prevTime=t,w>ln&&rn()&&on()&&(t-=w-an),!M||t<y&&!i)return!0;b=(t-y)/f,b=b>1?1:b,b=p?1-b:b}if(r||(this._rendered||(this.render(),this._rendered=!0),this.emit(fn,g),this._onStartCallbackFired=!0),V=p&&o||a,!g)return!0;for(_ in T){const w=m[_];if(w==null&&!(P[_]&&P[_].update))continue;const x=T[_],F=V[_]?V[_](b):typeof V=="function"?V(b):he(b),at=s[_]?s[_]:typeof s=="function"?s:A.Linear;typeof x=="number"?g[_]=w+(x-w)*F:Array.isArray(x)&&!x.isString&&!Array.isArray(w)?g[_]=at(x,F,g[_]):x&&x.update?x.update(F):typeof x=="function"?g[_]=x(F):typeof x=="string"&&typeof w=="number"?g[_]=w+parseFloat(x[0]+x.substr(2))*F:_e(_,g,m,T,F,b),P[_]&&P[_].update&&P[_].update.call(this,g[_],w,x,F,b,_),Ee++}if(!Ee)return z(this),!1;if(K&&R.Renderer&&R.Renderer.update&&R.Renderer.update.call(this,g,b),this.emit(cn,g,b,t),b===1||p&&b===0)if(l>0&&f>0){if(S&&this._repeat--,h)this._reversed=!p;else for(_ in T){let w=T[_];typeof w=="string"&&typeof m[_]=="number"&&(m[_]+=parseFloat(w[0]+w.substr(2)))}return this.emit(h&&!p?hn:dn,g),p&&c?this._startTime=t-c:this._startTime=t+u,!0}else{if(n||(this._isPlaying=!1,z(this),qe--),this.emit(un,g),this._repeat=this._r,j)for(let w=0;w<j;w++)this[Ge+w].start(t+f);return!1}return!0}}const ae=(e,t=1,n=!1)=>{const i=new At,r=new Ct(i);return new Et().load(e,s=>{r.setBuffer(s),r.setVolume(t),r.setLoop(n)}),r},Rn=ae("./audio/open.wav"),Dn=ae("./audio/close.wav"),Mn=ae("./audio/close-trunk.wav"),nt=ae("./audio/BYD.mp3",.3,!0),st=()=>{Rn.play()},In=()=>{Dn.play()},Pn=()=>{Mn.play()},Ln=()=>{nt.play()},We=()=>{nt.pause()};let we=null,re=0;const ie=(e,t,n=1e3)=>{we=new R(e.rotation).to(t,n).easing(Y.Linear).start()},ne=(e,t={y:0},n={y:Math.PI/3})=>{const i=Date.now();if(!(i-re<1e3))if(re=i,e.flag){ie(e,t),e.flag=!1;let r=setTimeout(()=>{In(),clearTimeout(r),r=null},1050)}else ie(e,n),e.flag=!0,st()},On=(e,t={y:0},n={y:Math.PI/3})=>{const i=Date.now();i-re<1e3||(re=i,e.flag?(ie(e,t,1e3),e.flag=!1,Pn()):(ie(e,n,1e3),e.flag=!0,st()))},Nn=e=>{const t=e.getObjectByName("\u5DE6\u524D\u95E8"),n=e.getObjectByName("\u53F3\u8F66\u95E8"),i=e.getObjectByName("\u5DE6\u540E\u95E8"),r=e.getObjectByName("\u53F3\u540E\u95E8"),a=e.getObjectByName("\u540E\u5907\u7BB1"),s=new Rt(0,0),o=new Dt;let l=!1;const u=c=>{if(l=!0,c.preventDefault(),s.x=c.clientX/window.innerWidth*2-1,s.y=-(c.clientY/window.innerHeight)*2+1,C.children[2]){o.setFromCamera(s,N);const h=o.intersectObject(C.children[2],!0);h[0]&&l&&((h[0].object.parent.name==="\u5DE6\u524D\u95E8"||h[0].object.name==="LFSprite")&&ne(t,{y:0},{y:-Math.PI/3}),(h[0].object.parent.name==="\u53F3\u8F66\u95E8"||h[0].object.name==="RFSprite")&&ne(n),(h[0].object.parent.name==="\u5DE6\u540E\u95E8"||h[0].object.name==="LBSprite")&&ne(i,{y:0},{y:-Math.PI/3}),(h[0].object.parent.name==="\u53F3\u540E\u95E8"||h[0].object.name==="RBSprite")&&ne(r),(h[0].object.parent.name==="\u540E\u5907\u7BB1"||h[0].object.name==="TrunkSprite")&&On(a,{z:0},{z:Math.PI/2}))}};document.addEventListener("click",u,!1)},Ve=new Se,vn=new Mt,He=new Se;class Ce extends It{constructor(t=document.createElement("div")){super();this.element=t,this.element.style.position="absolute",this.element.style.pointerEvents="auto",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.addEventListener("removed",function(){this.traverse(function(n){n.element instanceof Element&&n.element.parentNode!==null&&n.element.parentNode.removeChild(n.element)})})}copy(t,n){return super.copy(t,n),this.element=t.element.cloneNode(!0),this}}Ce.prototype.isCSS3DObject=!0;class Fn extends Ce{constructor(t){super(t);this.rotation2D=0}copy(t,n){return super.copy(t,n),this.rotation2D=t.rotation2D,this}}Fn.prototype.isCSS3DSprite=!0;const D=new $e,Bn=new $e;class Gn{constructor(t={}){const n=this;let i,r,a,s;const o={camera:{fov:0,style:""},objects:new WeakMap},l=t.element!==void 0?t.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l;const u=document.createElement("div");u.style.transformStyle="preserve-3d",u.style.pointerEvents="none",l.appendChild(u),this.getSize=function(){return{width:i,height:r}},this.render=function(d,f){const m=f.projectionMatrix.elements[5]*s;o.camera.fov!==m&&(l.style.perspective=f.isPerspectiveCamera?m+"px":"",o.camera.fov=m),d.autoUpdate===!0&&d.updateMatrixWorld(),f.parent===null&&f.updateMatrixWorld();let T,g;f.isOrthographicCamera&&(T=-(f.right+f.left)/2,g=(f.top+f.bottom)/2);const M=(f.isOrthographicCamera?"scale("+m+")translate("+c(T)+"px,"+c(g)+"px)"+h(f.matrixWorldInverse):"translateZ("+m+"px)"+h(f.matrixWorldInverse))+"translate("+a+"px,"+s+"px)";o.camera.style!==M&&(u.style.transform=M,o.camera.style=M),y(d,d,f)},this.setSize=function(d,f){i=d,r=f,a=i/2,s=r/2,l.style.width=d+"px",l.style.height=f+"px",u.style.width=d+"px",u.style.height=f+"px"};function c(d){return Math.abs(d)<1e-10?0:d}function h(d){const f=d.elements;return"matrix3d("+c(f[0])+","+c(-f[1])+","+c(f[2])+","+c(f[3])+","+c(f[4])+","+c(-f[5])+","+c(f[6])+","+c(f[7])+","+c(f[8])+","+c(-f[9])+","+c(f[10])+","+c(f[11])+","+c(f[12])+","+c(-f[13])+","+c(f[14])+","+c(f[15])+")"}function p(d){const f=d.elements,m="matrix3d("+c(f[0])+","+c(f[1])+","+c(f[2])+","+c(f[3])+","+c(-f[4])+","+c(-f[5])+","+c(-f[6])+","+c(-f[7])+","+c(f[8])+","+c(f[9])+","+c(f[10])+","+c(f[11])+","+c(f[12])+","+c(f[13])+","+c(f[14])+","+c(f[15])+")";return"translate(-50%,-50%)"+m}function y(d,f,m,T){if(d.isCSS3DObject){const g=d.visible===!0&&d.layers.test(m.layers)===!0;if(d.element.style.display=g===!0?"":"none",g===!0){d.onBeforeRender(n,f,m);let S;d.isCSS3DSprite?(D.copy(m.matrixWorldInverse),D.transpose(),d.rotation2D!==0&&D.multiply(Bn.makeRotationZ(d.rotation2D)),d.matrixWorld.decompose(Ve,vn,He),D.setPosition(Ve),D.scale(He),D.elements[3]=0,D.elements[7]=0,D.elements[11]=0,D.elements[15]=1,S=p(D)):S=p(d.matrixWorld);const M=d.element,K=o.objects.get(d);if(K===void 0||K.style!==S){M.style.transform=S;const j={style:S};o.objects.set(d,j)}M.parentNode!==u&&u.appendChild(M),d.onAfterRender(n,f,m)}}for(let g=0,S=d.children.length;g<S;g++)y(d.children[g],f,m)}}}const Un=()=>{const e=document.getElementsByClassName("mark")[0],t=new Ce(e);return e.style.visibility="visible",e.style.pointerEvents="none",t.scale.set(.5,.5,1),t.position.set(0,0,0),t.position.x-=240,t.position.y+=50,t.rotateY(-Math.PI/2),t},k=new Gn;k.setSize(window.innerWidth,window.innerHeight);k.domElement.style.position="absolute";k.domElement.style.top="0px";k.domElement.style.left="0px";k.domElement.style.pointerEvents="none";document.body.appendChild(k.domElement);const J=new G,rt=new Bt,it=new zt;it.setDecoderPath("./draco/");rt.setDRACOLoader(it);const Te=Ye(100);rt.load("./gltf/2.gltf",e=>{en(e.scene),J.add(Ae),Yt(e.scene),Nn(e.scene);const t=Un();J.add(t),J.add(e.scene)},e=>{console.log(e.loaded,e.total),Te.value=+(e.loaded/e.total*100).toFixed(0)},e=>{console.log({err:e})});const ot=()=>{C.rotateY(5e-4),we&&we.update(),k.render(C,N),v.render(C,N),requestAnimationFrame(ot)};const kn={id:"BYD"},qn={key:0,class:"mask"},Wn=Vt('<div class="mark" data-v-9b792228><div class="des" data-v-9b792228><div class="title" data-v-9b792228>\u524D\u8138\u8BBE\u8BA1</div><div class="text" data-v-9b792228>\u524D\u8138\u7EBA\u9524\u5F0F\u7684\u4E2D\u7F51\u683C\u6805\u8BBE\u8BA1</div><div class="text" data-v-9b792228>\u642D\u914D\u4E24\u4FA7\u72ED\u957F\u7280\u5229\u7684\u5927\u706F\u9020\u578B</div></div></div><div class="mark" data-v-9b792228><div class="des" data-v-9b792228><div class="text" data-v-9b792228>\u5168\u65B0\u6DF7\u52A8\u79D1\u6280\uFF0CFYRA\u56DB\u9A71\u52A8\u529B\u7CFB\u7EDF</div></div></div><div id="car" data-v-9b792228></div>',3),Vn={class:"button-box"},Hn=Qe("\u67E5\u770B\u5185\u9970"),zn={id:"color"},$n={setup(e){const t=Ye("\u64AD\u653E"),n=s=>{J.traverse(o=>{o.type==="Mesh"&&o.name.slice(0,2)==="\u5916\u58F3"&&o.material.color.set(s)})},i=s=>{n([145681,2236962,6947594,0,16777215,3605049][s])},r=()=>{We(),Ut.push("/360")},a=()=>{t.value==="\u64AD\u653E"?(t.value="\u6682\u505C",Ln()):(t.value="\u64AD\u653E",We())};return kt(()=>{const s=new Pt({map:new be().load("https://photo-sphere-viewer-data.netlify.app/assets/sphere.jpg")}),o=1e3,l=new xe(new Lt(o,o,o),s);l.geometry.scale(-1,1,1),C.add(l);const u=new Ot(250);C.add(u),C.add(J);const c=new Pe(16777215,.8);c.position.set(400,200,300),C.add(c);const h=new Pe(16777215,.8);h.position.set(-400,-200,-300),C.add(h);const p=new Nt(16777215,1);C.add(p);const y=new vt(16777215);y.position.set(400,200,300),C.add(y);const d=document.getElementById("car");d&&d.appendChild(v.domElement);const f=()=>{v.setSize(window.innerWidth,window.innerHeight),N.aspect=window.innerWidth/window.innerHeight,N.updateProjectionMatrix()};window.addEventListener("resize",f,!1),ot()}),qt(()=>{const s=document.getElementsByClassName("mark");for(let o=0;o<s.length;o++)s[o].style.visibility="hidden"}),(s,o)=>{const l=Le("el-progress"),u=Le("el-button");return Oe(),Ne("div",kn,[ve(Te)<100?(Oe(),Ne("div",qn,[ue(l,{"text-inside":!0,"stroke-width":24,percentage:ve(Te),status:"success"},null,8,["percentage"])])):Wt("",!0),Wn,O("div",Vn,[ue(u,{onClick:r,class:"switch"},{default:Fe(()=>[Hn]),_:1}),ue(u,{onClick:a,class:"switch"},{default:Fe(()=>[Qe(Ht(t.value),1)]),_:1})]),O("div",zn,[O("div",{onClick:o[0]||(o[0]=c=>i(0)),class:"colorChoose green"}),O("div",{onClick:o[1]||(o[1]=c=>i(1)),class:"colorChoose gray"}),O("div",{onClick:o[2]||(o[2]=c=>i(2)),class:"colorChoose red"}),O("div",{onClick:o[3]||(o[3]=c=>i(3)),class:"colorChoose black"}),O("div",{onClick:o[4]||(o[4]=c=>i(4)),class:"colorChoose white"}),O("div",{onClick:o[5]||(o[5]=c=>i(5)),class:"colorChoose pink"})])])}}};var jn=Gt($n,[["__scopeId","data-v-9b792228"]]);export{jn as default};
//# sourceMappingURL=Model.c29aaf4e.js.map