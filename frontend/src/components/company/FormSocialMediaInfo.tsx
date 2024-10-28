import { Button, HStack, IconButton, Input } from "@chakra-ui/react";
import { IoIosAddCircleOutline, IoIosCloseCircleOutline } from "react-icons/io";
import { useState } from "react";
import BaseSelect from "./BaseSelect";

interface FormSocialMediaInfoProps {
  onSocialMediaChange: (
    updatedSocialMedias: { socialMedia: string; linkUrl: string }[]
  ) => void;
}

export default function FormSocialMediaInfo({
  onSocialMediaChange,
}: FormSocialMediaInfoProps) {
  const [socialLinks, setSocialLinks] = useState([
    { id: 1, socialMedia: "", linkUrl: "" },
  ]);

  const updateSocialLinks = (newLinks: typeof socialLinks) => {
    setSocialLinks(newLinks);
    // Gọi callback để truyền dữ liệu lên Tabs
    onSocialMediaChange(
      newLinks.map((link) => ({
        socialMedia: link.socialMedia,
        linkUrl: link.linkUrl,
      }))
    );
  };

  const handleSocialMediaChange = (id: number, newSocialMedia: string) => {
    const updatedLinks = socialLinks.map((link) =>
      link.id === id ? { ...link, socialMedia: newSocialMedia } : link
    );
    updateSocialLinks(updatedLinks);
  };

  const handleLinkUrlChange = (id: number, newLinkUrl: string) => {
    const updatedLinks = socialLinks.map((link) =>
      link.id === id ? { ...link, linkUrl: newLinkUrl } : link
    );
    updateSocialLinks(updatedLinks);
  };

  // const addNewSocialLink = () => {
  //   setSocialLinks([
  //     ...socialLinks,
  //     { id: Date.now(), socialMedia: "", linkUrl: "" },
  //   ]);
  // };

  // const removeSocialLink = (id: number) => {
  //   setSocialLinks(socialLinks.filter((link) => link.id !== id));
  // };

  return (
    <div>
      {socialLinks.map((link) => (
        <HStack className="mt-4" key={link.id}>
          <BaseSelect
            className="hidden"
            text="Organization Type"
            options={["Facebook", "Twitter", "Instagram", "LinkedIn"]}
            onChange={(value) => handleSocialMediaChange(link.id, value)}
          />
          <Input
            flex="4"
            placeholder="Profile link/url..."
            onChange={(e) => handleLinkUrlChange(link.id, e.target.value)}
          />
          <IconButton
            aria-label="Delete link"
            icon={<IoIosCloseCircleOutline size={20} />}
            onClick={() =>
              updateSocialLinks(socialLinks.filter((l) => l.id !== link.id))
            }
          />
        </HStack>
      ))}
      <Button
        className="w-full mt-5"
        fontWeight={"500"}
        leftIcon={<IoIosAddCircleOutline size={22} />}
        onClick={() =>
          updateSocialLinks([
            ...socialLinks,
            { id: Date.now(), socialMedia: "", linkUrl: "" },
          ])
        }
      >
        Add New Social Link
      </Button>
    </div>
  );
}
