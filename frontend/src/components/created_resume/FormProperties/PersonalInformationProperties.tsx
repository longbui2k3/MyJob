import { FormControl } from "@chakra-ui/react";
import InputProperties from "./InputProperties";
import { useDispatch, useSelector } from "react-redux";
import { setState } from "../../../features";

export default function PersonalInformationProperties() {
  const state = useSelector((state: any) => state.createCV.state);
  const dispatch = useDispatch();

  return (
    <FormControl className="flex flex-col gap-2">
      <InputProperties
        label={"Phone"}
        placeholder="Please fill your phone"
        value={state?.phone || ""}
        onChange={(e) => {
          dispatch(
            setState({
              key: "phone",
              value: e.target.value,
            })
          );
        }}
      />
      <InputProperties
        label={"Email"}
        placeholder="Please fill your email"
        value={state?.email || ""}
        onChange={(e) => {
          dispatch(
            setState({
              key: "email",
              value: e.target.value,
            })
          );
        }}
      />
      <InputProperties
        label={"Location"}
        placeholder="Please fill your location"
        value={state?.location || ""}
        onChange={(e) => {
          dispatch(
            setState({
              key: "location",
              value: e.target.value,
            })
          );
        }}
      />
      <InputProperties
        label={"Information"}
        placeholder="Please fill your information"
        value={state?.information || ""}
        onChange={(e) => {
          dispatch(
            setState({
              key: "information",
              value: e.target.value,
            })
          );
        }}
      />
    </FormControl>
  );
}
