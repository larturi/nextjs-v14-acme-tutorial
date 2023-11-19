import CardWrapper from '@/components/ui/dashboard/cards';
import RevenueChart from '@/components/ui/dashboard/revenue-chart';
import LatestInvoices from '@/components/ui/dashboard/latest-invoices';
import { montserrat } from '@/components/ui/fonts';
import { Suspense } from 'react';
import {
   CardsSkeleton,
   LatestInvoicesSkeleton,
   RevenueChartSkeleton,
} from '@/components/ui/skeletons';

export const revalidate = 60; // revalidate at most every one minute

export default async function Page() {
   return (
      <main>
         <h1 className={`${montserrat.className} mb-4 text-xl md:text-2xl`}>
            Dashboard
         </h1>
         <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
            <Suspense fallback={<CardsSkeleton />}>
               <CardWrapper />
            </Suspense>
         </div>
         <div className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8'>
            <Suspense fallback={<RevenueChartSkeleton />}>
               <RevenueChart />
            </Suspense>
            <Suspense fallback={<LatestInvoicesSkeleton />}>
               <LatestInvoices />
            </Suspense>
         </div>
      </main>
   );
}
