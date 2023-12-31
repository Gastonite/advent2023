/* global console */
import input from './input.js'

const castInteger = string => +string
const pipe = (...functions) => x => functions.reduce((x, f) => f(x), x)

const parseInput = input => {
  return input
    .split('\n')
    .map(pipe(
      line => (
        line
          .split(/:\s+/)
          .slice(1)[0]
          .split(/\s+/)
          .join('')
      ),
      castInteger
    ))
}

const findMin = (duration, distance) => {
  let min = 0
  let lo = 0
  let hi = duration

  do {
    let middle = Math.floor(lo + (hi - lo) / 2)

    if ((duration - middle) * middle <= distance)
      lo = middle + 1
    else {
      min = middle
      hi = middle
    }

  } while (lo < hi)

  return min
}

const findMax = (duration, distance) => {
  let max = 0
  let lo = 0
  let hi = duration

  do {
    let middle = Math.floor(lo + (hi - lo) / 2)

    if ((duration - middle) * middle <= distance) {
      hi = middle
    } else {
      max = middle
      lo = middle + 1
    }
  } while (lo < hi)

  return max
}

const puzzle = input => {
  const [duration, distance] = parseInput(input)

  const min = findMin(duration, distance)

  const max = findMax(duration, distance)

  return (max - min) + 1
}

console.log('result is', puzzle(input))