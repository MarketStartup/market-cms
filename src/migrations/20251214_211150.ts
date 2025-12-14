import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "common_mobiles" ALTER COLUMN "mobile" SET DATA TYPE varchar;
  ALTER TABLE "orders" ADD COLUMN "transaction_id" varchar NOT NULL;
  ALTER TABLE "orders" ADD COLUMN "razorpay_payment_id" varchar;
  ALTER TABLE "orders" ADD COLUMN "razorpay_order_id" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "common_mobiles" ALTER COLUMN "mobile" SET DATA TYPE numeric;
  ALTER TABLE "orders" DROP COLUMN "transaction_id";
  ALTER TABLE "orders" DROP COLUMN "razorpay_payment_id";
  ALTER TABLE "orders" DROP COLUMN "razorpay_order_id";`)
}
