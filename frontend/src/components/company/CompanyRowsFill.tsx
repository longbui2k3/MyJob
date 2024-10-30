import { Heading6 } from "../headings";
import { LocationInfo, OpenJobInfo } from "./CompanyInfos";
import { ButtonSolid_2 } from "../buttons";
import { FiArrowRight } from "react-icons/fi";

interface CompanyRowsFillProps {
  _id?: string;
  logo?: string;
  companyName?: string;
  mapLocation?: string;
  openJobNum?: number;
}

export default function CompanyRowsFill({
  _id = "",
  logo = "",
  companyName = "",
  mapLocation = "",
  openJobNum = 0,
}: CompanyRowsFillProps) {
  return (
    <div className="flex justify-between w-full p-5 border-[1px] border-[--gray-100] rounded-lg">
      <div className="flex space-x-3">
        <img
          src={logo}
          width={"52px"}
          height={"52px"}
          className="rounded-md aspect-square"
        />
        <div className="flex flex-col justify-between ml-4">
          <div className="flex space-x-3">
            <Heading6 name={companyName} />
            {/* <Tag
                bg="var(--primary-50)"
                textColor={"var(--primary-500)"}
                fontSize={"13px"}
                paddingX={"8px"}
                paddingY="4px"
                marginY="auto"
              >
                Full Time
              </Tag> */}
          </div>
          <div className="flex space-x-2">
            <LocationInfo info={mapLocation.split(",").slice(-1)[0]} />
            <OpenJobInfo info={`${openJobNum} - Open Job`} />
          </div>
        </div>
      </div>
      <div className="flex space-x-4 py-auto">
        <ButtonSolid_2
          className="my-auto"
          rightIcon={<FiArrowRight className="text-[18px]" />}
        >
          Open Position
        </ButtonSolid_2>
      </div>
    </div>
  );
}
