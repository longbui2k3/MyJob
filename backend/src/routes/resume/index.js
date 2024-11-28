"use strict";

const express = require("express");
const { authentication } = require("../../auth/authUtils");
const { asyncHandler } = require("../../helpers/asyncHandler");
const {
  createUploadedResume,
  findResumes,
} = require("../../controllers/resume.controller");
const { uploadMulter } = require("../../helpers/uploadMulter");
const resumeController = require("../../controllers/resume.controller");
const router = express.Router();

const upload = uploadMulter([
  {
    fieldname: "resumeFile",
    allowedTypes: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
  },
]);

router.route("/:id").get(
  // #swagger.tags = ['Resume']
  // #swagger.summary = 'Find resume'
  asyncHandler(resumeController.findResumeById)
);

router.route("/").get(
  // #swagger.tags = ['Resume']
  // #swagger.summary = 'Find resumes'
  /* #swagger.parameters["user"] = {
    "in": "query",
    "type": "string",
    "description": "User"
  }
  */
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
  /* #swagger.parameters["type"] = {
    "in": "query",
    "type": "string",
    "description": "Type"
  }
  */
  asyncHandler(findResumes)
);
router.use(authentication);
router.route("/uploaded").post(
  upload.single("resumeFile"),
  // #swagger.tags = ['Resume']
  // #swagger.summary = 'Create uploaded resume'
  /* #swagger.requestBody = {
      required: true,
      content: {
        "multipart/form-data": {
          "schema": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string"
                },
                "resumeFile": {
                    "type": "string",
                    "format": "binary"
                }
            }
          },
        }
      }
    } 
  */
  /* #swagger.security = [{
      "apiKeyAuth": [],
      "clientId": []
    }] 
  */
  asyncHandler(createUploadedResume)
);

router
  .route("/created")
  .post(asyncHandler(resumeController.createCreatedResume));

router
  .route("/:id")
  .patch(
    upload.single("resumeFile"),
    // #swagger.tags = ['Resume']
    // #swagger.summary = 'Update resume'
    /* #swagger.requestBody = {
      required: true,
      content: {
        "multipart/form-data": {
          "schema": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string"
                },
                "resumeFile": {
                    "type": "string",
                    "format": "binary"
                }
            }
          },
        }
      }
    } 
  */
    /* #swagger.security = [{
      "apiKeyAuth": [],
      "clientId": []
    }] 
  */
    asyncHandler(resumeController.updateResume)
  )
  .delete(
    // #swagger.tags = ['Resume']
    // #swagger.summary = 'Delete resume'
    asyncHandler(resumeController.deleteResume)
  );

router
  .route("/:id/created")
  .patch(asyncHandler(resumeController.updateCreatedResume));
module.exports = router;
