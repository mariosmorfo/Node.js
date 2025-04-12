const mathOperation = require('../index')

describe("Calculator Test", () => {

  test('Addition of two numbers', () => {
    let result = mathOperation.sum(2, 3)
    expect(result).toBe(5)
  })

});

