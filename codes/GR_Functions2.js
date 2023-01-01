let velos = require("./velocity_codes");
const c = 1;
const G = 0.022322; //inaccuracy = ~9.5

function equations (input) {
    
    this.content = input;

    dt_P = this.content.dt_P;
    dt_Q = this.content.dt_Q;
    //dp_P = this.content.dp_P;
    //dp_Q = this.content.dp_Q;
    mass1 = this.content.mass1;
    mass2 = this.content.mass2;
    dist = this.content.dist;

    this.case1() = function case1() { // heavier object frame Q
        term1 = Math.sqrt(1 - (2 * G * mass2)/(dist.total * c**2));
        this.content.dt_Q = (dt_P * (mass2/mass1) / term1); }
        // this.content.dt_Q = dt_P * term1;
    
   this.case2() = function case2() { // lighter object frame P
        term1 = Math.sqrt(1 - (2 * G * mass1)/(dist.total * c**2));
        this.content.dt_P = dt_Q * (mass1/mass2) / term1; }
    
    this.case3() = function case3() {};
    this.case4() = function case4() {};

    this.case5() = function case5() {
        this.content.energy1 = mass1 * c**2;
        this.content.energy1 = mass2 * c**2; }
    
    return this;
}
module.exports = equations; 