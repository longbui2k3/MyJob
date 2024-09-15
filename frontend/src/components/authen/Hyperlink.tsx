interface HyperlinkProps {
  label: string;
  href: string | undefined;
}

export default function Hyperlink({ label, href }: HyperlinkProps) {
  return (
    <div className="ml-[5px] text-[--primary-600] text-[14px] font-medium leading-normal hover:text-[--primary-500]">
      <a href={href}>{label}</a>
    </div>
  );
}
