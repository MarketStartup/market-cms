import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_general_information" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_general_information" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "courses_curriculums_lessons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"lesson_title" varchar,
  	"lesson_duration" varchar
  );
  
  CREATE TABLE "courses_curriculums" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_title" varchar
  );
  
  CREATE TABLE "_courses_v_version_curriculums_lessons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"lesson_title" varchar,
  	"lesson_duration" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_courses_v_version_curriculums" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "footer_policies" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  ALTER TABLE "footer_quick_items" RENAME TO "footer_quick_links";
  ALTER TABLE "footer_quick_links" DROP CONSTRAINT "footer_quick_items_parent_id_fk";
  
  DROP INDEX "footer_quick_items_order_idx";
  DROP INDEX "footer_quick_items_parent_id_idx";
  ALTER TABLE "home_blocks_feature_features" ADD COLUMN "icon_id" integer;
  ALTER TABLE "_home_v_blocks_feature_features" ADD COLUMN "icon_id" integer;
  ALTER TABLE "pages_blocks_general_information" ADD CONSTRAINT "pages_blocks_general_information_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_general_information" ADD CONSTRAINT "_pages_v_blocks_general_information_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_curriculums_lessons" ADD CONSTRAINT "courses_curriculums_lessons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_curriculums"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_curriculums" ADD CONSTRAINT "courses_curriculums_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_version_curriculums_lessons" ADD CONSTRAINT "_courses_v_version_curriculums_lessons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v_version_curriculums"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_version_curriculums" ADD CONSTRAINT "_courses_v_version_curriculums_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_policies" ADD CONSTRAINT "footer_policies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_general_information_order_idx" ON "pages_blocks_general_information" USING btree ("_order");
  CREATE INDEX "pages_blocks_general_information_parent_id_idx" ON "pages_blocks_general_information" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_general_information_path_idx" ON "pages_blocks_general_information" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_general_information_order_idx" ON "_pages_v_blocks_general_information" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_general_information_parent_id_idx" ON "_pages_v_blocks_general_information" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_general_information_path_idx" ON "_pages_v_blocks_general_information" USING btree ("_path");
  CREATE INDEX "courses_curriculums_lessons_order_idx" ON "courses_curriculums_lessons" USING btree ("_order");
  CREATE INDEX "courses_curriculums_lessons_parent_id_idx" ON "courses_curriculums_lessons" USING btree ("_parent_id");
  CREATE INDEX "courses_curriculums_order_idx" ON "courses_curriculums" USING btree ("_order");
  CREATE INDEX "courses_curriculums_parent_id_idx" ON "courses_curriculums" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_version_curriculums_lessons_order_idx" ON "_courses_v_version_curriculums_lessons" USING btree ("_order");
  CREATE INDEX "_courses_v_version_curriculums_lessons_parent_id_idx" ON "_courses_v_version_curriculums_lessons" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_version_curriculums_order_idx" ON "_courses_v_version_curriculums" USING btree ("_order");
  CREATE INDEX "_courses_v_version_curriculums_parent_id_idx" ON "_courses_v_version_curriculums" USING btree ("_parent_id");
  CREATE INDEX "footer_policies_order_idx" ON "footer_policies" USING btree ("_order");
  CREATE INDEX "footer_policies_parent_id_idx" ON "footer_policies" USING btree ("_parent_id");
  ALTER TABLE "home_blocks_feature_features" ADD CONSTRAINT "home_blocks_feature_features_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_feature_features" ADD CONSTRAINT "_home_v_blocks_feature_features_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_quick_links" ADD CONSTRAINT "footer_quick_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home_blocks_feature_features_icon_idx" ON "home_blocks_feature_features" USING btree ("icon_id");
  CREATE INDEX "_home_v_blocks_feature_features_icon_idx" ON "_home_v_blocks_feature_features" USING btree ("icon_id");
  CREATE INDEX "footer_quick_links_order_idx" ON "footer_quick_links" USING btree ("_order");
  CREATE INDEX "footer_quick_links_parent_id_idx" ON "footer_quick_links" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "footer_quick_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  ALTER TABLE "pages_blocks_general_information" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_general_information" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_curriculums_lessons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_curriculums" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v_version_curriculums_lessons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v_version_curriculums" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_quick_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_policies" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_general_information" CASCADE;
  DROP TABLE "_pages_v_blocks_general_information" CASCADE;
  DROP TABLE "courses_curriculums_lessons" CASCADE;
  DROP TABLE "courses_curriculums" CASCADE;
  DROP TABLE "_courses_v_version_curriculums_lessons" CASCADE;
  DROP TABLE "_courses_v_version_curriculums" CASCADE;
  DROP TABLE "footer_quick_links" CASCADE;
  DROP TABLE "footer_policies" CASCADE;
  ALTER TABLE "home_blocks_feature_features" DROP CONSTRAINT "home_blocks_feature_features_icon_id_media_id_fk";
  
  ALTER TABLE "_home_v_blocks_feature_features" DROP CONSTRAINT "_home_v_blocks_feature_features_icon_id_media_id_fk";
  
  DROP INDEX "home_blocks_feature_features_icon_idx";
  DROP INDEX "_home_v_blocks_feature_features_icon_idx";
  ALTER TABLE "footer_quick_items" ADD CONSTRAINT "footer_quick_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "footer_quick_items_order_idx" ON "footer_quick_items" USING btree ("_order");
  CREATE INDEX "footer_quick_items_parent_id_idx" ON "footer_quick_items" USING btree ("_parent_id");
  ALTER TABLE "home_blocks_feature_features" DROP COLUMN "icon_id";
  ALTER TABLE "_home_v_blocks_feature_features" DROP COLUMN "icon_id";`)
}
