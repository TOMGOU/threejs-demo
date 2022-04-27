import{r as _,o as d,c as m,a as p,b as f,d as h,e as v,i as E,z as y}from"./vendor.432cbb82.js";const A=function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&t(o)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}};A();var C=(u,i)=>{const n=u.__vccOpts||u;for(const[t,e]of i)n[t]=e;return n};const L={};function g(u,i){const n=_("router-view");return d(),m("div",null,[p(n)])}var O=C(L,[["render",g]]);const k="modulepreload",c={},P="./",s=function(i,n){return!n||n.length===0?i():Promise.all(n.map(t=>{if(t=`${P}${t}`,t in c)return;c[t]=!0;const e=t.endsWith(".css"),r=e?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${t}"]${r}`))return;const o=document.createElement("link");if(o.rel=e?"stylesheet":k,e||(o.as="script",o.crossOrigin=""),o.href=t,document.head.appendChild(o),e)return new Promise((a,l)=>{o.addEventListener("load",a),o.addEventListener("error",()=>l(new Error(`Unable to preload CSS for ${t}`)))})})).then(()=>i())},D=[{path:"/",component:()=>s(()=>import("./Model.aed3e9f6.js"),["assets/Model.aed3e9f6.js","assets/Model.e924a716.css","assets/vendor.432cbb82.js","assets/three.module.4e473ec6.js","assets/photo-sphere-viewer.cd7e4c7d.js","assets/photo-sphere-viewer.840a8302.css","assets/GLTFLoader.1dc520eb.js"])},{path:"/carModel",name:"CarModel",meta:{doNotCheckAuth:!0,title:"\u6C7D\u8F66\u96F6\u4EF6"},component:()=>s(()=>import("./CarModel.aa0f045f.js"),["assets/CarModel.aa0f045f.js","assets/CarModel.93970ba2.css","assets/three.module.4e473ec6.js","assets/vendor.432cbb82.js","assets/index.cf451ced.js"])},{path:"/store",name:"Store",meta:{doNotCheckAuth:!0,title:"\u6A21\u578B\u6F2B\u6E38"},component:()=>s(()=>import("./Store.38852ec6.js"),["assets/Store.38852ec6.js","assets/Store.f9c54e40.css","assets/three.module.4e473ec6.js","assets/index.cf451ced.js","assets/vendor.432cbb82.js"])},{path:"/model",name:"Model",meta:{doNotCheckAuth:!0,title:"\u6A21\u578B\u5C55\u793A"},component:()=>s(()=>import("./Model.aed3e9f6.js"),["assets/Model.aed3e9f6.js","assets/Model.e924a716.css","assets/vendor.432cbb82.js","assets/three.module.4e473ec6.js","assets/photo-sphere-viewer.cd7e4c7d.js","assets/photo-sphere-viewer.840a8302.css","assets/GLTFLoader.1dc520eb.js"])},{path:"/360",name:"360",meta:{doNotCheckAuth:!0,title:"\u5168\u666F\u56FE\u7247"},component:()=>s(()=>import("./360.4924fdb9.js"),["assets/360.4924fdb9.js","assets/360.a4b2b209.css","assets/photo-sphere-viewer.cd7e4c7d.js","assets/photo-sphere-viewer.840a8302.css","assets/vendor.432cbb82.js"])},{path:"/display",name:"Display",meta:{doNotCheckAuth:!0,title:"3D\u5C55\u793A"},component:()=>s(()=>import("./Display.2f704afb.js"),["assets/Display.2f704afb.js","assets/Display.22282044.css","assets/three.module.4e473ec6.js","assets/GLTFLoader.1dc520eb.js","assets/vendor.432cbb82.js"])}],N=f({history:h(),routes:D});v(O).use(N).use(E,{locale:y}).mount("#app");export{C as _};
//# sourceMappingURL=index.84e4b379.js.map