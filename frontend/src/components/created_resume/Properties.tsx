import { useSelector } from "react-redux";
import {
  BusinessCardProperties,
  ObjectiveProperties,
  PersonalInformationProperties,
  WorkExperienceProperties,
} from "./ComponentProperties";

const PropertiesComp: { [key: string]: JSX.Element } = {
  business_card: <BusinessCardProperties />,
  personal_information: <PersonalInformationProperties />,
  objective: <ObjectiveProperties />,
  work_experience: <WorkExperienceProperties />,
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
