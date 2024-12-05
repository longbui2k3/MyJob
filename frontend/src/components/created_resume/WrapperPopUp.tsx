import { IconButton } from "@chakra-ui/react";
import React from "react";
import { RiDeleteBinLine, RiDragMove2Fill } from "react-icons/ri";
import { setDeleteType } from "../../features";
import { useDispatch } from "react-redux";

interface WrapperPopUpProps {
  attributes: any;
  listeners: any;
  type?: string
}

export default React.forwardRef(
  ({ attributes, listeners, type }: WrapperPopUpProps, ref: any) => {
    const dispatch = useDispatch();
    return (
      <>
        <div
          className="absolute border-[--primary-500] border-[1px] top-0 h-full w-full rounded-md hidden"
          ref={ref}
        >
          <div className="absolute top-[-36px] left-[10px] flex gap-2 p-[5px] bg-[--gray-200] opacity-75 rounded-t-md z-[10]">
            <IconButton
              height="25px"
              width={"25px"}
              icon={<RiDragMove2Fill size={18} color="var(--primary-500)" />}
              aria-label="Drag"
              minWidth={"25px"}
              {...attributes}
              {...listeners}
            />
            <IconButton
              height="25px"
              width={"25px"}
              icon={<RiDeleteBinLine size={18} color="var(--danger-500)" />}
              aria-label="Drag"
              minWidth={"25px"}
              bg={"var(--danger-50)"}
              onClick={(e) => {
                e.preventDefault();
                dispatch(setDeleteType(type));
              }}
            />
          </div>
        </div>
      </>
    );
  }
);
