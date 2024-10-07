import dayjs from 'dayjs';

export type Transaction = {
  reference: number;
  date: string;
  description: string;
  amount: number;
};

const mockTransactions: Transaction[] = [
  {
    reference: 1,
    date: dayjs().add(-10, 'd').toISOString(),
    description: 'lorem ipsum',
    amount: 1,
  },
  {
    reference: 2,
    date: dayjs().add(-5, 'd').toISOString(),
    description: 'lorem ipsum',
    amount: 10,
  },
  {
    reference: 3,
    date: dayjs().add(1, 'd').toISOString(),
    description: 'lorem ipsum',
    amount: -5,
  },
  {
    reference: 4,
    date: dayjs().add(-40, 'd').toISOString(),
    description: 'lorem ipsum',
    amount: 20,
  },
];

export const getTransactions = () => {
  return Promise.resolve([...mockTransactions]);
};
