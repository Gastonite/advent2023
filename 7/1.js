/* global console */
import input from './input.js'

const FIVE = 7
const FOUR = 6
const FULL = 5
const THREE = 4
const PAIRS = 3
const PAIR = 2
const HIGH = 1

const faceCardWeights = {
  'T': 10,
  'J': 11,
  'Q': 12,
  'K': 13,
  'A': 14,
}

const castInteger = input => +input

const calculateCardWeight = card => (
  faceCardWeights[card] ?? castInteger(card)
)

const parseHands = input => (
  input
    .split('\n')
    .map(line => {

      const [hand, bid] = line.split(' ')

      return {
        hand,
        bid: castInteger(bid)
      }
    })
)

const countHandCards = hand => {

  const cardCounts = new Map()

  for (const card of hand)
    cardCounts.set(
      card,
      (cardCounts.get(card) ?? 0) + 1
    )

  return cardCounts
}

const deduceHandKind = cardCounts => {

  const keys = Array.from(cardCounts.keys())
  const values = Array.from(cardCounts.values())

  if (values.includes(5))
    return FIVE

  if (values.includes(4))
    return FOUR

  if (values.includes(3))
    return keys.length === 2
      ? FULL
      : THREE

  if (keys.length === 3)
    return PAIRS

  if (values.includes(2))
    return PAIR

  if (keys.length === 5)
    return HIGH

  throw new Error('Unknown hand kind')
}

const puzzle = input => {

  const handsByKind = parseHands(input)
    .reduce((before, { hand, bid }) => {

      const kind = deduceHandKind(countHandCards(hand))

      return {
        ...before,
        [kind]: [
          ...(before[kind] === undefined
            ? []
            : before[kind]),
          { hand, bid, kind }
        ]
      }
    }, {})

  return Object.keys(handsByKind)
    .sort()
    .flatMap(kind => {
      const hands = handsByKind[kind]

      if (hands.length < 2)
        return hands[0]

      return hands.sort((a, b) => {

        for (let i = 0; i < 5; i++) {

          const aWeight = calculateCardWeight(a.hand[i])
          const bWeight = calculateCardWeight(b.hand[i])

          if (aWeight === bWeight)
            continue

          return aWeight - bWeight
        }

        throw new Error('Hands are strictely equals')
      })
    })
    .reduce((before, { bid }, i) => before + bid * (i + 1), 0)
}

console.log('result is', puzzle(input)) //251121738