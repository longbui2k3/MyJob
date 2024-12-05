import { FormLabel, Icon, IconButton } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { setState } from "../../../features";
import { ButtonAdd, Editor, EditorProperty } from "../Components";
import { useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { ButtonSolid } from "../../buttons";

export default function PersonalInformationProperties() {
  const state = useSelector((state: any) => state.createCV.state);
  const dispatch = useDispatch();
  const emailRef = useRef<any>(null);
  const phoneRef = useRef<any>(null);
  const locationRef = useRef<any>(null);
  return (
    <div id="personal_information" className="flex flex-col gap-[5px]">
      <EditorProperty
        placeholder="Email"
        value={state?.email || ""}
        onChange={(value) => {
          dispatch(setState({ key: "email", value }));
        }}
      />
      <EditorProperty
        placeholder="Phone"
        value={state?.phone || ""}
        onChange={(value) => {
          dispatch(setState({ key: "phone", value }));
        }}
      />
      <EditorProperty
        placeholder="Location"
        value={state?.location || ""}
        onChange={(value) => {
          dispatch(setState({ key: "location", value }));
        }}
      />
      {(state.informations || []).map((information, i) => (
        <>
          <EditorProperty
            placeholder="Information"
            value={information || ""}
            onChange={(value) => {
              dispatch(setState({ key: `informations.${i}`, value }));
            }}
          />
        </>
      ))}
      <ButtonAdd
        onClick={(e) => {
          e.preventDefault();
          dispatch(
            setState({
              key: "informations",
              value: [...state.informations, ""],
            })
          );
        }}
      />
    </div>
  );
}
