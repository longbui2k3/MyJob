interface MessageErrorProps {
  content: string;
  className?: string;
}

export default function MessageError({
  content,
  className,
}: MessageErrorProps) {
  return (
    <div
      className={`mt-1 text-[--error] text-[14px] font-[450] w-full ${className}`}
    >
      {content}
    </div>
  );
}
