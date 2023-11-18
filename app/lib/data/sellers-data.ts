import { sql } from "@vercel/postgres";
import {
  SellerField,
  SellersTable,
  SellerForm,
} from "../definitions";
import { unstable_noStore as noStore } from "next/cache";

const ITEMS_PER_PAGE = 6;

export async function fetchSellers() {
  try {
    const data = await sql<SellerField>`
      SELECT
        id,
        name
      FROM sellers
      ORDER BY name ASC
    `;

    const sellers = data.rows;
    return sellers;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all sellers.");
  }
}

export async function fetchFilteredSellers(
  query: string,
  currentPage: number,
) {
  noStore();

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const sellers = await sql<SellersTable>`
      SELECT
        sellers.id,
        sellers.name,
        sellers.email,
        sellers.image_url
      FROM sellers
      WHERE
        sellers.name ILIKE ${`%${query}%`} OR
        sellers.email ILIKE ${`%${query}%`}
      ORDER BY sellers.name ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return sellers.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch sellers.");
  }
}

export async function fetchSellersPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM sellers
    WHERE
      sellers.name ILIKE ${`%${query}%`} OR
      sellers.email ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of sellers.");
  }
}

export async function fetchSellerById(id: string) {
  noStore();
  try {
    const { rows } = await sql<SellerForm>`
      SELECT
        id, 
        name,
        email
      FROM sellers
      WHERE id = ${id};
    `;

    const seller = rows[0];

    return seller;
  } catch (error) {
    console.error("Database Error:", error);
  }
}
