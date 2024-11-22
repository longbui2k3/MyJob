import { useState } from "react";

export default function useProvinceCodeSelect() {
  const [provinceCode, setProvinceCode] = useState<number>(0);
  const handleProvinceCodeChange = (e) => {
    setProvinceCode(e.target.value);
  };
  return { provinceCode, setProvinceCode, handleProvinceCodeChange };
}
