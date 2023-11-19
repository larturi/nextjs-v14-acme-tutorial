import { Metadata } from 'next';
import { montserrat } from '@/components/ui/fonts';
import Pagination from '@/components/ui/pagination';
import Search from '@/components/ui/search';
import Table from '@/components/ui/invoices/table';
import { CreateInvoice } from '@/components/ui/invoices/buttons';
import { InvoicesTableSkeleton } from '@/components/ui/skeletons';
import { Suspense } from 'react';
import { fetchInvoicesPages } from '@/app/lib/data/invoices-data';

export const metadata: Metadata = {
   title: 'Invoices',
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
   const totalPages = await fetchInvoicesPages(query);

   return (
      <div className='w-full'>
         <div className='flex w-full items-center justify-between'>
            <h1 className={`${montserrat.className} text-2xl`}>Invoices</h1>
         </div>
         <div className='mt-4 flex items-center justify-between gap-2 md:mt-8'>
            <Search placeholder='Search invoices...' />
            <CreateInvoice />
         </div>
         <Suspense
            key={query + currentPage}
            fallback={<InvoicesTableSkeleton />}
         >
            <Table query={query} currentPage={currentPage} />
         </Suspense>
         <div className='mt-5 flex w-full justify-center'>
            <Pagination totalPages={totalPages} />
         </div>
      </div>
   );
}
