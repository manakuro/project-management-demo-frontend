import { uniq } from 'src/shared/utils/uniq'

describe('uniq', () => {
  context('when number array', () => {
    it('should be unique', () => {
      const arr1 = [1, 3]
      const arr2 = [1, 2, 3, 4, 5]
      const result = uniq([...arr1, ...arr2])

      expect(result).toEqual([1, 3, 2, 4, 5])
    })
  })
})
