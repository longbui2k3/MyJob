import { IoDocumentTextOutline } from "react-icons/io5";
import { Heading6 } from "../headings";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { HiOutlineEllipsisVertical } from "react-icons/hi2";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { getRoute, UPDATE_CV_KEY } from "../../helpers/constants";

interface CreatedResumeInfoProps {
  _id?: string;
  name?: string;
}

export default function CreatedResumeInfo({
  _id = "",
  name = "",
}: CreatedResumeInfoProps) {
  const navigate = useNavigate();
  function onEdit() {
    navigate(
      getRoute(UPDATE_CV_KEY, {
        param: {
          id: _id,
        },
      }).path
    );
  }
  function onDelete() {}
  return (
    <div
      className="relative bg-[--gray-100] h-[150px] flex justify-center items-center p-[20px] rounded-sm cursor-pointer"
      onClick={() => {}}
    >
      <div className="absolute top-[10px] right-[10px]">
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={
              <HiOutlineEllipsisVertical size={20} color="var(--gray-500)" />
            }
            variant="outline"
            border={"none"}
            _hover={{ bg: "none" }}
          />
          <MenuList style={{ width: "120px" }}>
            <MenuItem
              icon={<CiEdit size={20} color="var(--primary-500)" />}
              bg={"var(--primary-50)"}
              color={"var(--primary-500)"}
              onClick={onEdit}
            >
              Edit Resume
            </MenuItem>
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

      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col items-center">
          <IoDocumentTextOutline size={40} color={"var(--primary-500)"} />
          <div className="flex justify-center mt-3">
            <Heading6 name={name} />
          </div>
        </div>
      </div>
    </div>
  );
}
