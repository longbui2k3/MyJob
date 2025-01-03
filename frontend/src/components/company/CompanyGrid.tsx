import { Skeleton, SkeletonText, Tag } from "@chakra-ui/react";
import { Heading6 } from "../headings";
import { LocationInfo, OpenJobInfo } from "./CompanyInfos";
import { ButtonOutline } from "../buttons";
import { getRoute } from "../../helpers/constants";
import {
  COMPANY_KEY,
  EMPLOYER_DETAIL_KEY,
} from "../../helpers/constants/routes";
import { useNavigate } from "react-router-dom";
interface CompanyGridProps {
  _id?: string;
  logo?: string;
  companyName?: string;
  mapLocation?: string;
  openJobNum?: number;
  isFeatured?: boolean;
  isLoading?: boolean;
}
export default function CompanyGrid({
  _id = "",
  logo = "",
  companyName = "",
  mapLocation = "",
  openJobNum = 0,
  isFeatured = false,
  isLoading = false,
}: CompanyGridProps) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col space-y-4 p-5 rounded-lg border-[1px] border-[--gray-100] ease-in-out hover:bg-[--primary-50] hover:border-[--primary-200] cursor-pointer">
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
              className="rounded-md aspect-square border-[1px] border-gray-100"
            />
          </a>
        </Skeleton>
        <div className="flex flex-col justify-between ml-4">
          {isLoading ? (
            <SkeletonText
              noOfLines={2}
              width={"200px"}
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
                {isFeatured ? (
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
                ) : (
                  ""
                )}
              </div>
              <div className="flex space-x-2">
                <LocationInfo info={mapLocation.split(",").slice(-1)[0]} />
                <OpenJobInfo info={`${openJobNum} - Open Job`} />
              </div>
            </>
          )}
        </div>
      </div>
      <Skeleton
        isLoaded={!isLoading}
        style={{
          width: "100%",
        }}
      >
        <ButtonOutline
          children={"Open Position"}
          className="w-full"
          onClick={() => {
            navigate(
              `${
                getRoute(EMPLOYER_DETAIL_KEY, {
                  param: {
                    id: _id,
                  },
                }).path
              }?defaultIndex=1`
            );
          }}
        />
      </Skeleton>
    </div>
  );
}
