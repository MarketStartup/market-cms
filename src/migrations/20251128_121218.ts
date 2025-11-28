import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_layout" AS ENUM('about', 'contact', 'courses', 'course-detail');
  CREATE TYPE "public"."enum__pages_v_version_layout" AS ENUM('about', 'contact', 'courses', 'course-detail');
  CREATE TYPE "public"."enum_courses_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__courses_v_version_level" AS ENUM('beginner', 'intermediate', 'advanced');
  CREATE TYPE "public"."enum__courses_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_instructors_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__instructors_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_home_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__home_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "users_enrollments" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"course_id" integer NOT NULL,
  	"batch" varchar NOT NULL,
  	"enrollment_date" timestamp(3) with time zone NOT NULL,
  	"price" numeric NOT NULL
  );
  
  CREATE TABLE "pages_blocks_course_detail_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_course_detail_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "courses_what_you_learn_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar
  );
  
  CREATE TABLE "courses_skills" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar
  );
  
  CREATE TABLE "courses_reviews" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rating" varchar,
  	"reviewer" varchar,
  	"review" varchar
  );
  
  CREATE TABLE "courses_batches" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"start_date" timestamp(3) with time zone,
  	"end_date" timestamp(3) with time zone
  );
  
  CREATE TABLE "_courses_v_version_what_you_learn_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_courses_v_version_skills" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_courses_v_version_reviews" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"rating" varchar,
  	"reviewer" varchar,
  	"review" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_courses_v_version_batches" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"start_date" timestamp(3) with time zone,
  	"end_date" timestamp(3) with time zone,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_courses_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_description" varchar,
  	"version_image_id" integer,
  	"version_rating" numeric,
  	"version_review" numeric,
  	"version_student" numeric,
  	"version_price" numeric,
  	"version_compare_price" numeric,
  	"version_category" varchar,
  	"version_instructor_id" integer,
  	"version_duration" varchar,
  	"version_level" "enum__courses_v_version_level",
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__courses_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "instructors" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"bio" varchar,
  	"image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_instructors_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_instructors_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_bio" varchar,
  	"version_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__instructors_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_blocks_home_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"title_highlight" varchar,
  	"subtitle" varchar,
  	"image_id" integer,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_blocks_feature_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "home_blocks_feature" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_heading_badge" varchar,
  	"section_heading_title" varchar,
  	"section_heading_subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_blocks_why_choose_us_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "home_blocks_why_choose_us" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_heading_badge" varchar,
  	"section_heading_title" varchar,
  	"section_heading_subtitle" varchar,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "home_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_heading_badge" varchar,
  	"section_heading_title" varchar,
  	"section_heading_subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "home" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"_status" "enum_home_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_home_v_blocks_home_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"title_highlight" varchar,
  	"subtitle" varchar,
  	"image_id" integer,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_v_blocks_feature_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_blocks_feature" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_heading_badge" varchar,
  	"section_heading_title" varchar,
  	"section_heading_subtitle" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_v_blocks_why_choose_us_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_blocks_why_choose_us" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_heading_badge" varchar,
  	"section_heading_title" varchar,
  	"section_heading_subtitle" varchar,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_heading_badge" varchar,
  	"section_heading_title" varchar,
  	"section_heading_subtitle" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version__status" "enum__home_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "footer_quick_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pages_blocks_home_banner" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_feature" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_why_choose_us_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_why_choose_us" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_home_banner" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_feature" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_why_choose_us_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_why_choose_us" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_home_banner" CASCADE;
  DROP TABLE "pages_blocks_feature" CASCADE;
  DROP TABLE "pages_blocks_why_choose_us_points" CASCADE;
  DROP TABLE "pages_blocks_why_choose_us" CASCADE;
  DROP TABLE "_pages_v_blocks_home_banner" CASCADE;
  DROP TABLE "_pages_v_blocks_feature" CASCADE;
  DROP TABLE "_pages_v_blocks_why_choose_us_points" CASCADE;
  DROP TABLE "_pages_v_blocks_why_choose_us" CASCADE;
  ALTER TABLE "courses" ALTER COLUMN "level" SET DATA TYPE text;
  DROP TYPE "public"."enum_courses_level";
  CREATE TYPE "public"."enum_courses_level" AS ENUM('beginner', 'intermediate', 'advanced');
  ALTER TABLE "courses" ALTER COLUMN "level" SET DATA TYPE "public"."enum_courses_level" USING "level"::"public"."enum_courses_level";
  ALTER TABLE "users" ALTER COLUMN "state" SET DATA TYPE varchar;
  ALTER TABLE "courses" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "courses" ALTER COLUMN "slug" DROP NOT NULL;
  ALTER TABLE "courses" ALTER COLUMN "description" DROP NOT NULL;
  ALTER TABLE "courses" ALTER COLUMN "category" DROP NOT NULL;
  ALTER TABLE "courses" ALTER COLUMN "price" DROP NOT NULL;
  ALTER TABLE "courses" ALTER COLUMN "image_id" DROP NOT NULL;
  ALTER TABLE "courses" ALTER COLUMN "rating" DROP NOT NULL;
  ALTER TABLE "courses" ALTER COLUMN "duration" DROP NOT NULL;
  ALTER TABLE "courses" ALTER COLUMN "level" DROP NOT NULL;
  ALTER TABLE "users" ADD COLUMN "enable_a_p_i_key" boolean;
  ALTER TABLE "users" ADD COLUMN "api_key" varchar;
  ALTER TABLE "users" ADD COLUMN "api_key_index" varchar;
  ALTER TABLE "pages" ADD COLUMN "layout" "enum_pages_layout";
  ALTER TABLE "_pages_v" ADD COLUMN "version_layout" "enum__pages_v_version_layout";
  ALTER TABLE "courses" ADD COLUMN "review" numeric;
  ALTER TABLE "courses" ADD COLUMN "student" numeric;
  ALTER TABLE "courses" ADD COLUMN "compare_price" numeric;
  ALTER TABLE "courses" ADD COLUMN "instructor_id" integer;
  ALTER TABLE "courses" ADD COLUMN "_status" "enum_courses_status" DEFAULT 'draft';
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "instructors_id" integer;
  ALTER TABLE "users_enrollments" ADD CONSTRAINT "users_enrollments_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_enrollments" ADD CONSTRAINT "users_enrollments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_course_detail_banner" ADD CONSTRAINT "pages_blocks_course_detail_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_course_detail_banner" ADD CONSTRAINT "_pages_v_blocks_course_detail_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_what_you_learn_points" ADD CONSTRAINT "courses_what_you_learn_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_skills" ADD CONSTRAINT "courses_skills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_reviews" ADD CONSTRAINT "courses_reviews_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_batches" ADD CONSTRAINT "courses_batches_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_version_what_you_learn_points" ADD CONSTRAINT "_courses_v_version_what_you_learn_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_version_skills" ADD CONSTRAINT "_courses_v_version_skills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_version_reviews" ADD CONSTRAINT "_courses_v_version_reviews_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_version_batches" ADD CONSTRAINT "_courses_v_version_batches_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v" ADD CONSTRAINT "_courses_v_parent_id_courses_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."courses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_courses_v" ADD CONSTRAINT "_courses_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_courses_v" ADD CONSTRAINT "_courses_v_version_instructor_id_instructors_id_fk" FOREIGN KEY ("version_instructor_id") REFERENCES "public"."instructors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "instructors" ADD CONSTRAINT "instructors_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_instructors_v" ADD CONSTRAINT "_instructors_v_parent_id_instructors_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."instructors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_instructors_v" ADD CONSTRAINT "_instructors_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_home_banner" ADD CONSTRAINT "home_blocks_home_banner_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_blocks_home_banner" ADD CONSTRAINT "home_blocks_home_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_feature_features" ADD CONSTRAINT "home_blocks_feature_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_feature"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_feature" ADD CONSTRAINT "home_blocks_feature_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_why_choose_us_points" ADD CONSTRAINT "home_blocks_why_choose_us_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_why_choose_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_why_choose_us" ADD CONSTRAINT "home_blocks_why_choose_us_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_blocks_why_choose_us" ADD CONSTRAINT "home_blocks_why_choose_us_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_faq_items" ADD CONSTRAINT "home_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_blocks_faq" ADD CONSTRAINT "home_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_home_banner" ADD CONSTRAINT "_home_v_blocks_home_banner_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_home_banner" ADD CONSTRAINT "_home_v_blocks_home_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_feature_features" ADD CONSTRAINT "_home_v_blocks_feature_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_blocks_feature"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_feature" ADD CONSTRAINT "_home_v_blocks_feature_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_why_choose_us_points" ADD CONSTRAINT "_home_v_blocks_why_choose_us_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_blocks_why_choose_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_why_choose_us" ADD CONSTRAINT "_home_v_blocks_why_choose_us_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_why_choose_us" ADD CONSTRAINT "_home_v_blocks_why_choose_us_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_faq_items" ADD CONSTRAINT "_home_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_blocks_faq" ADD CONSTRAINT "_home_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_quick_items" ADD CONSTRAINT "footer_quick_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_enrollments_order_idx" ON "users_enrollments" USING btree ("_order");
  CREATE INDEX "users_enrollments_parent_id_idx" ON "users_enrollments" USING btree ("_parent_id");
  CREATE INDEX "users_enrollments_course_idx" ON "users_enrollments" USING btree ("course_id");
  CREATE INDEX "pages_blocks_course_detail_banner_order_idx" ON "pages_blocks_course_detail_banner" USING btree ("_order");
  CREATE INDEX "pages_blocks_course_detail_banner_parent_id_idx" ON "pages_blocks_course_detail_banner" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_course_detail_banner_path_idx" ON "pages_blocks_course_detail_banner" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_course_detail_banner_order_idx" ON "_pages_v_blocks_course_detail_banner" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_course_detail_banner_parent_id_idx" ON "_pages_v_blocks_course_detail_banner" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_course_detail_banner_path_idx" ON "_pages_v_blocks_course_detail_banner" USING btree ("_path");
  CREATE INDEX "courses_what_you_learn_points_order_idx" ON "courses_what_you_learn_points" USING btree ("_order");
  CREATE INDEX "courses_what_you_learn_points_parent_id_idx" ON "courses_what_you_learn_points" USING btree ("_parent_id");
  CREATE INDEX "courses_skills_order_idx" ON "courses_skills" USING btree ("_order");
  CREATE INDEX "courses_skills_parent_id_idx" ON "courses_skills" USING btree ("_parent_id");
  CREATE INDEX "courses_reviews_order_idx" ON "courses_reviews" USING btree ("_order");
  CREATE INDEX "courses_reviews_parent_id_idx" ON "courses_reviews" USING btree ("_parent_id");
  CREATE INDEX "courses_batches_order_idx" ON "courses_batches" USING btree ("_order");
  CREATE INDEX "courses_batches_parent_id_idx" ON "courses_batches" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_version_what_you_learn_points_order_idx" ON "_courses_v_version_what_you_learn_points" USING btree ("_order");
  CREATE INDEX "_courses_v_version_what_you_learn_points_parent_id_idx" ON "_courses_v_version_what_you_learn_points" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_version_skills_order_idx" ON "_courses_v_version_skills" USING btree ("_order");
  CREATE INDEX "_courses_v_version_skills_parent_id_idx" ON "_courses_v_version_skills" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_version_reviews_order_idx" ON "_courses_v_version_reviews" USING btree ("_order");
  CREATE INDEX "_courses_v_version_reviews_parent_id_idx" ON "_courses_v_version_reviews" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_version_batches_order_idx" ON "_courses_v_version_batches" USING btree ("_order");
  CREATE INDEX "_courses_v_version_batches_parent_id_idx" ON "_courses_v_version_batches" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_parent_idx" ON "_courses_v" USING btree ("parent_id");
  CREATE INDEX "_courses_v_version_version_slug_idx" ON "_courses_v" USING btree ("version_slug");
  CREATE INDEX "_courses_v_version_version_image_idx" ON "_courses_v" USING btree ("version_image_id");
  CREATE INDEX "_courses_v_version_version_instructor_idx" ON "_courses_v" USING btree ("version_instructor_id");
  CREATE INDEX "_courses_v_version_version_updated_at_idx" ON "_courses_v" USING btree ("version_updated_at");
  CREATE INDEX "_courses_v_version_version_created_at_idx" ON "_courses_v" USING btree ("version_created_at");
  CREATE INDEX "_courses_v_version_version__status_idx" ON "_courses_v" USING btree ("version__status");
  CREATE INDEX "_courses_v_created_at_idx" ON "_courses_v" USING btree ("created_at");
  CREATE INDEX "_courses_v_updated_at_idx" ON "_courses_v" USING btree ("updated_at");
  CREATE INDEX "_courses_v_latest_idx" ON "_courses_v" USING btree ("latest");
  CREATE INDEX "_courses_v_autosave_idx" ON "_courses_v" USING btree ("autosave");
  CREATE INDEX "instructors_image_idx" ON "instructors" USING btree ("image_id");
  CREATE INDEX "instructors_updated_at_idx" ON "instructors" USING btree ("updated_at");
  CREATE INDEX "instructors_created_at_idx" ON "instructors" USING btree ("created_at");
  CREATE INDEX "instructors__status_idx" ON "instructors" USING btree ("_status");
  CREATE INDEX "_instructors_v_parent_idx" ON "_instructors_v" USING btree ("parent_id");
  CREATE INDEX "_instructors_v_version_version_image_idx" ON "_instructors_v" USING btree ("version_image_id");
  CREATE INDEX "_instructors_v_version_version_updated_at_idx" ON "_instructors_v" USING btree ("version_updated_at");
  CREATE INDEX "_instructors_v_version_version_created_at_idx" ON "_instructors_v" USING btree ("version_created_at");
  CREATE INDEX "_instructors_v_version_version__status_idx" ON "_instructors_v" USING btree ("version__status");
  CREATE INDEX "_instructors_v_created_at_idx" ON "_instructors_v" USING btree ("created_at");
  CREATE INDEX "_instructors_v_updated_at_idx" ON "_instructors_v" USING btree ("updated_at");
  CREATE INDEX "_instructors_v_latest_idx" ON "_instructors_v" USING btree ("latest");
  CREATE INDEX "_instructors_v_autosave_idx" ON "_instructors_v" USING btree ("autosave");
  CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_home_banner_order_idx" ON "home_blocks_home_banner" USING btree ("_order");
  CREATE INDEX "home_blocks_home_banner_parent_id_idx" ON "home_blocks_home_banner" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_home_banner_path_idx" ON "home_blocks_home_banner" USING btree ("_path");
  CREATE INDEX "home_blocks_home_banner_image_idx" ON "home_blocks_home_banner" USING btree ("image_id");
  CREATE INDEX "home_blocks_feature_features_order_idx" ON "home_blocks_feature_features" USING btree ("_order");
  CREATE INDEX "home_blocks_feature_features_parent_id_idx" ON "home_blocks_feature_features" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_feature_order_idx" ON "home_blocks_feature" USING btree ("_order");
  CREATE INDEX "home_blocks_feature_parent_id_idx" ON "home_blocks_feature" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_feature_path_idx" ON "home_blocks_feature" USING btree ("_path");
  CREATE INDEX "home_blocks_why_choose_us_points_order_idx" ON "home_blocks_why_choose_us_points" USING btree ("_order");
  CREATE INDEX "home_blocks_why_choose_us_points_parent_id_idx" ON "home_blocks_why_choose_us_points" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_why_choose_us_order_idx" ON "home_blocks_why_choose_us" USING btree ("_order");
  CREATE INDEX "home_blocks_why_choose_us_parent_id_idx" ON "home_blocks_why_choose_us" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_why_choose_us_path_idx" ON "home_blocks_why_choose_us" USING btree ("_path");
  CREATE INDEX "home_blocks_why_choose_us_image_idx" ON "home_blocks_why_choose_us" USING btree ("image_id");
  CREATE INDEX "home_blocks_faq_items_order_idx" ON "home_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "home_blocks_faq_items_parent_id_idx" ON "home_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_faq_order_idx" ON "home_blocks_faq" USING btree ("_order");
  CREATE INDEX "home_blocks_faq_parent_id_idx" ON "home_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_faq_path_idx" ON "home_blocks_faq" USING btree ("_path");
  CREATE INDEX "home__status_idx" ON "home" USING btree ("_status");
  CREATE INDEX "_home_v_blocks_home_banner_order_idx" ON "_home_v_blocks_home_banner" USING btree ("_order");
  CREATE INDEX "_home_v_blocks_home_banner_parent_id_idx" ON "_home_v_blocks_home_banner" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_home_banner_path_idx" ON "_home_v_blocks_home_banner" USING btree ("_path");
  CREATE INDEX "_home_v_blocks_home_banner_image_idx" ON "_home_v_blocks_home_banner" USING btree ("image_id");
  CREATE INDEX "_home_v_blocks_feature_features_order_idx" ON "_home_v_blocks_feature_features" USING btree ("_order");
  CREATE INDEX "_home_v_blocks_feature_features_parent_id_idx" ON "_home_v_blocks_feature_features" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_feature_order_idx" ON "_home_v_blocks_feature" USING btree ("_order");
  CREATE INDEX "_home_v_blocks_feature_parent_id_idx" ON "_home_v_blocks_feature" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_feature_path_idx" ON "_home_v_blocks_feature" USING btree ("_path");
  CREATE INDEX "_home_v_blocks_why_choose_us_points_order_idx" ON "_home_v_blocks_why_choose_us_points" USING btree ("_order");
  CREATE INDEX "_home_v_blocks_why_choose_us_points_parent_id_idx" ON "_home_v_blocks_why_choose_us_points" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_why_choose_us_order_idx" ON "_home_v_blocks_why_choose_us" USING btree ("_order");
  CREATE INDEX "_home_v_blocks_why_choose_us_parent_id_idx" ON "_home_v_blocks_why_choose_us" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_why_choose_us_path_idx" ON "_home_v_blocks_why_choose_us" USING btree ("_path");
  CREATE INDEX "_home_v_blocks_why_choose_us_image_idx" ON "_home_v_blocks_why_choose_us" USING btree ("image_id");
  CREATE INDEX "_home_v_blocks_faq_items_order_idx" ON "_home_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_home_v_blocks_faq_items_parent_id_idx" ON "_home_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_faq_order_idx" ON "_home_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_home_v_blocks_faq_parent_id_idx" ON "_home_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_home_v_blocks_faq_path_idx" ON "_home_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_home_v_version_version__status_idx" ON "_home_v" USING btree ("version__status");
  CREATE INDEX "_home_v_created_at_idx" ON "_home_v" USING btree ("created_at");
  CREATE INDEX "_home_v_updated_at_idx" ON "_home_v" USING btree ("updated_at");
  CREATE INDEX "_home_v_latest_idx" ON "_home_v" USING btree ("latest");
  CREATE INDEX "_home_v_autosave_idx" ON "_home_v" USING btree ("autosave");
  CREATE INDEX "footer_quick_items_order_idx" ON "footer_quick_items" USING btree ("_order");
  CREATE INDEX "footer_quick_items_parent_id_idx" ON "footer_quick_items" USING btree ("_parent_id");
  ALTER TABLE "courses" ADD CONSTRAINT "courses_instructor_id_instructors_id_fk" FOREIGN KEY ("instructor_id") REFERENCES "public"."instructors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_instructors_fk" FOREIGN KEY ("instructors_id") REFERENCES "public"."instructors"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "courses_instructor_idx" ON "courses" USING btree ("instructor_id");
  CREATE INDEX "courses__status_idx" ON "courses" USING btree ("_status");
  CREATE INDEX "payload_locked_documents_rels_instructors_id_idx" ON "payload_locked_documents_rels" USING btree ("instructors_id");
  ALTER TABLE "courses" DROP COLUMN "instructor";
  ALTER TABLE "courses" DROP COLUMN "students";
  DROP TYPE "public"."enum_users_state";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_state" AS ENUM('Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry');
  ALTER TYPE "public"."enum_courses_level" ADD VALUE 'all';
  CREATE TABLE "pages_blocks_home_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"image_id" integer,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_feature" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_heading_badge" varchar,
  	"section_heading_title" varchar,
  	"section_heading_subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_why_choose_us_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_why_choose_us" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_heading_badge" varchar,
  	"section_heading_title" varchar,
  	"section_heading_subtitle" varchar,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_home_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"image_id" integer,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_heading_badge" varchar,
  	"section_heading_title" varchar,
  	"section_heading_subtitle" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_why_choose_us_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_why_choose_us" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_heading_badge" varchar,
  	"section_heading_title" varchar,
  	"section_heading_subtitle" varchar,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "users_enrollments" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_course_detail_banner" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_course_detail_banner" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_what_you_learn_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_skills" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_reviews" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_batches" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v_version_what_you_learn_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v_version_skills" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v_version_reviews" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v_version_batches" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "instructors" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_instructors_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_nav_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_blocks_home_banner" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_blocks_feature_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_blocks_feature" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_blocks_why_choose_us_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_blocks_why_choose_us" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_blocks_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_blocks_home_banner" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_blocks_feature_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_blocks_feature" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_blocks_why_choose_us_points" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_blocks_why_choose_us" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_blocks_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_quick_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "users_enrollments" CASCADE;
  DROP TABLE "pages_blocks_course_detail_banner" CASCADE;
  DROP TABLE "_pages_v_blocks_course_detail_banner" CASCADE;
  DROP TABLE "courses_what_you_learn_points" CASCADE;
  DROP TABLE "courses_skills" CASCADE;
  DROP TABLE "courses_reviews" CASCADE;
  DROP TABLE "courses_batches" CASCADE;
  DROP TABLE "_courses_v_version_what_you_learn_points" CASCADE;
  DROP TABLE "_courses_v_version_skills" CASCADE;
  DROP TABLE "_courses_v_version_reviews" CASCADE;
  DROP TABLE "_courses_v_version_batches" CASCADE;
  DROP TABLE "_courses_v" CASCADE;
  DROP TABLE "instructors" CASCADE;
  DROP TABLE "_instructors_v" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "home_blocks_home_banner" CASCADE;
  DROP TABLE "home_blocks_feature_features" CASCADE;
  DROP TABLE "home_blocks_feature" CASCADE;
  DROP TABLE "home_blocks_why_choose_us_points" CASCADE;
  DROP TABLE "home_blocks_why_choose_us" CASCADE;
  DROP TABLE "home_blocks_faq_items" CASCADE;
  DROP TABLE "home_blocks_faq" CASCADE;
  DROP TABLE "home" CASCADE;
  DROP TABLE "_home_v_blocks_home_banner" CASCADE;
  DROP TABLE "_home_v_blocks_feature_features" CASCADE;
  DROP TABLE "_home_v_blocks_feature" CASCADE;
  DROP TABLE "_home_v_blocks_why_choose_us_points" CASCADE;
  DROP TABLE "_home_v_blocks_why_choose_us" CASCADE;
  DROP TABLE "_home_v_blocks_faq_items" CASCADE;
  DROP TABLE "_home_v_blocks_faq" CASCADE;
  DROP TABLE "_home_v" CASCADE;
  DROP TABLE "footer_quick_items" CASCADE;
  DROP TABLE "footer" CASCADE;
  ALTER TABLE "courses" RENAME COLUMN "student" TO "students";
  ALTER TABLE "courses" DROP CONSTRAINT "courses_instructor_id_instructors_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_instructors_fk";
  
  DROP INDEX "courses_instructor_idx";
  DROP INDEX "courses__status_idx";
  DROP INDEX "payload_locked_documents_rels_instructors_id_idx";
  ALTER TABLE "users" ALTER COLUMN "state" SET DATA TYPE "public"."enum_users_state" USING "state"::"public"."enum_users_state";
  ALTER TABLE "courses" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "courses" ALTER COLUMN "slug" SET NOT NULL;
  ALTER TABLE "courses" ALTER COLUMN "description" SET NOT NULL;
  ALTER TABLE "courses" ALTER COLUMN "image_id" SET NOT NULL;
  ALTER TABLE "courses" ALTER COLUMN "rating" SET NOT NULL;
  ALTER TABLE "courses" ALTER COLUMN "price" SET NOT NULL;
  ALTER TABLE "courses" ALTER COLUMN "category" SET NOT NULL;
  ALTER TABLE "courses" ALTER COLUMN "duration" SET NOT NULL;
  ALTER TABLE "courses" ALTER COLUMN "level" SET NOT NULL;
  ALTER TABLE "courses" ADD COLUMN "instructor" varchar NOT NULL;
  ALTER TABLE "pages_blocks_home_banner" ADD CONSTRAINT "pages_blocks_home_banner_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_home_banner" ADD CONSTRAINT "pages_blocks_home_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature" ADD CONSTRAINT "pages_blocks_feature_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_why_choose_us_points" ADD CONSTRAINT "pages_blocks_why_choose_us_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_why_choose_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_why_choose_us" ADD CONSTRAINT "pages_blocks_why_choose_us_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_why_choose_us" ADD CONSTRAINT "pages_blocks_why_choose_us_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_home_banner" ADD CONSTRAINT "_pages_v_blocks_home_banner_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_home_banner" ADD CONSTRAINT "_pages_v_blocks_home_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature" ADD CONSTRAINT "_pages_v_blocks_feature_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_why_choose_us_points" ADD CONSTRAINT "_pages_v_blocks_why_choose_us_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_why_choose_us"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_why_choose_us" ADD CONSTRAINT "_pages_v_blocks_why_choose_us_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_why_choose_us" ADD CONSTRAINT "_pages_v_blocks_why_choose_us_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_home_banner_order_idx" ON "pages_blocks_home_banner" USING btree ("_order");
  CREATE INDEX "pages_blocks_home_banner_parent_id_idx" ON "pages_blocks_home_banner" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_home_banner_path_idx" ON "pages_blocks_home_banner" USING btree ("_path");
  CREATE INDEX "pages_blocks_home_banner_image_idx" ON "pages_blocks_home_banner" USING btree ("image_id");
  CREATE INDEX "pages_blocks_feature_order_idx" ON "pages_blocks_feature" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_parent_id_idx" ON "pages_blocks_feature" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_path_idx" ON "pages_blocks_feature" USING btree ("_path");
  CREATE INDEX "pages_blocks_why_choose_us_points_order_idx" ON "pages_blocks_why_choose_us_points" USING btree ("_order");
  CREATE INDEX "pages_blocks_why_choose_us_points_parent_id_idx" ON "pages_blocks_why_choose_us_points" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_why_choose_us_order_idx" ON "pages_blocks_why_choose_us" USING btree ("_order");
  CREATE INDEX "pages_blocks_why_choose_us_parent_id_idx" ON "pages_blocks_why_choose_us" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_why_choose_us_path_idx" ON "pages_blocks_why_choose_us" USING btree ("_path");
  CREATE INDEX "pages_blocks_why_choose_us_image_idx" ON "pages_blocks_why_choose_us" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_home_banner_order_idx" ON "_pages_v_blocks_home_banner" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_home_banner_parent_id_idx" ON "_pages_v_blocks_home_banner" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_home_banner_path_idx" ON "_pages_v_blocks_home_banner" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_home_banner_image_idx" ON "_pages_v_blocks_home_banner" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_feature_order_idx" ON "_pages_v_blocks_feature" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_parent_id_idx" ON "_pages_v_blocks_feature" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_path_idx" ON "_pages_v_blocks_feature" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_why_choose_us_points_order_idx" ON "_pages_v_blocks_why_choose_us_points" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_why_choose_us_points_parent_id_idx" ON "_pages_v_blocks_why_choose_us_points" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_why_choose_us_order_idx" ON "_pages_v_blocks_why_choose_us" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_why_choose_us_parent_id_idx" ON "_pages_v_blocks_why_choose_us" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_why_choose_us_path_idx" ON "_pages_v_blocks_why_choose_us" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_why_choose_us_image_idx" ON "_pages_v_blocks_why_choose_us" USING btree ("image_id");
  ALTER TABLE "users" DROP COLUMN "enable_a_p_i_key";
  ALTER TABLE "users" DROP COLUMN "api_key";
  ALTER TABLE "users" DROP COLUMN "api_key_index";
  ALTER TABLE "pages" DROP COLUMN "layout";
  ALTER TABLE "_pages_v" DROP COLUMN "version_layout";
  ALTER TABLE "courses" DROP COLUMN "review";
  ALTER TABLE "courses" DROP COLUMN "compare_price";
  ALTER TABLE "courses" DROP COLUMN "instructor_id";
  ALTER TABLE "courses" DROP COLUMN "_status";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "instructors_id";
  DROP TYPE "public"."enum_pages_layout";
  DROP TYPE "public"."enum__pages_v_version_layout";
  DROP TYPE "public"."enum_courses_status";
  DROP TYPE "public"."enum__courses_v_version_level";
  DROP TYPE "public"."enum__courses_v_version_status";
  DROP TYPE "public"."enum_instructors_status";
  DROP TYPE "public"."enum__instructors_v_version_status";
  DROP TYPE "public"."enum_home_status";
  DROP TYPE "public"."enum__home_v_version_status";`)
}
