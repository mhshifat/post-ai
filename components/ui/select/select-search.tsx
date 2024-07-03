interface SelectSearchProps {
  className?: string;
  placeholder?: string;
}

export default function SelectSearch({ className, placeholder }: SelectSearchProps) {
  return (
    <li>
      <input className={className} type="text" placeholder={placeholder} />
    </li>
  )
}