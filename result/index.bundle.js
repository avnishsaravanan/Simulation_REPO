/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

//# sourceMappingURL=babylon.js.map

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {

          let BABYLON = __webpack_require__(1);
          
          /*let GUI = require('babylonjs-gui');
          let materials = require('babylonjs-materials');*/

          const canvas = document.getElementById("renderCanvas") // Get the canvas element
          const engine = new BABYLON.Engine(canvas, true) // Generate the BABYLON 3D engine
          const createScene = function () {
            // Creates a basic Babylon Scene object
            const scene = new BABYLON.Scene(engine)
            // Creates and positions a free camera
            const camera = new BABYLON.FreeCamera(
              "camera1",
              new BABYLON.Vector3(0, 5, -10),
              scene
            )
            // Targets the camera to scene origin
            camera.setTarget(BABYLON.Vector3.Zero())
            // This attaches the camera to the canvas
            camera.attachControl(canvas, true)
            // Creates a light, aiming 0,1,0 - to the sky
            const light = new BABYLON.HemisphericLight(
              "light",
              new BABYLON.Vector3(0, 1, 0),
              scene
            )
            // Dim the light a small amount - 0 to 1
            light.intensity = 0.7
            // Built-in 'sphere' shape.
            const sphere = BABYLON.MeshBuilder.CreateSphere(
              "sphere",
              { diameter: 2, segments: 32 },
              scene
            )
            // Move the sphere upward 1/2 its height
            sphere.position.y = 1;
            // Built-in 'ground' shape.
            const ground = BABYLON.MeshBuilder.CreateGround(
              "ground",
              { width: 6, height: 6 },
              scene
            );
            return scene;
          }
          
          const scene = createScene() //Call the createScene function
          // Register a render loop to repeatedly render the scene
          engine.runRenderLoop(function () {
            scene.render();
          });

          // Watch for browser/canvas resize events
          window.addEventListener("resize", function () {
            engine.resize();
          });
})();

/******/ })()
;