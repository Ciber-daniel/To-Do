const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express()


app.use(cors())
app.use(bodyParser());

const users = []

app.post('/users', (req,res) => {
    const user = {
        ...req.body,
        id: users.length  + 1,
        tareas: [],
    }
    users.unshift(user)
    res.send(user)
})

app.get('/users', (req,res) => {
    res.send(users)
})

app.get('/users/:id', (req,res) => {
    const user = users.find(u => u.id === parseInt(req.params.id))
    res.send(user)
})

app.post('/users/:id/tareas', (req,res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    user.tareas.unshift(req.body.tarea); // Si enviaste tarea en el body
    res.send(user.tareas)
})

app.get('/users/:id/tareas', (req,res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (user) {
        res.send(user.tareas)
        return;
    }
    res.send([]);
})

app.listen(5000, () => {
    console.log('Started to listen in the port', 5000)
}) 