import { Button } from "@chakra-ui/react";
interface ButtonDisabledProps {
  children?: string | JSX.Element;
  className?: string;
  height?: string;
  width?: string;
  fontSize?: string;
}
export default function ButtonDisabled({
  children,
  className,
  height = "44px",
  width = "100%",
  fontSize = "14px",
}: ButtonDisabledProps) {
  return (
    <Button
      bg="var(--gray-100)"
      className={className}
      width={width}
      height={height}
      color={"var(--gray-500)"}
      fontSize={fontSize}
    >
      {children}
    </Button>
  );
}
