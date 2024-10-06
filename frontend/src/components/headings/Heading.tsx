interface HeadingProps {
  size?: number;
  name?: string;
  className?: string;
}

export default function Heading({ name, className, size = 15 }: HeadingProps) {
  return (
    <div
      className={`text-[#18191c] font-medium leading-1 ${className}`}
      style={{
        fontSize: `${size}px`,
      }}
    >
      {name}
    </div>
  );
}
