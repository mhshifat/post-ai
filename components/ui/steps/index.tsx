"use client";

import { createContext, PropsWithChildren, useCallback, useContext, useId, useState } from "react"
import StepsItem from "./steps-item";
import StepsTrigger from "./steps-trigger";
import StepsProgress from "./steps-progress";

interface StepsProps {
  className?: string;
}

interface StepsCtxProps extends StepsProps {
  currentStep: number;
  changeStep: (args: {
    step: "prev" | "next";
  }) => void;
  registerStep: (args: {
    identifier: number;
    data: Record<string, unknown>;
  }) => void;
  steps: Record<string, unknown>;
}

const StepsCtx = createContext<StepsCtxProps | null>(null);

export default function Steps({ children, className }: PropsWithChildren<StepsProps>) {
  const [steps, setSteps] = useState<Record<string, unknown>>({});
  const [currentStep, setCurrentStep] = useState(1);

  const changeStep = useCallback((args: {
    step: "prev" | "next",
  }) => {
    setCurrentStep(prevStep => args.step === "prev" ? prevStep - 1 : prevStep + 1);
  }, []);

  const registerStep = useCallback((args: {
    identifier: number,
    data: Record<string, unknown>;
  }) => {
    setSteps(values => ({
      ...values,
      [args.identifier]: args.data
    }));
  }, []);

  return (
    <StepsCtx.Provider value={{
      steps,
      currentStep,
      changeStep,
      registerStep
    }}>
      <div className={className}>
        {children}
      </div>
    </StepsCtx.Provider>
  )
}

Steps.Item = StepsItem;
Steps.Trigger = StepsTrigger;
Steps.Progress = StepsProgress;

export function useSteps() {
  const res = useContext(StepsCtx);
  if (!res) throw new Error("Component needs to wrapped with Steps");
  return res;
}