import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "common_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL
  );
  
  CREATE TABLE "common_mobiles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"mobile" numeric NOT NULL
  );
  
  CREATE TABLE "common_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "common" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer NOT NULL,
  	"footer_description" varchar NOT NULL,
  	"address" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users" ADD COLUMN "mobile" varchar;
  ALTER TABLE "common_emails" ADD CONSTRAINT "common_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."common"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "common_mobiles" ADD CONSTRAINT "common_mobiles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."common"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "common_socials" ADD CONSTRAINT "common_socials_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "common_socials" ADD CONSTRAINT "common_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."common"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "common" ADD CONSTRAINT "common_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "common_emails_order_idx" ON "common_emails" USING btree ("_order");
  CREATE INDEX "common_emails_parent_id_idx" ON "common_emails" USING btree ("_parent_id");
  CREATE INDEX "common_mobiles_order_idx" ON "common_mobiles" USING btree ("_order");
  CREATE INDEX "common_mobiles_parent_id_idx" ON "common_mobiles" USING btree ("_parent_id");
  CREATE INDEX "common_socials_order_idx" ON "common_socials" USING btree ("_order");
  CREATE INDEX "common_socials_parent_id_idx" ON "common_socials" USING btree ("_parent_id");
  CREATE INDEX "common_socials_icon_idx" ON "common_socials" USING btree ("icon_id");
  CREATE INDEX "common_logo_idx" ON "common" USING btree ("logo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "common_emails" CASCADE;
  DROP TABLE "common_mobiles" CASCADE;
  DROP TABLE "common_socials" CASCADE;
  DROP TABLE "common" CASCADE;
  ALTER TABLE "users" DROP COLUMN "mobile";`)
}
