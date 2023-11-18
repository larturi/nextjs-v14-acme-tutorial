import Form from '@/app/ui/sellers/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'Create Seller',
};

export default async function Page() {
   return (
      <main>
         <Breadcrumbs
            breadcrumbs={[
               { label: 'Sellers', href: '/dashboard/sellers' },
               {
                  label: 'Create Seller',
                  href: '/dashboard/sellers/create',
                  active: true,
               },
            ]}
         />
         <Form />
      </main>
   );
}
