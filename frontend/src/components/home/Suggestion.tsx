import { useEffect, useState } from "react";
import { Text } from "../text";
import { FindAllCategoriesAPI } from "../../apis";

export default function Suggestion() {
  const [categories, setCategories] = useState<Array<any>>([""]);
  async function findAllCategories() {
    const limit = 4;
    const data = await FindAllCategoriesAPI({ limit });
    if (data.isSuccess) {
      setCategories(data.metadata.categories);
    }
  }

  useEffect(() => {
    findAllCategories();
  }, []);

  return (
    <Text className="font-[600] mt-3">
      <span className="text-[--gray-200]">Suggestion:</span>{" "}
      {categories
        .map((category) => (
          <a
            href={`/jobs?category=${category._id}`}
            className={"text-[--gray-700] hover:text-[--primary-500]"}
          >
            {category.name}
          </a>
        ))
        .reduce((acc, x) =>
          !acc ? (
            x
          ) : (
            <>
              {acc}, {x}
            </>
          )
        )}
    </Text>
  );
}
