---
title: Manually delete the migration folder
---

# Manually delete the migration folder
rm -rf prisma/migrations/<migration_name>
```

## 3. The Solution: `prisma db push`

When `prisma migrate` is not working due to a corrupted migration history or when you just want to quickly sync your schema with the development database, `prisma db push` is the right tool. It inspects the Prisma schema and makes the database match it, bypassing the migration history.

**This is especially useful in development when you don't need to preserve migration history.**

The following commands fixed the issue:

**Step 1: Push the schema to the database**

This command synchronizes the database schema with the `schema.prisma` file, creating the missing `promo_discount_amount` column. The `--accept-data-loss` flag is used to confirm that we are okay with potential data loss, which is acceptable in a development environment.

```bash
pnpm prisma db push --accept-data-loss
```

**Output:**
```
🚀  Your database is now in sync with your Prisma schema.
✔ Generated Prisma Client (v6.16.2)
```

**Step 2: Re-run the database seed command**

With the database schema now correctly in sync, the seed command can be run successfully.

```bash
pnpm prisma db seed
```

**Output:**
```
🌱 Starting database seeding...
...
🎉 Database seeding completed successfully!
...
🌱  The seed command has been executed.
```

## Key Takeaway

For development environments, if your database and migration history get into a broken state, `prisma db push` is a powerful command to quickly reset your database schema to match your `schema.prisma` file. It is often faster and simpler than trying to manually fix a corrupted migration history with `prisma migrate resolve` or `reset`.