import { Tag } from "@chakra-ui/react";
import { Heading6 } from "../headings";
import { LocationInfo, OpenJobInfo } from "./CompanyInfos";
import { ButtonSolid_2 } from "../buttons";
interface CompanyGridProps {
  _id?: string;
  logo?: string;
  companyName?: string;
  mapLocation?: string;
  openJobNum?: number;
}
export default function CompanyGrid({
  _id = "",
  logo = "",
  companyName = "",
  mapLocation = "",
  openJobNum = 0,
}: CompanyGridProps) {
  return (
    <div className="flex flex-col space-y-4 p-5 border-[1px] border-[--gray-100]">
      <div className="flex space-x-3">
        <img
          src={logo}
          width={"52px"}
          height={"52px"}
          className="rounded-md aspect-square border-[1px] border-gray-100"
        />
        <div className="flex flex-col justify-between ml-4">
          <div className="flex space-x-3">
            <Heading6 name={companyName} />
            <Tag
              bg="var(--danger-50)"
              textColor={"var(--danger-500)"}
              fontSize={"13px"}
              paddingX={"8px"}
              paddingY="4px"
              marginY="auto"
            >
              Featured
            </Tag>
          </div>
          <div className="flex space-x-2">
            <LocationInfo info={mapLocation.split(",").slice(-1)[0]} />
            <OpenJobInfo info={`${openJobNum} - Open Job`} />
          </div>
        </div>
      </div>
      <ButtonSolid_2 children={"Open Position"} onClick={() => {}} />
    </div>
  );
}
