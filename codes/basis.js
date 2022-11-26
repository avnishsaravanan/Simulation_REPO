//function to declare new object variables - done
//function to assign defualt values - for mass, velocity values, position
//function beforeRender() to change position in simulation
//function for converting between axes

//let BABYLON = require('babylonjs');

/*let inputParameters = [];
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

function firstObject (scene) {
    objects[objectindex] = BABYLON.MeshBuilder.CreateSphere("Object 1", {diameter: 3, segments: 10}, scene);
    objects[objectindex].position = new BABYLON.Vector3(1, 1, 1);
    inputParameters[objectindex] = {diameter: 3, segments: 10};
    velocities[objectindex] = {x: 0, y: 0, z: 0};
    masses[objectindex] = 1;
    objectindex += 1};

function createObject (event) {
    const parameters = event.target;
    //const parameters = document.querySelector("#parameters");

    inputParameters[objectindex] = {};
    inputParameters[objectindex].diameter = parameters.elements["size"].value;
    if (parameters.elements["res"].value) {
        inputParameters[objectindex].segments = parameters.elements["res"].value}
    else {inputParameters[objectindex].segments = 32};
    console.log(inputParameters[objectindex]);

    bodyName = parameters.elements["bodyname"].value;
    objectCoordinate = new BABYLON.Vector3(parameters.elements["x"].value, parameters.elements["y"].value, parameters.elements["z"].value);
       
    objects[objectindex] = BABYLON.MeshBuilder.CreateSphere(bodyName, inputParameters[objectindex], scene);
    objects[objectindex].position = objectCoordinate;

    velo = [parameters.elements["speed"].value, parameters.elements["angle_xy"].value, parameters.elements["angle_yz"].value];
    axial_velocity(velo, objectindex);
    console.log(velocities);
    masses[objectindex] = parameters.elements["mass"].value;

    objectlist_gen((objectindex + 1));
    objectindex += 1;
    }

    
function objectlist_gen (index) {
    let list = document.querySelector("#objects-list")
    let newclass = document.createElement("li");
    newclass.setAttribute("id", `${objectindex}`);
    let label = document.createElement("h4");
    label.innerHTML = (`Object ${index}`); 
    newclass.appendChild(label);
    list.appendChild(`#${objectindex}`);
    
 /*alternate path:
 let list = document.querySelector(".objects-list");
 list.classList.add(classname);*/
 //} 
     

/*function editObject (event, editindex) {
    event.preventDefault();
    const parameters = event.target;
    editindex -= 1;
    if (!!parameters.elements["size"].value) {
        inputParameters[editindex].diameter = parameters.elements["size"].value };
    if (!!parameters.elements["res"].value) {
        inputParameters[editindex].segments = parameters.elements["res"].value };
    
    object = BABYLON.MeshBuilder.CreateSphere(bodyName, inputParameters[editindex], scene);
    
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
    } */

