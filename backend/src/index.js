const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express()

app.use(cors())
app.use(bodyParser());

let tareas = []

app.post('/tareas',(req,res) => {
    tareas.push(req.body)
    res.send(req.body)
})
        
app.get('/tareas',(req, res) => {
    res.send(tareas)
})

app.listen(5000, () => {
    console.log('Started to listen in the port',5000)
})
