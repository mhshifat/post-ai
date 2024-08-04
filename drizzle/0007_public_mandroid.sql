CREATE TABLE IF NOT EXISTS "customers_to_campaigns" (
	"customer_id" text NOT NULL,
	"campaign_id" text NOT NULL,
	CONSTRAINT "customers_to_campaigns_customer_id_campaign_id_pk" PRIMARY KEY("customer_id","campaign_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "customers_to_campaigns" ADD CONSTRAINT "customers_to_campaigns_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "customers_to_campaigns" ADD CONSTRAINT "customers_to_campaigns_campaign_id_campaigns_id_fk" FOREIGN KEY ("campaign_id") REFERENCES "public"."campaigns"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
