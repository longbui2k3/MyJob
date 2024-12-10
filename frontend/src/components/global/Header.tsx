import { IoNotificationsOutline } from "react-icons/io5";
import { useAuthContext } from "../../context";
import { User } from "../../interfaces";
import { ButtonOutline, ButtonSolid } from "../buttons";
import { SearchInput_1 } from "../inputs";
import Logo from "./Logo";
import Navigation from "./Navigation";
import { Avatar } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import Dropdown from "./Dropdown";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { LogoutAPI } from "../../apis";
import { CookieSetOptions } from "universal-cookie";
import { useCookies } from "react-cookie";
import {
  DASHBOARD_SETTINGS_KEY,
  DEFAULT_PADDING_X,
  getRoute,
  UserTypes,
} from "../../helpers/constants";
import { toastError, toastSuccess } from "../toast";
import { FaUserCircle } from "react-icons/fa";

interface SubNavigationProps {
  user: string | User | null;
}

const logOut = async (
  setCookie: (
    name: "user" | "jwt",
    value: any,
    options?: CookieSetOptions
  ) => void,
  navigate: NavigateFunction
) => {
  const data = await LogoutAPI();
  if (data.isSuccess) {
    toastSuccess(data.message);
    setCookie("jwt", "", {
      path: "/",
    });
    setCookie("user", "", {
      path: "/",
    });
    navigate(0);
  } else {
    toastError(data.message);
  }
};

const subNavigationRoles = {
  normal: () =>
    function () {
      return (
        <div className="flex space-x-2 items-center">
          <a href="/signin">
            <ButtonOutline children={"Sign In"} />
          </a>
          <a href="/post">
            <ButtonSolid children={"Post A Job"} />
          </a>
        </div>
      );
    },
  employee: () =>
    function ({ user }: SubNavigationProps) {
      const navigate = useNavigate();
      const { setUserId } = useAuthContext();
      const [cookies, setCookie] = useCookies(["jwt", "user"]);

      if (!user) return <></>;
      if (typeof user === "string") return <></>;
      const items = [
        // {
        //   item: "My profile",
        //   onClick: (e) => {
        //     navigate(getRoute(DASHBOARD_SETTINGS_KEY).path);
        //   },
        // },
        {
          item: "Settings",
          onClick: (e) => {
            navigate(getRoute(DASHBOARD_SETTINGS_KEY).path);
          },
        },
        {
          item: "Log out",
          onClick: async (e) => {
            await logOut(setCookie, navigate);
          },
        },
      ];
      return (
        <div className="flex space-x-4 items-center">
          <IoNotificationsOutline size="22px" />
          <Dropdown
            Button={
              user?.avatar ? (
                <Avatar src={user.avatar} width={"40px"} height={"40px"} />
              ) : (
                <FaUserCircle size="40px" color="var(--gray-200)" />
              )
            }
            items={items}
          />
        </div>
      );
    },
  employer: () =>
    function ({ user }: SubNavigationProps) {
      const navigate = useNavigate();
      const { setUserId } = useAuthContext();
      const [cookies, setCookie] = useCookies(["jwt", "user"]);
      if (!user) return <></>;
      if (typeof user === "string") return <></>;
      const items = [
        // {
        //   item: "My profile",
        //   onClick: (e) => {
        //     navigate(getRoute(DASHBOARD_SETTINGS_KEY).path);
        //   },
        // },
        {
          item: "Settings",
          onClick: (e) => {
            navigate(getRoute(DASHBOARD_SETTINGS_KEY).path);
          },
        },
        {
          item: "Log out",
          onClick: async (e) => {
            await logOut(setCookie, navigate);
          },
        },
      ];
      return (
        <div className="flex space-x-4 items-center">
          <IoNotificationsOutline size="22px" />
          <a href="/post">
            <ButtonOutline
              children={"Post A Job"}
              onClick={(e) => {
                e.preventDefault();
                navigate("dashboard/post-a-job");
              }}
            />
          </a>
          <Dropdown
            Button={
              user?.avatar ? (
                <Avatar src={user.avatar} width={"40px"} height={"40px"} />
              ) : (
                <FaUserCircle size="40px" color="var(--gray-200)" />
              )
            }
            items={items}
          />
        </div>
      );
    },
  admin: () =>
    function ({ user }: SubNavigationProps) {
      const navigate = useNavigate();
      const { setUserId } = useAuthContext();
      const [cookies, setCookie] = useCookies(["jwt", "user"]);
      if (!user) return <></>;
      if (typeof user === "string") return <></>;
      const items = [
        // {
        //   item: "My profile",
        //   onClick: (e) => {
        //     navigate("/");
        //   },
        // },
        // {
        //   item: "Settings",
        //   onClick: (e) => {
        //     navigate("/");
        //   },
        // },
        {
          item: "Log out",
          onClick: async (e) => {
            await logOut(setCookie, navigate);
          },
        },
      ];
      return (
        <div className="flex space-x-4 items-center">
          <IoNotificationsOutline size="22px" />
          <Dropdown
            Button={
              user?.avatar ? (
                <Avatar src={user.avatar} width={"40px"} height={"40px"} />
              ) : (
                <FaUserCircle size="40px" color="var(--gray-200)" />
              )
            }
            items={items}
          />
        </div>
      );
    },
};

export default function Header() {
  const { user } = useAuthContext();
  const headerRef = useRef<HTMLDivElement>(null);
  const [SubNavigation, setSubNavigation] =
    useState<({ user }: SubNavigationProps) => JSX.Element>();
  useEffect(() => {
    if (typeof user === "string") return;
    if (user) {
      setSubNavigation(subNavigationRoles[user.userType]);
    } else {
      setSubNavigation(subNavigationRoles["normal"]);
    }
  }, [user]);

  useEffect(() => {
    const cur = headerRef.current;
    if (!headerRef || !cur) return;
    let prevScrollpos = window.scrollY;
    window.onscroll = function () {
      const currentScrollPos = window.scrollY;
      if (currentScrollPos < 200) return;
      if (prevScrollpos > currentScrollPos) {
        cur.style.display = "";
      } else {
        cur.style.display = "none";
      }
      prevScrollpos = currentScrollPos;
    };
  }, [headerRef]);
  return (
    <div className="fixed top-0 w-full z-[1000]">
      {typeof user !== "string" &&
      (user?.userType === UserTypes.EMPLOYER ||
        user?.userType === UserTypes.ADMIN) ? (
        ""
      ) : (
        <Navigation />
      )}
      <div
        className={`flex flex-col justify-center w-full h-[70px] bg-white`}
        ref={headerRef}
        style={{
          padding: ` 0px ${
            typeof user !== "string" &&
            (user?.userType === UserTypes.EMPLOYER ||
              user?.userType === UserTypes.ADMIN)
              ? "50px"
              : DEFAULT_PADDING_X
          }`,
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex space-x-8 items-center">
            <a href="/">
              {typeof user !== "string" &&
              user?.userType === UserTypes.ADMIN ? (
                <Logo text="MyJob for Admin" />
              ) : (
                <Logo />
              )}
            </a>
            {typeof user !== "string" &&
            (user?.userType === UserTypes.EMPLOYER ||
              user?.userType === UserTypes.ADMIN) ? (
              ""
            ) : (
              <SearchInput_1 />
            )}
          </div>
          {SubNavigation && <SubNavigation user={user} />}
        </div>
      </div>
    </div>
  );
}
