const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express()


app.use(cors())
app.use(bodyParser());

const users = []

app.post('/users', (req,res) => {
    users.push({
        ...req.body,
        id: users.length  + 1,
        tareas: [],
    })
    res.send(req.body)
})

app.get('/users', (req,res) => {
    const user = users.find(u => u.email === u.email)
    res.send(users)
})

app.post('/users/:id/tareas', (req,res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    user.tareas.push(req.body.tarea); // Si enviaste tarea en el body
    res.send(users)
})

app.get('users/:id/tareas', (req,res) => {
    const user = users.find(u => u.id === u.id);
    res.send(users)
})

app.listen(5000, () => {
    console.log('Started to listen in the port', 5000)
}) 