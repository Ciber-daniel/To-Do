const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

const user = ['Sacar la basura','barrer','estudiar','dormir']

app.get('/users', (req,res) => {
    res.send(user)
})


app.listen(3000, () => {
    console.log('Started to listen in the port',3000)
})