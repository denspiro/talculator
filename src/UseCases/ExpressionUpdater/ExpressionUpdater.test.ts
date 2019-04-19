import test from "tape"
import Expression from "../../Entities/Expression"
import ExpressionUpdater from "./ExpressionUpdater"

const expression = new Expression()
const expressionUpdater = new ExpressionUpdater(expression, {
  displayValue (value: string) {
    console.log(value)
  }
})

// isNumber tests

test("isNumber should return whether the expression is a number or not", (t) => {  
  let isNumber = expressionUpdater.isNumber.bind(expressionUpdater)

  t.true(isNumber("22"), "22 is a number")
  
  t.false(isNumber("26 - 3"), "26 - 3 is not a number")

  t.true(isNumber("0.2"), "0.2 is a number")

  t.true(isNumber(".2"), ".2 is a number")

  t.false(isNumber("0.2 + .34 - "), "0.2 + .34 - is not a number")

  t.false(isNumber(" + "), "+ is not a number")

  t.false(isNumber("_"), "- is not a number")
  
  t.end()
})


// getLastNumber tests

test("getLastNumber should return the last number from the expression", (t) => {
  let getLastNumber = expressionUpdater.getLastNumber.bind(expressionUpdater)

  t.equal(getLastNumber("22 + 33 - "), "33")

  t.equal(getLastNumber("22 + 33"), "33")

  t.equal(getLastNumber("22 + .33"), ".33")

  t.equal(getLastNumber("0.03 - "), "0.03")

  t.end()
})

// getLastTerm tests 

test("getLastTerm should return the last value from the expression", (t) => {
  let getLastTerm = expressionUpdater.getLastTerm.bind(expressionUpdater)

  t.equal(getLastTerm("234 - "), "-")

  t.equal(getLastTerm("234 * 556"), "556")

  t.end()
})

// getSubExpressionWithoutLastTerm tests 

test("getSubExpressionWithoutLastTerm should return everything but the last value from the"+ 
  " expression", (t) => {
  let getSubExpressionWithoutLastTerm = 
    expressionUpdater.getSubExpressionWithoutLastTerm.bind(expressionUpdater)

  t.equal(getSubExpressionWithoutLastTerm("234"), "23")
  
  t.equal(getSubExpressionWithoutLastTerm("234 + "), "234")

  t.end()
})

// isLastValueOperator tests 

test("isLastValueOperator should return if the last value of the expression"
  + " is an operator", (t) => {
  let isLastValueOperator = 
    expressionUpdater.isLastValueOperator.bind(expressionUpdater)

  t.true(isLastValueOperator("234 + 33 -"), "234 + 33 - ends with an operator")

  t.false(isLastValueOperator("234 - 467"), "234 - 467 does not end with an operator")

  t.false(isLastValueOperator("0"))

  t.end()
})

test("getNewExpression should update the expression correctly", (t) => {
  let getNewExpression = 
    expressionUpdater.getNewExpression.bind(expressionUpdater)
  
  t.equal(getNewExpression("22", "CE"),"2")

  t.equal(getNewExpression("220", "+"), "220 + ")

  t.equal(getNewExpression("220 + 33", "AC"),"0")

  t.equal(getNewExpression("0", "22"), "22")

  t.end()
})