(function(window, document, undefined){
    window.onload = init;
      function init(){
        const simmode = document.getElementById('autouser');
        const simselect = document.querySelectorAll('#relati input');
        
        // initialize radiobutton interactions 
        for(var i = 0, max = simselect.length; i < max; i++) {
            simselect[i].onclick = function() {
                // change toggle to user
                if (!simmode.checked) {
                    console.log(simmode.checked);
                    simulateClick('autouser');  
                } 
 
                // call respective rel function 
                //
            };
        }

        // initialize toggle interactions 
        simmode.onclick = function () {
             //alert(this.checked);
            if (this.checked) {
                // set mode to auto
            } else {
                // set mode to user
            }
            //reset selections?
        };

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

        // initialize radiobutton interactions 
        }
})(window, document, undefined);