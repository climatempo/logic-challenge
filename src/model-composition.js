exports.modelComposition = function (model, period) {
  const compositions = []

  Object.entries(models).forEach(([model, limits]) => {
    const [startOffset, endOffset] = limits.split(':').map(Number);
    const modelStartDate = new Date();
    modelStartDate.setDate(modelStartDate.getDate() + startOffset);
    const modelEndDate = new Date();
    modelEndDate.setDate(modelEndDate.getDate() + endOffset);

    if (modelStartDate >= start && modelEndDate <= end) {
      result.push({
        model,
        period: {
          startDate: modelStartDate.toISOString(),
          endDate: modelEndDate.toISOString(),
        }
      });
    }
  });

  return compositions
}
