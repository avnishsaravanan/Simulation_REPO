//receive user input equation through this program directly
//verify using reliable arbitrary values

//arrays containing the distinct terms of each equation
//convert string to object, property to exclude equation

//separate function to calculate arbitrary values, randomised each time (global variables)
//add another method to run calculation and then validate

//this.translate(), this.classify(), this.validate()
//preconditions: use D for derivative, ^ for power and roots, brackets for +/-, no splittable terms on left side, no XYZ unless for express colinear values

const { coaxial_velocity } = require("./velocity_codes.js");
const { coaxial_displacement } = require("./velocity_codes.js");
const { axial_velocity } = require("./velocity_codes");
const SR = require("./SR_Functions1.js"); const GR = require("./GR_Functions2.js");


let input = {};
function randomise() {
       let velo1 = Math.ceil(Math.random() * 999) / 1000
       let XY = Math.round(Math.random() * 90);
       let YZ = Math.round(Math.random() * 90);
       let velo2 = axial_velocity([velo1, XY, YZ]);

       input = {
              dt_P: Math.ceil((Math.random() * 100)),
              dp_P: {
                     x: Math.ceil((Math.random() * 100)),
                     y: Math.ceil((Math.random() * 100)),
                     z: Math.ceil((Math.random() * 100))
              },
              //dp_Q: Math.ceil((Math.random()*100)), 
              //dt_Q: Math.ceil((Math.random()*100)),
              mass1: Math.ceil(Math.random() * 100) / (Math.ceil(Math.random()) * 100),
              mass2: Math.ceil(Math.random() * 100) / (Math.ceil(Math.random()) * 100),
              dist: Math.sqrt(Math.ceil(Math.random() * 200) ** 2 * Math.ceil(Math.random() * 200) ** 2 * Math.ceil(Math.random() * 200) ** 2),
              colinear_velo: new Number, colinear_dis: new Number
       }

       input.colinear_velo = coaxial_velocity(velo2, [input.dp_P.x, input.dp_P.y, input.dp_P.z], [0, 0, 0]);
       input.colinear_dis = coaxial_displacement(velo2, [input.dp_P.x, input.dp_P.y, input.dp_P.z], [0, 0, 0]);
}

function runvalidate() {
       const collect = document.getElementById("usereqn");
       let usersubmit = collect.value;
       let evaluator = new equation(usersubmit);
       let splitsec = evaluator.classify(); evaluator.translate(splitsec);
       return evaluator.validate();
}
function update(arr, str, replval) { arr.forEach(function (n) { n = n[n.indexOf(str)] = replval }) };

class equation {
       constructor(eq) {
              this.content = String(eq);
              this.solvefor; //delta t'
              this.type;
              this.terms = [];
              this.powers = [];
              this.coefs = [];
              this.operators = [];
              let arr1 = [this.terms, this.coefbases, this.powerbases];
       }
       classify() {
              let split = this.content.split(/(?:\s*)=(?:\s*)/g);
              split[0] = split[0].replace("Δ" || "D", "");
              if (split[0] == "t" || split[0] == "t1") { this.solvefor = "dt_P" };
              if (split[0] == "t'" || split[0] == "t2") { this.solvefor = "dt_Q" };
              if (split[0] == "d" || split[0] == "d1") { this.solvefor = "dp_P" };
              if (split[0] == "d'" || split[0] == "d2") { this.solvefor = "dp_Q" };
              if (split[0] == "E") { this.solvefor = "en" }
              if (split[0] == "m" && split[1].includes("c^2")) { this.solvefor = "mrel" }
              if (split[1].includes("G" && "c")) { this.type = "GR" };
              if (split[1].includes("v")) { this.type = "SR" };
              if (split[1].includes("r") && !(split[1].includes("c"))) { this.type = "NM" };
              return split;
       }
       translate(split) {
              this.terms[0] = split[0];
              let terms1 = Array.from(split[1].split(/(?:\s*)[+](?:\s*)/g));
              terms1 = terms1.map(n => n.split(/(?:\s*)[-](?:\s*)/g));
              terms1 = terms1.map(n => n.split(/(?:\s*)[*](?:\s*)/g));
              terms1 = terms1.map(n => n.split(/(?:\s*)[/](?:\s*)/g));
              terms1 = terms1.map(n => n.replace(/(?:\s*)[(](?=\d+[a-zA-Z])[)]/g, ""));
              this.operators = split[1].filter(elem => !terms1.includes(elem, 0));
              let terms2 = terms1.filter(term => String(term).includes("^"));
              this.powers = terms2.map(term => Number(term.replace(/\d*[a-z]+\^/gi, "")));
              this.powerbases = terms2.map(term => String(term.replace(/\^\d+/g, "")));
              let terms3 = terms1.filter(term => String(term).includes(/(?:\d+)(?=[a-z]+)/gi))
              this.coefs = terms3.map(term => Number(term.replace(/[a-z]+\^*\d*/gi, "")));
              this.coefbases = terms3.map(term => String(term.replace(/\d+(?=[a-z])/gi, "")));

              terms1.forEach(function (n) {
                     if (!this.operators.includes(n) && !this.powers.includes(n) && !this.coefs.includes(n)) {
                            this.terms.push(String(n))
                     }
              })
       }
       validate() {
              let trial;
              if (this.terms.includes("t")) { update(arr1, "t", input.dt_P) }
              else { update(arr1, "t1", input.dt_P) };
              //if (this.terms.includes("d'")) { this.terms[this.terms.indexOf("d'")] = input.dp_Q } else { this.terms.indexOf("d2") = input.dp_Q };
              if (this.terms.includes("d")) { update(arr1, "d", input.dp_P.total) }
              else { update(arr1, "d1", input.dp_P.total) };
              if (this.type == "GR" || this.type == "NM") {
                     if (this.terms.includes("M")) { update(arr1, "M", input.mass2) }
                     else { update(arr1, "m2", input.mass2) };
                     if (this.terms.includes("m")) { update(arr1, "m", input.mass1) }
                     else { update(arr1, "m1", input.mass1) };
                     update(arr1, "r", input.dist)
              }
              if (this.type == "SR") { trial = SR(input);  
              if (this.solvefor == "mrel" || this.solvefor == "en") { 
                     trial.en();
                     if (this.terms.includes("m")) {
                     update(arr1, "m", input.mass1) }
              else { update(arr1, "m1", input.mass2) };
              if (this.terms.includes("M")) { update(arr1, "M", input.mass1) }
              else {update(arr1, "m2", input.mass1) }};
              if (this.terms.includes("m")||this.terms.includes("m1")) { update(arr1, "E", trial.content.energy1)}
              else { update(arr1, "E", trial.content.energy2)};

              if (!this.terms.includes("v")) {
                     update(arr1, "vx", input.colinear_velo.x)
                     update(arr1, "vy", input.colinear_velo.z)
                     update(arr1, "vz", input.colinear_velo.x)
              }
              else {
                     update([this.terms, this.coefs, this.powers], "v", input.colinear_velo.total)
              }

              if (this.solvefor.includes("t") && (this.terms.includes("dx"))) {
                     update(arr1, "dx", input.colinear_dis.x)
                     update(arr1, "dy", input.colinear_dis.z)
                     update(arr1, "dz", input.colinear_dis.x)
              }
              else {
                     if (this.terms.includes("d")) { update([this.terms, this, coefs, this.powers], "d", input.colinear_dis.total) }
                     if (this.terms.includes("d1")) { update([this.terms, this, coefs, this.powers], "d1", input.colinear_dis.total) }
                     if (this.terms.includes("d'")) { update([this.terms, this, coefs, this.powers], "d'", input.colinear_dis.total) }
                     if (this.terms.includes("d2")) { update([this.terms, this, coefs, this.powers], "d2", input.colinear_dis.total) }};
              }

              if (this.type == "GR") { trial = GR(input); }; if (this.type == "NM") { }

              if (this.solvefor.includes("t")) {
                     trial.case1(); if (this.terms.includes("t'")) { update(arr1, "t'", trial.content.dt_Q) }
                     else { update(arr1, "t2'", trial.content.dt_Q) }
              }
              if (this.solvefor.includes("d")) {
                     trial.case3(); if (this.terms.includes("d'")) { update(arr1, "t'", trial.content.dt_Q) }
                     else { update([this.terms, this.powerbases, this.coefabases], "d2'", trial.content.dp_Q) }
              }
              let count = 0;
              this.terms.forEach(function (term) {
                     for (i = count; i == this.powers.length; i++) {
                            if (this.powerbases == term) {
                                   let ref = this.terms.indexOf(this.powerbases[i]);
                                   this.terms[ref] = this.terms[ref] ** powers[i];
                                   count += 1;
                            }
                     }
              })
              count = 0;
              this.terms.forEach(function (term) {
                     for (i = count; i == this.coefs.length; i++) {
                            if (this.coefbases[i] == term) {
                                   let ref = this.terms.indexOf(this.coefbases[i]);
                                   this.terms[ref] = this.terms[ref] * coefs[i];
                                   count += 1;
                            }
                     }
              })
              count = 0;
              this.terms.forEach(function (term) {
                     if (count = 0) { count += 1 } else {
                            if (this.operators[count] == "/") { this.terms[count] = term / this.terms[count + 1]; this.terms = this.terms.splice(count + 1, 1) };
                            if (this.operators[count] == "*") { this.terms[count] = term * this.terms[count + 1]; this.terms = this.terms.splice(count + 1, 1) };
                            count += 1
                     }
              })
              count = 0;
              this.terms.forEach(function (term) {
                     if (count = 0) { count += 1 } else {
                            if (this.operators[count] == "+") { this.terms[count] = term + this.terms[count + 1]; this.terms = this.terms.splice(count + 1, 1) };
                            if (this.operators[count] == "-") { this.terms[count] = term - this.terms[count + 1]; this.terms = this.terms.splice(count + 1, 1) };
                            count += 1;
                     }
              })
              return [this.terms[0] === this.terms[1], this.terms[1] - this.terms[0]]


       }
}
module.exports = runvalidate;
