import { PiFaders } from "react-icons/pi";
import { DEFAULT_PADDING_X, ViewTypes } from "../../helpers/constants";
import { ButtonSolid } from "../buttons";
import { Pagination, usePagination } from "../global";
import { LocationSelect } from "../select/LocationSelect";
import { PageLimitSelect, usePageLimitSelect } from "../select/PageLimitSelect";
import { useViewTypeSelect, ViewTypeSelect } from "../select/ViewTypeSelect";
import CompanyGrid from "./CompanyGrid";
import CompanyRowsFill from "./CompanyRowsFill";
import { useEffect, useState } from "react";
import { FindCompaniesAPI } from "../../apis";
import { useSearchParams } from "react-router-dom";

export default function CompanyList() {
  const [searchParams, __] = useSearchParams();
  const { viewType, setViewType } = useViewTypeSelect();
  const { curPage, setCurPage } = usePagination();
  const { limit, handleLimitChange } = usePageLimitSelect();
  const [size, setSize] = useState(1);
  const [companies, setCompanies] = useState<Array<any>>([]);
  async function findCompanies() {
    const provinceCode = searchParams.get("provinceCode");
    const data = await FindCompaniesAPI({
      limit,
      page: curPage,
      search: searchParams.get("search") || undefined,
      organizationType:
        (searchParams.get("org_type") &&
          Number(searchParams.get("org_type"))) ||
        undefined,
      provinceCode: provinceCode ? Number(provinceCode) : undefined,
    });
    if (data.isSuccess) {
      setCompanies(data.metadata.companies);
      setSize(data.metadata.meta.size);
    }
  }
  useEffect(() => {
    findCompanies();
  }, [limit, curPage]);
  const Companies = {
    GRID: () => (
      <div className="grid grid-cols-3 gap-4">
        {companies.map((company) => (
          <CompanyGrid
            _id={company._id}
            logo={company.logo}
            companyName={company.companyName}
            mapLocation={company.mapLocation}
            openJobNum={0}
          />
        ))}
      </div>
    ),
    ROWS_FILL: () => (
      <div className="flex flex-col space-y-4">
        {companies.map((company) => (
          <CompanyRowsFill
            _id={company._id}
            logo={company.logo}
            companyName={company.companyName}
            mapLocation={company.mapLocation}
            openJobNum={0}
          />
        ))}
      </div>
    ),
  };

  return (
    <div style={{ padding: `20px ${DEFAULT_PADDING_X}` }}>
      <div className="flex items-center flex-row-reverse">
        <div className="flex space-x-4">
          <PageLimitSelect
            height="40px"
            width="200px"
            onChange={handleLimitChange}
          />
          <ViewTypeSelect viewType={viewType} setViewType={setViewType} />
        </div>
      </div>
      <div className="mt-8 mb-16">
        {viewType === ViewTypes.GRID ? (
          <Companies.GRID />
        ) : (
          <Companies.ROWS_FILL />
        )}
      </div>
      <Pagination curPage={curPage} setCurPage={setCurPage} size={size} />
    </div>
  );
}
