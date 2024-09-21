interface InfoProps {
  info?: string;
  Icon: JSX.ElementType;
}
export default function Info({ info = "", Icon }: InfoProps) {
  return (
    <div className="flex space-x-1 text-[--gray-500]">
      <Icon size={18} className="my-auto" />
      <div className="my-auto text-[13px]">{info}</div>
    </div>
  );
}
