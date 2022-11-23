/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

//# sourceMappingURL=babylon.js.map

/***/ }),
/* 2 */
/***/ ((module) => {

(function(window, document, undefined){
    // to wait until all elements are loaded

    /*let arrsimobjects = [
      {"objname":"Sphere1", "objsize":5, "objmass":30, "objcolor":"#535353", "objposx":30, "objposy":30, "objposz":30, "speed":0.3, "xyangle":30, "yzangle":45},
      {"objname":"Sphere2", "objsize":8, "objmass":50, "objcolor":"#535353", "objposx":50, "objposy":50, "objposz":50, "speed":0.5, "xyangle":50, "yzangle":80}
    ];*/
    let arrsimobjects = [
      {0:"Sphere1", 1:5, 2:30, 3:"#535353", 4:30, 5:30, 6:30, 7:0.8, 8:30, 9:45},
      {0:"Sphere2", 1:8, 2:50, 3:"#535353", 4:50, 5:50, 6:50, 7:0.5, 8:50, 9:80}
    ];
    let velocities = [[0.8, 30, 45], [0.5, 50, 80]];
    let positions = [[30, 30, 30], [50, 50, 50]];
    let masses = [30, 50]
    window.onload = init;
      function init(){
        
        let simulmode = "auto"; //can be a  global variable ?
        let checkclear = false;
        const simmode = document.getElementById('autouser');
        const simselect = document.querySelectorAll('#relati input');
        const addelement =  document.getElementById('addbtn');
        const objectslist = document.getElementsByName('simobject');
        let arrsimobject = 
          {0:"Sphere3", 1:5, 2:30, 3:"#535353", 4:30, 5:30, 6:30, 7:0.3, 8:30, 9:45};
                
        // initialize auto/user toggle interactions 
        simmode.onclick = function () {
          if (this.checked) {
            simulmode = "user";
          } else {
            simulmode = "auto";
          }
                // next steps 
                // stop sim if running 
                // verify parameters for fitment for selected relativity option ?          
        };

        // initialize radiobutton interactions 
        for(var i = 0, max = simselect.length; i < max; i++) {
            simselect[i].onclick = function() {
                // change toggle to user
                if (!simmode.checked) {
                    simulateClick(simmode);  
                } 
                // next steps 
                // stop sim if running 
                // verify parameters for fitment for selected relativity option ?
            };
        }

        // initialize addelement interactions 
        addelement.onclick = function () {
          this.disabled=true;
          //clear object list
          checkclear=true;
          objectslist.forEach(function(elem) {
            if (elem.checked == true) {
              simulateClick(elem);
            }
          });
          document.getElementById('simbtn').disabled = true;
          // enable parameters
          document.querySelectorAll('#editParameters input, #editParameters select, #editParameters button, #editParameters textarea').forEach(elem => elem.disabled = false);
          document.getElementById("editParameters").reset();
          document.getElementById('objname').focus();
        };

        // initialize saveparameters interactions
        // create new object 
        // update object 
        let formElem = document.getElementById('editParameters');
        formElem.addEventListener("submit", formSubmitHandler);
        function formSubmitHandler(event) {
          event.preventDefault();
          if (checkclear === false) {
            saveparameters("up");
          } else {
            saveparameters("add");
          }
        }

        function saveparameters(addup){
          x=0;
          document.getElementsByName('objparams').forEach(function(elem){
            arrsimobject[x] = elem.value;
            x+=1;
          });
          if (addup === "add") {
            arrsimobjects.push(arrsimobject);
            velocities.push([arrsimobject[7], 
                             arrsimobject[8], 
                             arrsimobject[9]])
            positions.push([arrsimobject[4],
                            arrsimobject[5],
                            arrsimobject[6]])
            masses.push(arrsimobject[2]);
                      
            module.exports = {arrsimobjects: arrsimobjects,
                              velocities: velocities,
                              positions: positions };
            
            //document.querySelectorAll('#editParameters input[text], #editParameters input[number]').forEach(elem => elem.value === null);
            //document.querySelectorAll('#editParameters input[submit]').forEach(elem => elem.disabled = true);
            refreshobjlist(arrsimobjects.length);
            if (arrsimobjects.length < 10) {
              addelement.disabled = false;
            }
          } else {
            console.log(objindex);
          }            
            objectslist.forEach(function(elem) {
              if (elem.id == ("obj"+arrsimobjects.length)) {
                simulateClick(elem);
              }
            });
            
          
          

        }


        // initialize checkbox interactions

        // find how many checked and action accordingly 
        //  none , one , two , attempt  third 
        // if params not saved 

        function refreshobjlist(num) {
          //txt = document.getElementById("objlabel"+num).childNodes[0].textContent;
          //newtxt = arrsimobjects[num-1].objname + txt;
          document.getElementById("objlabel"+num).childNodes[0].textContent = arrsimobjects[num-1][0]; //newtxt;
          document.getElementById("line"+num).hidden = false;
          document.getElementById("obj"+num).checked = true;
          simulateClick(document.getElementById("objlabel"+num));
          //checkmark
        } 

        // initialize solvefor interactions
        // on change of selection highlight respective field 
        

        // initialize run simulation interactions 


      } //init ends

      //common functions
      // click any element 
      function simulateClick(elem) {
        var evt = new MouseEvent('click');
        //var cb = document.getElementById(elem); 
        var canceled = !elem.dispatchEvent(evt);
        if(canceled) {
          // A handler called preventDefault
          alert("click event canceled");
        } else {
          // None of the handlers called preventDefault
          //alert("not canceled");
        }
      }



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
/* 3 */,
/* 4 */,
/* 5 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

//detail queryselectors if necessary
//imports - 

let BABYLON = __webpack_require__(1);
let interaction = __webpack_require__(2);
let velo1 = interaction.velocities;
let masses = interaction.masses;
let positions = interaction.positions;
let velocities = [];

let equations = __webpack_require__(6);

let velos = __webpack_require__(7);
coaxial_velocity = velos.coaxial_velocity;
displacement = velos.displacement;
coaxial_displacement = velos.coaxial_displacement;
axial_velocity = velos.axial_velocity;
let result;

velocities.push(velo1.forEach (function(veloset) { axial_velocity(veloset) } ));

(function(window, document, undefined){
    // to wait until all elements are loaded
    window.onload = init;
    function init(){

const runbutton = document.querySelector("#simbtn");
runbutton.onclick = function() {

let checked = [1, 2];
let dt_PA;
let dt_QA;
let dp_PA;
let dp_QA;
let event1 = {};
let event2 = {};
colinear_velo = {x: 1, y: 1, z: 1};

relvelo = {x: (velocities[checked[1]].x - velocities[checked[0]].x), 
           y: (velocities[checked[1]].y - velocities[checked[0]].y),
           z: (velocities[checked[1]].z - velocities[checked[0]].z),
           total: Math.sqrt(relvelo.x**2 + relvelo.y**2 + relvelo.z**2)}

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
}

function sol_var() {

    declareParam();
    let solvefx = document.querySelector("#solvefx");

    if (solvefx.value == "deltat1") { dt_PA = (event2.time - event1.time); 
                                     dp_PA = displacement(event2.pos, event1.pos); 
                                     dt_QA = null;
                                     dp_QA = null; 
                                     mass1 = masses[checked[1]]
                                     mass2 = masses[checked[0]]
                                     colinear_veloA = coaxial_velocity(relvelo, event2.pos, event1.pos)}
    if (solvefx.value == "deltat")  { dt_QA = (event2.time - event1.time) 
                                     dp_QA = displacement(event2.pos, event1.pos) 
                                     dt_PA = null;
                                     dp_PA = null;
                                     mass1 = masses[checked[0]]
                                     mass2 = masses[checked[1]]
                                     colinear_veloA = coaxial_velocity(relvelo, event2.pos, event1.pos)}
    if (solvefx.value == "deltax1") { dp_PA = displacement(event2.pos, event1.pos)
                                     dt_PA = (event2.time - event1.time)
                                     dt_QA = document.querySelector("#deltafx > #deltat1").value;
                                     dp_QA = null;
                                     mass1 = masses[checked[1]]
                                     mass2 = masses[checked[0]]
                                     colinear_veloA = coaxial_velocity(relvelo, event2.pos, event1.pos)}
    if (solvefx.value == "deltax")  { dp_QA = displacement(event2.pos, event1.pos)  
                                     dt_QA = (event2.time - event1.time)
                                     dp_PA = null;
                                     dt_PA = document.querySelector("#deltafx > #deltat").value;
                                     mass1 = masses[checked[0]]
                                     mass2 = masses[checked[1]]
                                     colinear_veloA = coaxial_velocity(relvelo, event2.pos, event1.pos)}
}

sol_var();

input = { dt_P: dt_PA, 
    dt_Q: dt_QA, 
    dp_P: dp_PA, 
    dp_Q: dp_QA,
    colinear_velo: colinear_veloA, 
    mass1: mass1,
    mass2: mass2 }

if (!input.colinear_veloA) { colinear_veloA.total = relvelo.total };

console.log(input, "from input js");
result = new equations(input);
if (!input.dt_Q) { result.case1(); result.case3() }
if (!input.dt_P) { result.case2(); result.case4() }

if (!input.dp_Q && !input.dp_P && solvefx.value == "deltax") { result.case5() }
if (!input.dp_Q && !input.dp_P && !!input.dt_Q && solvefx.value == "deltax1") { result.case6() }

if (!input.dp_Q && !!input.dp_P) { result.case1(); result.case3() }
if (!input.dp_P && !!input.dp_Q) { result.case2(); result.case4() }     

result.case7();
result.case8();

let dt = document.querySelector("#deltafx > deltat");
let dt1 = document.querySelector("#deltafx > #deltat1");
let dx = document.querySelector("#deltafx > #deltax");
let dx1 = document.querySelector("#deltafx > #deltax1");
let e1 = document.querySelector("#deltafx > #energy");
let e2 = document.querySelector("#deltafx > #energy1");

dt.value = result.content.dt_P;
dt1.value = result.content.dt_Q;
dx.value = result.content.dp_P;
dx1.value = result.content.dp_Q;
e1.value = result.content.energy1;
e2.value = result.content.energy2;
}
runbutton.onclick(() => module.exports = {result: result});
}})(window, document, undefined);

/***/ }),
/* 6 */
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
let velos = __webpack_require__(7);
coaxial_displacement = velos.coaxial_displacement;
coaxial_velocity = velos.coaxial_velocity;
displacement = velos.displacement;

function equations (input) {
    
    this.content = input; 
    console.log(this.content);

    dt_P = this.content.dt_P;
    dt_Q = this.content.dt_Q;
    dp_P = this.content.dp_P;
    dp_Q = this.content.dp_Q;
    mass1 = this.content.mass1;
    mass2 = this.content.mass2;
    colinear_velo = this.content.colinear_velo;
    
        
    velo_sum = ((colinear_velo.x**2) + (colinear_velo.y**2) + (colinear_velo.z**2));
    const LzF = (1/Math.sqrt(1 - (velo_sum/c**2))); //check whether Lorentz factor is directional
         
    this.case1 = function case1() { //delta T in frame Q
        //basic form of Lorentz transformation
        //account for asynchronised separation later
        term1 = (colinear_velo.x * coaxial_displacement(dp_P.x));
        term2 = (colinear_velo.y * coaxial_displacement(dp_P.y));
        term3 = (colinear_velo.z * coaxial_displacement(dp_P.z));
        term4 = (dt_P + (-term1 - term2 - term3)/c**2);
        this.content.dt_Q = term4 * LzF }

    this.case2 = function case2() { //delta T in frame P
        term1 = (colinear_velo.x * coaxial_displacement(dp_Q.x));
        term2 = (colinear_veloY.y * coaxial_displacement(dp_Q.y));
        term3 = ((colinear_velo.z * coaxial_displacement(dp_Q.z)));
        term4 = (dt_Q + (term1 + term2 + term3));
        this.content.dt_Q = term4 * LzF }
    
    this.case3 = function case3() {  //displacement in frame Q
        term1 = (dp_P.x - (colinear_velo.x * dt_P));
        term2 = (dp_P.y - (colinear_velo.y * dt_P));
        term3 = (dp_P.z - (colinear_velo.z * dt_P));
        term4 = [(term1 * LzF), (term2 * LzF), (term3 * LzF)];
        this.content.dp_Q = displacement(term4).total;
        this.content.dp_P = dp_P.total }

    this.case4 = function case4() { //displacement in frame p
        term1 = (dp_Q.x - (colinear_velo.x * dt_Q));
        term2 = (dp_Q.y - (colinear_velo.y * dt_Q));
        term3 = (dp_Q.z - (colinear_velo.z * dt_Q));
        term4 = [(term1 * LzF), (term2 * LzF), (term3 * LzF)]
        this.content.dp_P = displacement(term4).total;
        this.content.dp_Q = dp_Q.total }
    
    this.case6 = function case6() { //delta x' without delta x - assuming 100% coaxial velo
        term1 = ( LzF * - dt_P);
        term2 = (c**2/LzF * -(colinear_velo.total));
        this.content.dp_P = term2 * (dt_Q + term1) }
    
    this.case5 = function case5() { //delta x without delta x' - assuming 100% coaxial velo
        term1 = ( LzF * - dt_Q);
        term2 = (c**2/LzF * (colinear_velo.total));
        this.content.dp_P = term2 * (dt_Q + term1) }
    
    this.case7 = function case7() {
        this.content.energy1 = (mass1 * LzF * (c**2)) }
    
    this.case8 = function case8() {
        this.content.energy2 = (mass2 * LzF * (c**2)) }

    return this.content;
}

module.exports = equations;

/***/ }),
/* 7 */
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
    let veloX = velo[0] * Math.cos(radians_degrees(velocity[1]));
    let veloY = velo[0] * Math.sin(radians_degrees(velocity[1]));
    let veloZ = velo[0] * Math.sin(radians_degrees(velocity[2]));
    return {x : veloX, y : veloY, z : veloZ};
}

function displacement(term2, term1) {
    if (!term1) { term1 = [0, 0, 0] };
    dis = {};
    dis.x = term2[0] - term1[0];
    dis.y = term2[1] - term1[1];
    dis.z = term2[2] - term1[2];
    dis.total = Math.sqrt((dis.x)**2 + (dis.y)**2 + (dis.z)**2);
    return dis;
}

function coaxial_displacement(relvelo, pos2, pos1) {
    coaxial_dis = {};
    dis = displacement(pos2, pos1);
    coaxial_dis.x = (relvelo.x / dis.y) / (relvelo.y / dis.x) * relvelo.x;
    coaxial_dis.y = (relvelo.y / dis.x) / (relvelo.x / dis.y) * relvelo.y;
    coaxial_dis.z = (relvelo.z / dis.y) / (relvelo.y / dis.z) * relvelo.z;
    coaxial_dis.total = Math.sqrt((coaxial_dis.x)**2 + (coaxial_dis.y)**2 + (coaxial_dis.z)**2);
}

function coaxial_velocity(relvelo, pos2, pos1) {
    coaxial_velo = {};
    dis = displacement(pos2, pos1);
    if (!pos2[0] && !pos1[0]) { return null }
    else {
    coaxial_velo.x = (relvelo.x / dis.y) / (relvelo.y / dis.x) * relvelo.x;
    coaxial_velo.y = (relvelo.y / dis.x) / (relvelo.x / dis.y) * relvelo.y;
    coaxial_velo.z = (relvelo.z / dis.y) / (relvelo.y / dis.z) * relvelo.z;
    coaxial_velo.total = Math.sqrt((coaxial_velo.x)**2 + (coaxial_velo.y)**2 + (coaxial_velo.z)**2);
    return coaxial_velo };
}
module.exports = {coaxial_velocity: coaxial_velocity,
                  displacement: displacement,
                  coaxial_displacement: coaxial_displacement,
                  axial_velocity: axial_velocity }


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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
let BABYLON = __webpack_require__(1);

let interaction = __webpack_require__(2);
let result = (__webpack_require__(5).result);

let checked = [];
let objects = interaction.arrsimobjects;
let velocities = interaction.velocities;
let positions = interaction.positions;
let masses = interaction.masses;

const canvas = document.querySelector("#renderCanvas");
const engine = new BABYLON.Engine(canvas, true);
let scene = BABYLON.Scene(engine);

function synthObject (scene, synthindex) {
    let object;
    let param = objects[synthindex];
    let color = new BABYLON.Color4.FromHexString(param[3]);
    let input_param = {diameter: param[1], segments: 20};
    object = BABYLON.MeshBuilder.CreateSphere(param[0], input_param, scene);
    mat = new BABYLON.StandardMaterial('', scene);
    mat.diffuseColor = color;
    //mat.specularColor = new BABYLON.Color4(1, 1, 1, 0.5);
    object.material = mat;
    return object; 
}

function createScene () {
    let originpts = [[new BABYLON.Vector3(-1, 0, 0),
                     new BABYLON.Vector3(1, 0, 0)],
                     [new BABYLON.Vector3(0, -1, 0),
                     new BABYLON.Vector3(0, 1, 0)],
                     [new BABYLON.Vector3(0, 0, -1),
                     new BABYLON.Vector3(0, 0, 1) ]]
    
    originset = BABYLON.MeshBuilder.CreateLineSystem('originset', {points: originpts}, scene);
        
    let current0 = synthObject(scene, checked[0]);
    current0.position = positions[checked[0]];
    let current1 = synthObject(scene, checked[1]);
    current1.position = positions[checked[1]];

    }

})();

/******/ })()
;