import { IoNotificationsOutline } from "react-icons/io5";
import { useAuthContext } from "../../context";
import { User } from "../../interfaces";
import { ButtonOutline, ButtonSolid } from "../buttons";
import { SearchInput_1 } from "../inputs";
import Logo from "./Logo";
import Navigation from "./Navigation";
import { Avatar } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface SubNavigationProps {
  user: string | User | null;
}

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
      if (!user) return <></>;
      if (typeof user === "string") return <></>;
      return (
        <div className="flex space-x-4 items-center">
          <IoNotificationsOutline size="22px" />
          <Avatar
            name={user.name}
            src={user.avatar}
            width={"40px"}
            height={"40px"}
          />
        </div>
      );
    },
  employer: () =>
    function ({ user }: SubNavigationProps) {
      if (!user) return <></>;
      if (typeof user === "string") return <></>;
      return (
        <div className="flex space-x-4 items-center">
          <IoNotificationsOutline size="22px" />
          <a href="/post">
            <ButtonOutline children={"Post A Job"} />
          </a>
          <Avatar
            name={user.name}
            src={user.avatar}
            width={"40px"}
            height={"40px"}
          />
        </div>
      );
    },
};

export default function Header() {
  const { user } = useAuthContext();

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
  return (
    <>
      <Navigation />
      <div className="flex flex-col justify-center w-full h-[80px] px-[240px]">
        <div className="flex justify-between">
          <div className="flex space-x-8 items-center">
            <a href="/">
              <Logo />
            </a>
            <SearchInput_1 />
          </div>
          {SubNavigation && SubNavigation({ user })}
        </div>
      </div>
    </>
  );
}
