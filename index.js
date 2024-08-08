const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

app.use(express.static(path.join(__dirname,"views")));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.listen(port, ()=>{
    console.log(`Welcome to port ${port}`);
});

let posts = [

    {
        username:"Aryan",
        content:"Hi there! I am in Sagar"
    },

    {
        username:"Pragya",
        content:"Hi there! I am in Bhopal"
    },
];

app.get("/posts",(req,res) => {
    res.render("index",{posts});
});

app.get("/posts/new",(req,res) => {
    res.render("new");
});

app.post("/posts",(req,res) => {
    let {username,content} = req.body;
    posts.push({username : username,content : content});
    res.send("Post Request Working");
});