const mongoose = require('mongoose')

const SalaEsquema = mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  filas: {
    type: Number,
    required: true
  },
  columnas: {
    type: Number,
    required: true
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

module.exports = mongoose.model('Sala', SalaEsquema)