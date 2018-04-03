export function incrementNumber (number, decimals = 8) {
  const power = Math.pow(0.1, decimals)
  return parseFloat(number + power).toFixed(decimals)
}

export function decrementNumber (number, decimals = 8) {
  const power = Math.pow(0.1, decimals)
  return parseFloat(number - power).toFixed(decimals)
}

export function roundNumberFloor (number) {
  return Math.floor(number)
}

export function roundNumberCeil (number) {
  return Math.ceil(number)
}

export function percentageDifference (left, right) {
  return ((left / right) * 100).toFixed(2)
}
