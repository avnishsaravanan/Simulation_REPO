let BABYLON = require("babylonjs");
let interaction = require("./interaction.js"); 
//let result = require("./inputs.js").result;

let checked = [];
let objects = interaction.arrsimobjects;
//let velocities = interaction.velocities;
let positions = interaction.positions;
//let masses = interaction.masses;

const canvas = document.getElementById("renderCanvas");
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
    let primary;
    const origin = new BABYLON.Mesh;

    const camera = new BABYLON.ArcRotateCamera('', Math.PI*2, Math.PI, 1, new BABYLON.Vector3(10, 10, 10), scene);
    const light = new BABYLON.HemisphericLight('', new BABYLON.Vector3.Zero(), scene);
    let originpts = [[new BABYLON.Vector3(-1 * primary, 0, 0),
                     new BABYLON.Vector3(primary, 0, 0)],
                     [new BABYLON.Vector3(0, -1 * primary, 0),
                     new BABYLON.Vector3(0, primary, 0)],
                     [new BABYLON.Vector3(0, 0, -1 * primary),
                     new BABYLON.Vector3(0, 0, primary) ]]
    
    let originset = BABYLON.MeshBuilder.CreateLineSystem('originset', {points: originpts}, scene);

    //show arrows (on/off?)
    let originpt2 = [new BABYLON.Vector3(0.9 * primary, 0.03 * primary, 0), new BABYLON.Vector3(primary, 0, 0), new BABYLON.Vector3(0.9 * primary, -0.03 * primary, 0)];
    arrows = [];
    arrows[0] = new BABYLON.MeshBuilder.CreateLines('arrowsX', {points: originpt2, updatable: true}, scene);
    arrows[1] = arrows[0].clone();
    arrows[1].rotate(BABYLON.Axis.Z, Math.PI/2, BABYLON.Space.WORLD);
    arrows[2] = arrows[1].clone();
    arrows[2].rotate(BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.LOCAL);
    arrows[2].rotate(BABYLON.Axis.X, Math.PI/2, BABYLON.Space.WORLD)
    arrows.forEach(function(ind) { origin = BABYLON.Mesh.MergeMeshes([arrows[ind], originset], true); return newMesh })
    
    //sim objects
    let current0 = synthObject(scene, checked[0]);
    current0.position = positions[checked[0]];
    let current1 = synthObject(scene, checked[1]);
    current1.position = positions[checked[1]];
    
    }
