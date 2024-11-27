import { GoBookmark, GoStack } from "react-icons/go";
import {
  matchPathPattern,
  Navigations,
  UserTypes,
} from "../../helpers/constants";
import { useAuthContext } from "../../context";
import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { TbBriefcase } from "react-icons/tb";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";
import { Text } from "../text";
import { CgProfile } from "react-icons/cg";
import { FiPlusCircle } from "react-icons/fi";
import { PiNotebookLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { BiCategory } from "react-icons/bi";

const navigationRoles = {
  employee: [
    {
      Icon: GoStack,
      navigation: Navigations.DASHBOARD_OVERVIEW,
    },
    {
      Icon: TbBriefcase,
      navigation: Navigations.DASHBOARD_APPLIED_JOBS,
    },
    {
      Icon: GoBookmark,
      navigation: Navigations.DASHBOARD_FAVORITE_JOBS,
    },
    // {
    //   Icon: IoNotificationsOutline,
    //   navigation: Navigations.DASHBOARD_JOB_ALERT,
    // },
    {
      Icon: IoSettingsOutline,
      navigation: Navigations.DASHBOARD_SETTINGS,
    },
  ],
  employer: [
    {
      Icon: GoStack,
      navigation: Navigations.DASHBOARD_OVERVIEW,
    },
    {
      Icon: CgProfile,
      navigation: Navigations.DASHBOARD_EMPLOYERS_PROFILE,
    },
    {
      Icon: FiPlusCircle,
      navigation: Navigations.DASHBOARD_POST_A_JOB,
    },
    {
      Icon: TbBriefcase,
      navigation: Navigations.DASHBOARD_MY_JOBS,
    },
    {
      Icon: GoBookmark,
      navigation: Navigations.DASHBOARD_SAVED_CANDIDATE,
    },
    // {
    //   Icon: PiNotebookLight,
    //   navigation: Navigations.DASHBOARD_PLANS_AND_BILLING,
    // },
    {
      Icon: IoSettingsOutline,
      navigation: Navigations.DASHBOARD_SETTINGS,
    },
  ],
  admin: [
    {
      Icon: GoStack,
      navigation: Navigations.DASHBOARD_OVERVIEW,
    },
    {
      Icon: BiCategory,
      navigation: Navigations.DASHBOARD_CATEGORIES
    },
  ],
};

export default function NavigationDashboard() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [navigations, setNavigations] = useState<
    Array<{
      Icon: IconType;
      navigation: { label: string; href: string; pattern: string };
    }>
  >([]);
  useEffect(() => {
    if (!user || typeof user === "string") return;
    setNavigations(navigationRoles[user.userType]);
  }, [user]);
  return (
    <div className="h-[600px]">
      {user && typeof user !== "string" && (
        <Text className="ml-4 mt-5 mb-5 text-[12px] font-semibold">
          {(user.userType === UserTypes.EMPLOYEE ? "CANDIDATE" : "EMPLOYERS") +
            " DASHBOARD"}
        </Text>
      )}
      <ul>
        {navigations.map((navigation) => (
          <li
            className={`flex items-center space-x-2 p-3 hover:text-[--primary-500] hover:bg-[--primary-50] hover:border-l-4 hover:border-[--primary-500] hover:pl-3 cursor-pointer ${
              matchPathPattern(
                window.location.pathname,
                navigation.navigation.href
              )
                ? "bg-[--primary-50] text-[--primary-500] border-l-4 border-[--primary-500]"
                : "text-[--gray-500] pl-4"
            }`}
            onClick={() => {
              navigate(navigation.navigation.href);
            }}
          >
            <navigation.Icon size={"20px"} />
            <span>{navigation.navigation.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
