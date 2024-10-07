import { FC, useMemo, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { invoicesApi, Invoice } from '@/entities/invoice';
import dayjs from 'dayjs';
import { queryClient } from '@/shared/api/query_client';
import { getTransactions } from '@/entities/transaction';
import { Card } from '@/shared/ui/ui_kit';

const invalidateInvoicesQuery = () =>
  queryClient.invalidateQueries({
    queryKey: ['invoices'],
  });

export const InvoicesWidget: FC = () => {
  const {
    data: invoices,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ['invoices'],
    queryFn: invoicesApi.getAll,
  });
  const { data: transactions, isLoading: isTransactionsLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: getTransactions,
  });

  const updateMutation = useMutation({
    mutationFn: invoicesApi.update,
  });
  const createMutation = useMutation({
    mutationFn: invoicesApi.create,
  });

  const [formInitialValues, setFormInitialValues] =
    useState<Partial<Invoice>>();

  const getInvoiceStatus = useMemo(() => {
    const transactionsMap = (transactions || []).reduce(
      (acc, item) => {
        acc[item.reference] = item.amount;
        return acc;
      },
      {} as Record<number, number>,
    );

    return (invoice: Invoice) => {
      // TODO: accurate numbers comparison
      return transactionsMap[invoice.reference] === invoice.amount
        ? 'PAID'
        : 'NOT PAID';
    };
  }, [transactions]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isSuccess) {
    return <div>Something went wrong...</div>;
  }

  const onEditClick = (invoice: Invoice) => {
    setFormInitialValues(invoice);
  };

  const onCreateClick = () => {
    setFormInitialValues({});
  };

  const onSubmit = async (data: Invoice) => {
    const onSuccess = () => {
      void invalidateInvoicesQuery();
      setFormInitialValues(undefined);
    };
    if (formInitialValues?.id) {
      updateMutation.mutate(data, {
        onSuccess,
      });
    } else {
      createMutation.mutate(data, {
        onSuccess,
      });
    }
  };

  const isSubmitting = updateMutation.isPending || createMutation.isPending;

  return (
    <>
      <Card style={{ marginBottom: 20 }}>
        <h2>Invoices</h2>
        <table>
          <thead>
            <tr>
              <th>Ref.</th>
              <th>Client</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => {
              const { id, reference, clientName, date, amount } = invoice;

              return (
                <tr key={id}>
                  <td>{reference}</td>
                  <td>{clientName}</td>
                  <td>{dayjs(date).toString()}</td>
                  <td>{amount}</td>
                  <td>
                    {isTransactionsLoading ? '...' : getInvoiceStatus(invoice)}
                  </td>
                  <td>
                    <button
                      disabled={!!formInitialValues}
                      onClick={() => onEditClick(invoice)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button onClick={onCreateClick} disabled={!!formInitialValues}>
          Create invoice
        </button>
      </Card>
      {!!formInitialValues && (
        <Card>
          <h2>Form</h2>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.target as HTMLFormElement);

              const data = Object.fromEntries(
                formData.entries(),
              ) as unknown as Invoice;
              onSubmit(data);
            }}
          >
            <div>
              <label htmlFor="">Reference No.</label>
              <input
                type="number"
                name="reference"
                defaultValue={formInitialValues?.reference}
                disabled={isSubmitting}
                required
              />
            </div>
            <div>
              <label htmlFor="">Client name</label>
              <input
                type="text"
                name="clientName"
                defaultValue={formInitialValues?.clientName}
                disabled={isSubmitting}
                required
              />
            </div>
            <div>
              <label htmlFor="">Issue date</label>
              {/** TODO: use DatePicker lib */}
              <input
                type="text"
                name="date"
                defaultValue={formInitialValues?.date}
                disabled={isSubmitting}
                required
              />
            </div>
            <div>
              <label htmlFor="">Amount</label>
              <input
                type="number"
                name="amount"
                defaultValue={formInitialValues?.amount}
                disabled={isSubmitting}
                required
              />
            </div>
            <button onClick={() => setFormInitialValues(undefined)}>
              Cancel
            </button>
            <button>Submit</button>
          </form>
        </Card>
      )}
    </>
  );
};
