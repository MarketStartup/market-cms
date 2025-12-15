import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "batches_users" RENAME COLUMN "price" TO "amount_paid";
  ALTER TABLE "_batches_v_version_users" RENAME COLUMN "price" TO "amount_paid";
  ALTER TABLE "orders" ADD COLUMN "message" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "batches_users" RENAME COLUMN "amount_paid" TO "price";
  ALTER TABLE "_batches_v_version_users" RENAME COLUMN "amount_paid" TO "price";
  ALTER TABLE "orders" DROP COLUMN "message";`)
}
