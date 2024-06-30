import { cloneElement, forwardRef, PropsWithChildren, ReactElement, Ref, useImperativeHandle } from "react";
import { useSteps } from ".";

interface StepsTriggerProps {
  asChild?: boolean;
  type?: "next" | "prev";
}

function StepsTrigger({ children, asChild, type = "next" }: PropsWithChildren<StepsTriggerProps>, ref: Ref<unknown>) {
  const { changeStep } = useSteps();

  useImperativeHandle(ref, () => ({
    handleStep
  }), [])

  const Component = asChild ? cloneElement(children as ReactElement, {
    onClick: handleStep
  }) : (
    <span onClick={handleStep} role="button">
      {children}
    </span>
  )
  
  function handleStep() {
    changeStep({
      step: type
    })
  }
  return Component;
}

export default forwardRef(StepsTrigger);