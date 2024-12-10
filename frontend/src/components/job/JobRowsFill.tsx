import { Skeleton, SkeletonText, Tag } from "@chakra-ui/react";
import { Heading6 } from "../headings";
import { ButtonDisabled, ButtonSolid, ButtonSubmit } from "../buttons";
import { DeadlineInfo, LocationInfo, SalaryInfo } from "../company";
import { distanceBetweenTwoDates } from "../../utils";
import { useNavigate } from "react-router-dom";
import { getRoute, JobStatuses } from "../../helpers/constants";
import {
  EMPLOYER_DETAIL_KEY,
  JOB_DETAIL_KEY,
  SIGN_IN_KEY,
} from "../../helpers/constants/routes";
import { FindFavoriteJobAPI } from "../../apis/favoriteJobAPI";
import { useEffect, useState } from "react";
import UnfavoriteJobIcon from "./UnfavoriteJobIcon";
import FavoriteJobIcon from "./FavoriteJobIcon";
import { useDispatch } from "react-redux";
import { openFormApplyJob, setId } from "../../features";
import { useAuthContext } from "../../context";
import { CheckUserAppliedJobAPI } from "../../apis";
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
  status?: string;
  isLoading?: boolean;
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
  status = JobStatuses.ACTIVE,
  isLoading = false,
}: JobRowsFillProps) {
  const [isLoadingInner, setIsLoadingInner] = useState(false);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      findFavoriteJob();
      checkUserAppliedJob();
      setTimeout(() => {
        setIsLoadingInner(false);
      }, 100);
    }
    __();
  }, []);
  return (
    <div className="flex justify-between w-full p-5 border-[1px] border-[--gray-100] rounded-lg ease-in-out hover:bg-[--primary-50] hover:border-[--primary-200] cursor-pointer">
      <div className="flex space-x-3 items-center">
        {isLoading ? (
          <Skeleton
            className="rounded-md aspect-square"
            style={{
              width: "60px",
              height: "60px",
              backgroundColor: "var(--gray-100)",
            }}
          />
        ) : (
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
              width={"60px"}
              height={"60px"}
              className="rounded-md aspect-square"
            />
          </a>
        )}
        <div className="flex flex-col gap-2 justify-between ml-4">
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
            </>
          )}
        </div>
      </div>
      <div className="flex space-x-4 py-auto items-center">
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
        <Skeleton isLoaded={!isLoadingInner && !isLoading}>
          {isAppliedJob ? (
            <ButtonDisabled
              children="Applied"
              height="40px"
              width="150px"
              fontSize="13px"
            />
          ) : new Date(expirationDate) < new Date(Date.now()) ||
            status === JobStatuses.EXPIRED ? (
            <ButtonDisabled width="150px" fontSize="13px">
              {"Deadline Expired"}
            </ButtonDisabled>
          ) : (
            <ButtonSubmit
              label="Apply Now"
              className="my-auto transition-all duration-500 ease-in-out hover:scale-[1.05]"
              height="40px"
              width="150px"
              fontSize="13px"
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
            />
          )}
        </Skeleton>
      </div>
    </div>
  );
}
