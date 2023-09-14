const express = require('express');
const app = express();
const port = 3001;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override')

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let posts = [
    {id: uuidv4(), user: "Aman", content: "Hello World!"},
    {id: uuidv4(), user: "Akash", content: "Lmao!"},
    {id: uuidv4(), user: "Aryan", content: "Lol!"},
]

app.listen(port, () => {

    console.log(`Server is running on port: ${port}`);
});

app.get('/new', (req, res) => {
    res.render('new.ejs');
});

app.get('/', (req, res) => {
    res.render('home.ejs', {posts});
});

app.post('/', (req, res) => {
    posts.push({id: uuidv4(), user: req.body.user, content: req.body.content});
    res.redirect('/');
});

app.get('/:id', (req,res) => {
    let { id } = req.params;
    let post = posts.find((p)=> id===p.id );
    res.render("post.ejs", {post});
});

app.get('/:id/edit', (req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("editpost.ejs",{post})
});

app.patch('/:id',(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id===p.id);
    post.content = newContent;
    res.redirect("/");
});

app.delete('/:id',(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=>id !== p.id);
    res.redirect('/');
})