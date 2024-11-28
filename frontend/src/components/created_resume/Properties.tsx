import { useSelector } from "react-redux";
import {
  BusinessCardFormProperties,
  PersonalInformationProperties,
} from "./FormProperties";

const properties: { [key: string]: JSX.Element } = {
  business_card: <BusinessCardFormProperties />,
  personal_information: <PersonalInformationProperties />,
};

export default function Properties() {
  const selectedElement = useSelector(
    (state: any) => state.createCV.selectedElement
  );
  console.log("State", selectedElement);
  return (
    <div className="w-full h-full p-[20px]">
      {selectedElement?.id ? properties[selectedElement?.id] : ""}
    </div>
  );
}
