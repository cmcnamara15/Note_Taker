const express = require('express');
const app = express();

app.get('/notes', (req,res)=> {
    res.sendFile('./public/notes.html')
}) 

app.get('/goodbye', (req, res)=> {
    res.send('see you later!')
})

app.listen(3001, () => {
    console.log('server is running')
});



