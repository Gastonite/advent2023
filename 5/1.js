/* global console */
import input from './input.js'



const parseSeeds = s => {
  return s
    .split(': ')[1]
    .split(' ')
    .map(seed => +seed)
}

const parseRanges = s => {
  return s
    .split(':\n')[1]
    .split('\n')
    .map(range => (range.split(' ')))
    .map(([destination, source, length]) => ({
      destination: +destination,
      source: +source,
      length: +length
    }))
}

const apply = f => (args) => f.apply(null, args)
const map = f => x => x.map(f)
const pipe = (...fs) => x => fs.reduce((x, f) => f(x), x)

const resolveDestination = ranges => seed => {

  let destination = seed

  for (const range of ranges) {

    if (seed >= range.source && seed < range.source + range.length) {
      const offset = range.destination - range.source
      destination = seed + offset
      break
    }
  }

  return destination
}

const puzzle = input => {
  let [seeds, ...ranges] = input.split('\n\n')

  return pipe(
    parseSeeds,
    map(pipe(
      ...ranges
        .map(pipe(
          parseRanges,
          resolveDestination
        ))
    )),
    apply(Math.min)
  )(seeds)
}

console.log('result is', puzzle(input))