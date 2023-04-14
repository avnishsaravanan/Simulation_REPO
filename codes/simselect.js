// units - velocity as percent of c, distance as 200 = 1 AU
const GR = require("./GR_Functions2"); const SR = require("./SR_Functions1"); const NM = require("./NM_Functions3");
let imp = require("./velocity_codes"); const velos = imp.axial_velocity; const dis = imp.displacement;
const custom = require("./customs.js");

/* param */ let masses; let positions; let velocities; let checked; let input; 

function simselect (masses, velocities, positions, checked, input, type) {

let eq_input = new String;
let M = (masses[checked[1]] >= 0.55) || (masses[checked[0]] >= 0.55);
let V = dis([velos(velocities[checked[1]]).x, velos(velocities[checked[1]]).y, velos(velocities[checked[1]]).z], 
            [velos(velocities[checked[0]]).x, velos(velocities[checked[0]]).y, velos(velocities[checked[1]]).z]).total >= 0.1;
let P = dis(positions[checked[1]], positions[checked[0]]).total >= 20;

const mode = document.getElementById("autouser"); const simselect = document.getElementsByName("simselect"); let equation;
simselect.forEach(function(op) { if (op.checked) { equation = op.id }});

if (!mode.checked) { //auto select condition
    equation = null;
    if (M || P) { equation = "sim-gen" };
    if (V && equation != "sim-gen") { equation = "sim-spl" };
    if (!equation) { equation = "sim-new"};        
    document.getElementById(equation).checked = true
}

if (type == "calc") {
    if (equation == "sim-gen") { return GR(input) }; 
    if (equation == "sim-spl") { return SR(input) };
    if (equation == "sim-new") { return NM(input) }; 

    //document.getElementById("sinfo").textContent;


}
if (type == "eval") {return equation};

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
