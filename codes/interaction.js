(function(window, document, undefined){
    // to wait until all elements are loaded
    window.onload = init;
      function init(){
        let simulmode = "auto"; //can be a  global variable ?
        const simmode = document.getElementById('autouser');
        const simselect = document.querySelectorAll('#relati input');
        
        // initialize toggle interactions 
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
                    simulateClick('autouser');  
                } 
                // next steps 
                // stop sim if running 
                // verify parameters for fitment for selected relativity option ?
            };
        }

        // initialize addelement interactions 
        // enable parameter fields
        // empty values


        // initialize checkbox interactions
        // find how many checked and action accordingly 
        //  none , one , two , attempt  third 


        // initialize saveparameters interactions
        // create new object 
        // update object 


        // initialize solvefor interactions
        // on change of selection highlight respective field 
        

        // initialize run simulation interactions 


        } //init ends

        //common functions
        // click any element 
        function simulateClick(elem) {
          var evt = new MouseEvent('click');
          var cb = document.getElementById(elem); 
          var canceled = !cb.dispatchEvent(evt);
          if(canceled) {
            // A handler called preventDefault
            alert("canceled");
          } else {
            // None of the handlers called preventDefault
            //alert("not canceled");
          }
        }

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