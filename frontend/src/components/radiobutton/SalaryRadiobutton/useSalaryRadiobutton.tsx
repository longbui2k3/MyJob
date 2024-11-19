import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function useSalaryRadiobutton() {
  const [searchParams, __] = useSearchParams();
  const [salary, setSalary] = useState<string>(
    `${searchParams.get("salary_min") || ""}${
      (searchParams.get("salary_max") &&
        "-" + searchParams.get("salary_max")) ||
      ""
    }`
  );
  return { salary, setSalary };
}
