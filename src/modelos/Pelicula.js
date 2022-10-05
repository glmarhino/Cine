const mongoose = require('mongoose')

const PeliculaEsquema = mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  detalle: {
    type: String,
    required: true
  },
  codigo: {
    type: String,
    required: true
  },
  imagen: {
    type: String,
    required: false
  },
  horarios: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Horario',
      required: false
    }
  ]
}, {
  timestamps: true,
  versionKey: false
})

module.exports = mongoose.model('Pelicula', PeliculaEsquema)