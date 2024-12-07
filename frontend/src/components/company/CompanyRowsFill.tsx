import { Heading6 } from "../headings";
import { LocationInfo, OpenJobInfo } from "./CompanyInfos";
import { ButtonOutline } from "../buttons";
import { FiArrowRight } from "react-icons/fi";
import { getRoute } from "../../helpers/constants";
import { EMPLOYER_DETAIL_KEY } from "../../helpers/constants/routes";
import { Skeleton, SkeletonText } from "@chakra-ui/react";

interface CompanyRowsFillProps {
  _id?: string;
  logo?: string;
  companyName?: string;
  mapLocation?: string;
  openJobNum?: number;
  isFeatured?: boolean;
  isLoading?: boolean;
}

export default function CompanyRowsFill({
  _id = "",
  logo = "",
  companyName = "",
  mapLocation = "",
  openJobNum = 0,
  isFeatured = false,
  isLoading = false,
}: CompanyRowsFillProps) {
  return (
    <div className="flex justify-between w-full p-5 border-[1px] border-[--gray-100] rounded-lg ease-in-out hover:bg-[--primary-50] hover:border-[--primary-200] cursor-pointer">
      <div className="flex space-x-3">
        <Skeleton isLoaded={!isLoading}>
          <a
            href={
              getRoute(EMPLOYER_DETAIL_KEY, {
                param: {
                  id: _id,
                },
              }).path
            }
          >
            <img
              src={logo}
              width={"52px"}
              height={"52px"}
              className="rounded-md aspect-square"
            />
          </a>
        </Skeleton>
        <div className="flex flex-col justify-between ml-4">
          {isLoading ? (
            <SkeletonText
              noOfLines={2}
              width={"300px"}
              height={"100%"}
              gap={"2"}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            />
          ) : (
            <>
              <div className="flex space-x-3">
                <a
                  href={
                    getRoute(EMPLOYER_DETAIL_KEY, {
                      param: {
                        id: _id,
                      },
                    }).path
                  }
                >
                  <Heading6
                    name={companyName}
                    className="hover:text-[--primary-500] hover:underline"
                  />
                </a>
              </div>
              <div className="flex space-x-2">
                <LocationInfo info={mapLocation.split(",").slice(-1)[0]} />
                <OpenJobInfo info={`${openJobNum} - Open Job`} />
              </div>
            </>
          )}
        </div>
      </div>
      <div className="flex space-x-4 py-auto">
        <Skeleton isLoaded={!isLoading}>
          <ButtonOutline
            className="my-auto"
            rightIcon={<FiArrowRight className="text-[18px]" />}
          >
            Open Position
          </ButtonOutline>
        </Skeleton>
      </div>
    </div>
  );
}
