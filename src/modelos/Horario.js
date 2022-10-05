const mongoose = require('mongoose')

const HorarioEsquema = mongoose.Schema({
  fechaInicio: {
    type: Date,
    required: true
  },
  fechaFin: {
    type: Date,
    required: true
  },
  horaInicio: {
    type: Date,
    required: true
  },
  horaFin: {
    type: Date,
    required: true
  },
  pelicula: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pelicula',
    required: true
  },
  sala: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sala',
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
})

module.exports = mongoose.model('Horario', HorarioEsquema)