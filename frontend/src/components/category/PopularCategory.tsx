import { FiArrowRight } from "react-icons/fi";
import { ButtonOutline } from "../buttons";
import { Heading3 } from "../headings";
import Category from "./Category";
import { DEFAULT_PADDING_X } from "../../helpers/constants";
import { useEffect, useState } from "react";
import { FindAllCategoriesAPI } from "../../apis";

export default function PopularCategory() {
  const [categories, setCategories] = useState<Array<any>>([]);

  async function findAllCategories() {
    const limit = 8;
    const data = await FindAllCategoriesAPI(limit);
    if (data.isSuccess) {
      setCategories(data.metadata.categories);
    }
  }

  useEffect(() => {
    findAllCategories();
  }, []);

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
          <Category iconUrl={category.iconUrl} categoryName={category.name} />
        ))}
      </div>
    </div>
  );
}
