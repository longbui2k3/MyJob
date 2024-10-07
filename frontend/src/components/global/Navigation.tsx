import { useEffect, useState } from "react";
import { useAuthContext } from "../../context";
import {
  DEFAULT_PADDING_X,
  matchPathPattern,
  Navigations,
} from "../../helpers/constants";
interface LiProps {
  label: string;
  href: string;
  pattern1?: string;
  pattern: string;
}
function Li({ label, href, pattern1, pattern }: LiProps) {
  return (
    <li
      className={`flex flex-col justify-center ${
        matchPathPattern(window.location.pathname, pattern) ||
        (pattern1 && matchPathPattern(window.location.pathname, pattern1))
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
    Array<{ label: string; href: string; pattern: string }>
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
      <ul
        className={`flex space-x-6 h-full`}
        style={{
          marginLeft: DEFAULT_PADDING_X,
        }}
      >
        {navigations.length ? (
          <>
            <Li
              label={Navigations.HOME.label}
              href={Navigations.HOME.href}
              pattern1={Navigations.HOME.pattern1}
              pattern={Navigations.HOME.pattern}
            />
            {navigations.map((navigation) => (
              <Li
                label={navigation.label}
                href={navigation.href}
                pattern={navigation.pattern}
              />
            ))}
          </>
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
}
