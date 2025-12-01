import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_batches_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__batches_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "batches_users" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"user_id" integer,
  	"enrollment_date" timestamp(3) with time zone,
  	"price" numeric
  );
  
  CREATE TABLE "batches" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"name" varchar,
  	"course_id" integer,
  	"start_date" timestamp(3) with time zone,
  	"end_date" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_batches_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_batches_v_version_users" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" integer,
  	"enrollment_date" timestamp(3) with time zone,
  	"price" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_batches_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_name" varchar,
  	"version_course_id" integer,
  	"version_start_date" timestamp(3) with time zone,
  	"version_end_date" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__batches_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  ALTER TABLE "users_enrollments" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses_batches" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_courses_v_version_batches" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "users_enrollments" CASCADE;
  DROP TABLE "courses_batches" CASCADE;
  DROP TABLE "_courses_v_version_batches" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "batches_id" integer;
  ALTER TABLE "batches_users" ADD CONSTRAINT "batches_users_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "batches_users" ADD CONSTRAINT "batches_users_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."batches"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "batches" ADD CONSTRAINT "batches_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_batches_v_version_users" ADD CONSTRAINT "_batches_v_version_users_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_batches_v_version_users" ADD CONSTRAINT "_batches_v_version_users_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_batches_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_batches_v" ADD CONSTRAINT "_batches_v_parent_id_batches_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."batches"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_batches_v" ADD CONSTRAINT "_batches_v_version_course_id_courses_id_fk" FOREIGN KEY ("version_course_id") REFERENCES "public"."courses"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "batches_users_order_idx" ON "batches_users" USING btree ("_order");
  CREATE INDEX "batches_users_parent_id_idx" ON "batches_users" USING btree ("_parent_id");
  CREATE INDEX "batches_users_user_idx" ON "batches_users" USING btree ("user_id");
  CREATE INDEX "batches_course_idx" ON "batches" USING btree ("course_id");
  CREATE INDEX "batches_updated_at_idx" ON "batches" USING btree ("updated_at");
  CREATE INDEX "batches_created_at_idx" ON "batches" USING btree ("created_at");
  CREATE INDEX "batches__status_idx" ON "batches" USING btree ("_status");
  CREATE INDEX "_batches_v_version_users_order_idx" ON "_batches_v_version_users" USING btree ("_order");
  CREATE INDEX "_batches_v_version_users_parent_id_idx" ON "_batches_v_version_users" USING btree ("_parent_id");
  CREATE INDEX "_batches_v_version_users_user_idx" ON "_batches_v_version_users" USING btree ("user_id");
  CREATE INDEX "_batches_v_parent_idx" ON "_batches_v" USING btree ("parent_id");
  CREATE INDEX "_batches_v_version_version_course_idx" ON "_batches_v" USING btree ("version_course_id");
  CREATE INDEX "_batches_v_version_version_updated_at_idx" ON "_batches_v" USING btree ("version_updated_at");
  CREATE INDEX "_batches_v_version_version_created_at_idx" ON "_batches_v" USING btree ("version_created_at");
  CREATE INDEX "_batches_v_version_version__status_idx" ON "_batches_v" USING btree ("version__status");
  CREATE INDEX "_batches_v_created_at_idx" ON "_batches_v" USING btree ("created_at");
  CREATE INDEX "_batches_v_updated_at_idx" ON "_batches_v" USING btree ("updated_at");
  CREATE INDEX "_batches_v_latest_idx" ON "_batches_v" USING btree ("latest");
  CREATE INDEX "_batches_v_autosave_idx" ON "_batches_v" USING btree ("autosave");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_batches_fk" FOREIGN KEY ("batches_id") REFERENCES "public"."batches"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_batches_id_idx" ON "payload_locked_documents_rels" USING btree ("batches_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "users_enrollments" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"course_id" integer NOT NULL,
  	"batch" varchar NOT NULL,
  	"enrollment_date" timestamp(3) with time zone NOT NULL,
  	"price" numeric NOT NULL
  );
  
  CREATE TABLE "courses_batches" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"start_date" timestamp(3) with time zone,
  	"end_date" timestamp(3) with time zone
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
  
  ALTER TABLE "batches_users" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "batches" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_batches_v_version_users" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_batches_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "batches_users" CASCADE;
  DROP TABLE "batches" CASCADE;
  DROP TABLE "_batches_v_version_users" CASCADE;
  DROP TABLE "_batches_v" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_batches_fk";
  
  DROP INDEX "payload_locked_documents_rels_batches_id_idx";
  ALTER TABLE "users_enrollments" ADD CONSTRAINT "users_enrollments_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_enrollments" ADD CONSTRAINT "users_enrollments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_batches" ADD CONSTRAINT "courses_batches_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_version_batches" ADD CONSTRAINT "_courses_v_version_batches_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_enrollments_order_idx" ON "users_enrollments" USING btree ("_order");
  CREATE INDEX "users_enrollments_parent_id_idx" ON "users_enrollments" USING btree ("_parent_id");
  CREATE INDEX "users_enrollments_course_idx" ON "users_enrollments" USING btree ("course_id");
  CREATE INDEX "courses_batches_order_idx" ON "courses_batches" USING btree ("_order");
  CREATE INDEX "courses_batches_parent_id_idx" ON "courses_batches" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_version_batches_order_idx" ON "_courses_v_version_batches" USING btree ("_order");
  CREATE INDEX "_courses_v_version_batches_parent_id_idx" ON "_courses_v_version_batches" USING btree ("_parent_id");
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "batches_id";
  DROP TYPE "public"."enum_batches_status";
  DROP TYPE "public"."enum__batches_v_version_status";`)
}
