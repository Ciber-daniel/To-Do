const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express()

app.use(cors())
app.use(bodyParser());

// let tareas = []

let user = {
    nombre:'',
    email:'',
    tareas:[]
}

app.post('/user', (req,res) => {
    user.nombre= req.body.nombre
    user.email= req.body.email
    res.send(user)

})

app.get('/user', (req,res) => {
    res.send(user)
})

app.post('/tareas',(req,res) => {
    user.tareas.unshift(req.body.tarea)
    res.send(user.tareas)
})

app.get('/tareas',(req, res) => {
    res.send(user.tareas)
})

app.delete('/tareas',(req,res) => {
    user.tareas.splice(req.params, 1)
    res.send(user)
})

app.listen(5000, () => {
    console.log('Started to listen in the port',5000)
})
