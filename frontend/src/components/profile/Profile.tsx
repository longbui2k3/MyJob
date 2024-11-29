import { useState } from "react";
import TabItem from "./TabItem";
import { GlobeSimpleIcon, UserCircleIcon, UserIcon } from "../icons";
import GearSixIcon from "../icons/GearSixIcon";
import FormPersonal from "./FormPersonal";
import FormProfile from "./FormProfile";
import FormSocialMediaInfo from "./FormSocialMediaInfo";
import FormAccountSettings from "./FormAccountSettings";
import FormContact from "./FormContact";

export default function Profile() {
  const [activeIndex, setActiveIndex] = useState(1);
  const handleClick = (index: number) => setActiveIndex(index);
  const TabList = [
    {
      id: 1,
      tabitem: (
        <TabItem
          icon={<UserIcon />}
          title="Personal"
          activeColor={`${
            activeIndex === 1 ? "var(--primary-500)" : "var(--gray-200)"
          }`}
        />
      ),
      content: <FormPersonal />,
    },
    {
      id: 2,
      tabitem: (
        <TabItem
          icon={<UserCircleIcon />}
          title="Profile"
          activeColor={`${
            activeIndex === 2 ? "var(--primary-500)" : "var(--gray-200)"
          }`}
        />
      ),
      content: <FormProfile />,
    },
    {
      id: 3,
      tabitem: (
        <TabItem
          icon={<GlobeSimpleIcon />}
          title="Social Media Profile"
          activeColor={`${
            activeIndex === 3 ? "var(--primary-500)" : "var(--gray-200)"
          }`}
        />
      ),
      content: <FormSocialMediaInfo />,
    },
    {
      id: 4,
      tabitem: (
        <TabItem
          icon={<GearSixIcon />}
          title={"Account Setting"}
          activeColor={`${
            activeIndex === 4 ? "var(--primary-500)" : "var(--gray-200)"
          }`}
        />
      ),
      content: <FormContact />,
    },
  ];

  return (
    <div className="flex flex-col space-y-5">
      <div className="flex border-b-2 space-x-2 mt-3">
        {TabList.map((item) => (
          <button
            key={item.id}
            className={`${
              activeIndex === item.id ? " border-b-2 border-b-primary-500" : ""
            }`}
            onClick={() => handleClick(item.id)}
          >
            {item.tabitem}
          </button>
        ))}
      </div>
      {TabList.map((item) => (
        <div
          key={item.id}
          className={`${activeIndex === item.id ? "block" : "hidden"}`}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
