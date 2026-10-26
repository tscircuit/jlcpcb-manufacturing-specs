import {
  evaluateQuotePredictions,
  type QuoteBenchmarkCase,
  type QuotePrediction,
} from "../lib/quote/evaluate-quote-predictions"

const [casesPath, predictionsPath] = process.argv.slice(2)
if (!casesPath || !predictionsPath)
  throw new Error(
    "Usage: bun scripts/benchmark-quotes.ts cases.json predictions.json",
  )
const cases: QuoteBenchmarkCase[] = await Bun.file(casesPath).json()
const predictions: QuotePrediction[] = await Bun.file(predictionsPath).json()
const result = evaluateQuotePredictions(cases, predictions)
console.log(
  JSON.stringify(
    result,
    (_, value) => (value === Infinity ? "Infinity" : value),
    2,
  ),
)
if (!result.passed) process.exitCode = 1
