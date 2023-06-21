exports.modelComposition = function (model, period) {
  const startDate = new Date(period.startDate.getTime());
  const endDate = new Date(period.endDate.getTime());

  const modelKeys = Object.keys(model);
  const composition = [];

  for (let i = 0; i < modelKeys.length; i++) {
    const modelName = modelKeys[i];
    const [startOffset, endOffset] = model[modelName].split(':');
    
    const modelStartDate = new Date(startDate);
    modelStartDate.setDate(modelStartDate.getDate() + parseInt(startOffset));

    const modelEndDate = new Date(startDate);
    modelEndDate.setDate(modelEndDate.getDate() + parseInt(endOffset));


    if (modelStartDate <= endDate && modelEndDate >= startDate) {
      const modelPeriod = {
        startDate: modelStartDate,
        endDate: modelEndDate
      };

      if (modelStartDate < startDate) {
        modelPeriod.startDate = startDate;
      }

      if (modelEndDate > endDate) {
        modelPeriod.endDate = endDate;
      }

      if (!composition[modelName]) {
        composition[modelName] = [];
      }

      composition[modelName].push({
        model: modelName,
        period: modelPeriod
      });
    }
  }

  const result = [];
  for (const modelName in composition) {
    result.push(...composition[modelName]);
  }

  return result;
}