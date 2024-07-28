"use client";

import useSurvey from "@/components/hooks/use-survey";
import Spinner from "@/components/shared/spinner";
import FilterQuestions from "../domain/filter-questions";

interface CustomerSurveyResultProps {
  customerId: string;
  domainId: string;
}

export default function CustomerSurveyResult({ customerId, domainId }: CustomerSurveyResultProps) {
  const { loading, surveyResults } = useSurvey({
    customerId,
    domainId
  });

  if (loading) return <Spinner />;
  return (
    <FilterQuestions
      questions={surveyResults}
    />
  )
}