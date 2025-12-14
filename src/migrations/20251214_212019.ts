import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_faq_items" DROP COLUMN "answer";
  ALTER TABLE "_pages_v_blocks_faq_items" DROP COLUMN "answer";
  ALTER TABLE "home_blocks_faq_items" DROP COLUMN "answer";
  ALTER TABLE "_home_v_blocks_faq_items" DROP COLUMN "answer";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_faq_items" ADD COLUMN "answer" jsonb;
  ALTER TABLE "_pages_v_blocks_faq_items" ADD COLUMN "answer" jsonb;
  ALTER TABLE "home_blocks_faq_items" ADD COLUMN "answer" jsonb;
  ALTER TABLE "_home_v_blocks_faq_items" ADD COLUMN "answer" jsonb;`)
}
