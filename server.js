const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// MIDDLEWARE
app.use(express.static('./public'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.get('/notes', (req,res)=> {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.get('/api/notes', (req,res)=> {
    res.sendFile(path.join(__dirname, './db/db.json'))
})


app.post('/api/notes', (req, res)=> {
    console.log(req.body);
    const newNote = req.body
    newNote.id = (Math.random() + 1).toString(36).substring(7)
    fs.readFile('./db/db.json', 'utf-8', (err, data)=> {
        const notes = JSON.parse(data);
        notes.push(req.body);
        fs.writeFile('./db/db.json', JSON.stringify(notes), ()=> {
            res.send('notes added!')
        });
    })
})

app.delete('/api/notes:id', (req, res)=> {
    req.params.id
    fs.readFile('./db/db.json', 'utf-8', (err, data)=> {
        const notes = JSON.parse(data);
        console.log(removeIndex);
        for(var i=0; i < notes.length; i++){
            const note = notes[i];
            if(notes[i].id === req.params.id){
                var removeIndex = i;

            }
        }
        
    })
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