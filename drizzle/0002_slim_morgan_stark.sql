CREATE TABLE IF NOT EXISTS "domains" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"logo" text NOT NULL,
	"domain" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "domains_domain_unique" UNIQUE("domain")
);
