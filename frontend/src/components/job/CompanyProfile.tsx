import { changeDateToString } from "../../utils";
import { ButtonSocialMedia } from "../buttons";
import { Heading, Heading6 } from "../headings";
import { Text } from "../text";
interface InfoProps {
  title?: string;
  info?: string;
}
function Info({ title = "", info = "" }: InfoProps) {
  return (
    <div className="flex justify-between items-center">
      <Text className="mt-[0px]">{`${title}:`}</Text>
      <Heading className="font-medium" name={info} />
    </div>
  );
}

export default function CompanyProfile({ job }: { job: any }) {
  const infos: Array<InfoProps> = [
    {
      title: "Founded in",
      info: changeDateToString(job?.company?.yearOfEstablishment),
    },
    {
      title: "Organization type",
      info: job?.company?.organizationType,
    },
    {
      title: "Company size",
      info: job?.company?.teamSize,
    },
    {
      title: "Phone",
      info: job?.company?.phone,
    },
    {
      title: "Email",
      info: job?.company?.email,
    },
    {
      title: "Website",
      info: job?.company?.companyWebsite,
    },
  ];
  return (
    <div className="border-[1px] border-[--gray-100] rounded-md w-full h-[450px] p-5">
      <div className="flex space-x-3">
        <img
          src={job?.company?.logo}
          width={"52px"}
          height={"52px"}
          className="rounded-md aspect-square"
        />
        <div className="flex flex-col justify-between ml-4">
          <Heading6 name={job?.company?.companyName} />
          <Text className="mt-[4px]">{job?.company?.industryType}</Text>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-5">
        {infos.map((info) => (
          <Info {...info} />
        ))}
      </div>
      <div className="flex flex-col gap-3 mt-2">
        <Text className="mt-[0px]">Social medias:</Text>
        <div className="grid grid-cols-3">
          {job?.company?.socialMedias.map((socialMedia: any) => (
            <ButtonSocialMedia
              type={socialMedia.socialMedia}
              link={socialMedia.linkUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
