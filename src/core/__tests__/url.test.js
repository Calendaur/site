const { checkUrl } = require('../url')

test('check corrects url', () => {
  expect(checkUrl('/films/february-2020')).toBe(3)
  expect(checkUrl('/games/march-2021')).toBe(3)
})
