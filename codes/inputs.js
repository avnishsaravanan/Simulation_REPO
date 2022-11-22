//detail queryselectors if necessary
//imports - 

let BABYLON = require("babylonjs");
let stores = require("./simulation.js");
positions = stores.positions 
velocities = stores.velocities;
masses = stores.masses; 
let equations = require("./SR_Functions1.js");
let velos = require("./velocity_codes");
coaxial_velocity = velos.coaxial_velocity;
displacement = velos.displacement;
coaxial_displacement = velos.coaxial_displacement;

(function(window, document, undefined){
    // to wait until all elements are loaded
    window.onload = init;
    function init(){

let runbutton = document.querySelector("#runbutton");

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
let result = new equations(input);
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

runbutton.onclick(() => module.exports = {result: result});

}})(window, document, undefined);