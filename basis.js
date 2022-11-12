//function to declare new object variables - done
//function to assign defualt values - for mass, velocity values, position
//function beforeRender() to change position in simulation
//function for converting between axes

let inputParameters = [];
let object;
let objectCoordinate;
let objects = [];
let objectindex = 0;
let velocities = [];
let masses = [];

function axial_velocity(velocity, index) {
    if (!!veloX) {veloX = velocity[0] * Math.cos(radians_degrees(velocity[1]))}
    else {veloX = velocities[index].x};
    if (!!veloY) {veloY = velocity[0] * Math.sin(radians_degrees(velocity[1]))}
    else {veloY = velocities[index].y};
    if (!!veloZ) {veloZ = velocity[0] * Math.sin(radians_degrees(velocity[2]))}
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
    object = BABYLON.MeshBuilder.CreateSphere(bodyName, {inputParameters}, scene);
    //position
    let objectCoordinate = new BABYLON.Vector3(parameters.elements["x"].value, parameters.elements["y"].value, parameters.elements["z"].value);
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

    objects.push(object);
    objectindex += 1;
    return scene;
    }

function editObject (event, editindex) {
    event.preventDefault();
    const parameters = event.target;
    editindex -= 1;
    if (!!parameters.elements["size"].value) {
        inputParameters[editindex].diameter = parameters.elements["size"].value };
    if (!!parameters.elements["res"].value) {
        inputParameters[editindex].segments = parameters["res"].value };
    object = BABYLON.MeshBuilder.CreateSphere(bodyName, {inputParameters}, scene);
    objects[editindex] = object;

    //test vector notation here:
    if (!!parameters.elements["x"].value) {
        objects[editindex].position.x = parameters["x"].value };
    if (!!parameters.elements["y"].value) {
        objects[editindex].position.y = parameters.elements["y"].value };
    if (!!parameters.elements["z"].value) {
        objects[editindex].position.z = parameters["x"].value };
    
    velo = [parameters.element["speed"].value, parameters.element["angle_xy"].value, parameters.element["angle_zy"].value];
    axial_velocity(velo, editindex);
    }

document.addEventListener("DOMContentLoaded", function() {
    let detector1 = document.querySelector("#setParameters");
    detector1.addEventListener("submit", function() {
        createObject(event);
    }) 
    let detector2 = document.querySelector("#editParameters");
    detector2.addEventListener("submit", function() {
        editObject(event, selectedObj);


    }) });

