import { getSurveyQuestions } from "@/actions/survey-questions";
import { getSurveys } from "@/actions/surveys";
import { ISurvey, ISurveyQuestion } from "@/utils/types";
import { useEffect, useMemo, useState } from "react";

export default function useSurvey(props: {
  domainId: string;
  customerId: string;
}) {
  const [loading, setLoading] = useState(false);
  const [surveyQuestions, setSurveyQuestions] = useState<ISurveyQuestion[]>([]);
  const [surveys, setSurveys] = useState<ISurvey[]>([]);

  const surveyResults = useMemo(() => {
    return surveyQuestions.map(item => ({
      id: item.id,
      createdAt: item.createdAt,
      domainId: item.domainId,
      question: item.question,
      answer: surveys.find(s => s.surveyQuestionId === item.id)?.answer || "",
    }))?.filter(s => s.answer);
  }, [surveyQuestions, surveys]);

  useEffect(() => {
    if (!props.domainId || !props.customerId) return;
    setLoading(true);
    Promise.all([
      fetchSurveyQuestions(),
      fetchSurveys(),
    ]).then(() => {
      setLoading(false);
    })
  }, [props?.domainId, props?.customerId]);
  
  async function fetchSurveyQuestions() {
    const questions = await getSurveyQuestions(props.domainId);
    setSurveyQuestions(questions as ISurveyQuestion[]);
  }
  async function fetchSurveys() {
    const surveys = await getSurveys({
      customerId: props.customerId,
      domainId: props.domainId,
    });
    setSurveys(surveys as ISurvey[]);
  }
  return {
    loading,
    surveyResults,
  }
}