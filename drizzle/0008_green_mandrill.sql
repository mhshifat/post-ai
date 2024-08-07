CREATE TABLE IF NOT EXISTS "blogs" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"title" date NOT NULL,
	"slug" date NOT NULL,
	"thumbnail" date NOT NULL,
	"content" date NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blogs" ADD CONSTRAINT "blogs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
