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

const countCards = () => {

}

const exercice = input => {
  const cards = input.split('\n')

  const wonCards = []

  for (let i = 0; i < cards.length; i++) {
    const [, line] = cards[i].split(': ')

    let [winningNumbers, numbers] = line
      .split(' | ')
      .map(parseNumberSequence)

    let winCount = 0
    for (const winningNumber of winningNumbers)
      if (numbers.includes(winningNumber))
        winCount++

    wonCards.push(winCount)
  }

  const countWonCards = (i) => {
    let cardCount = 0

    for (let j = 0; j < wonCards[i]; j++)
      cardCount += countWonCards(i + 1 + j) + 1

    return cardCount
  }

  let cardCount = 0

  for (let i = 0; i < wonCards.length; i++)
    cardCount += countWonCards(i) + 1

  return cardCount
}

console.log('result is', exercice(input)) // 14814534