(function(window, document, undefined){
    // to wait until all elements are loaded

    /*let arrsimobjects = [
      {"objname":"Sphere1", "objsize":5, "objmass":30, "objcolor":"#535353", "objposx":30, "objposy":30, "objposz":30, "speed":0.3, "xyangle":30, "yzangle":45},
      {"objname":"Sphere2", "objsize":8, "objmass":50, "objcolor":"#535353", "objposx":50, "objposy":50, "objposz":50, "speed":0.5, "xyangle":50, "yzangle":80}
    ];*/
    let arrsimobjects = [
      {0:"Sphere1", 1:5, 2:30, 3:"#535353", 4:30, 5:30, 6:30, 7:0.8, 8:30, 9:45},
      {0:"Sphere2", 1:8, 2:50, 3:"#535353", 4:50, 5:50, 6:50, 7:0.5, 8:50, 9:80}
    ];
    let velocities = [[0.8, 30, 45], [0.5, 50, 80]];
    let positions = [[30, 30, 30], [50, 50, 50]];
    let masses = [30, 50];
    
    window.onload = init;
      function init(){

        console.log("function rec")
        
        let simulmode = "auto"; //can be a  global variable ?
        let checkclear = false;
        const simmode = document.getElementById('autouser');
        const simselect = document.querySelectorAll('#relati input');
        const addelement =  document.getElementById('addbtn');
        const objectslist = document.getElementsByName('simobject');
        let arrsimobject = 
          {0:"Sphere3", 1:5, 2:30, 3:"#535353", 4:30, 5:30, 6:30, 7:0.3, 8:30, 9:45};
                
        // initialize auto/user toggle interactions 
        simmode.onclick = function () {
          if (this.checked) {
            simulmode = "user";
          } else {
            simulmode = "auto";
          }
                // next steps 
                // stop sim if running 
                // verify parameters for fitment for selected relativity option ?          
        };

        // initialize radiobutton interactions 
        for(var i = 0, max = simselect.length; i < max; i++) {
            simselect[i].onclick = function() {
                // change toggle to user
                if (!simmode.checked) {
                    simulateClick(simmode);  
                } 
                // next steps 
                // stop sim if running 
                // verify parameters for fitment for selected relativity option ?
            };
        }

        // initialize addelement interactions 
        addelement.onclick = function () {
          this.disabled=true;
          //clear object list
          checkclear=true;
          objectslist.forEach(function(elem) {
            if (elem.checked == true) {
              simulateClick(elem);
            }
          });
          document.getElementById('simbtn').disabled = true;
          // enable parameters
          document.querySelectorAll('#editParameters input, #editParameters select, #editParameters button, #editParameters textarea').forEach(elem => elem.disabled = false);
          document.getElementById("editParameters").reset();
          document.getElementById('objname').focus();
        };

        // initialize saveparameters interactions
        // create new object 
        // update object 
        let formElem = document.getElementById('editParameters');
        formElem.addEventListener("submit", formSubmitHandler);
        function formSubmitHandler(event) {
          event.preventDefault();
          if (checkclear === false) {
            saveparameters("up");
          } else {
            saveparameters("add");
          }
        }

        function saveparameters(addup){
          x=0;
          document.getElementsByName('objparams').forEach(function(elem){
            arrsimobject[x] = elem.value;
            x+=1;
          });
          if (addup === "add") {
            arrsimobjects.push(arrsimobject);
            velocities.push([arrsimobject[7], 
                             arrsimobject[8], 
                             arrsimobject[9]]);
            positions.push([arrsimobject[4],
                            arrsimobject[5],
                            arrsimobject[6]]);
            masses.push(arrsimobject[2]);
                      
            module.exports = {arrsimobjects: arrsimobjects,
                              velocities: velocities,
                              positions: positions,
                              masses: masses };
            
            //document.querySelectorAll('#editParameters input[text], #editParameters input[number]').forEach(elem => elem.value === null);
            //document.querySelectorAll('#editParameters input[submit]').forEach(elem => elem.disabled = true);
            refreshobjlist(arrsimobjects.length);
            if (arrsimobjects.length < 10) {
              addelement.disabled = false;
            }
          } else {
            console.log(objindex);
          }            
            objectslist.forEach(function(elem) {
              if (elem.id == ("obj"+arrsimobjects.length)) {
                simulateClick(elem);
              }
            });
            
          
          

        }


        // initialize checkbox interactions

        // find how many checked and action accordingly 
        //  none , one , two , attempt  third 
        // if params not saved 

        function refreshobjlist(num) {
          //txt = document.getElementById("objlabel"+num).childNodes[0].textContent;
          //newtxt = arrsimobjects[num-1].objname + txt;
          document.getElementById("objlabel"+num).childNodes[0].textContent = arrsimobjects[num-1][0]; //newtxt;
          document.getElementById("line"+num).hidden = false;
          document.getElementById("obj"+num).checked = true;
          simulateClick(document.getElementById("objlabel"+num));
          //checkmark
        } 

        // initialize solvefor interactions
        // on change of selection highlight respective field 
        

        // initialize run simulation interactions 


      } //init ends

      //common functions
      // click any element 
      function simulateClick(elem) {
        var evt = new MouseEvent('click');
        //var cb = document.getElementById(elem); 
        var canceled = !elem.dispatchEvent(evt);
        if(canceled) {
          // A handler called preventDefault
          alert("click event canceled");
        } else {
          // None of the handlers called preventDefault
          //alert("not canceled");
        }
      }
      module.exports = { arrsimobjects: arrsimobjects,
                         velocities: velocities,
                         positions: positions, 
                         masses: masses}


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