import { FiArrowRight } from "react-icons/fi";
import { ButtonSolid_2 } from "../buttons";
import { Heading6 } from "../headings";
import { FaBookmark } from "react-icons/fa";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { TfiEmail } from "react-icons/tfi";
import { GoDownload } from "react-icons/go";

export default function SavedCandidate() {
  return (
    <div className="flex border-b p-4 justify-between">
      <div className="flex items-center space-x-3">
        <img
          width={"50px"}
          height={"50px"}
          className="rounded-md aspect-square"
        />
        <div>
          <Heading6 name="Cameron Williamson" />
          <p className="text-gray-500 text-sm">Marketing Officer</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <FaBookmark
          fontSize={"25px"}
          className="my-auto"
          color="var(--primary-500)"
        />
        <ButtonSolid_2
          children={"View Profile"}
          rightIcon={<FiArrowRight className="text-[18px]" />}
        />
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HiOutlineDotsVertical />}
            variant="outline"
          />
          <MenuList>
            <MenuItem icon={<TfiEmail size={20} />}>Send Email</MenuItem>
            <MenuItem icon={<GoDownload size={20} />}>Download Cv</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
}
