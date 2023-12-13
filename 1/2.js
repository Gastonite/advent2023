/* global console */
import input from './input.js'

const digits = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
]

const puzzle = (text) => {

  let sum = 0

  for (const line of text.split('\n')) {
    let first
    let last

    for (let i = 0; i < line.length; i++) {

      if (first)
        break

      const char = line[i]

      for (let j = 0; j < digits.length; j++) {
        const digit = digits[j]

        if (char > '/' && char < ':') {
          first = char
          break
        }

        if (line.slice(i, i + digit.length) === digit) {
          first = j + 1 + ''
          break
        }
      }
    }

    for (let i = line.length - 1; i >= 0; i--) {
      if (last)
        break

      const char = line[i]

      for (let j = 0; j < digits.length; j++) {
        const digit = digits[j]

        if (char > '/' && char < ':') {
          last = char
          break
        }

        if (line.slice(i - digit.length + 1, i + 1) === digit) {
          last = j + 1 + ''
          break
        }
      }
    }

    sum += parseInt(first + last, 10)
  }

  return sum
}

console.log(puzzle(input))