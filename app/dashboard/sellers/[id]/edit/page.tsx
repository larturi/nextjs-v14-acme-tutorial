import Form from '@/components/ui/sellers/edit-form';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import { fetchSellerById } from '@/app/lib/data/sellers-data';
import { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'Edit Seller',
};

export default async function Page({ params }: { params: { id: string } }) {
   const id = params.id;
   const seller = await fetchSellerById(id);

   return (
      seller && (
         <main>
            <Breadcrumbs
               breadcrumbs={[
                  { label: 'Sellers', href: '/dashboard/sellers' },
                  {
                     label: 'Edit Seller',
                     href: `/dashboard/seller/${id}/edit`,
                     active: true,
                  },
               ]}
            />
            <Form seller={seller} />
         </main>
      )
   );
}
