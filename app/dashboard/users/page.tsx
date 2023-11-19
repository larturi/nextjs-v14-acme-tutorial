import { Metadata } from 'next';
import { montserrat } from '@/app/ui/fonts';
import Pagination from '@/app/ui/pagination';
import Table from '@/app/ui/users/table';
import { SellersTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import {
   fetchSellersPages,
   fetchFilteredSellers,
} from '@/app/lib/data/sellers-data';
import Search from '@/app/ui/search';
import { CreateSeller } from '@/app/ui/sellers/buttons';

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
