import input from './input.js'

const exercice = input => {

  const games = input.split('\n')

  let sum = 0

  for (let i = 0; i < games.length; i++) {
    let [gameId, handfuls] = games[i].split(': ')

    gameId = parseInt(gameId.slice('Game '.length), 10)
    handfuls = handfuls.split('; ')

    const max = {
      red: 0,
      green: 0,
      blue: 0,
    }

    for (let j = 0; j < handfuls.length; j++) {

      for (const cubeCount of handfuls[j].split(', ')) {
        let [count, color] = cubeCount.split(' ')

        count = parseInt(count, 10)

        if (count > max[color])
          max[color] = count

      }
    }

    sum += max.red * max.green * max.blue
  }

  return sum
}

console.log('result is', exercice(input))