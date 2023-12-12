/* global console */
import input from './input.js'


const isDigit = char => char > '/' && char < ':'

const exercice = input => {

  let sum = 0
  const numbers = []
  let lines = input.split('\n')

  const lineSize = lines[0].length

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    let currentNumber = ''

    for (let j = 0; j < line.length; j++) {
      const char = line[j]

      if (!isDigit(char))
        continue

      currentNumber += char

      if (j === line.length - 1 || !isDigit(line[j + 1])) {

        numbers.push({
          line: i,
          value: parseInt(currentNumber, 10),
          from: j - (currentNumber.length - 1),
          to: j,
        })
        currentNumber = ''
        continue
      }
    }
  }

  numbersLoop: for (let i = 0; i < numbers.length; i++) {
    const { line, value, from, to } = numbers[i]

    // left
    if (from > 0)
      if (lines[line][from - 1] !== '.') {
        sum += value
        continue
      }

    // right
    if (to < lineSize - 1)
      if (lines[line][to + 1] !== '.') {
        sum += value
        continue
      }

    const rangeFrom = from > 0 ? from - 1 : from
    const rangeTo = to < lineSize - 1 ? to + 1 : to

    //top
    if (line > 0)
      for (const char of lines[line - 1].slice(rangeFrom, rangeTo + 1))
        if (char !== '.') {
          sum += value
          continue numbersLoop
        }

    //bottom
    if (line < lines.length - 1)
      for (const char of lines[line + 1].slice(rangeFrom, rangeTo + 1))
        if (char !== '.') {
          sum += value
          continue numbersLoop
        }
  }

  return sum
}

console.log('result is', exercice(input))