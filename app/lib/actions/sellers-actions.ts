'use server';
 
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const SellerSchema = z.object({
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

const CreateSeller = SellerSchema.omit({ id: true});

const UpdateSeller = SellerSchema.omit({ imageUrl: true });

export async function createSeller(prevState: State, formData: FormData) {
    const validatedFields = CreateSeller.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Seller.',
      };
    }

    // Prepare data for insertion into the database
    const { name, email } = validatedFields.data;

    try {
      await sql`
            INSERT INTO sellers (name, email, image_url)
            VALUES (${name}, ${email}, '/sellers/default.png')
        `;
    } catch (error) {
      return {
        message: 'Database Error: Failed to Create Seller.',
      };
    }

    revalidatePath('/dashboard/sellers');

    redirect('/dashboard/sellers');
}

export async function updateSeller(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateSeller.safeParse({
    id: formData.get('id'),
    name: formData.get('name'),
    email: formData.get('email'),
  });
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Seller.',
    };
  }
 
  const { name, email } = validatedFields.data;
 
  try {
    await sql`
      UPDATE sellers
      SET name = ${name}, email = ${email}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Seller.' };
  }
 
  revalidatePath('/dashboard/sellers');
  redirect('/dashboard/sellers');
}

export async function deleteSeller(id: string) {
    try {
      await sql`DELETE FROM sellers WHERE id = ${id}`;
      revalidatePath('/dashboard/sellers');
      return { message: 'Deleted seller.' };
    } catch (error) {
      return { message: 'Database Error: Failed to Delete Seller.' };
    }
}
