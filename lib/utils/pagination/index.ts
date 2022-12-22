
import { PaginationButton } from 'lib/types/table';

export const getPaginationButtons = (pagesCount: number, page: number): PaginationButton[] => {
  const buttons: PaginationButton[] = [
    {
      goTo: page - 1,
      label: 'previous',
      key: 'previous',
    },
    {
      goTo: 0,
      label: 1,
      key: '1',
    },
    {
      label: '...',
      key: 'dots-start',
    },
    {
      label: page + 1,
      key: `${page + 1}`,
    },
    {
      label: '...',
      key: 'dots-end',
    },
    {
      goTo: pagesCount - 1,
      label: pagesCount,
      key: `${pagesCount}`,
    },
    {
      goTo: page + 1,
      label: 'next',
      key: 'next',
    },
  ];

  if (pagesCount <= 7 ) {
    return Array.from(Array(pagesCount).keys()).map((index) => {
      if (page === index) {
        return {
          label: index + 1,
          key: `${index + 1}`,
        }
      }
      return {
        label: index + 1,
        key: `${index + 1}`,
        goTo: index
      }
    });
  }

  if (page === 1) {
    buttons.splice(2, 1);
  }

  if (page === pagesCount - 2) {
    buttons.splice(4, 1);
  }

  if (page === 0) {
    buttons.shift();
    buttons.shift();
    buttons.shift();
  }

  if (page === pagesCount - 1) {
    buttons.pop();
    buttons.pop();
    buttons.pop();
  }

  return buttons;
};