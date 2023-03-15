// ==UserScript==
// @name        mute-tts-userscript
// @version     0.0.1
// @license     MIT
// @homepage    https://crashmax-dev.github.io/mute-tts-userscript/
// @match       https://www.twitch.tv/*
// @grant       GM_addStyle
// @updateURL   https://crashmax-dev.github.io/mute-tts-userscript/mute-tts-userscript.meta.js
// @downloadURL https://crashmax-dev.github.io/mute-tts-userscript/mute-tts-userscript.user.js
// ==/UserScript==

var H=Object.defineProperty,ee=(c,u,d)=>u in c?H(c,u,{enumerable:!0,configurable:!0,writable:!0,value:d}):c[u]=d,h=(c,u,d)=>(ee(c,typeof u!="symbol"?u+"":u,d),d),D=(c,u,d)=>{if(!u.has(c))throw TypeError("Cannot "+d)},E=(c,u,d)=>(D(c,u,"read from private field"),d?d.call(c):u.get(c)),P=(c,u,d)=>{if(u.has(c))throw TypeError("Cannot add the same private member more than once");u instanceof WeakSet?u.add(c):u.set(c,d)},x=(c,u,d,g)=>(D(c,u,"write to private field"),g?g.call(c,d):u.set(c,d),d);(function(){var c;class u{constructor(){h(this,"queue"),h(this,"isProcessing"),this.queue=[],this.isProcessing=!1}add(e){this.queue.push(e),this.process()}async process(){if(!this.isProcessing){for(this.isProcessing=!0;this.queue.length;){const e=this.queue.shift();e&&await e()}this.isProcessing=!1}}}function d(n,e){return new MutationObserver(t=>{for(const r of t){const o=Object.values(r.addedNodes),i=o.findIndex(a=>{const l=a.querySelector(".live-message-separator-line__hr");return Boolean(l)}),s=i!==-1?o.slice(0,i):o;console.log({addedNodes:s,lineIndex:i});for(const a of s){const l=a;if(l.classList.contains("muted"))return;if(l.classList.contains("chat-line__message")){const p=l.querySelector(".chat-author__display-name").textContent.toLowerCase(),{targetsUsernames:f}=n.data;(!f.length||f.includes(p))&&(l.classList.add("muted"),e(l,p))}}}})}function g(n,e){var t;console.log(`Toggle mute (${n}):`,e),(t=document.querySelector('[data-a-target="player-mute-unmute-button"]'))==null||t.click()}async function k(n){return new Promise(e=>setTimeout(e,n))}const V=3e3;function F(n){const e=new u;let t=!1;function r(i,s){if(n.data.commandsList.includes(i.toLowerCase().slice(1)))return;const a=async()=>{await k(V),g(s,!0),await k(n.data.muteMs),g(s,!1),e.process()};e.add(a)}const o=d(n,(i,s)=>{var a;const l=i.querySelector(".text-fragment");l&&((a=l.textContent)==null?void 0:a.charAt(0))==="!"&&(console.log({message:l.textContent,username:s}),r(l.textContent,s))});return{disconnect:()=>{o.disconnect()},observe:()=>{if(t)return;const i=document.querySelector(".chat-scrollable-area__message-container");i&&(t=!0,o.observe(i,{childList:!0}))}}}class I{constructor(e,t,r,o){h(this,"serialize"),h(this,"deserialize"),this.key=e,this.initialValue=t,this.storage=r,this.serialize=i=>o!=null&&o.serialize?o.serialize(i):JSON.stringify(i),this.deserialize=i=>o!=null&&o.deserialize?o.deserialize(i):JSON.parse(i)}get values(){try{const e=this.storage.getItem(this.key);return e?this.deserialize(e):this.initialValue}catch{return this.initialValue}}write(e){e instanceof Function&&(e=e(this.values));try{this.storage.setItem(this.key,this.serialize(e))}catch(t){return console.error(`Failed to save (${this.key}):`,t.message),this.initialValue}return e}reset(){this.write(this.initialValue)}}class U extends I{constructor(e,t,r){super(e,t,localStorage,r)}}function B(n,e){var t=G(n),r=t.tag,o=t.id,i=t.className,s=e?document.createElementNS(e,r):document.createElement(r);return o&&(s.id=o),i&&(e?s.setAttribute("class",i):s.className=i),s}function G(n){for(var e=n.split(/([.#])/),t="",r="",o=1;o<e.length;o+=2)switch(e[o]){case".":t+=" "+e[o+1];break;case"#":r=e[o+1]}return{className:t.trim(),tag:e[0]||"div",id:r}}function J(n,e){var t=m(n),r=m(e);return e===r&&r.__redom_view&&(e=r.__redom_view),r.parentNode&&(C(e,r,t),t.removeChild(r)),e}function C(n,e,t){var r=e.__redom_lifecycle;if(z(r)){e.__redom_lifecycle={};return}var o=t;for(e.__redom_mounted&&v(e,"onunmount");o;){var i=o.__redom_lifecycle||{};for(var s in r)i[s]&&(i[s]-=r[s]);z(i)&&(o.__redom_lifecycle=null),o=o.parentNode}}function z(n){if(n==null)return!0;for(var e in n)if(n[e])return!1;return!0}var K=["onmount","onremount","onunmount"],R=typeof window<"u"&&"ShadowRoot"in window;function L(n,e,t,r){var o=m(n),i=m(e);e===i&&i.__redom_view&&(e=i.__redom_view),e!==i&&(i.__redom_view=e);var s=i.__redom_mounted,a=i.parentNode;if(s&&a!==o&&C(e,i,a),t!=null)if(r){var l=m(t);l.__redom_mounted&&v(l,"onunmount"),o.replaceChild(i,l)}else o.insertBefore(i,m(t));else o.appendChild(i);return W(e,i,o,a),e}function v(n,e){e==="onmount"||e==="onremount"?n.__redom_mounted=!0:e==="onunmount"&&(n.__redom_mounted=!1);var t=n.__redom_lifecycle;if(t){var r=n.__redom_view,o=0;r&&r[e]&&r[e]();for(var i in t)i&&o++;if(o)for(var s=n.firstChild;s;){var a=s.nextSibling;v(s,e),s=a}}}function W(n,e,t,r){for(var o=e.__redom_lifecycle||(e.__redom_lifecycle={}),i=t===r,s=!1,a=0,l=K;a<l.length;a+=1){var p=l[a];i||n!==e&&p in n&&(o[p]=(o[p]||0)+1),o[p]&&(s=!0)}if(!s){e.__redom_lifecycle={};return}var f=t,b=!1;for((i||f&&f.__redom_mounted)&&(v(e,i?"onremount":"onmount"),b=!0);f;){var y=f.parentNode,N=f.__redom_lifecycle||(f.__redom_lifecycle={});for(var S in o)N[S]=(N[S]||0)+o[S];if(b)break;(f.nodeType===Node.DOCUMENT_NODE||R&&f instanceof ShadowRoot||y&&y.__redom_mounted)&&(v(f,i?"onremount":"onmount"),b=!0),f=y}}function $(n,e,t){var r=m(n);if(typeof e=="object")for(var o in e)j(r,o,e[o]);else j(r,e,t)}function j(n,e,t){n.style[e]=t??""}var q="http://www.w3.org/1999/xlink";function O(n,e,t,r){var o=m(n),i=typeof e=="object";if(i)for(var s in e)O(o,s,e[s],r);else{var a=o instanceof SVGElement,l=typeof t=="function";if(e==="style"&&typeof t=="object")$(o,t);else if(a&&l)o[e]=t;else if(e==="dataset")T(o,t);else if(!a&&(e in o||l)&&e!=="list")o[e]=t;else{if(a&&e==="xlink"){M(o,t);return}r&&e==="class"&&(t=o.className+" "+t),t==null?o.removeAttribute(e):o.setAttribute(e,t)}}}function M(n,e,t){if(typeof e=="object")for(var r in e)M(n,r,e[r]);else t!=null?n.setAttributeNS(q,e,t):n.removeAttributeNS(q,e,t)}function T(n,e,t){if(typeof e=="object")for(var r in e)T(n,r,e[r]);else t!=null?n.dataset[e]=t:delete n.dataset[e]}function Q(n){return document.createTextNode(n??"")}function A(n,e,t){for(var r=0,o=e;r<o.length;r+=1){var i=o[r];if(!(i!==0&&!i)){var s=typeof i;s==="function"?i(n):s==="string"||s==="number"?n.appendChild(Q(i)):X(m(i))?L(n,i):i.length?A(n,i,t):s==="object"&&O(n,i,null,t)}}}function m(n){return n.nodeType&&n||!n.el&&n||m(n.el)}function X(n){return n&&n.nodeType}function w(n){for(var e=[],t=arguments.length-1;t-- >0;)e[t]=arguments[t+1];var r,o=typeof n;if(o==="string")r=B(n);else if(o==="function"){var i=n;r=new(Function.prototype.bind.apply(i,[null].concat(e)))}else throw new Error("At least one argument required");return A(m(r),e,!0),r}var _=w;w.extend=function(){for(var n=[],e=arguments.length;e--;)n[e]=arguments[e];return w.bind.apply(w,[this].concat(n))};const te="";class Y{constructor(e){h(this,"overlay"),this.config=e,this.generateMenu(),document.addEventListener("keydown",t=>{t.code==="KeyQ"&&t.ctrlKey&&this.open()})}generateMenu(){const e=_("form",{className:"mt_form",onsubmit:a=>this.onSubmit(a,e)}),t=Object.entries(this.config.data);for(const[a,l]of t){const{description:p,type:f}=this.config.configMeta[a],b=_("input",{type:f,name:a,value:l,className:"mt_input"}),y=_("label",{for:a,className:"mt_label"},p),N=_("div",[y,b]);e.appendChild(N)}const r=_("button",{type:"submit",className:"mt_button mt_button_submit"},"\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C"),o=_("div",r);e.appendChild(o);const i=_("button",{className:"mt_modal_close",onclick:()=>this.close()},"\u2716"),s=_("div",{className:"mt_modal"},i,e);this.overlay=_("div",{className:"modal__backdrop"},s)}onSubmit(e,t){e.preventDefault();const r=new FormData(t),o={};for(const[i,s]of r.entries())switch(this.config.configMeta[i].type){case"text":o[i]=s.toString().toLowerCase().split(",");break;case"number":o[i]=Number(s);break}this.config.write(o),this.config.read()}open(){L(document.body,this.overlay)}close(){J(document.body,this.overlay)}}class Z{constructor(){P(this,c,void 0),h(this,"config"),h(this,"defaultOptions",{muteMs:5e3,targetsUsernames:["b0do4ka","vs_code"],commandsList:["\u0442\u0442\u0441","tts"]}),h(this,"configMeta",{commandsList:{description:"\u0421\u043F\u0438\u0441\u043E\u043A \u043A\u043E\u043C\u0430\u043D\u0434",type:"text"},muteMs:{description:"\u0412\u0440\u0435\u043C\u044F \u043C\u0443\u0442\u0430 (ms)",type:"number"},targetsUsernames:{description:"\u041C\u0443\u0442\u0438\u0442\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439",type:"text"}}),this.config=new U("mute-tts-userscript",this.defaultOptions),this.read(),new Y(this)}get data(){return E(this,c)}read(){return x(this,c,this.config.values),this.data}write(e){this.config.write(t=>{const r=Object.assign(t,e);return x(this,c,r),t})}}c=new WeakMap,window.addEventListener("load",()=>{const n=new Z,{observe:e}=F(n),{history:t}=window,{pushState:r,replaceState:o}=t;t.pushState=(...i)=>{r.apply(t,i),e()},t.replaceState=(...i)=>{o.apply(t,i),e()},e()}),GM_addStyle(".mt_modal{position:absolute;left:5%;top:5%;width:90%;height:90%;background-color:#18181b;padding:unset;margin:unset;z-index:999999;border-radius:1rem}.mt_modal_close{position:absolute;right:5px;top:0;font-weight:900;font-size:16px;padding:1rem}.mt_form{display:flex;justify-content:center;align-items:flex-end;height:100%;flex-direction:column;gap:1rem;max-width:70%}.mt_input{font-family:inherit;appearance:none;background-clip:padding-box;line-height:1.5;border-style:solid;border-width:2px;border-color:#ffffff29;color:#efeff1;background-color:#ffffff29;border-radius:.4rem;padding:.5rem 1rem}.mt_input:focus{outline:none}.mt_label{padding-right:1rem}.mt_button{border:none;border-radius:.4rem;color:#efeff1;font-weight:600;font-size:1.3rem;padding:6px;width:100px;text-align:center}.mt_button_submit{background-color:#9147ff}.mt_button_close{background-color:#53535f61}")})();
