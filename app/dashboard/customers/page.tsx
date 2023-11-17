import { Metadata } from 'next';
import { montserrat } from '@/app/ui/fonts';
import Pagination from '@/app/ui/customers/pagination';
import Table from '@/app/ui/customers/table';
import { CustomersTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchCustomersPages, fetchFilteredCustomers } from '@/app/lib/data';
import Search from '@/app/ui/search';
import { CreateCustomer } from '@/app/ui/customers/buttons';

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
            <h1 className={`${montserrat.className} text-2xl`}>Invoices</h1>
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
