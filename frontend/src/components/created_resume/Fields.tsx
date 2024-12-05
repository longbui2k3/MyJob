import {
  Activities,
  AdditionalInformation,
  BusinessCard,
  Certifications,
  Education,
  Interests,
  Objective,
  PersonalInformation,
  Projects,
  Referrers,
  Skills,
  WorkExperience,
} from "./FieldComponents";

// These will be available from the sidebar

// These define how we render the field
export const renderers: any = {
  business_card: <BusinessCard />,
  personal_information: <PersonalInformation />,
  objective: <Objective />,
  work_experience: <WorkExperience />,
  projects: <Projects />,
  education: <Education />,
  skills: <Skills />,
  certifications: <Certifications />,
  referrers: <Referrers />,
  activities: <Activities />,
  interests: <Interests />,
  additionalInformation: <AdditionalInformation />,
};
