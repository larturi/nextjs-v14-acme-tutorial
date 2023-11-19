import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { UpdateSeller, DeleteSeller } from '@/components/ui/sellers/buttons';
import { fetchFilteredSellers } from '@/app/lib/data/sellers-data';

export default async function SellersTable({
   query,
   currentPage,
}: {
   query: string;
   currentPage: number;
}) {
   const sellers = await fetchFilteredSellers(query, currentPage);

   return (
      <div className='mt-6 flow-root'>
         <div className='inline-block min-w-full align-middle'>
            <div className='rounded-lg bg-gray-50 p-2 md:pt-0'>
               <div className='md:hidden'>
                  {sellers?.map((seller) => (
                     <div
                        key={seller.id}
                        className='mb-2 w-full rounded-md bg-white p-4'
                     >
                        <div className='flex items-center justify-between border-b pb-4'>
                           <div>
                              <div className='mb-2 flex items-center'>
                                 <Image
                                    src={seller.image_url}
                                    className='mr-2 rounded-full'
                                    width={40}
                                    height={40}
                                    alt={`${seller.name}'s profile picture`}
                                 />
                                 <div>
                                    <p>{seller.name}</p>
                                    <p className='text-sm text-gray-500'>
                                       {seller.email}
                                    </p>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className='flex w-full items-center justify-between pt-4'>
                           <div className='flex justify-end gap-2'>
                              <UpdateSeller id={seller.id} />
                              <DeleteSeller id={seller.id} />
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
               <table className='hidden min-w-full text-gray-900 md:table'>
                  <thead className='rounded-lg text-left text-sm font-normal'>
                     <tr>
                        <th
                           scope='col'
                           className='px-4 py-5 font-medium sm:pl-6'
                        >
                           Seller
                        </th>
                        <th scope='col' className='px-3 py-5 font-medium'>
                           Email
                        </th>
                        <th scope='col' className='relative py-3 pl-6 pr-3'>
                           <span className='sr-only'>Edit</span>
                        </th>
                     </tr>
                  </thead>
                  <tbody className='bg-white'>
                     {sellers?.map((seller) => (
                        <tr
                           key={seller.id}
                           className='w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'
                        >
                           <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                              <div className='flex items-center gap-3'>
                                 <Image
                                    src={seller.image_url}
                                    className='rounded-full'
                                    width={28}
                                    height={28}
                                    alt={`${seller.name}'s profile picture`}
                                 />
                                 <p>{seller.name}</p>
                              </div>
                           </td>
                           <td className='whitespace-nowrap px-3 py-3'>
                              {seller.email}
                           </td>
                           <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                              <div className='flex justify-end gap-3'>
                                 <UpdateSeller id={seller.id} />
                                 <DeleteSeller id={seller.id} />
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
}
