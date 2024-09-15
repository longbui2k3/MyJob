interface MessageSuccessProps {
  content: string;
  className: string;
}

export default function MessageSuccess({
  content,
  className,
}: MessageSuccessProps) {
  return (
    <div
      className={`mt-2 text-[--success] text-[14px] font-[450] w-full ${className}`}
    >
      {content}
    </div>
  );
}
