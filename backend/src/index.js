const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

const tareas = ['Sacar la basura','barrer','estudiar','dormir']

app.get('/tareas', (req,res) => {
    res.send(tareas)
})



app.listen(3000, () => {
    console.log('Started to listen in the port',3000)
})