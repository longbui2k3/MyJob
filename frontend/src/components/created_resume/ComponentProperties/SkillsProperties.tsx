import { useDispatch, useSelector } from "react-redux";
import { ButtonAdd, EditorProperty } from "../Components";
import { setState } from "../../../features";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel } from "@chakra-ui/react";
import { HiOutlineXMark } from "react-icons/hi2";

export default function SkillsProperties() {
    const dispatch = useDispatch();
    const state = useSelector((state: any) => state.createCV.state);
    return (
      <div id="skills" className="flex flex-col gap-[5px]">
        <EditorProperty
          placeholder="Skills Header"
          value={state?.skills?.name || ""}
          onChange={(value) => {
            dispatch(setState({ key: "skills.name", value }));
          }}
        />
        <div
          className="font-[500]"
          style={{
            fontSize: "16px",
          }}
        >
          Skills
        </div>
        <Accordion allowToggle>
          {state?.skills?.content.map((content, i) => (
            <Skill content={content} i={i} />
          ))}
        </Accordion>

        <ButtonAdd
          onClick={(e) => {
            e.preventDefault();
            dispatch(
              setState({
                key: "skills.content",
                value: [
                  ...(state?.skills?.content || []),
                  {
                    skillName: "",
                    skillDescription: "",
                  },
                ],
              })
            );
          }}
        />
      </div>
    );
}

function Skill({ content, i }: { content: any; i: number }) {
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
          >{`Skill ${i + 1}`}</div>
          <div className="flex gap-2 items-center">
            {state.skills.content.length > 1 ? (
              <HiOutlineXMark
                color="var(--danger-500)"
                size={20}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(
                    setState({
                      key: "skills.content",
                      value: [
                        ...state.skills.content.slice(0, i),
                        ...state.skills.content.slice(i + 1),
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
            placeholder="Skill Name"
            value={content?.skillName || ""}
            onChange={(value) => {
              dispatch(
                setState({
                  key: `skills.content.${i}.skillName`,
                  value,
                })
              );
            }}
            fontSizeLabel="14px"
          />
          <EditorProperty
            placeholder="Skill Description"
            value={content?.skillDescription || ""}
            onChange={(value) => {
              dispatch(
                setState({
                  key: `skills.content.${i}.skillDescription`,
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