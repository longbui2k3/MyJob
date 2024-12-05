"use strict";
const mongoose = require("mongoose");

const COLLECTION_NAME = "created_resumes";
const DOCUMENT_NAME = "CreatedResume";
const createdResumeSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      // required: true,
      default: "",
    },
    avatar: {
      type: String,
      default: "",
    },
    position: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    objective: {
      type: {
        name: String,
        content: String,
      },
      default: {
        name: "Objective",
        content: "",
      },
    },
    workExperience: {
      type: {
        name: String,
        content: [
          {
            companyName: String,
            from: String,
            to: String,
            position: String,
            experienceDescription: String,
          },
        ],
      },
      default: {
        name: "Work Experience",
        content: [
          {
            companyName: "",
            from: "",
            to: "",
            position: "",
            experienceDescription: "",
          },
        ],
      },
    },
    projects: {
      type: {
        name: String,
        content: [
          {
            projectName: String,
            from: String,
            to: String,
            nameOfCustomer: String,
            teamSize: String,
            position: String,
            responsibility: String,
            technologies: String,
          },
        ],
      },
      default: {
        name: "Projects",
        content: [
          {
            projectName: "",
            from: "",
            to: "",
            nameOfCustomer: "",
            teamSize: "",
            position: "",
            responsibility: "",
            technologies: "",
          },
        ],
      },
    },
    education: {
      type: {
        name: String,
        content: [
          {
            from: String,
            to: String,
            courses: String,
            schoolName: String,
            educationDescription: String,
          },
        ],
      },
      default: {
        name: "Education",
        content: [
          {
            from: "",
            to: "",
            courses: "",
            schoolName: "",
            educationDescription: "",
          },
        ],
      },
    },
    skills: {
      type: {
        name: String,
        content: [
          {
            skillName: String,
            skillDescription: String,
          },
        ],
      },
      default: {
        name: "Skills",
        content: [
          {
            skillName: "",
            skillDescription: "",
          },
        ],
      },
    },
    awards: {
      type: {
        name: String,
        content: [
          {
            time: String,
            awardName: String,
          },
        ],
      },
      default: {
        name: "Awards",
        content: [
          {
            time: "",
            awardName: "",
          },
        ],
      },
    },
    certifications: {
      type: {
        name: String,
        content: [
          {
            time: String,
            certificationName: String,
          },
        ],
      },
      default: {
        name: "Certifications",
        content: [
          {
            time: "",
            certificationName: "",
          },
        ],
      },
    },
    referrers: {
      type: {
        name: String,
        content: String,
      },
      default: {
        name: "Referrers",
        content: "",
      },
    },
    activities: {
      type: {
        name: String,
        content: [
          {
            from: String,
            to: String,
            organizationName: String,
            position: String,
            activityDescription: String,
          },
        ],
      },
      default: {
        name: "Activities",
        content: [
          {
            from: "",
            to: "",
            organizationName: "",
            position: "",
            activityDescription: "",
          },
        ],
      },
    },
    interests: {
      type: {
        name: String,
        content: String,
      },
      default: {
        name: "Interests",
        content: "",
      },
    },
    additionalInformation: {
      type: {
        name: String,
        content: String,
      },
      default: {
        name: "Additional Information",
        content: "",
      },
    },
    informations: {
      type: [{ type: String }],
      default: [],
    },
    template: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, createdResumeSchema);
