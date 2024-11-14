import { useEffect, useState } from "react";
import { FindAllCategoriesAPI } from "../apis";

export default function useFindCategories() {
  const [categories, setCategories] = useState<Array<any>>([]);
  async function findCategories() {
    const data = await FindAllCategoriesAPI(20);
    if (data.isSuccess) {
      setCategories(data.metadata.categories);
    }
  }
  useEffect(() => {
    findCategories();
  }, []);

  return { categories };
}
