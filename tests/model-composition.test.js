const { addDays, format } = require('date-fns')

const { modelComposition } = require('../src/model-composition')
const { models } = require('../src/constants')

const zeroDay = new Date()

describe('Model composition', () => {
  test('should get only METEOROLOGIST model', async () => {
    const period = {
      startDate: zeroDay,
      endDate: addDays(zeroDay, 4),
    }

    const result = modelComposition(models, period)

    expect(result).toHaveLength(1)
    expect(result[0].model).toBe('METEOROLOGIST')
    expect(result[0].period.startDate).toBe(period.startDate)
    expect(result[0].period.endDate).toBe(period.endDate)
  })

  test('should get a day from the METEOROLOGIST model', async () => {
    const period = {
      startDate: new Date(format(zeroDay, 'yyyy-MM-dd 00:00:00')),
      endDate: new Date(format(zeroDay, 'yyyy-MM-dd 23:59:59')),
    }

    const result = modelComposition(models, period)

    expect(result).toHaveLength(1)
    expect(result[0].model).toBe('METEOROLOGIST')
    expect(result[0].period.startDate).toBe(period.startDate)
    expect(result[0].period.endDate).toBe(period.endDate)
  })

  test('should get only WRF model', async () => {
    const period = {
      startDate: addDays(zeroDay, 5),
      endDate: addDays(zeroDay, 14),
    }

    const result = modelComposition(models, period)

    expect(result).toHaveLength(1)
    expect(result[0].model).toBe('WRF')
    expect(result[0].period.startDate).toBe(period.startDate)
    expect(result[0].period.endDate).toBe(period.endDate)
  })

  test('should get a day from the WRF model', async () => {
    const period = {
      startDate: new Date(format(addDays(zeroDay, 5), 'yyyy-MM-dd 00:00:00')),
      endDate: new Date(format(addDays(zeroDay, 5), 'yyyy-MM-dd 23:59:59')),
    }

    const result = modelComposition(models, period)

    expect(result).toHaveLength(1)
    expect(result[0].model).toBe('WRF')
    expect(result[0].period.startDate).toBe(period.startDate)
    expect(result[0].period.endDate).toBe(period.endDate)
  })

  test('should get only CFS model', async () => {
    const period = {
      startDate: addDays(zeroDay, 15),
      endDate: addDays(zeroDay, 29),
    }

    const result = modelComposition(models, period)

    expect(result).toHaveLength(1)
    expect(result[0].model).toBe('CFS')
    expect(result[0].period.startDate).toBe(period.startDate)
    expect(result[0].period.endDate).toBe(period.endDate)
  })

  test('should get a day from the CFS model', async () => {
    const period = {
      startDate: new Date(format(addDays(zeroDay, 15), 'yyyy-MM-dd 00:00:00')),
      endDate: new Date(format(addDays(zeroDay, 15), 'yyyy-MM-dd 23:59:59')),
    }

    const result = modelComposition(models, period)

    expect(result).toHaveLength(1)
    expect(result[0].model).toBe('CFS')
    expect(result[0].period.startDate).toBe(period.startDate)
    expect(result[0].period.endDate).toBe(period.endDate)
  })

  test('should get METEOROLOGIST and WRF models', async () => {
    const period = {
      startDate: zeroDay,
      endDate: addDays(zeroDay, 14),
    }

    const result = modelComposition(models, period)

    expect(result).toHaveLength(2)

    // METEOROLOGIST
    expect(result[0].model).toBe('METEOROLOGIST')
    expect(result[0].period.startDate).toEqual(period.startDate)
    expect(new Date(result[0].period.endDate)).toEqual(new Date(format(addDays(zeroDay, 4), 'yyyy-MM-dd 23:59:59')))
    // WRF
    expect(result[1].model).toBe('WRF')
    expect(new Date(result[1].period.startDate)).toEqual(new Date(format(addDays(zeroDay, 5), 'yyyy-MM-dd 00:00:00')))
    expect(result[1].period.endDate).toEqual(period.endDate)
  })

  test('should get WRF and CFS models', async () => {
    const period = {
      startDate: addDays(zeroDay, 14),
      endDate: addDays(zeroDay, 29),
    }

    const result = modelComposition(models, period)

    expect(result).toHaveLength(2)

    // WRF
    expect(result[0].model).toBe('WRF')
    expect(result[0].period.startDate).toEqual(period.startDate)
    expect(new Date(result[0].period.endDate)).toEqual(new Date(format(addDays(zeroDay, 14), 'yyyy-MM-dd 23:59:59')))
    // CFS
    expect(result[1].model).toBe('CFS')
    expect(new Date(result[1].period.startDate)).toEqual(new Date(format(addDays(zeroDay, 15), 'yyyy-MM-dd 00:00:00')))
    expect(result[1].period.endDate).toEqual(period.endDate)
  })

  test('should get all models', async () => {
    const period = {
      startDate: zeroDay,
      endDate: addDays(zeroDay, 29),
    }

    const result = modelComposition(models, period)

    const modelKeys = Object.keys(models)

    expect(result).toHaveLength(modelKeys.length)

    modelKeys.forEach((model, index) => expect(result[index].model).toBe(model))

    // METEOROLOGIST
    expect(result[0].period.startDate).toEqual(period.startDate)
    expect(new Date(result[0].period.endDate)).toEqual(new Date(format(addDays(zeroDay, 4), 'yyyy-MM-dd 23:59:59')))
    // WRF
    expect(new Date(result[1].period.startDate)).toEqual(new Date(format(addDays(zeroDay, 5), 'yyyy-MM-dd 00:00:00')))
    expect(new Date(result[1].period.endDate)).toEqual(new Date(format(addDays(zeroDay, 14), 'yyyy-MM-dd 23:59:59')))
    // CFS
    expect(new Date(result[2].period.startDate)).toEqual(new Date(format(addDays(zeroDay, 15), 'yyyy-MM-dd 00:00:00')))
    expect(result[2].period.endDate).toEqual(period.endDate)
  })

  test('should have an execution time of less than 10ms', async () => {
    const period = {
      startDate: zeroDay,
      endDate: addDays(zeroDay, 29),
    }

    const startTime = new Date().getTime()
    modelComposition(models, period)
    const endTime = new Date().getTime()

    expect(endTime - startTime).toBeLessThanOrEqual(10) // ms
  })
})
