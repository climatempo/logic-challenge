exports.modelComposition = function (model, period) {

  const timeZoneCorrection = function (date, hours) {
    const adjusted = new Date(date);
    adjusted.setHours(adjusted.getHours() - hours);
    return adjusted;
  }

  const incrementDay = function (date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }


  const compositions = []

  let start = new Date(period["startDate"]); start = timeZoneCorrection(start, start.getTimezoneOffset()/60)
  let   end = new Date(period["endDate"]); end = timeZoneCorrection(end , end.getTimezoneOffset()/60)
  
  let interval = [0,(Number(end)-Number(start))/(1000*60*60*24)];
  if (  end.getHours()*60*60+end.getMinutes()*60+end.getSeconds()
      -(start.getHours()*60*60+start.getMinutes()*60+start.getSeconds()) < 0) ++interval[1];
  interval[1] -= interval[1]%1;

  var present_start = start;
  var present_end   = start;
  for (let i = Object.keys(model).length-1, j=0; i>-1 && interval[0]<=interval[1]; i=Object.keys(model).length-1) {

      for (j = Object.keys(model).length-1;
           j>-1 && Number(model[Object.keys(model)[j]].slice(0,model[Object.keys(model)[j]].indexOf(":")))!==interval[0];
           --j);
      
      let [start_day, end_day] = [Number(model[Object.keys(model)[j]].slice(0,model[Object.keys(model)[j]].indexOf(":"))),
                                  Number(model[Object.keys(model)[j]].slice(model[Object.keys(model)[j]].indexOf(":")+1))];
      
      if (end_day>=interval[1]) present_end = end
      else {
          present_end = incrementDay(present_start, end_day-start_day);
          present_end.setHours(23-present_end.getTimezoneOffset()/60,59,59,999);
      };

      let pushable = {
          model: Object.keys(model)[j],
          period: {
              startDate: new Date(`${present_start.toISOString().slice(0,10)} ${present_start.toISOString().slice(11,19)}`),
              endDate: new Date(`${present_end.toISOString().slice(0,10)} ${present_end.toISOString().slice(11,19)}`),
          }
      };
      
      compositions.push(pushable)

      delete model[Object.keys(model)[j]]
      interval[0]=end_day+1
      present_start = incrementDay(present_end, 1);
      present_start.setHours(0-present_start.getTimezoneOffset()/60,0,0,0);

  };
  return compositions
}
