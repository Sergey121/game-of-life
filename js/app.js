(()=>{"use strict";const e=e=>e.split(",").map((e=>parseInt(e,10)));class t{#e=null;#t=0;constructor(e,t){this.#e=e,this.#t=t}get id(){return this.#e}get value(){return this.#t}set value(e){this.#t=e}get position(){return e(this.#e)}}class i{constructor(e){this.#i=e}#i=null;#n=[];#s=0;#l=new Set;#a=new Set;get ui(){return this.#i}get generation(){return this.#s}get live(){return[...this.#l.keys()]}get died(){return[...this.#a.keys()]}initialize(){this.#n=[];const e=this.#i.columns,i=this.#i.rows;for(let n=0;n<i;n++){const i=[];for(let s=0;s<e;s++)i.push(new t(`${n},${s}`,0));this.#n.push(i)}}onCellClick(e,t){const i=0===this.#n[e][t].value?1:0;this.#n[e][t].value=i,0===i?(this.#a.add(this.#n[e][t].id),this.#l.delete(this.#n[e][t].id)):(this.#l.add(this.#n[e][t].id),this.#a.delete(this.#n[e][t].id)),this.draw()}draw(){throw new Error("Must be implemented by subclass!")}next(){return this.#o(),[this.generation,this.#l.size]}reset(){this.#s=0,this.#n.forEach((e=>{e.forEach((e=>{1===e.value&&this.#a.add(e.id),e.value=0}))})),this.draw(),this.#l.clear(),this.#a.clear()}changeFieldSize(){this.reset(),this.initialize()}#o(){this.#r(),this.#s++,this.draw()}#r(){const t=new Set,i=new Set;this.live.forEach((n=>{const[s,l]=e(n),a=this.#n[s][l],[o,r]=this.#d(a);r.length<2||r.length>3?i.add(n):t.add(n),o.forEach((e=>{if(0===e.value){const[n,s]=e.position,l=`${n},${s}`,a=this.#n[n][s],[,o]=this.#d(a);3===o.length?t.add(l):i.add(l)}}))})),[...t.keys()].forEach((t=>{const[i,n]=e(t);this.#n[i][n].value=1})),[...i.keys()].forEach((t=>{const[i,n]=e(t);this.#n[i][n].value=0})),this.#l=t,this.#a=i}#d(e){const[t,i]=e.position,n=[];let s=[[1,0],[0,1],[-1,0],[0,-1],[1,1],[-1,-1],[-1,1],[1,-1]];for(let e=0;e<s.length;e++){let l=t+s[e][0],a=i+s[e][1];-1===l?l=this.#i.rows-1:l===this.#i.rows&&(l=0),-1===a?a=this.#i.columns-1:a===this.#i.columns&&(a=0),n.push(this.#n[l][a])}return[n,n.filter((e=>1===e.value))]}setBoard(e){this.reset(),this.initialize(),e.pattern.forEach(((t,i)=>{t.forEach(((n,s)=>{if(1===n){const n=Math.floor(this.#i.rows/2-e.pattern.length/2),l=Math.floor(this.#i.columns/2-t.length/2);this.onCellClick(i+n,s+l)}}))}))}}class n extends i{elements=[];container=null;initialize(){super.initialize();const e=this.ui.columns,t=this.ui.rows,i=this.ui.cellSize;this.elements.length=0;const n=document.getElementById("content");n.innerHTML="";const s=document.createElement("div");s.style.width=e*i+"px",this.container=s;for(let n=0;n<t;n++){const t=document.createElement("div");t.classList.add("row");for(let s=0;s<e;s++){const e=document.createElement("div");e.classList.add("cell"),e.style.width=`${i}px`,e.style.height=`${i}px`,e.dataset.position=`${n},${s}`,t.appendChild(e),this.elements.push(e)}s.appendChild(t)}n.appendChild(s),this.container.addEventListener("click",this.handleClick)}handleClick=t=>{const i=t.target.dataset.position;if(i){const[t,n]=e(i);this.onCellClick(t,n)}};onCellClick(e,t){super.onCellClick(e,t)}draw(){this.live.forEach((t=>{const[i,n]=e(t),s=i*this.ui.columns+n;this.elements[s].classList.add("alive")})),this.died.forEach((t=>{const[i,n]=e(t),s=i*this.ui.columns+n;this.elements[s].classList.remove("alive")}))}changeFieldSize(){super.changeFieldSize(),this.initialize()}}class s{#h=null;#c=document.body;#u=null;#m=null;constructor(e){this.#m=e||(()=>null)}showModal(){this.#h=this.#m(),this.#u=document.createElement("div"),this.#u.classList.add("modal");const e=document.createElement("div");e.classList.add("modal__content"),e.appendChild(this.#h),this.#u.appendChild(e),this.#c.appendChild(this.#u)}closeModal(){this.#c.removeChild(this.#u)}}const l=[{name:"Glider",description:"A glider is a pattern that travels across the board. It is the smallest spaceship. It was first discovered by Richard K. Guy in 1970. It consists of 5 cells.",pattern:[[0,1,0],[0,0,1],[1,1,1]]},{name:"Blinker",description:"A blinker is a period 2 oscillator. It was found by the Lifeline program in 1970. It consists of 3 cells.",pattern:[[1,1,1]]},{name:"Cross",description:"Found by Robert Wainwright in October 1989. The members of this family are all polyominoes.",pattern:[[0,0,1,1,1,1,0,0],[0,0,1,0,0,1,0,0],[1,1,1,0,0,1,1,1],[1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1],[1,1,1,0,0,1,1,1],[0,0,1,0,0,1,0,0],[0,0,1,1,1,1,0,0]]},{name:"Gosper glider gun",description:"The Gosper glider gun is the first known gun and the first known finite pattern with unbounded growth. It was discovered by Bill Gosper in November 1970. It consists of 36 cells.",pattern:[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0],[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0],[0,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,1,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]},{name:"Quasar",description:"Quasar is a period-3 oscillator that was found by Robert Wainwright.",pattern:[[1,1,1,0,0,0,1,1,1],[1,0,1,0,0,0,1,0,1],[1,1,1,0,0,0,1,1,1],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[1,1,1,0,0,0,1,1,1],[1,0,1,0,0,0,1,0,1],[1,1,1,0,0,0,1,1,1]]},{name:"112P15",description:"112P15 (or flicker) is an unnamed period-15 oscillator found by Maia Karpovich on April 4, 2016 as part of a haul submitted to Adam P. Goucher's Catagolue.",pattern:[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0],[0,0,0,0,1,0,1,0,1,1,0,0,0,0,0,0,0,1,1,0,1,0,1,0,0,0,0],[0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0],[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],[0,1,0,0,0,0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0,0,1,0],[0,0,1,1,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,1,1,0,0],[0,0,1,1,0,0,0,0,0,0,1,0,1,0,1,0,1,0,0,0,0,0,0,1,1,0,0],[0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0],[0,0,1,1,0,0,0,0,0,0,1,0,1,0,1,0,1,0,0,0,0,0,0,1,1,0,0],[0,0,1,1,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,1,1,0,0],[0,1,0,0,0,0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0,0,1,0],[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],[0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0],[0,0,0,0,1,0,1,0,1,1,0,0,0,0,0,0,0,1,1,0,1,0,1,0,0,0,0],[0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]}];class a{#p=null;#g=100;#v=100;#w=10;#f=100;#E=new s((()=>this.#C()));#b=document.getElementById("startGame");#S=document.getElementById("nextGeneration");#x=document.getElementById("stopGame");#z=document.getElementById("resetGame");#y=document.getElementById("generationNumber");#k=document.getElementById("liveNumber");#B=document.getElementById("numberOfRows");#_=document.getElementById("numberOfColumns");#L=document.getElementById("cellSize");#M=document.getElementById("examplesModal");#I=document.getElementById("speedRange");constructor(e){this.#p=e,this.initialize()}get rows(){return this.#g}get columns(){return this.#v}get cellSize(){return this.#w}get speed(){return this.#f}initialize(){this.#b.addEventListener("click",this.#N),this.#S.addEventListener("click",this.#R),this.#x.addEventListener("click",this.#G),this.#z.addEventListener("click",this.#F),this.#B.addEventListener("change",this.#T),this.#_.addEventListener("change",this.#$),this.#L.addEventListener("change",this.#q),this.#M.addEventListener("click",this.#A),this.#I.addEventListener("change",this.#O),window.document.querySelectorAll("input[name='board_type']").forEach((e=>{e.addEventListener("change",this.#H)}))}#N=()=>{this.#p.start()};#R=()=>{this.#p.next()};#G=()=>{this.#p.stop()};#F=()=>{this.#p.reset()};#T=e=>{const t=Number.parseInt(e.target.value);if(Number.isNaN(t))return window.alert("Incorrect value.");this.#g=Math.round(t),this.#p.changeFieldSize()};#$=e=>{const t=Number.parseInt(e.target.value);if(Number.isNaN(t))return window.alert("Incorrect value.");this.#v=Math.round(t),this.#p.changeFieldSize()};#H=e=>{const t=e.target.value;this.#p.changeBoardType(t)};#q=e=>{const t=Number.parseInt(e.target.value);if(Number.isNaN(t))return window.alert("Incorrect value.");this.#w=Math.round(t),this.#p.changeCellSize()};#A=()=>{this.#E.showModal()};#C=()=>{const e=document.createElement("div");e.innerHTML='\n      <div class="modal__header">\n        <h2>Examples</h2>\n        <button id="closeBtn" class="modal__close-btn">\n            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"></path><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>\n        </button>\n      </div>\n      <div class="examples__content"></div>\n    ';const t=e.querySelector(".examples__content");for(const e of l){const i=document.createElement("div");i.classList.add("example"),i.innerHTML=`\n        <div class="example__header">\n          <h3>${e.name}</h3>\n          <button class="example__btn button">Use</button>\n        </div>\n        <div class="example__content">\n          <div class="example__description">${e.description}</div>\n          <div class="example__board">\n            <div class="example__board-content"></div>\n          </div>\n        </div>\n      `;const n=i.querySelector(".example__board-content");for(const t of e.pattern){const e=document.createElement("div");e.classList.add("example__row");for(const i of t){const t=document.createElement("div");t.classList.add("example__cell"),t.classList.add(i?"example__cell--alive":"example__cell--dead"),e.appendChild(t)}n.appendChild(e)}i.querySelector(".example__btn").addEventListener("click",(()=>{this.#p.setBoard(e),this.#E.closeModal()})),t.appendChild(i)}return e.querySelector("#closeBtn").addEventListener("click",(()=>{this.#E.closeModal()})),e};#O=e=>{const t=Number.parseInt(e.target.value);this.#f=Math.round(1e3/t)};updateGeneration(e){this.#y.textContent=e}updateLive(e){this.#k.textContent=e}}const o="rgb(175, 216, 248)";class r extends i{#P=null;#K=null;#Q=null;initialize(){super.initialize();const e=document.createElement("canvas");e.width=this.ui.columns*this.ui.cellSize,e.height=this.ui.rows*this.ui.cellSize;const t=document.getElementById("content");t.innerHTML="",this.#P=e,this.#K=e.getContext("2d"),this.#K.strokeStyle=o;for(let e=0;e<this.ui.rows;e++)for(let t=0;t<this.ui.columns;t++)this.#W(e,t);e.addEventListener("mousemove",this.#X),e.addEventListener("mousedown",this.#Y),t.appendChild(e)}#W=(e,t)=>{this.#K.strokeStyle=o,this.#K.fillStyle="rgb(236, 240, 241)",this.#K.fillRect(t*this.ui.cellSize,e*this.ui.cellSize,this.ui.cellSize,this.ui.cellSize),this.#K.strokeRect(t*this.ui.cellSize,e*this.ui.cellSize,this.ui.cellSize,this.ui.cellSize)};#U=(e,t)=>{this.#K.fillStyle="rgb(12, 53, 71)",this.#K.fillRect(t*this.ui.cellSize,e*this.ui.cellSize,this.ui.cellSize,this.ui.cellSize)};draw(){this.live.forEach((t=>{const[i,n]=e(t);this.#U(i,n)})),this.died.forEach((t=>{const[i,n]=e(t);this.#W(i,n)}))}#X=e=>{const t=e.offsetX,i=e.offsetY,n=Math.floor(i/this.ui.cellSize),s=Math.floor(t/this.ui.cellSize);1===e.buttons&&(this.#Q&&this.#Q[0]===n&&this.#Q[1]===s||this.onCellClick(n,s)),this.#Q=[n,s]};#Y=e=>{const t=e.offsetX,i=e.offsetY,n=Math.floor(i/this.ui.cellSize),s=Math.floor(t/this.ui.cellSize);this.onCellClick(n,s)}}(new class{ui=new a(this);board=null;#j=!1;initialize(){this.board=new r(this.ui),this.board.initialize()}start(){if(this.#j)return;this.#j=!0;let e=0;const t=i=>{const n=this.ui.speed;this.#j&&(i-e>n&&(this.next(),e=i),window.requestAnimationFrame(t))};window.requestAnimationFrame(t)}stop(){this.#j=!1}next(){const[e,t]=this.board.next();this.ui.updateGeneration(e),this.ui.updateLive(t)}reset(){this.board.reset(),this.ui.updateGeneration(0),this.ui.updateLive(0)}changeFieldSize(){this.reset(),this.board.changeFieldSize()}changeBoardType(e){this.reset(),this.board="htmlBoard"===e?new n(this.ui):new r(this.ui),this.board.initialize()}changeCellSize(){this.reset(),this.board.initialize()}setBoard(e){this.reset(),this.board.setBoard(e)}}).initialize()})();