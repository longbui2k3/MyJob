"use strict";
const mongoose = require("mongoose");
const {
  JobRoles,
  SalaryTypes,
  Experiences,
  JobTypes,
  JobLevels,
  ApplyJobOns,
  JobStatuses,
  Educations,
} = require("../helpers/constants");
const COLLECTION_NAME = "jobs";
const DOCUMENT_NAME = "Job";
const jobSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    company: {
      type: {
        _id: { type: mongoose.Schema.Types.ObjectId, required: true },
        logo: {
          type: String,
          // require: true,
          default: "",
        },
        companyName: {
          type: String,
          required: true,
        },
        mapLocation: {
          type: String,
          // require: true,
          default: "",
        },
        provinceCode: {
          type: Number,
        },
      },
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(JobStatuses),
      required: true,
      default: JobStatuses.ACTIVE,
    },
    tags: {
      type: [{ type: String }],
      // required: true,
      default: [],
    },
    jobRole: {
      type: String,
      required: true,
      enum: Object.values(JobRoles),
    },
    minSalary: {
      type: Number,
      required: true,
      default: 0,
    },
    maxSalary: {
      type: Number,
      required: true,
      default: 0,
    },
    salaryType: {
      type: String,
      required: true,
      enum: Object.values(SalaryTypes),
    },
    education: {
      type: String,
      required: true,
      enum: Object.values(Educations),
    },
    experience: {
      type: String,
      required: true,
      enum: Object.values(Experiences),
    },
    jobType: {
      type: String,
      required: true,
      enum: Object.values(JobTypes),
    },
    vacancies: {
      type: Number,
      required: true,
    },
    expirationDate: {
      type: Date,
      required: true,
    },
    jobLevel: {
      type: String,
      required: true,
      enum: Object.values(JobLevels),
    },
    applyJobOn: {
      type: String,
      required: true,
      enum: Object.values(ApplyJobOns),
      default: ApplyJobOns.WEBSITE,
    },
    jobDescription: {
      type: String,
      // required: true,
      default: "",
    },
    jobResponsibilities: {
      type: String,
      // required: true,
      default: "",
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);
jobSchema.index({ jobTitle: "text" });
jobSchema.statics = {
  findAndSearchPartial: function (obj, q) {
    return this.find({
      ...obj,
      jobTitle: new RegExp(q, "gi"),
    });
  },
  findAndSearchFull: function (obj, q) {
    return this.find({
      ...obj,
      $text: { $search: q, $caseSensitive: false },
    });
  },
};

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, jobSchema);
