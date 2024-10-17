import { useState } from "react";
import TabItem from "./TabItem";
import { AtIcon, GlobeSimpleIcon, UserCircleIcon, UserIcon } from "../icons";
import FormCompanyInfo from "./FormCompanyInfo";
import FormFoundingInfo from "./FormFoundingInfo";
import FormSocialMediaInfo from "./FormSocialMediaInfo";
import FormContact from "./FormContact";
import { GrLinkNext } from "react-icons/gr";
import { Button } from "@chakra-ui/react";
import { CreateCompanyAPI } from "../../apis/companyAPI";
import { useCookies } from "react-cookie";

export default function Tabs() {
  const [activeIndex, setActiveIndex] = useState(1);
  const handelClick = (index: number) => setActiveIndex(index);

  const [companyName, setCompanyName] = useState<string>("");
  const handleCompanyNameChange = (name: string) => {
    setCompanyName(name);
  };

  const [cookies] = useCookies(["jwt", "user"]);
  console.log(cookies.jwt);
  console.log(cookies.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!companyName) return;
    const data = await CreateCompanyAPI(
      { company_name: companyName },
      { authorization: cookies.jwt, x_client_id: cookies.user }
    );
    if (data.status === 201) {
      console.log("tao cong ty thanh cong");
    } else {
      console.log("tao cong ty that bai");
    }
  };

  const TabList = [
    {
      id: 1,
      tabitem: (
        <TabItem
          icon={<UserIcon />}
          title="Company Info"
          activeColor={`${
            activeIndex === 1 ? "var(--primary-600)" : "var(--gray-500)"
          }`}
        />
      ),
      content: (
        <FormCompanyInfo
          companyName={companyName}
          onCompanyNameChange={handleCompanyNameChange}
        />
      ),
    },
    {
      id: 2,
      tabitem: (
        <TabItem
          icon={<UserCircleIcon />}
          title="Founding Info"
          activeColor={`${
            activeIndex === 2 ? "var(--primary-600)" : "var(--gray-500)"
          }`}
        />
      ),
      content: <FormFoundingInfo />,
    },
    {
      id: 3,
      tabitem: (
        <TabItem
          icon={<GlobeSimpleIcon />}
          title="Social Media Profile"
          activeColor={`${
            activeIndex === 3 ? "var(--primary-600)" : "var(--gray-500)"
          }`}
        />
      ),
      content: <FormSocialMediaInfo />,
    },
    {
      id: 4,
      tabitem: (
        <TabItem
          icon={<AtIcon />}
          title="Contact"
          activeColor={`${
            activeIndex === 4 ? "var(--primary-600)" : "var(--gray-500)"
          }`}
        />
      ),
      content: <FormContact />,
    },
  ];

  return (
    <div className="flex flex-col space-y-5">
      <div className="flex justify-center border-b-2 space-x-2">
        {TabList.map((item) => (
          <button
            key={item.id}
            className={`${
              activeIndex === item.id ? " border-b-2 border-b-primary-600" : ""
            }`}
            onClick={() => handelClick(item.id)}
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

      <div className="flex">
        <Button
          className="mr-3"
          display={activeIndex === 1 ? "none" : "block"}
          onClick={() => handelClick(activeIndex - 1)}
        >
          Previous
        </Button>
        <Button
          textColor={"white"}
          bg={"var(--primary-500)"}
          rightIcon={<GrLinkNext />}
          onClick={() => handleSubmit}
          //onClick={() => handelClick(activeIndex + 1)}
        >
          {activeIndex === 4 ? "Finish Editing" : "Save & Next"}
        </Button>
      </div>
    </div>
  );
}