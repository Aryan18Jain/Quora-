const express = require("express");
const app = express();
const port = 8080;

const path = require("path");
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.static(path.join(__dirname,"views")));

const { v4: uuidv4 } = require('uuid');

let methodOverride = require('method-override')
app.use(methodOverride('_method'))

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.listen(port, ()=>{
    console.log(`Welcome to port ${port}`);
});

let posts = [

    {
        id:uuidv4(),
        username:"Aryan",
        content:"Hi there! I am in Sagar"
    },

    {
        id:uuidv4(),
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
    posts.push({id : uuidv4(), username : username,content : content});
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => id == p.id);
    console.log(post);
    res.render("show",{post});
});

app.get("/posts/edit/:id",(req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => id == p.id);
    res.render("edit",{post});
});

app.patch("/posts/:id",(req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => id == p.id);
    let newcontent = req.body.newcontent;
    post.content = newcontent;
    res.redirect("/posts");
});

app.delete("/posts/:id",(req,res) => {
    let {id} = req.params;
    posts = posts.filter((p) => id != p.id);
    res.redirect("/posts");
});
