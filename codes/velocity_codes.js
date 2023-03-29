//coaxial velocity - xyz, total
//coaxial displacement - xyz, total
//total velocity
//total displacement

function radians_degrees (input, path) {
    const pi = Math.PI;
    if (path == 0) {return input * (pi/180);} //degrees to radians
    else {return input * (180/pi) }} //radians to degrees

function axial_velocity(velo) {
    let veloX = velo[0] * Math.cos(radians_degrees(velo[1], 0)) * Math.cos(radians_degrees(velo[3], 0));
    let veloY = velo[0] * Math.sin(radians_degrees(velo[1], 0)) * Math.sin(radians_degrees(velo[2], 0));
    let veloZ = velo[0] * Math.sin(radians_degrees(velo[2], 0)) * Math.cos(radians_degrees(velo[3], 0));
    console.log("done, from first call");
    return {x : veloX, y : veloY, z : veloZ};
}

function displacement(term2, term1) {
    if (!term1) { term1 = [0, 0, 0]; }
    let dis = {};
    dis.x = term2[0] - term1[0];
    dis.y = term2[1] - term1[1];
    dis.z = term2[2] - term1[2];
    dis.total = Math.sqrt((dis.x)**2 + (dis.y)**2 + (dis.z)**2);
    return dis;
}

function coaxial_displacement(relvelo, pos2, pos1) {
    if (pos1[0] == null && pos2[0] == null) { console.log("null condition"); return null }
    else {
    let coaxial_dis = {};
    let dis = displacement(pos2, pos1)
    coefs = coaxial_velocity(relvelo, pos2, pos1).coefs;
    coaxial_dis.x = coefs[0] * dis.x;
    coaxial_dis.y = coefs[1] * dis.y;
    coaxial_dis.z = coefs[2] * dis.z;
    coaxial_dis.total = Math.sqrt((coaxial_dis.x)**2 + (coaxial_dis.y)**2 + (coaxial_dis.z)**2);
    return coaxial_dis }
}

function coaxial_velocity(relvelo, pos2, pos1) {
    coaxial_velo = {};
    let coefx; let coefy; let coefz; let ratio1; let ratio2;
    dis = displacement(pos2, pos1);
    if (pos2[0] == null && pos1[0] == null) { console.log("null condition"); return null }

    else { //conditional alg to prevent NaN

           if (dis.x == 0) { coaxial_velo.x = 0; coefx = 0 } 
           else { //block1
                 if ((relvelo.x/relvelo.y) <= 1) { //block 1.1
                    if ((dis.x/dis.y) <= (relvelo.x/relvelo.y)) { coefx = (dis.x/dis.y)/(relvelo.x/relvelo.y) }
                    else {coefx = (dis.x/dis.y)/Math.tan(Math.atan(relvelo.x/relvelo.y) - Math.atan(dis.x/dis.y)) };
                    }
                 else { //block 1.2
                    if ((dis.x/dis.y) <= (relvelo.x/relvelo.y)) { coefx = (dis.x/dis.y) / Math.tan(90 - Math.atan(relvelo.x/relvelo.y) - Math.atan(dis.x/dis.y))}
                    else { coefx = (dis.x/dis.y)/(relvelo.x/relvelo.y) };
                 }}
    
           if (dis.y == 0) { coaxial_velo.y = 0; coefy = 0 } 
           else { //block 2
                 ratio1 = (relvelo.y/relvelo.x) * (relvelo.y/relvelo.z);
                 ratio2 = (dis.y/dis.x) * (dis.y/dis.z); 

                 if (ratio1 >= 1) { //block 2.1
                    if (ratio2 >= ratio1) { coefy = ratio2/ratio1 }
                    else { coefy = ratio2 / Math.tan(Math.atan(ratio2) - Math.atan(ratio1)) }; 
                   }
                 else { //block 2.2
                    if (ratio2 >= ratio1) { coefy = ratio2/Math.tan(90 - Math.atan(ratio2) - Math.atan(ratio1)) }
                    else { coefy = ratio2/ratio1 };
                 }}
    
            if (dis.z == 0) { coaxial_velo.z = 0; coefz = 0 }
            else {//block 3
                 ratio1 = (relvelo.z/relvelo.y) * (relvelo.z/relvelo.x);
                 ratio2 = (dis.z/dis.y) * (dis.z/dis.x);
                 if (ratio1 <= 1) { //block 3.1
                    if (ratio2 <= ratio1) { coefz = ratio2/ratio1 }
                    else { coefz = ratio1 / Math.tan(Math.atan(ratio2) - Math.atan(ratio1)) }; 
                  }
                 else { //block 3.2
                   if (ratio2 <= ratio1) { coefz = ratio2 / Math.tan(90 - Math.atan(ratio2) - Math.atan(ratio1)) }
                   else { coefz = ratio2 / ratio1 };
              }}
            }
    coaxial_velo.x = relvelo.x * coefx;
    coaxial_velo.y = relvelo.y * coefy;
    coaxial_velo.z = relvelo.z * coefz;
    coaxial_velo.total = Math.sqrt((coaxial_velo.x)**2 + (coaxial_velo.y)**2 + (coaxial_velo.z)**2);
    coaxial_velo.coefs = [coefx, coefy, coefz];
    console.log('from velocity codes', coaxial_velo);
    return coaxial_velo; }

module.exports = {coaxial_velocity: coaxial_velocity,
                  displacement: displacement,
                  coaxial_displacement: coaxial_displacement,
                  axial_velocity: axial_velocity, 
                  radians_degrees: radians_degrees };
