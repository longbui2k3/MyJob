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
import { DEFAULT_PADDING_X } from "../../helpers/constants";
import { header } from "framer-motion/m";

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
    setCookie("jwt", "", {
      path: "/",
    });
    setCookie("user", "", {
      path: "/",
    });
    navigate(0);
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
        {
          item: "My profile",
          onClick: (e) => {
            navigate("/#");
          },
        },
        {
          item: "Settings",
          onClick: (e) => {
            navigate("/#");
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
              <Avatar
                name={user.name}
                src={user.avatar}
                width={"40px"}
                height={"40px"}
              />
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
        {
          item: "My profile",
          onClick: (e) => {
            navigate("/");
          },
        },
        {
          item: "Settings",
          onClick: (e) => {
            navigate("/");
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
            <ButtonOutline children={"Post A Job"} />
          </a>
          <Dropdown
            Button={
              <Avatar
                name={user.name}
                src={user.avatar}
                width={"40px"}
                height={"40px"}
              />
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
        {
          item: "My profile",
          onClick: (e) => {
            navigate("/");
          },
        },
        {
          item: "Settings",
          onClick: (e) => {
            navigate("/");
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
              <Avatar
                name={user.name}
                src={user.avatar}
                width={"40px"}
                height={"40px"}
              />
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
      <Navigation />
      <div
        className={`flex flex-col justify-center w-full h-[80px] bg-white`}
        ref={headerRef}
        style={{
          padding: `0px ${DEFAULT_PADDING_X}`,
        }}
      >
        <div className="flex justify-between">
          <div className="flex space-x-8 items-center">
            <a href="/">
              <Logo />
            </a>
            <SearchInput_1 />
          </div>
          {SubNavigation && <SubNavigation user={user} />}
        </div>
      </div>
    </div>
  );
}
