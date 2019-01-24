
var uniquefilename;

$(document).ready(function() {
	$('[data-toggle="popover"]').popover()

	$(".pre-calculated").change(function() {
		var maxAccum = $("#maxAccumulation").val();
		var progStartMonths = $("#progStartMonths").val();
		var progLastMonths = $("#progLastMonths").val();
		var res = maxAccum/(progStartMonths - progLastMonths + 1);
		$("#hedgeRate").val(res);
	});

	$("#simBtn").click(function() {
		uniquefilename = new Date().getTime();
		var textToSave = "";
		var elements = document.getElementsByTagName("input");
		for (var i = 0; i < elements.length; i++) {
			if (elements[i].value != "" && elements[i].id != "hidden") {
				fieldToAdd = elements[i].value + ", ";
				if (elements[i].placeholder == "%") {
                    fieldToAdd = fieldToAdd / 100;
                }

				textToSave += fieldToAdd;
				textToSave += ",";
				if (elements[i].name == "EndingMonth") {
                    textToSave += ", ";
                }
			}
		}

		var datatosend = {
			"textToSave": textToSave
		}

		// disabling button and changing text to "running"
		$("#simBtn").attr("disabled", "true");
        $("#simBtn").text("Running...");

		//post request to call method that will run simulation
		$.post( "/runSimulation", datatosend,
	        function(resp) {
				$("#simBtn").removeAttr("disabled");
                $("#simBtn").text("Run Simulation");

	            if(resp.message != "success") {
	                alert("Error" + resp.data);
	            }
	            else {
	                alert("Simulation started on the sever, click on output buttons to download the output files starting with " + uniquefilename + " prefix");
	            }
	        });
	})

	$("#outputBtn").click(function() {
		$("#outputBtn").text("Getting...");
		var datatosend = {
			"filetype": "2",
			"foldername": "output/" + uniquefilename + "/" + uniquefilename + "-Output.xlsx",
			//"foldername": "output/" + uniquefilename + "/" + "Output.xlsx",
			"localfilename": uniquefilename,
			"downloadfileName": uniquefilename
		}

		//post request to call method that will run simulation
		$.post( "/getOutput", datatosend,
	        function(resp) {
				if (resp) {
					alert("got output");
				}
				else {
					alert("Error getting file " + JSON.stringify(resp));
				}
	        });
	})
})
