import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "courses" ADD COLUMN "brochure_id" integer;
  ALTER TABLE "_courses_v" ADD COLUMN "version_brochure_id" integer;
  ALTER TABLE "courses" ADD CONSTRAINT "courses_brochure_id_media_id_fk" FOREIGN KEY ("brochure_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_courses_v" ADD CONSTRAINT "_courses_v_version_brochure_id_media_id_fk" FOREIGN KEY ("version_brochure_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "courses_brochure_idx" ON "courses" USING btree ("brochure_id");
  CREATE INDEX "_courses_v_version_version_brochure_idx" ON "_courses_v" USING btree ("version_brochure_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "courses" DROP CONSTRAINT "courses_brochure_id_media_id_fk";
  
  ALTER TABLE "_courses_v" DROP CONSTRAINT "_courses_v_version_brochure_id_media_id_fk";
  
  DROP INDEX "courses_brochure_idx";
  DROP INDEX "_courses_v_version_version_brochure_idx";
  ALTER TABLE "courses" DROP COLUMN "brochure_id";
  ALTER TABLE "_courses_v" DROP COLUMN "version_brochure_id";`)
}
