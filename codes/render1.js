let BABYLON = require("babylonjs");
const custom = require("./customs.js");
let velos = require("./velocity_codes.js");
//let result = require("./inputs.js").result;

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
    let dis = velos.displacement(obj2, obj1); 
    let factor = dis.total / 5;
    
    let vectpts1 = [new BABYLON.Vector3(obj1[0], obj1[1], obj1[2]), new BABYLON.Vector3(obj2[0], obj2[1], obj2[2])]
    let vectline = BABYLON.MeshBuilder.CreateLines("vector", {points: vectpts1}, scene);
    vectline.scaling.x = 0.2; vectline.scaling.y = 0.2; vectline.scaling.z = 0.2;

    //alternative (will probably need this as rotation isnt working)
    /*let angle = -1 * Math.atan(dis.y/Math.sqrt(dis.x**2 + dis.z**2));
    let arrowpts1 = (0.5 * (dis.total/5) * Math.cos(angle)) - (0.03 * (dis.total/5) * Math.sin(angle));
    let arrowpts2 = (0.5 * (dis.total/5) * Math.sin(angle)) + (0.03 * (dis.total/5) * Math.cos(angle));
    arrowpts = [[arrowpts1, term1, arrowpts2]]; */

    let term1 = new BABYLON.Vector3(dis.x / 2, dis.y / 2, dis.z / 2);
    //add(vectpts1[0]));
    vectline.position = term1;

    let arrowpts = [[new BABYLON.Vector3((0.1 * factor), (0.03 * factor), 0), term1,
                    new BABYLON.Vector3((-0.1 * factor), (-3 * factor), 0) ]];
    let arrow = BABYLON.MeshBuilder.CreateLineSystem("arrowhead", {lines: arrowpts, updatable: true}, scene);
    arrow.position = term1;
    arrow.rotation = vectline.rotation;
}


function render (masses, velo, positions, array) {
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
    //current0.position = positions[checked[0]];
    let current1 = new BABYLON.Mesh("obj2");
    current1 = synthObject(scene, array, checked[1]);
    //current1.position = positions[checked[1]]; 

    scene.registerBeforeRender(function () {
        synthVector(scene, positions[0], positions[1]);
    })

    return scene; }

    let toRender = createScene();
    engine.runRenderLoop(function () {
        toRender.render(); 
        /*chk = customs.progressbar(starttime);
        if (chk) {
            //
        }*/
    });

    window.addEventListener("resize", function () {
        engine.resize();
      });
}
    module.exports = render;

