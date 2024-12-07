import { FiArrowRight } from "react-icons/fi";
import { ButtonOutline, ButtonSolid_2 } from "../buttons";
import { Heading3 } from "../headings";
import Category from "./Category";
import {
  DEFAULT_PADDING_X,
  FIND_JOBS_KEY,
  getRoute,
} from "../../helpers/constants";
import { useEffect, useState } from "react";
import { FindAllCategoriesAPI } from "../../apis";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

export default function PopularCategory() {
  const [categories, setCategories] = useState<Array<any>>([]);
  const [curPage, setCurPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  async function findAllCategories() {
    const limit = 8;
    const data = await FindAllCategoriesAPI({ limit, page: curPage });
    if (data.isSuccess) {
      setCategories(data.metadata.categories);
      setPageSize(data.metadata.meta.size);
    }
  }

  useEffect(() => {
    findAllCategories();
  }, [curPage]);

  return (
    <div
      className={`w-full`}
      style={{
        padding: `80px ${DEFAULT_PADDING_X}`,
      }}
    >
      <div className="flex justify-between">
        <Heading3 name="Popular category" />
        <div className="flex space-x-2">
          <ButtonSolid_2
            children={<GoArrowLeft size={"20px"} />}
            onClick={(e) => {
              e.preventDefault();
              if (curPage > 1) setCurPage(curPage - 1);
            }}
          />
          <ButtonSolid_2
            children={<GoArrowRight size={"20px"} />}
            onClick={(e) => {
              e.preventDefault();
              if (curPage < pageSize) setCurPage(curPage + 1);
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-4 mt-8">
        {categories.map((category) => (
          <Category
            iconUrl={category.iconUrl}
            categoryName={category.name}
            num_open_positions={category.openPositionNum}
            href={
              getRoute(FIND_JOBS_KEY, {
                query: {
                  category: category._id,
                },
              }).path
            }
          />
        ))}
      </div>
    </div>
  );
}
