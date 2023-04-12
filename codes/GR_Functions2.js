let velos = require("./velocity_codes");
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
        term1 = Math.sqrt(1 - (2 * G * mass2)/(distance.total * c**2));
        this.content.dt_Q = (dt_P * (mass2/mass1) / term1); };
        // this.content.dt_Q = dt_P * term1;
    
   this.case2 = function case2() { // lighter object frame P
        term1 = Math.sqrt(1 - (2 * G * mass1)/(distance.total * c**2));
        this.content.dt_P = dt_Q * (mass1/mass2) / term1; console.log(term1, this.content.dt_P) }
    
    this.case3 = function case3() {
        term1 = Math.sqrt(1 - (2 * G * mass1)/(distance.total * c**2));
        term2 = (mass2/mass1) / term1;
        term3 = dp_P.x * term2; term4 = dp_P.y * term2; term5 = dp_P.z * term2;
        this.content.dp_Q = velos.displacement(term3, term4, term5).total;
        this.content.dp_P = dp_P.total }

    this.case4 = function case4() {
        term1 = Math.sqrt(1 - (2 * G * mass2)/(distance.total * c**2));
        term2 = (mass1/mass2) * term1; 
        term3 = dp_Q.x * term2; term4 = dp_Q.y * term2; term5 = dp_Q.z * term2;
        this.content.dp_P = velos.displacement([term3, term4, term5]).total; console.log(term1, term2, term3, term4, term5, this.content.dp_P)
        this.content.dp_Q = dp_Q.total }

    this.en = function case5() {
        this.content.energy1 = mass1 * c**2;
        this.content.energy2 = mass2 * c**2; }
        console.log(mass2, this.content.energy2)
    
    return this;
}
module.exports = equations; 