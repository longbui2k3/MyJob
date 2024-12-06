import { useParams } from "react-router-dom";
import { DEFAULT_PADDING_X } from "../../helpers/constants";
import { useEffect, useState } from "react";
import { FindCompanyAPI } from "../../apis/companyAPI";
import { Heading, Heading5 } from "../headings";
import { Text } from "../text";
import { ButtonSubmit } from "../buttons";
import CompanyOverview from "./CompanyOverview";
import ContactInformation from "./ContactInformation";
import FollowUsOn from "./FollowUsOn";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
export default function CompanyDetail() {
  const { id } = useParams();
  const [company, setCompany] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  async function findCompany() {
    if (!id) return;
    const data = await FindCompanyAPI(id);
    if (data.isSuccess) {
      setCompany(data.metadata.company);
    }
  }
  useEffect(() => {
    setIsLoading(true);
    findCompany();
    setIsLoading(false);
  }, []);
  return (
    <div
      className={`w-full`}
      style={{
        padding: `40px ${DEFAULT_PADDING_X}`,
      }}
    >
      <div className="relative w-full h-[250px] bg-gray-200 rounded-lg border-[1px] border-[--gray-100]">
        <img src={company?.banner} className="h-full w-full rounded-lg" />
        <div
          className="absolute top-[80%] left-[0] flex justify-between space-x-5 items-center bg-white w-[90%] z-1 rounded-md h-[100px] px-[20px] border-[1px] border-[--gray-100]"
          style={{
            left: "calc(5%)",
          }}
        >
          <div className="flex space-x-5 items-center">
            <img
              src={company?.logo}
              width={"70px"}
              // height={"70px"}
              className="rounded-md aspect-square"
            />
            <div className="flex flex-col justify-between">
              <div className="flex space-x-3">
                <Heading5 name={company?.companyName} />
              </div>
              <div className="flex space-x-5">
                <Text className="mt-[6px]">{company?.industryType}</Text>
              </div>
            </div>
          </div>
          <div className="flex space-x-4">
            <ButtonSubmit
              label="View Open Position"
              className="my-auto"
              height="45px"
              width="200px"
              fontSize="14px"
            />
          </div>
        </div>
      </div>
      <div className="flex gap-10 w-full h-[800px] mt-[100px]">
        <Tabs className="flex flex-col gap-6 w-[60%] h-full overflow-auto p-[20px]">
          <TabList>
            <Tab>Information</Tab>
            <Tab>Open Position</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <div>
                <div>
                  <Heading name="About Us" size={17} />
                  <Text>
                    <div
                      dangerouslySetInnerHTML={{ __html: company?.aboutUs }}
                    />
                  </Text>
                </div>
                <div>
                  <Heading name="Company Benefits" size={17} />
                  <Text>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: company?.companyBenefits,
                      }}
                    />
                  </Text>
                </div>
                <div>
                  <Heading name="Company Vision" size={17} />
                  <Text>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: company?.companyVision,
                      }}
                    />
                  </Text>
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="w-full">
                <p>Open Position</p>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>

        <div className="flex flex-col gap-10 w-[40%] h-full">
          <CompanyOverview company={company} />
          <ContactInformation company={company} />
          <FollowUsOn company={company} />
        </div>
      </div>
    </div>
  );
}
