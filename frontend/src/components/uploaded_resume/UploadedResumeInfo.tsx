import { IoDocumentTextOutline } from "react-icons/io5";
import { Heading6 } from "../headings";
import { Text } from "../text";
import { HiOutlineEllipsisHorizontal } from "react-icons/hi2";
import {
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
} from "@chakra-ui/react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { AiOutlineEye } from "react-icons/ai";

interface UploadedResumeInfoProps {
  title?: string;
  file_size?: string;
  file_url?: string;
  type?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onClick?: () => void;
}

export default function UploadedResumeInfo({
  title = "",
  file_size = "0",
  file_url,
  type = "view", //upload, view
  onEdit = () => {},
  onDelete = () => {},
  onClick = () => {},
}: UploadedResumeInfoProps) {
  const dispatch = useDispatch();

  return (
    <div className="bg-[--gray-100] h-[70px] flex justify-between items-center p-[20px] rounded-sm">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <IoDocumentTextOutline size={30} color={"var(--primary-500)"} />
          <div className="flex flex-col space-y-1 justify-between ml-[10px]">
            <div onClick={onClick}>
              <Heading6
                name={title}
                className="hover:text-[--primary-500] hover:underline cursor-pointer"
              />
            </div>
            <Text className="mt-[0px]">{file_size}</Text>
          </div>
        </div>
      </div>
      <div className="flex items-center ">
        <Button
          leftIcon={<AiOutlineEye size={16} color="var(--primary-500)" />}
          bg={"var(--primary-50)"}
          onClick={onClick}
          _hover={{
            bg: "var(--primary-50)",
          }}
          padding={"0px 5px"}
          fontSize={"11px"}
          color="var(--primary-500)"
          borderRadius={"10px"}
          height={"30px"}
        >
          View CV
        </Button>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={
              <HiOutlineEllipsisHorizontal size={20} color="var(--gray-500)" />
            }
            variant="outline"
            border={"none"}
            _hover={{ bg: "none" }}
            padding={"0px"}
          />
          <MenuList style={{ width: "120px" }}>
            {type === "view" ? (
              <MenuItem
                icon={<CiEdit size={20} color="var(--primary-500)" />}
                bg={"var(--primary-50)"}
                color={"var(--primary-500)"}
                onClick={onEdit}
              >
                Edit Resume
              </MenuItem>
            ) : (
              ""
            )}
            <MenuItem
              icon={<RiDeleteBin6Line size={20} color="var(--danger-500)" />}
              bg={"var(--danger-50)"}
              color={"var(--danger-500)"}
              onClick={onDelete}
            >
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
}
