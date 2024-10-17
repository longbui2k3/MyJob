import { CompletedCompany, Navigation, Tabs } from "../../components/company";

export default function PageCompanyInfo() {
  return (
    <div className="relative flex flex-col h-screen items-center">
      <Navigation />
      <div className=" w-[984px] pt-[15px] pb-[30px] [font-family:'Inter-Regular',Helvetica]">
        <Tabs />
        {/* <CompletedCompany /> */}
      </div>
    </div>
  );
}
