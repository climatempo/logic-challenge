# Logic Challenge

Here at Climatempo we work with several meteorological models to consult forecast data, but the models are accurate up to a certain number of days, so we need to consult several models to compose the best result for the period sought.

The challenge is to implement a logic to assemble this composition of models with the best days of each model.

## What will be evaluated?

- Logical reasoning

- Creativity

- Good coding practices

- Interpretation capacity

## How to do the challenge?

1. Fork the challenge

2. Solve the challenge

3. Open the pull request

4. [Answer the form](https://docs.google.com/forms/d/e/1FAIpQLSfPIwojh04iSxIrrOJSyrMvYcStLpoO3luR11ZxBY_pkWsjGA/viewform)

Any questions please contact our team

## Rules

- The composition must be made from the current date
- The limit of each model must be respected, this means that there cannot be date conflicts between the models
- The first day of the first model and the last day of the last model must be equal to the specified period
- There can be no date holes between models
- The all tests need to be passing

## Expected model input

```javascript
const models = {
  METEOROLOGIST: '0:4', // 0 -> current datetime; 4 -> current datetime + 4 days
  WRF: '5:14', // 5 -> current datetime + 5 days; 14 -> current datetime + 14 days
  CFS: '15:29', // 15 -> current datetime + 15 days; 29 -> current datetime + 29 days
}
```

- The object key is the model name

- The value of the object is the day limits of the model. Start and end respectively

## Example

```javascript
const models = {
  METEOROLOGIST: '0:4',
  WRF: '5:14',
  CFS: '15:29',
}

const period = {       
	startDate: '2023-03-08 05:00:01',
	endDate: '2023-03-20 22:00:00'
}

modelComposition(models, period)
// The result must be:
/**
[
  {
    model: 'METEOROLOGIST',
    period: {
      startDate: '2023-03-08 05:00:01',
      endDate: '2023-03-12 23:59:59'
    }
  },
  {
    model: 'WRF',
    period: {
      startDate: '2023-03-13 00:00:00',
      endDate: '2023-03-20 22:00:00'
    }
  }
]

*/
```
The CFS model is not included because the final period informed is within the limits of the WRF, 
because the current day 2023-03-08 + 29 days is 2023-04-06

## Expected response format

```javascript
[
  {
    model: <METEOROLOGIST|WRF|CFS>,
    period: {
      startDate: <yyyy-MM-dd HH:mm:ss>,
      endDate: <yyyy-MM-dd HH:mm:ss>,
    }
  }
]
```

- `model`: Model name

- `period`:

	- `startDate`: Start date (format: yyyy-MM-dd HH:mm:ss)
	
	- `endDate`: End date (format: yyyy-MM-dd HH:mm:ss)

-------------------------------------------------------------------------------------------------

## Good luck!
