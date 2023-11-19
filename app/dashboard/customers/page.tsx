import { Metadata } from 'next';
import { montserrat } from '@/components/ui/fonts';
import Pagination from '@/components/ui/pagination';
import Table from '@/components/ui/customers/table';
import { CustomersTableSkeleton } from '@/components/ui/skeletons';
import { Suspense } from 'react';
import { fetchCustomersPages } from '@/app/lib/data/customers-data';
import Search from '@/components/ui/search';
import { CreateCustomer } from '@/components/ui/customers/buttons';

export const metadata: Metadata = {
   title: 'Customers',
};

export default async function Page({
   searchParams,
}: {
   searchParams?: {
      query?: string;
      page?: string;
   };
}) {
   const query = searchParams?.query || '';
   const currentPage = Number(searchParams?.page) || 1;
   const totalPages = await fetchCustomersPages(query);

   return (
      <div className='w-full'>
         <div className='flex w-full items-center justify-between'>
            <h1 className={`${montserrat.className} text-2xl`}>Customers</h1>
         </div>
         <div className='mt-4 flex items-center justify-between gap-2 md:mt-8'>
            <Search placeholder='Search customers...' />
            <CreateCustomer />
         </div>
         <Suspense
            key={query + currentPage}
            fallback={<CustomersTableSkeleton />}
         >
            <Table query={query} currentPage={currentPage} />
         </Suspense>
         <div className='mt-5 flex w-full justify-center'>
            <Pagination totalPages={totalPages} />
         </div>
      </div>
   );
}
