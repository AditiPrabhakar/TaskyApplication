//custom scripts in package.json ("aditi": "node server.js" can also run command but we have to write 'npm run aditi' instead of just 'npm start')

const http = require('http'); //third-party file storing of our local browser http to a variable http

const port = 8081;

http.createServer((req, res) => {
    res.writeHead(200, { "Content-type": "text/html" }); //200 is the http code for 'OK'
    res.write("<h2>Hey server started :)</h2>")
    res.end();
})

    .listen(port, () => {
        console.log(`NodeJs server started running on port ${port}`); //listens to http always on port(8081) is a callback function, for successful conformation 
    })