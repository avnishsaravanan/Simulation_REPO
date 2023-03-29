const BABYLON = require("babylonjs");
const custom = require("./customs.js");
const simselect = require("./simselect.js");
let velos = require("./velocity_codes.js");
//let result = require("./inputs.js").result;
const raddeg = velos.radians_degrees;
const axial_velocity = velos.axial_velocity;
const displacement = velos.displacement;

let oldpoints;
let oldvectoptions = {points: oldpoints, updatable: true}; let newvector;

function synthObject (scene, objspecs, synthindex) {
    let object;
    let param = objspecs[synthindex];
    let color = new BABYLON.Color4.FromHexString(param[3]);
    let input_param = {diameter: param[1], segments: 20};
    object = BABYLON.MeshBuilder.CreateSphere(param[0], input_param, scene);
    let mat = new BABYLON.StandardMaterial('', scene);
    mat.diffuseColor = color;
    //mat.specularColor = new BABYLON.Color4(1, 1, 1, 0.5);
    object.material = mat;
    object.position = new BABYLON.Vector3(param[4], param[5], param[6]);
    return object; 
}

function synthVector (scene, obj1, obj2) { //vectline works, arrowpts yet to debug
    let dis = displacement(obj2, obj1); 
    let factor = dis.total;
    let newpoints = [new BABYLON.Vector3(obj1[0], obj1[1], obj1[2]).add(new BABYLON.Vector3(3, 3, 3)), new BABYLON.Vector3(obj2[0], obj2[1], obj2[2]).subtract(new BABYLON.Vector3(3, 3, 3))];
    //let newpoints2 = [newpoints[1], newpoints[0].add(new BABYLON.Vector3(factor * 0.5, factor * 0.1, 0))];
    //let newvector = new BABYLON.MeshBuilder.CreateLines("new", {points: newpoints, updatable: true}, scene);
    //let newvector2 = new BABYLON.MeshBuilder.CreateLines("new2", {points: newpoints2}, scene);
    //let newpoints3 = [newpoints[1], newpoints[0].add(new BABYLON.Vector3(factor * 0.5, factor * -0.1, 0))];
    //let newvector3 = new BABYLON.MeshBuilder.CreateLines("new3", {points: newpoints3}, scene);
    //let vectpts = [[new BABYLON.Vector3.Zero(), new BABYLON.Vector3(factor, 0, 0)]];
    
    /*let refvect = new BABYLON.TransformNode("root");
    refvect.position = new BABYLON.Vector3.Zero();
        
    //calculation of midpoint
    let term1 = new BABYLON.Vector3(dis.x/2, dis.y/2, dis.z/2);
    let term2 = new BABYLON.Vector3 (obj1[0], obj1[1], obj1[2]);
    let centre = term1.add(term2);
    
    let arrowpts = [new BABYLON.Vector3(0, (0.2 * factor), 0), new BABYLON.Vector3(0.3 * factor, 0, 0),
                    new BABYLON.Vector3(0, (-0.2 * factor), 0),  new BABYLON.Vector3(0, (0.2 * factor), 0)];
            
    let trans = vectpts[0][1].subtract(vectpts[0][0]).scale(0.5).x;
    arrowpts.forEach(function(n) { n.x += trans; });
    vectpts.push(arrowpts);
   
    let vect2 = BABYLON.MeshBuilder.CreateLineSystem("arrow", {lines: vectpts, updatable: true}, scene);
    vect2.parent = refvect;
    let posync = Math.sqrt(centre.x**2 + centre.y**2 + centre.z**2);

    vect2.rotate(BABYLON.Axis.Y, -Math.atan(dis.z/dis.x), BABYLON.Space.WORLD);
    vect2.rotate(BABYLON.Axis.Z, Math.atan(dis.y/dis.x), BABYLON.Space.WORLD);
    //vect2.rotate(BABYLON.Axis.X, -Math.atan(dis.y/dis.z), BABYLON.Space.WORLD);
    vect2.translate(BABYLON.Axis.X, (posync/10), BABYLON.Space.LOCAL);*/

    //return {node: refvect, vector: vect2, rot: (vect2.rotationQuaternion.toEulerAngles()) };
    //return newvector;
}

function synthPointer (scene, obj, velo) {
    let length1 = Math.sqrt(velo.x**2 + velo.y**2, velo.z**2);
    let factor = length1 * 5;
    let vectpts = [new BABYLON.Vector3.Zero(), new BABYLON.Vector3(factor, 0, 0)];
    let arrowpts = [new BABYLON.Vector3(factor, (0.1 * factor), 0), new BABYLON.Vector3((0.4 * factor) + factor, 0, 0), new BABYLON.Vector3(factor, (-0.1 * factor), 0)];
    vectpts.push(arrowpts);
    let pointer = new BABYLON.LinesMesh;
    pointer = new BABYLON.MeshBuilder.CreateLineSystem("ptr", {lines: vectpts, updatable: true}, scene);
    let ptrorient = pointer.rotationQuaternion.toEulerAngles();
    while (!(ptrorient.x == Math.atan(velo.y/velo.z))) { pointer.rotate(BABYLON.Axis.X, raddeg(0.1, 0), BABYLON.Space.LOCAL); };
    while (!(ptrorient.y == Math.atan(velo.z/velo.x))) { pointer.rotate(BABYLON.Axis.Y, raddeg(0.1, 0), BABYLON.Space.LOCAL); };
    while (!(ptrorient.z == Math.atan(velo.y/velo.x))) { pointer.rotate(BABYLON.Axis.Z, raddeg(0.1, 0), BABYLON.Space.LOCAL); };
    pointer.position = obj.position;
}

function augment (obj1, obj2, pos1, pos2, velo1, velo2, vector, node, pointer1, pointer2, scene) {
    
    //node.position = obj1.position;
    //pointer1.position = obj1.position;
    //pointer2.position = obj2.position;
    //vector.translate(BABYLON.Axis.X, 10, BABYLON.Space.LOCAL);

    if ((obj1.position.x - pos1[0]) <= 100 || (obj1.position.y - pos1[1]) <= 100 || (obj1.position.z - pos1[2]) <= 100 ) {
        obj1.position.x += 5 * velo1.x;
        obj1.position.y += 5 * velo1.y;
        obj1.position.z += 5 * velo1.z; }
    if ((obj2.position.x - pos1[0]) <= 100 || (obj2.position.y - pos1[1]) <= 100 || (obj2.position.z - pos1[2]) <= 100 ) {
        obj2.position.x += 5 * velo2.x;
        obj2.position.y += 5 * velo2.y;
        obj2.position.z += 5 * velo2.z; }
    
    //let disref = displacement (pos2, pos1);
    let dis = displacement([obj2.position.x, obj2.position.y, obj2.position.z], 
                           [obj1.position.x, obj1.position.y, obj1.position.z]);
    let disref = displacement(pos2, pos1);
 
    let factor = dis.total;
    let newpoints = [new BABYLON.Vector3(obj1.position.x, obj1.position.y, obj1.position.z).add(new BABYLON.Vector3(3, 3, 3)), new BABYLON.Vector3(obj2.position.x, obj2.position.y, obj2.position.z).subtract(new BABYLON.Vector3(3, 3, 3))];
    newvector = new BABYLON.MeshBuilder.CreateLines("new", {points: newpoints}, scene);

    //let angle1 = Math.atan(dis.z/dis.x); let angle2 = Math.atan(dis.y/dis.x); let angle3 = Math.atan(dis.z/dis.y); let ref = vector.rotationQuaternion.toEulerAngles();
    //let angle1r = ref.y; let angle2r = ref.z; let angle3r = ref.x;

    //let node1 = new BABYLON.Vector3(0, 1, 0); let node2 = new BABYLON.Vector3(1, 0, 0); let node3 = new BABYLON.Vector3(0, 0, 1)
    
    //vector.rotate(BABYLON.Axis.X, Math.PI/60, BABYLON.Space.LOCAL);

    /*while (!(angle1r == angle1)) { vector.rotate(node.position.add(node1), ((angle1 - angle1r)-0.2), BABYLON.Space.WORLD); };
    while (!(angle2r == angle2)) { vector.rotate(node.position.add(node2), ((angle2 - angle2r)-0.2), BABYLON.Space.WORLD); }
    while (!(angle3r == angle3)) { vector.rotate(node.position.add(node3), ((angle3 - angle3r)-0.2), BABYLON.Space.WORLD); }
    /*vector.rotate(BABYLON.Axis.Z, raddeg(90, 0), BABYLON.Space.LOCAL);
    vector.rotate(BABYLON.Axis.Y, raddeg(90, 0), BABYLON.Space.LOCAL);
    vector.rotate(BABYLON.Axis.X, raddeg(90, 0), BABYLON.Space.LOCAL); */
    /*let orient = function (a, b, c, velo, nde, pointer) { while (!(pointer.rotation[a] == Math.atan(velo[b]/velo[c]))) { vector.rotate(node.position.add(nde), Math.atan(velo[b]/velo[c])-0.1, BABYLON.Space.WORLD); }};
    orient('x', 'y', 'z', velo1, node2, pointer1); orient('y', 'z', 'x', velo1, node1, pointer1); orient('z', 'y', 'x', velo1, node3, pointer1);
    orient('x', 'y', 'z', velo2, node2, pointer2); orient('y', 'z', 'x', velo2, node1, pointer2); orient('z', 'y', 'x', velo2, node3, pointer2);
    vector.scaling.x = (dis.total/disref.total);*/
    //vector.translate(BABYLON.Axis.X, (dis.total/2 - dis.total/10), BABYLON.Space.LOCAL);
}

function eventplot (pos1, pos2, e, scene) {
    let ev = new BABYLON.Mesh;
    let mat1 = new BABYLON.StandardMaterial; mat1.emissiveColor = new BABYLON.Color3(1, 0, 0);
    let mat2 = new BABYLON.StandardMaterial; mat2.emissiveColor = new BABYLON.Color3(0, 0, 1);

    if (e == 'e1') { ev = BABYLON.MeshBuilder.CreateBox('e1', { size: 2.5 }, scene) 
    ev.material = mat1; ev.position = new BABYLON.Vector3(pos1[0], pos1[1], pos1[2]) };
    
    if (e == 'e2') { ev = BABYLON.MeshBuilder.CreateBox('e2', { size: 2.5 }, scene); 
    ev.material = mat2; ev.position = new BABYLON.Vector3(pos2[0], pos2[1], pos2[2]) };
    
    return ev };

function staticMatrix (objspecs, synthindex, scene) {
    
    let ribbons1 = [];
    let param = objspecs[synthindex];
    const inc1 = Math.E**(param[2]/25);
    const inc2 = Math.E**(param[2]/4.348); console.log(inc1, inc2, "from matrix");
    const init = param[1]/2 + 5;
    const objpos = new BABYLON.Vector3(param[4], param[5], param[6]);
for (a2 = 0; a2 == Math.PI; a2 += Math.PI/inc2) { //Y-Z
    let layer = [];
    for (r = init; r == 200; r += (200-init)/inc1) { // layer of geodesics
        let circle = [];
        for (a1 = 0; a1 == 2 * Math.PI; a1 += 2 * Math.PI/30) { // single circle
            let point = new BABYLON.Vector3(r * cos(a1), r*sin(a1)*cos(a2), r*sin(a1)*sin(a2));
            circle.push(point); circle.push(circle[0]); }
        layer.push(circle); console.log(layer); }
    const ribbon1 = BABYLON.MeshBuilder.CreateRibbon('layer', {pathArray: layer, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
    ribbons1.push(ribbon1); }
    const ribbons2 = []; const ribbons3 = [];
    ribbons1.forEach(function(ribbon) { let ribbon2 = ribbon.clone('layer2'); ribbon2.rotate(BABYLON.Axis.Z, Math.PI/2, BABYLON.Space.WORLD); ribbon2.position = objpos; ribbons2.push(ribbon2) }); //X-Z
    ribbons1.forEach(function(ribbon) { let ribbon3 = ribbon.clone('layer2'); ribbon2.rotate(BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.WORLD); ribbon3.position = objpos; ribbons3.push(ribbon3) }); //X-Y
    ribbons1.forEach(function(ribbon) {ribbon.position = objpos}); 
}


function render (masses, velo, positions, array, timelim2, checks) {
    let timetrack = 0; let simoff = false; let userel = null;
    const stopbtn = document.getElementById("simstop"); stopbtn.onclick = function() { simoff = true; };
    const reset = document.getElementById("rstcam"); const simrun = document.getElementById("simbtn");
    const rel = document.getElementById("absrel"); if (rel.checked) { userel = true } else { userel = false };
    let timelim1 = Number(document.getElementById("e1time").value); 
    let e1 = Array.from(document.getElementsByName("e1xyz")); let e1pos = e1.map(n => Number(n.value) );
    let e2 = Array.from(document.getElementsByName("e2xyz")); let e2pos = e2.map(n => Number(n.value) );
    let start = Date.now()/1000;
    let checked = checks;
    const canvas = document.getElementById("renderCanvas"); canvas.addEventListener("wheel", event => event.preventDefault());
    const engine = new BABYLON.Engine(canvas, true);
    let simmsg = new custom.CustomAlert();
    let properties = simselect(masses, velo, positions, checked, null, "graphics");

    function createScene() {
    const scene = new BABYLON.Scene(engine);
    let primary = 100;
    
    const camera = new BABYLON.ArcRotateCamera('', raddeg(0, 0), raddeg(70, 0), 400, new BABYLON.Vector3(300, 300, 400), scene, true);
    camera.upperAlphaLimit = raddeg(180, 0); camera.lowerAlphaLimit = raddeg(-180, 0);
    camera.upperBetaLimit = raddeg(180, 0); camera.lowerBetaLimit = raddeg(-180, 0);
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight('', new BABYLON.Vector3.Zero(), scene); 
    let properties = simselect(masses, velo, positions, checked, null, "graphics");

    if (properties.BG == "black") { scene.clearColor = new BABYLON.Color4(0, 0, 0, 1); }
    else { scene.clearColor = new BABYLON.Color4(0, 0, 0.6, 0.9); let ground = new BABYLON.MeshBuilder.CreatePlane('grnd', {size: 400, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene); ground.rotate(BABYLON.Axis.X, Math.PI/2, BABYLON.Space.WORLD); ground.position.x += 100; ground.position.z += 100;
           let groundmat = new BABYLON.StandardMaterial; groundmat.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5), ground.material = groundmat
           camera.radius -= 50 };
    
    let originpts = [[new BABYLON.Vector3(0, 0, 0),
                      new BABYLON.Vector3(primary, 0, 0)],
                      [new BABYLON.Vector3(0, 0, 0),
                      new BABYLON.Vector3(0, primary, 0)],
                      [new BABYLON.Vector3(0, 0, 0),
                      new BABYLON.Vector3(0, 0, primary) ]];
       
    const originset = BABYLON.MeshBuilder.CreateLineSystem('originset', {lines: originpts}, scene);
    let originpt2 = [[new BABYLON.Vector3((0.9 * primary), (0.03 * primary), 0), new BABYLON.Vector3(primary, 0, 0), 
        new BABYLON.Vector3((0.9 * primary), (-0.03 * primary), 0)]];
       
    arrows = [];
    arrows[0] = new BABYLON.MeshBuilder.CreateLineSystem("arrowsX", {lines: originpt2}, scene);
    arrows[1] = arrows[0].clone();
    arrows[1].rotate(BABYLON.Axis.Z, Math.PI/2, BABYLON.Space.WORLD);
    arrows[2] = arrows[1].clone();
    arrows[2].rotate(BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.WORLD);
    arrows[2].rotate(BABYLON.Axis.X, Math.PI/2, BABYLON.Space.WORLD);

    //sim objects
    let current0 = new BABYLON.Mesh("obj1");
    current0 = synthObject(scene, array, checked[0]);
    let pos1 = positions[checked[0]]; console.log(current0.position);
    let current1 = new BABYLON.Mesh("obj2");
    current1 = synthObject(scene, array, checked[1]);
    let pos2 = positions[checked[1]];
    let velo1 = axial_velocity(velo[checked[0]]); let velo2 = axial_velocity(velo[checked[1]]); console.log('from render', velo1, velo2)
    if (!!userel) { let temp = velo2;
                    velo2 = {x: Math.abs(temp.x - velo1.x),
                             y: Math.abs(temp.y - velo1.y),
                             z: Math.abs(temp.z - velo1.z) }
                    velo1 = {x: 0, y: 0, z: 0}}
    let node = null; let vect1 = null;
    //if (!!properties.augment) { vect1 = synthVector(scene, pos1, pos2); };
    //node = vect1.node vect2 = vect1.vector; };

    reset.onclick = function() { camera.position = new BABYLON.Vector3(300 + Math.cos(70)*400, 300 + Math.cos(70)*400, 300); };
    let e1Mesh = eventplot(e1pos, e2pos, 'e1', scene); let e2Mesh = eventplot(e1pos, e2pos, 'e2', scene); e1Mesh.setEnabled(false); e2Mesh.setEnabled(false);
    
    oldvectoptions.points = [new BABYLON.Vector3(pos1[0], pos1[1], pos1[2]), new BABYLON.Vector3(pos2[0], pos2[1], pos2[2])];
    newvector = new BABYLON.MeshBuilder.CreateLines("old", oldvectoptions, scene); oldvectoptions.instance = newvector;
    if (!!properties.ST) { staticMatrix(array, checked[1], scene) };

    scene.registerBeforeRender(function () {
        if (!properties.augment) { augment(current0, current1, pos1, pos2, velo1, velo2, vect1, node, null, null, scene) };
        timetrack = (Date.now()/1000) - start;
        if (timetrack >= timelim1) { e1Mesh.setEnabled(true) }; 
        if (timetrack >= timelim2) { e2Mesh.setEnabled(true) };
        if (timetrack > timelim1) { e1Mesh.rotation.x += 0.1; e1Mesh.rotation.y += 0.1, e1Mesh.rotation.z += 0.1 };
        if (timetrack > timelim2) { e2Mesh.rotation.x += 0.1; e2Mesh.rotation.y += 0.1; e2Mesh.rotation.z += 0.1 };
    })

    return scene; }

    let toRender = createScene();
    engine.runRenderLoop(function () {
        if (timetrack >= (timelim2 + 5) || !!simoff) { 
            custom.simtimer.simtimestop();
            custom.simtimer.simtimereset();
            engine.stopRenderLoop();
            simrun.disabled = false; 
            rel.disabled = false;
            simmsg.alert(properties.simmsg, "Simulation concluded")
            document.getElementById('okbtn').onclick = function() {event.preventDefault(); simmsg.ok() };
        } else { 
            custom.simtimer.setsimtime(timelim2 + 5);
            toRender.render();
            simrun.disabled = true;
            rel.disabled = true;
        }
    })
    
    window.addEventListener("resize", function () {
        engine.resize();
      });
}
    module.exports = render;

