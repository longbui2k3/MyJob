import { IconButton } from "@chakra-ui/react";
import { Heading5 } from "../headings";
import { GoPlus } from "react-icons/go";
import { useDispatch } from "react-redux";
import { openForm } from "../../features";
import { CustomTooltip } from "../global";

export default function DashboardCategory() {
  const dispatch = useDispatch();
  return (
    <>
      <div className="flex justify-between">
        <Heading5 name="Categories" />
        <CustomTooltip label="Create category">
          <IconButton
            aria-label="Create category"
            icon={<GoPlus size={30} />}
            borderRadius={"100%"}
            color={"var(--gray-200)"}
            background={"none"}
            border={"1px"}
            _hover={{
              color: "var(--primary-500)",
            }}
            onClick={() => {
              dispatch(openForm());
            }}
          />
        </CustomTooltip>
      </div>
    </>
  );
}
