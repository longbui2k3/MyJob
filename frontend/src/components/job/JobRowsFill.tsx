import { Tag } from "@chakra-ui/react";
import { Heading6 } from "../headings";
import { ButtonSubmit } from "../buttons";
import { DeadlineInfo, LocationInfo, SalaryInfo } from "../company";
import { distanceBetweenTwoDates } from "../../utils";
import { useNavigate } from "react-router-dom";
import { getRoute } from "../../helpers/constants";
import {
  EMPLOYER_DETAIL_KEY,
  JOB_DETAIL_KEY,
} from "../../helpers/constants/routes";
import { FindFavoriteJobAPI } from "../../apis/favoriteJobAPI";
import { useEffect, useState } from "react";
import UnfavoriteJobIcon from "./UnfavoriteJobIcon";
import FavoriteJobIcon from "./FavoriteJobIcon";

interface JobRowsFillProps {
  _id?: string;
  companyId?: string;
  companyLogo?: string;
  companyLocation?: string;
  jobTitle?: string;
  jobType?: string;
  minSalary?: number;
  maxSalary?: number;
  expirationDate?: Date;
  isFeatured?: boolean;
}

export default function JobRowsFill({
  _id = "",
  companyId = "",
  companyLogo = "",
  companyLocation = "",
  jobTitle = "",
  jobType = "",
  minSalary = 0,
  maxSalary = 0,
  expirationDate = new Date(Date.now()),
  isFeatured = false,
}: JobRowsFillProps) {
  const navigate = useNavigate();
  const [isFavoriteJob, setIsFavoriteJob] = useState(false);
  async function findFavoriteJob() {
    const data = await FindFavoriteJobAPI(_id);
    if (data.isSuccess) {
      setIsFavoriteJob(true);
    } else {
      setIsFavoriteJob(false);
    }
  }
  useEffect(() => {
    findFavoriteJob();
  }, []);
  return (
    <div className="flex justify-between w-full p-5 border-[1px] border-[--gray-100] rounded-lg ease-in-out hover:bg-[--primary-50] hover:border-[--primary-200] cursor-pointer">
      <div className="flex space-x-3">
        <a
          href={
            getRoute(EMPLOYER_DETAIL_KEY, {
              param: {
                id: companyId,
              },
            }).path
          }
        >
          <img
            src={companyLogo}
            width={"52px"}
            height={"52px"}
            className="rounded-md aspect-square"
          />
        </a>
        <div className="flex flex-col justify-between ml-4">
          <div className="flex items-center space-x-3">
            <a
              href={
                getRoute(JOB_DETAIL_KEY, {
                  param: {
                    id: _id,
                  },
                }).path
              }
            >
              <Heading6
                name={jobTitle}
                className="hover:text-[--primary-500] hover:underline"
              />
            </a>
            <Tag
              bg="white"
              border={"1px solid var(--primary-500)"}
              textColor={"var(--primary-500)"}
              fontSize={"13px"}
              paddingX={"8px"}
              paddingY="4px"
              marginY="auto"
            >
              {jobType}
            </Tag>
          </div>
          <div className="flex space-x-2">
            <LocationInfo info={companyLocation.split(",").slice(-1)[0]} />
            <SalaryInfo info={`$${minSalary}-$${maxSalary}`} />
            <DeadlineInfo
              info={`${distanceBetweenTwoDates(
                new Date(expirationDate),
                new Date(Date.now())
              )} Remaining`}
            />
          </div>
        </div>
      </div>
      <div className="flex space-x-4 py-auto items-center">
        {!isFavoriteJob ? (
          <UnfavoriteJobIcon jobId={_id} setIsFavoriteJob={setIsFavoriteJob} />
        ) : (
          <FavoriteJobIcon jobId={_id} setIsFavoriteJob={setIsFavoriteJob} />
        )}
        <ButtonSubmit
          label="Apply Now"
          className="my-auto transition-all duration-500 ease-in-out hover:scale-[1.05]"
          height="40px"
          fontSize="13px"
          onClick={() => {
            navigate(
              getRoute(JOB_DETAIL_KEY, {
                param: {
                  id: _id,
                },
              }).path
            );
          }}
        />
      </div>
    </div>
  );
}
