const express = require('express');
const path = require('path');

const app = express();

// MIDDLEWARE
app.use(express.static('./public'))

app.get('/notes', (req,res)=> {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

// app.get('/assets/css/styles.css', (req, res)=> {
//     res.sendFile(path.join(__dirname, './public/assets/css/styles.css'))
// })

app.listen(3001, () => {
    console.log('server is running')
});

 