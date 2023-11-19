'use client';

import Link from 'next/link';
import { AtSymbolIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { useFormState } from 'react-dom';
import { createSeller } from '@/app/lib/actions/sellers-actions';

export default function Form() {
   const initialState = { message: null, errors: {} };
   const [state, dispatch] = useFormState(createSeller, initialState);

   return (
      <form action={dispatch}>
         <div className='rounded-md bg-gray-50 p-4 md:p-6'>
            {/* Seller Name */}
            <div className='mb-4'>
               <label htmlFor='name' className='mb-2 block text-sm font-medium'>
                  Seller Name
               </label>
               <div className='relative mt-2 rounded-md'>
                  <div className='relative'>
                     <input
                        id='name'
                        name='name'
                        type='text'
                        placeholder='Enter the seller name'
                        className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
                        // required
                     />
                     <UserCircleIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
                  </div>
               </div>
               {state.errors?.name ? (
                  <div
                     id='name-error'
                     aria-live='polite'
                     className='mt-2 text-sm text-red-500'
                  >
                     {state.errors.name.map((error: string) => (
                        <p key={error}>{error}</p>
                     ))}
                  </div>
               ) : null}
            </div>

            {/* Email */}
            <div className='mb-4'>
               <label
                  htmlFor='email'
                  className='mb-2 block text-sm font-medium'
               >
                  Seller Email
               </label>
               <div className='relative mt-2 rounded-md'>
                  <div className='relative'>
                     <input
                        id='email'
                        name='email'
                        type='email'
                        placeholder='Enter the seller email'
                        className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
                        // required
                     />
                     <AtSymbolIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
                  </div>
               </div>
               {state.errors?.name ? (
                  <div
                     id='name-error'
                     aria-live='polite'
                     className='mt-2 text-sm text-red-500'
                  >
                     {state.errors.name.map((error: string) => (
                        <p key={error}>{error}</p>
                     ))}
                  </div>
               ) : null}
            </div>
         </div>
         <div className='mt-6 flex justify-end gap-4'>
            <Link
               href='/dashboard/sellers'
               className='flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200'
            >
               Cancel
            </Link>
            <Button type='submit'>Create Seller</Button>
         </div>
      </form>
   );
}
