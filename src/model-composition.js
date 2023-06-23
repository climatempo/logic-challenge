exports.modelComposition = function (model, period) {
  const compositions = []

  // Checks if startDate and endDate are valid instances of Date and, if not, converts the date strings to Date objects
  let startDate = period.startDate
  let endDate = period.endDate

  startDate = startDate instanceof Date ? startDate : new Date(period.startDate)
  endDate = endDate instanceof Date ? endDate : new Date(period.endDate)

  // Loop over entries in the model object
  Object.entries(model).forEach(modelEntry => {
    const [modelName, modelOffsets] = modelEntry
    const modelOffsetsSplit = modelOffsets.split(':')

    // Create Date objects to represent the hypothetical start and end dates within the desired period
    const modelStartDate = new Date()
    modelStartDate.setUTCHours(0, 0, 0, 0)
    modelStartDate.setDate(modelStartDate.getDate() + parseInt(modelOffsetsSplit[0]))

    const modelEndDate = new Date()
    modelEndDate.setUTCHours(23, 59, 59, 0)
    modelEndDate.setDate(modelEndDate.getDate() + parseInt(modelOffsetsSplit[1]))

    // Check if the desired period intersects with the hypothetical model period
    if (modelStartDate < endDate && modelEndDate > startDate) {
      const modelPeriod = {}

      // Determine the start date of the model period based on the intersection with the desired period
      if (modelStartDate <= startDate) {
        modelPeriod.startDate = startDate
      } else {
        modelPeriod.startDate = modelStartDate
      }

      // Determine the end date of the model period based on the intersection with the desired period
      if (endDate <= modelEndDate) {
        modelPeriod.endDate = endDate
      } else {
        modelPeriod.endDate = modelEndDate
      }

      // Create model period object and append it to the list
      const modelComposition = {
        model: modelName,
        period: modelPeriod
      }
      compositions.push(modelComposition)
    }
  })

  return compositions
}
