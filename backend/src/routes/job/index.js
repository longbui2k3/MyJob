"use strict";

const express = require("express");
const { asyncHandler } = require("../../helpers/asyncHandler");
const { authentication } = require("../../auth/authUtils");
const jobController = require("../../controllers/job.controller");

const router = express.Router();

router.route("/").get(
  // #swagger.tags = ['Job']
  // #swagger.summary = 'Find jobs'
  /* #swagger.parameters["page"] = {
    "in": "query",
    "type": "number",
    "description": "Page"
  }
  */
  /*
    #swagger.parameters["limit"] = {
      "in": "query",
      "type": "number",
      "description": "Limit"
    }
  */
  /*
    #swagger.parameters["search"] = {
      "in": "query",
      "type": "string",
      "description": "Search"
    }
  */
  /*
    #swagger.parameters["provinceCode"] = {
      "in": "query",
      "type": "number",
      "description": "Province Code"
    }
  */
  /*
    #swagger.parameters["company"] = {
      "in": "query",
      "type": "string",
      "description": "company"
    }
  */
  /*
    #swagger.parameters["category"] = {
      "in": "query",
      "type": "string",
      "description": "Category"
    }
  */
  /*
    #swagger.parameters["status"] = {
      "in": "query",
      "type": "string",
      "description": "Status"
    }
  */
  /*
    #swagger.parameters["experiences"] = {
      "in": "query",
      "type": "array",
      "description": "Experience"
    }
  */
  asyncHandler(jobController.findJobs)
);

router.route("/:id").get(
  // #swagger.tags = ['Job']
  // #swagger.summary = 'Find job'
  asyncHandler(jobController.findJob)
);

// authentication
router.use(authentication);
//////////////////

// create job
router.route("/").post(
  // #swagger.tags = ['Job']
  // #swagger.summary = 'Create job'
  /* #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
            schema: {
                $ref: '#/components/schemas/jobBodySchema'
            }
        }
      }
    } 
  */
  /* #swagger.security = [{
      "apiKeyAuth": [],
      "clientId": []
    }] 
  */
  asyncHandler(jobController.createJob)
);

// update job
router.route("/:id").patch(
  // #swagger.tags = ['Job']
  // #swagger.summary = 'Update job'
  /* #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
            schema: {
                $ref: '#/components/schemas/jobBodySchema'
            }
        }
      }
    } 
  */
  /* #swagger.security = [{
      "apiKeyAuth": [],
      "clientId": []
    }] 
  */ asyncHandler(jobController.updateJob)
);

router.route("/:id").delete(
  // #swagger.tags = ['Job']
  // #swagger.summary = 'Delete job'
  /* #swagger.parameters['id'] = {
       in: 'path',
       required: true,
       type: 'string'
  } */
  /* #swagger.security = [{
      "apiKeyAuth": [],
      "clientId": []
    }] 
  */
  asyncHandler(jobController.deleteJob)
);

module.exports = router;
