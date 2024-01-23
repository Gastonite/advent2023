/* global console */
import input from './input.js'

const LEFT = 0
const RIGHT = 1

const parseInput = input => {
  const [directions, nodes] = input.split('\n\n')

  return {
    directions: directions
      .split('')
      .map(d => d === 'L' ? LEFT : RIGHT),
    nodes: nodes
      .split('\n')
      .reduce((before, input) => {
        const [, id, left, right] = input.match(/^([A-Z]{3}) = \(([A-Z]{3}), ([A-Z]{3})\)$/)

        return {
          ...before,
          [id]: [left, right]
        }
      }, {})
  }
}

const puzzle = input => {
  // return parseInput(input).directions
  const { directions, nodes } = parseInput(input)

  let count = 0
  let i = 0
  const destinationNode = 'ZZZ'
  let currentNode = 'AAA'

  do {
    if (i % directions.length === 0)
      i = 0

    // // if (count > 10)
    // //   break
    // process.stdout.write('.')
    // // console.log('direction', {
    // //   i,
    // //   direction: directions[i],
    // //   currentNode,
    // //   size: directions.length,
    // //   modulo: i % directions.length,
    // // })

    currentNode = nodes[currentNode][directions[i]]

    i++
    count++

  } while (currentNode !== destinationNode)

  return count
}

const example = `
RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`.slice(1)

const example2 = `
LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`.slice(1)

console.log('result is', puzzle(input))