function Clima() {
  const models = {
    METEOROLOGIST: '0:4',
    WRF: '5:14',
    CFS: '15:29',
  };

  const period = {
    startDate: '2023-03-08 05:00:01',
    endDate: '2023-03-20 22:00:00',
  };

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    const second = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }

  function getModelComposition(models, period) {
    const startDate = new Date(period.startDate);
    const endDate = new Date(period.endDate);

    const result = [];

    Object.entries(models).forEach(([model, range]) => {
      const [startDay, endDay] = range.split(':').map(Number);

      const modelStartDate = new Date(startDate);
      const modelEndDate = new Date(startDate);

      modelStartDate.setDate(modelStartDate.getDate() + startDay);
      modelEndDate.setDate(modelEndDate.getDate() + endDay);

      modelStartDate.setHours(0, 0, 0);
      modelEndDate.setHours(23, 59, 59);

      if (modelStartDate <= endDate && modelEndDate >= startDate) {
        const adjustedStartDate = modelStartDate < startDate ? startDate : modelStartDate;
        const adjustedEndDate = modelEndDate > endDate ? endDate : modelEndDate;

        result.push({
          model,
          period: {
            startDate: formatDate(adjustedStartDate),
            endDate: formatDate(adjustedEndDate),
          },
        });
      }
    });

    return result;
  }

  const compositionResult = getModelComposition(models, period);

  console.log(compositionResult);
}

Clima();
