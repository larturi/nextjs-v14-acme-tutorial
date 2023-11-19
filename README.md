# Next.js App Router Course

## Technologies

- Next 14
- Node 20
- Tailwindcss
- NextAuth

## Getting Started

```bash
npm install
```

### Setting Up Your Database

You can set up your database with the following article:
<https://nextjs.org/learn/dashboard-app/setting-up-your-database>

### Add environment variables

``` bash
AUTH_SECRET=
AUTH_URL=http://localhost:3000/api/auth

POSTGRES_URL=""
POSTGRES_PRISMA_URL=""
POSTGRES_URL_NON_POOLING=""
POSTGRES_USER=""
POSTGRES_HOST=""
POSTGRES_PASSWORD=""
POSTGRES_DATABASE="verceldb"
```

### Run de seed to create and populate your database

``` bash
npm run seed
```

### Start in development mode

```bash
npm run dev --turbo
```

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.
