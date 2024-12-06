import { useEffect, useState } from "react";
import {
  DEFAULT_PADDING_X,
  getRoute,
  JobStatuses,
  SIGN_IN_KEY,
} from "../../helpers/constants";
import { FindJobAPI } from "../../apis";
import { useNavigate, useParams } from "react-router-dom";
import { Heading, Heading5 } from "../headings";
import { Tag } from "@chakra-ui/react";
import { LinkInfo, MailInfo, PhoneInfo } from "./JobInfos";
import { ButtonDisabled, ButtonSubmit } from "../buttons";
import { Text } from "../text";
import { changeDateToString } from "../../utils";
import JobOverview from "./JobOverview";
import CompanyProfile from "./CompanyProfile";
import { FindFavoriteJobAPI } from "../../apis/favoriteJobAPI";
import UnfavoriteJobIcon from "./UnfavoriteJobIcon";
import FavoriteJobIcon from "./FavoriteJobIcon";
import { useDispatch } from "react-redux";
import { openFormApplyJob, setId } from "../../features";
import { useAuthContext } from "../../context";

export default function JobDetail() {
  const { user } = useAuthContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [job, setJob] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isFavoriteJob, setIsFavoriteJob] = useState(false);
  async function findFavoriteJob() {
    if (!id) return;
    const data = await FindFavoriteJobAPI(id);
    if (data.isSuccess) {
      setIsFavoriteJob(true);
    } else {
      setIsFavoriteJob(false);
    }
  }
  useEffect(() => {
    findFavoriteJob();
  }, []);
  async function findJob() {
    if (!id) return;
    const data = await FindJobAPI(id);
    if (data.isSuccess) {
      setJob(data.metadata.job);
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
            {new Date(job.expirationDate) < new Date(Date.now()) ||
            job.status === JobStatuses.EXPIRED ? (
              <ButtonDisabled width="200px" fontSize="14px">
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
    </div>
  );
}
