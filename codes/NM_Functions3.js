const { displacement } = require("./velocity_codes.js");
c = 1;
function equations (input) {

    this.content = {};    
    this.content = input; 

    dt_P = this.content.dt_P;
    dt_Q = this.content.dt_Q;
    dp_P = this.content.dp_P;
    dp_Q = this.content.dp_Q;
    mass1 = this.content.mass1;
    mass2 = this.content.mass2;
    colinear_dis = this.content.colinear_dis;
    colinear_velo = this.content.colinear_velo;
    
    velo_sum = ((colinear_velo.x**2) + (colinear_velo.y**2) + (colinear_velo.z**2));
    const LzF = 1; 
         
    this.case1 = function case1() { 
        this.content.dt_Q = dt_P };

    this.case2 = function case2() { 
        this.content.dt_P = dt_Q; }
    
    this.case3 = function case3() {  
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
    
    this.en = function () {
        this.content.energy1 = 1/2 * mass1 * velo_sum;
        this.content.energy2 = 1/2 * mass1 * velo_sum; }    

    return this;
}

module.exports = equations;