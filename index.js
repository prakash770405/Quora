const express = require('express');
const app = express();
const port = 8080;
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.use(methodOverride('_method'))
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


let posts = [
    { id: uuidv4(), name: 'shyam', content: 'Print hello world.' },
    { id: uuidv4(), name: 'ram', content: 'I love coding.' },
    { id: uuidv4(), name: 'mohan', content: 'Express is great!' }
];

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/post', (req, res) => {
    res.render('index.ejs', { posts });
});

app.get('/post/new', (req, res) => {
    let id = uuidv4();
    res.render('new.ejs', { id });
})

app.post('/post', (req, res) => {
    let info = req.body;
    info.id = uuidv4();
    posts.push(info);
    res.redirect('/post');
})

app.get('/post/:id', (req, res) => {
    let { id } = req.params;
    let post = posts.find(p => p.id === id);
    res.render('detail.ejs', { post });
})
//----------------------------------------------------
app.patch('/post/:id/edit', (req, res) => {
    let { id } = req.params;
    let post = posts.find(p => p.id === id);
    const { content } = req.body;
    post.content = content;
    res.redirect('/post');

});

app.get('/post/:id/edit', (req, res) => {
    let { id, name, content } = req.params;
    let post = posts.find(p => p.id === id);
    res.render('edit.ejs', { post, id, name, content });
});

app.delete('/post/:id', (req, res) => {
    let { id } = req.params;
    posts = posts.filter(p => p.id !== id);
    res.redirect('/post');
});