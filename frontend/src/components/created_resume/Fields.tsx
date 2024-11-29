import {
  BusinessCard,
  Objective,
  PersonalInformation,
} from "./FieldComponents";

// These will be available from the sidebar
export const fields = [
  {
    type: "business_card",
    title: "Business Card",
  },
  {
    type: "personal_information",
    title: "Personal Information",
  },
  {
    type: "objective",
    title: "Objective",
  },
];

// These define how we render the field
export const renderers: any = {
  business_card: <BusinessCard />,
  personal_information: <PersonalInformation />,
  objective: <Objective />,
};
