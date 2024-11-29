import { Input } from "@chakra-ui/react";
import { useSelector } from "react-redux";

export default function Objective() {
  const state = useSelector((state: any) => state.createCV.state);

  return (
    <div
      id="objective"
      className="relative py-[10px] flex flex-col justify-between h-[80px]"
    >
      <Input
        type="text"
        placeholder="Name"
        style={{
          fontWeight: 500,
          fontSize: "25px",
          width: "200px",
          height: "40px",
          position: "absolute",
          top: "-10px",
          left: "0px",
        }}
        value={state?.objective?.name || ""}
        border={"0px"}
      />
      <div></div>
      <Input
        type="text"
        placeholder="Content"
        style={{
          fontSize: "13px",
          height: "25px",
        }}
        value={state?.objective?.content || ""}
        border={"0px"}
      />
    </div>
  );
}
