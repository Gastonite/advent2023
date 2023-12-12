/* global console */
import input from './input.js'

const max = {
  red: 12,
  green: 13,
  blue: 14,
}

const exercice = input => {

  const games = input.split('\n')

  let sum = 0

  for (let i = 0; i < games.length; i++) {
    let [gameId, handfuls] = games[i].split(': ')

    gameId = parseInt(gameId.slice('Game '.length), 10)
    handfuls = handfuls.split('; ')
    let invalid

    gameLoop: for (let j = 0; j < handfuls.length; j++) {

      for (const cubeCount of handfuls[j].split(', ')) {
        let [count, color] = cubeCount.split(' ')

        count = parseInt(count, 10)

        if (count > max[color]) {

          invalid = true
          break gameLoop
        }
      }
    }

    if (!invalid)
      sum += gameId
  }

  return sum
}

console.log('result is', exercice(input))