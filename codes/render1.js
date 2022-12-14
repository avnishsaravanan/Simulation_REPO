let BABYLON = require("babylonjs");
const custom = require("./customs.js");
let velos = require("./velocity_codes.js");
//let result = require("./inputs.js").result;
let raddeg = velos.radians_degrees;
let axial_velocity = velos.axial_velocity;
let displacement = velos.displacement;

let checked = [0, 1];

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
    
    let vectpts = [[new BABYLON.Vector3.Zero(), new BABYLON.Vector3(factor, 0, 0)]];
    
    let refvect = new BABYLON.TransformNode("root");
    refvect.position = new BABYLON.Vector3.Zero();
        
    //calculation of midpoint
    let term1 = new BABYLON.Vector3(dis.x/2, dis.y/2, dis.z/2);
    let term2 = new BABYLON.Vector3(obj1[0], obj1[1], obj1[2]);
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
    vect2.translate(BABYLON.Axis.X, (posync/10), BABYLON.Space.LOCAL);

    return {node: refvect, vector: vect2, rot: (vect2.rotationQuaternion.toEulerAngles()) };
}

function augment (obj1, obj2, pos1, pos2, velo1, velo2, vector, node) {

    node.position = obj1.position;
    //vector.translate(BABYLON.Axis.X, 10, BABYLON.Space.LOCAL);

    if ((obj1.position.x - pos1[0]) >= 100 ||
        (obj1.position.y - pos1[1]) >= 100 ||
        (obj1.position.z - pos1[2]) >= 100 ) {}
    
    else {
    obj1.position.x += 0.1 * -velo1.x;
    obj1.position.y += 0.1 * velo1.y;
    obj1.position.z += 0.1 * -velo1.z; }

    if ((obj2.position.x - pos2[0]) >= 100 ||
        (obj2.position.y - pos2[1]) >= 100 ||
        (obj2.position.z - pos2[2]) >= 100 ) {}

    else {
    obj2.position.x += 0.1 * -velo2.x;
    obj2.position.y += 0.1 * velo2.y;
    obj2.position.z += 0.1 * -velo2.z; }

    //let disref = displacement (pos2, pos1);
    let dis = displacement([obj2.position.x, obj2.position.y, obj2.position.z], 
                           [obj1.position.x, obj1.position.y, obj1.position.z]);
    let disref = displacement(pos2, pos1);

    let angle1 = Math.atan(dis.z/dis.x); let angle2 = Math.atan(dis.y/dis.x); let angle3 = Math.atan(dis.z/dis.y); let ref = vector.rotationQuaternion.toEulerAngles();
    let angle1r = ref.y; let angle2r = ref.z; let angle3r = ref.x;

    let node1 = new BABYLON.Vector3(0, 1, 0); let node2 = new BABYLON.Vector3(1, 0, 0); let node3 = new BABYLON.Vector3(0, 0, 1)
    
    //vector.rotate(BABYLON.Axis.X, Math.PI/60, BABYLON.Space.LOCAL);

    if (!(angle1r == angle1)) { vector.rotate(node.position.add(node1), (angle1 - angle1r), BABYLON.Space.WORLD); };
    if (!(angle2r == angle2)) { vector.rotate(node.position.add(node2), (angle2 - angle2r), BABYLON.Space.WORLD); }
    if (!(angle3r == angle3)) { vector.rotate(node.position.add(node3), (angle3 - angle3r), BABYLON.Space.WORLD); }
    vector.rotate(BABYLON.Axis.Z, raddeg(90, 0), BABYLON.Space.LOCAL);
    vector.rotate(BABYLON.Axis.Y, raddeg(90, 0), BABYLON.Space.LOCAL);
    vector.rotate(BABYLON.Axis.X, raddeg(90, 0), BABYLON.Space.LOCAL);

    vector.scaling.x = (dis.total/disref.total);
    //vector.translate(BABYLON.Axis.X, (dis.total/2 - dis.total/10), BABYLON.Space.LOCAL);
    
    //console.log(angle3 - angle3r); 
}

function render (masses, velo, positions, array, timelim2) {
    let timetrack = 0; let off = false;
    let stopbtn = document.getElementById("simstop"); stopbtn.onclick = function() { off = true; };
    let reset = document.getElementById("rstcam"); 
    let timelim1 = Number(document.getElementById("e1time").value); 
    let e1pos = Array.from(document.getElementsByName("e1xyz")); e1pos.forEach(function(n) { Number(n); });
    let e2pos = Array.from(document.getElementsByName("e2xyz")); e2pos.forEach(function(n) { Number(n); });

    const canvas = document.getElementById("renderCanvas");
    const engine = new BABYLON.Engine(canvas, true);

    function eventplot (timelim1, timelim2, pos1, pos2, scene) {
        let e1 = null; let e2 = null;
        let mat1 = new BABYLON.StandardMaterial; mat1.emissiveColor = new BABYLON.Color3(1, 0, 0);
        let mat2 = new BABYLON.StandardMaterial; mat2.emissiveColor = new BABYLON.Color3(0, 0, 1);
    
        if (timetrack >= timelim1) { e1 = BABYLON.MeshBuilder.CreateBox('e1', { size: 1.5 }, scene); e1.material = mat1; 
                                                                        e1.position = new BABYLON.Vector3(pos1[0], pos1[1], pos1[2]) };
        if (timetrack >= (timelim2-5)) { e2 = BABYLON.MeshBuilder.CreateBox('e2', { size: 1.5 }, scene); e2.material = mat2 
                                                                        e2.position = new BABYLON.Vector3(pos2[0], pos2[1], pos2[2]) };
        return {e1: e1, e2: e2}; }

    function createScene() {

    let scene = new BABYLON.Scene(engine);
    let primary = 100;
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);

    const camera = new BABYLON.ArcRotateCamera('', raddeg(180, 0), 0, 100, new BABYLON.Vector3(100, 0, 0), scene);
    camera.upperAlphaLimit = raddeg(180, 0); camera.lowerAlphaLimit = raddeg(-180, 0);
    camera.upperBetaLimit = raddeg(180, 0); camera.lowerBetaLimit = raddeg(-180, 0);
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight('', new BABYLON.Vector3.Zero(), scene); 
     
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
    let pos1 = positions[checked[0]];
    
    let current1 = new BABYLON.Mesh("obj2");
    current1 = synthObject(scene, array, checked[1]);
    let pos2 = positions[checked[1]];
    let velo1 = axial_velocity(velo[checked[0]]); let velo2 = axial_velocity(velo[checked[1]]);

    let vect1 = synthVector(scene, pos1, pos2);
    let node = vect1.node; let vect2 = vect1.vector; let rot1 = vect1.rot.y; let rot2 = vect1.rot.z;

    reset.onclick = function() { camera.position = new BABYLON.Vector3(100, 0, 0); camera.target = new BABYLON.Vector3(100, 0, 0); };

    scene.registerBeforeRender(function () {
        augment(current0, current1, pos1, pos2, velo1, velo2, vect2, node);
        timetrack += 1/60;
        let e1Mesh = eventplot(timelim1, timelim2, e1pos, e2pos, scene).e1;
        if (timetrack >= timelim1) { e1Mesh.rotation.x += 0.1; e1Mesh.rotation.y += 0.1; e1Mesh.rotation.z += 0.1; }
        let e2Mesh = eventplot(timelim1, timelim2, e1pos, e2pos, scene).e2;
        if (timetrack >= timelim2) { e2Mesh.rotation.x += 0.1; e2Mesh.rotation.y += 0.1; e2Mesh.rotation.z += 0.1; }
    })

    return scene; }

    let toRender = createScene();
    engine.runRenderLoop(function () {
        if ((timetrack >= timelim2) || off == true) { engine.stopRenderLoop(); }
        else { toRender.render(); }} );
    
    window.addEventListener("resize", function () {
        engine.resize();
      });
}
    module.exports = render;

