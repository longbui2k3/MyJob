import { Button, HStack, IconButton, Input } from "@chakra-ui/react";
import { IoIosAddCircleOutline, IoIosCloseCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import { BaseSelect } from "../select";
import { ButtonSolid } from "../buttons";
import { FindProfileAPI, UpdateProfileAPI } from "../../apis";
import { toastError, toastSuccess } from "../toast";

export default function FormSocialMediaInfo() {
  const [isLoading, setIsLoading] = useState(false);
  const [socialMedias, onSocialMediaChange] = useState<
    { socialMedia: string; linkUrl: string }[]
  >([]);
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

  const findProfile = async () => {
    const data = await FindProfileAPI();
    if (data.isSuccess) {
      setSocialLinks(data.metadata.profile.socialMedias);
    }
  };

  useEffect(() => {
    findProfile();
  }, []);

  const updateProfile = async () => {
    setIsLoading(true);
    const data = await UpdateProfileAPI({
      socialMedias,
    });
    if (data.isSuccess) {
      toastSuccess(data.message);
    } else {
      toastError(data.message);
    }
    setIsLoading(false);
  };

  const handleSubmit = async () => {
    await updateProfile();
  };

  return (
    <div>
      {socialLinks.map((link, index) => (
        <div className="mb-4">
          <div className="font-normal text-sm">Social Link {index + 1}</div>
          <HStack className="mt-4" key={index}>
            <BaseSelect
              options={["Facebook", "Twitter", "Instagram", "LinkedIn"]}
              value={link.socialMedia} // Gán giá trị ban đầu
              onChange={(value) => handleSocialMediaChange(index, value)}
              width="130px"
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
      <ButtonSolid
        children={"Save Changes"}
        className="mt-4"
        isLoading={isLoading}
        onClick={handleSubmit}
      />
    </div>
  );
}
