interface TextProps {
  children: any;
  className?: string;
  onMouseOver?: (e) => void;
  onMouseOut?: (e) => void;
}

export default function Text({
  children,
  className = "",
  onMouseOver = (e) => {},
  onMouseOut = (e) => {},
}: TextProps) {
  return (
    <div
      className={`mt-3 text-[--gray-500] text-[14px] font-normal ${className}`}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      {children}
    </div>
  );
}
