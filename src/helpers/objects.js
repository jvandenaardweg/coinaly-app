import pickBy from 'lodash/pickBy'

export function filterObjectKeys (list, match) {
  return pickBy(list, (values, key) => {
    return key.includes(match)
  })
}
