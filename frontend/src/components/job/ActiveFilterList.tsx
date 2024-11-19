import { useEffect, useState } from "react";
import ActiveFilter from "./ActiveFilter";
import { useFindCategories } from "../../hooks";
import { useNavigate, useSearchParams } from "react-router-dom";
import provinces from "../../data/provinces.json";
import {
  Educations,
  Experiences,
  JobLevels,
  JobTypes,
  Salaries,
} from "../../helpers/constants";
export default function ActiveFilterList() {
  const navigate = useNavigate();
  const [searchParams, __] = useSearchParams();
  const [filters, setFilters] = useState<
    Array<{ label: string | undefined; onDeleteClick: () => void }>
  >([]);
  const { categories } = useFindCategories();
  useEffect(() => {
    const categoryId = searchParams.get("category");
    const provinceCode = searchParams.get("provinceCode");
    const experiences = searchParams.get("experiences");
    const educations = searchParams.get("educations");
    const jobTypes = searchParams.get("jobTypes");
    const jobLevels = searchParams.get("jobLevels");
    const salaryMin = searchParams.get("salary_min");
    const salaryMax = searchParams.get("salary_max");
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
        onDeleteClick: () => {
          searchParams.delete("provinceCode");
          navigate(`?${searchParams.toString()}`);
          navigate(0);
        },
      });
    }

    if (salaryMin && salaryMax) {
      const salary = Salaries.find(
        (salary) =>
          salary.from === Number(salaryMin) && salary.to === Number(salaryMax)
      );

      filters.push({
        label: salary?.label,
        onDeleteClick: () => {
          searchParams.delete("salary_min");
          searchParams.delete("salary_max");
          navigate(`?${searchParams.toString()}`);
          navigate(0);
        },
      });
    }

    function addFilters(
      queryName: string,
      queryStr: string | null,
      data: Array<string>
    ) {
      if (queryStr) {
        const values = queryStr.split("_");
        values.forEach((value) => {
          const label = data[Number(value)];
          filters.push({
            label,
            onDeleteClick: () => {
              const newValues = values.filter((v) => v !== value).join("_");
              if (newValues.length) searchParams.set(queryName, newValues);
              else searchParams.delete(queryName);
              navigate(`?${searchParams.toString()}`);
              navigate(0);
            },
          });
        });
      }
    }

    addFilters("experiences", experiences, Experiences);
    addFilters("educations", educations, Educations);
    addFilters("jobLevels", jobLevels, JobLevels);
    addFilters("jobTypes", jobTypes, JobTypes);

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
