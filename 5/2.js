/* global console */
import input from './input.js'


const castInteger = string => +string
const parseSeeds = string => (
  string
    .split(': ')[1]
    .split(' ')
    .map(castInteger)
)

const expandSeedsIntoRanges = seeds => {
  const ranges = []

  for (let i = 0; i < seeds.length; i += 2)
    ranges.push([
      seeds[i],
      seeds[i] + seeds[i + 1]
    ])

  return ranges
}

const property = key => object => object[key]
const map = f => array => array.map(f)
const sort = f => array => array.sort(f)
const pipe = (...functions) => x => functions.reduce((x, f) => f(x), x)

const parseTransformRanges = string => {
  return string
    .split(':\n')[1]
    .split('\n')
    .map(pipe(
      range => range.split(' '),
      map(castInteger),
      ([destination, source, length]) => ({
        range: [
          source,
          source + length
        ],
        offset: destination - source,
      })
    ))
    .sort((a, b) => a.range[0] - b.range[0])
}


const resolveDestination = transformRanges => sourceRanges => {
  const destinationRanges = []

  seedRangeLoop: for (let [min, max] of sourceRanges) {

    const minTransform = transformRanges[0][0]
    const maxTransform = transformRanges[transformRanges.length - 1][1]

    if (min < minTransform) {

      if (max < minTransform) {
        destinationRanges.push([min, max])
        continue
      }

      destinationRanges.push([min, minTransform])
      min = minTransform
    }

    if (max >= maxTransform) {

      if (min >= maxTransform) {
        destinationRanges.push([min, max])
        continue
      }

      destinationRanges.push([maxTransform, max])
      max = maxTransform
    }

    for (const { range, offset } of transformRanges) {

      if (range[0] <= min && min < range[1]) {

        if (max < range[1]) {

          destinationRanges.push([
            min + offset,
            max + offset,
          ])

          continue seedRangeLoop
        }

        destinationRanges.push([
          min + offset,
          range[1] + offset,
        ])

        min = range[1]
      }
    }
  }

  return destinationRanges
}

const puzzle = input => {
  let [seeds, ...ranges] = input.split('\n\n')

  return pipe(
    parseSeeds,
    expandSeedsIntoRanges,
    ...map(pipe(
      parseTransformRanges,
      resolveDestination
    ))(ranges),
    sort((a, b) => a[0] - b[0]),
    property(0),
    property(0),
  )(seeds)
}

console.log('result is', puzzle(input)) // 84206669