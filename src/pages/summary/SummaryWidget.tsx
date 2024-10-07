import { FC, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTransactions } from '@/entities/transaction/api';
import dayjs from 'dayjs';
import { invoicesApi } from '@/entities/invoice';
import { Card } from '@/shared/ui/ui_kit';

const THRESHOLD = 10;

export const SummaryWidget: FC = () => {
  const {
    data: transactions,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['transactions'],
    queryFn: getTransactions,
  });

  const { data: invoices, isLoading: isInvoicesLoading } = useQuery({
    queryKey: ['invoices'],
    queryFn: invoicesApi.getAll,
  });

  useEffect(() => {
    console.log({ invoices });
  }, [invoices]);

  const totalAmount = useMemo(() => {
    if (!transactions?.length) {
      return 0;
    }

    return transactions.reduce((acc, { amount }) => acc + amount, 0);
  }, [transactions]);

  const getTotalColor = () => {
    if (totalAmount < 0) {
      return 'red';
    }

    if (totalAmount > THRESHOLD) {
      return 'green';
    }

    return 'yellow';
  };

  const totalInvoicesPastMonth = useMemo(() => {
    if (!invoices?.length) {
      return 0;
    }

    const currentTime = dayjs();

    return invoices.filter(({ date }) => currentTime.diff(date, 'day') <= 30)
      .length;
  }, [invoices]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isSuccess) {
    return <div>Something went wrong...</div>;
  }

  return (
    <Card style={{ marginBottom: 20 }}>
      <h2>Transactions</h2>
      <table>
        <thead>
          <tr>
            <th>Ref.</th>
            <th>Description</th>
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(({ reference, description, date, amount }) => (
            <tr key={reference}>
              <td>{reference}</td>
              <td>{description}</td>
              <td>{dayjs(date).toString()}</td>
              <td>{amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Total Amount</h2>
      <div style={{ color: getTotalColor(), fontSize: 24, fontWeight: 700 }}>
        {totalAmount}
      </div>
      <h2>Total invoices in past 30 days</h2>
      <div style={{ fontSize: 24, fontWeight: 700 }}>
        {isInvoicesLoading ? '...' : totalInvoicesPastMonth}
      </div>
    </Card>
  );
};
