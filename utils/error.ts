import { toast } from "sonner";

export function handleError(err: unknown) {
  console.error(err);
  if (err instanceof Error) return toast.error(err.message);
  toast.error("Something went wrong");
}