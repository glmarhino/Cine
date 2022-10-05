const express = require('express')
const router = express.Router()
const Pelicula = require('../modelos/Pelicula')
const utiles = require('../utiles')

router.get('/', async (req, res) => {
  const peliculas = await Pelicula.find({}).sort({createdAt: 'desc'})
  return res.status(200).json({
    error: false,
    mensaje: 'Lista de registros',
    datos: {
      peliculas: peliculas
    }
  })
})

router.get('/:id', async (req, res) => {
  if (!utiles.idValido(req.params.id)) {
    return res.status(404).json({
      error: true,
      mensaje: 'Registro inexistente',
      datos: {}
    })
  }

  const pelicula = await Pelicula.findById(req.params.id)
  if (!pelicula) {
    return res.status(404).json({
      error: true,
      mensaje: 'Registro inexistente',
      datos: {}
    })
  } else {
    res.status(200).json({
      error: false,
      mensaje: 'Registro encontrado',
      datos: {
        pelicula: pelicula
      }
    })
  }
})

router.patch('/:id', async (req, res) => {
  if (!utiles.idValido(req.params.id)) {
    return res.status(404).json({
      error: true,
      mensaje: 'Registro inexistente',
      datos: {}
    })
  }

  const pelicula = await Pelicula.findOneAndUpdate({
    _id: req.params.id
  }, req.body, {
    new: true
  })
  if (!pelicula) {
    return res.status(404).json({
      error: true,
      mensaje: 'Registro inexistente',
      datos: {}
    })
  } else {
    pelicula.imagen = undefined
    res.status(200).json({
      error: false,
      mensaje: 'Registro actualizado',
      datos: {
        pelicula: pelicula
      }
    })
  }
})

router.post('/', async (req, res) => {
  try {
    const pelicula = await Pelicula.create(req.body)
    pelicula.imagen = undefined
    return res.status(200).json({
      error: false,
      mensaje: 'Registro almacenado',
      datos: {
        pelicula: pelicula
      }
    })
  } catch(error) {
    return utiles.errorBD(error, res)
  }
})

router.delete('/:id', async (req, res) => {
  if (!utiles.idValido(req.params.id)) {
    return res.status(404).json({
      error: true,
      mensaje: 'Registro inexistente',
      datos: {}
    })
  }

  const pelicula = await Pelicula.findOneAndDelete({
    _id: req.params.id
  })
  if (!pelicula) {
    return res.status(404).json({
      error: true,
      mensaje: 'Registro inexistente',
      datos: {}
    })
  } else {
    pelicula.imagen = undefined
    res.status(200).json({
      error: false,
      mensaje: 'Registro eliminado',
      datos: {
        pelicula: pelicula
      }
    })
  }
})

module.exports = router