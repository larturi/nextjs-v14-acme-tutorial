import { Metadata } from 'next';
import { montserrat } from '@/components/ui/fonts';
import Pagination from '@/components/ui/pagination';
import Table from '@/components/ui/sellers/table';
import { SellersTableSkeleton } from '@/components/ui/skeletons';
import { Suspense } from 'react';
import {
   fetchSellersPages,
   fetchFilteredSellers,
} from '@/app/lib/data/sellers-data';
import Search from '@/components/ui/search';
import { CreateSeller } from '@/components/ui/sellers/buttons';

export const metadata: Metadata = {
   title: 'Sellers',
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
   const totalPages = await fetchSellersPages(query);

   return (
      <div className='w-full'>
         <div className='flex w-full items-center justify-between'>
            <h1 className={`${montserrat.className} text-2xl`}>Sellers</h1>
         </div>
         <div className='mt-4 flex items-center justify-between gap-2 md:mt-8'>
            <Search placeholder='Search sellers...' />
            <CreateSeller />
         </div>
         <Suspense
            key={query + currentPage}
            fallback={<SellersTableSkeleton />}
         >
            <Table query={query} currentPage={currentPage} />
         </Suspense>
         <div className='mt-5 flex w-full justify-center'>
            <Pagination totalPages={totalPages} />
         </div>
      </div>
   );
}
