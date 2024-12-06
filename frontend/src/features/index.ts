export {
  default as openFormSlice,
  openFormCategory,
  closeFormCategory,
  openFormResume,
  closeFormResume,
  openFormApplyJob,
  closeFormApplyJob,
  openFormApplicationDetail,
  closeApplicationDetail,
  openFormSendEmail,
  closeFormSendEmail,
  setId,
  setType,
} from "./openForm/openFormSlice";

export {
  default as changeDataSlice,
  setDataChange,
} from "./changeData/changeDataSlice";

export {
  default as createCVSlice,
  setSelectedElement,
  setState,
  setFields,
  setDeletedFields,
  setDeleteType,
} from "./createCV/createCVSlice";
