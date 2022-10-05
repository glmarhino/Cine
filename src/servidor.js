const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('./middlewares/token')
const utiles = require('./utiles')
require('dotenv/config')

app.use(bodyParser.json())
app.use(cors())

app.use(jwt.validar.unless({
    path: [{
        url: '/api/autenticar',
        methods: ['POST']
    }]
}))

app.use('/api/inicio', require('./controladores/inicio'))
app.use('/api/usuarios', require('./controladores/usuarios'))
app.use('/api/autenticar', require('./controladores/autenticar'))

mongoose.connect(process.env.BD_CONEXION, {
    useNewUrlParser: true
}).then(() => {
    console.log('Conectado a la base de datos')
    utiles.primerUsuario()
    app.listen(process.env.PUERTO_HTTP, () => {
        console.log(`Servidor iniciado en el puerto ${process.env.PUERTO_HTTP}`)
    })
}).catch(() => {
    console.log('Error de conexión con la base de datos')
})