import { Skeleton, SkeletonText, Tag } from "@chakra-ui/react";
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
import { openFormApplyJob, setId } from "../../features";
import { useAuthContext } from "../../context";
import { CheckUserAppliedJobAPI } from "../../apis";
import { functionsIn } from "lodash";

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
  isLoading?: boolean;
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
  isLoading = false,
}: JobGridProps) {
  const [isLoadingInner, setIsLoadingInner] = useState(false);
  const { user } = useAuthContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFavoriteJob, setIsFavoriteJob] = useState(false);
  const [isAppliedJob, setIsAppliedJob] = useState(false);
  async function findFavoriteJob() {
    const data = await FindFavoriteJobAPI(_id);
    if (data.isSuccess) {
      setIsFavoriteJob(true);
    } else {
      setIsFavoriteJob(false);
    }
  }
  async function checkUserAppliedJob() {
    if (!_id) return;
    const data = await CheckUserAppliedJobAPI(_id);
    if (data.isSuccess) {
      setIsAppliedJob(Boolean(data.metadata.application));
    }
  }
  useEffect(() => {
    async function __() {
      setIsLoadingInner(true);
      await Promise.all([findFavoriteJob(), checkUserAppliedJob()]);
      setTimeout(() => {
        setIsLoadingInner(false);
      }, 100)
      
    }
    __();
  }, []);
  return (
    <div
      className={`w-full p-5 border-[1px] border-[--gray-100] rounded-lg bg-gradient-to-r ease-in-out hover:bg-[--primary-50] hover:border-[--primary-200] cursor-pointer ${
        isFeatured ? "from-[--featured]" : ""
      }`}
    >
      <div className="flex justify-between">
        <div className="flex space-x-3">
          <Skeleton isLoaded={!isLoading}>
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
          </Skeleton>
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
                {isAppliedJob ? (
                  <Tag
                    bg="var(--danger-50)"
                    textColor={"var(--danger-500)"}
                    fontSize={"13px"}
                    paddingX={"8px"}
                    paddingY="4px"
                    marginY="auto"
                  >
                    {"Applied"}
                  </Tag>
                ) : new Date(expirationDate) < new Date(Date.now()) ||
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
          )}
        </div>
        <Skeleton isLoaded={!isLoadingInner && !isLoading}>
          {!isFavoriteJob ? (
            <UnfavoriteJobIcon
              jobId={_id}
              setIsFavoriteJob={setIsFavoriteJob}
            />
          ) : (
            <FavoriteJobIcon jobId={_id} setIsFavoriteJob={setIsFavoriteJob} />
          )}
        </Skeleton>
      </div>
      <div className="flex justify-between">
        <div className="mt-4 space-y-2">
          <Skeleton isLoaded={!isLoading}>
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
          </Skeleton>
          <div className="flex space-x-2">
            <Skeleton isLoaded={!isLoading}>
              <div className="flex items-center space-x-2 text-[--gray-500] text-[13px]">
                <div>{jobType}</div>
                <div>•</div>
              </div>
            </Skeleton>
            <Skeleton isLoaded={!isLoading}>
              <SalaryInfo info={`$${minSalary}-$${maxSalary}`} />
            </Skeleton>
            <Skeleton isLoaded={!isLoading}>
              <DeadlineInfo
                info={`${distanceBetweenTwoDates(
                  new Date(expirationDate),
                  new Date(Date.now())
                )} Remaining`}
              />
            </Skeleton>
          </div>
        </div>
        <div className="flex flex-col-reverse">
          <Skeleton isLoaded={!isLoadingInner && !isLoading}>
            {isAppliedJob ? (
              ""
            ) : new Date(expirationDate) < new Date(Date.now()) ||
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
                  dispatch(setId(_id));
                }}
                bgColor="transparent"
              />
            )}
          </Skeleton>
        </div>
      </div>
    </div>
  );
}
