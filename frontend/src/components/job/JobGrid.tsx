import { Tag } from "@chakra-ui/react";
import { Heading, Heading6 } from "../headings";
import { DeadlineInfo, LocationInfo, SalaryInfo } from "../company";
import { ButtonOutline } from "../buttons";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { distanceBetweenTwoDates } from "../../utils";
import { getRoute, JobStatuses } from "../../helpers/constants";
import {
  EMPLOYER_DETAIL_KEY,
  JOB_DETAIL_KEY,
  SIGN_IN_KEY,
} from "../../helpers/constants/routes";
import { useEffect, useState } from "react";
import { FindFavoriteJobAPI } from "../../apis/favoriteJobAPI";
import UnfavoriteJobIcon from "./UnfavoriteJobIcon";
import FavoriteJobIcon from "./FavoriteJobIcon";
import { useDispatch } from "react-redux";
import { openFormApplyJob } from "../../features";
import { useAuthContext } from "../../context";

interface JobGridProps {
  _id?: string;
  companyId?: string;
  companyLogo?: string;
  companyName?: string;
  companyLocation?: string;
  jobTitle?: string;
  jobType?: string;
  minSalary?: number;
  maxSalary?: number;
  expirationDate?: Date;
  isFeatured?: boolean;
  status?: string;
}
export default function JobGrid({
  _id = "",
  companyId = "",
  companyLogo = "",
  companyName = "",
  companyLocation = "",
  jobTitle = "",
  jobType = "",
  minSalary = 0,
  maxSalary = 0,
  isFeatured = false,
  expirationDate = new Date(Date.now()),
  status = "Active",
}: JobGridProps) {
  const { user } = useAuthContext();
  const dispatch = useDispatch();
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
    <div
      className={`w-full p-5 border-[1px] border-[--gray-100] rounded-lg bg-gradient-to-r ease-in-out hover:bg-[--primary-50] hover:border-[--primary-200] cursor-pointer ${
        isFeatured ? "from-[--featured]" : ""
      }`}
    >
      <div className="flex justify-between">
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
              {new Date(expirationDate) < new Date(Date.now()) ||
              status === JobStatuses.EXPIRED ? (
                <Tag
                  bg="var(--danger-50)"
                  textColor={"var(--danger-500)"}
                  fontSize={"13px"}
                  paddingX={"8px"}
                  paddingY="4px"
                  marginY="auto"
                >
                  {status}
                </Tag>
              ) : (
                ""
              )}
            </div>
            <LocationInfo info={companyLocation.split(",").slice(-1)[0]} />
          </div>
        </div>
        {!isFavoriteJob ? (
          <UnfavoriteJobIcon jobId={_id} setIsFavoriteJob={setIsFavoriteJob} />
        ) : (
          <FavoriteJobIcon jobId={_id} setIsFavoriteJob={setIsFavoriteJob} />
        )}
      </div>
      <div className="flex justify-between">
        <div className="mt-4 space-y-2">
          <a
            href={
              getRoute(JOB_DETAIL_KEY, {
                param: {
                  id: _id,
                },
              }).path
            }
          >
            <Heading
              name={jobTitle}
              size={17}
              className="hover:text-[--primary-500] hover:underline"
            />
          </a>
          <div className="flex space-x-2">
            <div className="flex items-center space-x-2 text-[--gray-500] text-[13px]">
              <div>{jobType}</div>
              <div>•</div>
            </div>
            <SalaryInfo info={`$${minSalary}-$${maxSalary}`} />
            <DeadlineInfo
              info={`${distanceBetweenTwoDates(
                new Date(expirationDate),
                new Date(Date.now())
              )} Remaining`}
            />
          </div>
        </div>
        <div className="flex flex-col-reverse">
          {new Date(expirationDate) < new Date(Date.now()) ||
          status === JobStatuses.EXPIRED ? (
            ""
          ) : (
            <ButtonOutline
              children={
                <div className="flex items-center transition-all duration-500 ease-in-out hover:scale-105 bg-none">
                  <div>Apply Now</div>
                  <FiArrowRight className="text-[16px] ml-2" />
                </div>
              }
              border="0px"
              isHover={false}
              className="w-[100px]"
              onClick={() => {
                if (!user) {
                  navigate(getRoute(SIGN_IN_KEY).path);
                  navigate(0);
                  return;
                }
                navigate(
                  getRoute(JOB_DETAIL_KEY, {
                    param: {
                      id: _id,
                    },
                  }).path
                );
                dispatch(openFormApplyJob());
              }}
              bgColor="transparent"
            />
          )}
        </div>
      </div>
    </div>
  );
}
