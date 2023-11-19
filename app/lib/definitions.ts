// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Seller = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string; // Will be created on the database
  customer_id: string;
  seller_id: string;
  amount: number; // Stored in cents
  status: 'pending' | 'paid';
  date: string;
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  seller_id: string;
  seller_name: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type SellersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type UsersTable = {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
  email: string;
};

export type SellerField = {
  id: string;
  name: string;
  email: string;
};

export type UserField = {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  seller_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomerForm = {
  id: string;
  name: string;
  email: string;
};

export type SellerForm = {
  id: string;
  name: string;
  email: string;
};

export type UserForm = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
};