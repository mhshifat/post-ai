import { Button } from "../ui/button";

interface ConfirmationProps {
  onCancel: () => void;
  onOk: () => void;
}

export default function Confirmation({ onCancel, onOk }: ConfirmationProps) {
  return (
    <div className="w-full h-auto flex items-center gap-5">
      <Button className="flex-1" variant="outline" onClick={onCancel}>Cancel</Button>
      <Button className="flex-1" variant="default" onClick={onOk}>Ok</Button>
    </div>
  )
}