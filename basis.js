//function to declare new object variables - done
//function to assign defualt values - for mass, velocity values, position
//function beforeRender() to change position in simulation
//function for converting between axes

let BABYLON = require("./node_modules/babylonjs");
let inputParameters = [];
let object; 
let objectCoordinate;
let objects = [];
let objectindex = 0;
let velocities = [];
let masses = [];

function axial_velocity(velocity, index) {
    if (!!velocity[1]) {veloX = velocity[0] * Math.cos(radians_degrees(velocity[1]))}
    else {veloX = velocities[index].x};
    if (!!velocity[1]) {veloY = velocity[0] * Math.sin(radians_degrees(velocity[1]))}
    else {veloY = velocities[index].y};
    if (!!velocity[2]) {veloZ = velocity[0] * Math.sin(radians_degrees(velocity[2]))}
    else {veloZ = velocities[index].z}
    velocities[index] = {x : veloX, y : veloY, z : veloZ};
}

function radians_degrees (input, path) {
    const pi = Math.PI;
    if (path == 0) {
        return input * (180/pi)}
    else {
        return pi * input/180 };
}

const canvas = document.querySelector("#renderCanvas");
const engine = BABYLON.Engine(canvas, true);

create_obj = function (bodyName, parameters) {
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.ArcRotateCamera("camera1", 1, 1, 1, new BABYLON.Vector3.Zero(), scene);
    const product = BABYLON.MeshBuilder.CreateSphere(bodyName, parameters, scene);
    const light = new BABYLON.HemisphericLight ("light1", new BABYLON.Vector3(1, 1, 1), scene);
    return scene;
}

function createObject (event) {
    event.preventDefault();

    const parameters = event.target;
    //const parameters = document.querySelector("#parameters");

    inputParameters[objectindex] = {};
    inputParameters[objectindex].diameter = parameters.elements["size"].value;
    if (parameters.elements["res"].value) {
        inputParameters[objectindex].segments = parameters.elements["res"].value}
    else {inputParameters.segments = 32};
    inputParameters[objectindex].updatable = true;
    console.log(inputParameters[objectindex]);

    bodyName = parameters.elements["bodyname"].value;
    //object = BABYLON.MeshBuilder.CreateSphere(bodyName, {inputParameters}, scene);
    objectCoordinate = new BABYLON.Vector3(parameters.elements["x"].value, parameters.elements["y"].value, parameters.elements["z"].value);
        
    object = create_obj(bodyName, inputParameters[objectindex]);
    object.position = objectCoordinate;

    objects[objectindex] = object;

    velo = [parameters.elements["speed"].value, parameters.elements["angle_xy"].value, parameters.elements["angle_yz"].value];
    axial_velocity(velo, objectindex);
    /*veloX = velocity[0] * Math.cos(radians_degrees(velocity[1]));
    veloY = velocity[0] * Math.sin(radians_degrees(velocity[1]));
    veloZ = velocity[0] * Math.sin(radians_degrees(velocity[2]));
    velocities.push({x : veloX, y : veloY, z : veloZ});*/
    console.log(velocities);
    masses[objectindex] = parameters.elements["mass"].value;

    objectlist_gen((objectindex + 1));
    objectindex += 1;
    }

function objectlist_gen (index) {
    let list = document.querySelector(".objects-list");
    let classname = (`Object ${index}`);
    list.classList.add(classname);
    //declares class
    let newclass = document.querySelector(`objects-list > ${classname}`);
    newclass.setAttribute("id", objectindex);
    label = document.createElement("h3");
    newclass.appendChild(label);
    label.innerHTML = (`Object ${index}`);

    /*alternate path:
    let list = document.querySelector("objects-list")
    list.appendChild(newclass);*/
}

function editObject (event, editindex) {
    event.preventDefault();
    const parameters = event.target;
    editindex -= 1;
    if (!!parameters.elements["size"].value) {
        inputParameters[editindex].diameter = parameters.elements["size"].value };
    if (!!parameters.elements["res"].value) {
        inputParameters[editindex].segments = parameters.elements["res"].value };
    
    object = create_obj(bodyName, inputParameters[editindex]);
    
    //test vector notation here:
    if (!!parameters.elements["x"].value) {
        object.position.x = parameters.elements["x"].value };
    if (!!parameters.elements["y"].value) {
        object.position.y = parameters.elements["y"].value };
    if (!!parameters.elements["z"].value) {
        object.position.z = parameters.elements["z"].value };
    
    objects[editindex] = object;

    velo = [parameters.elements["speed"].value, parameters.elements["angle_xy"].value, parameters.elements["angle_zy"].value];
    axial_velocity(velo, editindex);
    }

    let divindex = 0;

document.addEventListener("DOMContentLoaded", function() {
    let form1 = document.querySelector("#setParameters");
    let form2 = document.querySelector("#editParameters");

    form1.addEventListener("submit", function() {
        createObject(event);
    }) 
        
let objectslist = document.querySelector("objects-list");
objectslist.forEach(function(object) {
    //let divindex = objectslist.Array.from().indexOf(object);
    object.addEventListener("click", function() {
    form2.setAttribute("false", hidden);
    form2.addEventListener("submit", function() {
       editObject(event, divindex);
       divindex += 1;
    })
    }) }) 
});
