import { ButtonSolid_2 } from "../buttons";
import { Heading3 } from "../headings";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { DEFAULT_PADDING_X } from "../../helpers/constants";
import CompanyGrid from "./CompanyGrid";
import { useEffect, useState } from "react";
import { FindCompaniesAPI } from "../../apis";

export default function TopCompanies() {
  const [companies, setCompanies] = useState<Array<any>>([]);
  const [curPage, setCurPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  async function findCompanies() {
    const data = await FindCompaniesAPI({ limit: 6, page: curPage });
    if (data.isSuccess) {
      setCompanies(data.metadata.companies);
      setPageSize(data.metadata.meta.size);
    }
  }
  useEffect(() => {
    findCompanies();
  }, [curPage]);
  return (
    <div
      className={`w-full`}
      style={{
        padding: `80px ${DEFAULT_PADDING_X}`,
      }}
    >
      <div className="flex justify-between">
        <Heading3 name="Top companies" />
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
      <div className="grid grid-cols-3 gap-4 mt-8">
        {companies.map((company) => (
          <CompanyGrid
            _id={company._id}
            logo={company.logo}
            companyName={company.companyName}
            mapLocation={company.mapLocation}
            openJobNum={company.openPositionNum}
          />
        ))}
      </div>
    </div>
  );
}
