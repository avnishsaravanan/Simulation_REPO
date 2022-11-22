/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 6:
/***/ ((module) => {

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


function placeholder (input) {
    
    this.content = input;
    console.log(this.content);

    dt_P = this.content.dt_P;
    dt_Q = this.content.dt_Q;
    dp_P = this.content.dp_P;
    dp_Q = this.content.dp_Q;
    colinear_velo = this.content.colinear_velo;
        
    velo_sum = ((colinear_velo.x**2) + (colinear_velo.y**2) + (colinear_velo.z**2));
    const LzF = (1/Math.sqrt(1 - (velo_sum/c**2))); //check whether Lorentz factor is directional
         
    this.case1 = function case1() { //delta T in frame Q
        //basic form of Lorentz transformation
        //account for asynchronised separation later
        term1 = ((colinear_velo.x * dp_P.x));
        term2 = ((colinear_velo.y * dp_P.y));
        term3 = ((colinear_velo.z * dp_P.z));
        term4 = (dt_P + (-term1 - term2 - term3)/c**2);
        this.content.dt_Q = term4 * LzF }

    this.case2 = function case2() { //delta T in frame P
        term1 = ((colinear_velo.x * dp_Q.x));
        term2 = ((colinear_veloY.y * dp_Q.y));
        term3 = ((colinear_velo.z * dp_Q.z));
        term4 = (dt_Q + (term1 + term2 + term3));
        this.content.dt_Q = term4 * LzF }
    
    this.case3 = function case3() {  //displacement in frame Q
        term1 = (dp_P.x - (colinear_velo.x * dt_P));
        term2 = (dp_P.y - (colinear_velo.y * dt_P));
        term3 = (dp_P.z - (colinear_velo.z * dt_P));
        this.content.dp_Q = [(term1 * LzF), (term2 * LzF), (term3 * LzF)] }

    this.case4 = function case4() { //displacement in frame P
        term1 = (dp_Q.x - (colinear_velo.x * dt_Q));
        term2 = (dp_Q.y - (colinear_velo.y * dt_Q));
        term3 = (dp_Q.z - (colinear_velo.z * dt_Q));
        this.content.dp_P = [(term1 * LzF), (term2 * LzF), (term3 * LzF)] }
    
    this.case5 = function case5() { //delta x without delta x'
        term1 = ( LzF * - dt_P);
        term2 = (c**2/LzF * -(colinear_velo.total));
        this.content.dp_P = term2 * (dt_Q + term1) }
    
    this.case6 = function case6() { //delta x' without delta x
        term1 = ( LzF * - dt_Q);
        term2 = (c**2/LzF * (colinear_velo.total));
        this.content.dp_P = term2 * (dt_Q + term1) }
    
    this.case7 = function case7() {
        this.content.energy = (mass * LzF * (c**2)) 
        return this.content }
    
    if (!!dt_Q || !!dt_P) {
        if (!dt_Q) {this.case1() }
        if (!dt_P) {this.case2() }}
    if (!dp_Q) {this.case3() }
    if (!dp_P) {this.case4() }
    if (!dp_P && !dp_Q) {this.case5() }   
    
    return this.content;
}

module.exports = placeholder;

/***/ })

/******/ 	});
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
//detail queryselectors if necessary

(function(window, document, undefined){
    // to wait until all elements are loaded
    window.onload = init;
    function init(){
let equations = __webpack_require__(6);

let dt_PA;
let dt_QA;
let dp_PA;
let dp_QA;
let mass;
let event1 = {};
let event2 = {};
colinear_velo = {x: 1, y: 1, z: 1};

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
    if (solvefx.value = "deltat1") { dt_PA = (event2.time - event1.time) }
    if (solvefx.value = "deltat") { dt_QA = (event2.time - event1.time) }
    if (solvefx.value = "deltax1") { dp_PA = (event2.pos - event1.pos) }
    if (solvefx.value = "deltax") { dp_QA = (event2.pos - event1.pos) }
}

sol_var();

input = { dt_P: dt_PA, 
    dt_Q: dt_QA, 
    dp_P: dp_PA, 
    dp_Q: dp_QA,
    colinear_velo: colinear_velo, 
    mass: mass }

console.log(input, "from input js");
var testvar = equations(input);
console.log(testvar, "this is testvar");
}})(window, document, undefined);
})();

/******/ })()
;