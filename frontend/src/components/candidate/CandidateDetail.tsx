import { useParams } from "react-router-dom";
import { DEFAULT_PADDING_X } from "../../helpers/constants";
import { FindApplicationAPI } from "../../apis";
import { useEffect, useState } from "react";
import { Heading5 } from "../headings";
import { Text } from "../text";

export default function CandidateDetail() {
  const { id } = useParams();
  const [application, setApplication] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isFavoriteCandidate, setIsFavoriteCandidate] = useState(false);
  // async function findApplication() {
  //   if (!id) return;
  //   const data = await FindApplicationAPI(id);
  //   if (data.isSuccess) {
  //     setApplication(data.metadata.application);
  //   }
  // }

  // useEffect(() => {
  //   setIsLoading(true);
  //   findApplication();
  //   setIsLoading(false);
  // }, []);

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
          <div className="flex space-x-4">
            <div className="flex justify-center items-center h-[45px] w-[45px] bg-[--primary-100] rounded-md">

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
