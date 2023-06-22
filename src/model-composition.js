const { addDays } = require('date-fns')

exports.modelComposition = function (model, period) {
  // console.log('exports.modelComposition')
  const compositions = []
  // console.log(period)
  const today = new Date()
  today.setHours(23)
  today.setMinutes(59)
  today.setSeconds(59)

  let start, end, timeFrame, key, update

  for (key in model) {
    timeFrame = model[key].split(':')
    start = addDays(today, timeFrame[0])
    end = addDays(today, timeFrame[1])
    // console.log(timeFrame)

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
          startDate: start, //.toISOString(), //.replace('T', ' ').substring(0, 19),
          endDate: end //.toISOString() //.replace('T', ' ').substring(0, 19)
        // yyyy-MM-dd 00:00:00
        }
      }
      )
    }

    //
    //
    // console.log(newValue)
  }
  // Write the code here
  return compositions
}
