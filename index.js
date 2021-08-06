const express = require('express')

const app = express()

app.use(express.json())

 let notes = [
    {
        "id": 1,
        "content": "hola mundo",
        "date": "2019-05-30T12:20:14.298Z",
        "important": true
    },  
    {
        "id": 2,
        "content": "hola mundo 2",
        "date": "2019-05-11T14:20:14.298Z",
        "important": false
    }    ,
    {
        "id": 3,
        "content": "hola mundo 3",
        "date": "2019-06-30T09:20:14.298Z",
        "important": true
    }    

]


// const app = http.createServer((req, res) => {
//     res.writeHead(200, {'Content-Type': 'application/json'})
//     res.end(JSON.stringify(notes))
// })

app.get('/', (req, res)=>{
    res.send('<h1>Hola mundo</h1>')
})


app.get('/api/notes',(req, res)=>{
    res.json(notes)
})

app.get('/api/notes/:id',(req, res)=>{
    const id = Number(req.params.id)
    const note= notes.find(note=> note.id === id)
    if(note){
        res.json(note)
    }else{
        res.status(404).end()
    }
})

app.delete('/api/notes/',(req, res)=>{
    const id = Number(req.params.id)
    notes = notes.filter(note => note.id !== id)
    res.status(204).end()
})

app.post('/api/notes/',(req, res)=>{
    const note = req.body

    if(note || note.content){
        return res.status(400).json({
            error: 'Content is missing'
        })
    }

    const ids= notes.map(note => note.id)
    const maxId = Math.max(... ids)
    const newNote = {
        id: maxId + 1,
        content: note.content,
        important: typeof note.important !== 'undefined' ? note.important : false,
        date: new Date().toISOString()
    }
    notes = [... notes, newNote]
    res.json(newNote)
})




const PORT= 3001
app.listen(PORT, ()=> {
    console.log(`Server is running in port ${PORT}`)
})