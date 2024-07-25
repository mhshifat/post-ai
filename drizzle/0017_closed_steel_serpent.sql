CREATE TABLE IF NOT EXISTS "survey_questions" (
	"id" text PRIMARY KEY NOT NULL,
	"domain_id" text NOT NULL,
	"question" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "questions_answers" RENAME TO "faqs";--> statement-breakpoint
ALTER TABLE "surveys" RENAME COLUMN "question_id" TO "survey_question_id";--> statement-breakpoint
ALTER TABLE "faqs" DROP CONSTRAINT "questions_answers_domain_id_domains_id_fk";
--> statement-breakpoint
ALTER TABLE "surveys" DROP CONSTRAINT "surveys_question_id_questions_answers_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "survey_questions" ADD CONSTRAINT "survey_questions_domain_id_domains_id_fk" FOREIGN KEY ("domain_id") REFERENCES "public"."domains"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "faqs" ADD CONSTRAINT "faqs_domain_id_domains_id_fk" FOREIGN KEY ("domain_id") REFERENCES "public"."domains"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "surveys" ADD CONSTRAINT "surveys_survey_question_id_survey_questions_id_fk" FOREIGN KEY ("survey_question_id") REFERENCES "public"."survey_questions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "faqs" DROP COLUMN IF EXISTS "type";