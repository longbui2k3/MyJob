import { FaRegBuilding, FaUsers } from "react-icons/fa";
import { useAuthContext } from "../../context";
import { Heading5 } from "../headings";
import FunFacts from "./FunFacts";
import { PiBriefcaseLight } from "react-icons/pi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { GeneralStatisticsAPI } from "../../apis";
export default function AdminOverview() {
  const { user } = useAuthContext();

  const [statistics, setStatistics] = useState<{ [key: string]: any }>({});

  async function getStatistics() {
    const data = await GeneralStatisticsAPI();
    if (data.isSuccess) {
      setStatistics(data.metadata);
    }
  }

  useEffect(() => {
    getStatistics();
  }, []);

  return (
    <div className="space-y-7">
      <div>
        <Heading5
          name={`Hello, ${
            typeof user !== "string" ? user?.fullName || user?.username : ""
          }`}
        />
        <p className="text-gray-500">
          Here is your daily activities and job alerts
        </p>
      </div>
      <div className="flex space-x-4">
        <FunFacts
          number={statistics?.openJobs || 0}
          title="Open Jobs"
          onClick={() => {}}
          classname="bg-[--primary-50]"
          Icon={PiBriefcaseLight}
          iconColor="var(--primary-500)"
        />
        <FunFacts
          number={statistics?.candidates || 0}
          title="Candidates"
          onClick={() => {}}
          classname="bg-[--warning-50]"
          Icon={FaUsers}
          iconColor="var(--warning-500)"
        />
        <FunFacts
          number={statistics?.companies || 0}
          title="Companies"
          onClick={() => {}}
          classname="bg-[--success-50]"
          Icon={FaRegBuilding}
          iconColor="var(--success-500)"
        />
        <FunFacts
          number={statistics?.applications || 0}
          title="Applications"
          onClick={() => {}}
          classname="bg-[--danger-50]"
          Icon={IoDocumentTextOutline}
          iconColor="var(--danger-500)"
        />
      </div>
      <div>
        {/* <div className="flex items-center justify-between mb-2">
          <Heading6 name="Recently Posted Jobs" />
          <ButtonOutline
            children={"View all"}
            rightIcon={<FiArrowRight className="text-[18px]" />}
            onClick={() => {
              navigate(getRoute(DASHBOARD_MY_JOBS_KEY).path, {
                replace: true,
              });
            }}
          />
        </div>
        <MyJobs isCheck={false} limit={5} /> */}
      </div>
    </div>
  );
}
