/* global console */
import input from './input.js'

const castInteger = string => +string

const parseInput = input => {
  return input
    .split('\n')
    .map(line => (
      line
        .split(/:\s+/)
        .slice(1)[0]
        .split(/\s+/)
        .map(castInteger)
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
  const [durations, distances] = parseInput(input)
  let result = 1
  let min = 0
  let max = 0

  for (let i = 0; i < durations.length; i++) {
    const duration = durations[i]
    const distance = distances[i]
    min = findMin(duration, distance)

    max = findMax(duration, distance)

    result *= (max - min) + 1

    console.log({
      min,
      max,
      total: (max - min) + 1
    })
  }

  return result
}

console.log('result is', puzzle(input))