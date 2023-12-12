/* global console */
import input from './input.js'

const parseInteger = x => +x

const parseNumberSequence = s => {
  if (s[0] === ' ')
    s = s.slice(1)

  return s
    .split(/\s+/)
    .map(parseInteger)
}

const exercice = input => {
  let sum = 0
  const cards = input.split('\n')

  for (let cardIndex = 0; cardIndex < cards.length; cardIndex++) {
    const [, line] = cards[cardIndex].split(': ')

    let [winningNumbers, numbers] = line
      .split(' | ')
      .map(parseNumberSequence)

    let winCount = 0

    for (const winningNumber of winningNumbers)
      if (numbers.includes(winningNumber))
        winCount++

    if (winCount === 0)
      continue

    sum += Math.pow(2, winCount - 1)
  }

  return sum
}

console.log('result is', exercice(input)) // 33950