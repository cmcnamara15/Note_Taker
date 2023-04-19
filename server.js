const express = require('express');
const path = require('path');

const app = express();

// MIDDLEWARE
app.use(express.static('./public'))

app.get('/notes', (req,res)=> {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.get('/api/notes', (req,res)=> {
    res.sendFile(path.join(__dirname, './db/db.json'))
})

app.post('/api/notes', (req, res)=> {
    console.log(req.body)
})

app.get('/*', (req,res)=> {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.listen(3001, () => {
    console.log('server is running')
});






// app.get('/assets/css/styles.css', (req, res)=> {
//     res.sendFile(path.join(__dirname, './public/assets/css/styles.css'))
// })