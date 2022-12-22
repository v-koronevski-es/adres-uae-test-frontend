import { describe, expect, it } from '@jest/globals';

import { getPaginationButtons } from '../index';

describe('Pagination utilits', () => {
  describe('getPaginationButtons', () => {
    it('should correct handle second page', async () => {
      const buttons = getPaginationButtons(50, 1);

      expect(buttons[0]).toEqual({
        label: 'previous',
        key: 'previous',
        goTo: 0,
      });
      expect(buttons[1]).toEqual({
        label: 1,
        key: '1',
        goTo: 0,
      });
      expect(buttons[2]).toEqual({
        label: 2,
        key: '2',
      });
    });

    it('should correct handle first page', async () => {
      const buttons = getPaginationButtons(50, 0);

      expect(buttons[0]).toEqual({
        label: 1,
        key: '1',
      });
      expect(buttons[1]).toEqual({
        label: '...',
        key: 'dots-end',
      });
      expect(buttons[2]).toEqual({
        label: 50,
        goTo: 49,
        key: '50',
      });
      expect(buttons[3]).toEqual({
        label: 'next',
        goTo: 1,
        key: 'next',
      });
    });

    it('should correct handle last page', async () => {
      const buttons = getPaginationButtons(50, 49);

      expect(buttons[0]).toEqual({
        goTo: 48,
        key: 'previous',
        label: 'previous',
      });
      expect(buttons[1]).toEqual({
        label: 1,
        key: '1',
        goTo: 0,
      });
      expect(buttons[2]).toEqual({
        label: '...',
        key: 'dots-start',
      });
      expect(buttons[3]).toEqual({
        label: 50,
        key: '50',
      });
    });

    it('should correct handle penultimate page', async () => {
      const buttons = getPaginationButtons(50, 48);

      expect(buttons[0]).toEqual({
        goTo: 47,
        key: 'previous',
        label: 'previous',
      });
      expect(buttons[1]).toEqual({
        label: 1,
        key: '1',
        goTo: 0,
      });
      expect(buttons[2]).toEqual({
        label: '...',
        key: 'dots-start',
      });
      expect(buttons[3]).toEqual({
        label: 49,
        key: '49',
      });
      expect(buttons[4]).toEqual({
        label: 50,
        goTo: 49,
        key: '50',
      });
      expect(buttons[5]).toEqual({
        label: 'next',
        goTo: 49,
        key: 'next',
      });
    });

    it('should correct handle small cout of pages', async () => {
      const buttons = getPaginationButtons(7, 1);

      expect(buttons.length).toEqual(7);
    });
  });
});
