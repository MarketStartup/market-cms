import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_state" AS ENUM('Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry');
  CREATE TYPE "public"."enum_courses_level" AS ENUM('beginner', 'intermediate', 'advanced', 'all');
  CREATE TABLE "pages_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "courses" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"category" varchar NOT NULL,
  	"price" numeric NOT NULL,
  	"image_id" integer NOT NULL,
  	"instructor" varchar NOT NULL,
  	"rating" numeric NOT NULL,
  	"students" numeric NOT NULL,
  	"duration" varchar NOT NULL,
  	"level" "enum_courses_level" NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users" ADD COLUMN "dob" timestamp(3) with time zone;
  ALTER TABLE "users" ADD COLUMN "state" "enum_users_state";
  ALTER TABLE "pages_blocks_home_banner" ADD COLUMN "primary_action_label" varchar;
  ALTER TABLE "pages_blocks_home_banner" ADD COLUMN "primary_action_href" varchar;
  ALTER TABLE "pages_blocks_home_banner" ADD COLUMN "secondary_action_label" varchar;
  ALTER TABLE "pages_blocks_home_banner" ADD COLUMN "secondary_action_href" varchar;
  ALTER TABLE "pages_blocks_promo_banner" ADD COLUMN "primary_action_label" varchar;
  ALTER TABLE "pages_blocks_promo_banner" ADD COLUMN "primary_action_href" varchar;
  ALTER TABLE "pages_blocks_promo_banner" ADD COLUMN "secondary_action_label" varchar;
  ALTER TABLE "pages_blocks_promo_banner" ADD COLUMN "secondary_action_href" varchar;
  ALTER TABLE "_pages_v_blocks_home_banner" ADD COLUMN "primary_action_label" varchar;
  ALTER TABLE "_pages_v_blocks_home_banner" ADD COLUMN "primary_action_href" varchar;
  ALTER TABLE "_pages_v_blocks_home_banner" ADD COLUMN "secondary_action_label" varchar;
  ALTER TABLE "_pages_v_blocks_home_banner" ADD COLUMN "secondary_action_href" varchar;
  ALTER TABLE "_pages_v_blocks_promo_banner" ADD COLUMN "primary_action_label" varchar;
  ALTER TABLE "_pages_v_blocks_promo_banner" ADD COLUMN "primary_action_href" varchar;
  ALTER TABLE "_pages_v_blocks_promo_banner" ADD COLUMN "secondary_action_label" varchar;
  ALTER TABLE "_pages_v_blocks_promo_banner" ADD COLUMN "secondary_action_href" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "autosave" boolean;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "courses_id" integer;
  ALTER TABLE "pages_blocks_contact_form" ADD CONSTRAINT "pages_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_form" ADD CONSTRAINT "_pages_v_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses" ADD CONSTRAINT "courses_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_contact_form_order_idx" ON "pages_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_form_parent_id_idx" ON "pages_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_form_path_idx" ON "pages_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_form_order_idx" ON "_pages_v_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_form_parent_id_idx" ON "_pages_v_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_form_path_idx" ON "_pages_v_blocks_contact_form" USING btree ("_path");
  CREATE UNIQUE INDEX "courses_slug_idx" ON "courses" USING btree ("slug");
  CREATE INDEX "courses_image_idx" ON "courses" USING btree ("image_id");
  CREATE INDEX "courses_updated_at_idx" ON "courses" USING btree ("updated_at");
  CREATE INDEX "courses_created_at_idx" ON "courses" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_courses_fk" FOREIGN KEY ("courses_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "payload_locked_documents_rels_courses_id_idx" ON "payload_locked_documents_rels" USING btree ("courses_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_contact_form" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_form" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "courses" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_contact_form" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_form" CASCADE;
  DROP TABLE "courses" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_courses_fk";
  
  DROP INDEX "_pages_v_autosave_idx";
  DROP INDEX "payload_locked_documents_rels_courses_id_idx";
  ALTER TABLE "users" DROP COLUMN "dob";
  ALTER TABLE "users" DROP COLUMN "state";
  ALTER TABLE "pages_blocks_home_banner" DROP COLUMN "primary_action_label";
  ALTER TABLE "pages_blocks_home_banner" DROP COLUMN "primary_action_href";
  ALTER TABLE "pages_blocks_home_banner" DROP COLUMN "secondary_action_label";
  ALTER TABLE "pages_blocks_home_banner" DROP COLUMN "secondary_action_href";
  ALTER TABLE "pages_blocks_promo_banner" DROP COLUMN "primary_action_label";
  ALTER TABLE "pages_blocks_promo_banner" DROP COLUMN "primary_action_href";
  ALTER TABLE "pages_blocks_promo_banner" DROP COLUMN "secondary_action_label";
  ALTER TABLE "pages_blocks_promo_banner" DROP COLUMN "secondary_action_href";
  ALTER TABLE "_pages_v_blocks_home_banner" DROP COLUMN "primary_action_label";
  ALTER TABLE "_pages_v_blocks_home_banner" DROP COLUMN "primary_action_href";
  ALTER TABLE "_pages_v_blocks_home_banner" DROP COLUMN "secondary_action_label";
  ALTER TABLE "_pages_v_blocks_home_banner" DROP COLUMN "secondary_action_href";
  ALTER TABLE "_pages_v_blocks_promo_banner" DROP COLUMN "primary_action_label";
  ALTER TABLE "_pages_v_blocks_promo_banner" DROP COLUMN "primary_action_href";
  ALTER TABLE "_pages_v_blocks_promo_banner" DROP COLUMN "secondary_action_label";
  ALTER TABLE "_pages_v_blocks_promo_banner" DROP COLUMN "secondary_action_href";
  ALTER TABLE "_pages_v" DROP COLUMN "autosave";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "courses_id";
  DROP TYPE "public"."enum_users_state";
  DROP TYPE "public"."enum_courses_level";`)
}
