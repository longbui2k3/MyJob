import { Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";

interface EmailProps {
  label?: string;
  onDeleteClick?: () => void;
}
export default function Email({
  label = "",
  onDeleteClick = () => {},
}: EmailProps) {
  return (
    <Tag
      size={"18px"}
      borderRadius="full"
      color={"var(--gray-100)"}
      padding={"0px 13px"}
      height={"30px"}
    >
      <TagLabel
        textColor={"var(--gray-900)"}
        fontSize={"13px"}
        fontWeight={"500"}
        marginRight={"7px"}
      >
        {label}
      </TagLabel>
      <TagCloseButton
        color={"var(--gray-900)"}
        bg={"white"}
        onClick={onDeleteClick}
      />
    </Tag>
  );
}
