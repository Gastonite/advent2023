/* global URL */
import { resolve } from 'node:path'
import input from './input.js'
import { writeFile } from 'node:fs/promises'

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


const generateGraph = input => {
  const { nodes } = parseInput(input)
  return 'digraph G {\n' + Object.entries(nodes).map(([from, destinations]) => {
    return destinations.map(to => `  "${from}" -> "${to}"`).join('\n')
  }).join('\n') + '\n}'
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


await writeFile(new URL('./graph.graphviz', import.meta.url), generateGraph(input))
// console.log('graph is:\n\n', generateGraph(input))

