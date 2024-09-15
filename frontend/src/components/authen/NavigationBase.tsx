import Hyperlink from "./Hyperlink";

interface NavigationBaseProps {
  label: string;
  hyperlinkLabel: string;
  href: string;
}

export default function NavigationBase({
  label,
  hyperlinkLabel,
  href,
}: NavigationBaseProps) {
  return (
    <div className="flex mt-[15px]">
      <div className="text-[--gray-500] text-[14px] font-normal leading-normal">
        {label}
      </div>
      <Hyperlink label={hyperlinkLabel} href={`${href}`} />
    </div>
  );
}
