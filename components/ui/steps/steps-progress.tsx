import { Fragment } from "react";
import { useSteps } from ".";

interface StepsProgressProps {
  className?: string;
  renderItem?: (args: {
    currentStep: number;
    currentIndex: number;
  }) => JSX.Element;
}

export default function StepsProgress({ renderItem, className }: StepsProgressProps) {
  const { steps, currentStep } = useSteps();

  return (
    <ul className={className}>
      {Object.keys(steps).map((key, keyIdx) => (
        <li key={key} className="w-full">
          {renderItem?.({ currentStep, currentIndex: keyIdx }) || keyIdx + 1}
        </li>
      ))}
    </ul>
  )
}