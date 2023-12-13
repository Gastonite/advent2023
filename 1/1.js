/* global console */
import input from './input.js'


const puzzle = (text) => {

  const lines = text.split('\n')
  let sum = 0
  for (const line of lines) {

    let first
    let last

    for (const char of line)
      if (char > '/' && char < ':') {
        first = char
        break
      }

    for (let i = line.length - 1; i >= 0; i--) {
      const char = line[i]
      if (char > '/' && char < ':') {
        last = char
        break
      }
    }
    sum += parseInt(first + last, 10)
  }

  return sum
}




console.log(puzzle(input))