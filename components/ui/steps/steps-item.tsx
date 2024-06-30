import { PropsWithChildren, useEffect } from "react";
import { useSteps } from ".";

interface StepsItemProps {
  identifier: number;
}

export default function StepsItem({ children, identifier }: PropsWithChildren<StepsItemProps>) {
  const { registerStep, currentStep } = useSteps();
  
  useEffect(() => {
    registerStep({
      identifier,
      data: {}
    })
  }, [identifier])

  if (currentStep !== identifier) return null;
  return (
    <>
      {children}
    </>
  )
}