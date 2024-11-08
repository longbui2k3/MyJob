"use strict";
const mongoose = require("mongoose");

const COLLECTION_NAME = "created_resumes";
const DOCUMENT_NAME = "CreatedResume";
const createdResumeSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    jobPosition: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
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
            from: Date,
            to: Date,
            position: String,
            experienceDescription: String,
          },
        ],
      },
      default: {
        name: "Work Experience",
        content: [],
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
        content: [],
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
        content: [],
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
        content: [],
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
        content: [],
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
        content: [],
      },
    },
    references: {
      type: {
        name: String,
        content: String,
      },
      default: {
        name: "References",
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
        content: [],
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
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, createdResumeSchema);
