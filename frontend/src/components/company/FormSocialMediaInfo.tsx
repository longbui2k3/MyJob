import { Button, HStack, IconButton, Input } from "@chakra-ui/react";
import { IoIosAddCircleOutline, IoIosCloseCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import BaseSelect from "./BaseSelect";

interface FormSocialMediaInfoProps {
  socialMedias: { socialMedia: string; linkUrl: string }[];
  onSocialMediaChange: (
    updatedSocialMedias: { socialMedia: string; linkUrl: string }[]
  ) => void;
}

export default function FormSocialMediaInfo({
  socialMedias,
  onSocialMediaChange,
}: FormSocialMediaInfoProps) {
  const [socialLinks, setSocialLinks] = useState([
    { socialMedia: "", linkUrl: "" },
  ]);

  // Đồng bộ hóa dữ liệu ban đầu từ props
  useEffect(() => {
    if (socialMedias.length > 0) {
      setSocialLinks(socialMedias);
    }
  }, [socialMedias]);

  const updateSocialLinks = (newLinks: typeof socialLinks) => {
    setSocialLinks(newLinks);
    onSocialMediaChange(newLinks);
  };

  const handleSocialMediaChange = (index: number, newSocialMedia: string) => {
    const updatedLinks = [...socialLinks];
    updatedLinks[index].socialMedia = newSocialMedia;
    updateSocialLinks(updatedLinks);
  };

  const handleLinkUrlChange = (index: number, newLinkUrl: string) => {
    const updatedLinks = [...socialLinks];
    updatedLinks[index].linkUrl = newLinkUrl;
    updateSocialLinks(updatedLinks);
  };

  return (
    <div>
      {socialLinks.map((link, index) => (
        <div className="mb-4">
          <div className="font-">Social Link {index + 1}</div>
          <HStack className="mt-4" key={index}>
            <BaseSelect
              className="hidden"
              options={["Facebook", "Twitter", "Instagram", "LinkedIn"]}
              value={link.socialMedia} // Gán giá trị ban đầu
              onChange={(value) => handleSocialMediaChange(index, value)}
            />
            <Input
              flex="4"
              placeholder="Profile link/url..."
              value={link.linkUrl} // Gán giá trị ban đầu
              onChange={(e) => handleLinkUrlChange(index, e.target.value)}
            />
            <IconButton
              aria-label="Delete link"
              icon={<IoIosCloseCircleOutline size={20} />}
              onClick={() =>
                updateSocialLinks(socialLinks.filter((_, i) => i !== index))
              }
            />
          </HStack>
        </div>
      ))}
      <Button
        className="w-full mt-5"
        fontWeight={"500"}
        leftIcon={<IoIosAddCircleOutline size={22} />}
        onClick={() =>
          updateSocialLinks([...socialLinks, { socialMedia: "", linkUrl: "" }])
        }
      >
        Add New Social Link
      </Button>
    </div>
  );
}
