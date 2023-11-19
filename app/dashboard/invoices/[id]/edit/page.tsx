import Form from '@/components/ui/invoices/edit-form';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import { fetchInvoiceById } from '@/app/lib/data/invoices-data';
import { fetchCustomers } from '@/app/lib/data/customers-data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchSellers } from '@/app/lib/data/sellers-data';

export const metadata: Metadata = {
   title: 'Edit Invoice',
};

export default async function Page({ params }: { params: { id: string } }) {
   const id = params.id;
   const [invoice, customers, sellers] = await Promise.all([
      fetchInvoiceById(id),
      fetchCustomers(),
      fetchSellers(),
   ]);

   if (!invoice) {
      notFound();
   }

   return (
      <main>
         <Breadcrumbs
            breadcrumbs={[
               { label: 'Invoices', href: '/dashboard/invoices' },
               {
                  label: 'Edit Invoice',
                  href: `/dashboard/invoices/${id}/edit`,
                  active: true,
               },
            ]}
         />
         <Form invoice={invoice!} customers={customers} sellers={sellers} />
      </main>
   );
}
