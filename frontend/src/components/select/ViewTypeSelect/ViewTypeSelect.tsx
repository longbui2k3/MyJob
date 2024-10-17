import { IconButton } from "@chakra-ui/react";
import { IoGrid } from "react-icons/io5";
import { PiRowsFill } from "react-icons/pi";
import { ViewTypes } from "../../../helpers/constants";
interface ViewTypeSelectProps {
  viewType: string;
  setViewType: React.Dispatch<React.SetStateAction<ViewTypes>>;
}
export default function ViewTypeSelect({
  viewType = ViewTypes.GRID,
  setViewType,
}: ViewTypeSelectProps) {
  return (
    <div className="flex items-center space-x-2 bg-white px-[6px] py-[4px] rounded-lg border-[1px] border-[inherit]">
      <IconButton
        aria-label="View Type"
        icon={<IoGrid size="18" />}
        bg={viewType === ViewTypes.GRID ? "var(--gray-100)" : "white"}
        size={"sm"}
        onClick={() => {
          setViewType(ViewTypes.GRID);
        }}
        _hover={{
          bg: "var(--gray-100)",
        }}
      />
      <IconButton
        aria-label="View Type"
        icon={<PiRowsFill size="18" />}
        bg={viewType === ViewTypes.ROWS_FILL ? "var(--gray-100)" : "white"}
        size={"sm"}
        onClick={() => {
          setViewType(ViewTypes.ROWS_FILL);
        }}
        _hover={{
          bg: "var(--gray-100)",
        }}
      />
    </div>
  );
}
