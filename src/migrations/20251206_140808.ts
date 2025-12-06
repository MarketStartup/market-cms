import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" DROP COLUMN "layout";
  ALTER TABLE "_pages_v" DROP COLUMN "version_layout";
  DROP TYPE "public"."enum_pages_layout";
  DROP TYPE "public"."enum__pages_v_version_layout";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_layout" AS ENUM('page', 'course-detail');
  CREATE TYPE "public"."enum__pages_v_version_layout" AS ENUM('page', 'course-detail');
  ALTER TABLE "pages" ADD COLUMN "layout" "enum_pages_layout";
  ALTER TABLE "_pages_v" ADD COLUMN "version_layout" "enum__pages_v_version_layout";`)
}
