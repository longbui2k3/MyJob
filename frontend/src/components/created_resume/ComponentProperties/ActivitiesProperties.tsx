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

export default function ActivitiesProperties() {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state.createCV.state);
  return (
    <div id="activities" className="flex flex-col gap-[5px]">
      <EditorProperty
        placeholder="Activities Header"
        value={state?.activities?.name || ""}
        onChange={(value) => {
          dispatch(setState({ key: "activities.name", value }));
        }}
      />
      <div
        className="font-[500]"
        style={{
          fontSize: "16px",
        }}
      >
        Activities
      </div>
      <Accordion allowToggle>
        {state?.activities?.content.map((content, i) => (
          <Activities content={content} i={i} />
        ))}
      </Accordion>

      <ButtonAdd
        onClick={(e) => {
          e.preventDefault();
          dispatch(
            setState({
              key: "activities.content",
              value: [
                ...(state?.activities?.content || []),
                {
                  from: "",
                  to: "",
                  organizationName: "",
                  position: "",
                  activityDescription: "",
                },
              ],
            })
          );
        }}
      />
    </div>
  );
}

function Activities({ content, i }: { content: any; i: number }) {
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
        >{`Activities  ${i + 1}`}</div>
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
                key: `activities.content.${i}.from`,
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
                key: `activities.content.${i}.to`,
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
                key: `activities.content.${i}.courses`,
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
                key: `activities.content.${i}.position`,
                value,
              })
            );
          }}
          fontSizeLabel="14px"
        />
        <EditorProperty
          placeholder="Activities Description"
          value={content?.activitiesDescription || ""}
          onChange={(value) => {
            dispatch(
              setState({
                key: `activities.content.${i}.activitiesDescription`,
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
