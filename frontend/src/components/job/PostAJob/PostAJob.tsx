import BaseInput from "../../inputs/Input/BaseInput";
import { BaseSelect } from "../../select";
import AdvanceInformation from "./AdvanceInformation";
import ApplyJobOn from "./ApplyJobOn";
import DescriptionResponsibility from "./DescriptionResponsibility";
import Salary from "./Salary";
import { ButtonSubmit } from "../../buttons";
import { useEffect, useState } from "react";
import {
  CreateJobAPI,
  FindAllCategoriesAPI,
  FindJobAPI,
  UpdateJobAPI,
} from "../../../apis";
import { Select } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { DASHBOARD_MY_JOBS_KEY, getRoute } from "../../../helpers/constants";
import { MessageError } from "../../global";

interface PostAJobProps {
  jobId: string;
}

export default function PostAJob({ jobId }: PostAJobProps) {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Array<any>>([]);
  async function findAllCategories() {
    const limit = 8;
    const data = await FindAllCategoriesAPI(limit);
    if (data.isSuccess) {
      setCategories(data.metadata.categories);
    }
  }

  useEffect(() => {
    findAllCategories();
  }, []);

  // job title
  const [jobTitle, setJobTitle] = useState<string>("");
  const handleJobTitleChange = (e) => {
    setJobTitle(e.target.value);
  };

  // tags
  // const [tags, setTags] = useState<string[]>([]);
  // const handleTagsChange = (e) => {
  //   const value = e.target.value;
  //   setTags(
  //     value
  //       .split(",")
  //       .map((tag: string) => tag.trim())
  //       .filter((tag: string) => tag !== "")
  //   );
  // };

  // category
  const [category, setCategory] = useState<string>("");
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  // job Role
  const [jobRole, setJobRole] = useState<string>("");
  const handleJobRoleChange = (value: string) => {
    setJobRole(value);
  };

  // min Salary
  const [minSalary, setMinSalary] = useState<number | null>(null);
  const handleMinSalaryChange = (value: number) => {
    setMinSalary(value);
  };

  // max Salary
  const [maxSalary, setMaxSalary] = useState<number | null>(null);
  const handleMaxSalaryChange = (value: number) => {
    setMaxSalary(value);
  };

  // salary Type
  const [salaryType, setSalaryType] = useState<string>("");
  const handleSalaryTypeChange = (value: string) => {
    setSalaryType(value);
  };

  // education
  const [education, setEducation] = useState<string>("");
  const handleEducationChange = (value: string) => {
    setEducation(value);
  };

  // experience
  const [experience, setExperience] = useState<string>("");
  const handleExperienceChange = (value: string) => {
    setExperience(value);
  };

  // jobType
  const [jobType, setJobType] = useState<string>("");
  const handleJobTypeChange = (value: string) => {
    setJobType(value);
  };

  // vacancies
  const [vacancies, setVacancies] = useState<number | null>(null);
  const handleVacanciesChange = (value: number) => {
    setVacancies(value);
  };

  // expiratio nDate
  const [expirationDate, setExpirationDate] = useState<string>("");
  const handleExpirationDateChange = (value: string) => {
    setExpirationDate(value);
  };

  // jobLevel
  const [jobLevel, setJobLevel] = useState<string>("");
  const handleJobLevelChange = (value: string) => {
    setJobLevel(value);
  };

  // applyJobOn
  const [applyJobOn, setApplyJobOn] = useState<string>("website");
  const handleApplyJobOnChange = (value: string) => {
    setApplyJobOn(value);
  };

  // jobDescription
  const [jobDescription, setJobDescription] = useState<string>("");
  const handleJobDescriptionChange = (value: string) => {
    setJobDescription(value);
  };

  //jobResponsibilities
  const [jobResponsibilities, setJobResponsibilities] = useState<string>("");
  const handleJobResponsibilitiesChange = (value: string) => {
    setJobResponsibilities(value);
  };

  const [jobData, setJobData] = useState<any>(null);

  async function FindJob(id: string) {
    const data = await FindJobAPI(id);

    if (data.isSuccess) setJobData(data.metadata.job);
  }

  useEffect(() => {
    if (jobId) {
      FindJob(jobId);
    }
  }, []);

  useEffect(() => {
    if (jobData) {
      setJobTitle(jobData.jobTitle);
      // if (Array.isArray(jobData.tags)) {
      //   setTags(jobData.join(", "));
      // } else {
      //   setTags([]);
      // }
      setCategory(jobData.category);
      setJobRole(jobData.jobRole);
      setMinSalary(jobData.minSalary);
      setMaxSalary(jobData.maxSalary);
      setSalaryType(jobData.salaryType);
      setEducation(jobData.education);
      setExperience(jobData.experience);
      setJobType(jobData.jobType);
      setVacancies(jobData.vacancies);
      setExpirationDate(jobData.expirationDate);
      setJobLevel(jobData.jobLevel);
      setApplyJobOn(jobData.applyJobOn);
      setJobDescription(jobData.jobDescription);
      setJobResponsibilities(jobData.jobResponsibilities);
    }
  }, [jobData]);

  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    const data = await CreateJobAPI({
      jobTitle,
      category,
      // tags,
      jobRole,
      minSalary,
      maxSalary,
      salaryType,
      education,
      experience,
      jobType,
      vacancies,
      expirationDate,
      jobLevel,
      applyJobOn,
      jobDescription,
      jobResponsibilities,
    });
    console.log(data);
    if (data.isSuccess) {
      navigate(getRoute(DASHBOARD_MY_JOBS_KEY).path, { replace: true });
    } else {
      console.log("create job that bai");
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const data = await UpdateJobAPI(jobId, {
      jobTitle,
      category,
      // tags,
      jobRole,
      minSalary,
      maxSalary,
      salaryType,
      education,
      experience,
      jobType,
      vacancies,
      expirationDate,
      jobLevel,
      applyJobOn,
      jobDescription,
      jobResponsibilities,
    });
    console.log(data);
    if (data.isSuccess) {
      navigate(getRoute(DASHBOARD_MY_JOBS_KEY).path, { replace: true });
    } else {
      console.log("update job that bai");
    }
  };
  return (
    <div className="relative w-full space-y-4">
      <div>
        <BaseInput
          label="Job Title"
          type="text"
          placeholder="Add job title, role, vacancies etc"
          value={jobTitle}
          onChange={handleJobTitleChange}
        />
        {/* <div className="h-4" />
        <BaseInput
          label="Tags"
          type="text"
          placeholder="Job keyword, tags etc..."
          value={tags.join(", ")}
          onChange={handleTagsChange}
        /> */}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="flex space-x-2">
            <div className="font-normal text-sm mb-2">Category</div>
            <MessageError content="*" />
          </div>
          <Select
            placeholder="Select..."
            value={category}
            onChange={handleCategoryChange}
          >
            {categories.map((category) => (
              <option value={category._id}>{category.name}</option>
            ))}
          </Select>
        </div>
        <BaseSelect
          label="Job Role"
          options={[
            "Software Engineer",
            "Data Scientist",
            "Product Manager",
            "UX Designer",
            "DevOps Engineer",
            "Digital Marketing",
            "Financial Analyst",
            "Others",
          ]}
          value={jobRole}
          onChange={handleJobRoleChange}
        />
      </div>

      <Salary
        minSalary={minSalary}
        maxSalary={maxSalary}
        salaryType={salaryType}
        onMinSalaryChange={handleMinSalaryChange}
        onMaxSalaryChange={handleMaxSalaryChange}
        onSalaryTypeChange={handleSalaryTypeChange}
      />
      <AdvanceInformation
        education={education}
        experience={experience}
        jobType={jobType}
        vacancies={vacancies}
        expirationDate={expirationDate}
        jobLevel={jobLevel}
        onEducationChange={handleEducationChange}
        onExperienceChange={handleExperienceChange}
        onJobTypeChange={handleJobTypeChange}
        onVacanciesChange={handleVacanciesChange}
        onExpirationDateChange={handleExpirationDateChange}
        onJobLevelChange={handleJobLevelChange}
      />
      <ApplyJobOn
        applyJobOn={applyJobOn}
        onApplyJobOnChange={handleApplyJobOnChange}
      />
      <DescriptionResponsibility
        jobDescription={jobDescription}
        jobResponsibilities={jobResponsibilities}
        onJobDescriptionChange={handleJobDescriptionChange}
        onJobResponsibilitiesChange={handleJobResponsibilitiesChange}
      />
      {jobId ? (
        <ButtonSubmit
          label="Save changes"
          width="150px"
          onClick={(e) => handleUpdateSubmit(e)}
        />
      ) : (
        <ButtonSubmit
          label="Post Job"
          width="150px"
          onClick={(e) => handleCreateSubmit(e)}
        />
      )}
    </div>
  );
}
