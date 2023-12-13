/* global console */
import input from './input.js'


const isDigit = char => char > '/' && char < ':'

const puzzle = input => {

  let sum = 0
  let lines = input.split('\n')
  const lineSize = lines[0].length

  const searchDigitsInSiblingLines = ({
    currentLineIndex,
    charIndex,
    top
  }) => {
    const bottom = !top
    const digits = []
    const line = lines[currentLineIndex]

    if (isDigit(line[charIndex]))
      digits.push({
        top,
        bottom,
        lineIndex: currentLineIndex,
        charIndex,
      })
    else {

      if (charIndex > 0) {
        const leftCharIndex = charIndex - 1
        if (isDigit(line[leftCharIndex]))
          digits.push({
            top,
            bottom,
            left: true,
            lineIndex: currentLineIndex,
            charIndex: leftCharIndex,
          })
      }

      if (charIndex < lineSize - 1) {
        const rightCharIndex = charIndex + 1
        if (isDigit(line[rightCharIndex]))
          digits.push({
            top,
            bottom,
            right: true,
            lineIndex: currentLineIndex,
            charIndex: rightCharIndex,
          })
      }
    }

    return digits
  }

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    const line = lines[lineIndex]

    for (let charIndex = 0; charIndex < line.length; charIndex++) {
      const char = line[charIndex]

      if (char !== '*')
        continue

      const digits = []

      // left
      if (charIndex > 0) {
        const leftCharIndex = charIndex - 1
        if (isDigit(line[leftCharIndex]))
          digits.push({
            lineIndex,
            charIndex: leftCharIndex,
          })
      }

      // right
      if (charIndex < lineSize - 1) {
        const rightCharIndex = charIndex + 1
        if (isDigit(line[rightCharIndex]))
          digits.push({
            lineIndex,
            charIndex: rightCharIndex,
          })
      }

      // top
      if (lineIndex > 0)
        digits.push(...searchDigitsInSiblingLines({
          currentLineIndex: lineIndex - 1,
          charIndex,
          top: true
        }))

      //bottom
      if (lineIndex < lines.length - 1)
        digits.push(...searchDigitsInSiblingLines({
          currentLineIndex: lineIndex + 1,
          charIndex,
          top: false
        }))

      if (digits.length !== 2)
        continue

      const [firstNumber, secondNumber] = digits.map(({
        lineIndex,
        charIndex,
        top,
        bottom,
        left,
        right
      }) => {

        if (!top && !bottom) {
          if (right)
            return buildNumberForward(lines[lineIndex], charIndex)

          if (left)
            return buildNumberBackward(lines[lineIndex], charIndex)
        }

        if (!left && !right) {

          let number = isDigit(lines[lineIndex][charIndex - 1])
            ? buildNumberBackward(lines[lineIndex], charIndex - 1)
            : ''

          return number + buildNumberForward(lines[lineIndex], charIndex)
        }

        if (right)
          return buildNumberForward(lines[lineIndex], charIndex)

        if (left)
          return buildNumberBackward(lines[lineIndex], charIndex)
      })

      sum += firstNumber * secondNumber
    }
  }

  return sum
}

const buildNumberForward = (line, index) => {
  let number = ''

  do {
    number += line[index]
    index++
  } while (isDigit(line[index]))

  return number
}

const buildNumberBackward = (line, index) => {
  let number = ''

  do {
    number = line[index] + number
    index--
  } while (isDigit(line[index]))

  return number
}

console.log('result is', puzzle(input)) // 91031374