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
        const [, id, left, right] = input.match(/^([A-Z0-9]{3}) = \(([A-Z0-9]{3}), ([A-Z0-9]{3})\)$/)

        return {
          ...before,
          [id]: [left, right]
        }
      }, {})
  }
}

const calculateGcd = (a, b) => {
  if (typeof a !== 'number')
    throw new Error(`'a' is not an integer`)
  if (typeof b !== 'number')
    throw new Error(`'b' is not an integer`)

  a = Math.abs(a)
  b = Math.abs(b)

  const rest = a % b

  if (rest === 0)
    return b

  return calculateGcd(b, rest)
}

const calculateLcm = (a, b) => {
  if (typeof a !== 'number')
    throw new Error(`'a' is not an integer`)
  if (typeof b !== 'number')
    throw new Error(`'b' is not an integer`)

  return Math.abs(a * b) / calculateGcd(a, b)
}


const puzzle = input => {

  const countSteps = id => {
    let count = 0
    let i = 0
    let currentId = id
    do {
      if (i > 0 && i % directions.length === 0)
        i = 0

      currentId = nodes[currentId][directions[i]]
      i++
      count++
    } while (!currentId.endsWith('Z'))


    // console.log('end', currentId)
    return count
  }


  // return calculateLcm(60, 168)
  const { directions, nodes } = parseInput(input)
  let count = 0
  let i = 0


  let currentKeys = Object.keys(nodes)
    // let [currentKey] = Object.keys(nodes)
    .filter(key => key.endsWith('A'))
    .map(countSteps)
    .reduce(calculateLcm)

  return currentKeys
}

const example = `
LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`.slice(1)

console.log('result is', puzzle(input))