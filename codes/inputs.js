//detail queryselectors if necessary

(function(window, document, undefined){
    // to wait until all elements are loaded
    window.onload = init;
    function init(){
let equations = require("./SR_Functions1.js");

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