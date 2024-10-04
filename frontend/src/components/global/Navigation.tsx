import { useEffect, useState } from "react";
import { useAuthContext } from "../../context";
import { Navigations } from "../../helpers/constants";
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
const navigationRoles = {
  normal: [
    Navigations.FIND_JOB,
    Navigations.EMPLOYERS,
    Navigations.CANDIDATES,
    Navigations.PRICING_PLANS,
    Navigations.CUSTOMER_SUPPORTS,
  ],
  employee: [
    Navigations.FIND_JOB,
    Navigations.FIND_EMPLOYERS,
    Navigations.DASHBOARD,
    Navigations.JOB_ALERTS,
    Navigations.CUSTOMER_SUPPORTS,
  ],
  employer: [
    Navigations.FIND_CANDIDATES,
    Navigations.DASHBOARD,
    Navigations.MY_JOBS,
    Navigations.APPLICATIONS,
    Navigations.CUSTOMER_SUPPORTS,
  ],
};
export default function Navigation() {
  const { user } = useAuthContext();
  const [navigations, setNavigations] = useState<
    Array<{ label: string; href: string }>
  >([]);

  useEffect(() => {
    if (typeof user === "string") return;
    if (user) {
      setNavigations(navigationRoles[user.userType]);
    } else {
      setNavigations(navigationRoles["normal"]);
    }
  }, [user]);

  return (
    <div className="flex flex-col justify-center w-full h-[50px] bg-[--gray-100]">
      <ul className="flex space-x-6 ml-[240px] h-full">
        {navigations.length ? (
          <>
            <Li
              label={Navigations.HOME.label}
              href={Navigations.HOME.href}
              href1={Navigations.HOME.href1}
            />
            {navigations.map((navigation) => (
              <Li label={navigation.label} href={navigation.href} />
            ))}
          </>
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
}
