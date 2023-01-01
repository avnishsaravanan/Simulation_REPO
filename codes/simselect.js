// units - velocity as percent of c, distance as 200 = 1 AU
const GR = require("./GR_Functions2"); const SR = require("./SR_Functions1"); 
let imp = require("./velocity_codes"); const velos = imp.axial_velocity; const dis = imp.displacement;
const custom = require("./customs.js");

/* param */ let masses; let positions; let velocities; let checked; let input;

function simselect (masses, velocities, positions, checked, input, type) {

let M = (masses[checked[1]] >= 0.05) || (masses[checked[0]] >= 0.05);
let V = (dis(velos(velocities[checked[1]]), velos(velocities[checked[0]]))) >= 0.1;
let P = dis(positions[checked[1]], positions[checked[0]]).total >= 20;

const mode = document.getElementById("autouser"); const simselect = document.getElementsByName("simselect"); let equation;
simselect.forEach(function(op) { if (op.checked) { equation = op.id }});

if (!mode.checked) { //auto select condition
    equation = null;
    if (M || P) { equation = "SIMGEN"; document.getElementById(equation).checked = true };
    if (V && !equation=="SIMGEN") { equation = "SIMSPL"; document.getElementById(equation).checked = true };
    if (!equation) { equation = "SIMNEW"; document.getElementById(equation).checked = true };        
}

if (type == "calc") {
    if (equation == "SIMGEN") { return GR(input) }; 
    if (equation == "SIMSPL") { return SR(input) };
    if (equation == "SIMNEW") { return null }; 

    //document.getElementById("sinfo").textContent;


}

else {
    let graphics = {BG: null, arrow: true, augment: true, ST: false, simmsg: new String};
    if (equation == "SIMGEN" || equation == "SIMSPL") { graphics.BG = "black" };
    if (equation == "SIMGEN") { graphics.augment = false; graphics.arrow = true; graphics.ST = true };
    if (equation == "SIMGEN") { graphics.simmsg = "                 "};
    if (equation == "SIMSPL") { graphics.simmsg = "                 "};
    if (equation == "SIMNEW") { graphics.simmsg = "                 "};
    return graphics;
}

}
module.exports = simselect;
