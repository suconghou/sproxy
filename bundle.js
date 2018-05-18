"use strict";function _interopDefault(e){return e&&"object"==typeof e&&"default"in e?e.default:e}var os=_interopDefault(require("os")),net=_interopDefault(require("net")),process=_interopDefault(require("process"));var serve=e=>net.createServer(e);const echo=e=>{e.pipe(e).on("error",r=>{e.destroy(r)})},r="error";const elog=e=>console.error(e.toString()),p=e=>/^\d{1,5}$/.test(e),port=process.env.PORT||80,sslport=process.env.SSLPORT||443,echoport=process.env.ECHOPORT,f_host=process.env.FORWARD_HOST,f_port=process.env.FORWARD_PORT;if(p(echoport))serve(echo).listen(echoport);else if(f_host&&p(f_port)){serve(e=>((e,t,o)=>{const n=net.createConnection({host:t,port:o},()=>{n.pipe(e).on(r,e=>{n.destroy(e)}),e.pipe(n).on(r,r=>{e.destroy(r)})}).on(r,r=>{e.destroy(r)})})(e,f_host,f_port)).listen(port)}else{serve(e=>{e.once("data",t=>{let o,n;if((e=>{if(e.length<5)return!1;if(22!==e[0])return!1;const r=e[1],t=e[2];if(3!==r)return!1;if(t<1||t>3)return!1;const o=e[3]<<8|e[4];return!(e.length<5+o)&&1===e[5]})(t))o=(e=>{let r=e.length,t=43;if(t>r-1)return null;if((t+=1+e[t])>r-2)return null;if((t+=2+(e[t]<<8|e[t+1]))>r-1)return null;if((t+=1+e[t])>r-2)return null;let o=e[t]<<8|e[t+1],n=(t+=2)+o;if(n>r)return null;for(r=n;t<=r-4;){let o=e[t]<<8|e[t+1],n=e[t+2]<<8|e[t+3];if(t+=4,0===o){if(t>r-2)return null;let o=e[t]<<8|e[t+1],n=t+=2;if((t+=o)>r)return null;for(;n<t-3;){let t=e[n],o=e[n+1]<<8|e[n+2];if(n+=3,0===t)return n>r-o?null:e.toString("ascii",n,n+o);n+=o}}else t+=n}return null})(t),n=sslport;else{const e=(e=>{const r=e.toString().split(os.EOL),t=r.length;for(let e=0;e<t;e++){const[t,o,n]=r[e].split(":",3);if("host"==t.toLowerCase())return{host:o.trim(),port:n||80}}return{}})(t);o=e.host,n=e.port}o?((e,t,o,n)=>{const s=net.createConnection({host:o,port:n},()=>{s.write(t,()=>{s.pipe(e).on(r,e=>{s.destroy(e)}),e.pipe(s).on(r,r=>{e.destroy(r)})})}).on(r,r=>{e.destroy(r)})})(e,t,o,n):e.write(t,()=>{e.pipe(e)})}).on("error",elog)}).listen(port)}