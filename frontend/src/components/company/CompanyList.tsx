import { DEFAULT_PADDING_X, ViewTypes } from "../../helpers/constants";
import { NotFoundList, Pagination, usePagination } from "../global";
import { PageLimitSelect, usePageLimitSelect } from "../select/PageLimitSelect";
import { useViewTypeSelect, ViewTypeSelect } from "../select/ViewTypeSelect";
import CompanyGrid from "./CompanyGrid";
import CompanyRowsFill from "./CompanyRowsFill";
import { useEffect, useState } from "react";
import { FindCompaniesAPI } from "../../apis";
import { useSearchParams } from "react-router-dom";

export default function CompanyList() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, __] = useSearchParams();
  const { viewType, setViewType } = useViewTypeSelect();
  const { curPage, setCurPage } = usePagination();
  const { limit, handleLimitChange } = usePageLimitSelect();
  const [size, setSize] = useState(1);
  const [companies, setCompanies] = useState<Array<any>>([]);
  async function findCompanies(page: number, companies: Array<any>) {
    if (companies[page - 1]) return;
    const provinceCode = searchParams.get("provinceCode");
    async function findCompaniesFromAPI(page: number) {
      const data = await FindCompaniesAPI({
        limit,
        page,
        search: searchParams.get("search") || undefined,
        organizationType:
          (searchParams.get("org_type") &&
            Number(searchParams.get("org_type")) + 1) ||
          undefined,
        provinceCode: provinceCode ? Number(provinceCode) : undefined,
      });
      if (data.isSuccess) {
        // setCompanies(data.metadata.companies);
        // setSize(data.metadata.meta.size);
        return data.metadata;
      }
      return {
        companies: [],
        meta: {
          size: 0,
        },
      };
    }
    setIsLoading(true);
    if (page === 1) {
      const data = await findCompaniesFromAPI(page);
      setCompanies([...companies, data.companies]);
      setSize(data.meta.size);
    } else {
      const jobList = [];
      for (let i = 2; i <= size; i++) {
        const data = await findCompaniesFromAPI(i);
        jobList.push(data.companies);
        if (i === size) {
          setSize(data.meta.size);
        }
      }
      setCompanies([...companies, ...jobList]);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    setCurPage(1);
    findCompanies(1, []);
  }, [limit, searchParams]);

  useEffect(() => {
    findCompanies(curPage, [...companies]);
  }, [curPage, searchParams]);
  const Companies = {
    GRID: () => (
      <div className="grid grid-cols-3 gap-4">
        {(companies[curPage - 1] || new Array(limit).fill({})).map(
          (company) => (
            <CompanyGrid
              _id={company?._id}
              logo={company?.logo}
              companyName={company?.companyName}
              mapLocation={company?.mapLocation}
              openJobNum={company?.openPositionNum}
              isLoading={isLoading}
            />
          )
        )}
      </div>
    ),
    ROWS_FILL: () => (
      <div className="flex flex-col space-y-4">
        {(companies[curPage - 1] || new Array(limit).fill({})).map(
          (company) => (
            <CompanyRowsFill
              _id={company?._id}
              logo={company?.logo}
              companyName={company?.companyName}
              mapLocation={company?.mapLocation}
              openJobNum={company?.openPositionNum}
              isLoading={isLoading}
            />
          )
        )}
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
        {!isLoading && companies[curPage - 1]?.length === 0 ? (
          <NotFoundList info="No companies matching your requirements have been found yet." />
        ) : viewType === ViewTypes.GRID ? (
          <Companies.GRID />
        ) : (
          <Companies.ROWS_FILL />
        )}
      </div>
      <Pagination curPage={curPage} setCurPage={setCurPage} size={size} />
    </div>
  );
}
