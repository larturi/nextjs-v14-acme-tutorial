import Image from 'next/image';
import Link from 'next/link';

import {
   UpdateCustomer,
   DeleteCustomer,
} from '@/components/ui/customers/buttons';
import { fetchFilteredCustomers } from '@/app/lib/data/customers-data';

export default async function CustomersTable({
   query,
   currentPage,
}: {
   query: string;
   currentPage: number;
}) {
   const customers = await fetchFilteredCustomers(query, currentPage);

   return (
      <div className='mt-6 flow-root'>
         <div className='inline-block min-w-full align-middle'>
            <div className='rounded-lg bg-gray-50 p-2 md:pt-0'>
               <div className='md:hidden'>
                  {customers?.map((customer) => (
                     <div
                        key={customer.id}
                        className='mb-2 w-full rounded-md bg-white p-4'
                     >
                        <div className='flex items-center justify-between border-b pb-4'>
                           <div>
                              <div className='mb-2 flex items-center'>
                                 <Image
                                    src={customer.image_url}
                                    className='mr-2 rounded-full'
                                    width={40}
                                    height={40}
                                    alt={`${customer.name}'s profile picture`}
                                 />
                                 <div>
                                    <p>{customer.name}</p>
                                    <p className='text-sm text-gray-500'>
                                       {customer.email}
                                    </p>
                                 </div>
                              </div>

                              <div className='mt-7'>
                                 <p className='text-sm text-gray-500'>
                                    {customer.total_invoices > 0 ? (
                                       <Link
                                          href={`/dashboard/invoices?page=1&query=${customer.name}`}
                                       >
                                          Total Invoices:{' '}
                                          {customer.total_invoices}
                                       </Link>
                                    ) : (
                                       <>
                                          Total Invoices:{' '}
                                          {customer.total_invoices}
                                       </>
                                    )}
                                 </p>
                              </div>
                              <p className='text-sm text-gray-500 mt-1'>
                                 Total Paid: {customer.total_paid}
                              </p>
                           </div>
                        </div>
                        <div className='flex w-full items-center justify-between pt-4'>
                           <div className='flex justify-end gap-2'>
                              <UpdateCustomer id={customer.id} />
                              <DeleteCustomer id={customer.id} />
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
                           Customer
                        </th>
                        <th scope='col' className='px-3 py-5 font-medium'>
                           Email
                        </th>
                        <th scope='col' className='px-3 py-5 font-medium'>
                           Total Invoices
                        </th>
                        <th scope='col' className='px-4 py-5 font-medium'>
                           Total Paid
                        </th>
                        <th scope='col' className='relative py-3 pl-6 pr-3'>
                           <span className='sr-only'>Edit</span>
                        </th>
                     </tr>
                  </thead>
                  <tbody className='bg-white'>
                     {customers?.map((customer) => (
                        <tr
                           key={customer.id}
                           className='w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'
                        >
                           <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                              <div className='flex items-center gap-3'>
                                 <Image
                                    src={customer.image_url}
                                    className='rounded-full'
                                    width={28}
                                    height={28}
                                    alt={`${customer.name}'s profile picture`}
                                 />
                                 <p>{customer.name}</p>
                              </div>
                           </td>
                           <td className='whitespace-nowrap px-3 py-3'>
                              {customer.email}
                           </td>
                           <td className='whitespace-nowrap px-3 py-3'>
                              {customer.total_invoices > 0 ? (
                                 <p className='text-sm text-gray-500'>
                                    <Link
                                       href={`/dashboard/invoices?page=1&query=${customer.name}`}
                                    >
                                       {customer.total_invoices}
                                    </Link>
                                 </p>
                              ) : (
                                 <>{customer.total_invoices}</>
                              )}
                           </td>
                           <td className='whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md'>
                              {customer.total_paid}
                           </td>
                           <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                              <div className='flex justify-end gap-3'>
                                 <UpdateCustomer id={customer.id} />
                                 <DeleteCustomer id={customer.id} />
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
