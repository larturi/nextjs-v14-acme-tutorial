import { sql } from "@vercel/postgres";
import {
  UserField,
  UsersTable,
  UserForm,
} from "../definitions";
import { unstable_noStore as noStore } from "next/cache";

const ITEMS_PER_PAGE = 10;

export async function fetchUsers() {
  try {
    const data = await sql<UserField>`
      SELECT
        id,
        name,
        email,
        role
      FROM users
      ORDER BY name ASC
    `;

    const users = data.rows;
    return users;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all users.");
  }
}

export async function fetchFilteredUsers(
  query: string,
  currentPage: number,
) {
  noStore();

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const users = await sql<UsersTable>`
      SELECT
        users.id,
        users.name,
        users.email,
        users.role
      FROM users
      WHERE
        users.name ILIKE ${`%${query}%`} OR
        users.email ILIKE ${`%${query}%`}
      ORDER BY users.name ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return users.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch users.");
  }
}

export async function fetchUsersPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM users
    WHERE
      users.name ILIKE ${`%${query}%`} OR
      users.email ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of users.");
  }
}

export async function fetchUserById(id: string) {
  noStore();
  try {
    const { rows } = await sql<UserForm>`
      SELECT
        id, 
        name,
        email,
        role
      FROM users
      WHERE id = ${id};
    `;

    const users = rows[0];

    return users;
  } catch (error) {
    console.error("Database Error:", error);
  }
}
