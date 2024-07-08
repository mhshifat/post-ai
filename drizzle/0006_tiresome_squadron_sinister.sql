CREATE TABLE IF NOT EXISTS "products" (
	"id" text PRIMARY KEY NOT NULL,
	"domain_id" text NOT NULL,
	"title" text NOT NULL,
	"image" text NOT NULL,
	"price" numeric NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp
);
