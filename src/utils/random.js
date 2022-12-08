export function randomElement(array) {
  return array[~~(Math.random() * array.length)]
}

export function randomBetween(a, b) {
  return ~~(Math.random() * (b - a)) + a
}
