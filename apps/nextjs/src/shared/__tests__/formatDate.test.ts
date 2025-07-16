import { formatDueDate } from 'src/shared/date';
import { mockDate } from 'src/testUtils';

describe('formatDueDate', () => {
  mockDate('2021/4/5');

  context('when its in the next five days', () => {
    it('should return week day', () => {
      const date = '2021/4/7';
      const result = formatDueDate(date);

      expect(result).toEqual('Wednesday');
    });
  });

  context('when its in the next one day', () => {
    it('should return tomorrow', () => {
      const date = '2021/4/6';
      const result = formatDueDate(date);

      expect(result).toEqual('Tomorrow');
    });
  });

  context('when its after next week', () => {
    it('should return formatted date', () => {
      const date = '2021/4/12';
      const result = formatDueDate(date);

      expect(result).toEqual('Apr 12');
    });
  });
});
