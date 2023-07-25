const express = require('express')

// Está sendo importado como função para receber o server como parâmetro já que server já foi instanciado em outro arquivo
module.exports = function (server) {
  // Definir URL base
  const router = express.Router() // Criando uma instância de Router
  server.use('/api', router)

  // Rotas de Clico de pagamento
  const BillingCycle = require('../api/biilingCycle/billingCycleService')
  BillingCycle.register(router, '/billingCycles')
}
