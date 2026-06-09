---
title: Troubleshooting Prisma DB Seeding Failure
---

# Troubleshooting Prisma DB Seeding Failure

This note documents the process of resolving a `PrismaClientKnownRequestError` that occurred during database seeding. The root cause was a mismatch between the Prisma schema and the actual database state.

## 1. The Initial Problem: Seeding Fails

When running `pnpm prisma db seed`, the process failed with an error indicating a missing column in the database.

```bash
pnpm prisma db seed
```

**Error Output:**
```
Error during seeding: PrismaClientKnownRequestError: 
Invalid `prisma.cart.create()` invocation in
/path/to/project/packages/database/prisma/seed.ts:804:35

→ 804 const cart1 = await prisma.cart.create(
The column `promo_discount_amount` does not exist in the current database.
  code: 'P2022',
  meta: { modelName: 'Cart', column: 'promo_discount_amount' },
  clientVersion: '6.16.2'
}
```

This error (`P2022`) clearly shows that the `seed.ts` script was trying to insert data into the `promo_discount_amount` column of the `Cart` table, but this column did not exist in the database.

## 2. Failed Attempts to Fix

Several attempts were made to fix the issue using standard Prisma migration commands, but they failed due to the database being in a broken or inconsistent state.

### Attempt A: `prisma migrate dev`

The first instinct was to create a new migration to add the missing column.

```bash
pnpm prisma migrate dev --name add_promo_discount_amount_to_cart
```

This failed because a previous, unsuccessful migration had left the database in a state that prevented new migrations from being applied.

### Attempt B: `prisma migrate reset`

The next step was to reset the database, hoping to clear the bad state and re-apply all migrations from scratch.

```bash
pnpm prisma migrate reset
```

While the reset completed, the subsequent automatic seeding failed with the **exact same error**. This happened because `migrate reset` only applies existing migration files. Since a migration for `promo_discount_amount` was never successfully created, the column was still missing after the reset.

### Attempt C: Resolving and Deleting Failed Migrations

Further attempts to resolve the failed migration state and manually delete the broken migration files also led to a dead end, with Prisma detecting a discrepancy and requiring another reset.

```bash