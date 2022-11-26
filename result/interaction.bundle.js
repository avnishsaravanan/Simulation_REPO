/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */,
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

(function(window, document, undefined){
  // to wait until all elements are loaded
  /*let arrsimobjects = [
    {"objname":"Sphere1", "objsize":5, "objmass":30, "objcolor":"#535353", "objposx":30, "objposy":30, "objposz":30, "speed":0.3, "xyangle":30, "yzangle":45},
    {"objname":"Sphere2", "objsize":8, "objmass":50, "objcolor":"#535353", "objposx":50, "objposy":50, "objposz":50, "speed":0.5, "xyangle":50, "yzangle":80} ];*/

  let inputs = __webpack_require__(3);
  let arrsimobjects = [
    {0:"Sphere1", 1:5, 2:30.01, 3:"#535353", 4:30, 5:30, 6:30, 7:0.001, 8:30, 9:45},
    {0:"Sphere2", 1:8, 2:50.01, 3:"#353535", 4:50, 5:50, 6:50, 7:0.001, 8:50, 9:80} ];
    /*{0:"Sphere3", 1:5, 2:30.01, 3:"#535353", 4:30, 5:30, 6:30, 7:0.001, 8:30, 9:45},
    {0:"Sphere4", 1:8, 2:50.01, 3:"#353535", 4:50, 5:50, 6:50, 7:0.001, 8:50, 9:80},
    {0:"Sphere5", 1:5, 2:30.01, 3:"#535353", 4:30, 5:30, 6:30, 7:0.001, 8:30, 9:45},
    {0:"Sphere6", 1:8, 2:50.01, 3:"#353535", 4:50, 5:50, 6:50, 7:0.001, 8:50, 9:80},
    {0:"Sphere7", 1:5, 2:30.01, 3:"#535353", 4:30, 5:30, 6:30, 7:0.001, 8:30, 9:45},
    {0:"Sphere8", 1:8, 2:50.01, 3:"#353535", 4:50, 5:50, 6:50, 7:0.001, 8:50, 9:80},
    {0:"Sphere9", 1:5, 2:30.01, 3:"#535353", 4:30, 5:30, 6:30, 7:0.001, 8:30, 9:45} ];*/
  let velocities = [[0.5, 45, 45], [0.8, 45, 45]];
  let positions = [[30, 30, 30], [50, 50, 50]];
  let masses = [30, 50];
  let checks = ['obj1','obj2']; //,'obj3','obj4','obj5','obj6','obj7','obj8','obj9'];  
    
  window.onload = init;
  function init(){
    let simulmode = "auto"; //can be a  global variable ?
    const simmode = document.getElementById('autouser');
    const simselect = document.querySelectorAll('#relati input');
    const addelement =  document.getElementById('addbtn');
    const objectslist = document.getElementsByName('simobject');
    //var arrsimobject = {0:"Spherex", 1:5, 2:30.01, 3:"#535353", 4:30, 5:30, 6:30, 7:0.001, 8:30, 9:45};
    let trigger = 'self';
                
    // initialize auto/user toggle interactions 
    simmode.onclick = function () {
      if (this.checked) {
        simulmode = "user";
      } else {
      simulmode = "auto";
      }
    };

    // initialize radiobutton interactions 
    for(var i = 0, max = simselect.length; i < max; i++) {
      simselect[i].onclick = function() {
        // change toggle to user
        if (!simmode.checked) {
          simulateClick(simmode);  
        } 
      };
    }

    // initialize addelement interactions 
    addelement.onclick = function () {
      this.disabled=true;
      trigger = 'addel';
      //uncheck object list
      objectslist.forEach(function(obj) {
        if(obj.id == checks[0] || obj.id == checks[1]){
          //if (elem.checked == true) {
          simulateClick(obj);
        }
      });
      //document.getElementById('simbtn').disabled = true;
      // enable parameters
      processparam(false, 100);
      trigger = 'self';
      //inputs(masses, velocities); 
    };

    // initialize saveparameters interactions
    let formElem = document.getElementById('editParameters');
    formElem.addEventListener("submit", formSubmitHandler);
    function formSubmitHandler(event) {
      event.preventDefault();
      if (checks.length == 1) {
        saveparameters("up");
      } else {
        saveparameters("add");
      }
    }

    function saveparameters(addup){
      x=0;
      var arrsimobject = {};
      //{0:"Spherex", 1:5, 2:30.01, 3:"#535353", 4:30, 5:30, 6:30, 7:0.001, 8:30, 9:45};
      document.getElementsByName('objparams').forEach(function(elem){
        if (elem.id == 'objname' || elem.id == 'objcolor') {
          arrsimobject[x] = elem.value;
        } else {
          arrsimobject[x] = Number(elem.value); 
        }
        x+=1;
      });
      if (addup == "add") {
        arrsimobjects.push(arrsimobject);
        //doubt
        velocities.push([arrsimobject[7], 
                        arrsimobject[8], 
                        arrsimobject[9]]);
        positions.push([arrsimobject[4],
                       arrsimobject[5],
                       arrsimobject[6]]);
        masses.push(arrsimobject[2]);
                      
        module.exports = {arrsimobjects: arrsimobjects,
                          velocities: velocities,
                          positions: positions,
                          masses: masses };
            
        refreshobjlist(arrsimobjects.length);
        objectslist.forEach(function(elem) {
          if (elem.id == ("obj"+arrsimobjects.length)) {
            simulateClick(elem);
          }
        });
      } else {
        // update arrims
        arrsimobjects[(upobj() - 1)] = arrsimobject;
        document.getElementById("objlabel"+(upobj())).childNodes[0].textContent = arrsimobject[0];
        alert('saved'); // beautify
      }
    }

    // initialize checkbox interactions
    objectslist.forEach(elem => elem.onclick = function () {
      // find how many checked and action accordingly
      //  none , one , two , attempt  third
      if (this.checked == true) {
        checks.push(this.id);
        if (checks.length == 2 ) {
          objectslist.forEach(function (elemnt) {
            if (elemnt.id != checks[0] && elemnt.id != checks[1]) {
              elemnt.checked = false;
              elemnt.disabled = true;
            }
          });
          processparam(true, 100);
          document.getElementById('simbtn').disabled = false;
        } else {
          processparam(false, upobj());
        } 
      } else {
        if (checks[0] == this.id) {
          del = checks.shift();
        } else {
          del = checks.pop();
        }
        if (checks.length == 1) {
          for (let index = 1; index <= 10; index++) {
            para = document.getElementById('line'+index);
            if (!para.hidden) {
              document.getElementById('obj'+index).disabled = false;
            } else {break;}
          }
          // populate params
          if (trigger == 'self') {
            processparam(false, upobj());
          }    
        } else {
          // null params
          processparam(true, 100);
        }
        document.getElementById('simbtn').disabled = true;
      } 
      addbtnchk();
    });
    // if params not saved - no alert for now 


    function refreshobjlist(num) {
      document.getElementById("objlabel"+num).childNodes[0].textContent = arrsimobjects[num-1][0]; //newtxt;
      document.getElementById("obj"+num).checked = true;
      document.getElementById("obj"+num).disabled = false;
      document.getElementById("line"+num).hidden = false;          
      simulateClick(document.getElementById("objlabel"+num)); //checkmark
    } 

    // initialize solvefor interactions
    // on change of selection highlight respective field 

    // initialize run simulation interactions 
    simrun = document.getElementById('simbtn');
    simrun.onclick = function() {
      inputs(masses, velocities);
      //addScript('renderCanvas','./render1.bundle.js');      
    };

    //functions
    function processparam(state, num) {
      document.getElementById("editParameters").reset();
      col=0;
      document.querySelectorAll('#editParameters input, #editParameters select, #editParameters button, #editParameters textarea').forEach(function(elem) {
        elem.disabled = state;
        if (num != 100 && col < 10) {
          elem.value = arrsimobjects[num-1][col];
          col++;
        }          
      });
      if (!state) {
        document.getElementById('objname').focus();
      }
    }

    function addbtnchk(){
      if (arrsimobjects.length < 10) {
        addelement.disabled = false;
      }
    }

  } //init ends

  //common functions
  function upobj() {
    num = Number(checks[0].match(/\d+/));
    return num;
  }

  function addScript (xtag,src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.setAttribute('src', src);
      s.addEventListener('load', resolve);
      s.addEventListener('error', reject); 
      document.getElementById(xtag).appendChild(s);
    });
  }

  // click any element 
  function simulateClick(elem) {
    var evt = new MouseEvent('click');
    var canceled = !elem.dispatchEvent(evt);
    if(canceled) {
      // A handler called preventDefault
      alert("click event canceled");
    } else {
      // None of the handlers called preventDefault
      //alert("not canceled");
    }
  }

  module.exports = {  arrsimobjects: arrsimobjects,
                      velocities: velocities,
                      positions: positions, 
                      masses: masses };

      /* for reference later 
      function preventDef(event) {
        event.preventDefault();
      }
          
      function addHandler() {
        document.getElementById("checkbox").addEventListener("click", 
        preventDef, false);
      }
          
      function removeHandler() {
        document.getElementById("checkbox").removeEventListener("click",
        preventDef, false);
      }

      */
})(window, document, undefined);

/***/ }),
/* 3 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

//detail queryselectors if necessary
//imports - 
let equations = __webpack_require__(4);
let velos = __webpack_require__(5);
    coaxial_velocity = velos.coaxial_velocity;
    displacement = velos.displacement;
    coaxial_displacement = velos.coaxial_displacement;
    axial_velocity = velos.axial_velocity;

function inputs (masses, velo) {
//    let interaction = require("./interaction.js");
    //let masses = interaction.masses;
    //let positions = interaction.positions;
    let velocities = [];
    let result;
    
    let process = velo.map(elem => { return axial_velocity(elem); });
    process.forEach(function(n) { velocities.push(n); });
    console.log('from inputs js: velocities', velocities);
    // to wait until all elements are loaded

let checked = [0, 1];
let dt_PA;
let dt_QA;
let dp_PA;
let dp_QA;
let event1 = {};
let event2 = {};
colinear_velo = {x: 1, y: 1, z: 1};

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
    if (solvefx.value == "deltax1") { if (event2.pos == null || event1.pos == null) {dp_PA = null}
                                      else {dp_PA = displacement(event2.pos, event1.pos)}; 
                                     dt_PA = (event2.time - event1.time);
                                     dt_QA = Number(document.querySelector("#deltafx > #deltat1").value);
                                     dp_QA = null;
                                     mass1 = masses[checked[1]];
                                     mass2 = masses[checked[0]];
                                     colinear_veloA = coaxial_velocity(relvelo, event2.pos, event1.pos); 
                                     colinear_disA = coaxial_displacement(relvelo, event2.pos, event1.pos); }
    if (solvefx.value == "deltax")  { if (event2.pos == null || event1.pos == null) {dp_QA = null}
                                      else {dp_QA = displacement(event2.pos, event1.pos)};  
                                     dt_QA = (event2.time - event1.time);
                                     dp_PA = null;
                                     dt_PA = Number(document.querySelector("#deltafx > #deltat").value);
                                     mass1 = masses[checked[0]];
                                     mass2 = masses[checked[1]];
                                     colinear_veloA = coaxial_velocity(relvelo, event2.pos, event1.pos); 
                                     colinear_disA = coaxial_displacement(relvelo, event2.pos, event1.pos); }; 
}

sol_var();

input = { dt_P: dt_PA, 
    dt_Q: dt_QA, 
    dp_P: dp_PA,
    dp_Q: dp_QA,
    colinear_velo: colinear_veloA, 
    colinear_dis: colinear_disA,
    mass1: mass1,
    mass2: mass2 };

if (input.colinear_velo == null) { colinear_veloA.total = relvelo.total; }

console.log("from input js: input", input);
result = new equations(input);

if (input.dt_Q == null) { result.case1(); result.case3();}
if (input.dp_Q == null) { result.case2(); result.case4();}

if (input.dp_Q == null && input.dp_P == null && solvefx.value == "deltax") { result.case5(); }
if (input.dp_Q == null && input.dp_P == null && solvefx.value == "deltax1") { result.case6();}

if (input.dp_Q == null && (input.dp_P == 0 || input.dp_P >= 1)) { result.case1(); result.case3(); }
if (input.dp_P == null && (input.dp_Q == 0 || input.dp_Q >= 1)) { result.case2(); result.case4(); }     
 
result.case7();
result.case8();

let dt = document.querySelector("#deltafx > #deltat");
let dt1 = document.querySelector("#deltafx > #deltat1");
let dx = document.querySelector("#deltafx > #deltax");
let dx1 = document.querySelector("#deltafx > #deltax1");
let e1 = document.querySelector("#deltafx > #energy");
let e2 = document.querySelector("#deltafx > #energy1");

dt.setAttribute('value', result.content.dt_P);
dt1.setAttribute('value', result.content.dt_Q);
dx.setAttribute('value', result.content.dp_P);
dx1.setAttribute('value', result.content.dp_Q);
e1.setAttribute('value', result.content.energy1);
e2.setAttribute('value', result.content.energy2);

console.log("ins outs recognised");
    }
//runbutton.onclick(() => module.exports = {result: result});}})(window, document, undefined)

module.exports = inputs;

/***/ }),
/* 4 */
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
let velos = __webpack_require__(5);
coaxial_displacement = velos.coaxial_displacement;
coaxial_velocity = velos.coaxial_velocity;
displacement = velos.displacement;

function equations (input) {

    this.content = {};    
    this.content = input; 
    console.log("from sr functions,", this.content);

    dt_P = this.content.dt_P;
    dt_Q = this.content.dt_Q;
    console.log(this.content.dt_Q);
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
        //account for asynchronised separation later
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
        this.content.dt_P = term4 * LzF; };
    
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
    
    this.case7 = function case7() {
        this.content.energy1 = (mass1 * LzF * (c**2)); };
    
    this.case8 = function case8() {
        this.content.energy2 = (mass2 * LzF * (c**2)); };

    return this;
}

module.exports = equations;

/***/ }),
/* 5 */
/***/ ((module) => {

//coaxial velocity - xyz, total
//coaxial displacement - xyz, total
//total velocity
//total displacement

function radians_degrees (input, path) {
    const pi = Math.PI;
    if (path == 0) {
        return input * (180/pi);}
    else {
        return pi * input/180; }}

function axial_velocity(velo) {
    let veloX = velo[0] * Math.cos(radians_degrees(velo[1]));
    let veloY = velo[0] * Math.sin(radians_degrees(velo[1])) * Math.sin(radians_degrees(velo[2]));
    let veloZ = velo[0] * Math.sin(radians_degrees(velo[1])) * Math.cos(radians_degrees(velo[2]));
    console.log("done, from first call");
    return {x : veloX, y : veloY, z : veloZ};
}

function displacement(term2, term1) {
    if (!term1) { term1 = [0, 0, 0]; }
    dis = {};
    dis.x = term2[0] - term1[0];
    dis.y = term2[1] - term1[1];
    dis.z = term2[2] - term1[2];
    dis.total = Math.sqrt((dis.x)**2 + (dis.y)**2 + (dis.z)**2);
    return dis;
}

function coaxial_displacement(relvelo, pos2, pos1) {
    if (pos1[0] == null && pos2[0] == null) { return null }
    else {
    coaxial_dis = {};
    dis = displacement(pos2, pos1)
    coefs = coaxial_velocity(relvelo, pos2, pos1);
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
    if (pos2[0] == null && pos1[0] == null) { return null }

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
                  axial_velocity: axial_velocity };


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
/******/ 	var __webpack_exports__ = __webpack_require__(2);
/******/ 	
/******/ })()
;