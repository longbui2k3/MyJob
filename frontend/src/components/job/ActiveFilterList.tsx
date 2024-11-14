import { useEffect, useState } from "react";
import ActiveFilter from "./ActiveFilter";
import { useFindCategories } from "../../hooks";
import { useNavigate, useSearchParams } from "react-router-dom";
import provinces from "../../data/provinces.json";
export default function ActiveFilterList() {
  const navigate = useNavigate();
  const [searchParams, __] = useSearchParams();
  const [filters, setFilters] = useState<
    Array<{ label: string; value: string; onDeleteClick: () => void }>
  >([]);
  const { categories } = useFindCategories();
  useEffect(() => {
    const categoryId = searchParams.get("category");
    const provinceCode = searchParams.get("provinceCode");
    const filters = [];
    if (categoryId) {
      const category = categories.find((cate: any) => cate._id === categoryId);
      filters.push({
        label: category?.name,
        value: category?._id,
        onDeleteClick: () => {
          searchParams.delete("category");
          navigate(`?${searchParams.toString()}`);
          navigate(0);
        },
      });
    }

    if (provinceCode) {
      const province = provinces.find(
        (province) => province.code === Number(provinceCode)
      );
      filters.push({
        label: province?.english_name,
        value: province?.code,
        onDeleteClick: () => {
          searchParams.delete("provinceCode");
          navigate(`?${searchParams.toString()}`);
          navigate(0);
        },
      });
    }

    setFilters(filters);
  }, [categories, searchParams]);
  return (
    <div className="flex space-x-4">
      {filters.map((filter) => (
        <ActiveFilter
          label={filter.label}
          onDeleteClick={filter.onDeleteClick}
        />
      ))}
    </div>
  );
}
