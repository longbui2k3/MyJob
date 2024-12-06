import { useDispatch, useSelector } from "react-redux";
import { OutsideForm } from "../global";
import { useState } from "react";
import { closeFormSendEmail } from "../../features";
import { ButtonSolid, ButtonSolid_2, ButtonSubmit } from "../buttons";
import { RichTextEditer } from "../inputs/RichTextEditer";
import useInput from "../inputs/Input/useInput";
import BaseInput from "../inputs/Input/BaseInput";
import Email from "./Email";
import { SendEmailAPI } from "../../apis";
import { toastError, toastSuccess } from "../toast";

export default function FormSendEmail() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.openForm.data);
  console.log("check", data);
  async function handleSubmit(e) {
    e.preventDefault();
    if (!subject || !content) return;
    setIsLoading(true);
    const data = await SendEmailAPI({ toList, subject, html: content });
    if (data.isSuccess) {
      toastSuccess("Send email successfully!");
      dispatch(closeFormSendEmail());
    } else {
      toastError("Error send email!");
    }
    setIsLoading(false);
  }
  const { input: subject, setInput: setSubject } = useInput({
    defaultValue: "",
  });
  const { input: content, setInput: setContent } = useInput({
    defaultValue: "",
  });
  const [inputEmail, setInputEmail] = useState("");
  const [toList, setToList] = useState<Array<any>>([]);
  return (
    <OutsideForm
      closeForm={closeFormSendEmail}
      header={`Send email`}
      onSubmit={handleSubmit}
      height="500px"
    >
      <>
        <div className="flex gap-2 w-full">
          <div className="w-full">
            <BaseInput
              label="To"
              onChange={(e) => {
                setInputEmail(e.target.value);
              }}
              value={data ? data : inputEmail}
            />
          </div>
          <ButtonSolid
            children={"Add"}
            className="mt-[28px]"
            onClick={(e) => {
              e.preventDefault();
              setToList([...toList, inputEmail]);
              setInputEmail("");
            }}
          />
        </div>
        {toList.map((to, i) => (
          <Email
            label={to}
            onDeleteClick={() => {
              const list = toList;
              list.splice(i, 1);
              console.log(list);
              setToList([...list]);
            }}
          />
        ))}
        <BaseInput
          label={"Subject"}
          placeholder={"Subject"}
          value={subject ? subject : ""}
          onChange={(e) => setSubject(e.target.value)}
        />
        <RichTextEditer
          label={"Content"}
          placeholder={"Content"}
          value={content ? content : ""}
          onChange={setContent}
        />
        <div className="flex justify-between">
          <ButtonSolid_2
            width="160px"
            height="40px"
            onClick={() => {
              dispatch(closeFormSendEmail());
            }}
          >
            Cancel
          </ButtonSolid_2>
          <ButtonSubmit
            label="Send"
            isLoading={isLoading}
            width="160px"
            height="40px"
          />
        </div>
      </>
    </OutsideForm>
  );
}
