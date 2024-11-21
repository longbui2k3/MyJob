import { ButtonSocialMedia } from "../buttons";
import { Heading } from "../headings";

export default function FollowUsOn({ company }: { company: any }) {
  return (
    <div className="border-[1px] border-[--gray-100] rounded-md w-full p-5">
      <Heading size={18} name="Follow us on" />
      <div className="grid grid-cols-3 mt-4">
        {company?.socialMedias?.map((socialMedia: any) => (
          <ButtonSocialMedia
            type={socialMedia.socialMedia}
            link={socialMedia.linkUrl}
          />
        ))}
      </div>
    </div>
  );
}
