import Image from "next/image";

interface NotFoundProps {
  title?: string;
}

export default function NotFound({ title }: NotFoundProps) {
  return (
    <div className="flex justify-center items-center flex-col flex-1 w-full h-full px-5 py-10">
      <Image
        src="/images/empty.png"
        alt="not found"
        width={50}
        height={50}
      />
      <p className="text-sm mt-3 font-normal text-foreground/50">{title || "No Data Found"}</p>
    </div>
  )
}