'use server';
 
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const CustomerSchema = z.object({
    id: z.string(),
    name: z.string().min(3),
    email: z.string().email(),
    imageUrl: z.string().optional(),
  });

  export type State = {
    errors?: {
      name?: string[];
      email?: string[];
    };
    message?: string | null;
  };

const CreateCustomer = CustomerSchema.omit({ id: true});

const UpdateCustomer = CustomerSchema.omit({ imageUrl: true });

export async function createCustomer(prevState: State, formData: FormData) {
    const validatedFields = CreateCustomer.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Customer.',
      };
    }

    // Prepare data for insertion into the database
    const { name, email } = validatedFields.data;

    try {
      await sql`
            INSERT INTO customers (name, email, image_url)
            VALUES (${name}, ${email}, '/customers/default.png')
        `;
    } catch (error) {
      return {
        message: 'Database Error: Failed to Create Customer.',
      };
    }

    revalidatePath('/dashboard/customers');

    redirect('/dashboard/customers');
}

export async function updateCustomer(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateCustomer.safeParse({
    id: formData.get('id'),
    name: formData.get('name'),
    email: formData.get('email'),
  });

  console.log(validatedFields);
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Customer.',
    };
  }
 
  const { name, email } = validatedFields.data;
 
  try {
    await sql`
      UPDATE customers
      SET name = ${name}, email = ${email}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Customer.' };
  }
 
  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}

export async function deleteCustomer(id: string) {
    try {
      await sql`DELETE FROM customers WHERE id = ${id}`;
      revalidatePath('/dashboard/customers');
      return { message: 'Deleted customers.' };
    } catch (error) {
      return { message: 'Database Error: Failed to Delete Customer.' };
    }
}
