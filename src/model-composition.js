exports.modelComposition = function (model, period) {
  const compositions = []

  // Write the code here
  // Parse dates if necessary (period object may contain Date objects or parsable UTC datetime string)
  let stringMode = false
  let copyStartDate = period.startDate
  let copyEndDate = period.endDate
  if(!(period.startDate instanceof Date)){
    copyStartDate = new Date(period.startDate)
    stringMode = true
  }
  if(!(period.endDate instanceof Date)){
    copyEndDate = new Date(period.endDate)
    stringMode = true
  }
  // Loop over entries in model object
  Object.entries(model).forEach(modelEntry => {
    // Separate model name and model offset in days
    const [modelName, modelOffsets] = modelEntry;
    const modelOffsetsSplit = modelOffsets.split(":")
    // Create Date objects to represent the hypothetical start and end date, if contained in the desired period
    let hypotheticalStartDate = new Date()
    let hypotheticalEndDate = new Date()
    // To this end, we set the UTC variables as asked by the README.md
    hypotheticalStartDate.setUTCHours(0)
    hypotheticalStartDate.setUTCMinutes(0)
    hypotheticalStartDate.setUTCSeconds(0)
    hypotheticalStartDate.setUTCMilliseconds(0)
    hypotheticalEndDate.setUTCHours(23)
    hypotheticalEndDate.setUTCMinutes(59)
    hypotheticalEndDate.setUTCSeconds(59)
    hypotheticalEndDate.setUTCMilliseconds(0)
    // and then increment the date by the given number of days (offset)
    hypotheticalStartDate.setDate(hypotheticalStartDate.getDate() + parseInt(modelOffsetsSplit[0]));
    hypotheticalEndDate.setDate(hypotheticalEndDate.getDate() + parseInt(modelOffsetsSplit[1]));
    // Check if the desired period intersects with the hypothetical model period
    if(stringMode){
      if(hypotheticalStartDate < copyEndDate && copyStartDate < hypotheticalEndDate){
        let modelPeriod = {}
        if(hypotheticalStartDate <= copyStartDate){
          modelPeriod.startDate = formatDate(copyStartDate)
        }
        else{
          modelPeriod.startDate = formatDate(hypotheticalStartDate)
        }
        if(copyEndDate <= hypotheticalEndDate){
          modelPeriod.endDate = formatDate(copyEndDate)
        }
        else{
          modelPeriod.endDate = formatDate(hypotheticalEndDate)
        }
        // Create model period object and append it to the list
        const modelComposition = {"model": modelName, "period": modelPeriod};
        compositions.push(modelComposition);
      }
    }
    else{
      if(hypotheticalStartDate < period.endDate && period.startDate < hypotheticalEndDate){
        let modelPeriod = {}
        // If period.startDate is bigger than or equal to the hypotheticalStartDate, select period.startDate as startDate
        // <= equality is needed to satisfy the toBe condition of the tests, toStrictEqual or toMatchObject would in the test script would be another solution
        if(hypotheticalStartDate <= period.startDate){
          modelPeriod.startDate = period.startDate
        }
        else{
          modelPeriod.startDate = hypotheticalStartDate
        }
        // If period.endDate is smaller than or equal to the hypotheticalEndDate, select period.endDate as endDate
        // <= equality is needed to satisfy the toBe condition of the tests, toStrictEqual or toMatchObject would in the test script would be another solution
        if(period.endDate <= hypotheticalEndDate){
          modelPeriod.endDate = period.endDate
        }
        else{
          modelPeriod.endDate = hypotheticalEndDate
        }
        // Create model period object and append it to the list
        const modelComposition = {"model": modelName, "period": modelPeriod};
        compositions.push(modelComposition);
      }
    }
  });
  return compositions
}

// function to pad number
function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

// function to format date as requested
function formatDate(date) {
  return (
    [
      date.getUTCFullYear(),
      padTo2Digits(date.getUTCMonth() + 1),
      padTo2Digits(date.getUTCDate()),
    ].join('-') +
    ' ' +
    [
      padTo2Digits(date.getUTCHours()),
      padTo2Digits(date.getUTCMinutes()),
      padTo2Digits(date.getUTCSeconds()),
    ].join(':')
  );
}