import { IconButton } from "@chakra-ui/react";
import { Heading5 } from "../headings";
import { GoPlus } from "react-icons/go";
import { useDispatch } from "react-redux";
import { openForm } from "../../features";
import { CustomTooltip } from "../global";
import { useEffect, useState } from "react";
import { FindAllCategoriesAPI } from "../../apis";
import Category from "../category/Category";

export default function DashboardCategory() {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState<Array<any>>([]);

  async function findAllCategories() {
    const data = await FindAllCategoriesAPI();
    if (data.isSuccess) {
      setCategories(data.metadata.categories);
    }
  }

  useEffect(() => {
    findAllCategories();
  }, []);
  return (
    <>
      <div className="flex justify-between">
        <Heading5 name="Categories" />
        <CustomTooltip label="Create category">
          <IconButton
            aria-label="Create category"
            icon={<GoPlus size={30} />}
            borderRadius={"100%"}
            color={"var(--gray-200)"}
            background={"none"}
            border={"1px"}
            _hover={{
              color: "var(--primary-500)",
            }}
            onClick={() => {
              dispatch(openForm());
            }}
          />
        </CustomTooltip>
      </div>
      <div className="mt-6 space-y-3">
        {categories.map((category) => (
          <Category
            iconUrl={category.iconUrl}
            categoryName={category.name}
            className="border-[1px] rounded-lg p-[12px]"
            hasTools={true}
          />
        ))}
      </div>
    </>
  );
}
