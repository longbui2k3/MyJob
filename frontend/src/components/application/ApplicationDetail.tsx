import { FindApplicationAPI, FindSavedCandidateAPI } from "../../apis";
import { useEffect, useState } from "react";
import { Heading, Heading5 } from "../headings";
import { Text } from "../text";
import { SavedCandidateIcon, UnsavedCandidateIcon } from "../candidate";
import { TfiEmail } from "react-icons/tfi";
import DownloadMyResume from "./DownloadMyResume";
import ProfileOverview from "../profile/ProfileOverview";
import { ContactInformation } from "../profile";
import { ButtonSolid } from "../buttons";
import { OutsideForm } from "../global";
import { closeApplicationDetail } from "../../features";
import { useSelector } from "react-redux";

export default function ApplicationDetail() {
  const id = useSelector((state: any) => state.openForm.id);

  const [application, setApplication] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSavedCandidate, setIsSavedCandidate] = useState(false);

  async function findApplication() {
    if (!id) return;
    const data = await FindApplicationAPI(id);
    if (data.isSuccess) {
      setApplication(data.metadata.application);
    }
  }
  async function findSavedCandidate() {
    const data = await FindSavedCandidateAPI(id);
    if (data.isSuccess) {
      setIsSavedCandidate(true);
    } else {
      setIsSavedCandidate(false);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    findApplication();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (id) {
      findSavedCandidate();
    }
  }, [application]);

  return (
    <OutsideForm
      closeForm={closeApplicationDetail}
      header={`Application detail for JOB: ${application?.job?.jobTitle} `}
      width={`calc(100% - 400px)`}
      height="auto"
    >
      <div className={`w-full `}>
        <div className="flex justify-between items-center">
          <div className="flex space-x-5 items-center">
            <img
              src={application?.profile?.avatar}
              width={"80px"}
              height={"80px"}
              className="rounded-full aspect-square"
            />
            <div className="flex flex-col space-y-2 justify-between">
              <div className="flex space-x-3">
                <Heading5 name={application?.profile?.fullName} />
              </div>
              <div className="flex space-x-5">
                <Text
                  className="mt-[0px]"
                  children={application?.job?.jobTitle}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="flex space-x-4 items-center">
              <div className="flex justify-center items-center h-[45px] w-[45px] bg-[--primary-100] rounded-md">
                {isSavedCandidate ? (
                  <SavedCandidateIcon
                    candidateId={id}
                    setIsSavedCandidate={setIsSavedCandidate}
                  />
                ) : (
                  <UnsavedCandidateIcon
                    candidateId={id}
                    setIsSavedCandidate={setIsSavedCandidate}
                  />
                )}
              </div>
              <ButtonSolid
                className="my-auto"
                onClick={() => {}}
                children={"Send Email"}
                leftIcon={<TfiEmail size={20} />}
                height="45px"
                width="200px"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-10 w-full mt-8">
          <div className="flex flex-col gap-6 w-[60%] h-full">
            <div>
              <Heading name="Biography" size={17} />
              <Text>
                <div
                  dangerouslySetInnerHTML={{
                    __html: application?.profile?.biography,
                  }}
                />
              </Text>
            </div>
            <div>
              <Heading name="Cover letter" size={17} />
              <Text>
                <div
                  dangerouslySetInnerHTML={{
                    __html: application?.coverLetter,
                  }}
                />
              </Text>
            </div>
          </div>
          <div className="flex flex-col gap-10 w-[40%] h-full">
            <ProfileOverview profile={application?.profile} />
            <DownloadMyResume resume={application?.resume} />
            <ContactInformation profile={application?.profile} />
          </div>
        </div>
      </div>
    </OutsideForm>
  );
}
