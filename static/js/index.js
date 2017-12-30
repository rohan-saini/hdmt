
$(document).ready(function() {
      $("#loginBtn").click(function() {

        //post request to call method that will validate login info
        $.post( "/validateUser", $("#loginInfo").serialize(),
                function(resp) {
                    if(resp.data.valid == true) {
                        window.location.href="/views/input.html";
                    }
                    else {
                        alert("Error - Username or Password is invalid");
                    }
                }
            );
      })
})
