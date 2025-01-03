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
import { HiOutlineXMark } from "react-icons/hi2";

export default function AwardsProperties() {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state.createCV.state);
  return (
    <div id="awards" className="flex flex-col gap-[5px]">
      <EditorProperty
        placeholder="Awards Header"
        value={state?.awards?.name || ""}
        onChange={(value) => {
          dispatch(setState({ key: "awards.name", value }));
        }}
      />
      <div
        className="font-[500]"
        style={{
          fontSize: "16px",
        }}
      >
        Awards
      </div>
      <Accordion allowToggle>
        {state?.awards?.content.map((content, i) => (
          <Award content={content} i={i} />
        ))}
      </Accordion>

      <ButtonAdd
        onClick={(e) => {
          e.preventDefault();
          dispatch(
            setState({
              key: "awards.content",
              value: [
                ...(state?.awards?.content || []),
                {
                  time: "",
                  awardName: "",
                },
              ],
            })
          );
        }}
      />
    </div>
  );
}

function Award({ content, i }: { content: any; i: number }) {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state.createCV.state);
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
        >{`Award ${i + 1}`}</div>
        <div className="flex gap-2 items-center">
          {state.awards.content.length > 1 ? (
            <HiOutlineXMark
              color="var(--danger-500)"
              size={20}
              onClick={(e) => {
                e.preventDefault();
                dispatch(
                  setState({
                    key: "awards.content",
                    value: [
                      ...state.awards.content.slice(0, i),
                      ...state.awards.content.slice(i + 1),
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
          placeholder="Time"
          value={content?.time || ""}
          onChange={(value) => {
            dispatch(
              setState({
                key: `awards.content.${i}.time`,
                value,
              })
            );
          }}
          fontSizeLabel="14px"
        />
        <EditorProperty
          placeholder="Award Name"
          value={content?.awardName || ""}
          onChange={(value) => {
            dispatch(
              setState({
                key: `awards.content.${i}.awardName`,
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
