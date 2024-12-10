import { useDispatch, useSelector } from "react-redux";
import { OutsideForm } from "../global";
import { useEffect, useState } from "react";
import { closeFormSendEmail } from "../../features";
import { ButtonSolid, ButtonSolid_2, ButtonSubmit } from "../buttons";
import BaseInput from "../inputs/Input/BaseInput";
import Email from "./Email";
import { FindJobAPI, SendEmailAPI } from "../../apis";
import { toastError, toastSuccess } from "../toast";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { RichTextEditer } from "../inputs/RichTextEditer";

export default function FormSendEmail() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const id = useSelector((state: any) => state.openForm.id);
  const data = useSelector((state: any) => state.openForm.data);
  const [inputEmail, setInputEmail] = useState("");
  const [job, setJob] = useState<any>({});
  const [toList, setToList] = useState<Array<any>>([]);
  const [activeTab, setActiveTab] = useState(0);

  const placeholders = {
    "Job Title": `${job.jobTitle}`,
    "Company Name": `${job.company?.companyName}`,
    "Map Location": `${job.company?.mapLocation}`,
  };

  const initialTemplates = [
    {
      subject: "Interview Invite",
      content: `Dear you,\n\nThank you for applying for the [Job Title] position at [Company Name]. We are pleased to invite you to the next step in our hiring process.\n\nInterview Details:\n- Date: December 10, 2024\n- Time: 9:00 AM\n- Location: [Map Location]\n\nBest regards,\nHR Team\n[Company Name]`,
    },
    {
      subject: "Interview Pass",
      content: `Dear you,\n\nCongratulations! You have successfully passed the interview for the [Job Title] position at [Company Name]. Our HR team will reach out to you shortly to discuss the next steps.\n\nBest regards,\nHR Team\n[Company Name]`,
    },
    {
      subject: "Interview Fail",
      content: `Dear you,\n\nThank you for attending the interview for the [Job Title] position at [Company Name]. Unfortunately, we have decided to move forward with other candidates at this time.\n\nWe appreciate your interest in joining our team and wish you success in your future endeavors.\n\nBest regards,\nHR Team\n[Company Name]`,
    },
    { subject: "", content: "" },
  ];
  const [templates, setTemplates] = useState(initialTemplates);

  useEffect(() => {
    if (job) {
      const replacedTemplates = initialTemplates.map((template) => {
        let content = template.content;

        for (const [key, value] of Object.entries(placeholders)) {
          const placeholderRegex = new RegExp(`\\[${key}\\]`, "g");
          content = content.replace(placeholderRegex, value || "");
        }
        return {
          ...template,
          content,
        };
      });
      setTemplates(replacedTemplates);
    }
  }, [job]);

  useEffect(() => {
    if (data) {
      if (Array.isArray(data)) setToList([...toList, ...data]);
      else setToList([...toList, data]);
    }
  }, [data]);

  async function findJob() {
    const data = await FindJobAPI(id);
    if (data.isSuccess) {
      setJob(data.metadata.job);
    }
  }
  useEffect(() => {
    if (id) findJob();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    const { subject, content } = templates[activeTab];
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

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  return (
    <OutsideForm
      closeForm={closeFormSendEmail}
      header={`Send email`}
      onSubmit={handleSubmit}
      width="550px"
      height="620px"
    >
      <>
        <div className="flex gap-2 w-full">
          <div className="w-full">
            <BaseInput
              label="To"
              onChange={(e) => {
                setInputEmail(e.target.value);
              }}
              value={inputEmail}
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
            key={i}
            label={to}
            onDeleteClick={() => {
              const list = [...toList];
              list.splice(i, 1);
              setToList(list);
            }}
          />
        ))}

        <Tabs
          variant="soft-rounded"
          colorScheme="blue"
          onChange={handleTabChange}
        >
          <TabList>
            <Tab>Interview Invite</Tab>
            <Tab>Interview Pass</Tab>
            <Tab>Interview Fail</Tab>
            <Tab>Other</Tab>
          </TabList>

          <TabPanels>
            {templates.map((template, index) => (
              <TabPanel key={index}>
                <>
                  <BaseInput
                    label={"Subject"}
                    placeholder={"Subject"}
                    value={template.subject}
                    onChange={(e) => {
                      const updatedTemplates = [...templates];
                      updatedTemplates[index].subject = e.target.value;
                      setTemplates(updatedTemplates);
                    }}
                    required={false}
                  />
                  <div className="h-3" />
                  <RichTextEditer
                    label={"Content"}
                    placeholder={"Content"}
                    value={template.content.replace(/\n/g, "<br>")}
                    onChange={(value) => {
                      if (value !== template.content) {
                        const updatedTemplates = [...templates];
                        updatedTemplates[index].content = value;
                        setTemplates(updatedTemplates);
                      }
                    }}
                  />
                </>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>

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
