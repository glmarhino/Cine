const mongoose = require('mongoose')
const Usuario = require('./modelos/Usuario')

const primerUsuario = async function(callback) {
    const usuarios = await Usuario.find({})
    if (usuarios.length == 0) {
        const usuario = await Usuario.create({
            nombre: 'Super',
            apellido: 'Admin',
            telefono: null,
            email: null,
            direccion: null,
            usuario: 'admin',
            clave: 'admin',
            rol: 'Administrador'
        })
        console.log('Creado usuario admin')
    }
}

const idValido = function(id) {
    return mongoose.Types.ObjectId.isValid(id)
}

const errorBD = function(error, res) {
    console.log(error)
    if (error.code == 11000) {
        let errors = {}
        errors[`${Object.keys(error.keyValue)[0]}`] = 'No se permiten duplicados'
        return res.status(422).json({
            error: true,
            mensaje: 'Registro duplicado',
            datos: errors
        })
    } else if (error.name === "ValidationError") {
        let errors = {}
        Object.keys(error.errors).forEach((key) => {
            errors[key] = 'Campo requerido'
        })
        return res.status(422).json({
            error: true,
            mensaje: 'Registro inválido',
            datos: errors
        })
    } else {
        console.log(error)
        return res.status(500).json({
            error: true,
            mensaje: 'Error en el servidor',
            datos: {}
        })
    }
}

exports.primerUsuario = primerUsuario
exports.idValido = idValido
exports.errorBD = errorBD