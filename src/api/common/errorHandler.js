const _ = require('lodash')

// middleware para tratamento de erros
module.exports = (req, res, next) => {
  const bundle = res.locals.bundle

  if (bundle.erros) {
    const errors = parseErros(bundle.erros)
    res.status(500).json({ erros })
  } else {
    next()
  }
}

const parseErros = (nodeRestfulErros) => {
  const errors = []
  _.forIn(nodeRestfulErros, error => errors.push(error.message))
  return errors
}