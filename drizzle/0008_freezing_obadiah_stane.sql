CREATE TABLE IF NOT EXISTS "questions_answers" (
	"id" text PRIMARY KEY NOT NULL,
	"domain_id" text NOT NULL,
	"question" text NOT NULL,
	"answer" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "questions_answers" ADD CONSTRAINT "questions_answers_domain_id_domains_id_fk" FOREIGN KEY ("domain_id") REFERENCES "public"."domains"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
