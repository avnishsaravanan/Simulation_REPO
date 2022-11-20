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