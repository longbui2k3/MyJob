import { Navigation, Tabs } from "../../components/company";

export default function PageCreateCompany() {
  return (
    <div className="relative flex flex-col h-screen items-center">
      <Navigation />
      <div className=" w-[984px] pt-[15px] pb-[30px] [font-family:'Inter-Regular',Helvetica]">
        <Tabs />
      </div>
    </div>
  );
}
