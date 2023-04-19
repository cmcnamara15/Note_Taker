const express = require('express');
const path = require('path');
const app = express();

app.get('/notes', (req,res)=> {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/goodbye', (req, res)=> {
    res.send('see you later!')
});

app.listen(3001, () => {
    console.log('server is running')
});



