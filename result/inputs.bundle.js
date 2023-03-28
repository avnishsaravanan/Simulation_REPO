/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

//detail queryselectors if necessary
//imports - 

let velos = __webpack_require__(4);
    const coaxial_velocity = velos.coaxial_velocity;
    const displacement = velos.displacement;
    const coaxial_displacement = velos.coaxial_displacement;
    const axial_velocity = velos.axial_velocity;
const simselect = __webpack_require__(5);

function inputs (masses, velo, positions, checks) {
//    let interaction = require("./interaction.js");
    //let masses = interaction.masses;
    //let positions = interaction.positions;
    let velocities = [];
    let result;
    
    let process = velo.map(elem => axial_velocity(elem) );
    process.forEach(function(n) { velocities.push(n); });
    console.log('from inputs js: velocities', velocities);
    // to wait until all elements are loaded

let checked = checks;
let dt_PA;
let dt_QA;
let dp_PA;
let dp_QA;
let event1 = {};
let event2 = {};

relvelo = {x: Math.abs((velocities[checked[1]].x - velocities[checked[0]].x)), 
           y: Math.abs((velocities[checked[1]].y - velocities[checked[0]].y)),
           z: Math.abs((velocities[checked[1]].z - velocities[checked[0]].z))};
relvelo.total = (Math.sqrt(relvelo.x**2 + relvelo.y**2 + relvelo.z**2));

//console.log( "from input js: relvelo ", relvelo);

function declareParam() {
event1.time = document.querySelector("#eventpln > fieldset > #e1time").value;
event1.x = document.querySelector("#eventpln > fieldset > #e1x").value;
event1.y = document.querySelector("#eventpln > fieldset > #e1y").value;
event1.z = document.querySelector("#eventpln > fieldset > #e1z").value;
event1.pos = [event1.x, event1.y, event1.z];

event2.time = document.querySelector("#eventpln > fieldset > #e2time").value;
event2.x = document.querySelector("#eventpln > fieldset > #e2x").value;
event2.y = document.querySelector("#eventpln > fieldset > #e2y").value;
event2.z = document.querySelector("#eventpln > fieldset > #e2z").value;

event2.pos = [event2.x, event2.y, event2.z]; 
console.log('from input js: finish declare param');
}

function sol_var() {

    declareParam();
    let solvefx = document.querySelector("#solvefx");

    if (solvefx.value == "deltat1") { dt_PA = (event2.time - event1.time); 
                                     dp_PA = displacement(event2.pos, event1.pos); 
                                     dt_QA = null;
                                     dp_QA = null; 
                                     mass1 = masses[checked[1]];
                                     mass2 = masses[checked[0]];
                                     colinear_veloA = coaxial_velocity(relvelo, event2.pos, event1.pos); 
                                     colinear_disA = coaxial_displacement(relvelo, event2.pos, event1.pos); }
    if (solvefx.value == "deltat")  { dt_QA = (event2.time - event1.time); 
                                     dp_QA = displacement(event2.pos, event1.pos); 
                                     dt_PA = null;
                                     dp_PA = null;
                                     mass1 = masses[checked[0]];
                                     mass2 = masses[checked[1]];
                                     colinear_veloA = coaxial_velocity(relvelo, event2.pos, event1.pos); 
                                     colinear_disA = coaxial_displacement(relvelo, event2.pos, event1.pos); }
    if (solvefx.value == "deltax1") { if (event2.x == null || event1.x == null) {dp_PA = null}
                                      else {dp_PA = displacement(event2.pos, event1.pos)}; 
                                     dt_PA = (event2.time - event1.time);
                                     document.getElementById("deltat1").focus(); buffer = document.querySelector("#deltafx > #deltat1").value;
                                     if (buffer == 0) { dt_QA = null; } else { dt_QA = Number(buffer) };
                                     dp_QA = null;
                                     mass1 = masses[checked[1]];
                                     mass2 = masses[checked[0]];
                                     colinear_veloA = coaxial_velocity(relvelo, event2.pos, event1.pos); 
                                     colinear_disA = coaxial_displacement(relvelo, event2.pos, event1.pos); }
    if (solvefx.value == "deltax")  { if (event2.x == null || event1.x == null) {dp_QA = null}
                                      else {dp_QA = displacement(event2.pos, event1.pos)};  
                                     dt_QA = (event2.time - event1.time);
                                     dp_PA = null;
                                     document.getElementById("deltat").focus(); buffer = document.querySelector("#deltafx > #deltat").value;
                                     if (buffer == 0) { dt_PA = null; } else { dt_PA = Number(buffer) };
                                     mass1 = masses[checked[0]];
                                     mass2 = masses[checked[1]];
                                     colinear_veloA = coaxial_velocity(relvelo, event2.pos, event1.pos); 
                                     colinear_disA = coaxial_displacement(relvelo, event2.pos, event1.pos); }; 
}

sol_var();

if (colinear_veloA == null) { colinear_veloA.total = relvelo.total; }
let r = displacement(positions[checked[1]], positions[checked[0]]);

input = { dt_P: dt_PA, 
    dt_Q: dt_QA, 
    dp_P: dp_PA,
    dp_Q: dp_QA,
    colinear_velo: colinear_veloA, 
    colinear_dis: colinear_disA,
    mass1: mass1,
    mass2: mass2, 
    dist: r };

console.log("from input js: input", input);

result = simselect(masses, velocities, positions, checked, input, "calc"); console.log(result);

if (input.dp_Q == null && solvefx.value == "deltat1") { result.case1(); result.case3();}
if (input.dp_P == null && solvefx.value == "deltat") { result.case2(); result.case4();}

if (input.dp_Q == null && input.dp_P == null && solvefx.value == "deltax") { result.case5(); }
if (input.dp_Q == null && input.dp_P == null && solvefx.value == "deltax1") { result.case6();}

if (input.dp_Q == null && (input.dp_P.total == 0 || input.dp_P.total >= 1)) { result.case1(); result.case3(); }
if (input.dp_P == null && (input.dp_Q.total == 0 || input.dp_Q.total >= 1)) { result.case2(); result.case4(); } 

result.en();

let dt = document.querySelector("#deltafx > #deltat");   dt.setAttribute('value', result.content.dt_P);
let dt1 = document.querySelector("#deltafx > #deltat1"); dt1.setAttribute('value', result.content.dt_Q);
let dx = document.querySelector("#deltafx > #deltax");   dx.setAttribute('value', result.content.dp_P);
let dx1 = document.querySelector("#deltafx > #deltax1"); dx1.setAttribute('value', result.content.dp_Q);
let e1 = document.querySelector("#deltafx > #energy");   e1.setAttribute('value', result.content.energy1);
let e2 = document.querySelector("#deltafx > #energy1");  e2.setAttribute('value', result.content.energy2);


console.log("ins outs recognised");
    }
//runbutton.onclick(() => module.exports = {result: result});}})(window, document, undefined)

module.exports = inputs;

/***/ }),
/* 4 */
/***/ ((module) => {

//coaxial velocity - xyz, total
//coaxial displacement - xyz, total
//total velocity
//total displacement

function radians_degrees (input, path) {
    const pi = Math.PI;
    if (path == 0) {return input * (pi/180);} //degrees to radians
    else {return input * (180/pi) }} //radians to degrees

function axial_velocity(velo) {
    let veloX = velo[0] * Math.cos(radians_degrees(velo[1], 0));
    let veloY = velo[0] * Math.sin(radians_degrees(velo[1], 0)) * Math.sin(radians_degrees(velo[2], 0));
    let veloZ = velo[0] * Math.sin(radians_degrees(velo[1], 0)) * Math.cos(radians_degrees(velo[2], 0));
    console.log("done, from first call");
    return {x : veloX, y : veloY, z : veloZ};
}

function displacement(term2, term1) {
    if (!term1) { term1 = [0, 0, 0]; }
    let dis = {};
    dis.x = term2[0] - term1[0];
    dis.y = term2[1] - term1[1];
    dis.z = term2[2] - term1[2];
    dis.total = Math.sqrt((dis.x)**2 + (dis.y)**2 + (dis.z)**2);
    return dis;
}

function coaxial_displacement(relvelo, pos2, pos1) {
    if (pos1[0] == null && pos2[0] == null) { console.log("null condition"); return null }
    else {
    let coaxial_dis = {};
    let dis = displacement(pos2, pos1)
    coefs = coaxial_velocity(relvelo, pos2, pos1).coefs;
    coaxial_dis.x = coefs[0] * dis.x;
    coaxial_dis.y = coefs[1] * dis.y;
    coaxial_dis.z = coefs[2] * dis.z;
    coaxial_dis.total = Math.sqrt((coaxial_dis.x)**2 + (coaxial_dis.y)**2 + (coaxial_dis.z)**2);
    return coaxial_dis }
}

function coaxial_velocity(relvelo, pos2, pos1) {
    coaxial_velo = {};
    let coefx; let coefy; let coefz; let ratio1; let ratio2;
    dis = displacement(pos2, pos1);
    if (pos2[0] == null && pos1[0] == null) { console.log("null condition"); return null }

    else { //conditional alg to prevent NaN

           if (dis.x == 0) { coaxial_velo.x = 0; coefx = 0 } 
           else { //block1
                 if ((relvelo.x/relvelo.y) <= 1) { //block 1.1
                    if ((dis.x/dis.y) <= (relvelo.x/relvelo.y)) { coefx = (dis.x/dis.y)/(relvelo.x/relvelo.y) }
                    else {coefx = (dis.x/dis.y)/Math.tan(Math.atan(relvelo.x/relvelo.y) - Math.atan(dis.x/dis.y)) };
                    }
                 else { //block 1.2
                    if ((dis.x/dis.y) <= (relvelo.x/relvelo.y)) { coefx = (dis.x/dis.y) / Math.tan(90 - Math.atan(relvelo.x/relvelo.y) - Math.atan(dis.x/dis.y))}
                    else { coefx = (dis.x/dis.y)/(relvelo.x/relvelo.y) };
                 }}
    
           if (dis.y == 0) { coaxial_velo.y = 0; coefy = 0 } 
           else { //block 2
                 ratio1 = (relvelo.y/relvelo.x) * (relvelo.y/relvelo.z);
                 ratio2 = (dis.y/dis.x) * (dis.y/dis.z); 

                 if (ratio1 >= 1) { //block 2.1
                    if (ratio2 >= ratio1) { coefy = ratio2/ratio1 }
                    else { coefy = ratio2 / Math.tan(Math.atan(ratio2) - Math.atan(ratio1)) }; 
                   }
                 else { //block 2.2
                    if (ratio2 >= ratio1) { coefy = ratio2/Math.tan(90 - Math.atan(ratio2) - Math.atan(ratio1)) }
                    else { coefy = ratio2/ratio1 };
                 }}
    
            if (dis.z == 0) { coaxial_velo.z = 0; coefz = 0 }
            else {//block 3
                 ratio1 = (relvelo.z/relvelo.y) * (relvelo.z/relvelo.x);
                 ratio2 = (dis.z/dis.y) * (dis.z/dis.x);
                 if (ratio1 <= 1) { //block 3.1
                    if (ratio2 <= ratio1) { coefz = ratio2/ratio1 }
                    else { coefz = ratio1 / Math.tan(Math.atan(ratio2) - Math.atan(ratio1)) }; 
                  }
                 else { //block 3.2
                   if (ratio2 <= ratio1) { coefz = ratio2 / Math.tan(90 - Math.atan(ratio2) - Math.atan(ratio1)) }
                   else { coefz = ratio2 / ratio1 };
              }}
            }
    coaxial_velo.x = relvelo.x * coefx;
    coaxial_velo.y = relvelo.y * coefy;
    coaxial_velo.z = relvelo.z * coefz;
    coaxial_velo.total = Math.sqrt((coaxial_velo.x)**2 + (coaxial_velo.y)**2 + (coaxial_velo.z)**2);
    coaxial_velo.coefs = [coefx, coefy, coefz];
    console.log('from velocity codes', coaxial_velo);
    return coaxial_velo; }

module.exports = {coaxial_velocity: coaxial_velocity,
                  displacement: displacement,
                  coaxial_displacement: coaxial_displacement,
                  axial_velocity: axial_velocity, 
                  radians_degrees: radians_degrees };


/***/ }),
/* 5 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// units - velocity as percent of c, distance as 200 = 1 AU
const GR = __webpack_require__(6); const SR = __webpack_require__(7); //const NM = require("./NM_Functions3");
let imp = __webpack_require__(4); const velos = imp.axial_velocity; const dis = imp.displacement;
const custom = __webpack_require__(8);

/* param */ let masses; let positions; let velocities; let checked; let input; 

function simselect (masses, velocities, positions, checked, input, type) {

let eq_input = new String;
let M = (masses[checked[1]] >= 0.05) || (masses[checked[0]] >= 0.05);
let V = dis([velos(velocities[checked[1]]).x, velos(velocities[checked[1]]).y, velos(velocities[checked[1]]).z], 
            [velos(velocities[checked[0]]).x, velos(velocities[checked[0]]).y, velos(velocities[checked[1]]).z]) >= 0.1;
let P = dis(positions[checked[1]], positions[checked[0]]).total >= 20;

const mode = document.getElementById("autouser"); const simselect = document.getElementsByName("simselect"); let equation;
simselect.forEach(function(op) { if (op.checked) { equation = op.id }});

if (!mode.checked) { //auto select condition
    equation = null;
    if (M || P) { equation = "sim-gen" };
    if (V && !equation=="sim-gen") { equation = "sim-spl" };
    if (!equation) { equation = "sim-new"};        
    document.getElementById(equation).checked = true
}

if (type == "calc") {
    if (equation == "sim-gen") { return GR(input) }; 
    if (equation == "sim-spl") { return SR(input) };
    //  if (equation == "SIMNEW") { return NM(input) }; 

    //document.getElementById("sinfo").textContent;


}

if (type == "graphics") {
    let graphics = {BG: null, arrow: true, augment: true, ST: false, simmsg: new String};
    if (equation == "sim-gen" || equation == "sim-spl") { graphics.BG = "black" };
    if (equation == "sim-gen") { graphics.augment = false; graphics.arrow = true; graphics.ST = true };
    if (equation == "sim-gen") { graphics.simmsg = "                 "};
    if (equation == "sim-spl") { graphics.simmsg = "                 "};
    if (equation == "sim-new") { graphics.simmsg = "                 "};
    return graphics;
}

}
module.exports = simselect;


/***/ }),
/* 6 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

let velos = __webpack_require__(4);
const c = 1;
const G = 0.022322; //inaccuracy = ~9.5

function equations (input) {
    
    this.content = {};
    this.content = input;

    dt_P = this.content.dt_P;
    dt_Q = this.content.dt_Q;
    dp_P = this.content.dp_P;
    dp_Q = this.content.dp_Q;
    mass1 = this.content.mass1;
    mass2 = this.content.mass2;
    distance = this.content.distance;

    this.case1 = function case1() { // heavier object frame Q
        term1 = Math.sqrt(1 - (2 * G * mass2)/(dist.total * c**2));
        this.content.dt_Q = (dt_P * (mass2/mass1) / term1); };
        // this.content.dt_Q = dt_P * term1;
    
   this.case2 = function case2() { // lighter object frame P
        term1 = Math.sqrt(1 - (2 * G * mass1)/(dist.total * c**2));
        this.content.dt_P = dt_Q * (mass1/mass2) / term1; }
    
    this.case3 = function case3() {
        term1 = Math.sqrt(1 - (2 * G * mass1)/(dist.total * c**2));
        term2 = (mass2/mas1) / term1;
        term3 = dp_P.x * term2; term4 = dp_P.y * term2; term5 = dp_P.z * term2;
        this.content.dp_Q = velos.displacement(term3, term4, terms5).total;
        this.content.dp_P = dp_P.total }

    this.case4 = function case4() {
        term1 = Math.sqrt(1 - (2 * G * mass2)/(dist.total * c**2));
        term2 = (mass1/mass2) * term1; 
        term3 = dp_Q.x * term2; term4 = dp_Q.y; term5 = dp_Q.z * term2;
        this.content.dp_P = velos.displacement(term3, term4, term5).total;
        this.content.dp_Q = dp_Q.total }

    this.en = function case5() {
        this.content.energy1 = mass1 * c**2;
        this.content.energy1 = mass2 * c**2; }
    
    return this;
}
module.exports = equations; 

/***/ }),
/* 7 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

 //arguments/parameters: velocity vector, event positions, object positions
/*functions list:
- converting between axes
- event plotter
- alerting when values are beyond bounds, done
- element checkboxes, done
- equation element checkbox, done
- all calculations, done
- 
- equation element highlighter */

const c = 1;
let velos = __webpack_require__(4);
const coaxial_displacement = velos.coaxial_displacement;
const coaxial_velocity = velos.coaxial_velocity;
const displacement = velos.displacement;

function equations (input) {

    this.content = {};    
    this.content = input; 

    dt_P = this.content.dt_P;
    dt_Q = this.content.dt_Q;
    dp_P = this.content.dp_P;
    dp_Q = this.content.dp_Q;
    mass1 = this.content.mass1;
    mass2 = this.content.mass2;
    colinear_dis = this.content.colinear_dis;
    colinear_velo = this.content.colinear_velo;
    
    velo_sum = ((colinear_velo.x**2) + (colinear_velo.y**2) + (colinear_velo.z**2));
    const LzF = (1/Math.sqrt(1 - (velo_sum/c**2))); //check whether Lorentz factor is directional
         
    this.case1 = function case1() { //delta T in frame Q
        //basic form of Lorentz transformation
        term1 = (colinear_velo.x * colinear_dis.x);
        term2 = (colinear_velo.y * colinear_dis.y);
        term3 = (colinear_velo.z * colinear_dis.z);
        term4 = (dt_P + (-term1 - term2 - term3)/c**2);
        this.content.dt_Q = term4 * LzF; };

    this.case2 = function case2() { //delta T in frame P
        term1 = (colinear_velo.x * colinear_dis.x);
        term2 = (colinear_velo.y * colinear_dis.y);
        term3 = (colinear_velo.z * colinear_dis.z);
        term4 = (dt_Q + (term1 + term2 + term3));
        this.content.dt_P = term4 * LzF; }
    
    this.case3 = function case3() {  //displacement in frame Q
        term1 = (dp_P.x - (colinear_velo.x * dt_P));
        term2 = (dp_P.y - (colinear_velo.y * dt_P));
        term3 = (dp_P.z - (colinear_velo.z * dt_P));
        term4 = [(term1 * LzF), (term2 * LzF), (term3 * LzF)];
        this.content.dp_Q = displacement(term4).total;
        this.content.dp_P = dp_P.total; };

    this.case4 = function case4() { //displacement in frame p
        term1 = (dp_Q.x - (colinear_velo.x * dt_Q));
        term2 = (dp_Q.y - (colinear_velo.y * dt_Q));
        term3 = (dp_Q.z - (colinear_velo.z * dt_Q));
        term4 = [(term1 * LzF), (term2 * LzF), (term3 * LzF)];
        this.content.dp_P = displacement(term4).total;
        this.content.dp_Q = dp_Q.total; };
    
    this.case6 = function case6() { //delta x' without delta x - assuming 100% coaxial velo
        term1 = ( LzF * - dt_P);
        term2 = (c**2/LzF * -(colinear_velo.total));
        this.content.dp_P = term2 * (dt_Q + term1); };
    
    this.case5 = function case5() { //delta x without delta x' - assuming 100% coaxial velo
        term1 = ( LzF * - dt_Q);
        term2 = (c**2/LzF * (colinear_velo.total));
        this.content.dp_P = term2 * (dt_Q + term1); };
        
    this.en = function () {
        this.content.energy1 = (mass1 * LzF * (c**2));
        this.content.energy2 = (mass2 * LzF * (c**2)); }    

    return this;
}

module.exports = equations;

/***/ }),
/* 8 */
/***/ ((module) => {


  //progress bar
  function progressbar(factor,denom) {
    var elem = document.getElementById("simBar");
    var width = Math.round((factor/denom)*100,0);
    if (width >= 100) {
      elem.style.width = '100%';
    } else {
      elem.style.width = width + '%';
    }
  }
  
  //timer
  class simTimer {
    constructor () {
      this.isRunning = false;
      this.startTime = 0;
      this.overallTime = 0;
    }
  
    _getTimeElapsedSinceLastStart () {
      if (!this.startTime) {
        return 0;
      }
    
      return Date.now() - this.startTime;
    }
  
    simtimestart () {
      if (this.isRunning) {
        return console.error('Timer is already running');
      }
  
      this.isRunning = true;
  
      this.startTime = Date.now();
    }
  
    simtimestop () {
      if (!this.isRunning) {
        return console.error('Timer is already stopped');
      }
  
      this.isRunning = false;
  
      this.overallTime = this.overallTime + this._getTimeElapsedSinceLastStart();
    }
  
    simtimereset () {
      this.overallTime = 0;
  
      if (this.isRunning) {
        this.startTime = Date.now();
        return;
      }
  
      this.startTime = 0;
    }
  
    getsimtime () {
      if (!this.startTime) {
        return 0;
      }
  
      if (this.isRunning) {
        return this.overallTime + this._getTimeElapsedSinceLastStart();
      }
  
      return this.overallTime;
    }
  
    setsimtime (timelim) {
      let tl = ""; let ts ="";
      let timeInSeconds = Math.round(this.getsimtime() / 1000);
      if (timelim>9) { tl = "0:"+timelim; } else { tl = "0:0"+timelim; }
      if (timeInSeconds>timelim) { timeInSeconds=timelim; }
      if (timeInSeconds>9) { ts = "0:"+timeInSeconds; } else { ts = "0:0"+timeInSeconds; }
      document.getElementById('simtimeinfo').innerText = ts+"/"+tl;
      progressbar(timeInSeconds,timelim);
    }
  
    /*setInterval(() => {
      const timeInSeconds = Math.round(timer.getTime() / 1000);
      document.getElementById('time').innerText = timeInSeconds;
    }, 100)*/
  }
  const simtimer = new simTimer();
  
  // alert
  function CustomAlert(){
      this.alert = function(message,title,type){
        //document.body.innerHTML = document.body.innerHTML + '<div id="dialogoverlay"></div><div id="dialogbox" class="slit-in-vertical"><div><div id="dialogboxhead"></div><div id="dialogboxbody"></div><div id="dialogboxfoot"></div></div></div>';
    
        let dialogoverlay = document.getElementById('dialogoverlay');
        let dialogbox = document.getElementById('dialogbox');
        
        let winH = window.innerHeight;
        dialogoverlay.style.height = winH+"px";
        
        dialogbox.style.top = "100px";
    
        dialogoverlay.style.display = "block";
        dialogbox.style.display = "block";
           
        if(typeof title !== 'undefined') 
        /*{  
          document.getElementById('dialogboxhead').style.display = 'none';
        } else*/ {
          document.getElementById('dialogboxhead').style.display = 'block';
          if (type === 'info') {
            document.getElementById('dialogboxhead').innerHTML = '<i class="fa fa-info-circle" aria-hidden="true"></i> '+ title;
            document.getElementById('dialogboxfoot').innerHTML = '<button class="pure-material-button-contained active" id="okbtn">Close</button>';
          } else {
            document.getElementById('dialogboxhead').innerHTML = '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> '+ title;
            document.getElementById('dialogboxfoot').innerHTML = '<button class="pure-material-button-contained active" id="okbtn">OK</button>';  
          }
        }
        document.getElementById('dialogboxbody').innerHTML = message;
        
      };
      
      this.ok = function(){
        document.getElementById('dialogbox').style.display = "none";
        document.getElementById('dialogoverlay').style.display = "none";
      };
    }
    const newalert = new CustomAlert();
  
    
    
    //let customAlert = new CustomAlert();
  
  module.exports = {progressbar: progressbar, CustomAlert: CustomAlert, newalert: newalert, simtimer: simtimer, simTimer: simTimer};

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(3);
/******/ 	
/******/ })()
;