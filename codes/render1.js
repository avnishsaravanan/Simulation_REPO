let BABYLON = require("babylonjs");
const { ssao2PixelShader } = require("babylonjs/Shaders/ssao2.fragment");
let stores = require("./simulation.js");
let result = require("./inputs.js").result;

let checked = [];
let objects = stores.objects;
let velocities = stores.velocities;
let positions = stores.positions;
let masses = stores.masses;

let canvas = document.querySelector("#renderCanvas");
let engine = new BABYLON.Engine(canvas, true);
let scene = BABYLON.Scene(engine);

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
    let originpts = [[new BABYLON.Vector3(-1, 0, 0),
                     new BABYLON.Vector3(1, 0, 0)],
                     [new BABYLON.Vector3(0, -1, 0),
                     new BABYLON.Vector3(0, 1, 0)],
                     [new BABYLON.Vector3(0, 0, -1),
                     new BABYLON.Vector3(0, 0, 1) ]]
    
    originset = BABYLON.MeshBuilder.CreateLineSystem('originset', {points: origin}, scene);
        
    let current0 = synthObject(scene, checked[0]);
    current0.position = positions[checked[0]];
    let current1 = synthObject(scene, checked[1]);
    current1.position = positions[checked[1]];

    
    }
