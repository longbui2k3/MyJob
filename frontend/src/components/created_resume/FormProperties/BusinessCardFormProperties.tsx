import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { setState } from "../../../features";
import InputProperties from "./InputProperties";

export default function BusinessCardFormProperties() {
  const state = useSelector((state: any) => state.createCV.state);
  const dispatch = useDispatch();

  return (
    <FormControl className="flex flex-col gap-2">
      <InputProperties
        label={"Full Name"}
        placeholder="Please fill your full name"
        value={state?.fullName || ""}
        onChange={(e) => {
          dispatch(
            setState({
              key: "fullName",
              value: e.target.value,
            })
          );
        }}
      />
      <InputProperties
        label="Position"
        placeholder="Please fill your position"
        value={state?.position || ""}
        onChange={(e) => {
          dispatch(
            setState({
              key: "position",
              value: e.target.value,
            })
          );
        }}
      />
    </FormControl>
  );
}
