import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_faq_items" ALTER COLUMN "answer" SET DATA TYPE jsonb;
  ALTER TABLE "_pages_v_blocks_faq_items" ALTER COLUMN "answer" SET DATA TYPE jsonb;
  ALTER TABLE "common_mobiles" ALTER COLUMN "mobile" SET DATA TYPE varchar;
  ALTER TABLE "home_blocks_faq_items" ALTER COLUMN "answer" SET DATA TYPE jsonb;
  ALTER TABLE "_home_v_blocks_faq_items" ALTER COLUMN "answer" SET DATA TYPE jsonb;
  ALTER TABLE "orders" ADD COLUMN "transaction_id" varchar NOT NULL;
  ALTER TABLE "orders" ADD COLUMN "razorpay_payment_id" varchar;
  ALTER TABLE "orders" ADD COLUMN "razorpay_order_id" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_faq_items" ALTER COLUMN "answer" SET DATA TYPE varchar;
  ALTER TABLE "_pages_v_blocks_faq_items" ALTER COLUMN "answer" SET DATA TYPE varchar;
  ALTER TABLE "common_mobiles" ALTER COLUMN "mobile" SET DATA TYPE numeric;
  ALTER TABLE "home_blocks_faq_items" ALTER COLUMN "answer" SET DATA TYPE varchar;
  ALTER TABLE "_home_v_blocks_faq_items" ALTER COLUMN "answer" SET DATA TYPE varchar;
  ALTER TABLE "orders" DROP COLUMN "transaction_id";
  ALTER TABLE "orders" DROP COLUMN "razorpay_payment_id";
  ALTER TABLE "orders" DROP COLUMN "razorpay_order_id";`)
}
