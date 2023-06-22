const { addDays } = require('date-fns')

exports.modelComposition = function (model, period) {
  const compositions = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  let start, end, timeFrame, key, update

  for (key in model) {
    timeFrame = model[key].split(':')
    start = addDays(today, timeFrame[0])
    start.setHours(0, 0, 0)

    end = addDays(today, timeFrame[1])
    end.setHours(23, 59, 59)
    update = true
    if (end <= period.startDate || start >= period.endDate) {
      // Totalmente fora do intervalo
      update = false
    }
    // end = Math.min(end, period.endDate)
    if (end > period.endDate) {
      end = period.endDate
    }
    // start = Math.max(start, period.startDate)
    if (start < period.startDate) {
      start = period.startDate
    }

    if (update === true) {
      compositions.push({
        model: key,
        period: {
          startDate: start,
          endDate: end
        }
      }
      )
    }
  }
  return compositions
}
