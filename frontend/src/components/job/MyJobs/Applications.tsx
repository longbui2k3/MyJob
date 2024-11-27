import { Avatar, ListItem, UnorderedList } from "@chakra-ui/react";
import { Heading5, Heading6 } from "../../headings";
import { GoDownload } from "react-icons/go";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FindApplicationsAPI } from "../../../apis";
import { ButtonOutline } from "../../buttons";

export default function Applications() {
  const { jobId } = useParams();
  const [applications, setApplications] = useState<Array<any>>([]);
  async function findApplications(jobId: string) {
    const data = await FindApplicationsAPI({ job: jobId });
    if (data.isSuccess) {
      setApplications(data.metadata.applications);
    }
  }
  console.log("data", applications);
  useEffect(() => {
    if (jobId) findApplications(jobId);
  }, [jobId]);

  return (
    <>
      <Heading5 name="Job Applications" />
      <div className="grid grid-cols-3 gap-4 ">
        {applications.map((application) => (
          <>
            <div className="border-2 text-gray-500 p-3 space-y-3 rounded-md">
              <div className="flex gap-3 items-center">
                <Avatar height={"40px"} width={"40px"} />
                <div>
                  <Heading6 name={`Long`} />
                  <p className="text-sm">UI/UX Designer</p>
                </div>
              </div>
              <div className="border-b-2" />
              <UnorderedList fontSize={"14px"}>
                <ListItem>7 Years Experience</ListItem>
                <ListItem>Education: Master Degree</ListItem>
                <ListItem>Applied: Jan 23, 2022</ListItem>
              </UnorderedList>
              <ButtonOutline
                leftIcon={<GoDownload size={18} />}
                children={"Download Cv"}
              />
            </div>
          </>
        ))}
      </div>
    </>
  );
}
