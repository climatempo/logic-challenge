const { addDays } = require('date-fns')

const { modelComposition } = require('./model-composition')
const { models } = require('./constants')

// To make it easier, you can use this index for manual testing during development :p

const currentDate = new Date()

const metPeriod = {
  startDate: currentDate,
  endDate: addDays(currentDate, 4)
}

const wrfPeriod = {
  startDate: addDays(currentDate, 5),
  endDate: addDays(currentDate, 14)
}

const cfsPeriod = {
  startDate: addDays(currentDate, 15),
  endDate: addDays(currentDate, 29)
}

const allPeriod = {
  startDate: currentDate,
  endDate: addDays(currentDate, 29)
}

console.log('METEOROLOGIST')
console.log(modelComposition(models, metPeriod))
console.log('--------------------------------------------')
console.log('WRF')
console.log(modelComposition(models, wrfPeriod))
console.log('--------------------------------------------')
console.log('CFS')
console.log(modelComposition(models, cfsPeriod))
console.log('--------------------------------------------')
console.log('ALL')
console.log(modelComposition(models, allPeriod))

// Test string input, as demanded by README.md
const period = {       
	startDate: '2023-06-27 05:00:01',
	endDate: '2023-07-16 22:00:00',
}
console.log('--------------------------------------------')
console.log('TEST')
console.log(modelComposition(models, period))