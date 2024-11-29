import { FormControl } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import InputProperties from "./InputProperties";
import { setState } from "../../../features";

export default function OverviewProperties() {
  const state = useSelector((state: any) => state.createCV.state);
  const dispatch = useDispatch();

  return (
    <FormControl className="flex flex-col gap-2">
      <InputProperties
        label={"Objective name"}
        placeholder="Please fill objective name"
        value={state?.objective?.name || ""}
        onChange={(e) => {
          dispatch(
            setState({
              key: "objective",
              value: {
                name: e.target.value,
                content: state?.objective?.content,
              },
            })
          );
        }}
      />
      <InputProperties
        label="Objective content"
        placeholder="Please fill objective content"
        value={state?.objective?.content || ""}
        onChange={(e) => {
          dispatch(
            setState({
              key: "objective",
              value: {
                name: state?.objective?.name,
                content: e.target.value,
              },
            })
          );
        }}
      />
    </FormControl>
  );
}
