
$(document).ready(function() {
      $("#simBtn").click(function() {

      var textToSave = "";
      var elements = document.getElementsByTagName("input");
      for (var i = 0; i < elements.length; i++) {
          if(elements[i].value != "" && elements[i].id != "hidden") {
              fieldToAdd = elements[i].value + ", ";
              textToSave += fieldToAdd;
          }
      }

      var datatosend = {
          "textToSave": textToSave
      }
        //post request to call method that will run simulation
        $.post( "/runSimulation", datatosend,
                function(resp) {
                    if(resp.message != "success") {
                        alert("Error" + resp.data);
                    }
                    else {
                        alert("Successfully saved inputs as " + resp.data);
                    }
                });
      })
})
