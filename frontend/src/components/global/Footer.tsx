import { FiArrowRight } from "react-icons/fi";
import { Heading5 } from "../headings";
import { Text } from "../text";
import Logo from "./Logo";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { DEFAULT_PADDING_X } from "../../helpers/constants";

export default function Footer() {
  const navigates = [
    {
      heading: "Quick Link",
      navigates: [
        {
          text: "About",
          href: "#",
        },
        {
          text: "Contact",
          href: "#",
        },
        {
          text: "Pricing",
          href: "#",
        },
        {
          text: "Blog",
          href: "#",
        },
      ],
    },
    {
      heading: "Candidate",
      navigates: [
        {
          text: "Browse Jobs",
          href: "#",
        },
        {
          text: "Browse Employers",
          href: "#",
        },
        {
          text: "Candidate Dashboard",
          href: "#",
        },
        {
          text: "Saved Jobs",
          href: "#",
        },
      ],
    },
    {
      heading: "Employers",
      navigates: [
        {
          text: "Post a Job",
          href: "#",
        },
        {
          text: "Browse Candidates",
          href: "#",
        },
        {
          text: "Employers Dashboard",
          href: "#",
        },
        {
          text: "Applications",
          href: "#",
        },
      ],
    },
    {
      heading: "Support",
      navigates: [
        {
          text: "Faqs",
          href: "#",
        },
        {
          text: "Privacy Policy",
          href: "#",
        },
        {
          text: "Terms & Conditions",
          href: "#",
        },
      ],
    },
  ];
  return (
    <>
      <div
        className={`flex space-x-4 w-full bg-[--gray-900]`}
        style={{
          padding: `60px ${DEFAULT_PADDING_X}`,
        }}
      >
        <div className="w-[30%]">
          <Logo textColor="white" />
          <div className="flex space-x-2">
            <Text>Call now:</Text>
            <Text className="text-white">{"(319)-555-0115"}</Text>
          </div>
          <Text className="w-[250px]">
            6391 Elgin St. Celina, Delaware 10299, New York, United States of
            America
          </Text>
        </div>
        <div className="w-[70%] flex justify-between">
          {navigates.map((navigate) => (
            <div>
              <Heading5
                name={navigate.heading}
                className="text-white font-normal"
              />
              <div className="mt-6">
                {navigate.navigates.map((navigate) => (
                  <a href={navigate.href}>
                    <Text
                      className="hover:text-white flex space-x-2"
                      onMouseOver={(e) => {
                        e.target.firstChild.classList.toggle("hidden");
                      }}
                      onMouseOut={(e) => {
                        e.target.firstChild.classList.toggle("hidden");
                      }}
                    >
                      <FiArrowRight
                        size={"15px"}
                        className="hidden my-auto mr-[6px]"
                      />
                      {navigate.text}
                    </Text>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className={`flex justify-between w-full bg-[--gray-900] border-t-[1px] border-[--gray-500]`}
        style={{
          padding: `20px ${DEFAULT_PADDING_X}`,
        }}
      >
        <Text
          children={"@ 2024 MyJob - Job Portal. All rights Rserved"}
          className="mt-[0px]"
        />
        <div className="flex space-x-4">
          <a href="#">
            <FaFacebookF fill="var(--gray-200)" size={20} />
          </a>
          <a href="#">
            <FaYoutube fill="var(--gray-200)" size={20} />
          </a>
          <a href="#">
            <FaInstagram fill="var(--gray-200)" size={20} />
          </a>
          <a href="#">
            <FaTwitter fill="var(--gray-200)" size={20} />
          </a>
        </div>
      </div>
    </>
  );
}
