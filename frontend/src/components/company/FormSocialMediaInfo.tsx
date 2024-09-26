import { Button, HStack, IconButton, Input, Select } from "@chakra-ui/react";
import { IoIosAddCircleOutline, IoIosCloseCircleOutline } from "react-icons/io";

export default function FormSocialMediaInfo() {
  return (
    <div>
      <HStack>
        <Select flex="1">
          <option value="Facebook">Facebook</option>
          <option value="Twitter">Twitter</option>
          <option value="Instagram">Instagram</option>
          <option value="LinkedIn">LinkedIn</option>
        </Select>
        <Input flex="4" placeholder="Profile link/url..." />
        <IconButton
          aria-label="Delete link"
          icon={<IoIosCloseCircleOutline size={20} />}
        />
      </HStack>
      <Button
        className="w-full mt-5"
        fontWeight={"500"}
        leftIcon={<IoIosAddCircleOutline size={22} />}
      >
        Add New Social Link
      </Button>
    </div>
  );
}
