import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  FormLabel,
} from "@chakra-ui/react";
import { ButtonAdd, Editor, EditorProperty } from "../Components";
import { useDispatch, useSelector } from "react-redux";
import { setState } from "../../../features";
import { useRef } from "react";

export default function WorkExperienceProperties() {
  const nameRef = useRef<any>();
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state.createCV.state);
  return (
    <div id="work_experience" className="flex flex-col gap-[5px]">
      <FormLabel>Work Experience Name</FormLabel>
      <Editor
        placeholder="Work Experience Name"
        value={state?.workExperience?.name || ""}
        onChange={(value) => {
          dispatch(setState({ key: "workExperience.name", value }));
        }}
        hasToolbar={true}
        isSingleLine={true}
        ref={nameRef}
      />
      <FormLabel>Companies</FormLabel>
      <Accordion allowToggle>
        {state?.workExperience?.content.map((content, i) => (
          <Project content={content} i={i} />
        ))}
      </Accordion>

      <ButtonAdd
        onClick={(e) => {
          e.preventDefault();
          dispatch(
            setState({
              key: "workExperience.content",
              value: [
                ...(state?.workExperience?.content || []),
                {
                  companyName: "",
                  from: "",
                  to: "",
                  position: "",
                  experienceDescription: "",
                },
              ],
            })
          );
        }}
      />
    </div>
  );
}

function Project({ content, i }: { content: any; i: number }) {
  const dispatch = useDispatch();
  return (
    <AccordionItem>
      <AccordionButton
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "fit-content",
        }}
      >
        <div
          style={{
            fontWeight: 500,
            fontSize: "14px",
          }}
        >{`Company  ${i + 1}`}</div>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
        }}
      >
        <EditorProperty
          placeholder="Company Name"
          value={content?.companyName || ""}
          onChange={(value) => {
            dispatch(
              setState({
                key: `workExperience.content.${i}.companyName`,
                value,
              })
            );
          }}
          fontSizeLabel="14px"
        />
        <EditorProperty
          placeholder="From"
          value={content?.from || ""}
          onChange={(value) => {
            dispatch(
              setState({
                key: `workExperience.content.${i}.from`,
                value,
              })
            );
          }}
          fontSizeLabel="14px"
        />
        <EditorProperty
          placeholder="To"
          value={content?.to || ""}
          onChange={(value) => {
            dispatch(
              setState({
                key: `workExperience.content.${i}.to`,
                value,
              })
            );
          }}
          fontSizeLabel="14px"
        />
        <EditorProperty
          placeholder="Position"
          value={content?.position || ""}
          onChange={(value) => {
            dispatch(
              setState({
                key: `workExperience.content.${i}.position`,
                value,
              })
            );
          }}
          fontSizeLabel="14px"
        />
        <EditorProperty
          placeholder="Experience Description"
          value={content?.experienceDescription || ""}
          onChange={(value) => {
            dispatch(
              setState({
                key: `workExperience.content.${i}.experienceDescription`,
                value,
              })
            );
          }}
          fontSizeLabel="14px"
        />
      </AccordionPanel>
    </AccordionItem>
  );
}
