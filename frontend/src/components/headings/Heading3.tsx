interface Heading3Props {
  name: string;
  className?: string;
}
export default function Heading3({ name, className }: Heading3Props) {
  return (
    <div
      className={`text-[#18191c] text-[30px] font-medium leading-10 ${className}`}
    >
      {name}
    </div>
  );
}
