import Spinner from "@/components/shared/spinner";

export default function Loading() {
  return (
    <Spinner className="fixed inset-0 w-full h-full flex items-center justify-center bg-background text-foreground" />
  )
}