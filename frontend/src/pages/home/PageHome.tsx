import { PopularCategory } from "../../components/category";
import { FeaturedJob } from "../../components/job";
import { TopCompanies } from "../../components/company";
import {
  HeroSection,
  HowItWorks,
  MostPopularVacancies,
  RegisterNow,
} from "../../components/home";
import { ClientsTestimonial } from "../../components/comment";

export default function PageHome() {
  return (
    <>
      <HeroSection />
      {/* <MostPopularVacancies /> */}
      <FeaturedJob />
      <HowItWorks />
      <TopCompanies />
      <PopularCategory />
      <ClientsTestimonial />
      <RegisterNow />
    </>
  );
}
