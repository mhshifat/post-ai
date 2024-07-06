import { cn } from "@/lib/utils";

interface AvatarProps {
  size?: number;
  className?: string;
}

export default function Avatar({ size, className }: AvatarProps) {
  return (
    <div style={{
      ...size?{
        width: size,
        height: size,
      }:{}
    }} className={cn("w-7 h-7 rounded-full shadow-sm overflow-hidden", className)}>
      <img src="https://picsum.photos/200" alt="" className="w-full h-full object-cover object-center" />
    </div>
  )
}