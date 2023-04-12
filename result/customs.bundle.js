/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 9:
/***/ ((module) => {


  //progress bar
  function progressbar(factor,denom) {
    var elem = document.getElementById("simBar");
    var width = Math.round((factor/denom)*100,0);
    if (width >= 100) {
      elem.style.width = '100%';
    } else {
      elem.style.width = width + '%';
    }
  }
  
  //timer
  class simTimer {
    constructor () {
      this.isRunning = false;
      this.startTime = 0;
      this.overallTime = 0;
    }
  
    _getTimeElapsedSinceLastStart () {
      if (!this.startTime) {
        return 0;
      }
    
      return Date.now() - this.startTime;
    }
  
    simtimestart () {
      if (this.isRunning) {
        return console.error('Timer is already running');
      }
  
      this.isRunning = true;
  
      this.startTime = Date.now();
    }
  
    simtimestop () {
      if (!this.isRunning) {
        return console.error('Timer is already stopped');
      }
  
      this.isRunning = false;
  
      this.overallTime = this.overallTime + this._getTimeElapsedSinceLastStart();
    }
  
    simtimereset () {
      this.overallTime = 0;
  
      if (this.isRunning) {
        this.startTime = Date.now();
        return;
      }
  
      this.startTime = 0;
    }
  
    getsimtime () {
      if (!this.startTime) {
        return 0;
      }
  
      if (this.isRunning) {
        return this.overallTime + this._getTimeElapsedSinceLastStart();
      }
  
      return this.overallTime;
    }
  
    setsimtime (timelim) {
      let tl = ""; let ts ="";
      let timeInSeconds = Math.round(this.getsimtime() / 1000);
      if (timelim>9) { tl = "0:"+timelim; } else { tl = "0:0"+timelim; }
      if (timeInSeconds>timelim) { timeInSeconds=timelim; }
      if (timeInSeconds>9) { ts = "0:"+timeInSeconds; } else { ts = "0:0"+timeInSeconds; }
      document.getElementById('simtimeinfo').innerText = ts+"/"+tl;
      progressbar(timeInSeconds,timelim);
    }
  
    /*setInterval(() => {
      const timeInSeconds = Math.round(timer.getTime() / 1000);
      document.getElementById('time').innerText = timeInSeconds;
    }, 100)*/
  }
  const simtimer = new simTimer();
  
  // alert
  function CustomAlert(){
      this.alert = function(message,title,type){
        //document.body.innerHTML = document.body.innerHTML + '<div id="dialogoverlay"></div><div id="dialogbox" class="slit-in-vertical"><div><div id="dialogboxhead"></div><div id="dialogboxbody"></div><div id="dialogboxfoot"></div></div></div>';
    
        let dialogoverlay = document.getElementById('dialogoverlay');
        let dialogbox = document.getElementById('dialogbox');
        
        let winH = window.innerHeight;
        dialogoverlay.style.height = winH+"px";
        
        dialogbox.style.top = "100px";
    
        dialogoverlay.style.display = "block";
        dialogbox.style.display = "block";
           
        if(typeof title !== 'undefined') 
        /*{  
          document.getElementById('dialogboxhead').style.display = 'none';
        } else*/ {
          document.getElementById('dialogboxhead').style.display = 'block';
          if (type === 'info') {
            document.getElementById('dialogboxhead').innerHTML = '<i class="fa fa-info-circle" aria-hidden="true"></i> '+ title;
            document.getElementById('dialogboxfoot').innerHTML = '<button class="pure-material-button-contained active" id="okbtn">Close</button>';
          } else {
            document.getElementById('dialogboxhead').innerHTML = '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> '+ title;
            document.getElementById('dialogboxfoot').innerHTML = '<button class="pure-material-button-contained active" id="okbtn">OK</button>';  
          }
        }
        document.getElementById('dialogboxbody').innerHTML = message;
        
      };
      
      this.ok = function(){
        document.getElementById('dialogbox').style.display = "none";
        document.getElementById('dialogoverlay').style.display = "none";
      };
    }
    const newalert = new CustomAlert();
  
    
    
    //let customAlert = new CustomAlert();
  
  module.exports = {progressbar: progressbar, CustomAlert: CustomAlert, newalert: newalert, simtimer: simtimer, simTimer: simTimer};

/***/ })

/******/ 	});
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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(9);
/******/ 	
/******/ })()
;