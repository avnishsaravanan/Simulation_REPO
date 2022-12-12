let BABYLON = require("babylonjs");
<<<<<<< HEAD

let velos = require("./velocity_codes");
=======
const custom = require("./customs.js");
let velos = require("./velocity_codes.js");
>>>>>>> new-infogrid
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
    let factor = dis.total / 3;
    
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

    vect2.rotate(BABYLON.Axis.Y, -Math.atan(dis.z/dis.x), BABYLON.Space.WORLD);
    vect2.rotate(BABYLON.Axis.Z, Math.atan(dis.y/dis.x), BABYLON.Space.WORLD);
    //vect2.rotate(BABYLON.Axis.X, -Math.atan(dis.y/dis.z), BABYLON.Space.WORLD);
    vect2.translate(new BABYLON.Vector3(dis.x, dis.y, dis.z).normalize(), 
                       (Math.sqrt(centre.x**2 + centre.y**2 + centre.z**2))/10,
                       BABYLON.Space.WORLD);

    return {node: refvect, vector: vect2};
}

<<<<<<< HEAD
function augment (obj1, obj2, pos1, pos2, velo1, velo2, vector, node) {

    node.position = obj1.position;
    if ((obj1.position.x - pos1[0]) >= 100 ||
        (obj1.position.y - pos1[1]) >= 100 ||
        (obj1.position.z - pos1[2]) >= 100 ) {}
    
    else {
    obj1.position.x += 0.1 * velo1.x;
    obj1.position.y += 0.1 * velo1.y;
    obj1.position.z += 0.1* velo1.z; }

    if ((obj2.position.x - pos2[0]) >= 100 ||
        (obj2.position.y - pos2[1]) >= 100 ||
        (obj2.position.z - pos2[2]) >= 100 ) {}

    else {
    obj2.position.x += 0.1 * velo2.x;
    obj2.position.y += 0.1 * velo2.y;
    obj2.position.z += 0.1 * velo2.z; }

    //let disref = displacement (pos2, pos1);
    let dis = displacement([obj2.position.x, obj2.position.y, obj2.position.z], 
                           [obj1.position.x, obj1.position.y, obj1.position.z]);
    let angle1 = raddeg(Math.atan(dis.z/dis.x));
    let angle2 = raddeg(Math.atan(dis.y/dis.z));
    let angle3 = raddeg(Math.atan(dis.y/dis.x))
    
    let node1 = new BABYLON.Vector3(0, 1, 0); let node2 = new BABYLON.Vector3(1, 0, 0); let node3 = new BABYLON.Vector3(0, 0, 1)
    
    vector.rotate(BABYLON.Axis.X, Math.PI/60, BABYLON.Space.LOCAL);

    if (vector.rotation.y >= angle1) { vector.rotate(node.position.add(node1), raddeg(Math.atan(dis.z/dis.x)), BABYLON.Space.WORLD); };
    if (vector.rotation.y <= angle1) { vector.rotate(node.position.add(node1), raddeg(-Math.atan(dis.z/dis.x)), BABYLON.Space.WORLD); };

    if (vector.rotation.x >= angle2) { vector.rotate(node.position.add(node2), raddeg(Math.atan(dis.y/dis.z)), BABYLON.Space.WORLD); };
    if (vector.rotation.x <= angle2) { vector.rotate(node.position.add(node2), raddeg(-Math.atan(dis.y/dis.z)), BABYLON.Space.WORLD); };

    if (vector.rotation.z >= angle3) { vector.rotate(node.position.add(node3), raddeg(Math.atan(dis.y/dis.x)), BABYLON.Space.WORLD); };
    if (vector.rotation.z <= angle3) { vector.rotate(node.position.add(node3), raddeg(-Math.atan(dis.y/dis.x)), BABYLON.Space.WORLD); };

    console.log("exec", (raddeg(Math.atan(dis.z/dis.x)) - vector.rotation.y));
}

function render (masses, velo, positions, array, timelim) {
    let timetrack = 0;
=======

function render (masses, velo, positions, array) {
>>>>>>> new-infogrid
    const canvas = document.getElementById("renderCanvas");
    const engine = new BABYLON.Engine(canvas, true);

    function createScene() {

    let scene = new BABYLON.Scene(engine);
    let primary = 10;
    const origin = new BABYLON.Mesh;

    const camera = new BABYLON.ArcRotateCamera('', Math.PI*2, Math.PI, 10, new BABYLON.Vector3.Zero(), scene);
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
    let node = vect1.node; let vect2 = vect1.vector;

    scene.registerBeforeRender(function () {
        augment(current0, current1, pos1, pos2, velo1, velo2, vect2, node);
    })

    return scene; }

    let toRender = createScene();
    engine.runRenderLoop(function () {
<<<<<<< HEAD
        timetrack += 1/60;
        if (timetrack >= timelim) { engine.stopRenderLoop() }
        else { toRender.render(); }} )
    
=======
        toRender.render(); 
        /*chk = customs.progressbar(starttime);
        if (chk) {
            //
        }*/
    });

>>>>>>> new-infogrid
    window.addEventListener("resize", function () {
        engine.resize();
      });
}
    module.exports = render;

