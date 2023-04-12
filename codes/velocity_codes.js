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
    let coaxial_velo = {};
    let coefx; let coefy; let coefz; let ratio1; let ratio2;let ratio3; let ratio4; let ratio5; let ratio6; let rev1; let rev2;
    dis = displacement(pos2, pos1);
    if (pos2[0] == null && pos1[0] == null) { console.log("null condition"); return null }

    else { //conditional alg to prevent NaN

           if (dis.x == 0) { coaxial_velo.x = 0; coefx = 0 } 
           else { //block1
                 if (!relvelo.y == 0) { ratio3 = (relvelo.x/relvelo.y) } else { ratio3 = Math.PI/2; }; if (!relvelo.z == 0) { ratio4 = (relvelo.x/relvelo.z) } else { ratio4 = Math.PI/2; };
                 ratio1 = ratio3 * ratio4;
                 if (!dis.y == 0) { ratio5 = (dis.x/dis.y) } else {ratio5 = Math.PI/2 }; if (!dis.z == 0) { ratio6 = (dis.x/dis.z) } else { ratio6 = Math.PI/2 };
                 ratio2 = ratio3 * ratio4;
                 //block 1.
                if (ratio3 > ratio5) { 
                if (ratio3 == Math.PI/2 && !ratio5 == Math.PI/2) { rev1 = (Math.tan(ratio3 - Math.atan(ratio5))) }
                else { if (!ratio3 == Math.PI/2 && ratio5 == Math.PI/2) { rev1 = (Math.tan(ratio5 - Math.atan(ratio3))) }
                       else { rev1 = ratio5/ratio3} };};
                if (ratio3 < ratio5) {
                    if (ratio3 == Math.PI/2 && !ratio5 == Math.PI/2) { rev1 = (Math.tan(ratio3 - Math.atan(ratio5))) }
                    else { if (!ratio3 == Math.PI/2 && ratio5 == Math.PI/2) { rev1 = (Math.tan(ratio5 - Math.atan(ratio3))) }
                        else { rev1 = ratio3/ratio5 } }; }
                if (ratio4 > ratio6) { 
                if (ratio4 == Math.PI/2 && !ratio6 == Math.PI/2) { rev2 = (Math.tan(ratio4 - Math.atan(ratio6))) }
                else { if (!ratio4 == Math.PI/2 && ratio6 == Math.PI/2) { rev2 = (Math.tan(ratio6 - Math.atan(ratio4))) }
                            else { rev2 = ratio6/ratio4} };};
                if (ratio4 < ratio6) {
                if (ratio4 == Math.PI/2 && !ratio6 == Math.PI/2) { rev2 = (Math.tan(ratio4 - Math.atan(ratio6))) }
                else { if (!ratio4 == Math.PI/2 && ratio6 == Math.PI/2) { rev2 = (Math.tan(ratio6 - Math.atan(ratio4))) }
                        else { rev2 = ratio4/ratio6 } }; }
                 //block 1.2
                coefx = rev1 * rev2; }; console.log("coaxial x: ", ratio3, ratio4, ratio5, ratio6, rev1, rev2, coefx);
    
           if (dis.y == 0) { coaxial_velo.y = 0; coefy = 0 } 
           else { //block 2
            if (!relvelo.z == 0) { ratio3 = (relvelo.y/relvelo.z) } else { ratio3 = Math.PI/2; }; if (!relvelo.x == 0) { ratio4 = (relvelo.y/relvelo.x) } else { ratio4 = Math.PI/2; };
                 ratio1 = ratio3 * ratio4;
                 if (!dis.z == 0) { ratio5 = (dis.y/dis.z) } else {ratio5 = Math.PI/2 }; if (!dis.z == 0) { ratio6 = (dis.x/dis.z) } else { ratio6 = Math.PI/2 };
                 ratio2 = ratio3 * ratio4;
                 //block 1.
                if (ratio3 > ratio5) { 
                if (ratio3 == Math.PI/2 && !ratio5 == Math.PI/2) { rev1 = (Math.tan(ratio3 - Math.atan(ratio5))) }
                else { if (!ratio3 == Math.PI/2 && ratio5 == Math.PI/2) { rev1 = (Math.tan(ratio5 - Math.atan(ratio3))) }
                       else { rev1 = ratio5/ratio3} };};
                if (ratio3 < ratio5) {
                    if (ratio3 == Math.PI/2 && !ratio5 == Math.PI/2) { rev1 = (Math.tan(ratio3 - Math.atan(ratio5))) }
                    else { if (!ratio3 == Math.PI/2 && ratio5 == Math.PI/2) { rev1 = (Math.tan(ratio5 - Math.atan(ratio3))) }
                        else { rev1 = ratio3/ratio5 } }; }
                if (ratio4 > ratio6) { 
                if (ratio4 == Math.PI/2 && !ratio6 == Math.PI/2) { rev2 = (Math.tan(ratio4 - Math.atan(ratio6))) }
                else { if (!ratio4 == Math.PI/2 && ratio6 == Math.PI/2) { rev2 = (Math.tan(ratio6 - Math.atan(ratio4))) }
                            else { rev2 = ratio6/ratio4} };};
                if (ratio4 < ratio6) {
                if (ratio4 == Math.PI/2 && !ratio6 == Math.PI/2) { rev2 = (Math.tan(ratio4 - Math.atan(ratio6))) }
                else { if (!ratio4 == Math.PI/2 && ratio6 == Math.PI/2) { rev2 = (Math.tan(ratio6 - Math.atan(ratio4))) }
                        else { rev2 = ratio4/ratio6 } }; }
                coefy = rev1 * rev2;
                 }} console.log("coaxial y: ", ratio3, ratio4, ratio5, ratio6, coefy);
    
            if (dis.z == 0) { coaxial_velo.z = 0; coefz = 0 }
            else {
            if (!relvelo.x == 0) { ratio3 = (relvelo.z/relvelo.x) } else { ratio3 = Math.PI/2; }; if (!relvelo.y == 0) { ratio4 = (relvelo.z/relvelo.y) } else { ratio4 = Math.PI/2; };
                 ratio1 = ratio3 * ratio4;
                 if (!dis.z == 0) { ratio5 = (dis.z/dis.x) } else {ratio5 = Math.PI/2 }; if (!dis.z == 0) { ratio6 = (dis.z/dis.y) } else { ratio6 = Math.PI/2 };
                 ratio2 = ratio3 * ratio4;
                 //block 1.
                if (ratio3 > ratio5) { 
                if (ratio3 == Math.PI/2 && !ratio5 == Math.PI/2) { rev1 = (Math.tan(ratio3 - Math.atan(ratio5))) }
                else { if (!ratio3 == Math.PI/2 && ratio5 == Math.PI/2) { rev1 = (Math.tan(ratio5 - Math.atan(ratio3))) }
                       else { rev1 = ratio5/ratio3} };};
                if (ratio3 < ratio5) {
                    if (ratio3 == Math.PI/2 && !ratio5 == Math.PI/2) { rev1 = (Math.tan(ratio3 - Math.atan(ratio5))) }
                    else { if (!ratio3 == Math.PI/2 && ratio5 == Math.PI/2) { rev1 = (Math.tan(ratio5 - Math.atan(ratio3))) }
                        else { rev1 = ratio3/ratio5 } }; }
                if (ratio4 > ratio6) { 
                if (ratio4 == Math.PI/2 && !ratio6 == Math.PI/2) { rev2 = (Math.tan(ratio4 - Math.atan(ratio6))) }
                else { if (!ratio4 == Math.PI/2 && ratio6 == Math.PI/2) { rev2 = (Math.tan(ratio6 - Math.atan(ratio4))) }
                            else { rev2 = ratio6/ratio4} };};
                if (ratio4 < ratio6) {
                if (ratio4 == Math.PI/2 && !ratio6 == Math.PI/2) { rev2 = (Math.tan(ratio4 - Math.atan(ratio6))) }
                else { if (!ratio4 == Math.PI/2 && ratio6 == Math.PI/2) { rev2 = (Math.tan(ratio6 - Math.atan(ratio4))) }
                        else { rev2 = ratio4/ratio6 } }; }
                coefz = rev1 * rev2;
                 } console.log("coaxial z: ", ratio3, ratio4, ratio5, ratio6, coefy);
              
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
