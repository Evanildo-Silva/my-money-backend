const BillingCycle = require('./billingCycle')
const errorHandler = require('../common/errorHandler')

BillingCycle.methods(['get', 'post', 'put', 'delete'])
BillingCycle.updateOptions({ new: true, runValidators: true })
BillingCycle.after('post', errorHandler).after('put', errorHandler)

// buscando o contador
BillingCycle.route('count', (req, res, next) => {
  BillingCycle.count((error, value) => {
    // tratando os erros
    if (error) {
      res.status(500).json({ errors: [error] })
    } else {
      res.json({ value })
    }
  })
})

BillingCycle.route('get', (req, res, next) => {

  BillingCycle.find({}, (err, docs) => {

    if (!err) {

      res.json(docs)

    } else {

      res.status(500).json({ errors: [error] })

    }

  })

})

BillingCycle.route('summary', (req, res, next) => {
  BillingCycle.aggregate([{
    // Extraindo todos od creditos e debitos de cada ciclo de pagamento
    $project: { credit: { $sum: "$credits.value" }, debt: { $sum: "$debts.value" } }
  }, {
    // Agrupando e somando tudo que foi obtido no project
    $group: { _id: null, credit: { $sum: "$credit" }, debt: { $sum: "$debt" } }
  }, {
    // Retirando o id e projentando os resultados
    $project: { _id: 0, credit: 1, debt: 1 }
  }]).exec((error, result) => {
    if (error) {
      res.status(500).json({ errors: [error] })
    } else {
      res.json(result[0] || { credit: 0, debt: 0 })
    }
  })
})

module.exports = BillingCycle