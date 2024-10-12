//* custom scripts in package.json ("aditi": "node server.js" can also run command but we have to write 'npm run aditi' instead of just 'npm start')

const http = require('http'); //^ third-party file storing of our local browser http to a variable http
const port = 8081; //~ local port run

const todoList = ["learn", "apply things", "succeed"];

http.createServer((req, res) => {              //& callback func
    const {method, url} = req
    // console.log("method" + method, "\nurl" + url);
    if(url === "/todos"){  //* gets the Route of url
        if(method === "GET")
        {
            res.writeHead(200, { "Content-type": "text/html" });
            res.write(todoList.toString());
        }else if(method === "POST"){
            let body = "";
            req
            .on("error", (err) => {
                console.log(err);
            })
            .on('data', (chunk) => {
                body += chunk;
                // console.log(chunk);
            })
            .on('end', () => {
                body = JSON.parse(body);
                //~ Adding an item
                // let newTodo = todoList;
                // newTodo.push(body.item); 
                // console.log("data: ", body);

                //~ Deleting an item
                // let deleteThisItem = body.item;
                // for(let i = 0; i < todoList.length; i++)
                // {
                //     if(todoList[i] === deleteThisItem)
                //     {
                //         (todoList.splice(i,1);)
                //     }
                // }
                
                //~ Finding an item (somehow is also delete -_-)
                let deleteThisItem = body.item;
                todoList.find((elem, index) => {
                    if(elem === deleteThisItem)
                    {
                        todoList.splice(index, 1);
                    }
                })
            })
        }else{
            res.writeHead(501);
        }
    }else{
        res.writeHead(404); //* route not found
    }
    res.end();
    // res.writeHead(200, { "Content-type": "text/html" }); //~ 200 is the http code for 'OK'
    // res.write("<h2>Hey server started!! (nodemon included) :)</h2>")
    // res.end();
})

    .listen(port, () => {          //& callback func
        console.log(`NodeJs server started running on port ${port}`); //~ listens to http always on port(8081) is a callback function, for successful conformation 
    })
