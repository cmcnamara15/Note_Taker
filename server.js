// Required files and packages 
const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db/db.json');
const PORT = process.env.PORT || 3001;

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


// Route that allows user to post notes and gives unique id 
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


// Route built to connect the logic to a delete note 
app.delete('/api/notes/:id', (req, res)=> {
    fs.readFile('./db/db.json', 'utf-8', (err, data)=> {
        const db = JSON.parse(data)
        const notes = req.params.id;
        console.log(notes)
        for(var i=0; i < db.length; i++){
            const note = db[i];
            if(note.id === notes){
                db.splice(i, 1);
                fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(db), (err)=> {
                    if(err){
                        console.log(err)
                    }
                })
            }
        }
        res.json("Note Deleted!")
    })
})


// Get route that pulls everything 
app.get('/*', (req,res)=> {
    res.sendFile(path.join(__dirname, './public/index.html'))
})


// Method that binds with specific host 
app.listen(PORT, () => {
    console.log('server is running')
});

// Server file contains all necessary routes for application to function properly 