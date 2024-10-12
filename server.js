const express = require("express");

const app = express();
app.use(express.json());

const port = 8081;

const todoList = ["learn", "apply things", "succeed"];

app.get("/todos", (req, res) => {
    res.status(200).send(todoList);
})

app.post("/todos", (req, res) => {
    let newTodoItem = req.body.name;
    todoList.push(newTodoItem);
    res.status(201).send({message: "Task Added Successfully"});
})

app.delete("/todos", (req, res) => {
    const deleteThisItem = req.body.name;

    todoList.find((elem, index) => {
        if(elem === deleteThisItem)
        {
            todoList.splice(index, 1);
        }
        res.status(202).send({message: `Deleted item ${req.body.name} Successfully`});
    });
})

//* For all the methods and * for any route
app.all("*", (req, res) => {
    res.status(501).send();
});

app.listen(port, () => {
    console.log(`NodeJs Server Started Running On Port ${port}`);
})
