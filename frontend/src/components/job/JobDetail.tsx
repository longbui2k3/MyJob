import { useEffect, useState } from "react";
import {
  DEFAULT_PADDING_X,
  getRoute,
  JobStatuses,
  SIGN_IN_KEY,
} from "../../helpers/constants";
import { CheckUserAppliedJobAPI, FindJobAPI, FindJobsAPI } from "../../apis";
import { useNavigate, useParams } from "react-router-dom";
import { Heading, Heading5 } from "../headings";
import { Tag } from "@chakra-ui/react";
import { LinkInfo, MailInfo, PhoneInfo } from "./JobInfos";
import { ButtonDisabled, ButtonSolid, ButtonSubmit } from "../buttons";
import { Text } from "../text";
import { changeDateToString } from "../../utils";
import JobOverview from "./JobOverview";
import CompanyProfile from "./CompanyProfile";
import { FindFavoriteJobAPI } from "../../apis/favoriteJobAPI";
import UnfavoriteJobIcon from "./UnfavoriteJobIcon";
import FavoriteJobIcon from "./FavoriteJobIcon";
import { useDispatch, useSelector } from "react-redux";
import { openFormApplyJob, setId } from "../../features";
import { useAuthContext } from "../../context";
import JobGrid from "./JobGrid";

export default function JobDetail() {
  const isDataChange = useSelector(
    (state: any) => state.changeData.isDataChange
  );
  const { user } = useAuthContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [job, setJob] = useState<any>({});
  const [jobs, setJobs] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavoriteJob, setIsFavoriteJob] = useState(false);
  const [isAppliedJob, setIsAppliedJob] = useState(false);
  const [appliedAt, setAppliedAt] = useState<string | undefined>(undefined);
  async function findFavoriteJob() {
    if (!id) return;
    const data = await FindFavoriteJobAPI(id);
    if (data.isSuccess) {
      setIsFavoriteJob(true);
    } else {
      setIsFavoriteJob(false);
    }
  }
  async function checkUserAppliedJob() {
    if (!id) return;
    const data = await CheckUserAppliedJobAPI(id);
    if (data.isSuccess) {
      setIsAppliedJob(Boolean(data.metadata.application));
      setAppliedAt(data.metadata.application.appliedAt);
    }
  }
  useEffect(() => {
    findFavoriteJob();
    checkUserAppliedJob();
  }, [isDataChange]);

  async function findJobsByCompany(company: string) {
    if (!id) return;
    const data = await FindJobsAPI({
      company: company,
      status: JobStatuses.ACTIVE,
    });
    if (data.isSuccess) {
      setJobs(data.metadata.jobs);
    }
  }

  async function findJob() {
    if (!id) return;
    const data = await FindJobAPI(id);
    if (data.isSuccess) {
      setJob(data.metadata.job);
      await findJobsByCompany(data.metadata.job.company._id);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    findJob();
    setIsLoading(false);
  }, []);
  return (
    <div
      className={`w-full`}
      style={{
        padding: `40px ${DEFAULT_PADDING_X}`,
      }}
    >
      <div className="flex justify-between items-center">
        <div className="flex space-x-5 items-center">
          <img
            src={job?.company?.logo}
            width={"80px"}
            height={"80px"}
            className="rounded-full aspect-square"
          />
          <div className="flex flex-col space-y-2 justify-between">
            <div className="flex space-x-3">
              <Heading5 name={job?.jobTitle} />
              <Tag
                bg="var(--primary-50)"
                textColor={"var(--primary-500)"}
                fontSize={"13px"}
                paddingX={"8px"}
                paddingY="4px"
                marginY="auto"
              >
                {job?.jobType}
              </Tag>
              {new Date(job.expirationDate) < new Date(Date.now()) ||
              job.status === JobStatuses.EXPIRED ? (
                <Tag
                  bg="var(--danger-50)"
                  textColor={"var(--danger-500)"}
                  fontSize={"13px"}
                  paddingX={"8px"}
                  paddingY="4px"
                  marginY="auto"
                >
                  {job.status}
                </Tag>
              ) : (
                ""
              )}
            </div>
            <div className="flex space-x-5">
              <LinkInfo info={job?.company?.companyWebsite} />
              <PhoneInfo info={job?.company?.phone} />
              <MailInfo info={job?.company?.email} />
            </div>
          </div>
        </div>
        <div>
          <div className="flex space-x-4">
            <div className="flex justify-center items-center h-[45px] w-[45px] bg-[--primary-100] rounded-md">
              {!isFavoriteJob ? (
                <UnfavoriteJobIcon
                  jobId={id}
                  setIsFavoriteJob={setIsFavoriteJob}
                />
              ) : (
                <FavoriteJobIcon
                  jobId={id}
                  setIsFavoriteJob={setIsFavoriteJob}
                />
              )}
            </div>
            {isAppliedJob ? (
              <ButtonDisabled
                children="Applied"
                height="45px"
                width="200px"
                fontSize="14px"
              />
            ) : new Date(job.expirationDate) < new Date(Date.now()) ||
              job.status === JobStatuses.EXPIRED ? (
              <ButtonDisabled width="200px" height="45px" fontSize="14px">
                {"Deadline Expired"}
              </ButtonDisabled>
            ) : (
              <ButtonSubmit
                label="Apply Now"
                className="my-auto"
                height="45px"
                width="200px"
                fontSize="14px"
                onClick={() => {
                  if (!user) {
                    navigate(getRoute(SIGN_IN_KEY).path);
                    navigate(0);
                    return;
                  }
                  dispatch(openFormApplyJob());
                  dispatch(setId(job._id));
                }}
              />
            )}
          </div>
          <div className="flex flex-row-reverse">
            <Text>
              Job expire in:{" "}
              <span className="ml-1 text-[--danger-500]">
                {changeDateToString(job?.expirationDate)}
              </span>
            </Text>
          </div>
        </div>
      </div>
      <div className="flex flex-row-reverse">
        {isAppliedJob && appliedAt ? (
          <Text>
            You submitted your CV for this position on:{" "}
            <span className="ml-1 text-[--success]">
              {changeDateToString(appliedAt)}
            </span>
          </Text>
        ) : (
          ""
        )}
      </div>
      <div className="flex gap-10 w-full mt-8">
        <div className="flex flex-col gap-6 w-[60%] h-full">
          <div>
            <Heading name="Job Description" size={17} />
            <Text>
              <div dangerouslySetInnerHTML={{ __html: job?.jobDescription }} />
            </Text>
          </div>
          <div>
            <Heading name="Responsibilities" size={17} />
            <Text>
              <div
                dangerouslySetInnerHTML={{ __html: job?.jobResponsibilities }}
              />
            </Text>
          </div>
        </div>
        <div className="flex flex-col gap-10 w-[40%] h-full">
          <JobOverview job={job} />
          <CompanyProfile job={job} />
        </div>
      </div>
      <div className="flex flex-col gap-5 mt-5">
        <Heading name="Other jobs" size={17} />
        <div className="grid grid-cols-2 gap-5">
          {jobs.map((job) => (
            <JobGrid
              _id={job._id}
              companyName={job.company.companyName}
              companyId={job.company._id}
              companyLogo={job.company.logo}
              companyLocation={job.company.mapLocation}
              jobTitle={job.jobTitle}
              jobType={job.jobType}
              minSalary={job.minSalary}
              maxSalary={job.maxSalary}
              expirationDate={job.expirationDate}
              status={job.status}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
