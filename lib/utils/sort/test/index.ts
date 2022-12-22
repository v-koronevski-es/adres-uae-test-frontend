import { describe, expect, it } from '@jest/globals';

import { sortData } from '../index';
import { mock } from './mock';

describe('Sort utilits', () => {
  describe('sortData', () => {
    it('should correct handle asc order numbers', async () => {
      const ordered = sortData('asc', 'number', mock.data);

      expect(ordered).toEqual(mock.ascNumbers);
    });

    it('should correct handle desc order numbers', async () => {
      const ordered = sortData('desc', 'number', mock.data);

      expect(ordered).toEqual(mock.descNumbers);
    });

    it('should correct handle asc order numbers', async () => {
      const ordered = sortData('asc', 'string', mock.data);

      expect(ordered).toEqual(mock.ascString);
    });

    it('should correct handle desc order numbers', async () => {
      const ordered = sortData('desc', 'string', mock.data);

      expect(ordered).toEqual(mock.descString);
    });
  });
});
