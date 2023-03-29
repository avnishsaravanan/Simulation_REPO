(function(window, document, undefined){
  // to wait until all elements are loaded
  /*let arrsimobjects = [
    {"objname":"Sphere1", "objsize":5, "objmass":30, "objcolor":"#535353", "objposx":30, "objposy":30, "objposz":30, "speed":0.3, "xyangle":30, "yzangle":45},
    {"objname":"Sphere2", "objsize":8, "objmass":50, "objcolor":"#535353", "objposx":50, "objposy":50, "objposz":50, "speed":0.5, "xyangle":50, "yzangle":80} ];*/
  //const MathJax = require("mathjax");
  let inputs = require("./inputs.js");
  let graphics = require("./render1.js");
  const custom = require("./customs.js");
  let arrsimobjects = [
    {0:"Sphere1", 1:5, 2:30.01, 3:"#535353", 4:30, 5:30, 6:30, 7:0.001, 8:30, 9:45, 10: 45},
    {0:"Sphere2", 1:8, 2:50.01, 3:"#353535", 4:50, 5:50, 6:50, 7:0.001, 8:50, 9:80, 10: 40} ];
    /*{0:"Sphere3", 1:5, 2:30.01, 3:"#535353", 4:30, 5:30, 6:30, 7:0.001, 8:30, 9:45},
    {0:"Sphere4", 1:8, 2:50.01, 3:"#353535", 4:50, 5:50, 6:50, 7:0.001, 8:50, 9:80},
    {0:"Sphere5", 1:5, 2:30.01, 3:"#535353", 4:30, 5:30, 6:30, 7:0.001, 8:30, 9:45},
    {0:"Sphere6", 1:8, 2:50.01, 3:"#353535", 4:50, 5:50, 6:50, 7:0.001, 8:50, 9:80},
    {0:"Sphere7", 1:5, 2:30.01, 3:"#535353", 4:30, 5:30, 6:30, 7:0.001, 8:30, 9:45},
    {0:"Sphere8", 1:8, 2:50.01, 3:"#353535", 4:50, 5:50, 6:50, 7:0.001, 8:50, 9:80},
    {0:"Sphere9", 1:5, 2:30.01, 3:"#535353", 4:30, 5:30, 6:30, 7:0.001, 8:30, 9:45} ];*/
  let velocities = [[0.001, 30, 45, 45], [0.01, 50, 80, 40]];
  let positions = [[30, 30, 30], [50, 50, 50]];
  let masses = [30, 50];

  let checks = ['obj1','obj2']; //,'obj3','obj4','obj5','obj6','obj7','obj8','obj9'];
  //let simtime = 5;

    
  window.onload = init;
  function init(){
    let simulmode = "auto"; //can be a  global variable ?
    const simmode = document.getElementById('autouser');
    const simselect = document.querySelectorAll('#relati input');
    const addelement =  document.getElementById('addbtn');
    const objectslist = document.getElementsByName('simobject');
    let okbtn =  document.getElementById('dummy');
    const velomode = document.getElementById('absrel');
    const qmk = document.getElementById('QM');
    const inf = document.getElementById('IN');
    //var arrsimobject = {0:"Spherex", 1:5, 2:30.01, 3:"#535353", 4:30, 5:30, 6:30, 7:0.001, 8:30, 9:45};
    let trigger = 'self';
    let customAlert = new custom.CustomAlert();
                
    // initialize auto/user toggle interactions 
    simmode.onclick = function () {
      if (this.checked) {
        simulmode = "user";
      } else {
      simulmode = "auto";
      }
    };

    // initialize radiobutton interactions 
    for(var i = 0, max = simselect.length; i < max; i++) {
      simselect[i].onclick = function() {
        // change toggle to user
        if (!simmode.checked) {
          simulateClick(simmode);  
        } 
      };
    }

    // initialize addelement interactions 
    addelement.onclick = function () {
      event.preventDefault();
      this.disabled=true;
      trigger = 'addel';
      //uncheck object list
      objectslist.forEach(function(obj) {
        if(obj.id == checks[0] || obj.id == checks[1]){
          //if (elem.checked == true) {
          simulateClick(obj);
        }
      });
      //document.getElementById('simbtn').disabled = true;
      // enable parameters
      processparam(false, 100);
      trigger = 'self';
      //inputs(masses, velocities); 
    };

    // initialize saveparameters interactions
    let formElem = document.getElementById('editParameters');
    formElem.addEventListener("submit", formSubmitHandler);
    function formSubmitHandler(event) {
      event.preventDefault();
      if (checks.length == 1) {
        saveparameters("up");
      } else {
        saveparameters("add");
      }
    }

    function saveparameters(addup){
      x=0;
      var arrsimobject = {};
      //{0:"Spherex", 1:5, 2:30.01, 3:"#535353", 4:30, 5:30, 6:30, 7:0.001, 8:30, 9:45};
      document.getElementsByName('objparams').forEach(function(elem){
        if (elem.id == 'objname' || elem.id == 'objcolor') {
          arrsimobject[x] = elem.value;
        } else {
          arrsimobject[x] = Number(elem.value); 
        }
        x+=1;
      });
      if (addup == "add") {
        arrsimobjects.push(arrsimobject);
        //doubt
        velocities.push([arrsimobject[7], 
                        arrsimobject[8], 
                        arrsimobject[9], 
                        arrsimobject[10] ]);
        positions.push([arrsimobject[4],
                       arrsimobject[5],
                       arrsimobject[6]]);
        masses.push(arrsimobject[2]);
                      
        /*module.exports = {arrsimobjects: arrsimobjects,
                          velocities: velocities,
                          positions: positions,
                          masses: masses };*/
            
        refreshobjlist(arrsimobjects.length);
        objectslist.forEach(function(elem) {
          if (elem.id == ("obj"+arrsimobjects.length)) {
            simulateClick(elem);
          }
        });
        customAlert.alert('Object Added','Info','alert');
        //custom.newalert.alert('Object Added','Info');
      } else {
        // update arrims
        arrsimobjects[(upobj()-1)] = arrsimobject;

        velocities[(upobj()-1)] = [arrsimobject[7], arrsimobject[8], arrsimobject[9], arrsimobject[10]];
        positions[(upobj()-1)] = [arrsimobject[4], arrsimobject[5], arrsimobject[6]];
        masses[(upobj()-1)] = arrsimobject[2];

        document.getElementById("objlabel"+(upobj())).childNodes[0].textContent = arrsimobject[0];
        customAlert.alert('Updates Saved','Info','alert'); // beautify
      }
      alertok();
    }

    // initialize checkbox interactions
    objectslist.forEach(elem => elem.onclick = function () {
      // find how many checked and action accordingly
      //  none , one , two , attempt  third
      if (this.checked == true) {
        checks.push(this.id);
        if (checks.length == 2 ) {
          objectslist.forEach(function (elemnt) {
            if (elemnt.id != checks[0] && elemnt.id != checks[1]) {
              elemnt.checked = false;
              elemnt.disabled = true;
            }
          });
          processparam(true, 100);
          document.getElementById('simbtn').disabled = false;
        } else {
          processparam(false, upobj());
        } 
      } else {
        if (checks[0] == this.id) {
          del = checks.shift();
        } else {
          del = checks.pop();
        }
        if (checks.length == 1) {
          for (let index = 1; index <= 10; index++) {
            para = document.getElementById('line'+index);
            if (!para.hidden) {
              document.getElementById('obj'+index).disabled = false;
            } else {break;}
          }
          // populate params
          if (trigger == 'self') {
            processparam(false, upobj());
          }    
        } else {
          // null params
          processparam(true, 100);
        }
        document.getElementById('simbtn').disabled = true;
      } 
      addbtnchk();
    });
    // if params not saved - no alert for now 


    function refreshobjlist(num) {
      document.getElementById("objlabel"+num).childNodes[0].textContent = arrsimobjects[num-1][0]; //newtxt;
      document.getElementById("obj"+num).checked = true;
      document.getElementById("obj"+num).disabled = false;
      document.getElementById("line"+num).hidden = false;          
      simulateClick(document.getElementById("objlabel"+num)); //checkmark
    } 

    // initialize solvefor interactions
    // on change of selection highlight respective field 

    // initialize run simulation interactions 
    simrun = document.getElementById('simbtn');
    simrun.onclick = function() {
      let time = Number(document.getElementById("e2time").value);
      const objlist = Array.from(document.getElementsByClassName("checkcontainer"));
      event.preventDefault();
      custom.simtimer.simtimestart();
      let checked = [upobj()-1, Number(checks[1].match(/\d+/))-1];
      //if (checked[0] > checked[1]) { checked[0] = checked.splice(1, 1, checked[0])[0]};
      inputs(masses, velocities, positions, checked);
      graphics(masses, velocities, positions, arrsimobjects, time, checked);
      const siminfo = document.getElementById("sinfo");
      
      // notify names of objects in Sim
      siminfo.innerHTML = `<b>Simulation is currently running for objects '${objlist[checked[0]].innerText}' and '${objlist[checked[1]].innerText}'</b>`;
      console.log(objlist[0].innerText);
      
      // show eqn basis condition 
      let simeqn = document.getElementById("simeqn0");
      simeqn.style.display = 'none';
      // put conditions here
      simeqn = document.getElementById("simeqn1"); //modify name as needed 
      simeqn.innerHTML = '<i>When \(a \ne 0\), there are two solutions to \(ax^2 + bx + c = 0\) and they are \[x = {-b \pm \sqrt{b^2-4ac} \over 2a}.\]</i>';
      
      //addScript('renderCanvas','./render1.bundle.js');      
    };

    // velo toggle interactions 
    velomode.onclick = function () {
      if (this.checked) {
        document.getElementById('veloabsrel').innerText = "Velocity: Relative";
      } else {
        document.getElementById('veloabsrel').innerText = "Velocity: Absolute";
      }
    };

    // question and info
    qmk.onclick = function () {
      customAlert.alert('The simulation interface is designed after the fact that all relativity requires definitive properties of the objects and frames of reference, and the space and time interval between events under observations. <br><br>-	The provided two objects have default properties, and you may either edit these as per your requirement, or create new objects entirely to document a larger dataset. You may have up to 10 objects, but only any two can appear in the simulation run at a time. <br><br>-	In the object list, to add a new object have 0 preselected, to edit an existing object have only that one selected, and to run simulation have 2 objects selected. <br><br>-	Next, set the space and time coordinates of two events. Event 2 must ALWAYS have larger coordinates than event 1 for the relativistic effects to be visible. <br><br>-	The spatial (distance) and temporal (duration) interval between E2 and E1 will be different in varying frames of reference. <br><br>-	The equation displayed below is the one that corresponds to the simulation. Hover cursor over a term to see its corresponding graphical component be highlighted in the simulation canvas. <br><br>-	Setting mode to ‘auto’ will adjust the equation depending on scale and parameters set by you. Do not that all the equations support the principle of ‘constant spacetime interval’, however, which suggests that the difference of the squares of duration and distance measured in a frame of reference will always be constant.','How to run the sim','info');
      alertok();
    };
    
    inf.onclick = function () {
      customAlert.alert('SR explained that measurements of length and duration in space and time were not absolute constants, but dependent on the velocity of the frame of reference from which the measurement was made. More specifically, its relative velocity – because any two frames of reference recording different measurements translate between one another in the exact same way; there is no absolute frame or static aether. SR also proved that mass and energy are equivalent quantities in the scope of momentum and four-vectors.<br><br>You can investigate special relativity in the simulation using the corresponding equation. The key details of the objects here will be their total velocity.<br><br>The breakthrough resulting from but also inseparable to SR, was general relativity. It was a revised theory of gravity that extrapolated mass as a fundamental quantity in space and time to the ‘transmission’ of gravity across objects. A new geometric and topological entity known as spacetime was conceptualised and accounted for gravity as the curvature of spacetime. An object traveling in a ‘straight’ geodesic path with constant velocity will be manipulated in a region of curved spacetime caused by a massive object. The medium is spacetime, which, analogous to the role of velocity in special relativity, causes time and length dilation, length contraction and redshift. GR is based on the variance of the laws of physics in accelerated frames of reference, the converse being a postulate for SR. GR was a completely novel upheaval of physics that has come to complement the other major field of quantum mechanics.','About Relativity','info');
      alertok();
    };

    //functions
    function processparam(state, num) {
      document.getElementById("editParameters").reset();
      col=0;
      document.querySelectorAll('#editParameters input, #editParameters select, #editParameters button, #editParameters textarea').forEach(function(elem) {
        elem.disabled = state;
        if (num != 100 && col < 11) {
          elem.value = arrsimobjects[num-1][col];
          col++;
        }          
      });
      if (!state) {
        document.getElementById('objname').focus();
      }
    }

    function addbtnchk(){
      if (arrsimobjects.length < 10) {
        addelement.disabled = false;
      }
    }

  //alertok
  function alertok(){
    okbtn =  document.getElementById('okbtn');
    //custom ok
    okbtn.onclick = function (){
      event.preventDefault();
      customAlert.ok();
    };
  } //init ends

  //common functions
  function upobj() {
    num = Number(checks[0].match(/\d+/));
    return num;
  }

  function addScript (xtag,src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.setAttribute('src', src);
      s.addEventListener('load', resolve);
      s.addEventListener('error', reject); 
      document.getElementById(xtag).appendChild(s);
    });
  }

  // click any element 
  function simulateClick(elem) {
    var evt = new MouseEvent('click');
    var canceled = !elem.dispatchEvent(evt);
    if(canceled) {
      // A handler called preventDefault
      alert("click event canceled");
    } else {
      // None of the handlers called preventDefault
      //alert("not canceled");
    }
  }

  }

  module.exports = {  arrsimobjects: arrsimobjects,
                      velocities: velocities,
                      positions: positions, 
                      masses: masses };

      /* for reference later 
      function preventDef(event) {
        event.preventDefault();
      }
          
      function addHandler() {
        document.getElementById("checkbox").addEventListener("click", 
        preventDef, false);
      }
          
      function removeHandler() {
        document.getElementById("checkbox").removeEventListener("click",
        preventDef, false);
      }

      */
})(window, document, undefined);