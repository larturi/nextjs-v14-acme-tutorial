'use server';
 
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';

const UserSchema = z.object({
    id: z.string(),
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.string().min(3),
  });

  export type State = {
    errors?: {
      name: string[];
      email: string[];
      password: string[];
      role: string[];
    };
    message?: string | null;
  };

const CreateUser = UserSchema.omit({ id: true});

const UpdateUser = UserSchema;

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', Object.fromEntries(formData));
  } catch (error) {
    if ((error as Error).message.includes('CredentialsSignin')) {
      return 'CredentialSignin';
    }
    throw error;
  }
}

export async function createUser(prevState: State, formData: FormData) {
    const validatedFields = CreateUser.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      role: formData.get('role'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create User.',
      };
    }

    // Prepare data for insertion into the database
    const { name, email, role, password } = validatedFields.data;

    try {
      await sql`
            INSERT INTO users (name, email, role, password)
            VALUES (${name}, ${email}, ${role}, ${password})
        `;
    } catch (error) {
      return {
        message: 'Database Error: Failed to Create User.',
      };
    }

    revalidatePath('/dashboard/users');

    redirect('/dashboard/users');
}

export async function updateUser(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateUser.safeParse({
    id: formData.get('id'),
    name: formData.get('name'),
    email: formData.get('email'),
  });
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update User.',
    };
  }
 
  const { name, email, role, password } = validatedFields.data;
 
  try {
    await sql`
      UPDATE users
      SET name = ${name}, email = ${email}, , role = ${role}, password = ${password}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update User.' };
  }
 
  revalidatePath('/dashboard/users');
  redirect('/dashboard/users');
}

export async function deleteUser(id: string) {
    try {
      await sql`DELETE FROM users WHERE id = ${id}`;
      revalidatePath('/dashboard/users');
      return { message: 'Deleted user.' };
    } catch (error) {
      return { message: 'Database Error: Failed to Delete User.' };
    }
}
