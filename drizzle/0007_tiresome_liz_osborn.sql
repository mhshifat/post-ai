CREATE TABLE IF NOT EXISTS "bots" (
	"id" text PRIMARY KEY NOT NULL,
	"domain_id" text NOT NULL,
	"logo" text NOT NULL,
	"welcome_text" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bots" ADD CONSTRAINT "bots_domain_id_domains_id_fk" FOREIGN KEY ("domain_id") REFERENCES "public"."domains"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
