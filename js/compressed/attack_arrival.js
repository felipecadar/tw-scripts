javascript:(function(){'use strict';function a(a){var b=a.split("|"),c=[parseInt(b[0]),parseInt(b[1])];return c}function b(){return new Date(Timing.getCurrentServerTime())}function c(){return Timing.getCurrentServerTime()}function d(){troop_confirm_submit.click(),console.log("Attacking at",new Date)}function e(){const a=window.setInterval(function(){},Number.MAX_SAFE_INTEGER);for(let b=1;b<a;b++)window.clearInterval(b)}function f(){return Place.confirmScreen.getSendUnits()}function g(a){const b=60000,c=1e3,d=parseInt(a/3600000),e=parseInt((a-d*3600000)/b),f=parseInt((a-e*b-d*3600000)/c),g=parseInt(a-e*b-d*3600000-f*c);return`${d}h ${e}m ${f}s, ${g}ms`}function h(a){var b=a.split(":");return parseInt(b[0])*3600000+parseInt(b[1])*60000+parseInt(b[2])*1e3}Date.prototype.addTime=function(a){return this.setTime(this.getTime()+a),this},Date.prototype.subTime=function(a){return this.setTime(this.getTime()-a),this},Date.prototype.str=function(){return`${this.getFullYear()}/${this.getMonth()+1}/${this.getDate()} - ${this.getHours()}:${this.getMinutes()}:${this.getSeconds()}:${this.getMilliseconds()}`};var i=document.getElementById("command-data-form").getElementsByClassName("vis")[0].getElementsByTagName("tbody")[0],j=i.insertRow(-1),k=j.insertCell(-1),l=j.insertCell(-1);const m=Place.confirmScreen.data.type;k.appendChild(document.createTextNode(`${m} in: `)),l.appendChild(document.createTextNode(""));var n=i.insertRow(-1),o=n.insertCell(-1),p=n.insertCell(-1);o.appendChild(document.createTextNode("Arrive at:")),p.appendChild(document.createTextNode(""));var q=i.insertRow(-1);const r=new Date;var s=["ano","mes","dia","hora","minuto","segundo","milisegundo"],t={ano:"Data",mes:"/",dia:"/",hora:"Hora",minuto:":",segundo:":",milisegundo:":"},u={ano:`${r.getFullYear()}`,mes:`${r.getMonth()+1}`,dia:`${r.getDate()}`,hora:`${r.getHours()}`,minuto:`${r.getMinutes()}`,segundo:`${r.getSeconds()}`,milisegundo:"000"},v={},w=q.insertCell(-1);w.setAttribute("colspan",3);for(let a=0;a<s.length;a++){const b=s[a];var x=document.createElement("label");x.innerText=t[b],w.appendChild(x),w.appendChild(document.createElement("input"));const c=w.childNodes.length;w.childNodes[c-1].setAttribute("type","text"),w.childNodes[c-1].setAttribute("size","3"),w.childNodes[c-1].setAttribute("value",u[b]),v[b]=w.childNodes[c-1]}var y=i.insertRow(-1),z=y.insertCell(-1),A=document.createElement("button");A.innerHTML="Calcular",A.setAttribute("class","btn"),A.setAttribute("type","button"),A.onclick=function(){function i(){var a=b(),c=D.getTime()-a.getTime();l.textContent=100<c?g(c):"Attacking...";var d=a.addTime(C),e=new Date(D.getTime()+C);p.textContent=e.str(),r.textContent=d.str()}function j(){0>=D.getTime()-c()&&(s?(alert("Too late pal!"),e()):(d(),e())),s&&(s=!1)}e();const k=f(),n=a(game_data.village.coord);var o="",q="",r=null;!1==game_data.features.Premium.active?"support"==m?(o=document.querySelector("#command-data-form > div > table > tbody > tr:nth-child(2) > td:nth-child(2) > span").textContent,q=document.querySelector("#command-data-form > div > table > tbody > tr:nth-child(4) > td:nth-child(2)").textContent,r=document.querySelector("#date_arrival > span")):(o=document.querySelector("#command-data-form > div:nth-child(11) > table > tbody > tr:nth-child(2) > td:nth-child(2) > span > a:nth-child(1)").textContent,q=document.querySelector("#command-data-form > div:nth-child(11) > table > tbody > tr:nth-child(4) > td:nth-child(2)").textContent,r=document.querySelector("#date_arrival > span")):"support"==m?(o=document.querySelector("#command-data-form > div > table > tbody > tr:nth-child(2) > td:nth-child(2) > span > a:nth-child(1)").textContent,q=document.querySelector("#command-data-form > div > table > tbody > tr:nth-child(4) > td:nth-child(2)").textContent,r=document.querySelector("#date_arrival > span")):(o=document.querySelector("#command-data-form > div:nth-child(10) > table > tbody > tr:nth-child(2) > td:nth-child(2) > span > a:nth-child(1)").textContent,q=document.querySelector("#command-data-form > div:nth-child(10) > table > tbody > tr:nth-child(4) > td:nth-child(2)").textContent,r=document.querySelector("#date_arrival > span"));a(o.substring(o.length-12,o.length-5));var s=!0;const t=parseInt(v.ano.value),u=parseInt(v.mes.value)-1,w=parseInt(v.dia.value),x=parseInt(v.hora.value),y=parseInt(v.minuto.value),z=parseInt(v.segundo.value),A=parseInt(v.milisegundo.value),B=new Date(t,u,w,x,y,z,A),C=h(q),D=B.subTime(C);setInterval(i,200),setInterval(j,25)},z.appendChild(A)})();