import dayjs from 'dayjs';

export type Invoice = {
  id: string;
  clientName: string;
  date: string;
  reference: number;
  amount: number;
};

const mockInvoices: Invoice[] = [
  {
    id: 'a',
    clientName: 'John Doe',
    date: dayjs().add(-45, 'd').toISOString(),
    reference: 101,
    amount: 10,
  },
  {
    id: 'b',
    clientName: 'Jane Doe',
    date: dayjs().add(-10, 'd').toISOString(),
    reference: 1,
    amount: 1,
  },
  {
    id: 'c',
    clientName: 'James Smith',
    date: dayjs().add(1, 'd').toISOString(),
    reference: 5,
    amount: 7,
  },
];

const getAll = () => {
  console.log('getInvoices');
  return Promise.resolve([...mockInvoices]);
};
const create = (data: Omit<Invoice, 'id'>) => {
  const id = String(Math.random());
  mockInvoices.push({ id, ...data });
  return Promise.resolve(data);
};
const update = (data: Invoice) => {
  const index = mockInvoices.findIndex((item) => item.id === data.id);

  if (index === -1) {
    throw new Error('Invoice not found');
  }

  mockInvoices[index] = data;

  return Promise.resolve(data);
};

export const invoicesApi = {
  getAll,
  create,
  update,
};
