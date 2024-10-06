import { MostPopularVacancies } from "../../components/global";
import { PopularCategory } from "../../components/category";
import { FeaturedJob } from "../../components/job";
import { TopCompanies } from "../../components/company";
import { HeroSection, HowItWorks, RegisterNow } from "../../components/home";
import { ClientsTestimonial } from "../../components/comment";

export default function PageHome() {
  return (
    <>
      <HeroSection />
      <MostPopularVacancies />
      <HowItWorks />
      <PopularCategory />
      <FeaturedJob />
      <TopCompanies />
      <ClientsTestimonial />
      <RegisterNow />
    </>
  );
}
