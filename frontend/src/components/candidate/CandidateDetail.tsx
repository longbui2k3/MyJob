import { useParams } from "react-router-dom";
import { DEFAULT_PADDING_X } from "../../helpers/constants";
import {
  FindApplicationAPI,
  FindProfileAPI,
  FindSavedCandidateAPI,
} from "../../apis";
import { useEffect, useState } from "react";
import { Heading, Heading5 } from "../headings";
import { Text } from "../text";
import UnsavedCandidateIcon from "./UnsavedCandidateIcon";
import SavedCandidateIcon from "./SavedCandidateIcon";
import { ButtonSolid } from "../buttons";
import { TfiEmail } from "react-icons/tfi";
import { ContactInformation, ProfileOverview } from "../profile";

export default function CandidateDetail() {
  const { id } = useParams();

  const [profile, setProfile] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSavedCandidate, setIsSavedCandidate] = useState(false);

  async function findProfile() {
    if (!id) {
      return;
    }
    const data = await FindProfileAPI(id);
    if (data.isSuccess) {
      setProfile(data.metadata.profile);
    }
  }
  async function findSavedCandidate() {
    if (!id) {
      return;
    }
    const data = await FindSavedCandidateAPI(id);
    if (data.isSuccess) {
      setIsSavedCandidate(true);
    } else {
      setIsSavedCandidate(false);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    findProfile();
    findSavedCandidate();

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
            src={profile.avatar}
            width={"80px"}
            height={"80px"}
            className="rounded-full aspect-square"
          />
          <div className="flex flex-col space-y-2 justify-between">
            <div className="flex space-x-3">
              <Heading5 name={profile.fullName} />
            </div>
            <div className="flex space-x-5">
              <Text className="mt-[0px]" children={profile.title} />
            </div>
          </div>
        </div>
        <div>
          <div className="flex space-x-4 items-center">
            <div className="flex justify-center items-center h-[45px] w-[45px] bg-[--primary-100] rounded-md">
              {!isSavedCandidate ? (
                <UnsavedCandidateIcon
                  candidateId={id}
                  setIsSavedCandidate={setIsSavedCandidate}
                />
              ) : (
                <SavedCandidateIcon
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
                  __html: profile.biography,
                }}
              />
            </Text>
          </div>
        </div>
        <div className="flex flex-col gap-10 w-[40%] h-full">
          <ProfileOverview profile={profile} />
          <ContactInformation profile={profile} />
        </div>
      </div>
    </div>
  );
}
