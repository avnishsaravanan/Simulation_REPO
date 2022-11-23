//coaxial velocity - xyz, total
//coaxial displacement - xyz, total
//total velocity
//total displacement

function radians_degrees (input, path) {
    const pi = Math.PI;
    if (path == 0) {
        return input * (180/pi);}
    else {
        return pi * input/180; }}

function axial_velocity(velo) {
    let veloX = velo[0] * Math.cos(radians_degrees(velo[1]));
    let veloY = velo[0] * Math.sin(radians_degrees(velo[1]));
    let veloZ = velo[0] * Math.sin(radians_degrees(velo[2]));
    return {x : veloX, y : veloY, z : veloZ};
}

function displacement(term2, term1) {
    if (!term1) { term1 = [0, 0, 0] };
    dis = {};
    dis.x = term2[0] - term1[0];
    dis.y = term2[1] - term1[1];
    dis.z = term2[2] - term1[2];
    dis.total = Math.sqrt((dis.x)**2 + (dis.y)**2 + (dis.z)**2);
    return dis;
}

function coaxial_displacement(relvelo, pos2, pos1) {
    coaxial_dis = {};
    dis = displacement(pos2, pos1);
    coaxial_dis.x = (relvelo.x / dis.y) / (relvelo.y / dis.x) * relvelo.x;
    coaxial_dis.y = (relvelo.y / dis.x) / (relvelo.x / dis.y) * relvelo.y;
    coaxial_dis.z = (relvelo.z / dis.y) / (relvelo.y / dis.z) * relvelo.z;
    coaxial_dis.total = Math.sqrt((coaxial_dis.x)**2 + (coaxial_dis.y)**2 + (coaxial_dis.z)**2);
}

function coaxial_velocity(relvelo, pos2, pos1) {
    coaxial_velo = {};
    dis = displacement(pos2, pos1);
    if (!pos2[0] && !pos1[0]) { return null }
    else {
    coaxial_velo.x = (relvelo.x / dis.y) / (relvelo.y / dis.x) * relvelo.x;
    coaxial_velo.y = (relvelo.y / dis.x) / (relvelo.x / dis.y) * relvelo.y;
    coaxial_velo.z = (relvelo.z / dis.y) / (relvelo.y / dis.z) * relvelo.z;
    coaxial_velo.total = Math.sqrt((coaxial_velo.x)**2 + (coaxial_velo.y)**2 + (coaxial_velo.z)**2);
    return coaxial_velo };
}
module.exports = {coaxial_velocity: coaxial_velocity,
                  displacement: displacement,
                  coaxial_displacement: coaxial_displacement,
                  axial_velocity: axial_velocity }
