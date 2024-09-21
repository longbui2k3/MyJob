interface LiProps {
  label: string;
  href: string;
  href1?: string;
}
function Li({ label, href, href1 }: LiProps) {
  return (
    <li
      className={`flex flex-col justify-center ${
        window.location.pathname === href ||
        (href1 && window.location.pathname === href1)
          ? "text-[--primary-500] border-b-4 mt-1 border-[--primary-500]"
          : "text-[--gray-600]"
      }`}
    >
      <a
        className={`text-[14px] font-[500] hover:text-[--primary-500]`}
        href={href}
      >
        {label}
      </a>
    </li>
  );
}

export default function Navigation() {
  return (
    <div className="flex flex-col justify-center w-full h-[50px] bg-[--gray-100]">
      <ul className="flex space-x-6 ml-[240px] h-full">
        <Li label="Home" href="/" href1="/home" />
        <Li label="Find Job" href="#" />
        <Li label="Employers" href="#" />
        <Li label="Candidates" href="#" />
        <Li label="Pricing Plans" href="#" />
        <Li label="Customer Supports" href="#" />
      </ul>
    </div>
  );
}
