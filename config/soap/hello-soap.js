exports.helloService = {
    Hello_Service: {
        Hello_Port: {
            sayHello: function(args) {
                console.log("SAYING HELLO");
                //console.log(args);
                return {
                    greeting: "Hello " +  args.firstName.$value + "!!!!!"
                };
            }
        }
    }
}

