let BABYLON = require("babylonjs");
console.log("from render1: before require interaction js");
//let interaction = require("./interaction.js");
console.log("from render1: after require interaction js");
//let result = require("./inputs.js").result;

let checked = [];
let objects = interaction.arrsimobjects;
//let velocities = interaction.velocities;
let positions = interaction.positions;
//let masses = interaction.masses;

const canvas = document.querySelector("#renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

function synthObject (scene, synthindex) {
    let object;
    let param = objects[synthindex];
    let color = new BABYLON.Color4.FromHexString(param[3]);
    let input_param = {diameter: param[1], segments: 20};
    object = BABYLON.MeshBuilder.CreateSphere(param[0], input_param, scene);
    mat = new BABYLON.StandardMaterial('', scene);
    mat.diffuseColor = color;
    //mat.specularColor = new BABYLON.Color4(1, 1, 1, 0.5);
    object.material = mat;
    return object; 
}

function createScene () {
    let scene = BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera('', Math.PI*2, Math.PI, 1, new BABYLON.Vector3(10, 10, 10), scene);
    const light = new BABYLON.HemisphericLight('', new BABYLON.Vector3.Zero(), scene);
    let originpts = [[new BABYLON.Vector3(-1, 0, 0),
                     new BABYLON.Vector3(1, 0, 0)],
                     [new BABYLON.Vector3(0, -1, 0),
                     new BABYLON.Vector3(0, 1, 0)],
                     [new BABYLON.Vector3(0, 0, -1),
                     new BABYLON.Vector3(0, 0, 1) ]]
    
    originset = BABYLON.MeshBuilder.CreateLineSystem('originset', {points: originpts}, scene);
        
    let current0 = synthObject(scene, checked[0]);
    current0.position = positions[checked[0]];
    let current1 = synthObject(scene, checked[1]);
    current1.position = positions[checked[1]];

    }
