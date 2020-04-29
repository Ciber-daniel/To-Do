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
    res.send(user.tareas)
})

app.post('/users/:id/tareas', (req,res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    console.log(user.tareas);
    user.tareas.push(req.body.tarea); // Si enviaste tarea en el body
    res.send(users)
})



app.listen(5000, () => {
    console.log('Started to listen in the port', 5000)
})


// app.get('/users/tareas', (req,res) => {
//     const user = users.find(u => u.id === parseInt(req.params.id));
//     res.send(user);
// })

// app.post('/users', (req, res) => {
//     const { nombre, email } = req.body;

//     const user = {
//         id: users.length + 1,
//         nombre,
//         email,
//         tareas: [],
//     }
//     const existingUser = users.find(u => u.email === user.email);

//     if (existingUser) {
//         res.send(existingUser);
//         return;
//     }
//     users.push(user);
//     res.send(user)
// })

// app.get('/tareas', (req, res) => {
//     const tarea = users.find(u => u.id === users.id)
//     res.send(tarea)
// })

// app.delete('/tareas',(req,res) => {
//     user.splice(req.params, 1)
//  })