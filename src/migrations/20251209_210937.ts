import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "courses_this_course_includes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar
  );
  
  CREATE TABLE "_courses_v_version_this_course_includes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  ALTER TABLE "courses_this_course_includes" ADD CONSTRAINT "courses_this_course_includes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_version_this_course_includes" ADD CONSTRAINT "_courses_v_version_this_course_includes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "courses_this_course_includes_order_idx" ON "courses_this_course_includes" USING btree ("_order");
  CREATE INDEX "courses_this_course_includes_parent_id_idx" ON "courses_this_course_includes" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_version_this_course_includes_order_idx" ON "_courses_v_version_this_course_includes" USING btree ("_order");
  CREATE INDEX "_courses_v_version_this_course_includes_parent_id_idx" ON "_courses_v_version_this_course_includes" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "courses_this_course_includes" CASCADE;
  DROP TABLE "_courses_v_version_this_course_includes" CASCADE;`)
}
