import { CompanyList } from "../../components/company";
import { BreadcrumbHeader } from "../../components/global";
import { SearchInput_4 } from "../../components/inputs/SearchInput_4";
import { DEFAULT_PADDING_X, FIND_EMPLOYERS_KEY, getBreadcrumb } from "../../helpers/constants";

export default function PageFindEmployers() {
  return (
    <>
      <BreadcrumbHeader breadcrumbRoutes={getBreadcrumb(FIND_EMPLOYERS_KEY)} />
      <div
        className="bg-[--gray-100]"
        style={{
          padding: `0px ${DEFAULT_PADDING_X} 30px ${DEFAULT_PADDING_X}`,
        }}
      >
        <SearchInput_4 />
      </div>
      <CompanyList />
    </>
  );
}
