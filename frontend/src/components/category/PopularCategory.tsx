import { FiArrowRight } from "react-icons/fi";
import { ButtonOutline } from "../buttons";
import { Heading3 } from "../headings";
import Category from "./Category";
import { DEFAULT_PADDING_X } from "../../helpers/constants";

export default function PopularCategory() {
  const categories = [
    { category: "Graphics & Design", num_open_positions: 357, href: "#" },
    { category: "Code & Programming", num_open_positions: 312, href: "#" },
    { category: "Digital Marketing", num_open_positions: 297, href: "#" },
    { category: "Video & Animation", num_open_positions: 247, href: "#" },
    { category: "Music & Audio", num_open_positions: 204, href: "#" },
    { category: "Account & Finance", num_open_positions: 167, href: "#" },
    { category: "Health & Care", num_open_positions: 125, href: "#" },
    { category: "Data & Science", num_open_positions: 57, href: "#" },
  ];

  return (
    <div
      className={`w-full`}
      style={{
        padding: `80px ${DEFAULT_PADDING_X}`,
      }}
    >
      <div className="flex justify-between">
        <Heading3 name="Popular category" />
        <ButtonOutline
          children={
            <div className="flex">
              <div>View All</div>
              <FiArrowRight className="text-[14px] my-auto ml-2" />
            </div>
          }
          className="my-auto"
        />
      </div>
      <div className="grid grid-cols-4 mt-8">
        {categories.map((category) => (
          <Category
            img_src="/coding.svg"
            href={category.href}
            category={category.category}
            num_open_positions={category.num_open_positions}
          />
        ))}
      </div>
    </div>
  );
}
