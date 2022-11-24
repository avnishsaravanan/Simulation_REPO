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
let velos = require("./velocity_codes");
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
         
    this.content.case1 = function case1() { //delta T in frame Q
        //basic form of Lorentz transformation
        //account for asynchronised separation later
        term1 = (colinear_velo.x * coaxial_displacement(dp_P.x));
        term2 = (colinear_velo.y * coaxial_displacement(dp_P.y));
        term3 = (colinear_velo.z * coaxial_displacement(dp_P.z));
        term4 = (dt_P + (-term1 - term2 - term3)/c**2);
        this.content.dt_Q = term4 * LzF; };

    this.content.case2 = function case2() { //delta T in frame P
        term1 = (colinear_velo.x * coaxial_displacement(dp_Q.x));
        term2 = (colinear_veloY.y * coaxial_displacement(dp_Q.y));
        term3 = ((colinear_velo.z * coaxial_displacement(dp_Q.z)));
        term4 = (dt_Q + (term1 + term2 + term3));
        this.content.dt_Q = term4 * LzF; };
    
    this.content.case3 = function case3() {  //displacement in frame Q
        term1 = (dp_P.x - (colinear_velo.x * dt_P));
        term2 = (dp_P.y - (colinear_velo.y * dt_P));
        term3 = (dp_P.z - (colinear_velo.z * dt_P));
        term4 = [(term1 * LzF), (term2 * LzF), (term3 * LzF)];
        this.content.dp_Q = displacement(term4).total;
        this.content.dp_P = dp_P.total; };

    this.content.case4 = function case4() { //displacement in frame p
        term1 = (dp_Q.x - (colinear_velo.x * dt_Q));
        term2 = (dp_Q.y - (colinear_velo.y * dt_Q));
        term3 = (dp_Q.z - (colinear_velo.z * dt_Q));
        term4 = [(term1 * LzF), (term2 * LzF), (term3 * LzF)];
        this.content.dp_P = displacement(term4).total;
        this.content.dp_Q = dp_Q.total; };
    
    this.content.case6 = function case6() { //delta x' without delta x - assuming 100% coaxial velo
        term1 = ( LzF * - dt_P);
        term2 = (c**2/LzF * -(colinear_velo.total));
        this.content.dp_P = term2 * (dt_Q + term1); };
    
    this.content.case5 = function case5() { //delta x without delta x' - assuming 100% coaxial velo
        term1 = ( LzF * - dt_Q);
        term2 = (c**2/LzF * (colinear_velo.total));
        this.content.dp_P = term2 * (dt_Q + term1); };
    
    this.content.case7 = function case7() {
        this.content.energy1 = (mass1 * LzF * (c**2)); };
    
    this.content.case8 = function case8() {
        this.content.energy2 = (mass2 * LzF * (c**2)); };

    return this.content;
}

module.exports = equations;