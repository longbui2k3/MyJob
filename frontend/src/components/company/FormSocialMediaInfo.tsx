import { Button, HStack, IconButton, Input, Select } from "@chakra-ui/react";
import { IoIosAddCircleOutline, IoIosCloseCircleOutline } from "react-icons/io";
import { useState } from "react";

export default function FormSocialMediaInfo() {
  const [socialLinks, setSocialLinks] = useState([
    { id: 1, platform: "", url: "" },
  ]);

  const addNewSocialLink = () => {
    setSocialLinks([...socialLinks, { id: Date.now(), platform: "", url: "" }]);
  };

  const removeSocialLink = (id: number) => {
    setSocialLinks(socialLinks.filter((link) => link.id !== id));
  };

  return (
    <div>
      {socialLinks.map((link) => (
        <HStack className="mt-4" key={link.id}>
          <Select flex="1" placeholder="Select platform">
            <option value="Facebook">Facebook</option>
            <option value="Twitter">Twitter</option>
            <option value="Instagram">Instagram</option>
            <option value="LinkedIn">LinkedIn</option>
          </Select>
          <Input flex="4" placeholder="Profile link/url..." />
          <IconButton
            aria-label="Delete link"
            icon={<IoIosCloseCircleOutline size={20} />}
            onClick={() => removeSocialLink(link.id)}
          />
        </HStack>
      ))}
      <Button
        className="w-full mt-5"
        fontWeight={"500"}
        leftIcon={<IoIosAddCircleOutline size={22} />}
        onClick={addNewSocialLink}
      >
        Add New Social Link
      </Button>
    </div>
  );
}
