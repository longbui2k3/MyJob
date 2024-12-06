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

export default function ProjectsProperties() {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state.createCV.state);
  return (
    <div id="projects" className="flex flex-col gap-[5px]">
      <EditorProperty
        placeholder="Projects Header"
        value={state?.projects?.name || ""}
        onChange={(value) => {
          dispatch(setState({ key: "projects.name", value }));
        }}
      />
      <div
        className="font-[500]"
        style={{
          fontSize: "16px",
        }}
      >
        Projects
      </div>
      <Accordion allowToggle>
        {state?.projects?.content.map((content, i) => (
          <Project content={content} i={i} />
        ))}
      </Accordion>

      <ButtonAdd
        onClick={(e) => {
          e.preventDefault();
          dispatch(
            setState({
              key: "projects.content",
              value: [
                ...(state?.projects?.content || []),
                {
                  projectName: "",
                  from: "",
                  to: "",
                  nameOfCustomer: "",
                  teamSize: "",
                  position: "",
                  responsibility: "",
                  technologies: "",
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
        >{`Project ${i + 1}`}</div>
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
          placeholder="Project Name"
          value={content?.projectName || ""}
          onChange={(value) => {
            dispatch(
              setState({
                key: `projects.content.${i}.projectName`,
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
                key: `projects.content.${i}.from`,
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
                key: `projects.content.${i}.to`,
                value,
              })
            );
          }}
          fontSizeLabel="14px"
        />
        <EditorProperty
          placeholder="Team Size"
          value={content?.teamSize || ""}
          onChange={(value) => {
            dispatch(
              setState({
                key: `projects.content.${i}.teamSize`,
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
                key: `projects.content.${i}.position`,
                value,
              })
            );
          }}
          fontSizeLabel="14px"
        />
        <EditorProperty
          placeholder="Responsibility"
          value={content?.responsibility || ""}
          onChange={(value) => {
            dispatch(
              setState({
                key: `projects.content.${i}.responsibility`,
                value,
              })
            );
          }}
          fontSizeLabel="14px"
        />
        <EditorProperty
          placeholder="Technologies"
          value={content?.technologies || ""}
          onChange={(value) => {
            dispatch(
              setState({
                key: `projects.content.${i}.technologies`,
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
