const mongoose = require('mongoose')

const FacturaEsquema = mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  nit: {
    type: Number,
    required: true
  },
  horario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Horario',
    required: true
  },
  butacas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Butaca',
      required: true
    }
  ]
}, {
  timestamps: true,
  versionKey: false
})

module.exports = mongoose.model('Factura', FacturaEsquema)