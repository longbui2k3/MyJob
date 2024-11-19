interface InfoProps {
  info?: string;
  iconColor?: string;
  Icon: JSX.ElementType;
}
export default function Info({
  info = "",
  iconColor = "var(--gray-500)",
  Icon,
}: InfoProps) {
  return (
    <div className="flex space-x-1 text-[--gray-500]">
      <Icon size={20} className="my-auto" color={iconColor} />
      <div className="my-auto text-[13px]">{info}</div>
    </div>
  );
}
