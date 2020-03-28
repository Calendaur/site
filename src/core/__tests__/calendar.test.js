import { range, chunkify, getWeeks } from '../calendar'

test('check range function', () => {
  expect(range(1, 6)).toEqual([1, 2, 3, 4, 5, 6])
})

test('check chunkify function', () => {
  expect(chunkify([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3)).toEqual([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [10, undefined, undefined],
  ])
})

test('check formation of weeks', () => {
  expect(getWeeks(2020, 2)).toEqual([
    [undefined, undefined, undefined, undefined, undefined, undefined, 1],
    [2, 3, 4, 5, 6, 7, 8],
    [9, 10, 11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20, 21, 22],
    [23, 24, 25, 26, 27, 28, 29],
    [30, 31, undefined, undefined, undefined, undefined, undefined],
  ])
})
