import { useDispatch, useSelector } from "react-redux";
import { ButtonAdd, EditorProperty } from "../Components";
import { setState } from "../../../features";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";

export default function EducationProperties() {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state.createCV.state);
  return (
    <div id="education" className="flex flex-col gap-[5px]">
      <EditorProperty
        placeholder="Education Header"
        value={state?.education?.name || ""}
        onChange={(value) => {
          dispatch(setState({ key: "education.name", value }));
        }}
      />
      <div
        className="font-[500]"
        style={{
          fontSize: "16px",
        }}
      >
        Educations
      </div>
      <Accordion allowToggle>
        {state?.education?.content.map((content, i) => (
          <Education content={content} i={i} />
        ))}
      </Accordion>

      <ButtonAdd
        onClick={(e) => {
          e.preventDefault();
          dispatch(
            setState({
              key: "education.content",
              value: [
                ...(state?.education?.content || []),
                {
                  from: "",
                  to: "",
                  courses: "",
                  schoolName: "",
                  educationDescription: "",
                },
              ],
            })
          );
        }}
      />
    </div>
  );
}

function Education({ content, i }: { content: any; i: number }) {
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
        >{`Education  ${i + 1}`}</div>
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
          placeholder="From"
          value={content?.from || ""}
          onChange={(value) => {
            dispatch(
              setState({
                key: `education.content.${i}.from`,
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
                key: `education.content.${i}.to`,
                value,
              })
            );
          }}
          fontSizeLabel="14px"
        />
        <EditorProperty
          placeholder="Courses"
          value={content?.courses || ""}
          onChange={(value) => {
            dispatch(
              setState({
                key: `education.content.${i}.courses`,
                value,
              })
            );
          }}
          fontSizeLabel="14px"
        />
        <EditorProperty
          placeholder="School Name"
          value={content?.schoolName || ""}
          onChange={(value) => {
            dispatch(
              setState({
                key: `education.content.${i}.schoolName`,
                value,
              })
            );
          }}
          fontSizeLabel="14px"
        />
        <EditorProperty
          placeholder="Education Description"
          value={content?.educationDescription || ""}
          onChange={(value) => {
            dispatch(
              setState({
                key: `education.content.${i}.educationDescription`,
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
