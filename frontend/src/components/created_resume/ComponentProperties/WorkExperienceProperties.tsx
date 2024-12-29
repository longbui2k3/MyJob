import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import { ButtonAdd, EditorProperty } from "../Components";
import { useDispatch, useSelector } from "react-redux";
import { setState } from "../../../features";
import { HiOutlineXMark } from "react-icons/hi2";

export default function WorkExperienceProperties() {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state.createCV.state);
  return (
    <div id="work_experience" className="flex flex-col gap-[5px]">
      <EditorProperty
        placeholder="Work Experience Header"
        value={state?.workExperience?.name || ""}
        onChange={(value) => {
          dispatch(setState({ key: "workExperience.name", value }));
        }}
      />
      <div
        className="font-[500]"
        style={{
          fontSize: "16px",
        }}
      >
        Companies
      </div>
      <Accordion allowToggle>
        {state?.workExperience?.content.map((content, i) => (
          <Company content={content} i={i} />
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

function Company({ content, i }: { content: any; i: number }) {
  const state = useSelector((state: any) => state.createCV.state);
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
        <div className="flex gap-2 items-center">
          {state.workExperience.content.length > 1 ? (
            <HiOutlineXMark
              color="var(--danger-500)"
              size={20}
              onClick={(e) => {
                e.preventDefault();
                dispatch(
                  setState({
                    key: "workExperience.content",
                    value: [
                      ...state.workExperience.content.slice(0, i),
                      ...state.workExperience.content.slice(i + 1),
                    ],
                  })
                );
              }}
            />
          ) : (
            ""
          )}
          <AccordionIcon />
        </div>
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
