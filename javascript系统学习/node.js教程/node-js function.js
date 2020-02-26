function say(world){
    console.log(world);
}


function excute(somefunction, value){
    somefunction(value);
}

var http = require('http')

http.createServer(function(request, response){
    response.writeHead(200, {'Content-Type: "text/plan'})
    response.write("hellowork")
    response.end()
}).listen(8011)

excute(say, 'hello');
