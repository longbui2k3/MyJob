import { FaRegBuilding, FaUsers } from "react-icons/fa";
import { useAuthContext } from "../../context";
import { Heading5 } from "../headings";
import FunFacts from "./FunFacts";
import { PiBriefcaseLight } from "react-icons/pi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { GeneralStatisticsAPI } from "../../apis";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
import { Bar } from "react-chartjs-2";
import { steps } from "framer-motion";

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

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

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
      <div className="grid grid-cols-2 gap-5">
        <div>
          <Bar
            options={{
              scales: {
                yAxes: {
                  ticks: {
                    stepSize: 1,
                  },
                  reverse: false,
                },
              },
            }}
            data={{
              labels: months,
              datasets: [
                {
                  label: "Created Jobs",
                  data: statistics.createdJobsByMonthNum,
                  backgroundColor: "rgba(10, 101, 204, 1)",
                },
              ],
            }}
          />
        </div>
        <div>
          <Bar
            options={{
              scales: {
                yAxes: {
                  ticks: {
                    stepSize: 1,
                  },
                  reverse: false,
                },
              },
            }}
            data={{
              labels: ["Active", "Expired"],
              datasets: [
                {
                  label: "Jobs",
                  data: statistics.jobsNum,
                  backgroundColor: "rgba(10, 101, 204, 1)",
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
}
