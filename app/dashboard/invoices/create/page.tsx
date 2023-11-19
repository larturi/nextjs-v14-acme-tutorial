import Form from '@/components/ui/invoices/create-form';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data/customers-data';
import { fetchSellers } from '@/app/lib/data/sellers-data';
import { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'Create Invoice',
};

export default async function Page() {
   const customers = await fetchCustomers();
   const sellers = await fetchSellers();

   return (
      <main>
         <Breadcrumbs
            breadcrumbs={[
               { label: 'Invoices', href: '/dashboard/invoices' },
               {
                  label: 'Create Invoice',
                  href: '/dashboard/invoices/create',
                  active: true,
               },
            ]}
         />
         <Form customers={customers} sellers={sellers} />
      </main>
   );
}
