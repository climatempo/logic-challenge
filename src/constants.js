const { modelComposition } = require('./src/model-composition');
const { models } = require('./src/constants');

const zeroDay = new Date();

const period = {
  startDate: zeroDay,
  endDate: new Date(zeroDay.getTime() + 1000 * 60 * 60 * 24 * 29), // Adiciona 29 dias à data inicial
};

modelComposition(models, period)
  .then(result => {
    console.log(result);
    const modelKeys = Object.keys(models);

    expect(result).toHaveLength(modelKeys.length);

    // METEOROLOGIST
    expect(result[0].model).toBe('METEOROLOGIST');
    expect(result[0].period.startDate).toEqual(period.startDate);
    expect(new Date(result[0].period.endDate)).toEqual(new Date(zeroDay.getTime() + 1000 * 60 * 60 * 24 * 4 - 1));

    // WRF
    expect(result[1].model).toBe('WRF');
    expect(new Date(result[1].period.startDate)).toEqual(new Date(zeroDay.getTime() + 1000 * 60 * 60 * 24 * 5));
    expect(new Date(result[1].period.endDate)).toEqual(new Date(zeroDay.getTime() + 1000 * 60 * 60 * 24 * 14 - 1));

    // CFS
    expect(result[2].model).toBe('CFS');
    expect(new Date(result[2].period.startDate)).toEqual(new Date(zeroDay.getTime() + 1000 * 60 * 60 * 24 * 15));
    expect(new Date(result[2].period.endDate)).toEqual(new Date(zeroDay.getTime() + 1000 * 60 * 60 * 24 * 29 - 1));

    const startTime = new Date().getTime();
    return modelComposition(models, period);
  })
  .then(result => {
    const endTime = new Date().getTime();

    expect(result).toHaveLength(3);

    const execTime = endTime - startTime;

    console.log('execTime:', `${execTime}ms`);

    expect(execTime).toBeLessThanOrEqual(10); // ms
  })
  .catch(error => {
    console.error(error);
  });
