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

export default function CertificationsProperties() {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state.createCV.state);
  return (
    <div id="certifications" className="flex flex-col gap-[5px]">
      <EditorProperty
        placeholder="Certifications Header"
        value={state?.certifications?.name || ""}
        onChange={(value) => {
          dispatch(setState({ key: "certifications.name", value }));
        }}
      />
      <div
        className="font-[500]"
        style={{
          fontSize: "16px",
        }}
      >
        Certifications
      </div>
      <Accordion allowToggle>
        {state?.certifications?.content.map((content, i) => (
          <Certification content={content} i={i} />
        ))}
      </Accordion>

      <ButtonAdd
        onClick={(e) => {
          e.preventDefault();
          dispatch(
            setState({
              key: "certifications.content",
              value: [
                ...(state?.certifications?.content || []),
                {
                  time: "",
                  certificationName: "",
                },
              ],
            })
          );
        }}
      />
    </div>
  );
}

function Certification({ content, i }: { content: any; i: number }) {
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
        >{`Certification ${i + 1}`}</div>
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
          placeholder="Time"
          value={content?.time || ""}
          onChange={(value) => {
            dispatch(
              setState({
                key: `certifications.content.${i}.time`,
                value,
              })
            );
          }}
          fontSizeLabel="14px"
        />
        <EditorProperty
          placeholder="Certification Name"
          value={content?.certificationName || ""}
          onChange={(value) => {
            dispatch(
              setState({
                key: `certifications.content.${i}.certificationName`,
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
