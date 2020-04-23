const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express()


app.use(cors())
app.use(bodyParser());

const users = []
let tareas = []

app.get('/user', (req,res) => {
    res.send(users)
})

app.post('/user', (req,res) => {
    users.unshift(req.body)
    const tareasExtraidas = users.find(user => user.email === req.body.email)
    tareas.unshift(tareasExtraidas.tarea)
})

app.get('/tareas',(req, res) => {
  res.send(tareas)
})

// app.delete('/tareas',(req,res) => {
//     user.splice(req.params, 1)
//  })
   
app.listen(5000, () => {
    console.log('Started to listen in the port',5000)
})


// let malditosUsuarios = [ {nombre:'Daniel',apellido:'Rodriguez',email:'danieljrfinol@hotmail.com', id:0 },{nombre:'Pedro',apellido:'Rodriguez',email:'danielfinol@hotmail.com', id:1}]

// const unaMalditPrueba = iuser.find(element => element.nombre === 'Daniel')