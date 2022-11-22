
          let BABYLON = require('babylonjs');
          /*let GUI = require('babylonjs-gui');
          let materials = require('babylonjs-materials');*
          import printMe from './toggle.js';*/

          let inputParameters = [];
          let object; 
          let objectCoordinate;
          let objects = []; 
          let objectindex = 0;
          let velocities = [];
          let masses = [];
          let positions = [];
          
          function axial_velocity(velocity, index) {
              if (!!velocity[1]) {veloX = velocity[0] * Math.cos(radians_degrees(velocity[1]));}
              else {veloX = velocities[index].x;}
              if (!!velocity[1]) {veloY = velocity[0] * Math.sin(radians_degrees(velocity[1]));}
              else {veloY = velocities[index].y;}
              if (!!velocity[2]) {veloZ = velocity[0] * Math.sin(radians_degrees(velocity[2]));}
              else {veloZ = velocities[index].z;}
              velocities[index] = {x : veloX, y : veloY, z : veloZ};
          }
          
          function radians_degrees (input, path) {
              const pi = Math.PI;
              if (path == 0) {
                  return input * (180/pi);}
              else {
                  return pi * input/180; }}
          
          function objectlist_gen (index) {
             let list = document.querySelector("#objects-list");
             let newclass = document.createElement("li");
             newclass.setAttribute("id", `${objectindex}`);
             let label = document.createElement("h4");
             label.innerHTML = (`Object ${index}`); 
             newclass.appendChild(label);
             list.appendChild(`#${objectindex}`);
             
          /*alternate path:
          let list = document.querySelector(".objects-list");
          list.classList.add(classname);*/
          }
          
          function firstObject (scene) {
               objects[objectindex] = BABYLON.MeshBuilder.CreateSphere("Object 1", {diameter: 3, segments: 10}, scene);
               objects[objectindex].position = new BABYLON.Vector3(1, 1, 1);
               objectindex += 1;}
          
          function createObject (event) {
              const parameters = event.target;
              //const parameters = document.querySelector("#parameters");
          
              inputParameters[objectindex] = {};
              inputParameters[objectindex].diameter = parameters.elements["size"].value;
              if (parameters.elements["res"].value) {
                  inputParameters[objectindex].segments = parameters.elements["res"].value}
              else {inputParameters[objectindex].segments = 32;}
              console.log(inputParameters[objectindex]);
          
              bodyName = parameters.elements["bodyname"].value;
              objectCoordinate = new BABYLON.Vector3(parameters.elements["x"].value, parameters.elements["y"].value, parameters.elements["z"].value);
              positions[objectindex] = objectCoordinate;

              objects[objectindex] = BABYLON.MeshBuilder.CreateSphere(bodyName, inputParameters[objectindex], scene);
                       
              velo = [parameters.elements["speed"].value, parameters.elements["angle_xy"].value, parameters.elements["angle_yz"].value];
              axial_velocity(velo, objectindex);
              console.log(velocities);
              masses[objectindex] = parameters.elements["mass"].value;
          
              objectlist_gen((objectindex + 1));
              objectindex += 1;
              } 
          
          
          const canvas = document.querySelector("#renderCanvas");
          const engine = new BABYLON.Engine(canvas, true);
          var scene = new BABYLON.Scene(engine);
          const camera = new BABYLON.ArcRotateCamera("camera1", 1, 1, 1, new BABYLON.Vector3.Zero(), scene);
          camera.attachControl(canvas, true);
          const light = new BABYLON.HemisphericLight ("light1", new BABYLON.Vector3(1, 1, 1), scene); 
          firstObject(scene);
          
          document.addEventListener("DOMContentLoaded", function() {
              console.log("DOM loaded");
              //let form1 = document.querySelector("#setParameters");
              console.log("looped");
              let form1 = document.querySelector("#editParameters");
              
              form1.addEventListener("submit", function() {
              event.preventDefault();
              createObject(event);
              console.log("function run");
              }); });
          
          engine.runRenderLoop (function() {
              scene.render();
               console.log("rendered");
              });    

          // Watch for browser/canvas resize events
          window.addEventListener("resize", function () {
            engine.resize();
          });

          module.exports = { positions: positions,
                             velocities: velocities }