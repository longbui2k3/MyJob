import { useSelector } from "react-redux";
import {
  ActivitiesProperties,
  AdditionalInformationProperties,
  AwardsProperties,
  BusinessCardProperties,
  CertificationsProperties,
  EducationProperties,
  InterestsProperties,
  ObjectiveProperties,
  PersonalInformationProperties,
  ProjectsProperties,
  ReferrersProperties,
  SkillsProperties,
  WorkExperienceProperties,
} from "./ComponentProperties";

const PropertiesComp: { [key: string]: JSX.Element } = {
  business_card: <BusinessCardProperties />,
  personal_information: <PersonalInformationProperties />,
  objective: <ObjectiveProperties />,
  work_experience: <WorkExperienceProperties />,
  projects: <ProjectsProperties />,
  education: <EducationProperties />,
  skills: <SkillsProperties />,
  awards: <AwardsProperties />,
  certifications: <CertificationsProperties />,
  referrers: <ReferrersProperties />,
  activities: <ActivitiesProperties />,
  interests: <InterestsProperties />,
  additionalInformation: <AdditionalInformationProperties />,
};

export default function Properties() {
  const selectedElement = useSelector(
    (state) => state.createCV.selectedElement
  );
  return (
    <div className="h-full p-[20px]">
      <div className="h-full">
        {selectedElement && selectedElement?.id ? (
          <>{PropertiesComp[selectedElement?.id]}</>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
