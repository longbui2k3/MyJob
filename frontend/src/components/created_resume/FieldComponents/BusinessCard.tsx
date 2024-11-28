import { Input } from "@chakra-ui/react";
import { useSelector } from "react-redux";

export default function BusinessCard() {
  const state = useSelector((state: any) => state.createCV.state);

  return (
    <div id="business_card">
      <Input
        type="text"
        placeholder="Full Name"
        style={{
          fontWeight: 500,
          fontSize: "30px",
        }}
        value={state?.fullName || ""}
        border={"0px"}
      />
      <Input
        type="text"
        placeholder="Position"
        style={{
          fontSize: "13px",
        }}
        value={state?.position || ""}
        border={"0px"}
      />
    </div>
  );
}
