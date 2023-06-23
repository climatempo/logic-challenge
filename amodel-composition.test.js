const startTime = new Date().getTime()
await modelComposition(models, period)
const result = modelComposition(models, period)
const endTime = new Date().getTime()

expect(endTime - startTime).toBeLessThanOrEqual(10); // ms
expect(result).toHaveLength(3)

const execTime = endTime - startTime

console.log('execTime:', `${execTime}ms`)

expect(execTime).toBeLessThanOrEqual(10) // ms
