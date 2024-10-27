interface UnsendProps {
  onClick: (e) => void;
  className?: string;
}

export default function Resend({ onClick, className = "" }: UnsendProps) {
  return (
    <div className={`flex mt-[15px] ${className}`}>
      <div className="text-[--gray-500] text-[14px] font-normal leading-normal">
        {"Didn’t receive any code!"}
      </div>
      <div
        className="ml-[5px] text-[--primary-600] text-[14px] font-medium leading-normal cursor-pointer hover:text-[--primary-500]"
        onClick={onClick}
      >
        {"Resend"}
      </div>
    </div>
  );
}
